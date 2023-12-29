import CommonListing from "@/components/Navbar/CommonListing";
import { productByCategory } from "@/services/product";

export default async function kidsAllProducts() {
  const getAllProducts = await productByCategory("kids");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
