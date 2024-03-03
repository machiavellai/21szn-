import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      console.log("User ID:", id);

      // Check if orders exist for the user
      const ordersForUser = await Order.find({ user: id });
      console.log("Orders for user:", ordersForUser);

      const extractAllOrders = await Order.find({ user: id }).populate(
        "orderItems.product"
      );
      console.log("Extracted Orders:", extractAllOrders);

      if (extractAllOrders) {
        return NextResponse.json({
          success: true,
          data: extractAllOrders,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to get all orders! please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authnticated",
      });
    }
  } catch (error) {
    console.error("Error in GET route:", error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
}
