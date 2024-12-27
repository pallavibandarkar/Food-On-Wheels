import React from "react";
import AdminDashBoard from "../../components/AdminDashBoard/AdminDashBoard";
import { useParams } from "react-router-dom";
export default function Admin(){
    const { id } = useParams();
    return(
        <>
        <AdminDashBoard foodTruckId={id}/>
        </>
    )
}