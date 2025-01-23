import { useState, useEffect } from "react"
import TransactionItem from "./TransactionItem"
import { getExpenses } from "../app"

function TransactionList(){
    const [expenses, setExpenses] = useState([])

    useEffect(() => {
        setList()
    }, [])

    const setList = async() =>{
        const response = await getExpenses()
        setExpenses(response)
    }

    const refreshList = () =>{
        setList();
    }
    
    return(
            <div>
                {expenses.map((expense) => (
                    <TransactionItem name = {expense.name} amount = {expense.amount} category = {expense.category} id = {expense.id} refreshList = {refreshList}></TransactionItem>
                ))}
            </div>
    )
}

export default TransactionList