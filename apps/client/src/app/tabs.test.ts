import { closeOtherTabs, closeTab, closeTabsToRight, initialTabs, openTab, type WorkspaceTab } from "@fibli/workspace";
import { describe, expect, it } from "vitest";

const first: WorkspaceTab = { id: "file:a", kind: "file", fileId: "a", title: "Chapter one" };
const second: WorkspaceTab = { id: "file:b", kind: "file", fileId: "b", title: "Chapter two" };

describe("Document tabs", () => {
  it("keeps a single instance of a document", () => {
    const state = openTab(openTab(initialTabs(), first), first);
    expect(state.tabs.map((tab) => tab.id)).toEqual(["home", "file:a"]);
    expect(state.activeId).toBe("file:a");
  });
  it("selects the preceding tab when closing the active tab", () => {
    expect(closeTab(openTab(openTab(initialTabs(), first), second), second.id).activeId).toBe(first.id);
  });
  it("preserves Home when closing other tabs or tabs to the right", () => {
    const state = openTab(openTab(initialTabs(), first), second);
    expect(closeOtherTabs(state, second.id).tabs.map((tab) => tab.id)).toEqual(["home", "file:b"]);
    expect(closeTabsToRight(state, "home").activeId).toBe("home");
    expect(closeTab(state, "home")).toBe(state);
  });
});
