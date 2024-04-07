"use client"
import { BASE_API } from "@/app/lib/userdb";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

export default function Add_Item_Cart(props) {

    let localStoragedata = localStorage.getItem("user");
    let userid = JSON.parse(localStoragedata).users._id;

    const productid = props.productid;
    const name = props.name;
    const price = props.price;
    const desc = props.desc;
    const image = props.image;
    const qty=1;
    const total =  props.price;

    async function additem() {

        console.log( JSON.stringify({userid,productid,qty,name,price,desc,image}));

        let data = await fetch(`${BASE_API}/api/cart`, {
            method: "POST",
            body: JSON.stringify({ userid,productid,qty,name,price,desc,image,total}),
        })
        data = await data.json();
        
        if (data.success) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Succefully in cart"
            });
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Oops Sorry...",
                text: "Product  Purachased Process !",
              });
        }
    }

    return (
        <button className="btn btn-primary" onClick={additem} >
            <FontAwesomeIcon icon={faShoppingCart} style={{ height: '1rem', paddingRight: '0.5rem' }} />
            Add Item
        </button>
    )
}
