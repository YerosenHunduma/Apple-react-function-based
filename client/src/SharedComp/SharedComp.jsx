import React from "react";
import Header from "../componenets/Header/Header";
import Footer from "../componenets/footer/Footer";
import { Outlet } from "react-router-dom";
Outlet;
function SharedComp() {
	return (
		<div>
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
}

export default SharedComp;
