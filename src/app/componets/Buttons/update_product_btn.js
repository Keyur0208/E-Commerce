"use client"
import { BASE_API } from "@/app/lib/userdb";
import { useRouter } from "next/navigation";

export default function Update_product_btn(props)
{
  const product_id = props.id;
  console.log(product_id);

  const route = useRouter();

  function navigation()
  {
     route.push(`${BASE_API}/my_product/update/${product_id}`)
  }

  return(
    <button className="btn btn-primary" onClick={navigation}  >Update</button>
  )
}