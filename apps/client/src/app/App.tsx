import type { RuntimeInfo } from "@fibli/contracts";
import { getPlatform } from "@fibli/platform";
import { useState } from "react";

export function App() {
  const [runtime, setRuntime] = useState<RuntimeInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function checkRuntime() {
    setError(null);
    setRuntime(null);

    try {
      setRuntime(await getPlatform().getRuntimeInfo());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    }
  }

  return (
    <main>
      <h1>Fibli</h1>
      <p>A workspace for imagination.</p>

      <button type="button" onClick={checkRuntime}>
        Check runtime
      </button>

      {runtime && <pre>{JSON.stringify(runtime, null, 2)}</pre>}
      {error && <p role="alert">{error}</p>}
    </main>
  );
}
