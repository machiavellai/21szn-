import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/Address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();

    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const data = await req.json();

      const { _id, fullName, city, address, country, postalCode } = data;

      const updateAddress = await Address.findOneAndUpdate(
        {
          _id: _id,
        },
        { fullName, city, address, country, postalCode },
        { new: true }
      );
      console.log("updated address :",updateAddress);
      if (updateAddress) {
        return NextResponse.json({
          success: true,
          message: "Address updated successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to update address! please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "you are not authenticated",
      });
    }

    // const data = await req.json();

    // const { id, fullname, city, address, country, postalCode } = data;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
