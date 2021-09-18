import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminSignup from "./components/Auth/AdminSignup";
import StudentSignup from "./components/Auth/StudentSignup";
import AdminLogin from "./components/Auth/AdminLogin";
import StudentLogin from "./components/Auth/StudentLogin";
import NavBar from "./components/NavBar";
import AuthProvider from "./contexts/AuthContext";
import Home from "./components/Home";
import ScholarshipList from "./components/Scholarship/ScholarshipList";
import AddScholarship from "./components/Scholarship/AddScholarship";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/student-signup" component={StudentSignup} />
          <Route exact path="/signup" component={AdminSignup} />
          <Route exact path="/student-login" component={StudentLogin} />
          <Route exact path="/login" component={AdminLogin} />
          <Route exact path="/scholarship" component={ScholarshipList} />
          <Route exact path="/add-scholarship" component={AddScholarship} />
          <Route path="*">{<h1>404 Not found</h1>}</Route>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
