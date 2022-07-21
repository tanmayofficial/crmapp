import React, { useState } from "react";
// import { Dropdown, DropDownButton } from "react-bootstrap";
import { userSignup, userSignin } from "../api/auth";
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

function Login() {
  const [showSignup, setShowSignup] = useState(false);
  const [userType, setUserType] = useState("CUSTOMER");
  const [userSignupData, setUserSignupData] = useState({});
  const [message, setMessage] = useState('');
  const [passwordType, setPasswordType] = useState("password");

  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  const handleSelect = (e) => {
    setUserType(e.target.value);
  }

  const updateSignupData = (e) => {
    userSignupData[e.target.id] = e.target.value;
    console.log(userSignupData);
  }
  const togglePassword =()=>{
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }

  const loginFn = (e) => {

    const userId = document.getElementById("userId").value;
    const password = document.getElementById("password").value;

    const data = {
      userId: userId,
      password: password
    }
    e.preventDefault();

    userSignin(data).then(function (response) {
      console.log(response);
      if (response.status === 200) {
        if (response.data.message) {
          setMessage(response.data.message);
        } else {
          localStorage.setItem('name', response.data.name);
          localStorage.setItem('userId', response.data.userId);
          localStorage.setItem('email', response.data.email);
          localStorage.setItem('userTypes', response.data.userTypes);
          localStorage.setItem('userStatus', response.data.userStatus);
          localStorage.setItem('token', response.data.accessToken);
          if (response.data.userTypes === "CUSTOMER") {
            history("/customer");
          } else if (response.data.userTypes === "ENGINEER") {
            history("/engineer");
          } else {
            history("/admin");
          }
        }
      }

    }).catch(function (error) {
      if (error.response.status === 400) {
        setMessage(error.response.data.message);
      }
      else {
        console.log(error);
      }
    })
  }
  // all the routes will be stored in the useNavigate hook. history is just a variable.
  let history = useNavigate();

  const signupFn = (e) => {

    const username = userSignupData.username;
    const userId = userSignupData.userId;
    const email = userSignupData.email;
    const password = userSignupData.password;

    //the userType data that'll be sending to api by
    const data = {
      name: username,
      userId: userId,
      email: email,
      password: password,
      userType: userType
    }
    console.log('data', data);

    e.preventDefault();

    userSignup(data).then(function (response) {
      if (response.status === 201) {
        window.location.href = '/';
      }
    }).catch(function (error) {
      if (error.response.status === 400) {
        setMessage(error.response.data.message);
      }
      else {
        console.log(error);
      }
    })


  }


  return (
    <div className="bg-dark text-white d-flex justify-content-center align-items-center vh-100">
      <div className="card bg-secondary p-5">
        <div className="row">
          <div className="col">
            {
              !showSignup ? (
                <div className="login">
                  <h4 className="text-center text-dark mb-4">Login Here</h4>
                  {/*
                      userid, password, login, button, toggle text
                    */}
                  <form onSubmit={loginFn}>
                    <div className="input-group m-2">
                      <input type="text" className="form-control" placeholder="User Id" id="userId" />
                    </div>
                    <div className="input-group m-2">
                      <input type={passwordType} className="form-control" placeholder="Password" id="password" />
                      <div className="input-group-btn">
                        <button className="btn btn-outline-dark" onClick={togglePassword}>
                          {passwordType === "password" ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                        </button>
                      </div>
                    </div>
                    <div className="input-group m-2">
                      <button className="form-control btn btn-dark">log in</button>
                    </div>
                    <div className="input-group text-dark text-center pe-auto m-2" onClick={toggleSignup}>
                      Don't have an account? &nbsp; <a className="link"> Signup here</a>
                    </div>
                    <div className="text-danger">{message}</div>
                  </form>
                </div>
              ) : (
                <div className="signup">
                  <h4 className="text-center text-dark mb-4">Signup Here</h4>
                  {/*
                      userid, username, email, password, usertype, signup, button, toggle text
                    */}
                  <form onSubmit={signupFn}>
                    <div className="input-group m-2">
                      <input type="text" className="form-control" placeholder="User Id" id="userId" onChange={updateSignupData} />
                    </div>
                    <div className="input-group m-2">
                      <input type="text" className="form-control" placeholder="User Name" id="username" onChange={updateSignupData} />
                    </div>
                    <div className="input-group m-2">
                      <input type="email" className="form-control" placeholder="Email Id" id="email" onChange={updateSignupData} />
                    </div>
                    <div className="input-group m-2">
                      <input type={passwordType} className="form-control" placeholder="Password" id="password" onChange={updateSignupData} />
                      <div className="input-group-btn">
                        <button className="btn btn-outline-dark" onClick={togglePassword}>
                          {passwordType === "password" ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                        </button>
                      </div>
                    </div>

                    <div className="input-group m-2">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={handleSelect}
                        value={userType}
                      >
                        <option defaultValue>User type</option>
                        <option value="CUSTOMER">Customer</option>
                        <option value="ENGINEER">Engineer</option>
                        {/* <option value="ADMIN">Admin</option> */}
                      </select>
                    </div>
                    <div className="input-group m-2">
                      <button className="form-control btn btn-dark">Signup</button>
                    </div>
                    <div className="input-group text-dark text-center m-2" onClick={toggleSignup}>
                      Don't have an account? &nbsp; <a className="link"> Login here </a>
                    </div>
                    <div className="text-danger">{message}</div>
                  </form>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
