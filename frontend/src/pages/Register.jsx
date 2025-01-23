import { useState } from "react"
import { registration_api } from '../app.js'
import styles from '../styles/Form.module.css'
import { Link } from "react-router-dom";

function Register(){
    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsername = (event) =>{
        setUsername(event.target.value);
    }

    const handlePassword = (event) =>{
        setPassword(event.target.value);
    }

    const handleSubmit = (username, password) =>{
        registration_api(username, password);
    }
    return(
        <>
            <body className={styles.body}>
                <h1 className={styles.h1}>Get Started</h1>
                <div>
                    <p>Username</p>
                    <input className={styles.input} type="text" value={username} onChange={handleUsername} />
                </div>
                <div>
                    <div>
                        <p>Password</p>
                    </div>
                    <input className={styles.input} type="password" value={password} onChange={handlePassword}/>
                </div>
                <button className={styles.button} onClick={() => handleSubmit(username, password)}>Sign Up</button>
                <p>Already have an account? <Link className={styles.link} to={"/"}><b>Login now</b></Link></p>
            </body> 
        </> 
    )
}
export default Register