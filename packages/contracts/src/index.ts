export type RuntimeInfo =
  | { mode: "browser" }
  | {
      mode: "native";
      coreVersion: string;
      os: string;
    };

export interface PlatformAdapter {
  getRuntimeInfo(): Promise<RuntimeInfo>;
}
