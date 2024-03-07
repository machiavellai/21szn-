"use client";

import { Fragment, useCallback, useContext, useEffect } from "react";
import CommonModel from "../Navbar/CommonModel";
import { GlobalContext } from "@/context";
import { deleteFromCart, getAllCartItems } from "@/services/cart";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

//fetching the all-cart api to be displayed on the modal
export default function CartModal() {
  const {
    showCartModal,
    setShowCartModal,
    cartItems,
    setCartItems,
    user,
    setComponentLevelLoader,
    componentLevelLoader,
  } = useContext(GlobalContext);

  const router = useRouter();

  async function extractAllCartItems() {
    const response = await getAllCartItems(user?._id);

    if (response.success) {
      const updatedData =
        response.data && response.data.length
          ? response.data.map((item) => ({
              ...item,
              productID: {
                ...item.productID,
                price:
                  item.productID.onSale === "yes"
                    ? parseInt(
                        (
                          item.productID.price -
                          item.productID.price *
                            (item.productID.priceDrop / 100)
                        ).toFixed(2)
                      )
                    : item.productID.price,
              },
            }))
          : [];
      setCartItems(updatedData);
      localStorage.setItem("cartItems", JSON.stringify(updatedData));
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

  return (
    <CommonModel
      showButton={true}
      show={showCartModal}
      setShow={setShowCartModal}
      mainContent={
        cartItems && cartItems.length ? (
          <ul role="list" className=" my-6 divide-y divide-gray-300">
            {cartItems.map((cartItems) => (
              <li key={cartItems} className="flex py-6">
                <div className=" h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={
                      cartItems &&
                      cartItems.productID &&
                      cartItems.productID.imageUrl
                    }
                    alt="cart item"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className=" flex justify-between text-base font-medium text-gray-900 ">
                      <h3>
                        {/* display the name of product */}

                        <a>
                          {cartItems &&
                            cartItems.productID &&
                            cartItems.productID.name}
                        </a>
                      </h3>
                    </div>

                    {/* display the price */}

                    <p className="mt-1 text-sm text-gray-600">
                      $
                      {cartItems &&
                        cartItems.productID &&
                        cartItems.productID.price}
                    </p>
                  </div>
                  <div className=" flex flex-1 items-end justify-between text-sm  ">
                    <button
                      type="button"
                      className="font-medium text-yellow-600 sm: order-2"
                      onClick={() => handleDeleteCartItem(cartItems._id)}
                    >
                      {componentLevelLoader &&
                      componentLevelLoader.loading &&
                      componentLevelLoader.id === cartItems._id ? (
                        <componentLevelLoader
                          text={"Removing from cart"}
                          color={"#000000"}
                          loading={
                            componentLevelLoader && componentLevelLoader.loading
                          }
                        />
                      ) : (
                        "Remove"
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : null
      }
      buttonComponent={
        <Fragment>
          <button
            type="button"
            onClick={() => {
              router.push("/Cart");
              setShowCartModal(false);
            }}
            className=" mt-1 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
          >
            Go to Cart
          </button>
          <button
            onClick={() => {
              router.push("/checkout");
              setShowCartModal(false);
            }}
            disabled={cartItems && cartItems.length === 0}
            type="button"
            className=" mt-1 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide  disabled:opacity-50"
          >
            Checkout
          </button>
          <div className=" mt-6 flex justify-center  text-center text-sm text-gray-600">
            <button type="button" className="font-medium text-grey ">
              continue shopping..
              <span arial-hidden="true"> &rarr;</span>
            </button>
          </div>
        </Fragment>
      }
      //rendering cart items
    />
  );
}
