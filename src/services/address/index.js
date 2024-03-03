import Cookies from "js-cookie";

export const addNewAddress = async (FormData) => {
  try {
    const response = await fetch("/api/address/add-new-address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(FormData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// get all addressed from user

export const fetchAllAddresses = async (id) => {
  try {
    const response = await fetch(`/api/address/get-all-address?id=${id}`, {
      method: "GET",
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
export const updateAddress = async (FormData) => {
  try {
    const response = await fetch("/api/address/update-address", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(FormData),
    });

    const data = await response.json();
    console.log("Received data:", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteAddress = async (id) => {
  try {
    const response = await fetch(`/api/address/delete-address?id=${id}`, {
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
