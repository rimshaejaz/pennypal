import React from 'react';
import { SlClose } from "react-icons/sl";
import { FiEdit } from "react-icons/fi";

function Expenses({ expense, onEdit, onDelete }) {
    return (
        <tr>
            <td>{expense.title}</td>
            <td>{expense.amount}</td>
            <td>{new Date(expense.date).toLocaleDateString()}</td>
            <td>{expense.description}</td>
            <td>{expense.type}</td>
            <td>{expense.category}</td>

           
            <td><i style={{cursor: "pointer", display: "flex", justifyContent: "center"}}><SlClose onClick={() => onDelete(expense._id)}/></i></td>
            <td><i style={{cursor: "pointer", display: "flex", justifyContent: "center"}}><FiEdit onClick={() => onEdit(expense)} /></i></td>
        </tr>
    );
}

export default Expenses;