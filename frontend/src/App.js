import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Welcome from './pages/Welcome.js'
import ExpenseLog from './pages/ExpenseLog';
import IncomeLog from './pages/IncomeLog.js';

import AddExpense from './pages/AddExpense';
import EditExpense from './pages/EditExpense';
import AddIncome from './pages/AddIncome';
import EditIncome from './pages/EditIncome';
import ConvertCurrency from './pages/ConvertCurrency'
import AddCategory from './pages/Category';
import Dashboard from './pages/Dashboard';

  

function App() {

  const [expense, income] = useState([])

  return (
    <BrowserRouter>
    <main>
      <section>
      <Routes>
        <Route path='/' element={<Welcome/>} />
        <Route path='/Welcome' element={<Welcome/>} />
        <Route path="/Dashboard" element={<Dashboard />} />
        
        <Route path="/ExpenseLog" element={<ExpenseLog />}/>
        <Route path="/IncomeLog" element={<IncomeLog  />}/>
        
        <Route path="/category" element={<AddCategory />} /> 
        <Route path="/createExpense" element={<AddExpense />} /> 
        <Route path="/createIncome" element={<AddIncome />} /> 

        <Route path="/convertCurrency" element={<ConvertCurrency />} /> 
        
        <Route path="/editExpense" element={<EditExpense expense={expense} />} />
        <Route path="/editIncome" element={<EditIncome income={income} />} />

      </Routes>
      </section>
    </main>
    </BrowserRouter>
  );
}

export default App;
