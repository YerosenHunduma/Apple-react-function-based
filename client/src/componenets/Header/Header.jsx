import logo from "../../commonResource/images/icons/logo-sm.png";
import search from "../../commonResource/images/icons/search-icon-sm.png";
import cart from "../../commonResource/images/icons/cart-sm.png";
import HeaderLink from "./HeaderLink";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
let arr = [
	{ LinkName: "Mac", Link: "mac" },
	{ LinkName: "iphone", Link: "iphone" },
	{ LinkName: "ipad", Link: "ipad" },
	{ LinkName: "watch", Link: "watch" },
	{ LinkName: "tv", Link: "tv" },
	{ LinkName: "Music", Link: "music" },
	{ LinkName: "Support", Link: "support" },
	{ LinkName: "YouTube", Link: "youtube" },
];
function Header() {
	return (
		<div className="nav-wrapper fixed-top">
			<div className="container">
				<Nav>
					<Navbar className="w-100" collapseOnSelect expand="lg" variant="dark">
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Link className="navbar-brand mx-auto" to="/">
							<img src={logo} alt="Logo" />
						</Link>
						<Navbar.Collapse id="basic-navbar-nav">
							<ul className="navbar-nav nav-justified w-100 nav-fill">
								{arr.map((el, index) => (
									<HeaderLink
										key={index}
										LinkName={el.LinkName}
										Link={el.Link}
									/>
								))}
								<li className="nav-item">
									<Link className="nav-link js-scroll-trigger" to="/search">
										<img src={search} alt="Search" />
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link js-scroll-trigger" to="/cart/">
										<img src={cart} alt="Cart" />
									</Link>
								</li>
							</ul>
						</Navbar.Collapse>
					</Navbar>
				</Nav>
			</div>
		</div>
	);
}

export default Header;
