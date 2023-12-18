export const dynamic = "force-dynamic";
import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await connectToDB();
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
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
