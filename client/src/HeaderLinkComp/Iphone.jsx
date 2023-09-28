import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Iphone() {
	const [products, setproducts] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3001/iphone")
			.then((res) => res.json())
			.then((data) => {
				setproducts(data);
			});
	}, []);

	console.log(products);
	let flip = true;
	return (
		<div>
			<section className="internal-page-wrapper top-50">
				<div className="container">
					<div className="row justify-content-center text-center">
						<div className="col-12">
							<div className="title-wraper bold">Iphones</div>
							<div className="brief-description">
								The best for the brightest.
							</div>
						</div>
					</div>

					{products?.map((products) => {
						let order1 = 1;
						let order2 = 2;

						if (flip) {
							order1 = 2;
							order2 = 1;
							flip = !flip;
						} else {
							flip = !flip;
						}
						let productDiv = (
							<div
								key={products.product_url}
								className="row justify-content-center text-center product-holder h-100 top-100 bottom-100"
							>
								<div className={`col-sm-12 col-md-6 my-auto order-${order1}`}>
									<div className="product-title">{products.product_name}</div>
									<div className="product-brief">
										{products.product_brief_description}
									</div>
									<div className="starting-price">
										{`Starting at ${products.starting_price}`}
									</div>
									<div className="monthly-price">{products.price_range}</div>
									<div className="links-wrapper">
										<ul>
											<li>
												<Link to={"/iphone/" + products.product_url}>
													Learn more
												</Link>
											</li>
										</ul>
									</div>
								</div>
								<div className={`col-sm-12 col-md-6 order-${order2}`}>
									<div className="prodict-image">
										<img src={products.product_img} alt="" />
									</div>
								</div>
							</div>
						);
						return productDiv;
					})}
				</div>
			</section>
		</div>
	);
}

export default Iphone;
