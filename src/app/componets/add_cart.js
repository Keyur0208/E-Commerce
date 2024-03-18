// import { BASE_API } from '@/app/lib/userdb';
// import React from 'react'
// import Delete_Cart_btn from './Buttons/delete_cart_btn';

// const Add_cart = async (props) => {

//   const user_id = props.id;
//   console.log("USer id = " + user_id);

//   async function cart() {
//     let cart_data = await fetch(`${BASE_API}/api/cart/${user_id}`, { cache: 'no-store' });
//     cart_data = await cart_data.json();
//     return cart_data.data;
//   }

//   const mycarts_data = await cart();
//   console.log(mycarts_data);

//   return (
//     <div className='container' >
//       <div className='p-3'>
//         <h1>Cart</h1>
//       </div>
//       <div className='table-responsive'>
//         <table className='table' >
//           <thead style={{ borderBottom: '3px solid black', fontWeight: '500' }} >
//             <tr className='table-header'  >
//               <td>Image</td>
//               <td>Product</td>
//               <td>Price</td>
//               <td>Remove</td>
//             </tr>
//           </thead>
//           <tbody>
//             {
//               mycarts_data.map((item, index) => {
//                 return (
//                   <tr key={index} className='text-center' >
//                     <td><img src={`/upload/${item.image}`} alt='Image_Upload' style={{ height: '5rem' }} /></td>
//                     <td>{item.name}</td>
//                     <td>₹{item.price}</td>
//                     <td>
//                       <Delete_Cart_btn product_id={item.productid}  user_id={item.userid} />
//                     </td>
//                   </tr>
//                 )
//               })
//             }
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default Add_cart


