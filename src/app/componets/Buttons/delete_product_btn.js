"use client"
import { BASE_API } from "@/app/lib/userdb";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Delete_product_btn(props) {

  const router = useRouter();
  let product_id = props.id;
  console.log("Product_id = " + product_id);


  const DeleteProduct = async () => {
    let data = await fetch(`${BASE_API}/api/my_product/${product_id}`, {
      method: "DELETE"
    });
    data = await data.json();

    if (data.success) {
      let user_id = props.user_id;
      Swal.fire({
        title: "Succefull Deleted Item!",
        text: "You clicked the button!",
        icon: "success",
      });

      let delete_product_car = await fetch(`${BASE_API}/api/cart_delete/${product_id}`, {
        method: "DELETE"
      });
      delete_product_car = await delete_product_car.json();

      router.push(`/my_product/${user_id}`)
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "UnSuceeFull Deleted Item!",
      });
    }
  }

  return (
    <button className="btn btn-danger" onClick={DeleteProduct} >Delete</button>
  )
}