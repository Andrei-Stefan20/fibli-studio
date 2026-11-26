import type { Cover } from "../model";

// Offline vector covers from the R1 demo. Remote Wikimedia and video catalog
// assets are deliberately not bundled until their licences are reviewed.
const svgUri = (body: string) => "data:image/svg+xml;charset=utf-8," + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice">${body}</svg>`,
);

export const offlineCovers: Cover[] = [
  { type: "image", name: "Topographic contours", url: svgUri(`<rect width="1200" height="750" fill="#13161b"/><g fill="none" stroke="#8fa6c2" stroke-width="1.4" opacity=".35"><path d="M-60 520 Q280 340 580 460 T1260 390"/><path d="M-60 450 Q310 270 610 390 T1260 310"/><path d="M-60 380 Q340 200 640 320 T1260 230"/><path d="M-60 590 Q260 420 560 540 T1260 470"/><path d="M-60 660 Q240 500 540 620 T1260 550"/><ellipse cx="860" cy="230" rx="220" ry="95"/><ellipse cx="860" cy="230" rx="150" ry="62"/><ellipse cx="860" cy="230" rx="85" ry="34"/></g>`) },
  { type: "image", name: "Star map", url: svgUri(`<defs><radialGradient id="s" cx="50%" cy="45%" r="65%"><stop offset="0%" stop-color="#17243d"/><stop offset="100%" stop-color="#090d16"/></radialGradient></defs><rect width="1200" height="750" fill="url(#s)"/><g stroke="#93b4e0" stroke-opacity=".35" stroke-width="1.2" fill="none"><circle cx="600" cy="375" r="280" stroke-dasharray="4 6"/><circle cx="600" cy="375" r="170"/><polyline points="260,260 420,190 560,290 730,220 890,340 770,490 560,290"/></g><g fill="#e8f1ff"><circle cx="260" cy="260" r="4"/><circle cx="420" cy="190" r="5.5"/><circle cx="560" cy="290" r="4.5"/><circle cx="730" cy="220" r="6"/><circle cx="890" cy="340" r="4"/><circle cx="770" cy="490" r="5"/><circle cx="350" cy="510" r="2.5" opacity=".7"/><circle cx="940" cy="180" r="2.5" opacity=".7"/><circle cx="190" cy="420" r="2" opacity=".6"/></g>`) },
  { type: "image", name: "Ink waves", url: svgUri(`<rect width="1200" height="750" fill="#18191c"/><g fill="none" stroke="#e5e7eb" stroke-width="2" opacity=".24"><path d="M0 440 C240 320 420 540 660 420 C880 310 1020 490 1200 390"/><path d="M0 490 C240 370 420 590 660 470 C880 360 1020 540 1200 440"/><path d="M0 540 C240 420 420 640 660 520 C880 410 1020 590 1200 490"/><path d="M0 590 C240 470 420 690 660 570 C880 460 1020 640 1200 540"/><path d="M0 640 C240 520 420 740 660 620 C880 510 1020 690 1200 590"/></g>`) },
  { type: "image", name: "Technical grid", url: svgUri(`<rect width="1200" height="750" fill="#f5f6f8"/><defs><pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#d5dbe5" stroke-width="1"/></pattern><pattern id="p2" width="200" height="200" patternUnits="userSpaceOnUse"><rect width="200" height="200" fill="url(#p)"/><path d="M200 0H0V200" fill="none" stroke="#b6c2d6" stroke-width="1.5"/></pattern></defs><rect width="1200" height="750" fill="url(#p2)"/><circle cx="600" cy="375" r="210" fill="none" stroke="#1e3a5f" stroke-width="1.5" stroke-dasharray="6 6" opacity=".45"/><line x1="260" y1="375" x2="940" y2="375" stroke="#1e3a5f" stroke-width="1.2" opacity=".35"/><line x1="600" y1="115" x2="600" y2="635" stroke="#1e3a5f" stroke-width="1.2" opacity=".35"/>`) },
  { type: "image", name: "Minimal arches", url: svgUri(`<rect width="1200" height="750" fill="#ede8df"/><path d="M180 750 V340 A180 180 0 0 1 540 340 V750" fill="#dad2c4"/><path d="M440 750 V300 A180 180 0 0 1 800 300 V750" fill="#c6bba9"/><path d="M680 750 V380 A180 180 0 0 1 1040 380 V750" fill="#3a3632" opacity=".88"/>`) },
];

export function createLocalCover(file: File): Cover {
  const image = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"].includes(file.type);
  const video = ["video/mp4", "video/webm"].includes(file.type);
  if (!image && !video) throw new Error("Choose a supported image or MP4/WebM video.");
  if (file.size > (video ? 50 : 12) * 1024 * 1024) throw new Error("Cover exceeds the session size limit.");
  return { type: video ? "video" : "image", url: URL.createObjectURL(file), name: file.name };
}
