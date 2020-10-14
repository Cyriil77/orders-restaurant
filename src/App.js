import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SigninSignup from './Components/SigninSignup/SigninSignup';
import Welcome from './Components/Welcome/Welcome';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import Admin from './Components/Admin/Admin';
import Payment from './Components/Payment/Payment';
import summaryOrders from './Components/SummaryOrders/SummaryOrders';


export default function App() {
  return (
    <div>

      <Router>


        <Switch>
          <Route exact path="/" component={SigninSignup} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/admin" component={Admin}/>
          <Route path="/payment" component={Payment}/>
          <Route path="/summaryOrders" component={summaryOrders}/>

          <Route component={ErrorPage} />
        </Switch>

      </Router>

    </div>
  )
}
