//react context

import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { popularProducts } from "../data";

export const AppContext = React.createContext();
export const useCtx = () => {
  return React.useContext(AppContext);
};

export const CtxProvider = (props) => {
  const [cart, setCart] = useState([
    {
      id: 7,
      price: 300,
      currency: "CFX",
      size: "6.99",
      title: "Iphone Main 1",
      color: "white",
      img: "https://i.ibb.co/r6QmNn7/iphonemain1.png",
      count: 1,
    },
    {
      id: 8,
      price: 300,
      currency: "CFX",
      size: "6.99",
      title: "Android Watch",
      color: "white",
      img: "https://i.ibb.co/HHPtKdF/androidwatch.png",
      count: 1,
    },
  ]);
  const [products, setProd] = useState(popularProducts ? popularProducts : []);
  const [cartIds, setCartIds] = useState([]);

  const serializeCartIds = () => {
    setCartIds(cart.map((item) => item.id));
  };

  useEffect(() => {
    serializeCartIds();
  }, [cart]);

  const addCartItem = (item) => {
    let newItem = { ...item, count: 1 };
    setCart((prev) => [...prev, newItem]);
    cogoToast.info("Item added to cart", { position: "bottom-right" });
  };
  const removeCartItem = (id) => {
    setCart((prev) =>
      prev.filter((item) => {
        return item.id !== id;
      })
    );
    cogoToast.info("Item removed to cart", { position: "bottom-right" });
  };

  const increment = (id) => {
    let oldCart = [...cart];
    let itemIndex = oldCart.findIndex((item) => item.id === id);
    oldCart[itemIndex].count++;

    setCart((prev) => [...oldCart]);
  };
  const decrement = (id) => {
    let oldCart = [...cart];
    let itemIndex = oldCart.findIndex((item) => item.id === id);
    if (oldCart[itemIndex].count > 1) {
      oldCart[itemIndex].count--;
    }

    setCart((prev) => [...oldCart]);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addCartItem,
        removeCartItem,
        products,
        increment,
        decrement,
        cartIds,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
