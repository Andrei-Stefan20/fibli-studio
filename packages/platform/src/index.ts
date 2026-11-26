import type { PlatformAdapter, RuntimeInfo } from "@fibli/contracts";
import { invoke, isTauri } from "@tauri-apps/api/core";

const browserAdapter: PlatformAdapter = {
  async getRuntimeInfo() {
    return { mode: "browser" };
  },
};

const nativeAdapter: PlatformAdapter = {
  async getRuntimeInfo(): Promise<RuntimeInfo> {
    const result = await invoke<unknown>("get_runtime_info");

    if (
      typeof result !== "object" ||
      result === null ||
      !("coreVersion" in result) ||
      typeof result.coreVersion !== "string" ||
      !("os" in result) ||
      typeof result.os !== "string"
    ) {
      throw new Error("Invalid native runtime response.");
    }

    return {
      mode: "native",
      coreVersion: result.coreVersion,
      os: result.os,
    };
  },
};

export function getPlatform(): PlatformAdapter {
  return isTauri() ? nativeAdapter : browserAdapter;
}
