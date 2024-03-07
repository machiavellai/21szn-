"use client";

import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/services/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);

  const [products, setProducts] = useState([]);
  const router = useRouter();
  async function getListOfProducts() {
    const response = await getAllAdminProducts();

    if (response.success) {
      setProducts(response.data);
    }
  }

  useEffect(() => {
    getListOfProducts();
  }, []);

  console.log(products);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className=" mr-auto place-self-center lg:col-span-7">
            <h1 className=" max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
              Dive Into 21SZN Collection
            </h1>
            <p className=" max-w-2xl mb-4 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
              Discover the art of self-expression through our exclusive range of
              apparel and accessories.
            </p>
            <button
              type="button"
              onClick={() => router.push("/product/listing/all-products")}
              className=" hover:bg-red-900 mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded-md"
            >
              Explore Collections
            </button>
          </div>
          <div className=" hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://i.pinimg.com/564x/3f/b9/8d/3fb98dbf96a6195f7eba436c84b5f552.jpg"
              alt="Exploe our shop Collections"
              className=" rounded-xl"
            />
          </div>
        </div>

        {/* body rebder */}

        <div className=" max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
            <div className=" grid p6 bg-gray-100 rounded place-content-center sm:p-8">
              <div className=" max-w-md mx-auto text-center lg:text-left">
                <div>
                  <h2 className=" text-xl font-bold text-gray-900 sm:text-3xl ">
                    {" "}
                    Prime Sale Collection
                  </h2>
                </div>
                <button
                  onClick={() => router.push("/product/listing/all-products")}
                  className=" hover:bg-red-900 mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded-md"
                >
                  Shop All
                </button>
              </div>
            </div>

            <div className=" lg:col-span-2 lg:py-8">
              <ul className=" grid grid-cols-2 gap-4">
                {products && products.length
                  ? products
                      .filter((item) => item.onSale === "yes")
                      .splice(1, 4)
                      .map((productItem) => (
                        <li
                          onClick={() =>
                            router.push(`/product/${productItem._id}`)
                          }
                          className=" cursor-pointer"
                          key={productItem._id}
                        >
                          <div>
                            <img
                              src={productItem.imageUrl}
                              alt="Sale Product Item"
                              className=" object-cover w-full rounded aspect-square "
                            />
                          </div>
                          <div className=" mt-3">
                            <h3 className=" font-medium text-gray-900">
                              {" "}
                              {productItem.name}{" "}
                            </h3>
                            <p className=" mt-1 text-sm text-gray-800">
                              ${productItem.price}{" "}
                              <span className=" text-red-600">{`(-${productItem.priceDrop}%)Off`}</span>{" "}
                            </p>
                          </div>
                        </li>
                      ))
                  : null}
              </ul>
            </div>
          </div>
        </div>

        {/* category */}

        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <div className="text-center">
            <h2 className=" text-xl font-bold text-gray-900 sm:text-3xl">
              Shop By Category
            </h2>
          </div>
          <ul className=" grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
            <li>
              <div className="relative block group">
                <img
                  src="https://i.pinimg.com/474x/2c/c5/9b/2cc59b0edd608d4fdc60c69ac5a12156.jpg"
                  className=" object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className=" text-xl font-medium text-white">KIDS</h3>
                  <button
                    onClick={() => router.push("/product/listing/kids")}
                    className=" hover:bg-red-900 mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded-md"
                  >
                    Shop NOw
                  </button>
                </div>
              </div>
            </li>
            <li>
              <div className="relative block group">
                <img
                  src="https://i.pinimg.com/736x/fc/fd/22/fcfd224db23b6884104c457d708bdcdb.jpg"
                  className=" object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className=" text-xl font-medium text-white">MEN</h3>
                  <button
                    onClick={() => router.push("/product/listing/men")}
                    className=" hover:bg-red-900 mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded-md"
                  >
                    Shop NOw
                  </button>
                </div>
              </div>
            </li>
            <li className=" lg:col-span-2 lg: col-start-2 lg:row-span-2 lg:row-start-1 ">
              <div className="relative block group">
                <img
                  src="https://i.pinimg.com/564x/62/e6/c2/62e6c2b48ef4f76bd3971ab6fdd01cf8.jpg"
                  className=" object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className=" text-xl font-medium text-white">WOMEN</h3>
                  <button
                    onClick={() => router.push("/product/listing/women")}
                    className=" hover:bg-red-900 mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded-md"
                  >
                    Shop NOw
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
