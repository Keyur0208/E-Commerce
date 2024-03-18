"use client"
import { BASE_API } from "@/app/lib/userdb";
import { useRouter } from "next/navigation";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react"
import Swal from "sweetalert2";

export function Increment(props) {

    const router = useRouter();
    let product_id = props.product_id;
    let qty = props.qty;
    let user_id = props.user_id;
    let product_price = props.product_price;
    let item_name = props.item_name;
    let item_image = props.item_image;
    let item_total = props.item_total;

    const [qty_value, setqty_vale] = useState(qty);

    async function increement_value() {
        let qty = (qty_value + 1)
        let total = qty * product_price;
        let increement_data = await fetch(`${BASE_API}/api/cart_delete/${product_id}`, {
            method: "PUT",
            body: JSON.stringify({ qty, total })
        })
        increement_data = await increement_data.json();
        setqty_vale(qty_value + 1);
    }

    async function decreement_value() {
        let qty = (qty_value - 1)
        let total = qty * product_price;
        let increement_data = await fetch(`${BASE_API}/api/cart_delete/${product_id}`, {
            method: "PUT",
            body: JSON.stringify({ qty,total })
        })
        increement_data = await increement_data.json();
        if (qty_value > 1) {
            setqty_vale(qty_value - 1);
        }
    }

    return (  
        <tr className='text-center' >
            <td>
                <img src={`/upload/${item_image}`} alt='Image_Upload' style={{ height: '5rem' }} />
            </td>
            <td>
                {item_name}
            </td>
            <td>
                ₹{product_price}
            </td>
            <td>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
                    <button style={{ border: 'none', backgroundColor: 'transparent', fontSize: '1.3rem' }} onClick={increement_value}  >+</button>
                    <h4>{qty_value}</h4>
                    <button style={{ border: 'none', backgroundColor: 'transparent', fontSize: '1.3rem' }} onClick={decreement_value} >-</button>
                </div>
            </td>
            <td>
            ₹{qty_value * product_price}
            </td>
            <td>
                <button className="btn btn-danger" onClick={delete_cart} >
                    <FontAwesomeIcon icon={faXmark} style={{ height: '1rem' }} />
                </button>
            </td>
        </tr>
    )

    
    async function delete_cart() {
        let delete_data = await fetch(`${BASE_API}/api/cart_delete/${product_id}`, {
          method: "DELETE"
        })
        delete_data = await delete_data.json();
    
        if (delete_data.success) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
              router.push(`/cart/${user_id}`)
              window.location.reload();
            }
          });
          Toast.fire({
            icon: "success",
            title: "Delete  successfully"
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "UnSuceeFull Deleted Item!",
          });
        }
      }
}
