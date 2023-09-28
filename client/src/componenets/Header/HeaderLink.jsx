import React from "react";
import { Link } from "react-router-dom";

function HeaderLink(props) {
	return (
		<>
			<li className="nav-item">
				<Link className="nav-link js-scroll-trigger" to={props.Link}>
					{props.LinkName}
				</Link>
			</li>
		</>
	);
}

export default HeaderLink;
