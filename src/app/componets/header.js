"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BASE_API } from "../lib/userdb";
import Swal from "sweetalert2";
import '@/app/style/swal_css.css';

export default function Hedaer_Componet() {

    const [status, setstatus] = useState();
    const route = useRouter();

    useEffect(() => {
        setstatus(localStorage.getItem("user"));
    })

    const pathname = usePathname();

    const Clear = () =>{
        localStorage.clear();
        route.push('/login');
    }


    function logout() {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: "Are you sure Log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire({
                title: "Log Out",
                icon: "success",
              });
              Clear();
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
            }
          });

        
    }

    const [userdata, setuserdata] = useState([]);
    const [qtyValue, setqtyValue] = useState(0);

    useEffect(() => {
        let data = localStorage.getItem("user");
        try
        {
            let user_id = JSON.parse(data).users._id;
            console.log(user_id);
            async function getuserdeatils() {
                let cart_data = await fetch(`${BASE_API}/api/cart/${user_id}`, { cache: 'no-store' })
                cart_data = await cart_data.json();
                setuserdata(cart_data.data);
            }
            getuserdeatils();
        }
        catch(error)
        {
            console.log(error);
        }
    }, []);


    useEffect(() => {
        if (userdata.length > 0) {
            const qtyValue = userdata.reduce((acc, item) => acc + item.qty, 0);
            setqtyValue(qtyValue);
        }
    }, [userdata]);

    return (
        <div>
            {
                pathname !== "/login" && pathname !== '/register'  &&  pathname !== '/thank_you' && pathname !== '/loading' ?
                    <header>
                        <nav className="custom-navbar navbar navbar navbar-expand-md navbar-warning bg-warning" arial-label="Furni navigation bar" style={{ borderBottom: '1px solid white' }}>
                            <div className="container">
                                <img src="/logo.png" className='logo' />
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <div className="collapse navbar-collapse" id="navbarsFurni">
                                    {
                                        status ?
                                            <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
                                                <li className="nav-item active">
                                                    <Link className="nav-link" href="/">Home</Link>
                                                </li>
                                                <li>
                                                    <Link className="nav-link" href="/shop">Shop</Link>
                                                </li>
                                                <li>
                                                    <Link className="nav-link" href="/add_product">Add Product</Link>
                                                </li>
                                                <li>
                                                    <Link className="nav-link" href={`/my_product/${JSON.parse(status).users._id}`}>My Product</Link>
                                                </li>
                                                <li>
                                                    <Link className="nav-link" href="/feedback">Feedback</Link>
                                                </li>
                                            </ul>
                                            :
                                            <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
                                                 
                                            </ul>
                                    }
                                    {
                                        status ?
                                                <ul className="custom-navbar-cta navbar-nav ">
                                                    <li className="dropdown" >
                                                        <img src="/user.svg" className="header-logo user-logo" />
                                                        <div className="dropdown-list" >
                                                            <Link className="nav-link profile-link" href={`/profile/${JSON.parse(status).users._id}`}  >
                                                                Profile
                                                            </Link>
                                                            <button onClick={logout} className="logout-link btn btn-warning" >
                                                                Log Out
                                                            </button>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <Link className="nav-link" href={`/cart/${JSON.parse(status).users._id}`}>
                                                            <img src="/cart.svg" className="header-logo" />
                                                            <p style={{position:'absolute',marginTop:'-2rem',marginLeft:'1rem',backgroundColor:'white',borderRadius:'50%' ,padding:'1px 0.4rem',fontWeight:'bold'}} >{qtyValue}</p>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            :
                                            <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
                                                <li className="btn btn-dark" >
                                                    <Link href={"/login"} style={{ color: 'white', textDecoration: 'none' }}>
                                                        Login
                                                    </Link>
                                                </li>
                                                <li className="btn btn-light" >
                                                    <Link href={"/register"} style={{ color: 'black', textDecoration: 'none' }}>
                                                        Register
                                                    </Link>
                                                </li>
                                         </ul>
                                    }
                                </div>
                            </div>
                        </nav>
                    </header >
                    :
                    null
            }
        </div>
    )
}
