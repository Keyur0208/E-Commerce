"use client"
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import Add_Item_Cart from './Buttons/add_item_cart';
import { BASE_API } from '../lib/userdb';

function Searchdata() {
        const [userData, setUserdata] = useState([]);
        const [filterdata, setFilterdata] = useState([]);
        const [query, setQuery] = useState('');
    
        useEffect(() => {
            const getUserdata = async () => {
                const reqData = await fetch(`${BASE_API}/api/imageupload`);
                const resData = await reqData.json();
                setUserdata(resData.result);
                setFilterdata(resData.result);
            }
            getUserdata();
        }, []);
    
    const handlesearch = (event) => {
        const getSearch = event.target.value;

        if (getSearch.length > 0) {
            const searchdata = userData.filter((item) => item.name.toLowerCase().includes(getSearch));
            setUserdata(searchdata);
        }
        else {
            setUserdata(filterdata);
        }
        setQuery(getSearch);
    }


    return (
        <div className="mt-3">
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mt-3">
                        <li className="breadcrumb-item"><a href='/' >Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Shop</li>
                    </ol>
                </nav>
                <div className='m-3'>
                    <input type="search" name='name' value={query} className="form-control" onChange={(e) => handlesearch(e)} placeholder="Search Product..." style={{ paddingLeft: '2.5rem' }} />
                    <FontAwesomeIcon icon={faSearch} className='search-icon' />
                </div>
                <div className="row">
                    {
                        userData.map((item, index) => (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-5 ">
                                <div className="card" key={index} >
                                    <img src={`/upload/${item.image}`} className="img-fluid product-thumbnail" style={{ height: "15rem" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className='card-text'>{item.desc}</p>
                                        <p style={{ fontWeight: 'bold' }} >{`₹${item.price}`}</p>
                                        <div>
                                            <Add_Item_Cart productid={item._id} name={item.name} price={item.price} image={item.image} desc={item.desc} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
export default Searchdata;