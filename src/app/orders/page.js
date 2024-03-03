"use client";

import { GlobalContext } from "@/context";
import { getAllOrdersFromUser } from "@/services/order";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import Notification from "@/components/Navbar/Notifications";

export default function Orders() {
  const {
    user,
    pageLevelLoader,
    setPageLevelLoader,
    allOrdersForUser,
    setAllOrderForUser,
  } = useContext(GlobalContext);

  async function extractAllorders() {
    setPageLevelLoader(true);

    const response = await getAllOrdersFromUser(user?._id);

    if (response.success) {
      setPageLevelLoader(false);

      setAllOrderForUser(response.data);
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setPageLevelLoader(false);
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  useEffect(() => {
    if (user !== null) extractAllorders();
  }, [user]);

  console.log(allOrdersForUser);

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
    <section className=" h-screen bg-gray-200">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div>
            <div className=" px-4 py-6 sm:px-8 sm:py-10">
              <div className=" flow-root">
                {allOrdersForUser && allOrdersForUser.length ? (
                  <ul className=" flex flex-col gap-4">
                    {allOrdersForUser.map((item) => (
                      <li
                        key={item._id}
                        className=" bg-white shadow p-5 flex flex-col space-y-3 py-6 text-left"
                      >
                        <div className="flex">
                          <h1 className=" font-bold text-lg mb-3 flex-1">
                            #order: {item._id}
                          </h1>
                          <div className="flex items-center ">
                            <p className=" mr-3 text-sm font-medium text-gray-900">
                              Total Paid Amount
                            </p>
                            <p className=" mr-3 text-2xl font-semibold text-gray-900">
                              ${item.totalPrice}
                            </p>
                          </div>
                        </div>
                        <div className=" flex gap-2">
                          {item.orderItems.map((orderItem, index) => (
                            <div key={index} className=" shrink-0">
                              {/* logging the Url of the image */}
                              {console.log(
                                "Product Image URL:",
                                orderItem.product?.imageUrl
                              )}
                              <img
                                alt="OrderItem"
                                className="h-24 w-24 max-w-full rounded-lg object-cover"
                                src={
                                  orderItem &&
                                  orderItem.product &&
                                  orderItem.product.imageUrl
                                }
                              />
                            </div>
                          ))}
                        </div>
                        <div className=" flex gap-5">
                          <button className=" disabled:opacity-50  mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase rounded-md  tracking-wide">
                            {item.isProccessing
                              ? "Order is Processing!"
                              : "Oder is Delivered!"}
                          </button>
                          <button className=" disabled:opacity-50  mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase rounded-md  tracking-wide">
                            View Order Details
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}
