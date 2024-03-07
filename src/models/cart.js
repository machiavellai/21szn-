// import { ref, required } from "joi";

import mongoose from "mongoose";

// Check if the model is already defined
//changes made to the cart model...
const Cart =
  mongoose.models.Cart ||
  mongoose.model(
    "Cart",
    new mongoose.Schema(
      {
        userID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
      { timestamps: true }
    )
  );

export default Cart;

// import mongoose from "mongoose";

// const CartSchema = new mongoose.Schema(
//   {
//     userID: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     productID: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Products",
//     },
//     quantity: {
//       type: Number,
//       required: true,
//       default: 1,
//     },
//   },
//   { timestamps: true }
// );

// const Cart = mongoose.model("Cart", CartSchema);
// export default Cart;

// mongoose.model.Cart ||
