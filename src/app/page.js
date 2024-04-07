import Hero_Section from "./componets/hero-section";
import Product_Section from "./componets/product-section";

export const metadata = {
  title:"Home - RUXI"
}


export default function page(){
  return(
    <div>
      <Hero_Section />
      <Product_Section/>
    </div>
  )
}
