import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from "../utils/API";
import { AuthContext } from '../App';


export default function SignUp() {
  const navigate = useNavigate();


  const {isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  function getData () {
    API.getData()
    .then(res => console.log(res.data))
  }


  function signUp() {
    console.log('signing up...')
    API.signUp({ email, password })
      .then(res => {
        console.log(res.data);

        let isloggedIn = res.data.msg === 'signup successful';
        if (isloggedIn) {
          // redirect to login page
          setIsLoggedIn(true);
          navigate('/login')
        }
      })
      .catch(err => {
        console.log(err);
        setIsError(true);
      })
  }


  return (
    <div className="container">
      {isError && <div>ERROR</div>}
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <h2>Sign Up Form</h2>
          <button onClick={getData}>getData</button>
          <form className="signup">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="email-input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="password-input" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div style={{ display: "none" }} id="alert" className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span> <span className="msg"></span>
            </div>
            <button type="button" className="btn btn-default" onClick={signUp}>Sign Up</button>
          </form>
          <br />
          <p>Or log in <a href="/login">here</a></p>
        </div>
      </div>
    </div>
  )
}