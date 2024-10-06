import express from "express";
import { retrieveExpense, createExpense, deleteExpenseById } from '../controllers/expense-controller.js'
import { retrieveIncome, createIncome, deleteIncomeById } from "../controllers/income-controller.js";
import { retrieveCategory, createCategory, retrieveCategoryByType } from "../controllers/category-controller.js";


const router = express.Router();

router.get('/expenses', retrieveExpense);
router.post('/createExpense', createExpense);
router.delete('/expenses/:id', deleteExpenseById)

router.get('/incomes', retrieveIncome);
router.post('/createIncome', createIncome);
router.delete('/incomes/:id', deleteIncomeById)

router.get('/category', retrieveCategory);
router.post('/createCategory', createCategory);
router.get('/category/type', retrieveCategoryByType); 

export default router;