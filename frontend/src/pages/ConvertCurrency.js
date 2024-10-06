import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';


export const ConvertCurrency = () => {

    const [amount, setAmount] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [result, setResult] = useState("");

    const redirect = useNavigate();

    const convertCurrency = async () => {
        const newConvert = { amount };
        const response = await fetch('/convertCurrency', {
            method: 'post',
            body: JSON.stringify(newConvert),
            headers: {
                'Content-Type': 'application/json',
            },

        });
        if(response.status === 201){
            alert(`The request was successful. The amount has been converted.`);
            redirect("/convertCurrency");
        } else {
            alert(`Please review your entry and try again. = ${response.status}`);
            redirect("/convertCurrency");
        }
    };

    return (
        <>
        <article>
            <Navigation />
                <fieldset>
                    <legend>Convert Currency</legend>
                    <label htmlFor="title">From</label>
                    <input
                        type="text"
                        placeholder="USD"
                        value={from}
                        onChange={e => setFrom(e.target.value)} 
                        id="from"
                         />
                    <label htmlFor="title">To</label>
                    <input
                        type="text"
                        placeholder="EURO"
                        value={to}
                        onChange={e => setTo(e.target.value)} 
                        id="to"
                         />
                    <label htmlFor="title">Amount</label>
                    <input
                        type="number"
                        placeholder="45"
                        value={amount}
                        onChange={e => setAmount(e.target.value)} 
                        id="amount"
                         />
                    <label htmlFor="title">Result</label>
                    <input
                        type="number"
                        placeholder="41.46"
                        value={result}
                        onChange={e => setResult(e.target.value)} 
                        id="result"
                         />
                    <label hmtlFor="submit">
                    <button
                        type="submit"
                        onClick={convertCurrency}
                        id="submit"
                        className='add'
                    >Convert</button></label>
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

export default ConvertCurrency;