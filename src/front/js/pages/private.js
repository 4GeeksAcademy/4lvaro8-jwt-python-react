import { useContext } from "react";
import { Context } from "../store/appContext";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const Private = () => {

    const { actions } = useContext(Context)
    const navigate = useNavigate()


    const handleLogout = async () => {

        try {
            actions.logout()
            navigate("/login")
        } catch (error) {
            console.error("Error during LogOut:", error);
        }
    }

    const fetchToken = async () => {
        try {
            const token = localStorage.getItem("jwt-token");
            console.log("token: ", token);
            if (!token) {
                navigate("/login");
                return;
            }
        } catch (error) {
            console.log("Error fetching token: ", error);
        }
    }

    useEffect(() => {

        fetchToken();


    }, [])

    return (
        <>
            <div>
                <h1>Únicamente si tienes acceso privado podrás ver este mensaje.</h1>

                <div className="d-flex flex-row justify-content-around">
                <img src="https://img.freepik.com/vector-gratis/dibujado-mano-ilustracion-baile-gaucho_23-2149198742.jpg?size=626&ext=jpg&ga=GA1.2.1436477088.1720564313&semt=ais_hybrid" alt="Gauchos Bailando"/>
                <button className="btn btn-danger" onClick={handleLogout}>Log Out</button>
                </div>

            </div>

        </>
    )
}