import React from "react";
import LogIn from "../components/LogIn";

function Welcome() {
  return (
    <>
     <body class="welcome">
     <h3 className="pennyplan">Welcome to PennyPlan!</h3>
        <p>
          Take control of your financial journey by tracking your income and expenses with ease.
          This intuitive web app provides a comprehensive overview of your spending habits, 
          empowering you to understand where your money goes and help you make more informed decisions. 
          Whether you're saving for a dream vacation, a new home, or retirement, this platform 
          helps you set and achieve your financial goals.
        </p>
  
        <p>
          Once you click on the Expenses or Income tab in the navigation bar, You will directed to an overview 
          of your expenses and incomes that have been input so far. In the far left corner, click the "Add Expense" or
          "Add Income" button to create more inputs. 
        </p>
        <p>There is also no need to worry if you make a mistake. You will have the option to either delete or edit your 
          input on the overview pages. 
        </p>
      </body>
      <LogIn/>  
    </>
  );
}

export default Welcome;