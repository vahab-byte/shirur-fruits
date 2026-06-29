import { useState, useEffect } from "react";
import { cartStore, CartItem } from "@/lib/cart";
import { ShopProduct } from "@/lib/products";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [count, setCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    // Sync state on mount and on subscribe events
    const unsubscribe = cartStore.subscribe(() => {
      setItems(cartStore.getCart());
      setCount(cartStore.getCartCount());
      setSubtotal(cartStore.getCartSubtotal());
    });

    return unsubscribe;
  }, []);

  return {
    items,
    count,
    subtotal,
    addToCart: cartStore.addToCart,
    updateQty: cartStore.updateQty,
    removeFromCart: cartStore.removeFromCart,
    clearCart: cartStore.clearCart,
  };
}
