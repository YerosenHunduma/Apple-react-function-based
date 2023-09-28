import Homepage from "./Homepage/Homepage";
import Four04 from "./Homepage/Four04";
import Youtube from "./componenets/YouTube/youtube";
import Mac from "./HeaderLinkComp/Mac";
import Music from "./HeaderLinkComp/Music";
import Ipad from "./HeaderLinkComp/Ipad";
import Iphone from "./HeaderLinkComp/Iphone";
import ProductPage from "./HeaderLinkComp/ProductPage";
import Tv from "./HeaderLinkComp/Tv";
import Watch from "./HeaderLinkComp/Watch";
import Support from "./HeaderLinkComp/Support";
import Search from "./HeaderLinkComp/Search";
import Cart from "./HeaderLinkComp/Cart";
import { Routes, Route } from "react-router-dom";
import "./commonResource/css/bootstrap.css";
import "./commonResource/css/styles.css";
import SharedComp from "./SharedComp/SharedComp";
function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<SharedComp />}>
					<Route path="/" element={<Homepage />} />
					<Route path="/mac" element={<Mac />} />
					<Route path="/iphone" element={<Iphone />} />
					<Route path="/iphone/:productID" element={<ProductPage />} />
					<Route path="/music" element={<Music />} />
					<Route path="/support" element={<Support />} />
					<Route path="/tv" element={<Tv />} />
					<Route path="/ipad" element={<Ipad />} />
					<Route path="/watch" element={<Watch />} />
					{/* <Route path="/youtube" element={<Youtube />} /> */}
					<Route path="/search" element={<Search />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="*" element={<Four04 />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
