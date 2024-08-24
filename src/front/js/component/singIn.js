import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";


const SingIn = () => {

    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");

    const { actions } = useContext(Context);

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene que el formulario recargue la página

        try {
            if (await actions.login(inputEmail, inputPassword)) {
                navigate("/private")
            }

        } catch (error) {
            console.error("Error during user login:", error);
        }

    }



    return (
        <div className="container-form m-auto w-50" >
            <h1 className="form-header text-center">SING IN</h1>

            <form className="from-singUp" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label" >Email</label>
                    <input type="text" className="form-control" placeholder="Introduzca su email" id="InputEmail" name="InputEmail" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)}></input>
                </div>

                <div className="mb-3">
                    <label for="InputPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="Introduzca su contraseña" id="InputPassword" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)}></input>
                </div>

                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="Check"></input>
                    <label className="form-check-label" for="Check">Mantener sesión iniciada</label>
                </div>

                <div className="form-footer d-flex justify-content-between">
                    <button type="submit" className="btn btn-success">Iniciar sesión</button>

                    <Link className="text-primary" to={"/register"}><button type="submit" className="btn btn-primary">No estoy registrado</button></Link>
                </div>
            </form>
        </div>
    )
}

export default SingIn;