import CommonListing from "@/components/Navbar/CommonListing";
import { ProductByCategory } from "@/services/product";

export default async function WomenAllProduct() {
  const getAllProducts = await ProductByCategory("women");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
