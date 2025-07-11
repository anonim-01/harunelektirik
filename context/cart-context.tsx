"use client"

import React, { createContext, useState, useContext, useEffect, useCallback } from "react"

interface CartItem {
  id: number
  name: string
  price: number
  imageUrl?: string
  quantity: number
  type: "product" | "service"
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void
  removeFromCart: (id: number, type: "product" | "service") => void
  updateQuantity: (id: number, type: "product" | "service", quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load cart from localStorage on initial load
  useEffect(() => {
    const storedCart = localStorage.getItem("harun-elektrik-cart")
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("harun-elektrik-cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = useCallback((item: Omit<CartItem, "quantity">, quantityToAdd = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id && i.type === item.type)
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id && i.type === item.type ? { ...i, quantity: i.quantity + quantityToAdd } : i,
        )
      } else {
        return [...prevItems, { ...item, quantity: quantityToAdd }]
      }
    })
  }, [])

  const removeFromCart = useCallback((id: number, type: "product" | "service") => {
    setCartItems((prevItems) => prevItems.filter((item) => !(item.id === id && item.type === type)))
  }, [])

  const updateQuantity = useCallback((id: number, type: "product" | "service", quantity: number) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => !(item.id === id && item.type === type))
      }
      return prevItems.map((item) => (item.id === id && item.type === type ? { ...item, quantity } : item))
    })
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }, [cartItems])

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [cartItems])

  const value = React.useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
    }),
    [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
