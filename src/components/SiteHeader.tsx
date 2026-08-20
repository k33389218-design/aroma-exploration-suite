import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";

const NAV_LINKS = [
  { label: "SHOP", href: "#shop" },
  { label: "THE OBJECT", href: "#object" },
  { label: "NOTES", href: "#notes" },
  { label: "NEWSLETTER", href: "#newsletter" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-foreground py-2 text-center text-[10px] font-semibold tracking-wide-label text-background">
        CLAIM TWO 7ML FREEBIES WITH EVERY ORDER
      </div>

      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background px-4 py-4 sm:px-6">
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="text-foreground transition-opacity hover:opacity-60"
        >
          <Menu className="h-6 w-6" strokeWidth={1.5} />
        </button>

        <a
          href="#top"
          className="text-base font-bold tracking-wide-label text-foreground sm:text-lg"
        >
          SARKAR
        </a>

        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href="#shop"
            className="hidden bg-foreground px-5 py-2.5 text-xs font-semibold text-background transition-opacity hover:opacity-80 sm:inline-block"
          >
            Buy Now
          </a>
          <button
            type="button"
            aria-label="Cart"
            className="text-foreground transition-opacity hover:opacity-60"
          >
            <ShoppingBag className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-background">
          <div className="flex items-center justify-between border-b border-border px-4 py-4 sm:px-6">
            <span className="text-base font-bold tracking-wide-label text-foreground">
              SARKAR
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="text-foreground transition-opacity hover:opacity-60"
            >
              <X className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-xl font-semibold tracking-wide-label text-foreground transition-opacity hover:opacity-60"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
