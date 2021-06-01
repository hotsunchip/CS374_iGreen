import './style.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { db, firebaseApp } from '../../firebase';
import {useHistory} from 'react-router-dom'
import setUser from '../../reducers/user'//action creator
import user from '../../reducers/user'

function Login(){

  const[email, setEmail] = useState();
  const[pwd, setPwd] = useState();
  const[success, setSuccess] = useState();
  const[error, setError] = useState("");
  let history = useHistory();
  const selector = useSelector((store)=>store.user.user)
  const dispatch = useDispatch();

  var changeEmail = (e) =>{
      setEmail(e.target.value)
  }
  var changePwd = (e) =>{
      setPwd(e.target.value)
  }
  var goRegister = () =>{
    history.replace('register')
  }

  const signinHandler = () => {
    console.log("email",email)
    console.log("pwd",pwd)
  firebaseApp.auth().signInWithEmailAndPassword(email, pwd)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log("user",user)
    //dispatch(setUser());
    history.replace('/main');
    // ...
  })
  .catch((error) => {
    console.log("error",error)
    var errorCode = error.code;
    var errorMessage = error.message;
  });

  }
  console.log("maillll",useSelector(state => state.user))
  console.log("email",email)


  return(
    <div className="recruit">
      <div className="apply_title">Login</div>
      <div  align="left" className="userid">email</div>
                <input  onChange={changeEmail} value={email} name="email" className="userid-input" type="text"/>
      <div  align="left" className="userid">pwd</div>
                <input  onChange={changePwd} value={pwd} name="pwd" className="userPassword-input" type="text"/>
      <button className = 'submit' onClick={signinHandler}>login</button>
      <button className = 'submit' onClick={goRegister}>register</button>
      
        
          {/* <Grid align="center"
                justify="center"
                direction="column"
                className="format"  
                alignItems="center" 
                justify="center">
            <Grid item xs={5} alignItems="center" justify="center">
              <div className="blank"></div>
              <Paper className="titlePaper" >
                <div className="apply_title">Login</div>
              </Paper>
              <div className="blank1"></div>
              <Paper >
              <div  align="left" className="userid">email</div>
                <input  onChange={changeHandler} value={email} name="userId" className="userid-input" type="text"/>
              </Paper>
              <Paper >
              <div  align="left" className="userid">pwd</div>
                <input  onChange={changeHandler} value={pwd} name="userPassword" className="userPassword-input" type="text"/>
              </Paper>
              
              <button className = 'submit' onClick={signinHandler}>login</button>
            </Grid>
            
          </Grid> */}
      </div>
  )
}

export default Login;