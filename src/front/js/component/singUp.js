import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
    const [signupData, setSignUpData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSignUpData({
            ...signupData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(process.env.BACKEND_URL + "//api/registrar", signupData, {
                headers: { "Content-Type": "application/json" },
            });
            console.log("Usuario registrado:", response.data);
            navigate("/login");
        } catch (error) {
            console.log("Ha habido un error: " + error);
        }
    };

    return (
        <div className="container-form m-auto w-50" >
        <h1 className="form-header text-center">SING UP</h1>

        <form className="from-singUp" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label" >Email</label>
                <input type="email" className="form-control" placeholder="Introduzca su email" id="email" name="email" value={signupData.email}
                        onChange={handleChange} required></input>
            </div>

            <div className="mb-3">
                <label for="password" className="form-label">Password</label>
                <input type="password" className="form-control" placeholder="Introduzca su contraseña" name="password" id="password" value={signupData.password}
                        onChange={handleChange} required></input>
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