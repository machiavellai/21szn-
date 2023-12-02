import connectToDB from "@/database";
import User from "@/models/user";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";

//using joi for the userobject interface
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  // await the connection to DB

  await connectToDB();

  const { name, email, password, role } = await req.json();

  //validate the schema

  const { error } = schema.validate({ name, email, password, role });

  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0],
    });
  }

  //saving user in databse

  try {
    //validating if the user exists or not

    const isUserAlreadyExists = await User.findOne({ email });

    if (isUserAlreadyExists) {
      return NextResponse.json({
        success: false,
        message: "user already exists. Try with another email address",
      });
    } else {
      const hashPassword = await hash(password, 12);

      const newlyCreatedUser = await User.create({
        name,
        email,
        password: hashPassword,
        role,
      });

      //for a new use registering to displat successfully registered

      if (newlyCreatedUser) {
        return NextResponse.json({
          success: true,
          message: "Account created successfully",
        });
      }
    }
  } catch (error) {
    console.log("Error is new user Resgistration");

    return NextResponse.json({
      success: false,
      message: "something went wrong try again later",
    });
  }
}
