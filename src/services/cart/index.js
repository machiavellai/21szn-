import Cookies from "js-cookie";

export const addToCart = async (FormData) => {
  try {
    const response = await fetch("/api/cart/add-to-cart", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(FormData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log();
  }
};

//gettign the cart items by the ID
export const getAllCartItems = async (id) => {
  try {
    const response = await fetch(`/api/cart/all-cart-ites?id=${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFromCart = async (id) => {
  try {
    const response = await fetch(`/api/cart/delete-from-cart?id=${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
