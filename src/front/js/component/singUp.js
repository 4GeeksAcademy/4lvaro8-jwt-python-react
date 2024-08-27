import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";


export default function SignUp() {
    
    const { actions } = useContext(Context);
    const navigate = useNavigate()

	const [inputEmail, setInputEmail] = useState("");
	const [inputPassword, setInputPassword] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await actions.register(inputEmail, inputPassword);
        navigate("/login");
    };

    return (
        <div className="container-form m-auto mt-5 w-50" >
        <h1 className="form-header text-center">SING UP</h1>

        <form className="from-singUp" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label" >Email</label>
                <input type="email" className="form-control" placeholder="Introduzca su email" id="email" name="email" value={inputEmail} 
                onChange={(e) => setInputEmail(e.target.value)} required></input>
            </div>

            <div className="mb-3">
                <label for="password" className="form-label">Password</label>
                <input type="password" className="form-control" placeholder="Introduzca su contraseña" name="password" id="password" value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)} required></input>
            </div>

            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="Check"></input>
                <label className="form-check-label" for="Check">Mantener sesión iniciada</label>
            </div>

            <div className="form-footer d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">Registrar</button>

                <Link className="text-primary" to={"/login"}><button type="submit" className="btn btn-success">Ya tengo cuenta</button></Link>
            </div>
        </form>
    </div>
    );
}