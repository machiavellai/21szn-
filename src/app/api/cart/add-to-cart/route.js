import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Joi from "joi";
// import { Trykker } from "next/font/google";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const AddToCart = Joi.object({
  userID: Joi.string().required(),
  productID: Joi.string().required(),
});

export async function POST(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const data = await req.json();
      const { productID, userID } = data;

      const { error } = AddToCart.validate({ userID, productID });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }
      const isCurrentCartItemAlreadyExists = await Cart.findOne({
        productID: productID,
        userID: userID,
      });

      if (
        isCurrentCartItemAlreadyExists &&
        isCurrentCartItemAlreadyExists.quantity > 0
      ) {
        return NextResponse.json({
          success: false,
          message: "Product is already in Cart Add different product",
        });
      }

      const saveProductToCart = await Cart.create(data);

      // come to check on this section
      if (saveProductToCart) {
        return NextResponse.json({
          success: true,
          message: "Product is added to cart",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to add product to cart try again later",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated",
      });
    }
  } catch (error) {
    console.log("Error adding to cart:", error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
}
