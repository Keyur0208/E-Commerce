import Cart_page from "@/app/componets/cart";

export const metadata = {
  title:"Cart - RUXI"
}

const page = (props) =>{
  return(
    <>
      <Cart_page cart_id={props.params.cartid} />
    </>
  )
}

export default page;
