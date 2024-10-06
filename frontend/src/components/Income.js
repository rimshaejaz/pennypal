import React from 'react';
import { SlClose } from "react-icons/sl";
import { FiEdit } from "react-icons/fi";

function Income({ income, onEdit, onDelete }) {
    return (
        <tr>
            <td>{income.title}</td>
            <td>{income.amount}</td>
            <td>{new Date(income.date).toLocaleDateString()}</td>
            <td>{income.description}</td>
            <td>{income.type}</td>
            <td>{income.category}</td>

           
            <td><i style={{cursor: "pointer", display: "flex", justifyContent: "center"}}><SlClose onClick={() => onDelete(income._id)}/></i></td>
            <td><i style={{cursor: "pointer", display: "flex", justifyContent: "center"}}><FiEdit onClick={() => onEdit(income)} /></i></td>
        </tr>
    );
}

export default Income;