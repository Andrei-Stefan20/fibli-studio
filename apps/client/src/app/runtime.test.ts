import { getPlatform } from "@fibli/platform";
import { describe, expect, it } from "vitest";

describe("Platform adapter", () => {
  it("uses the browser adapter outside Tauri", async () => {
    await expect(getPlatform().getRuntimeInfo()).resolves.toEqual({
      mode: "browser",
    });
  });
});
