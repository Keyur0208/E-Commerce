"use client"
import { BASE_API } from '@/app/lib/userdb';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Increment } from './Buttons/cart_opeation';

const Cart_page = (props) => {

  let user_id = props.cart_id;
  console.log(user_id);

  const [userdata, setuserdata] = useState([]);

  useEffect(() => {
    async function getuserdeatils() {
      let cart_data = await fetch(`${BASE_API}/api/cart/${user_id}`, { cache:'no-cache' })
      cart_data = await cart_data.json();
      setuserdata(cart_data.data);
    }
    getuserdeatils();
  }, []);

  return (
    <div className='container' >
      <div className='p-3'>
        <h1>Cart</h1>
      </div>
      <div className='table-responsive'>
        <table className='table' >
          <thead style={{ borderBottom: '3px solid black', fontWeight: '500' }} >
            <tr className='table-header'  >
              <td>Image</td>
              <td>Product</td>
              <td>Price</td>
              <td>qty</td>
              <td>Total</td>
              <td>Remove</td>
            </tr>
          </thead>
          <tbody>
            {
              userdata.map((item, index) => {
                return (
                  <Increment key={index} product_id={item.productid} user_id={item.userid} qty={item.qty} product_price={item.price}
                    item_name={item.name} item_image={item.image} item_total={item.total}
                  />
                )
              })
            }
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', margin: '2rem 0px' }} >
        <button className='btn btn-dark'>
          <Link href={`/shop`} style={{ color: 'white', textDecoration: 'none' }} >Continue Shopping</Link>
        </button>
        <button className='btn btn-success'>
          <Link href={`/shipping_order/${user_id}`} style={{ color: 'white', textDecoration: 'none' }} >Go To Shipping Order</Link>
        </button>
      </div>
    </div>
  )
}

export default Cart_page
