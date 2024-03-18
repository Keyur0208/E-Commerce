"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import { BASE_API } from "../lib/userdb";

export default function Add_Product() {

    const route = useRouter();
    const [name, setname] = useState("");
    const [price, setprice] = useState("");
    const [desc, setdesc] = useState("");
    const [image, setimage] = useState(null,name,price,desc);
    const [error, seterror] = useState({});
    const [isFormValid, setisFormValid] = useState(false);
    const [color_name, setcolor_name] = useState("black");
    const [color_price, setcolor_price] = useState("black");
    const [color_image, setcolor_image] = useState("black");
    const [color_desc, setcolor_desc] = useState("black");

    useEffect(() => {
        uservalidation();
    }, [name, price,desc,image]);

    const uservalidation = () => {
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
            error.desc="";
        }
        else{
            setcolor_desc("black");
        }

        if (!image) {
            error.image = "";
        }
        else {
            setcolor_image("black");
        }

        setisFormValid(Object.keys(error).length === 0);
        seterror(error);
    }

    async function add(e) {
        let localstorage = localStorage.getItem("user");
        let userid = JSON.parse(localstorage).users._id;

        if (!isFormValid) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Feels Blacks Form!",
            });
            setcolor_price("red");
            setcolor_name("red");
            setcolor_desc("red");
            setcolor_image("red");
        }
        else {
            console.log(image);
            e.preventDefault();
            try {
                const data = new FormData()
                data.append('name', name);
                data.append('price', price);
                data.append('desc',desc);
                data.append('file', image);
                data.append('userid', userid);
                const res = await fetch(`${BASE_API}/api/imageupload`, {
                    method: 'POST',
                    body:data
                })


                if (!res.ok) {
                    throw new Error
                }
                else {
                    Swal.fire({
                        title: "Good job!",
                        text: "SuccesFull Image!",
                        icon: "success",
                    });
                    route.push('/shop')
                }

            }
            catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <div className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb mt-3">
                    <li className="breadcrumb-item"><a href='/' >Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Product</li>
                </ol>
            </nav>
            <div className="container border w-100  mt-2 mb-5">
                <div className="text-center"  >
                    <h1 className="pt-2" style={{ textTransform: 'uppercase' }} >Add Product</h1>
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
                    <div className="mb-3">
                        <label htmlFor="UrunImage" className="form-label">Product Image</label>
                        <input type="file" className="form-control" style={{ border: `1px solid ${color_image}`, paddingTop: '0.8rem' }} onChange={(e) => setimage(e.target.files?.[0])} />
                    </div>
                    {
                        error.image &&
                        <p className='error-message'>
                            {error.image}
                        </p>
                    }
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="form-control w-100 m-3" style={{ background: '#FFC107', color: 'white' }} id="ekleButton" onClick={add} >Add Product</button>
                    </div>
                </div>
            </div>
        </div>
    )
}