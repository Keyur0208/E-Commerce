import { BASE_API } from "../lib/userdb"

async function ProductDeatils()
{
	let data = await fetch(`${BASE_API}/api/limited_product`,{
		cache:"no-cache"
	});
	data = await data.json();
	return data.result;
}


export default async function Product_Section()
{
	let Product = await ProductDeatils();
	console.log(Product);

    return(
        <div className="product-section">
			<div className="container">
				<div className="row">
					<div className="col-12 col-sm-12 col-md-12 col-lg-3 mb-5 mb-lg-0">
						<h2 className="mb-4 section-title">Crafted with excellent material.</h2>
						<p className="mb-4">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. </p>
						<p><a href="/shop" className="explore-second">Explore</a></p>
					</div> 
					{
                        Product.map((item, index) => (
                            <div className="col-12 col-sm-12 col-md-4 col-lg-3 mb-5 mb-lg-0 ">
                                <div className="card" key={index} >
                                    <img src={`/upload/${item.image}`} className="img-fluid product-thumbnail" style={{ height: "15rem" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className='card-text'>{item.desc}</p>
                                        <p style={{fontWeight:'bold'}} >{`₹${item.price}`}</p>
                                        <div>
                                            <a href="/shop" className="btn btn-primary">Add Item</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
				</div>
			</div>
		</div>
    )
}