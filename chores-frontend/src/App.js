import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import './App.css';
import Login from "./components/login";
import Hello from "./components/hello";
import Signup from "./components/signup";
import { Home } from "./components/home";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path={'/'} component={Hello} />
        <Route path={'/login'} component={Login} />
        <Route path={'/signup'} component={Signup} />
        <Route path={'/home'} component={Home} />
      </Router>
    </div>
  );
}

export default App;
