import { describe, expect, test } from "vitest";

import { renderDocs, renderOverview } from "./render.js";

describe("render surfaces", () => {
  test("overview carries the new acceptable-use title", () => {
    expect(renderOverview()).toContain("Employee AI Acceptable Use Board");
    expect(renderOverview()).toContain("/policy-lane");
  });

  test("docs route exposes the CLI and API shape", () => {
    const html = renderDocs();
    expect(html).toContain("employee-ai-policy-board");
    expect(html).toContain("/api/exception-gaps");
  });
});
