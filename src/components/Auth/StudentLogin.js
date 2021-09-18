import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert, Button, Form, Jumbotron } from "react-bootstrap";

import { useAuth, useUpdateAuth } from "../../contexts/AuthContext";
import { authOptions, NO_TOKEN_OPTIONS } from "../../utils/requestOptions";

export default function StudentLogin() {
  const axios = require("axios");
  const history = useHistory();

  const [request, setRequest] = useState({
    username: "",
    password: "",
  });
  const [msg, setMsg] = useState({
    show: false,
    error: "",
  });

  const isAuth = useAuth();
  const setAuth = useUpdateAuth();
  if (isAuth) {
    history.push("/");
  }

  const handleInputChange = (event) => {
    const { id, value } = event.currentTarget;

    setRequest({
      ...request,
      [id]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("/api/token/obtain", JSON.stringify(request), NO_TOKEN_OPTIONS)
      .then((response) => {
        localStorage.setItem("wsdc_at", response.data.access);
        localStorage.setItem("wsdc_rt", response.data.refresh);

        return axios.get(
          `/api/student/${request.username}`,
          authOptions(localStorage.getItem("wsdc_at"))
        );
      })
      .then((response) => {
        localStorage.setItem("wsdc_user_data", JSON.stringify(response.data));
        setAuth(true);
        setMsg({ status: false, error: [] });
        history.push("/");
      })
      .catch((error) => {
        localStorage.removeItem("wsdc_at");
        localStorage.removeItem("wsdc_rt");
        console.log(error);
        setMsg({
          show: true,
          error: error.response !== undefined ? error.response.data : error,
        });
        setRequest({
          ...request,
          password: "",
        });
        history.push("/student-login");
      });
  };

  return (
    <Jumbotron className="d-flex pt-2 justify-content-center text-center">
      <Form onSubmit={handleSubmit}>
        <Form.Row
          className="p-4"
          style={{
            backgroundColor: "Purple",
            color: "white",
          }}
        >
          <h2>Login</h2>
        </Form.Row>
        <br />
        <Form.Group className="d-flex p-2">
          <Form.Label className="m-2">username:</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={request.username}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="d-flex p-2">
          <Form.Label className="m-2">Password:</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={request.password}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {msg.show === true && (
          <Alert variant="danger">{msg.error["detail"]}</Alert>
        )}

        <Button type="submit" className="m-2" variant="success">
          Login
        </Button>

        <Alert variant="primary">
          Don't have an account?
          <Button href="/student-signup" variant="link">
            Signup
          </Button>
        </Alert>
      </Form>
    </Jumbotron>
  );
}
