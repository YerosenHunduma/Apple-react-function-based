import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Four04 from "../Homepage/Four04";

function ProductPage() {
	const [product, setProduct] = useState([]);

	const { productID } = useParams();

	useEffect(() => {
		fetch("http://localhost:3001/iphone")
			.then((res) => res.json())
			.then((data) => {
				const singleProduct = data.filter(
					(product) => product.product_url == productID
				);
				setProduct(singleProduct);
			})
			.catch(() => console.log(err));
	}, [productID]);
	console.log(product);

	if (product.length)
		return (
			<div>
				<section className="internal-page-wrapper top-50">
					<div className="container">
						{product.map((product) => {
							let productDiv = (
								<div key={product.product_url} className="bottom-100">
									<div className="row justify-content-center text-center bottom-50">
										<div className="col-12">
											<div className="title-wraper bold">
												{product.product_name}
											</div>
											<div className="brief-description">
												{product.product_brief_description}
											</div>
										</div>
									</div>
									<div className="row justify-content-center text-center product-holder h-100">
										<div className="col-sm-12 col-md-6 my-auto">
											<div className="starting-price">
												{`Starting at ${product.starting_price}`}
											</div>
											<div className="monthly-price">{product.price_range}</div>
											<div className="product-details">
												{product.product_description}
											</div>
										</div>
										<div className={`col-sm-12 col-md-6`}>
											<div className="prodict-image">
												<img src={product.product_img} />
											</div>
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
	else {
		return <Four04 />;
	}
}

export default ProductPage;
