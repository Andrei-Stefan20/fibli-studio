import type { ReactNode } from "react";

export function Specimen({
  title,
  description,
  children,
  usage,
  review,
}: {
  title: string;
  description: string;
  children: ReactNode;
  usage: string;
  review: string;
}) {
  return (
    <article className="story-inset catalog-page">
      <header className="catalog-heading">
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
      <section className="catalog-demo" aria-label="Interactive specimen">
        {children}
      </section>
      <section className="catalog-notes">
        <h2>Usage</h2>
        <p>{usage}</p>
        <h2>Review checklist</h2>
        <p>{review}</p>
      </section>
    </article>
  );
}
