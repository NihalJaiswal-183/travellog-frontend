import React,{ createContext, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Box } from '@material-ui/core';
import Signup from './Signup';
import Login from './Login';
import {auth} from './firebase';
import Home from './Home.js';
export const LoginContext = createContext(null);



function App() {
  const [ account, setAccount ] = useState('');
  useEffect(() => {
    console.log(account);
    auth.onAuthStateChanged(user=>{
      if(user)
      setAccount(user);
      else
      setAccount(null);
    })
   
}, [])
  return (
  
    <div >
    <LoginContext.Provider value={{ account}}>
       <BrowserRouter>
     
        <Box>
          <Switch>
          {  
            
            account?
            <>
            <Route exact path='/Signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/' component={Home} />

            </>:<>
            <Route exact path='/Signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            </>
          }
 
          </Switch>
        </Box> 
       </BrowserRouter>
       </LoginContext.Provider>
       </div>
  
  );
}

export default App;