import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ExpenseList from '../components/ExpenseList';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';


function ExpenseLog() {
    // Use the Navigate for redirection
    const redirect = useNavigate();

    // Use state to bring in the data
    const [expenses, setExpenses] = useState([]);

    // LOAD all the expenses
    useEffect(() => {
        // RETRIEVE all expenses
        const loadExpenses = async () => {
        const response = await fetch('/expenses');
        const expenses = await response.json();
        // sort expenses by date 
        const sortedExpenses = expenses.sort((a, b) => new Date(b.date) - new Date(a.date))
        setExpenses(sortedExpenses);
    };
        loadExpenses();
    }, []);
    
    // UPDATE a single expense
    const onEditExpense = (expense) => {
        redirect("/editExpense", { state: { expense }});
    };


    // DELETE a single expense 
    const onDeleteExpense = async (id) => {
        try {
        const response = await fetch(`/expenses/${id}`, { method: 'DELETE' });
        if (response.status === 200) {
            // reload all expenses
            const getResponse = await fetch('/expenses');
            const expenses = await getResponse.json();
            setExpenses(expenses);
        } else {
            console.error(`helpful deletion message = ${id}, status code = ${response.status}`)
        }
        } catch (error) {
            console.error(`An error occured while deleting the expense.`)
        }
    };

    // DISPLAY the expenses & add expense button 
    return (
        <>
        <Navigation/>
            <h2>Expenses</h2>
            <article>
                <div className='expense-links'>
                    <Link to="/createExpense" className="link" >Add Expense</Link>
                    <Link to="/category" className="category" id="category" >Category</Link>
                </div>
                <ExpenseList
                    expenses={expenses} 
                    onEdit={onEditExpense} 
                    onDelete={onDeleteExpense} 
                />
            </article>
        </>
    );
}

export default ExpenseLog;