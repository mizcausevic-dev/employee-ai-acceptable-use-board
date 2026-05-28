// SPDX-License-Identifier: AGPL-3.0-or-later

import type { EmployeeAiAcceptableUseExport } from "../types.js";

export const sampleEmployeeAiAcceptableUsePayload: EmployeeAiAcceptableUseExport = {
  programs: [
    {
      id: "AUP-1008",
      rollout: "AI acceptable-use refresh",
      audience: "All employees",
      platform: "Entra + LMS + Intranet",
      owner: "Security Awareness Governance",
      status: "AT_RISK",
      workflowHealthy: false,
      daysToReview: 5,
      packet: "enterprise-ai-policy packet",
      excerpt: "Need one source of truth for policy evidence, training proof, and exception handling before the refreshed AUP goes broad.",
      nextAction: "Restore policy attestation routing and close the training-readiness packet."
    },
    {
      id: "AUP-2041",
      rollout: "Manager AI enablement brief",
      audience: "People managers and team leads",
      platform: "Intranet + LMS",
      owner: "HR + Security Enablement",
      status: "ON_TRACK",
      workflowHealthy: true,
      daysToReview: 9,
      packet: "manager-brief packet",
      excerpt: "Training and policy checkpoints are green, but one review artifact still needs archival proof.",
      nextAction: "Confirm final distribution timing and archive the policy evidence."
    },
    {
      id: "AUP-3112",
      rollout: "Privileged-user AI exception program",
      audience: "Admins, engineers, and contractor exceptions",
      platform: "CyberArk + Entra + Intranet",
      owner: "Identity Governance",
      status: "AT_RISK",
      workflowHealthy: false,
      daysToReview: 3,
      packet: "exception-approval packet",
      excerpt: "Exception handling, approvals, and manager sign-off are still split across security and HR teams.",
      nextAction: "Repair the exception posture before elevated AI access expands."
    }
  ],
  packets: [
    {
      id: "PKT-701",
      programId: "AUP-1008",
      rollout: "AI acceptable-use refresh",
      audience: "All employees",
      platform: "Entra + LMS + Intranet",
      owner: "Security Awareness Governance",
      domain: "ACCEPTABLE_USE",
      kind: "PolicyEvidence",
      severity: "high",
      status: "OPEN",
      scope: "Enterprise acceptable-use evidence",
      principal: "ai-aup-v3",
      message: "Policy evidence still does not reconcile legal language, manager guidance, and employee-facing acceptable-use text.",
      openedAt: "2026-05-24T14:00:00Z",
      dueAt: "2026-05-29T17:00:00Z"
    },
    {
      id: "PKT-702",
      programId: "AUP-1008",
      rollout: "AI acceptable-use refresh",
      audience: "All employees",
      platform: "Entra + LMS + Intranet",
      owner: "Learning Operations",
      domain: "TRAINING",
      kind: "Training",
      severity: "medium",
      status: "OPEN",
      scope: "Training completion readiness",
      principal: "ai-training-wave-1",
      message: "The launch packet still lacks one consolidated training-readiness artifact for the employee-facing acceptable-use rollout.",
      openedAt: "2026-05-26T13:00:00Z",
      dueAt: "2026-05-30T18:00:00Z"
    },
    {
      id: "PKT-810",
      programId: "AUP-2041",
      rollout: "Manager AI enablement brief",
      audience: "People managers and team leads",
      platform: "Intranet + LMS",
      owner: "HR + Security Enablement",
      domain: "MANAGER",
      kind: "Attestation",
      severity: "low",
      status: "RESOLVED",
      scope: "Manager guidance approval",
      principal: "manager-ai-brief",
      message: "Manager-facing guidance approved and archived.",
      openedAt: "2026-05-20T12:00:00Z",
      dueAt: "2026-05-22T12:00:00Z"
    },
    {
      id: "PKT-911",
      programId: "AUP-3112",
      rollout: "Privileged-user AI exception program",
      audience: "Admins, engineers, and contractor exceptions",
      platform: "CyberArk + Entra + Intranet",
      owner: "Identity Governance",
      domain: "EXCEPTION",
      kind: "Exception",
      severity: "high",
      status: "OPEN",
      scope: "Privileged-user exception handling",
      principal: "ai-exception-admins",
      message: "Exception safeguards are incomplete for privileged-user AI access; the expansion could ship before exception criteria and approvals are locked.",
      openedAt: "2026-05-23T10:30:00Z",
      dueAt: "2026-05-28T16:00:00Z"
    },
    {
      id: "PKT-912",
      programId: "AUP-3112",
      rollout: "Privileged-user AI exception program",
      audience: "Admins, engineers, and contractor exceptions",
      platform: "CyberArk + Entra + Intranet",
      domain: "EXCEPTION",
      kind: "Approval",
      severity: "high",
      status: "OPEN",
      scope: "Exception approval chain",
      principal: "ai-exception-approval",
      message: "The privileged-user exception rollout still lacks one owner-safe approval chain for security, HR, and platform governance.",
      openedAt: "2026-05-22T15:00:00Z",
      dueAt: "2026-05-28T15:00:00Z"
    }
  ]
};

export const policyLanePackets = [
  {
    id: "policy-lane",
    lane: "Policy evidence lane",
    owner: "Security Awareness Governance",
    focus: "Acceptable-use language, employee policy evidence, and publication proof",
    status: "RED",
    note: "Missing policy evidence is the fastest way to push AI guidance that legal, HR, and security do not all recognize as the same rule set.",
    nextAction: "Reconcile policy evidence and close the missing acceptable-use packet."
  },
  {
    id: "training-lane",
    lane: "Training lane",
    owner: "Learning Operations",
    focus: "Training rollout, completion evidence, and awareness readiness",
    status: "YELLOW",
    note: "Training posture is partially healthy, but one packet is still open against the broad employee rollout.",
    nextAction: "Collapse the remaining training proof into one launch-safe evidence packet."
  },
  {
    id: "exception-lane",
    lane: "Exception lane",
    owner: "Identity Governance",
    focus: "Elevated access, exception criteria, and privileged-user review",
    status: "RED",
    note: "Exception posture is degraded because approvals and escalation rules are not fully locked.",
    nextAction: "Restore the exception guardrail before elevated AI access expands."
  },
  {
    id: "manager-lane",
    lane: "Manager lane",
    owner: "HR + Security Enablement",
    focus: "Manager guidance, escalation, and fallback review",
    status: "YELLOW",
    note: "Manager-facing guidance exists, but some exception packets still depend on manual coordination.",
    nextAction: "Assign the remaining high-severity packet and validate the fallback path."
  }
];

export const rolloutPackets = [
  {
    packetId: "ROL-07",
    lane: "Enterprise AI AUP refresh",
    completenessScore: 57,
    owner: "Security Awareness",
    status: "RED",
    blocker: "Policy evidence and training readiness are still split across teams.",
    launchWindowHours: 20,
    decisionNote: "Do not publish until the acceptable-use evidence and training packet are reconciled."
  },
  {
    packetId: "ROL-14",
    lane: "Manager AI brief",
    completenessScore: 86,
    owner: "HR Enablement",
    status: "GREEN",
    blocker: "No active blocker. Final archival proof still recommended.",
    launchWindowHours: 48,
    decisionNote: "Safe to schedule once archival proof is attached."
  },
  {
    packetId: "ROL-22",
    lane: "Privileged-user exception program",
    completenessScore: 61,
    owner: "Identity Governance",
    status: "RED",
    blocker: "Exception safeguards and approval chain are incomplete for elevated AI access.",
    launchWindowHours: 12,
    decisionNote: "Hold until exception criteria and approval path are validated."
  },
  {
    packetId: "ROL-31",
    lane: "Employee AI onboarding update",
    completenessScore: 78,
    owner: "People Ops",
    status: "YELLOW",
    blocker: "Fallback escalation is still manual for one audience slice.",
    launchWindowHours: 30,
    decisionNote: "Can clear if the fallback owner and packet archive are locked in the next cycle."
  }
];
