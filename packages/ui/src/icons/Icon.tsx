const paths = {
  sidebar: "M3 4h18v16H3z M9 4v16",
  inspector: "M3 4h18v16H3z M15 4v16",
  down: "m7 10 5 5 5-5",
  right: "m10 7 5 5-5 5",
  left: "m14 7-5 5 5 5",
  plus: "M12 5v14 M5 12h14",
  close: "m6 6 12 12 M18 6 6 18",
  home: "m3 11 9-8 9 8 M5 10v10h5v-6h4v6h5V10",
  folder: "M3 6h7l2 3h9v11H3z",
  file: "M6 3h8l4 4v14H6z M14 3v5h5 M9 12h6 M9 16h6",
  search: "M16 16l5 5 M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
  settings:
    "M12 3v3 M12 18v3 M3 12h3 M18 12h3 M5.6 5.6l2.1 2.1 M16.3 16.3l2.1 2.1 M18.4 5.6l-2.1 2.1 M7.7 16.3l-2.1 2.1 M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0",
  spark: "m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z",
  more: "M5 12h.1 M12 12h.1 M19 12h.1",
  check: "m5 12 4 4L19 6",
  upload: "M12 16V3 M7 8l5-5 5 5 M4 15v6h16v-6",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  image: "M3 4h18v16H3z M3 17l6-6 4 4 3-3 5 5 M16 8h.1",
  book: "M4 4h7v16H4z M13 4h7v16h-7z",
  grid: "M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M14 14h6v6h-6z",
  code: "m8 6-6 6 6 6 M16 6l6 6-6 6 M14 3l-4 18",
  copy: "M8 8h12v12H8z M16 8V4H4v12h4",
  edit: "m5 15 11-11 4 4-11 11H5z M14 6l4 4",
  trash: "M4 6h16 M9 6V3h6v3 M6 6l1 15h10l1-15 M10 10v7 M14 10v7",
  split: "M3 4h18v16H3z M12 4v16",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 17 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={name === "more" ? 3.2 : 1.65}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}
