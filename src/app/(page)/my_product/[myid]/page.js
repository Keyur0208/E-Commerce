import Delete_product_btn from '@/app/componets/Buttons/delete_product_btn';
import Show_product_btn from '@/app/componets/Buttons/show_product_btn';
import Update_product_btn from '@/app/componets/Buttons/update_product_btn';
import { BASE_API } from '@/app/lib/userdb';
import Link from 'next/link';
import React from 'react'

export const metadata = {
    title: "My Products - RUXI"
}


const page = async (props) => {

    let product_id = props.params.myid;

    async function product() {
        let data = await fetch(`${BASE_API}/api/imageupload/${product_id}`, { cache: 'no-store' });
        data = await data.json();
        return data.users;
    }

    const myproduct_data = await product();
    console.log(myproduct_data);


    return (
        <div className='container' >
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb mt-3">
                    <li className="breadcrumb-item"><a href='/' >Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">My Product</li>
                </ol>
            </nav>
            <div className='text-center m-3' >
                <h1 style={{ textTransform: 'uppercase' }} >My Products</h1>
            </div>
            <div className='m-3' style={{ display: 'flex', justifyContent: 'space-between' }} >
                <Link className='btn btn-primary' href='/add_product' >
                    Add Product
                </Link>
            </div>
            <div className="row">
                {
                    myproduct_data.map((item, index) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-5 ">
                            <div className="card" key={index} >
                                <img src={`/upload/${item.image}`} className="img-fluid product-thumbnail" style={{ height: "15rem" }} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className='card-text'>{item.desc}</p>
                                    <p style={{ fontWeight: 'bold' }} >{`₹${item.price}`}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                                        <Show_product_btn id={item._id} />
                                        <Update_product_btn id={item._id} user_id={item.userid} />
                                        <Delete_product_btn id={item._id} user_id={item.userid} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default page
