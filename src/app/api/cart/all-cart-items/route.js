import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

//dynamic properties
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();

    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const { searchParams } = new URL(req.url);

      const id = searchParams.get("id");

      if (!id)
        return NextResponse.json({ success: false, message: "Please login !" });

      const extractAllCartItems = await Cart.find({ userID: id }).populate(
        "productID"
      );

      if (extractAllCartItems) {
        return NextResponse.json({ success: true, data: extractAllCartItems });
      } else {
        return NextResponse.json({
          success: false,
          message: "No Cart items are found!",
          status: 204,
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "you are not authenticated",
      });
    }
  } catch (error) {
    console.log("Error adding product to: ", error);
    return NextResponse.json({
      success: false,
      message: "something went wrong try again",
    });
  }
}
