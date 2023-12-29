export const dynamic = "force-dynamic";
import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser?.role === "admin") {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id)
        return NextResponse.json({
          success: false,
          message: "Product ID is required",
        });

      const deleteProduct = await Product.findByIdAndDelete(id);

      if (deleteProduct) {
        return NextResponse.json({
          success: true,
          message: "Product Deleted Successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to delet the prodcut! try again later",
        });
      }
    }else{
      // console.log();
      return NextResponse.json({
        success: false,
        message: "You are not authenticated",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
