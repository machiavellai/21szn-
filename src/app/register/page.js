"use client";

import { GlobalContext } from "@/context";
import InputComponent from "../../components/Navbar/FormElements/InputComponents";
import SelectComponent from "../../components/Navbar/FormElements/SelectComponent";
import { registerNewUser } from "../../services/register";
import { registrationFormControls } from "@/utils";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Notification from "@/components/Navbar/Notifications";

//logic for if a suser is registered to un up  the condition in the <p></p> tag

const isRegistered = false;

//handling the form on the frontend from the API
const initialFormData = {
  name: "",
  email: "",
  password: "",
  role: "customer",
};

export default function Register() {
  const [formData, setFormData] = useState(initialFormData);
  const [isRegistered, setIsRegistered] = useState(false);
  const { pageLevelLoader, setPageLevelLoader, isAuthUser } =
    useContext(GlobalContext);

  const router = useRouter();

  console.log(formData);

  //fucntion to validate forms on the frontend
  function isFormValid() {
    return formData &&
      formData.name &&
      formData.name.trim() !== "" &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }
  console.log(isFormValid());

  async function handleRegisterOnSubmit() {
    setPageLevelLoader(true);
    const data = await registerNewUser(formData);

    if (data.success) {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsRegistered(true);
      setPageLevelLoader(false);
      setFormData(initialFormData);
    } else {
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setPageLevelLoader(false);
      setFormData(initialFormData);
    }

    console.log(data);
  }

  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);

  return (
    <div className=" bg-white relative ">
      <div className=" flex felx-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className=" flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
          <div className="  w-full mt-20 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="  flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              {/* condition for the register Page  */}
              <p className="w-full text-4xl font-medium text-center font-serif">
                {isRegistered
                  ? "Registration Successful"
                  : "Sign Up for a account"}
              </p>
              {/* next conditon for a registered user to Login! */}

              {isRegistered ? (
                <button className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide">
                  Login
                </button>
              ) : (
                <div className="w-full mt-6 mr-0 mb-0 relative space-y-8">
                  {registrationFormControls.map((controlItem) =>
                    controlItem.componentType === "input" ? (
                      <InputComponent
                        type={controlItem.type}
                        placeholder={controlItem.placeholder}
                        label={controlItem.label}
                        onChange={(event) => {
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                        value={formData[controlItem.id]}
                      />
                    ) : controlItem.componentType === "select" ? (
                      <SelectComponent
                        options={controlItem.options}
                        label={controlItem.label}
                        onChange={(event) => {
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                        value={formData[controlItem.id]}
                      />
                    ) : null
                  )}
                  <button
                    className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                    disabled={!isFormValid()}
                    //calling the AP!!
                    onClick={handleRegisterOnSubmit}
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
}
