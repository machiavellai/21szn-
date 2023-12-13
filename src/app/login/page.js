"use client";

import { loginFormControls } from "@/utils";
import InputComponent from "../../components/Navbar/FormElements/InputComponents";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { login } from "@/services/login";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import ComponentLevelLoader from "../../components/Navbar/Loader/componentLevel";
import Notification from "../../components/Navbar/Notifications";
import { toast } from "react-toastify";

const initialFormdata = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState(initialFormdata);

  const {
    isAuthUser,
    setIsAuthUser,
    user,
    setUser,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);

  // logic to route a user to a new screen after onboarding
  const router = useRouter();

  console.log(formData);

  //function to validate the forms of the frontend

  function isValidForm() {
    return formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  // function to handle login

  async function handleLogin() {
    setComponentLevelLoader({ loading: true, id: "" });
//made changes by applying try and catch to log the errors to the an exact pinpoint
    try {
      console.log("Before login API call. FormData:", formData);
      const res = await login(formData);
      console.log("After login API call. Response:", res);

      if (res.success) {
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsAuthUser(true);
        setUser(res?.finalData?.user);
        setFormData(initialFormdata);
        Cookies.set("token", res?.finalData?.token);
        localStorage.setItem("user", JSON.stringify(res?.finalData?.user));
        setComponentLevelLoader({ loading: false, id: "" });
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsAuthUser(false);
        setComponentLevelLoader({ loading: false, id: "" });
      }
      // ... rest of your code
    } catch (error) {
      console.error("Error in handleLogin:", error);
    } finally {
      setComponentLevelLoader({ loading: false, id: "" });
    }
    // const res = await login(formData);
    // console.log(res);
  }

  console.log(isAuthUser, user);

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
                Login
              </p>
              {/* next conditon for a registered user to Login! */}

              <div className="w-full mt-6 mr-0 mb-0 relative space-y-8">
                {loginFormControls.map((controlItem) =>
                  controlItem.componentType === "input" ? (
                    <InputComponent
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      value={formData[controlItem.id]}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          [controlItem.id]: event.target.value,
                        });
                      }}
                    />
                  ) : null
                )}
                <button
                  className=" disabled:opacity-60 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                  disabled={!isValidForm()}
                  onClick={handleLogin}
                >
                  {componentLevelLoader && componentLevelLoader.loading ? (
                    <ComponentLevelLoader
                      text={"Logging In"}
                      color={"#ffffff"}
                      loading={
                        componentLevelLoader && componentLevelLoader.loading
                      }
                    />
                  ) : (
                    "Login"
                  )}
                </button>
                <div className="flex flex-col gap-2">
                  <p>New to website ?</p>
                  <button
                    className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                    onClick={() => router.push("/register")}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
}
