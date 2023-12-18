import CommonListing from "@/components/Navbar/CommonListing";
import { ProductByCategory } from "@/services/product";

export default async function KidsAllProduct() {
  const getAllProducts = await ProductByCategory("kids");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
