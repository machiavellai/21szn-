import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";

const stripe = require("stripe")(
  "sk_test_51OmS3gBco1GpMlnWPfjty5mzSIvc3eAfEbyjiCPZdv68iIBAYHm20NAWXnlCXv1EsjWcwLoGIiziY9x4AJGV51Rt00i5XuIYRG"
);

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    //setting up the stripe api
    const isAuthUser = await AuthUser(req);
    if (isAuthUser) {
      const response = await req.json();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: response,
        mode: "payment",
        success_url: "http://localhost:3000/checkout" + "?status=success",
        cancel_url: "http://localhost:3000/checkout" + "?status=cancel",
      });
      console.log(session);


      return NextResponse.json({
        success: true,
        id: session.id,
      });
    } 
    else {
      return NextResponse.json({
        status: 500,
        success: false,
        message: "You are not Authnticated",
      });
    }
  } 
  catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "something went wrong try again later",
    });
  }
}
