import axios from "axios";

const baseUrl = "http://127.0.0.1:8000";

async function registration_api(username, password){
    try{
        const response = await axios.post(`${baseUrl}/register/`, {username, password});
        console.log("Success");
        window.location.href = "/";
        return response.data;
    }

    catch(error){
        console.log("Error");
    }
}

async function getToken(username, password){
    try{
        const response = await axios.post(`${baseUrl}/api/token/`, {username, password});

        const { access, refresh} = response.data;

        localStorage.setItem('Token', access)
        localStorage.setItem('Refresh', refresh)

        window.location.href = "/home"
        console.log("Token Saved")
    }

    catch(error){
        console.log("Error recieving token")
    }
}
async function getId(){
    const token = localStorage.getItem('Token');
    const response = await axios.get(`${baseUrl}/api/getId/`, {headers: {Authorization: `Bearer ${token}`}})
    return(response.data)
}
async function setIncome(incomeData){
    const token = localStorage.getItem('Token');
    try{
        const response = await axios.post(`${baseUrl}/api/income/`, incomeData, {headers: {Authorization: `Bearer ${token}`}})
        console.log("Success post for income")
        return (response.data)
    }

    catch(error){
        const delete_response = await axios.delete(`${baseUrl}/api/income/`,{headers: {Authorization: `Bearer ${token}`}})
        
        if(delete_response.status === 200){
            const re_response = await axios.post(`${baseUrl}/api/income/`, incomeData, {headers: {Authorization: `Bearer ${token}`}})
            return(re_response.data);
        }
    }
}

async function getIncome(id) {
    const token = localStorage.getItem('Token');
    const response = await axios.get(`${baseUrl}/api/income/${id}/`, {headers: {Authorization: `Bearer ${token}`}});
    console.log("Success getting income")
    if(response.status === 400){
        console.log("Error getting income")
    }
    console.log(response.data)
    return (response.data)

}

async function setExpenses(expenseData){
    const token = localStorage.getItem('Token');
    const response = await axios.post(`${baseUrl}/api/expenses/`, expenseData, {headers: {Authorization: `Bearer ${token}`}})
    if (response.status === 400){
        console.log("Error posting expense")
    }
    return response.data
}

async function getExpenses() {
    const token = localStorage.getItem('Token');
    const response = await axios.get(`${baseUrl}/api/expenses/`, {headers: {Authorization: `Bearer ${token}`}})
    return response.data
}

async function deleteExpense(id){
    const token = localStorage.getItem('Token');
    const response = await axios.delete(`${baseUrl}/api/expenses/${id}/`, {headers: {Authorization: `Bearer ${token}`}})
    return response.status
}
export { registration_api, getToken, setIncome, getIncome, getId, setExpenses, getExpenses, deleteExpense };