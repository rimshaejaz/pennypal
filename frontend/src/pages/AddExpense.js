import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

export const AddExpense = () => {

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    
    const redirect = useNavigate();

    // Fetch categories 
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/category/type?type=Expense'); 
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                } else {
                    console.error('Failed to fetch categories', response.status);
                }
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };

        fetchCategories();
    }, []);

    const addExpense = async (e) => {
        e.preventDefault();

        const newExpense = { title, amount, date, description, category };
        const response = await fetch('/createExpense', {
            method: 'post',
            body: JSON.stringify(newExpense),
            headers: {
                'Content-Type': 'application/json',
            },

        });
        if(response.status === 201){
            alert(`The request was successful. The expense has been added.`);
            redirect("/createExpense");
        } else {
            alert(`Please review your entry and try again. = ${response.status}`);
            redirect("/createExpense");
        }
    };

    // redirect user to add a category 
    const handleCategoryChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue === 'add-category') {
            redirect('/category'); 
        } else {
            setCategory(selectedValue);
        }
    };

    return (
        <>
        <article>
            <Navigation/>
                <fieldset>
                    <legend>Add an Expense</legend>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        placeholder="Target"
                        value={title}
                        onChange={e => setTitle(e.target.value)} 
                        id="title" />
                    <label htmlFor="title">Amount</label>
                    <input
                        type="number"
                        placeholder="$45"
                        value={amount}
                        onChange={e => setAmount(e.target.value)} 
                        id="amount"
                         />

                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        value={date}
                        placeholder="mm/dd/yyyy"
                        onChange={e => setDate(e.target.value)} 
                        id="date" />

                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        placeholder="Bread & eggs"
                        value={description}
                        onChange={e => setDescription(e.target.value)} 
                        id="description" />   

                    <label hmtlFor="category">Category</label>
                    <select
                        value={category}
                        onChange={handleCategoryChange} 
                        id="category">
                        <option value="">Select Option</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat.title}>
                                {cat.title}
                            </option>
                        ))}  
                        <option value="add-category">Add Category</option>
                    </select>
                    <label hmtlFor="submit">
                    <button
                        type="submit"
                        onClick={addExpense}
                        id="submit"
                        className='add'
                    >Submit</button></label>
                    <label htmlFor="back">
                    <button className='add'>
                        <Link to="/ExpenseLog">Expense Page</Link>
                    </button>
                    </label>
                </fieldset>
            </article>
        </>
    );
}

export default AddExpense;
