import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  size: number;
  price: number;
  image: string;
  qty: number;
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  placedAt: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
  };
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  shipping: number;
  codFee: number;
  total: number;
  isOpen: boolean;
  lastOrder: Order | null;
  openCart: () => void;
  closeCart: () => void;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  placeOrder: (customer: Order["customer"]) => Order;
};

const STORAGE_KEY = "sarkar-cart-v1";
const FREE_SHIPPING_OVER = 999;
const SHIPPING_FLAT = 99;
const COD_FEE = 49;

const CartContext = createContext<CartContextValue | null>(null);

export function formatINR(value: number) {
  return `₹ ${value.toLocaleString("en-IN")}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      // ignore malformed storage
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota errors
    }
  }, [items]);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((current) => {
      const existing = current.find((entry) => entry.id === item.id);
      if (existing) {
        return current.map((entry) =>
          entry.id === item.id ? { ...entry, qty: entry.qty + qty } : entry,
        );
      }
      return [...current, { ...item, qty }];
    });
    setIsOpen(true);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((current) =>
      qty <= 0
        ? current.filter((entry) => entry.id !== id)
        : current.map((entry) => (entry.id === id ? { ...entry, qty } : entry)),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setItems((current) => current.filter((entry) => entry.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const subtotal = items.reduce((sum, entry) => sum + entry.price * entry.qty, 0);
  const shipping = items.length === 0 || subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FLAT;
  const codFee = items.length === 0 ? 0 : COD_FEE;
  const total = subtotal + shipping + codFee;
  const count = items.reduce((sum, entry) => sum + entry.qty, 0);

  const placeOrder = useCallback(
    (customer: Order["customer"]) => {
      const order: Order = {
        id: `SK-${Date.now().toString().slice(-8)}`,
        items,
        total,
        placedAt: new Date().toISOString(),
        customer,
      };
      setLastOrder(order);
      setItems([]);
      try {
        const raw = window.localStorage.getItem("sarkar-orders-v1");
        const history = raw ? (JSON.parse(raw) as Order[]) : [];
        window.localStorage.setItem("sarkar-orders-v1", JSON.stringify([order, ...history]));
      } catch {
        // ignore quota errors
      }
      return order;
    },
    [items, total],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count,
      subtotal,
      shipping,
      codFee,
      total,
      isOpen,
      lastOrder,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      add,
      setQty,
      remove,
      clear,
      placeOrder,
    }),
    [
      items,
      count,
      subtotal,
      shipping,
      codFee,
      total,
      isOpen,
      lastOrder,
      add,
      setQty,
      remove,
      clear,
      placeOrder,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
