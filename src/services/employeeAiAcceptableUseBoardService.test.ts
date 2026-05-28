import { describe, expect, test } from "vitest";

import { exceptionGaps, policyLane, rolloutPosture, summary, verification } from "./employeeAiAcceptableUseBoardService.js";

describe("employeeAiAcceptableUseBoardService", () => {
  test("summary exposes the expected operator counts", () => {
    expect(summary().programs).toBe(3);
    expect(summary().packets).toBe(5);
  });

  test("policy lane keeps four operator lanes", () => {
    expect(policyLane()).toHaveLength(4);
    expect(policyLane()[0]?.lane).toContain("Policy");
  });

  test("exception gaps include policy and training findings", () => {
    expect(exceptionGaps().some((finding) => finding.code === "missing-policy-attestation")).toBe(true);
    expect(exceptionGaps().some((finding) => finding.code === "missing-training-readiness")).toBe(true);
  });

  test("rollout posture stays packet-shaped", () => {
    expect(rolloutPosture().every((packet) => typeof packet.completenessScore === "number")).toBe(true);
  });

  test("verification stays explicit about synthetic data", () => {
    expect(verification().join(" ")).toContain("synthetic");
  });
});
