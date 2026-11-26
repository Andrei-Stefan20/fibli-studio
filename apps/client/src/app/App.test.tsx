import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("App", () => {
  it("renders the R1 projects library", () => {
    render(<App />);
    expect(screen.getByRole("main", { name: "Projects library" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Le isole di Sàlma" })).toBeInTheDocument();
  });

  it("opens a project and switches between the original library and editor", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Open project" }));
    expect(await screen.findByRole("tab", { name: "Home" })).toBeInTheDocument();
    const [document] = screen.getAllByRole("button", { name: "Il porto sotto la pioggia" });
    if (!document) throw new Error("Missing sample document");
    fireEvent.click(document);
    expect(await screen.findByRole("textbox", { name: "Document text" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Il porto sotto la pioggia" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("creates a project from the full-screen wizard", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "New project" }));
    fireEvent.change(screen.getByLabelText("New project"), { target: { value: "New manuscript" } });
    fireEvent.click(screen.getByRole("button", { name: "Create project" }));
    expect(
      await screen.findByRole("heading", { name: "New manuscript" }, { timeout: 2500 }),
    ).toBeInTheDocument();
  });
});
