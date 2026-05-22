import { getNavProductImages } from "@/lib/nav-images";
import { Nav } from "./nav";

// Server component — fetches WC product images once per hour (ISR)
// then passes as props to the client Nav component
export async function NavWrapper() {
  const productImages = await getNavProductImages();
  return <Nav productImages={productImages} />;
}
