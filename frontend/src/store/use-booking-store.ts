import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface BookingState {
  // Search Context (User Input)
  dateRange: { from: Date | undefined; to: Date | undefined };
  guests: { adults: number; children: number };
  selectedBranchId: number | null;

  // Cart Context (Selection)
  cart: {
    roomTypeId: number;
    roomName: string;
    quantity: number;
    price: number;
  }[];

  // Actions
  setDateRange: (range: { from: Date | undefined; to: Date | undefined }) => void;
  setGuests: (guests: { adults: number; children: number }) => void;
  setSelectedBranchId: (branchId: number | null) => void;
  addToCart: (item: {
    roomTypeId: number;
    roomName: string;
    quantity: number;
    price: number;
  }) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;

  // Computed
  getTotalPrice: () => number;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      dateRange: { from: undefined, to: undefined },
      guests: { adults: 1, children: 0 },
      selectedBranchId: null,
      cart: [],

      setDateRange: (range) => set({ dateRange: range }),
      setGuests: (guests) => set({ guests }),
      setSelectedBranchId: (branchId) => set({ selectedBranchId: branchId }),

      addToCart: (item) =>
        set((state) => {
          // Logic to add or update quantity
          const existing = state.cart.find((i) => i.roomTypeId === item.roomTypeId);
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.roomTypeId === item.roomTypeId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { cart: [...state.cart, item] };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((i) => i.roomTypeId !== id),
        })),

      clearCart: () => set({ cart: [] }),

      getTotalPrice: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: "amy-booking-storage", // Key in LocalStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
