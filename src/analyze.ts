// SPDX-License-Identifier: AGPL-3.0-or-later

import type {
  AnalysisOptions,
  CoverageReport,
  EmployeeAiAcceptableUseExport,
  Finding,
  PolicyPacket,
} from "./types.js";

function hoursBetween(startIso: string, endIso: string) {
  return Math.max(0, (Date.parse(endIso) - Date.parse(startIso)) / 36e5);
}

function hasOpenPacket(packets: PolicyPacket[], kind: string) {
  return packets.some((packet) => packet.kind === kind && packet.status === "OPEN");
}

export function analyze(
  payload: EmployeeAiAcceptableUseExport,
  options: AnalysisOptions = {}
): CoverageReport {
  const now = options.now ?? new Date().toISOString();
  const staleAfterHours = options.staleDetectionAfterHours ?? 72;
  const findingsList: Finding[] = [];

  const onTrackPrograms = payload.programs.filter((program) => program.status === "ON_TRACK").length;
  const highSeverityPackets = payload.packets.filter(
    (packet) => packet.status === "OPEN" && packet.severity === "high"
  ).length;
  const workflowGaps = payload.programs.filter((program) => !program.workflowHealthy).length;

  if (onTrackPrograms === 0) {
    findingsList.push({
      code: "no-on-track-programs",
      severity: "high",
      subject: "workflow",
      subjectId: "programs",
      subjectName: "Employee AI policy workflow",
      message: "No AI policy programs are currently on track; acceptable-use review is operating entirely in exception mode."
    });
  }

  for (const program of payload.programs) {
    const programPackets = payload.packets.filter((packet) => packet.programId === program.id && packet.status === "OPEN");

    if (program.status === "AT_RISK" || programPackets.length > 0) {
      findingsList.push({
        code: "acceptable-use-gap",
        severity: program.status === "AT_RISK" ? "high" : "medium",
        subject: "program",
        subjectId: program.id,
        subjectName: `${program.rollout} ${program.id}`,
        owner: program.owner,
        scope: program.platform,
        message: `${program.rollout} still has open acceptable-use debt against the ${program.packet} packet.`
      });
    }

    if (programPackets.length > 0 && !hasOpenPacket(programPackets, "PolicyEvidence")) {
      findingsList.push({
        code: "missing-policy-attestation",
        severity: "medium",
        subject: "program",
        subjectId: program.id,
        subjectName: `${program.rollout} ${program.id}`,
        owner: program.owner,
        scope: program.platform,
        message: "The rollout is in exception flow but does not currently show a clean acceptable-use evidence packet in the review queue."
      });
    }

    if (!program.workflowHealthy) {
      findingsList.push({
        code: "workflow-gap",
        severity: "medium",
        subject: "workflow",
        subjectId: program.id,
        subjectName: `${program.rollout} ${program.id}`,
        owner: program.owner,
        scope: program.platform,
        message: "Owner-safe routing is degraded; policy, training, exception, and manager review are still split across teams."
      });
    }
  }

  for (const packet of payload.packets) {
    if (packet.status !== "OPEN") continue;

    if (packet.domain === "ACCEPTABLE_USE" || packet.kind === "PolicyEvidence") {
      findingsList.push({
        code: "missing-policy-attestation",
        severity: packet.severity,
        subject: "packet",
        subjectId: packet.id,
        subjectName: `${packet.rollout} ${packet.kind}`,
        owner: packet.owner,
        scope: packet.scope,
        principal: packet.principal,
        message: packet.message
      });
    }

    if (packet.domain === "TRAINING" || packet.kind === "Training") {
      findingsList.push({
        code: "missing-training-readiness",
        severity: packet.severity,
        subject: "packet",
        subjectId: packet.id,
        subjectName: `${packet.rollout} ${packet.kind}`,
        owner: packet.owner,
        scope: packet.scope,
        principal: packet.principal,
        message: packet.message
      });
    }

    if (packet.domain === "EXCEPTION" || packet.kind === "Exception") {
      findingsList.push({
        code: "missing-exception-approval",
        severity: packet.severity,
        subject: "packet",
        subjectId: packet.id,
        subjectName: `${packet.rollout} ${packet.kind}`,
        owner: packet.owner,
        scope: packet.scope,
        principal: packet.principal,
        message: packet.message
      });
    }

    if (!packet.owner && packet.severity === "high") {
      findingsList.push({
        code: "high-severity-unassigned",
        severity: "high",
        subject: "packet",
        subjectId: packet.id,
        subjectName: packet.kind,
        scope: packet.scope,
        message: "A high-severity employee AI policy packet is still unassigned."
      });
    }

    if (hoursBetween(packet.openedAt, now) >= staleAfterHours) {
      findingsList.push({
        code: "stale-open-packet",
        severity: packet.severity === "high" ? "high" : "medium",
        subject: "packet",
        subjectId: packet.id,
        subjectName: packet.kind,
        owner: packet.owner,
        scope: packet.scope,
        principal: packet.principal,
        message: `${packet.kind} evidence has been open longer than the employee AI policy review SLA.`
      });
    }
  }

  return {
    ok: findingsList.every((finding) => finding.severity !== "high"),
    programs: payload.programs.length,
    onTrackPrograms,
    packets: payload.packets.length,
    highSeverityPackets,
    workflowGaps,
    stalePackets: findingsList.filter((finding) => finding.code === "stale-open-packet").length,
    findingsList
  };
}
