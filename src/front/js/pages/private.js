import React, { useContext } from "react";
import { Context } from "../store/appContext";
import  Protected  from "../component/protected"



export const Private = () => {

    return (
        <>
            <Protected />
        </>
    )
}