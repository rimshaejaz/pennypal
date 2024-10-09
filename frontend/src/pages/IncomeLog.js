import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import IncomeList from '../components/IncomeList';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

function IncomeLog() {
    // Use the Navigate for redirection
    const redirect = useNavigate();

    // Use state to bring in the data
    const [incomes, setIncomes] = useState([]);

    // LOAD all the incomes
    useEffect(() => {
        // RETRIEVE all incomes
        const loadIncomes = async () => {
        const response = await fetch('https://pennypal-backend-7c3h.onrender.com/incomes');
        const incomes = await response.json();
        // sort incomes by date 
        const sortedIncomes = incomes.sort((a, b) => new Date(b.date) - new Date(a.date))
        setIncomes(sortedIncomes);
    };
    
        loadIncomes();
    }, []);
    

    // UPDATE a single Income
    const onEditIncome= async income => {
        redirect("/editIncome", { state: { income }});
    };


    // DELETE a single income entry  
    const onDeleteIncome = async (id) => {
        try {
        const response = await fetch(`https://pennypal-backend-7c3h.onrender.com/incomes/${id}`, { method: 'DELETE' });
        if (response.status === 200) {
            // reload all incomes 
            const getResponse = await fetch('/incomes');
            const incomes = await getResponse.json();
            setIncomes(incomes);
        } else {
            console.error(`helpful deletion message = ${id}, status code = ${response.status}`)
        }
        } catch (error) {
            console.error(`An error occured while deleting the income.`)
        }
    };

    // DISPLAY the incomes
    return (
        <>
        <Navigation/>
            <h2>Incomes</h2>
            <article>
                <div className='income-links'>
                    <Link to="/createIncome" className="link" >Add Income</Link>
                    <Link to="/category" className="category" id="category" >Category</Link>
                </div>
                <IncomeList
                    incomes={incomes} 
                    onEdit={onEditIncome} 
                    onDelete={onDeleteIncome} 
                />
            </article>
        </>
    );
}

export default IncomeLog;
