"use client"
import { BASE_API } from "@/app/lib/userdb";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import Swal from "sweetalert2";

export default function Update_Product({ params }) {

    const router = useRouter();

    const [name, setname] = useState("");
    const [price, setprice] = useState("");
    const [error, seterror] = useState({});
    const [isFormValid, setisFormValid] = useState(false);
    const [color_name, setcolor_name] = useState("black");
    const [color_price, setcolor_price] = useState("black");
    const [color_desc, setcolor_desc] = useState("");
    const [desc, setdesc] = useState("")

    useEffect(() => {
        productvalidation();
    }, [name, price,desc]);


    const productvalidation = () => {
        let error = {};

        if (!name) {
            error.name = "";

        }
        else {
            setcolor_name("black");
        }

        if (!price) {
            error.price = "";

        }
        else if (isNaN(price)) {
            error.price = "Enter The Digits"
        }
        else {
            setcolor_price("black");
        }


        if(!desc)
        {
            error.desc = "";
        }
        else{
            setcolor_desc("black");
        }

        setisFormValid(Object.keys(error).length === 0);
        seterror(error);
    }

    useEffect(() => {
        getproductsdetails();
    }, [])

    const getproductsdetails = async () => {
        let product_id = params.id;
        let user_data = await fetch(`${BASE_API}/api/my_product/${product_id}`);
        user_data = await user_data.json();
        console.log(user_data);

        if (user_data.success) {
            setname(user_data.result[0]['name']);
            setprice(user_data.result[0]['price']);
            setdesc(user_data.result[0]['desc']);
        }
        else {
            console.log("Not Data Update");
        }
    }


    const update = async () => {

        if (!isFormValid) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Plz Feels Blacks",
            });
        }
        else {

            try {
                let product_id = params.id;
                let update_data = await fetch(`${BASE_API}/api/my_product/${product_id}`, {
                    method: "PUT",
                    body: JSON.stringify({ name,price,desc })
                });
                update_data = await update_data.json();
                console.log(update_data);

                if (update_data.result) {

                    let localstoregedata = localStorage.getItem('user');

                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                            router.push(`/my_product/${JSON.parse(localstoregedata).users._id}`);
                        },
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Update in successfully"
                    });

                    let update_data_cart = await fetch(`${BASE_API}/api/cart_delete/${product_id}`, {
                        method: "PUT",
                        body: JSON.stringify({ name,price,desc })
                    });
                    update_data_cart = await update_data_cart.json();
                    console.log(update_data_cart);

                    return;
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Some Problem",
                    });
                    return;
                }

            }
            catch (error) {
                console.log(error);
            }
        }


    }

    return (
        <div className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb mt-3">
                    <li className="breadcrumb-item"><a href='/' >Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Update Product</li>
                </ol>
            </nav>
            <div className="container border w-100  mt-2 mb-5">
                <div className="text-center"  >
                    <h1 className="pt-2" style={{ textTransform: 'uppercase' }} >Update Product</h1>
                </div>
                <div className="mt-3">
                    <div className="mb-3">
                        <label htmlFor="UrunID" className="form-label">Product Name</label>
                        <input type="text" className="form-control" style={{ border: `1px solid ${color_name}` }} value={name} onChange={(e) => setname(e.target.value)} />
                    </div>
                    {
                        error.name &&
                        <p className='error-message'>
                            {error.name}
                        </p>
                    }
                    <div className="mb-3">
                        <label htmlFor="UrunAdi" className="form-label">Product Price</label>
                        <input type="text" className="form-control" style={{ border: `1px solid ${color_price}` }} value={price} onChange={(e) => setprice(e.target.value)} />
                    </div>
                    {
                        error.price &&
                        <p style={{ color: 'red', marginTop: '-1rem' }}>
                            {error.price}
                        </p>
                    }
                    <div className="mb-3">
                        <label htmlFor="UrunID" className="form-label">Product Description</label>
                        <input type="text" className="form-control" style={{ border: `1px solid ${color_desc}` }} value={desc} onChange={(e) => setdesc(e.target.value)} />
                    </div>
                    {
                        error.desc &&
                        <p className='error-message'>
                            {error.desc}
                        </p>
                    }
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="form-control w-100 m-3" style={{ background: '#FFC107', color: 'white' }} id="ekleButton" onClick={update} >Update Product</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
