import { useId } from "react";
import { Icon, type IconName } from "../icons/Icon";
import styles from "./Collections.module.css";

export interface DisclosureNode {
  id: string;
  label: string;
  icon?: IconName;
  metadata?: string;
  children?: readonly DisclosureNode[];
}

interface DisclosureProps {
  nodes: readonly DisclosureNode[];
  selectedId: string | null;
  expandedIds: ReadonlySet<string>;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
}

function TreeBranch({
  node,
  selectedId,
  expandedIds,
  onSelect,
  onToggle,
}: Omit<DisclosureProps, "nodes"> & { node: DisclosureNode }) {
  const panelId = useId();
  const folder = node.children !== undefined;
  const expanded = folder && expandedIds.has(node.id);
  return (
    <li>
      <div className={styles.row} data-selected={selectedId === node.id}>
        {folder && (
          <button
            type="button"
            className={styles.disclosure}
            aria-label={`${expanded ? "Collapse" : "Expand"} ${node.label}`}
            aria-expanded={expanded}
            aria-controls={expanded ? panelId : undefined}
            onClick={() => onToggle(node.id)}
          >
            <Icon name={expanded ? "down" : "right"} size={14} />
          </button>
        )}
        <button
          type="button"
          className={styles.rowButton}
          data-leaf={!folder}
          aria-current={selectedId === node.id ? "page" : undefined}
          onClick={() => onSelect(node.id)}
        >
          <Icon name={node.icon ?? (folder ? "folder" : "file")} size={16} />
          <span className={styles.name}>{node.label}</span>
          {node.metadata && <span className={styles.metadata}>{node.metadata}</span>}
        </button>
      </div>
      {expanded && node.children && (
        <ul className={styles.children} id={panelId}>
          {node.children.map((child) => (
            <TreeBranch
              key={child.id}
              node={child}
              selectedId={selectedId}
              expandedIds={expandedIds}
              onSelect={onSelect}
              onToggle={onToggle}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

/** A nested disclosure list, not an ARIA tree widget. Each button is independently keyboard reachable. */
export function DisclosureTree({ label, nodes, ...props }: DisclosureProps & { label: string }) {
  return (
    <ul aria-label={label} className={styles.tree}>
      {nodes.map((node) => (
        <TreeBranch key={node.id} node={node} {...props} />
      ))}
    </ul>
  );
}
