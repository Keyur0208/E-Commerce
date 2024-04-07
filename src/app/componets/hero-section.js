export default function Hero_Section() {
    return (
        <div className="hero">
            <div className="container">
                <div className="row hero-section">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="mt-0 mt-lg-5" >
                            <h1>Modern Interior <span clsas="d-block">Design Studio</span></h1>
                            <p className="mb-4 mt-3">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>
                            <p>
                                <a 
                                href="/shop" 
                                className="shop-btn"
                                >Shop Now
                                </a>
                                <a 
                                href="#" 
                                className="explore-btn"
                                >Explore
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="hero-img-wrap">
                            <img src="/General_Banner_Online_Shopping_Blog_1_APAC_2020_09_03-removebg-preview.png" className="w-100" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
