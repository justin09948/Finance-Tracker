import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { getExpenses } from "../app"
import { useState, useEffect } from "react"

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
function BarChart(){
    const [expenses, setExpenses] = useState([])
    useEffect(() => {
        const setList = async() =>{
            const response = await getExpenses()
            setExpenses(response)
        }
        setList()
    }, [])
    const categorySum = expenses.reduce((acc, expense) =>{
        if(!acc[expense.category]){
            acc[expense.category] = 0;
        }

        acc[expense.category] += parseFloat(expense.amount);
        return acc;
    }, {})
    const data = {
        labels: ["Food", "Transportation", "Health", "Entertainment", "Other"],
        datasets: [{
            label: "Expenses",
            data: categorySum,
            backgroundColor: [
                "#F8D573",
                "#A2DFF7",
                "#A8E6CF",
                "#F8B7D3",
                "#acacac"
            ],
            borderWidth: 1
        }]
    }
    const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
        display: false, 
        },
    },
    scales: {
        x: {
        grid: {
            display: false, 
        },
        ticks: {
            color: "#555", 
            font: {
            size: 11, 
            },
        },
        },
        y: {
        grid: {
            display: true,
        },
        ticks: {
            color: "#555", 
            font: {
            size: 10, 
            },
        },
        },
    },
    };
    
    

    return(
        <Bar data = {data} options={options}></Bar>
    )
}

export default BarChart