"use client"
import { BASE_API } from "@/app/lib/userdb";
import { Alert } from "bootstrap";
import { useRouter } from "next/navigation";
import { useEffect, useReducer, useState } from "react"
import Swal from "sweetalert2";

export default function Shipping_order(props) {


    const route = useRouter();

    let user_id = props.params.id;

    const [name, setname] = useState("");
    const [address, setaddress] = useState("");
    const [country, setcountry] = useState("");
    const [state, setstate] = useState("");
    const [zip, setzip] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [order_note, setorder_note] = useState("");
    const [error, seterror] = useState("");
    const [isFormValid, setisFormValid] = useState(false);

    const [name_color, setname_color] = useState("#dee2e6");
    const [address_color, setaddress_color] = useState("#dee2e6");
    const [country_color, setcountry_color] = useState("#dee2e6");
    const [state_color, setstate_color] = useState("#dee2e6");
    const [zip_color, setzip_color] = useState("#dee2e6");
    const [email_color, setemail_color] = useState("#dee2e6");
    const [phone_color, setphone_color] = useState("#dee2e6");
    const [order_color, setorder_color] = useState("#dee2e6");


    const uservalidation = () => {

        let error = {}

        if (!name) {
            error.name = "";
        }
        else {
            setname_color("#dee2e6");
        }

        if (!address) {
            error.address = "";
        }
        else {
            setaddress_color("#dee2e6");
        }

        if (!country) {
            error.country = "";
        }
        else {
            setcountry_color("#dee2e6");
        }

        if (!state) {
            error.state = "";
        }
        else {
            setstate_color('#dee2e6');
        }

        if (!zip) {
            error.zip = "";
        }
        else if (isNaN(zip)) {
            error.zip = "Numerical Requried";
            setzip_color("red");
        }
        else if (zip.length <= 5) {
            error.zip = "Must Be 5 Digit";
            setzip_color("red");
        }
        else {
            setzip_color('#dee2e6');
        }

        if (!email) {
            error.email = "";
        }
        else {
            setemail_color("#dee2e6");
        }

        if (!phone) {
            error.phone = "Phone No Required";
        }
        else if (isNaN(phone)) {
            error.phone = "Numerical Requried";
            setphone_color("red");
        }
        else if (phone.length <= 10) {
            error.phone = "Must Be 10 Digit";
            setphone_color("red");
        }
        else {
            setphone_color("#dee2e6");
        }

        if (!order_note) {
            error.order_note = "";
        }
        else {
            setorder_color('#dee2e6');
        }

        seterror(error);
        setisFormValid(Object.keys(error).length === 0);
    }

    useEffect(() => {
        uservalidation();
    }, [name, address, country, state, zip, email, phone, order_note])



    const getuserdetails = async () => {
        let user_data = await fetch(`${BASE_API}/api/userexits/${user_id}`);
        user_data = await user_data.json();

        if (user_data.sucess) {
            setname(user_data.users.name);
            setemail(user_data.users.email);
            setphone(user_data.users.phone);
        }
        else {
            console.log("Not Data Update");
        }
    }

    useEffect(() => {
        getuserdetails();
    }, [])

    async function myfun() {

        if (!isFormValid) {
            setaddress_color('red');
            setcountry_color('red');
            setzip_color('red');
            setorder_color('red');
            setstate_color('red');
            setcountry_color('red');
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Plz Feels Blacks",
            });
        }
        else {
            try {
                let post_data = await fetch(`${BASE_API}/api/checkout`, {
                    method: "POST",
                    body: JSON.stringify({ name, address, country, state, zip, email, phone, order_note })
                });
                post_data = await post_data.json();
                console.log(post_data);
                route.push('/thank_you');
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    const [userdata, setuserdata] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);


    useEffect(() => {
        async function getuserdeatils() {
            let cart_data = await fetch(`${BASE_API}/api/cart/${user_id}`, { cache: 'no-store' })
            cart_data = await cart_data.json();
            setuserdata(cart_data.data);
        }
        getuserdeatils();
    }, []);

    useEffect(() => {
        if (userdata.length > 0) {
            const totalPrice = userdata.reduce((acc, item) => acc + item.total, 0);
            setTotalPrice(totalPrice);
        }
    }, [userdata]);


    const [coupon, setcoupon] = useState("");

    function coupon_fun ()
    {
        if(!coupon)
        {
            alert("Plz Feels Backs")
        }   
    }


    return (
        <div className="container" >
            <div className="mt-2" >
                <h1 style={{ fontSize: '4rem' }}>Checkout</h1>
            </div>
            <div className="row my-3 gy-4">
                <div className="col-12 col-sm-12 col-lg-6 col-md-6 mb-md-0 ">
                    <h2 className="h3 mb-3 text-black">Billing Details</h2>
                    <div className="p-3 p-lg-5 border bg-white">
                        <div className="form-group row mb-3">
                            <div className="col-md-12">
                                <label className="text-black">Name
                                    <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    style={{ border: `1px solid ${name_color}` }}
                                    onChange={(e) => setname(e.target.value)}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <div className="col-md-12">
                                <label className="text-black">Address
                                    <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={address}
                                    style={{ border: `1px solid ${address_color}` }}
                                    onChange={(e) => setaddress(e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <div className="col-md-12">
                                <label className="text-black">Country
                                    <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={country}
                                    style={{ border: `1px solid ${country_color}` }}
                                    onChange={(e) => setcountry(e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group row mb-3 gy-3">
                            <div className="col-md-6">
                                <label className="text-black">State
                                    <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={state}
                                    style={{ border: `1px solid ${state_color}` }}
                                    onChange={(e) => setstate(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="text-black">Zip
                                    <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={zip}
                                    style={{ border: `1px solid ${zip_color}` }}
                                    maxLength={6}
                                    onChange={(e) => setzip(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-group row mb-3 gy-3">
                            <div className="col-md-6">
                                <label className="text-black">Email
                                    <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={email}
                                    style={{ border: `1px solid ${email_color}` }}
                                    onChange={(e) => setemail(e.target.value)} 
                                    disabled={true}
                                    />
                            </div>
                            <div className="col-md-6">
                                <label className="text-black">Phone
                                    <span className="text-danger">*</span>
                                </label>
                                <input
                                    maxLength={10}
                                    type="text"
                                    className="form-control"
                                    inputMode="numeric"
                                    value={phone}
                                    style={{ border: `1px solid ${phone_color}` }}
                                    onChange={(e) => setphone(e.target.value)}
                                    disabled={true}
                                     />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="text-black">Order Notes</label>
                            <textarea
                                name="c_order_notes"
                                cols="30"
                                rows="5"
                                className="form-control"
                                placeholder="Write your notes here..."
                                value={order_note}
                                style={{ border: `1px solid ${order_color}` }}
                                onChange={(e) => setorder_note(e.target.value)}
                            >
                            </textarea>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-sm-12 col-lg-6 col-md-6">
                    <div className="row mb-5">
                        <div className="col-md-12">
                            <h2 className="h3 mb-3 text-black">Coupon Code</h2>
                            <div className="p-3 p-lg-5 border bg-white">
                                <label className="text-black mb-3">Enter your coupon code if you have one</label>
                                <div className="input-group w-100 couponcode-wrap">
                                    <input type="text" className="form-control me-2" placeholder="Coupon Code" aria-label="Coupon Code" aria-describedby="button-addon2"  value={coupon} onChange={(e)=>setcoupon(e.target.value)}  />
                                    <div className="input-group-append">
                                        <button className="btn btn-dark btn-rounded btn-lg" type="button"  onClick={coupon_fun} >Apply</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-md-12">
                            <h2 className="h3 mb-3 text-black">Your Order</h2>
                            <div className="p-3 p-lg-5 border bg-white">
                                <table className="table site-block-order-table mb-5">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            userdata.map((item, index) => {
                                                return (
                                                    <tr key={index} >
                                                        <td>{item.name} <strong className="mx-2">x</strong>{item.qty}</td>
                                                        <td>₹{item.total}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        <tr>
                                            <td><strong>Order Total</strong></td>
                                            <td><strong>₹{totalPrice}</strong></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="border p-3 mb-3">
                                    <h3 className="h6 mb-0"><a className="d-block text-dark" data-bs-toggle="collapse" href="#collapsebank" role="button" aria-expanded="false" aria-controls="collapsebank">Direct Bank Transfer</a></h3>

                                    <div className="collapse" id="collapsebank">
                                        <div className="py-2">
                                            <p className="mb-0">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border p-3 mb-3">
                                    <h3 className="h6 mb-0"><a className="d-block text-dark " data-bs-toggle="collapse" href="#collapsecheque" role="button" aria-expanded="false" aria-controls="collapsecheque">Cheque Payment</a></h3>

                                    <div className="collapse" id="collapsecheque">
                                        <div className="py-2">
                                            <p className="mb-0">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border p-3 mb-5">
                                    <h3 className="h6 mb-0"><a className="d-block text-dark" data-bs-toggle="collapse" href="#collapsepaypal" role="button" aria-expanded="false" aria-controls="collapsepaypal">Paypal</a></h3>

                                    <div className="collapse" id="collapsepaypal">
                                        <div className="py-2">
                                            <p className="mb-0" >Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-dark btn-lg py-3 btn-block" onClick={myfun} >Place Order</button>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )



}