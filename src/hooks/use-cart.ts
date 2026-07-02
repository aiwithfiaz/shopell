import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartProduct {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  image: string
  category?: string
  brand?: string
}

export interface CartItem {
  product: CartProduct
  quantity: number
  color?: string
  size?: string
}

interface CartStore {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  couponCode: string | null
  couponDiscount: number
  addItem: (product: CartProduct, quantity?: number, color?: string, size?: string) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  applyCoupon: (code: string) => boolean
  removeCoupon: () => void
}

const couponCodes: Record<string, number> = {
  'SAVE10': 10,
  'SAVE20': 20,
  'WELCOME15': 15,
  'FLAT50': 50,
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      couponCode: null,
      couponDiscount: 0,

      addItem: (product, quantity = 1, color, size) => {
        const items = get().items
        const existingItemIndex = items.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.color === color &&
            item.size === size
        )

        if (existingItemIndex > -1) {
          const updatedItems = [...items]
          updatedItems[existingItemIndex].quantity += quantity
          set({
            items: updatedItems,
            totalItems: get().totalItems + quantity,
            totalPrice: get().totalPrice + product.price * quantity,
          })
        } else {
          set({
            items: [...items, { product, quantity, color, size }],
            totalItems: get().totalItems + quantity,
            totalPrice: get().totalPrice + product.price * quantity,
          })
        }
      },

      removeItem: (productId) => {
        const items = get().items
        const item = items.find((item) => item.product.id === productId)
        if (item) {
          set({
            items: items.filter((i) => i.product.id !== productId),
            totalItems: get().totalItems - item.quantity,
            totalPrice: get().totalPrice - item.product.price * item.quantity,
          })
        }
      },

      updateQuantity: (productId, quantity) => {
        const items = get().items
        const itemIndex = items.findIndex((item) => item.product.id === productId)

        if (itemIndex > -1) {
          const item = items[itemIndex]
          const quantityDiff = quantity - item.quantity
          const updatedItems = [...items]
          updatedItems[itemIndex].quantity = quantity
          set({
            items: updatedItems,
            totalItems: get().totalItems + quantityDiff,
            totalPrice: get().totalPrice + item.product.price * quantityDiff,
          })
        }
      },

      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0, couponCode: null, couponDiscount: 0 }),

      applyCoupon: (code) => {
        const upperCode = code.toUpperCase()
        if (couponCodes[upperCode]) {
          set({ couponCode: upperCode, couponDiscount: couponCodes[upperCode] })
          return true
        }
        return false
      },

      removeCoupon: () => set({ couponCode: null, couponDiscount: 0 }),
    }),
    {
      name: 'shopell-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
