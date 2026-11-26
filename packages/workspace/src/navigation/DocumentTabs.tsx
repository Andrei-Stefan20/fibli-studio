import { ActionMenu, ContextActions, GlassGroup, Icon, type IconName, type Action, type MenuEntry, SelectionLens, SelectionScope } from "@fibli/ui";
import { type KeyboardEvent, useId, useRef } from "react";
import type { TabState, WorkspaceTab } from "../model";
import styles from "./Navigation.module.css";

function iconFor(tab: WorkspaceTab): IconName {
  if (tab.kind === "home") return "home";
  if (tab.kind === "all") return "folder";
  if (tab.kind === "ai") return "spark";
  if (tab.kind === "settings") return "settings";
  return "file";
}

export interface DocumentTabsProps {
  state: TabState;
  onSelect: (id: string) => void;
  onClose: (id: string) => void;
  onCloseOthers: (id: string) => void;
  onCloseRight: (id: string) => void;
  onNew: () => void;
  onSplit: (fileId: string) => void;
}

export function DocumentTabs({ state, onSelect, onClose, onCloseOthers, onCloseRight, onNew, onSplit }: DocumentTabsProps) {
  const strip = useRef<HTMLDivElement>(null);
  const scope = useId();
  function keyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const length = state.tabs.length;
    const next = event.key === "Home" ? 0 : event.key === "End" ? length - 1 :
      (index + (event.key === "ArrowRight" ? 1 : -1) + length) % length;
    const tab = state.tabs[next];
    if (!tab) return;
    onSelect(tab.id);
    strip.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  }

  const overflow: MenuEntry[] = [
    { kind: "label", id: "label", label: `Open tabs (${state.tabs.length})` },
    ...state.tabs.map((tab): MenuEntry => ({
      kind: "action", id: tab.id, label: tab.title, icon: iconFor(tab),
      checked: tab.id === state.activeId, run: () => onSelect(tab.id),
    })),
  ];

  return (
    <GlassGroup className={styles.tabShell}>
      <SelectionScope id={scope}>
        <div ref={strip} className={styles.tabStrip} role="tablist" aria-label="Open documents"
          onWheel={(event) => {
            if (Math.abs(event.deltaY) > Math.abs(event.deltaX) && strip.current) strip.current.scrollLeft += event.deltaY;
          }}>
          {state.tabs.map((tab, index) => {
            const active = tab.id === state.activeId;
            const actions: Action[] = [
              { kind: "action", id: "new", label: "New text sheet", icon: "plus", shortcut: "⌘T", run: onNew },
            ];
            if (tab.kind === "file") {
              const fileId = tab.fileId;
              actions.unshift({ kind: "action", id: "split", label: "Open side by side", icon: "split", run: () => onSplit(fileId) });
            }
            if (tab.kind !== "home") actions.push({ kind: "action", id: "close", label: "Close tab", shortcut: "⌘W", run: () => onClose(tab.id) });
            if (state.tabs.some((item) => item.id !== tab.id && item.id !== "home")) actions.push({ kind: "action", id: "others", label: "Close other tabs", run: () => onCloseOthers(tab.id) });
            if (index < state.tabs.length - 1) actions.push({ kind: "action", id: "right", label: "Close tabs to the right", run: () => onCloseRight(tab.id) });
            return (
              <ContextActions key={tab.id} className={`${styles.tab} ${active ? styles.active : ""} ${tab.kind === "home" ? styles.homeTab : ""}`} entries={actions}>
                {active && <SelectionLens />}
                <button type="button" className={styles.tabOpen} role="tab" id={`tab-${tab.id}`}
                  aria-controls={`panel-${state.activeId}`} aria-selected={active} tabIndex={active ? 0 : -1}
                  onClick={() => onSelect(tab.id)} onKeyDown={(event) => keyDown(event, index)} title={tab.title}>
                  <Icon name={iconFor(tab)} size={15} /><span>{tab.title}</span>
                </button>
                {tab.kind !== "home" && <button type="button" className={styles.tabClose} aria-label={`Close ${tab.title}`}
                  onClick={(event) => event.altKey ? onCloseOthers(tab.id) : onClose(tab.id)}>
                  <Icon name="close" size={12} />
                </button>}
              </ContextActions>
            );
          })}
        </div>
      </SelectionScope>
      {state.tabs.length > 3 && <ActionMenu label="All open tabs" trigger={<Icon name="down" size={14} />} entries={overflow} align="end" className={styles.overflow} />}
    </GlassGroup>
  );
}
