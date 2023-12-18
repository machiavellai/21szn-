import CommonListing from "@/components/Navbar/CommonListing";
import { ProductByCategory } from "@/services/product";

export default async function MenAllProducts() {
  const getAllProducts = await ProductByCategory("men");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
