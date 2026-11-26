import type { RuntimeInfo } from "@fibli/contracts";
import { getPlatform } from "@fibli/platform";
import { GlassButton } from "@fibli/ui";
import { useState } from "react";

export function RuntimeDiagnostics() {
  const [runtime, setRuntime] = useState<RuntimeInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function checkRuntime() {
    setRuntime(null);
    setError(null);
    try { setRuntime(await getPlatform().getRuntimeInfo()); }
    catch (cause) { setError(cause instanceof Error ? cause.message : String(cause)); }
  }
  return <section aria-label="Runtime diagnostics">
    <h2>Runtime diagnostics</h2>
    <GlassButton onClick={checkRuntime}>Check runtime</GlassButton>
    {runtime && <pre>{JSON.stringify(runtime, null, 2)}</pre>}
    {error && <p role="alert">{error}</p>}
  </section>;
}
