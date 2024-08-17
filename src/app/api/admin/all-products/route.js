import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Ensure the route is dynamically rendered

export async function GET(req) {
  // Check for preflight request (OPTIONS method) and handle CORS
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': 'https://21szn.vercel.app',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  try {
    await connectToDB();

    const extractAllProducts = await Product.find({});

    if (extractAllProducts) {
      return new NextResponse(
        JSON.stringify({
          success: true,
          data: extractAllProducts,
        }),
        {
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': 'https://21szn.vercel.app',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          },
        }
      );
    } else {
      return new NextResponse(
        JSON.stringify({
          success: false,
          status: 204,
          message: "No products found",
        }),
        {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': 'https://21szn.vercel.app',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          },
        }
      );
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Something went wrong! Please try again later.",
      }),
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': 'https://21szn.vercel.app',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        },
      }
    );
  }
}














// import connectToDB from "@/database";
// import Product from "@/models/product";
// import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic";

// export async function GET(req) {
//   if (req.method === 'OPTIONS') {
//     return new NextResponse(null, {
//       status: 204,
//       headers: {
//         'Access-Control-Allow-Origin': 'https://21szn.vercel.app',
//         'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
//         'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//       },
//     });
//   }
//   try {
//     await connectToDB();

//     const extractAllProducts = await Product.find({});

//     if (extractAllProducts) {
//       return NextResponse.json({
//         success: true,
//         data: extractAllProducts,
//       })
      
//     } else {
//       return NextResponse.json({
//         success: false,
//         status: 204,
//         message: "No products found",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({
//       success: false,
//       message: "Something went wrong ! Please try again later",
//     });
//   }
// }
