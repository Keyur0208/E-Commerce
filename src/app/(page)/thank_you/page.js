"use client"
import { useRouter } from "next/navigation"


export default function Thank_you() {

    let route = useRouter();

    function navigation() {
        route.push('/shop');
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center', flexDirection: 'column' }} >
            <img src="/shopping.png" style={{ height: '8rem' }} />
            <h1 style={{ fontSize: '4rem', fontWeight: "500" }} >Thank You !</h1>
            <p style={{ fontSize: '1.25rem', fontWeight: "300" }}>You order was successfuly completed.</p>
            <div className="my-3" >
                <button className="btn btn-dark rounded-pill p-3 " onClick={navigation} >Back To Shop</button>
            </div>
        </div>
    )
}