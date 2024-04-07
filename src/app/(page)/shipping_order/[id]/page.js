import Shipping_order from "@/app/componets/shipping";

export const metadata = {
    title:"Shipping Order - RUXI"
}

export default function Page(props)
{
    return(
        <>
         <Shipping_order id={props.params.id} />
        </>
    )
}
