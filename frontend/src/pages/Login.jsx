import { useState } from "react";
import styles from "../styles/Form.module.css"
import { Link } from "react-router-dom";
import {getToken} from "../app.js"

function Login(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    return(
        <body className={styles.body}>
            <h1>Welcome Back</h1>
            <div>
                    <p>Username</p>
                    <input className={styles.input} type="text" value={username} onChange={handleUsername}/>
                </div>
                <div>
                    <div>
                        <p>Password</p>
                    </div>
                    <input className={styles.input} type="password" value={password} onChange={handlePassword}/>
                </div>
                <button className={styles.button} type="submit" onClick={() => getToken(username, password)}>Log in</button>
                <p>Don't have an account? <Link className={styles.link} to={"/register"}><b>Sign up</b></Link></p>
        </body>
    )
}

export default Login