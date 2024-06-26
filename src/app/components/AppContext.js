"use client";

import { SessionProvider } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct){
  let price = cartProduct.basePrice;
  if(cartProduct.size){price+=cartProduct.size.price}
  if(cartProduct.extras?.length > 0){
    for(const extra of cartProduct.extras){
      price += extra.price
    }
  }
  return price;
}

function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  const ls = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  function clearCart(){
    setCartProducts([])
    saveCartProductsToLocalStorage([]);
  }

  function removeCartProducts(indexToRemove){
    setCartProducts(prevCartProducts => {
      const newCartProducts = prevCartProducts.filter((v, index) => index != indexToRemove);
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;

    })
    toast.success('Product removed')

  }

  function saveCartProductsToLocalStorage(cartProducts) {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  }

  function addToCart(product, size = [], extras = []) {
    setCartProducts((prevProducts) => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prevProducts, cartProduct];
      console.log(newProducts)
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }

  return (
    <SessionProvider>
      <CartContext.Provider
        value={{ cartProducts, setCartProducts, addToCart, removeCartProducts, clearCart }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}

export default AppProvider;
