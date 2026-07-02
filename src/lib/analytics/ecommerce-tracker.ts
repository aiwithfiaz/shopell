declare global {
  interface Window {
    dataLayer: any[]
  }
}

interface Product {
  item_id: string
  item_name: string
  price: number
  quantity: number
  item_brand?: string
  item_category?: string
  item_category2?: string
  item_variant?: string
}

interface CartItem extends Product {
  quantity: number
}

interface Order {
  transaction_id: string
  value: number
  tax: number
  shipping: number
  currency: string
  items: CartItem[]
  coupon?: string
}

class EcommerceTracker {
  private dataLayer: any[]

  constructor() {
    this.dataLayer = typeof window !== 'undefined' ? (window.dataLayer = window.dataLayer || []) : []
  }

  push(event: string, data: any) {
    this.dataLayer.push({
      event,
      ecommerce: data,
    })
  }

  viewItemList(items: Product[], itemListName: string, itemListId?: string) {
    this.push('view_item_list', {
      item_list_id: itemListId,
      item_list_name: itemListName,
      items,
    })
  }

  selectItem(item: Product) {
    this.push('select_item', {
      items: [item],
    })
  }

  viewItem(item: Product) {
    this.push('view_item', {
      currency: 'USD',
      value: item.price,
      items: [item],
    })
  }

  addToCart(items: CartItem[]) {
    const value = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    this.push('add_to_cart', {
      currency: 'USD',
      value,
      items,
    })
  }

  removeFromCart(items: CartItem[]) {
    const value = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    this.push('remove_from_cart', {
      currency: 'USD',
      value,
      items,
    })
  }

  beginCheckout(items: CartItem[], coupon?: string) {
    const value = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    this.push('begin_checkout', {
      currency: 'USD',
      value,
      coupon,
      items,
    })
  }

  addShippingInfo(shippingTier: string) {
    this.push('add_shipping_info', {
      shipping_tier: shippingTier,
    })
  }

  addPaymentInfo(paymentType: string) {
    this.push('add_payment_info', {
      payment_type: paymentType,
    })
  }

  purchase(order: Order) {
    this.push('purchase', {
      transaction_id: order.transaction_id,
      affiliation: 'Shopell',
      value: order.value,
      tax: order.tax,
      shipping: order.shipping,
      currency: order.currency,
      coupon: order.coupon,
      items: order.items,
    })
  }

  refund(orderId: string, value?: number) {
    this.push('refund', {
      transaction_id: orderId,
      value,
    })
  }

  search(searchTerm: string) {
    this.push('search', {
      search_term: searchTerm,
    })
  }

  share(contentType: string, itemId: string) {
    this.push('share', {
      method: 'social',
      content_type: contentType,
      item_id: itemId,
    })
  }

  addItemToWishlist(items: Product[]) {
    this.push('add_to_wishlist', {
      items,
    })
  }
}

export const ecommerceTracker = new EcommerceTracker()
