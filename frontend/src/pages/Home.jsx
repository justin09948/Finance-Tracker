import { useState } from "react"
import { useEffect } from "react"
import styles from "../styles/Home.module.css"
import { setIncome, getIncome, getId, setExpenses, getExpenses } from "../app"
import TransactionItem from "../componenets/TransactionItem"
import TransactionList from "../componenets/TransactionList"
import BarChart from "../componenets/BarChart"


function Home(){
    //HOOKS
    const [income, setIncomeValue] = useState('')
    const [finalIncome, setFinalIncome] = useState(null);
    const [id, setId] = useState(null)
    const [expenseName, setExpenseName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState(null);
    const [expensesList, setExpensesList] = useState([]);
    const [showAddExpense, setShowAddExpense] = useState(false);
    const [hideAddExpense, setHideAddExpense] = useState(true);
    const [showIncome, setShowIncome] = useState(false);
    const [total, setTotal] = useState();
    const [balance, setBalance] = useState();
    const [category, setCategory] = useState("");
    const [deleted, setDeleted] = useState(false);


    //USE EFFECT HOOKS
    useEffect(()=>{
            const handleId = async() =>{
                const id_response = await getId();
                setId(id_response.id)
            }
            handleId();
    }, [])
    useEffect(() => {
        const loadIncome = async() => {
            const response = await getIncome(id);
            setFinalIncome(response.income)
        }
        
        loadIncome();
        handleTotalChange();
        

    }, [id])


    //FUNCTIONS
    const handleTotalChange = async() => {
        let totalCount = 0;
        const response = await getExpenses();
        for(let i = 0; i < response.length; i++){
            totalCount += parseFloat(response[i].amount);
        }
        setTotal(totalCount)
        setBalance(parseFloat(finalIncome) - parseFloat(total))
    }

    const showExpenseInput = () => {
        setShowAddExpense(true)
        setHideAddExpense(false)
    }
    const hideExpenseInput = () => {
        setShowAddExpense(false)
        setHideAddExpense(true)
    }
    const handleIncome = (event) => {
        setIncomeValue(event.target.value)
    }

    const handleExpenseName = (event) =>{
        setExpenseName(event.target.value)
    }

    const handleExpenseAmount = (event) =>{
        setExpenseAmount(event.target.value)
    }

    const handleExpenseSubmit = async(expenseName, expenseAmount) =>{
        const expenseData = {
            user: id, 
            amount: expenseAmount,
            name: expenseName,
            category: category
        }
        const response = await setExpenses(expenseData);
        const newExpense = {
            name: response.name,
            amount: response.amount,
            category: response.category
        }
        setExpensesList([...expensesList, newExpense])
        setTotal(total + parseFloat(expenseAmount))
        setCategory(null)

    }
    const handleRemove = () => {
        localStorage.removeItem('Token')
        localStorage.removeItem('Refresh')
        window.location.href = "/"
    }

    const handleSubmit =async() =>{
        const inputData = {
            user: id,
            income: income
        }
        const response = await setIncome(inputData);
        setFinalIncome(response.income)
    }
   
    const handleCategory = (event) => {
        setCategory(event.target.value);
    }

    const handleDetete = (value) =>{
        if(value === true){
            handleTotalChange();
        }
    }
    
    return(
        <body className={styles.body}>
            <div className={styles.header}>
                <h1 >Dashboard</h1>
                <button className={styles.logout} onClick={() => handleRemove()}>Log out</button>
            </div>
            <div className={styles.metrics}>
                <div className={styles.metric} >
                    <p>Income</p>
                    <div className={styles.incomeSelect}>
                        <h1>${finalIncome}</h1>
                        <button className={styles.incomeButton} onClick={() => setShowIncome(true)}><span className="material-symbols-outlined">add</span></button>
                    </div>
                    {showIncome &&<div className={styles.inputIncome}>
                        <input type="text" value={income} onChange={handleIncome} />
                        <button className={styles.incomeButtons} onClick={() => handleSubmit()}>Submit</button>
                        <button className={styles.incomeButtons} onClick={() => setShowIncome(false)}>Cancel</button>
                    </div>}
                </div> 
                <div className={styles.vert}></div>
                <div className={styles.metric} >
                    <p>Expenses</p>
                    <h1>${total}</h1>
                </div>
                <div className={styles.vert}></div>
                <div className={styles.metric}>
                    <p>Balance</p>
                    <h1>${balance}</h1>
                </div>
            </div>
            <div className={styles.barChart}>
                <BarChart></BarChart>
            </div>
            <div className={styles.transactionDisplay}>
                <h1 className={styles.transactionH1}>Transactions</h1>
                <TransactionList></TransactionList>
                {expensesList.map((transaction) => (
                    <TransactionItem name = {transaction.name} amount = {transaction.amount} category = {transaction.category} onDelete = {handleDetete}></TransactionItem>
                ))}
            </div>
            {hideAddExpense && <button className={styles.addButton} onClick={showExpenseInput}>+ Add Expense</button>}
            {showAddExpense &&<div className={styles.expenseBox}>
                <h1>Add Expense</h1>
                <p>Expense Name</p>
                {showAddExpense && <input className={styles.expenseInput} type="text" value={expenseName} onChange={handleExpenseName} />}
                <p>Expense Amount</p>
                {showAddExpense && <input className={styles.expenseInput} type="text" value={expenseAmount} onChange={handleExpenseAmount}/>}
                <div className={styles.category_container}>
                    <label className={styles.category_item} htmlFor="Category">Category:</label>
                    <select className={styles.category_item} name="categories" id="cateogories" onChange={handleCategory}>
                        <option value="">Select</option>
                        <option value="Food">Food</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Health">Health</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Other">Other</option>
                    </select>
                <div>
                </div>
                    {showAddExpense && <button className={styles.addExpenseButton} onClick={() => handleExpenseSubmit(expenseName, expenseAmount)}>Add</button>}
                    {showAddExpense && <button className={styles.addExpenseButton} onClick={hideExpenseInput}>Cancel</button>}
                </div>
            </div>}
        </body>
    )
}

export default Home