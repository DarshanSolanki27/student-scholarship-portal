import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminSignup from "./components/AdminSignup";
import StudentSignup from "./components/StudentSignup";

import AuthProvider from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* <NavBar /> */}
        <Switch>
          <Route exact path="/signup" component={AdminSignup} />
          <Route exact path="/student-signup" component={StudentSignup} />
          <Route path="*">{<h1>404 Not found</h1>}</Route>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
