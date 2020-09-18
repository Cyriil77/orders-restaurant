import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Components/Header/Header'
import Landing from './Components/Landing/Landing'
import Footer from './Components/Footer/Footer'
import Welcome from './Components/Welcome/Welcome'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import ErrorPage from './Components/ErrorPage/ErrorPage'


export default function App() {
  return (
    <div>

      <Router>
        <Header />

        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route component={ErrorPage} />
        </Switch>




        <Footer />
      </Router>
    </div>
  )
}
