// SPDX-License-Identifier: AGPL-3.0-or-later

import express from "express";
import { fileURLToPath } from "node:url";

import {
  exceptionGaps,
  payload,
  policyLane,
  rolloutPosture,
  summary,
  verification
} from "./services/employeeAiAcceptableUseBoardService.js";
import {
  renderDocs,
  renderExceptionGaps,
  renderOverview,
  renderPolicyLane,
  renderRolloutPosture,
  renderValidation,
} from "./services/render.js";

const app = express();
const port = Number(process.env.PORT ?? 5524);
const host = process.env.HOST || "0.0.0.0";

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/policy-lane", (_req, res) => res.type("html").send(renderPolicyLane()));
app.get("/exception-gaps", (_req, res) => res.type("html").send(renderExceptionGaps()));
app.get("/rollout-posture", (_req, res) => res.type("html").send(renderRolloutPosture()));
app.get("/verification", (_req, res) => res.type("html").send(renderValidation()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/policy-lane", (_req, res) => res.json(policyLane()));
app.get("/api/exception-gaps", (_req, res) => res.json(exceptionGaps()));
app.get("/api/rollout-posture", (_req, res) => res.json(rolloutPosture()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

const currentFile = fileURLToPath(import.meta.url);
const invokedDirectly = process.argv[1] !== undefined && currentFile === process.argv[1];

if (invokedDirectly) {
  app.listen(port, host, () => {
    console.log(`Employee AI Acceptable Use Board listening on http://${host}:${port}`);
  });
}

export default app;
