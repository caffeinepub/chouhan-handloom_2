import { createContext, useContext } from "react";

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export interface AppContextType {
  cartItems: CartItem[];
  wishlist: Set<number>;
  cartOpen: boolean;
  musicPlaying: boolean;
  mobileMenuOpen: boolean;
  cartCount: number;
  cartTotal: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, delta: number) => void;
  toggleWishlist: (id: number) => void;
  setCartOpen: (open: boolean) => void;
  setMusicPlaying: (playing: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const AppContext = createContext<AppContextType>({
  cartItems: [],
  wishlist: new Set(),
  cartOpen: false,
  musicPlaying: false,
  mobileMenuOpen: false,
  cartCount: 0,
  cartTotal: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  toggleWishlist: () => {},
  setCartOpen: () => {},
  setMusicPlaying: () => {},
  setMobileMenuOpen: () => {},
});

export const useAppContext = () => useContext(AppContext);
