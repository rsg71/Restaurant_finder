import { useState } from 'react';
import API from '../../utils/API';


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);

    function login() {
        API.login({email, password}) 
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            setIsError(true);
        })
    }


    return (
        <div>
            {isError && <div>ERROR!</div>}
            <label>Email:</label>
            <input value={email} onChange={e => setEmail(e.target.value)} />
            <button onClick={login}>Login</button>
        </div>
    )
}