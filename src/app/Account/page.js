"use client";

import InputComponent from "@/components/Navbar/FormElements/InputComponents";
import ComponentLevelLoader from "@/components/Navbar/Loader/componentLevel";
import Notification from "@/components/Navbar/Notifications";
import { GlobalContext } from "@/context";
import {
  addNewAddress,
  fetchAllAddresses,
  updateAddress,
} from "@/services/address";
import { addNewAddressFormControls } from "@/utils";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Account() {
  const {
    user,
    addresses,
    setAddresses,
    addressFormData,
    setAddressFormData,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [currentEditedAddressId, setCurrentEditedAddressId] = useState(null);

  //to fetch all addresses
  async function extractAllAdresses() {
    const response = await fetchAllAddresses(user?._id);
    // console.log(response);
    if (response.success) {
      setAddresses(response.data);
    }
    console.log(response);
  }

  async function handleAddOrUpdateAddress() {
    setComponentLevelLoader({ loading: true, id: "" });
    const response =
      currentEditedAddressId !== null
        ? await updateAddress({
            ...addressFormData,
            _id: currentEditedAddressId,
          })
        : await addNewAddress({
            ...addressFormData,
            userID: user?._id,
          });

    if (response.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setAddressFormData({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
      });
      extractAllAdresses();
      setCurrentEditedAddressId(null);
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setAddressFormData({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
      });
    }

    console.log(response);
  }

  function handleUpdateAddress(getCurrentAddress) {
    setShowAddressForm(true);
    setAddressFormData({
      fullName: getCurrentAddress.fullName,
      city: getCurrentAddress.city,
      country: getCurrentAddress.country,
      postalCode: getCurrentAddress.postalCode,
      address: getCurrentAddress.address,
    });
    setCurrentEditedAddressId(getCurrentAddress._id);
  }

  useEffect(() => {
    if (user !== null) extractAllAdresses();
  }, [user]);
  return (
    <section>
      <div className=" mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8 ">
        <div className=" bg-white shadow">
          <div className=" p-6 sm:p-12">
            <div className=" flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
              {/* we are rendering user image */}
            </div>

            <div className=" flex flex-col flex-1">
              <h4>{user?.name}</h4>
              <p>{user?.email}</p>
              <p>{user?.role}</p>
            </div>
            <button
              type="button"
              className=" mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase rounded-md  tracking-wide"
            >
              View you Orders
            </button>
            <div className=" mt-6">
              <h1 className=" font-bold text-lg ">Your Addresses : </h1>
              <div className=" mt-4 flex flex-col gap-4">
                {addresses && addresses.length ? (
                  addresses.map((item) => (
                    <div className="border p-6" key={item._id}>
                      <p>Name: {item.fullName} </p>
                      <p>Address: {item.address} </p>
                      <p>City: {item.city} </p>
                      <p>Country: {item.country} </p>
                      <p>PostalCode: {item.postalCode} </p>
                      <button
                        onClick={() => handleUpdateAddress(item)}
                        type="button"
                        className=" mt-5 mr-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase rounded-md  tracking-wide"
                      >
                        Update Address
                      </button>
                      <button
                        type="button"
                        className=" mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase rounded-md  tracking-wide"
                      >
                        Delete Address
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No address found please add anew address below</p>
                )}
              </div>
            </div>
            <div className=" mt-5">
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                type="button"
                className=" mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase rounded-md  tracking-wide"
              >
                {showAddressForm ? "Hide Address Form " : "Add New Address"}
              </button>
            </div>
            {showAddressForm ? (
              <div className=" flex flex-col mt-5 justify-center pt-4 items-center">
                <div className=" w-full mt-6  mr-0 mb-0 ml-0 space-y-8">
                  {addNewAddressFormControls.map((controlItem) => (
                    <InputComponent
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      value={addressFormData[controlItem.id]}
                      onChange={(event) =>
                        setAddressFormData({
                          ...addressFormData,
                          [controlItem.id]: event.target.value,
                        })
                      }
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className=" mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase rounded-md  tracking-wide"
                  onClick={handleAddOrUpdateAddress}
                >
                  {componentLevelLoader && componentLevelLoader.loading ? (
                    <ComponentLevelLoader
                      text={"Saving"}
                      color={"#ffffff"}
                      loading={
                        componentLevelLoader && componentLevelLoader.loading
                      }
                    />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}
