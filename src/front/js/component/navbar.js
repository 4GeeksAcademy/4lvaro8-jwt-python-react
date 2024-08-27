import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">

				<Link to="/">
					<span className="navbar-brand mb-0 h1">4lvaro App</span>
				</Link>

				<div className="buttons-container d-flex" >

					<div className=" me-5 ml-auto">
						<Link to="/login">
							<button className="btn btn-secondary">Iniciar sesion</button>
						</Link>
					</div>

					<div className="ml-auto">
						<Link to="/register">
							<button className="btn btn-secondary">Registrarse</button>
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};
