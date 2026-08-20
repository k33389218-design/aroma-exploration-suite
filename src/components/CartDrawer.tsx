import { useState } from "react";
import { Check, Minus, Plus, X } from "lucide-react";

import { formatINR, useCart, type Order } from "@/lib/cart";

type Step = "cart" | "checkout" | "done";

const EMPTY_FORM = { name: "", phone: "", address: "", city: "", pincode: "" };

export function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    shipping,
    codFee,
    total,
    isOpen,
    closeCart,
    setQty,
    remove,
    placeOrder,
  } = useCart();

  const [step, setStep] = useState<Step>("cart");
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [order, setOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const close = () => {
    closeCart();
    if (step === "done") {
      setStep("cart");
      setForm(EMPTY_FORM);
      setOrder(null);
    }
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next["name"] = "Enter your full name";
    if (!/^[6-9]\d{9}$/.test(form.phone.trim()))
      next["phone"] = "Enter a valid 10-digit mobile number";
    if (form.address.trim().length < 8) next["address"] = "Enter your full address";
    if (form.city.trim().length < 2) next["city"] = "Enter your city";
    if (!/^\d{6}$/.test(form.pincode.trim())) next["pincode"] = "Enter a valid 6-digit PIN code";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    const placed = placeOrder({
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
      pincode: form.pincode.trim(),
    });
    setOrder(placed);
    setStep("done");
  };

  const field = (
    name: keyof typeof EMPTY_FORM,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> = {},
  ) => (
    <div>
      <label
        htmlFor={`cod-${name}`}
        className="text-[10px] tracking-wide-label text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={`cod-${name}`}
        value={form[name]}
        onChange={(event) => setForm((current) => ({ ...current, [name]: event.target.value }))}
        className="mt-2 w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none focus:border-foreground"
        {...props}
      />
      {errors[name] ? <p className="mt-1 text-[11px] text-destructive">{errors[name]}</p> : null}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      <button
        type="button"
        aria-label="Close cart"
        onClick={close}
        className="absolute inset-0 bg-black/70"
      />

      <aside
        role="dialog"
        aria-label="Cart"
        className="relative flex h-full w-full max-w-md flex-col border-l border-border bg-background"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <p className="text-[11px] font-semibold tracking-wide-label text-foreground">
            {step === "cart" ? `YOUR BAG (${count})` : step === "checkout" ? "CASH ON DELIVERY" : "ORDER CONFIRMED"}
          </p>
          <button
            type="button"
            aria-label="Close cart"
            onClick={close}
            className="text-foreground transition-opacity hover:opacity-60"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {step === "done" && order ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="flex h-14 w-14 items-center justify-center border border-foreground">
              <Check className="h-7 w-7 text-foreground" strokeWidth={1.5} />
            </span>
            <h2 className="text-lg font-semibold tracking-wide-label text-foreground">
              ORDER {order.id}
            </h2>
            <p className="text-sm text-muted-foreground">
              Pay {formatINR(order.total)} in cash when your parfum arrives. We&apos;ll call{" "}
              {order.customer.phone} to confirm before dispatch.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-4 border border-foreground px-8 py-3 text-[11px] font-semibold tracking-wide-label text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              CONTINUE BROWSING
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <p className="text-sm text-muted-foreground">Your bag is empty.</p>
            <button
              type="button"
              onClick={close}
              className="border border-foreground px-8 py-3 text-[11px] font-semibold tracking-wide-label text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              SHOP THE COLLECTION
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-5">
              {step === "cart" ? (
                <ul className="space-y-5">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4 border-b border-border pb-5">
                      <div className="w-20 shrink-0 bg-primary p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-[11px] font-semibold tracking-wide-label text-foreground">
                          {item.name} ({item.size}ML)
                        </p>
                        <p className="mt-1 text-sm text-foreground">{formatINR(item.price)}</p>
                        <div className="mt-3 flex items-center gap-3">
                          <div className="flex items-center border border-border">
                            <button
                              type="button"
                              aria-label={`Decrease quantity of ${item.size}ml`}
                              onClick={() => setQty(item.id, item.qty - 1)}
                              className="px-2 py-1.5 text-foreground transition-opacity hover:opacity-60"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="min-w-8 text-center text-xs text-foreground">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              aria-label={`Increase quantity of ${item.size}ml`}
                              onClick={() => setQty(item.id, item.qty + 1)}
                              className="px-2 py-1.5 text-foreground transition-opacity hover:opacity-60"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(item.id)}
                            className="text-[10px] tracking-wide-label text-muted-foreground underline transition-opacity hover:opacity-70"
                          >
                            REMOVE
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <form id="cod-form" onSubmit={submit} className="space-y-4">
                  {field("name", "FULL NAME", { autoComplete: "name" })}
                  {field("phone", "MOBILE NUMBER", {
                    inputMode: "numeric",
                    maxLength: 10,
                    autoComplete: "tel",
                  })}
                  {field("address", "ADDRESS", { autoComplete: "street-address" })}
                  <div className="grid grid-cols-2 gap-4">
                    {field("city", "CITY", { autoComplete: "address-level2" })}
                    {field("pincode", "PIN CODE", { inputMode: "numeric", maxLength: 6 })}
                  </div>
                  <p className="border border-border p-4 text-[11px] leading-relaxed tracking-wide-label text-muted-foreground">
                    CASH ON DELIVERY · PAY {formatINR(total)} TO THE COURIER. NO ADVANCE PAYMENT
                    REQUIRED.
                  </p>
                </form>
              )}
            </div>

            <div className="border-t border-border px-5 py-5">
              <dl className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd>{formatINR(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd>{shipping === 0 ? "FREE" : formatINR(shipping)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>COD handling</dt>
                  <dd>{formatINR(codFee)}</dd>
                </div>
                <div className="flex justify-between pt-2 text-sm font-semibold text-foreground">
                  <dt>Total payable on delivery</dt>
                  <dd>{formatINR(total)}</dd>
                </div>
              </dl>

              {step === "cart" ? (
                <button
                  type="button"
                  onClick={() => setStep("checkout")}
                  className="mt-5 w-full bg-foreground py-4 text-[11px] font-semibold tracking-wide-label text-background transition-opacity hover:opacity-85"
                >
                  CHECKOUT · CASH ON DELIVERY
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    form="cod-form"
                    className="mt-5 w-full bg-foreground py-4 text-[11px] font-semibold tracking-wide-label text-background transition-opacity hover:opacity-85"
                  >
                    PLACE COD ORDER
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("cart")}
                    className="mt-3 w-full text-[10px] tracking-wide-label text-muted-foreground underline"
                  >
                    BACK TO BAG
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
