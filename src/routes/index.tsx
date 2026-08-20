import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import bottle from "@/assets/bottle.png";
import { ScentSection } from "@/components/ScentSection";
import { SiteHeader } from "@/components/SiteHeader";

const TITLE = "SARKAR Le Male Elixir — Limited Edition Woody Oriental Parfum";
const DESCRIPTION =
  "LE MALE ELIXIR by SARKAR. A limited edition woody oriental parfum in a leather-wrapped chess king bottle. 25ml Rs 499, 50ml Rs 999, 100ml Rs 1499.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const SCENTS = [
  { title: "LE MALE ELIXIR", tagline: "LIMITED. LEATHER. CROWNED." },
  { title: "CARDAMOM", tagline: "SHARP. GREEN. AWAKENING." },
  { title: "IRIS", tagline: "COLD. POWDERED. NOBLE." },
  { title: "VANILLA", tagline: "DEEP. ADDICTIVE. ETERNAL." },
];

const VARIANTS = [
  { size: 25, price: "499" },
  { size: 50, price: "999" },
  { size: 100, price: "1,499" },
];

const NOTES = [
  { label: "TOP NOTES", value: "CARDAMOM" },
  { label: "HEART NOTES", value: "LAVENDER · IRIS" },
  { label: "BASE NOTES", value: "VANILLA" },
];

function HomePage() {
  const [selected, setSelected] = useState(VARIANTS[2]);

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section
        id="top"
        className="relative flex min-h-screen flex-col items-center justify-end overflow-hidden bg-background pb-24 pt-32"
      >
        <video
          src="/media/bottle-360.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-label="360 degree view of the SARKAR LE MALE ELIXIR bottle"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black" />
        <p className="relative z-10 text-[10px] tracking-wide-label text-muted-foreground">
          LIMITED EDITION 001
        </p>
        <h1 className="relative z-10 mt-6 px-4 text-center text-4xl font-bold tracking-brand text-foreground sm:text-6xl md:text-7xl">
          LE MALE ELIXIR
        </h1>
        <a
          href="#shop"
          className="relative z-10 mt-10 border border-foreground px-10 py-3 text-base font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Discover
        </a>
      </section>

      {SCENTS.map((scent) => (
        <ScentSection key={scent.title} title={scent.title} tagline={scent.tagline} />
      ))}

      {/* Manifesto */}
      <section className="border-t border-border bg-background px-6 py-28 text-center">
        <h2 className="text-2xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
          Unisex In Spirit.
          <br />
          Absolute In Command.
        </h2>
        <p className="mt-6 text-sm text-muted-foreground">
          Power isn't inherited. It's built.
        </p>
        <a
          href="#shop"
          className="mt-10 inline-block border border-foreground px-8 py-3 text-[11px] font-semibold tracking-wide-label text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          KNOW SARKAR
        </a>
      </section>

      {/* 360 object */}
      <section id="object" className="border-t border-border bg-background px-6 py-24 text-center">
        <p className="text-[10px] tracking-wide-label text-muted-foreground">360° VIEW</p>
        <h2 className="mt-4 text-2xl font-bold tracking-brand text-foreground sm:text-4xl">
          THE OBJECT
        </h2>
        <div className="mx-auto mt-10 max-w-4xl overflow-hidden border border-border bg-primary">
          <video
            src="/media/bottle-360.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-label="Rotating 360 degree view of the bottle"
            className="aspect-video w-full object-cover"
          />
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Lacquered chess king silhouette · full-grain leather midsection · gunmetal S pendant
        </p>
      </section>

      {/* Shop */}
      <section id="shop" className="border-t border-border bg-background px-5 py-24">
        <h2 className="text-center text-2xl font-bold tracking-brand text-foreground sm:text-4xl">
          SHOP THE COLLECTION
        </h2>
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VARIANTS.map((variant) => (
            <article key={variant.size} className="border border-border">
              <div className="bg-primary p-6">
                <img
                  src={bottle}
                  alt={`LE MALE ELIXIR ${variant.size}ml parfum bottle`}
                  loading="lazy"
                  className="mx-auto h-64 object-contain"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-sm font-semibold tracking-wide-label text-foreground">
                  LE MALE ELIXIR ({variant.size}ML)
                </h3>
                <p className="mt-3 text-[10px] tracking-wide-label text-muted-foreground">
                  REGULAR PRICE
                </p>
                <p className="mt-1 text-lg font-semibold text-foreground">₹ {variant.price}</p>
                <button
                  type="button"
                  onClick={() => setSelected(variant)}
                  className="mt-6 w-full border border-foreground py-3 text-[11px] font-semibold tracking-wide-label text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  ADD TO CART
                </button>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-10 text-center text-[10px] tracking-wide-label text-muted-foreground">
          SELECTED · {selected.size}ML — ₹ {selected.price}
        </p>
      </section>

      {/* Notes */}
      <section id="notes" className="border-t border-border bg-background px-6 py-24">
        <div className="mx-auto grid max-w-5xl gap-10 text-center sm:grid-cols-3">
          {NOTES.map((note) => (
            <div key={note.label}>
              <p className="text-[10px] tracking-wide-label text-muted-foreground">{note.label}</p>
              <p className="mt-3 text-lg font-semibold tracking-wide-label text-foreground">
                {note.value}
              </p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-14 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
          Drawing on the potency of cardamom in its top notes and the freshness of lavender and iris
          at its heart, this intense parfum ultimately promises to immerse you in its wonderfully
          addictive vanilla base. An olfactory odyssey full of contrasts, its trail revealing the
          charisma of an officer.
        </p>
        <p className="mx-auto mt-10 max-w-3xl text-center text-[10px] leading-relaxed tracking-wide-label text-muted-foreground/70">
          ALCOHOL DENAT., PARFUM (FRAGRANCE), AQUA (WATER), COUMARIN, LINALOOL, ALPHA-ISOMETHYL
          IONONE, BUTYL METHOXYDIBENZOYLMETHANE, LIMONENE, CINNAMAL, GERANIOL.
        </p>
      </section>

      {/* Newsletter */}
      <section
        id="newsletter"
        className="border-t border-border bg-background px-6 py-24 text-center"
      >
        <h2 className="text-2xl font-bold tracking-brand text-foreground sm:text-4xl">
          THE ONE &amp; ONLY
        </h2>
        <form
          onSubmit={(event) => event.preventDefault()}
          className="mx-auto mt-10 flex max-w-md items-center border border-border"
        >
          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="ENTER EMAIL"
            className="w-full bg-transparent px-5 py-4 text-[11px] tracking-wide-label text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            aria-label="Subscribe"
            className="px-5 py-4 text-foreground transition-opacity hover:opacity-70"
          >
            →
          </button>
        </form>
      </section>
    </main>
  );
}
