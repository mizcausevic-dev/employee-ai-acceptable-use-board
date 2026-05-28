// SPDX-License-Identifier: AGPL-3.0-or-later

import { analyze } from "../analyze.js";
import { policyLanePackets, rolloutPackets, sampleEmployeeAiAcceptableUsePayload } from "../data/sampleEmployeeAiAcceptableUse.js";
import type { Finding } from "../types.js";

const NOW = "2026-05-31T00:00:00Z";
const report = analyze(sampleEmployeeAiAcceptableUsePayload, {
  now: NOW,
  staleDetectionAfterHours: 72
});

function severityRank(finding: Finding): number {
  return finding.severity === "high" ? 0 : finding.severity === "medium" ? 1 : finding.severity === "low" ? 2 : 3;
}

export function summary() {
  return {
    programs: report.programs,
    onTrackPrograms: report.onTrackPrograms,
    packets: report.packets,
    highSeverityPackets: report.highSeverityPackets,
    workflowGaps: report.workflowGaps,
    stalePackets: report.stalePackets,
    recommendation:
      "Restore missing policy evidence, close the training and exception packet gaps, repair stale approvals, and stabilize employee AI governance ownership before the next rollout window."
  };
}

export function policyLane() {
  return policyLanePackets.map((lane) => ({
    ...lane,
    relatedFindings: report.findingsList.filter((finding) => {
      if (lane.id === "policy-lane") return finding.code === "acceptable-use-gap" || finding.code === "missing-policy-attestation";
      if (lane.id === "training-lane") return finding.code === "missing-training-readiness" || finding.code === "stale-open-packet";
      if (lane.id === "exception-lane") return finding.code === "missing-exception-approval" || finding.code === "workflow-gap";
      if (lane.id === "manager-lane") return finding.code === "high-severity-unassigned" || finding.code === "stale-open-packet";
      return false;
    }).length
  }));
}

export function exceptionGaps() {
  return [...report.findingsList]
    .sort((left, right) => severityRank(left) - severityRank(right))
    .map((finding) => ({
      ...finding,
      owner:
        finding.owner ??
        (finding.code === "missing-policy-attestation"
          ? "Security Awareness Governance"
          : finding.code === "missing-training-readiness"
            ? "Learning Operations"
            : finding.code === "missing-exception-approval"
              ? "Identity Governance"
              : "HR + Security Enablement")
    }));
}

export function rolloutPosture() {
  return rolloutPackets;
}

export function verification() {
  return [
    "The dashboard is backed by a real offline employee AI policy analyzer and CLI, not static copy alone.",
    "Policy, packet, and review snapshots are synthetic sample data only; no live employee, tenant, or identity records are published.",
    "The control plane keeps acceptable-use evidence, training readiness, exception posture, and rollout safety visible for security and HR stakeholders.",
    "This surface demonstrates employee AI policy governance and rollout-safe sequencing, not a generic AI policy keyword page.",
    "It complements workforce, security, and acceptable-use surfaces with a reusable policy-evidence routing primitive."
  ];
}

export const validation = verification;

export function payload() {
  return {
    summary: summary(),
    policyLane: policyLane(),
    exceptionGaps: exceptionGaps(),
    rolloutPosture: rolloutPosture(),
    verification: verification(),
    sample: sampleEmployeeAiAcceptableUsePayload
  };
}
