import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../utils/API';
import { AuthContext } from '../App';
import GenericError from '../components/GenericError';


export default function Login() {

    const navigate = useNavigate();

    const { setIsLoggedIn } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);

    function login() {
        API.login({ email, password })
            .then(res => {
                console.log('login res: ', res.data);

                let isloggedIn = res.data.msg === 'login successful';
                if (isloggedIn) {
                    // redirect to members page
                    setIsLoggedIn(true);
                    navigate('/members')
                }
            })
            .catch(err => {
                console.log('login err: ', err);
                setIsError(true);
            })
    }


    function testGetAuth () {
        API.testAuth()
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    {isError && <GenericError />}
                    <button onClick={testGetAuth}>testGetAuth</button>
                    
                    <h2>Login Form</h2>
                    <form className="login">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="email-input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="password-input" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                        </div>
                        <button type="button" className="btn btn-default" onClick={login}>Login</button>
                    </form>
                    <br />
                    {/* <a href="/auth/facebook/secrets">
                        <div className="fb-login-button" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false" data-width="" data-onlogin="window.location='/auth/facebook/secrets'"></div>
                    </a> */}
                    <br />
                    <p>Or sign up <a href="/">here</a></p>
                </div>
            </div>
        </div>
    )
}