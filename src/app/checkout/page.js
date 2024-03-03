"use client";

import { GlobalContext } from "@/context";
import { fetchAllAddresses } from "@/services/address";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { images } from "../../../next.config";
import { callStripeSession } from "@/services/stripe";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { createNewOrder } from "@/services/order";
import Notification from "@/components/Navbar/Notifications";

export default function checkout() {
  //list of cart items and addresses

  const {
    cartItems,
    user,
    addresses,
    setAddresses,
    checkoutFormData,
    setCheckoutFormData,
  } = useContext(GlobalContext);

  const [selctedAddress, setSelectedAddress] = useState(null);
  const [isOrderProccessing, setIsOrderProccessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  console.log(cartItems);

  const router = useRouter();
  const params = useSearchParams();
  const publishableKey =
    "pk_test_51OmS3gBco1GpMlnWIgZ4GrB9NbY8eyzKzsSqBUIrWnhFKOYTCbchOPaoayf58d6iMg9HLLEYCVH4dkjWk2sAKANN001eQtcNN7";

  const stripePromise = loadStripe(publishableKey);

  async function getAllAddresses() {
    const response = await fetchAllAddresses(user?._id);

    if (response) {
      setAddresses(response.data);
    }
  }

  useEffect(() => {
    if (user !== null) getAllAddresses();
  }, [user]);

  useEffect(() => {
    async function createFinalOrder() {
      const isStripe = JSON.parse(localStorage.getItem("stripe"));

      if (
        isStripe &&
        params.get("status") === "success" &&
        cartItems &&
        cartItems.length > 0
      ) {
        setIsOrderProccessing(true);
        const getCheckoutFormData = JSON.parse(
          localStorage.getItem("checkoutFormData")
        );

        const createFinalCheckoutFormData = {
          user: user?._id,
          shippingAddress: getCheckoutFormData.shippingAddress,
          orderItems: cartItems.map((items) => ({
            qty: 1,
            prouct: items.productID,
          })),
          paymentMethod: "Stripe",
          totalPrice: cartItems.reduce(
            (total, item) => item.productID.price + total,
            0
          ),
          isPaid: true,
          isProcessing: true,
          paidAt: new Date(),
        };
        const response = await createNewOrder(createFinalCheckoutFormData);

        if (response.success) {
          setIsOrderProccessing(false);
          setOrderSuccess(true);
          toast.success(response.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          setIsOrderProccessing(false);
          setOrderSuccess(false);
          toast.error(response.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    }

    createFinalOrder();
  }, [params.get("status"), cartItems]);

  function handleSelectedAddress(getAddress) {
    if (getAddress._id === selctedAddress) {
      setSelectedAddress(null);
      setCheckoutFormData({
        ...checkoutFormData,
        shippingAddress: {},
      });
      return;
    }

    setSelectedAddress(getAddress._id);
    setCheckoutFormData({
      ...checkoutFormData,
      shippingAddress: {
        ...checkoutFormData.shippingAddress,
        fullName: getAddress.fullName,
        city: getAddress.city,
        country: getAddress.country,
        postalCode: getAddress.postalCode,
        address: getAddress.address,
      },
    });
  }

  async function handleCheckout() {
    const stripe = await stripePromise;

    const createLineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          images: [item.productID.imageUrl],
          name: item.productID.name,
        },
        unit_amount: item.productID.price * 100,
      },
      quantity: 1,
    }));

    const response = await callStripeSession(createLineItems);
    setIsOrderProccessing(true);
    localStorage.setItem("stripe", true);
    localStorage.setItem("checkoutFormData", JSON.stringify(checkoutFormData));
    console.log(response);
    const { error } = await stripe.redirectToCheckout({
      sessionId: response.id,
    });

    console.log(error);
  }

  console.log(checkoutFormData);

  useEffect(() => {
    if (orderSuccess) {
      setTimeout(() => {
         router.push("/orders");
      }, [2000]);
    }
  }, [orderSuccess]);

  if (orderSuccess) {
    return (
      <section className=" h-screen bg-gray-200">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
            <div className=" bg-white shadow ">
              <div className=" px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5 ">
                <h1 className="font-bold text-lg ">
                  Your Payment is Successful and you will be redirected to
                  orders page in 2 seconds
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isOrderProccessing) {
    return (
      <div className=" w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={isOrderProccessing}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div>
      <div className=" grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className=" px-4 pt-8">
          <p className="font-medium text-xl">Cart Summary</p>
          <div className=" mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-5">
            {cartItems && cartItems.length ? (
              cartItems.map((item) => (
                <div
                  className=" flex flex-col rounded-lg bg-white sm:flex-row"
                  key={item._id}
                >
                  <img
                    src={item && item.productID && item.productID.imageUrl}
                    alt="Cart Items"
                    className=" m-2 h-24 w-28 rounded-md border object-cover object-center"
                  />
                  <div className=" flex w-full flex-col px4 py-4">
                    <span className=" font-bold">
                      {item && item.productID && item.productID.name}
                    </span>
                    <span className=" font-semibold">
                      {item && item.productID && item.productID.price}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div>Your Cart is empty</div>
            )}
          </div>
        </div>
        <div className=" mt-10 bg-gray-50 px-4 pt-8 lg:mt-0 ">
          <p className=" text-xl font-medium">Shipping address details</p>
          <p className=" text-gray-500 font-bold">
            Complete your order by selecting address below
          </p>
          <div className=" w-full mt-6 mr-0 mb-0 ml-0 space-y-6">
            {addresses && addresses.length ? (
              addresses.map((item) => (
                <div
                  onClick={() => handleSelectedAddress(item)}
                  key={item._id}
                  className={` border p-6 ${
                    item._id === selctedAddress ? "border-red-900" : ""
                  }`}
                >
                  <p>Name: {item.fullName} </p>
                  <p>Address: {item.address} </p>
                  <p>City: {item.city} </p>
                  <p>Country: {item.country} </p>
                  <p>PostalCode: {item.postalCode} </p>
                  <button className=" mt-5 mr-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase rounded-md  tracking-wide">
                    {item._id === selctedAddress
                      ? "Selected Address"
                      : "Select Address"}
                  </button>
                </div>
              ))
            ) : (
              <p>No addresses added</p>
            )}
          </div>
          <button
            onClick={() => router.push("/Account")}
            className=" mt-5 mr-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase rounded-md  tracking-wide"
          >
            Add New Address
          </button>
          <div className="mt-6 border-t border-b py-2">
            <div className=" flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Subtotal</p>
              <p className="text-lg font-bold text-gray-800">
                $
                {cartItems && cartItems.length
                  ? cartItems.reduce(
                      (total, item) => item.productID.price + total,
                      0
                    )
                  : "0"}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Shipping</p>
              <p className="text-sm font-medium text-gray-900">Free</p>
            </div>
            <div className=" flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-lg font-bold text-gray-800">
                $
                {cartItems && cartItems.length
                  ? cartItems.reduce(
                      (total, item) => item.productID.price + total,
                      0
                    )
                  : "0"}
              </p>
            </div>
            <div className="pb-10">
              <button
                disabled={
                  (cartItems && cartItems.length === 0) ||
                  Object.keys(checkoutFormData.shippingAddress).length === 0
                }
                onClick={handleCheckout}
                className=" disabled:opacity-50  mt-5 mr-5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase rounded-md  tracking-wide"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
}
