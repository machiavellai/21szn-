//cretae the add new product service

import Cookies from "js-cookie";

export const addNewProduct = async (formData) => {
  try {
    const response = await fetch("/api/admin/add-products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

//service to get the all-product on the admin view
export const getAllAdminProducts = async () => {
  try {
    const response = await fetch(
      "https://21szn.vercel.app/product/listing/all-products",
      {
        method: "GET",
        cache: "no-store",
        
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

//service to update a new product on the admin view

export const updateAProduct = async (formData) => {
  try {
    const response = await fetch("/api/admin/update-product", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAProduct = async (id) => {
  try {
    const response = await fetch(`/api/admin/delete-product?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const productByCategory = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/admin/product-by-category?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const productById = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/admin/product-by-id?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
