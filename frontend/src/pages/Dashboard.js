import React from "react";
import Navigation from "../components/Navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react";


// Function to format the date to "MMM YYYY" (e.g., "Sep 2024")
const formatDateToMonthYear = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

export const Dashboard = () => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);

    // Load all the incomes
    useEffect(() => {
        // RETRIEVE all incomes
        const loadIncomes = async () => {
        const response = await fetch('/incomes');
        const incomes = await response.json();
        // sort incomes by date 
        const sortedIncomes = incomes.sort((a, b) => new Date(b.date) - new Date(a.date))
        setIncomes(sortedIncomes);
    };
        loadIncomes();
    }, []);

    // Load all the expenses
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

    // Prepare expense data for the bar chart
    const chartExpenseData = expenses.map(expense => ({
        dateExpense: formatDateToMonthYear(expense.date),
        Expense: expense.amount
    }));

    // Prepare income data for the bar chart
    const chartIncomeData = incomes.map(income => ({
        dateIncome: formatDateToMonthYear(income.date),
        Income: income.amount
    }));

    return (
        <article>
            <Navigation/>
            <h2>Summary</h2>
            <h3 className="chart-income-title">Income Summary</h3>
            <div className="chart-income">
            <ResponsiveContainer className="chart-income">
                <BarChart
                    data={chartIncomeData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dateIncome" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Income" fill="#6a994e" />
                </BarChart>
            </ResponsiveContainer>
            </div>

            <h3 className="chart-expense-title">Expense Summary</h3>
            <div className="chart-expense">
            <ResponsiveContainer className="chart-expense">
                <BarChart
                    data={chartExpenseData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dateExpense" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Expense" fill="#9a031e" />
                </BarChart>
            </ResponsiveContainer>
            </div>
        </article>
    )
};

export default Dashboard;
