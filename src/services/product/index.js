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

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Log the API URL to ensure it's correctly set

  // console.log("API URL:", apiUrl);

  // if (!apiUrl) {
  //   console.error("NEXT_PUBLIC_API_URL is not defined");
  //   return null;
  // }

  try {
    const response = await fetch(
      `${apiUrl}/api/admin/all-products`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    console.log("Response:", response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data fetched:", data);
    return data;
  } catch (error) {
    console.log("Error fetching admin products:", error);
  }
};

// https://21szn.vercel.app/product/listing/all-products
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

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Log the API URL to ensure it's correctly set

  // console.log("API URL:", apiUrl);

  // if (!apiUrl) {
  //   console.error("NEXT_PUBLIC_API_URL is not defined");
  //   return null;
  // }

  try {
    const response = await fetch(
      `${apiUrl}/api/admin/product-by-category?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    console.log("Response:", response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data fetched:", data);

    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const productById = async (id) => {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(
      `${apiUrl}/api/admin/product-by-id?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    console.log("Response:", response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data fetched:", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
