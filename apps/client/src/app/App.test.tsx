import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("App", () => {
  it("renders the application heading", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Fibli",
      }),
    ).toBeInTheDocument();
  });

  it("renders the main application landmark", () => {
    render(<App />);

    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
