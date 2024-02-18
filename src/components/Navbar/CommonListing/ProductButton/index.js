"use client";

import { GlobalContext } from "@/context";
import { deleteAProduct } from "@/services/product";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import ComponentLevelLoader from "../../Loader/componentLevel";
import { toast } from "react-toastify";
import { addToCart } from "@/services/cart";

//pass in item as a prop to the Product vutton so as to delete or updat one item as it's clicked
export default function ProductButton({ item }) {
  const pathName = usePathname();

  //adding the currentUpdatedProdcut fromt he global context
  const {
    setCurrentUpdatedProduct,
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    showCartModal,
    setShowCartModal,
  } = useContext(GlobalContext);

  const router = useRouter();

  //sets the admin view to be true to the current user
  const isAdminView = pathName.includes("admin-view");

  async function handleDeleteProdcut(item) {
    setComponentLevelLoader({ loading: true, id: item._id });

    const response = await deleteAProduct(item._id);

    if (response.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.refresh();
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  //function to add to cart
  async function handleAddToCArt(getItem) {
    setComponentLevelLoader({ loading: true, id: getItem._id });

    const response = await addToCart({
      productID: getItem._id,
      userID: user._id,
    });

    if (response.success) {
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    }

    console.log(response);
  }

  return isAdminView ? (
    //conditon for what theuser will see depending on the role Admin/Client View
    <>
      {" "}
      <button
        onClick={() => {
          setCurrentUpdatedProduct(item);
          router.push("/admin-view/add-products");
        }}
        className="mt-1.5 w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
      >
        Update
      </button>
      <button
        onClick={() => handleDeleteProdcut(item)}
        className="mt-1.5 w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        item._id === componentLevelLoader.id ? (
          <ComponentLevelLoader
            text={"Deleting Prodcut"}
            color={"#ffffff"}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          "DELETE"
        )}
      </button>
    </>
  ) : (
    <>
      <button
        onClick={() => handleAddToCArt(item)}
        className="mt-1.5 w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        componentLevelLoader.id === item._id ? (
          <ComponentLevelLoader
            text={"Adding Prodcut to cart"}
            color={"#ffffff"}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          " Add to Cart"
        )}
      </button>
    </>
  );
}
