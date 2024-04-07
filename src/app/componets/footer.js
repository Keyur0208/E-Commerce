"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer_Componets() {

	const pathname = usePathname();

	return (
		<div>
			{
				pathname !== "/login" && pathname !== '/register' && pathname !== '/thank_you' && pathname !== '/loading' ?

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
												<li>
													<Link href="#">About us</Link>
												</li>
												<li>
													<Link href="#">Services</Link>
												</li>
												<li>
													<Link href="#">Blog</Link>
												</li>
												<li>
													<Link href="#">Contact Us</Link>
												</li>
											</ul>
										</div>

										<div className="col-6 col-sm-6 col-md-3 col-lg-3 ">
											<ul className="list-unstyled">
												<li>
													<Link href="#">Support</Link>
												</li>
												<li>
													<Link href="#">Knowledge Base</Link>
												</li>
												<li>
													<Link href="#">Live Chat</Link>
												</li>
											</ul>
										</div>

										<div className="col-6 col-sm-6 col-md-3 col-lg-3">
											<ul className="list-unstyled">
												<li>
													<Link href="#">Jobs</Link>
												</li>
												<li>
													<Link href="#">Our Team</Link>
												</li>
												<li>
													<Link href="#">Leadership</Link>
												</li>
												<li>
													<Link href="#">Privacy Policy</Link>
												</li>
											</ul>
										</div>

										<div className="col-6 col-sm-6 col-md-3 col-lg-3">
											<ul className="list-unstyled">
												<li>
													<Link href="#">Nordic Chair</Link>
												</li>
												<li>
													<Link href="#">Kruzo Aero</Link>
												</li>
												<li>
													<Link href="#">Ergonomic Chai</Link>
												</li>
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

