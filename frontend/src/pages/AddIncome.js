import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

export const AddIncome = () => {

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
                const response = await fetch('https://pennypal-backend-7c3h.onrender.com/category/type?type=Income'); 
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

    const addIncome = async (e) => {
        e.preventDefault();

        // Ensure the date is in the correct format (yyyy-MM-dd)
        const formattedDate = new Date(date).toISOString().split('T')[0];
        
        const newIncome= { title, amount, date: formattedDate, description, category };
        const response = await fetch('/createIncome', {
            method: 'post',
            body: JSON.stringify(newIncome),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert(`The request was successful. The income has been added.`);
            redirect("/createIncome");
        } else {
            alert(`Please review your entry and try again. = ${response.status}`);
            redirect("/createIncome");
        }
    };

     // redirect user to add a category 
     const handleCategoryChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue === 'add-category') {
            redirect('https://pennypal-backend-7c3h.onrender.com/category'); 
        } else {
            setCategory(selectedValue);
        }
    };


    return (
        <>
        <article>
            <Navigation/>
                <fieldset>
                    <legend>Add an Income</legend>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        placeholder="Attorney Fees"
                        value={title}
                        onChange={e => setTitle(e.target.value)} 
                        id="title" />
                    <label htmlFor="title">Amount</label>
                    <input
                        type="number"
                        placeholder="5000"
                        value={amount}
                        onChange={e => setAmount(e.target.value)} 
                        id="amount" />

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
                        placeholder="Legal representation"
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
                    <label hmtlfor="submit">
                    <button
                        type="submit"
                        onClick={addIncome}
                        id="submit"
                        className='add'
                    >Submit</button></label>
                    <label htmlFor="back">
                    <button className='add'>
                        <Link to="/IncomeLog">Income Page</Link>
                    </button>
                    </label>
                </fieldset>
            </article>
        </>
    );
}

export default AddIncome;
