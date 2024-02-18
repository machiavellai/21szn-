"use client";

import CommonCart from "@/components/CommonCart";
import { GlobalContext } from "@/context";
import { deleteFromCart, getAllCartItems } from "@/services/cart";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function CartPage() {
  const {
    user,
    setCartItems,
    cartItems,
    pageLevelLoader,
    setPageLevelLoader,
    setComponentLevelLoader,
    componentLevelLoader,
  } = useContext(GlobalContext);

  async function extractAllCartItems() {
    setPageLevelLoader(true);
    const response = await getAllCartItems(user?._id);

    if (response.success) {
      setCartItems(response.data);
      setPageLevelLoader(false);
      localStorage.setItem("cartItems", JSON.stringify(response.data));
    }
    console.log(response);
  }

  useEffect(() => {
    if (user !== null) extractAllCartItems();

    // return () => {
    //   second;
    // };
  }, [user]);

  async function handleDeleteCartItem(getCartItemID) {
    setComponentLevelLoader({ loading: true, id: getCartItemID });
    const response = await deleteFromCart(getCartItemID);

    if (response.success) {
      setComponentLevelLoader({ loading: false, id: " " });
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      extractAllCartItems();
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: true, id: getCartItemID });
    }
  }

  if (pageLevelLoader) {
    return (
      <div className=" w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={pageLevelLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <CommonCart
      componentLevelLoader={componentLevelLoader}
      handleDeleteCartItem={handleDeleteCartItem}
      cartItems={cartItems}
    />
  );
}
