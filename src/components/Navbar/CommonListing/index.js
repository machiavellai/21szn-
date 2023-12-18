"use client";

import { useRouter } from "next/navigation";
import ProductTile from "./ProductTile";
import { useEffect } from "react";
// import Notification from "../Notification";
import ProductButton from "./ProductButton";
import Notification from "@/components/Navbar/Notifications";

// const dummyData = [
//   {
//     _id: {
//       $oid: "656e8f72e519a0d48e24d2dd",
//     },
//     name: "Reeves Blacl",
//     description:
//       "Introducing the Black Reeves Collection – a fusion of timeless elegance, artistic expression, and profound cultural roots. This meticulously crafted merchandise transcends the boundaries of fashion, offering a unique blend of style and heritage.",
//     price: 100,
//     category: "men",
//     sizes: [
//       {
//         id: "m",
//         label: "M",
//       },
//       {
//         id: "l",
//         label: "L",
//       },
//       {
//         id: "xl",
//         label: "XL",
//       },
//       {
//         id: "xxl",
//         label: "XXL",
//       },
//     ],
//     deliveryInfo: "free",
//     onSale: "yes",
//     priceDrop: 14,
//     imageUrl:
//       "https://firebasestorage.googleapis.com/v0/b/eccomerce-2023.appspot.com/o/ecommerce%2F397560673_17854623456065739_9160161754333128210_n.jpg-1701744298548-57clh70kj3?alt=media&token=be68f895-8fe0-4d94-a0b9-662bc128245a",
//     createdAt: {
//       $date: "2023-12-05T02:48:18.459Z",
//     },
//     updatedAt: {
//       $date: "2023-12-05T02:48:18.459Z",
//     },
//     __v: 0,
//   },
// ];

export default function CommonListing({ data }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
          {data && data.length
            ? data.map((item) => (
                <article
                  className="relative flex flex-col overflow-hidden border cursor-pointer"
                  key={item._id}
                >
                  <ProductTile item={item} />
                  <ProductButton item={item} />
                </article>
              ))
            : null}
        </div>
      </div>
      <Notification />
    </section>
  );
}
