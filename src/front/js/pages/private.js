import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Private() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/login");
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Solo pueden ver este baile los elegidos</h2>
            <img src="https://media.tenor.com/Tr4svi_j4zEAAAAM/skeleton-dancing.gif" alt="" />
            <button onClick={handleLogout} className="btn btn-danger">Cerrar Sesión</button>
        </div>
    );
}