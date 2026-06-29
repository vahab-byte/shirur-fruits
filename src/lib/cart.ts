import { ShopProduct } from "./products";

export interface CartItem {
  product: ShopProduct;
  quantity: number;
}

type Subscriber = () => void;
const subscribers = new Set<Subscriber>();

let cartItems: CartItem[] = [];

// Helper to load cart from localStorage safely on client
const loadCart = () => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("shirur_fruits_cart");
      if (stored) {
        cartItems = JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to load cart", e);
    }
  }
};

// Save cart to localStorage
const saveCart = () => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("shirur_fruits_cart", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart", e);
    }
  }
  notifySubscribers();
};

const notifySubscribers = () => {
  subscribers.forEach((cb) => cb());
};

// Initialize cart
if (typeof window !== "undefined") {
  loadCart();
}

export const cartStore = {
  getCart(): CartItem[] {
    // Return a copy to prevent direct mutation issues
    return [...cartItems];
  },

  addToCart(product: ShopProduct, quantity: number = 1) {
    loadCart();
    const existing = cartItems.find((item) => item.product.id === product.id);
    if (existing) {
      existing.quantity = Math.min(product.stock, existing.quantity + quantity);
    } else {
      cartItems.push({ product, quantity: Math.min(product.stock, quantity) });
    }
    saveCart();
  },

  updateQty(productId: string, quantity: number) {
    loadCart();
    const item = cartItems.find((item) => item.product.id === productId);
    if (item) {
      item.quantity = Math.max(1, Math.min(item.product.stock, quantity));
      saveCart();
    }
  },

  removeFromCart(productId: string) {
    loadCart();
    cartItems = cartItems.filter((item) => item.product.id !== productId);
    saveCart();
  },

  clearCart() {
    cartItems = [];
    saveCart();
  },

  getCartCount(): number {
    loadCart();
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  },

  getCartSubtotal(): number {
    loadCart();
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  },

  subscribe(callback: Subscriber) {
    subscribers.add(callback);
    // Call once immediately to align state
    callback();
    return () => {
      subscribers.delete(callback);
    };
  },
};
