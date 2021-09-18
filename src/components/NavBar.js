import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Nav, Navbar } from "react-bootstrap";

import { useAuth, useUpdateAuth } from "../contexts/AuthContext";

export default function NavBar() {
  const history = useHistory();
  const isAuth = useAuth();
  const setAuth = useUpdateAuth();

  const logout = () => {
    const localStorageData = ["wsdc_at", "wsdc_rt", "wsdc_user_data"];

    localStorageData.map((data) => localStorage.removeItem(data));
    setAuth(false);
    history.push("/");
  };

  return (
    <Navbar variant="danger" style={{ backgroundColor: "purple", width: "100rem" }}>
      <Nav className="d-flex justify-content-center p-3">
        <Nav.Item style={{ color: "white" }}>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>

        {!isAuth && (
          <Nav.Item style={{ color: "white" }}>
            <Nav.Link href="/student-signup">Signup</Nav.Link>
          </Nav.Item>
        )}
        {!isAuth && (
          <Nav.Item style={{ color: "white" }}>
            <Nav.Link href="/student-login">Login</Nav.Link>
          </Nav.Item>
        )}

        {isAuth && (
          <Nav.Item>
            <Nav.Link href={"/scholarship"}>Scholarships</Nav.Link>
          </Nav.Item>
        )}
        {isAuth && (
          <Nav.Item>
            <Nav.Link href={"/application"}>Applications</Nav.Link>
          </Nav.Item>
        )}
        {isAuth &&
          JSON.parse(localStorage.getItem("wsdc_user_data"))["is_admin"] ===
            true && (
            <Nav.Item>
              <Nav.Link href={"/add-scholarship"}>Add Scholarship</Nav.Link>
            </Nav.Item>
          )}
      </Nav>

      <Navbar.Brand className="p-2 m-3">
        <h2>Scholarship Portal</h2>
      </Navbar.Brand>

      {isAuth && (
        <Nav className="d-flex justify-content-end">
          <Navbar.Brand className="m-2" style={{ color: "orange" }}>
            Welcome{" "}
            {JSON.parse(localStorage.getItem("wsdc_user_data"))["username"]}!
          </Navbar.Brand>

          <Button onClick={logout} variant="warning" className="m-2">
            Logout
          </Button>
        </Nav>
      )}
    </Navbar>
  );
}
