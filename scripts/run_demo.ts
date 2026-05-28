// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  exceptionGaps,
  policyLane,
  rolloutPosture,
  summary
} from "../src/services/employeeAiAcceptableUseBoardService.js";

console.log("employee-ai-acceptable-use-board demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(`policy lanes: ${policyLane().length}`);
console.log(`exception gap findings: ${exceptionGaps().length}`);
console.log(`rollout packets: ${rolloutPosture().length}`);
