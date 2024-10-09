import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

export const AddCategory = () => {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    
    const redirect = useNavigate();

    const addCategory = async () => {
        const newCategory = { title, type };
        try {
        const response = await fetch('/createCategory', {
            method: 'post',
            body: JSON.stringify(newCategory),
            headers: {
                'Content-Type': 'application/json',
            },

        });
        if (response.status === 201){
            alert(`The request was successful. The category has been added.`);
            redirect("https://pennypal-backend-7c3h.onrender.com/category");
        } else {
            alert(`Invalid category parameter. Try again. = ${response.status}`);
            redirect("https://pennypal-backend-7c3h.onrender.com/category");
        }
        } catch (error) {
            alert(`aN ERROR OCCURED: ${error.message}`);
        }
    };


    return (
        <>
        <article>
            <Navigation/>
                <fieldset>
                    <legend>Add a Category</legend>
                    <label htmlFor="description">Category</label>
                    <input
                        type="text"
                        placeholder="Medical"
                        value={title}
                        onChange={e => setTitle(e.target.value)} 
                        id="category" />  

                    <label hmtlFor="category">Type: Expense or Income</label>
                    <input
                        type="text"
                        placeholder="Expense"
                        value={type}
                        onChange={e => setType(e.target.value)}
                        id="category">
                    </input>
                    <label hmtlFor="submit">
                    <button
                        type="submit"
                        onClick={addCategory}
                        id="submit"
                        className='add'
                    >Submit</button></label>
                    <label htmlFor="back">
                    <button className='add'>
                        <Link to="/ExpenseLog">Expense Page</Link>
                    </button>
                    <button className='add'>
                        <Link to="/IncomeLog">Income Page</Link>
                    </button>
                    </label>
                </fieldset>
            </article>
        </>
    );
}

export default AddCategory;
