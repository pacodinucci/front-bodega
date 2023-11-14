import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from '@/types';


interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: Product) => {

      set({ items: [...get().items, data] });
      toast.success('Producto agregado al carrito.');
    },
    removeItem: (id: string) => {
      const index = get().items.findIndex((item) => item.id === id);

      if (index !== -1) {
        const updatedItems = [...get().items];
        updatedItems.splice(index, 1);
        set({ items: updatedItems });
        toast.success('Item removed from cart.');
      }
    },
    removeAll: () => set({ items: [] }),
  }), {
    name: 'cart-storage',
    storage: createJSONStorage(() => localStorage)
  }));

export default useCart;