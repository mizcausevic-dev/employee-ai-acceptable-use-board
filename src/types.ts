// SPDX-License-Identifier: AGPL-3.0-or-later

export type ProgramStatus = "ON_TRACK" | "AT_RISK";
export type PacketStatus = "OPEN" | "RESOLVED";
export type Severity = "high" | "medium" | "low" | "info";
export type EvidenceKind = "PolicyEvidence" | "Approval" | "Training" | "Exception" | "Attestation" | string;
export type PolicyDomain = "ACCEPTABLE_USE" | "TRAINING" | "IDENTITY" | "MANAGER" | "EXCEPTION" | string;

export interface EmployeeAiPolicyProgram {
  id: string;
  rollout: string;
  audience: string;
  platform: string;
  owner: string;
  status: ProgramStatus;
  workflowHealthy: boolean;
  daysToReview: number;
  packet: string;
  excerpt: string;
  nextAction: string;
}

export interface PolicyPacket {
  id: string;
  programId: string;
  rollout: string;
  audience: string;
  platform: string;
  owner?: string;
  domain: PolicyDomain;
  kind: EvidenceKind;
  severity: Severity;
  status: PacketStatus;
  scope: string;
  principal?: string;
  message: string;
  openedAt: string;
  dueAt: string;
}

export interface EmployeeAiAcceptableUseExport {
  programs: EmployeeAiPolicyProgram[];
  packets: PolicyPacket[];
}

export type FindingCode =
  | "no-on-track-programs"
  | "acceptable-use-gap"
  | "missing-policy-attestation"
  | "missing-training-readiness"
  | "missing-exception-approval"
  | "workflow-gap"
  | "stale-open-packet"
  | "high-severity-unassigned";

export interface Finding {
  code: FindingCode;
  severity: Severity;
  subject: "program" | "packet" | "workflow";
  subjectId: string;
  subjectName?: string;
  owner?: string;
  scope?: string;
  principal?: string;
  message: string;
}

export interface AnalysisOptions {
  now?: string;
  staleDetectionAfterHours?: number;
}

export interface CoverageReport {
  ok: boolean;
  programs: number;
  onTrackPrograms: number;
  packets: number;
  highSeverityPackets: number;
  workflowGaps: number;
  stalePackets: number;
  findingsList: Finding[];
}
