import Cookies from "js-cookie";

export const callStripeSession = async (FormData) => {
  try {
    //route file naming had isues
    const response = await fetch("/api/Stripe/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(FormData),
    });
    console.log(response);

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// const response = await fetch("/api/stripe/", {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//       Authorization: `Bearer ${Cookies.get("token")}`,
//     },
//     body: JSON.stringify(FormData),
//   });

//   console.log(response);

//   const data = await response.json();
//   return data;
