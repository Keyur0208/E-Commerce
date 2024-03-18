"use client"
import { usePathname } from "next/navigation";

export default function Footer_Componets() {

	const pathname = usePathname();

	return (
		<div>
			{
				pathname !== "/login" && pathname !== '/register'  &&  pathname !== '/thank_you' && pathname !== '/loading'?

					<div className="footer-section bg-light pt-3">
						<div className="container">
							<div className="row mb-5">
								<div className="col-12 col-sm-12 col-md-4 col-lg-4">
									<div className="mb-4 footer-logo-wrap">
										<img src="/logo.png" className='logo' />
									</div>
									<p className="mb-4">Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant</p>
								</div>
								<div className="col-12 col-sm-12 col-md-8 col-lg-8">
									<div className="row links-wrap">
										<div className="col-6 col-sm-6 col-md-3 col-lg-3">
											<ul className="list-unstyled">
												<li><a href="/">About us</a></li>
												<li><a href="/">Services</a></li>
												<li><a href="/">Blog</a></li>
												<li><a href="/">Contact us</a></li>
											</ul>
										</div>

										<div className="col-6 col-sm-6 col-md-3 col-lg-3 ">
											<ul className="list-unstyled">
												<li><a href="/">Support</a></li>
												<li><a href="/">Knowledge base</a></li>
												<li><a href="/">Live chat</a></li>
											</ul>
										</div>

										<div className="col-6 col-sm-6 col-md-3 col-lg-3">
											<ul className="list-unstyled">
												<li><a href="/">Jobs</a></li>
												<li><a href="/">Our team</a></li>
												<li><a href="/">Leadership</a></li>
												<li><a href="/">Privacy Policy</a></li>
											</ul>
										</div>

										<div className="col-6 col-sm-6 col-md-3 col-lg-3">
											<ul className="list-unstyled">
												<li><a href="/">Nordic Chair</a></li>
												<li><a href="/">Kruzo Aero</a></li>
												<li><a href="/">Ergonomic Chair</a></li>
											</ul>
										</div>
									</div>
								</div>

							</div>

							<div className="border-top copyright">
								<div className="row pt-4">
									<div className="col-lg-6">
										<p className="mb-2 text-center text-lg-start">Copyright &copy;Keyur Pansuriya</p>
									</div>

									<div className="col-lg-6 text-center text-lg-end">
										<ul className="list-unstyled d-inline-flex ms-auto">
											<li className="me-4"><a href="#">Terms &amp; Conditions</a></li>
											<li><a href="#">Privacy Policy</a></li>
										</ul>
									</div>

								</div>
							</div>
						</div>
					</div>
					:
					null
			}
		</div>
	)
}
