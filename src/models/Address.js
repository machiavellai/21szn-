import mongoose from "mongoose";

const NewAddressSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    fullName: String,
    address: String,
    city: String,
    country: String,
    postalCode: String,
  },
  { timestamps: true }
);

// testing purposes if the address api and fucntionality has issues come back to clear it up with the address model here

const Address =
  mongoose.models.Address || mongoose.model("Address", NewAddressSchema);

export default Address;
