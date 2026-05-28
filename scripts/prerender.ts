// SPDX-License-Identifier: AGPL-3.0-or-later

import { mkdir, writeFile } from "node:fs/promises";

import {
  exceptionGaps,
  payload,
  policyLane,
  rolloutPosture,
  summary,
  verification
} from "../src/services/employeeAiAcceptableUseBoardService.js";
import {
  renderDocs,
  renderExceptionGaps,
  renderOverview,
  renderPolicyLane,
  renderRolloutPosture,
  renderValidation
} from "../src/services/render.js";

async function writePage(route: string, html: string) {
  const directory = route === "/" ? "site" : `site${route}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, html, "utf8");
}

async function writeJson(name: string, value: unknown) {
  await mkdir("site/api", { recursive: true });
  await writeFile(`site/api/${name}.json`, JSON.stringify(value, null, 2), "utf8");
}

await writePage("/", renderOverview());
await writePage("/policy-lane", renderPolicyLane());
await writePage("/exception-gaps", renderExceptionGaps());
await writePage("/rollout-posture", renderRolloutPosture());
await writePage("/verification", renderValidation());
await writePage("/docs", renderDocs());

await writeJson("summary", summary());
await writeJson("policy-lane", policyLane());
await writeJson("exception-gaps", exceptionGaps());
await writeJson("rollout-posture", rolloutPosture());
await writeJson("verification", verification());
await writeJson("sample", payload());
