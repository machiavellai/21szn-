import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    //connect to db and extract the data from the DB once the update button is clicked
    await connectToDB();
    const extractData = await req.json();

    const {
      _id,
      name,
      price,
      description,
      category,
      sizes,
      deliveryInfo,
      onSale,
      priceDrop,
      imageUrl,
    } = extractData;

    //the logic to update the procuts not including th _id because id is stored on the db
    const updatedProduct = await Product.findOneAndUpdate(
      {
        _id: _id,
      },
      {
        name,
        price,
        description,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      },
      { new: true }
    );

    if (updatedProduct) {
      return NextResponse.json({
        success: true,
        message: "Product updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to Update product ! Please try again later",
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
