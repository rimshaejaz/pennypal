import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogOut.js'

function Navigation() {
  return (
    <nav>
       <Link to="../Dashboard">Dashboard</Link>
       <Link to="../ExpenseLog">Expense</Link>
       <Link to="../IncomeLog">Income</Link>
       <LogoutButton />
    </nav>
  );
};

export default Navigation;