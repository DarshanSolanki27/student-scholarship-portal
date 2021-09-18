import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert, Button, Form, Jumbotron } from "react-bootstrap";

import { useAuth } from "../../contexts/AuthContext";
import { NO_TOKEN_OPTIONS } from "../../utils/requestOptions";

export default function AdminSignup() {
  const axios = require("axios");
  const history = useHistory();
  const isAuth = useAuth();

  if (isAuth) {
    history.push("/");
  }

  const [request, setRequest] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState({
    show: false,
    error: [],
  });

  function handleInputChange(event) {
    const { id, value } = event.currentTarget;

    setRequest({
      ...request,
      [id]: value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("/api/signup", JSON.stringify(request), NO_TOKEN_OPTIONS)
      .then((response) => {
        setMsg({ status: false, error: [] });
        history.push("/login");
      })
      .catch((error) => {
        setRequest({
          ...request,
          password: "",
        });

        console.log(error);
        if (error.response.status !== null && error.response.status === 400)
          setMsg({
            show: true,
            error:
              error.response.data["email"] !== undefined
                ? ["email taken."]
                : error.response.data["password"],
          });
      });
  };

  return (
    <Jumbotron className="d-flex p-2 justify-content-center text-center">
      <Form onSubmit={handleSubmit}>
        <Form.Row
          className="p-4"
          style={{
            backgroundColor: "green",
          }}
        >
          <h2>Signup</h2>
        </Form.Row>
        <Form.Group className="d-flex p-2">
          <Form.Label className="m-2">Email:</Form.Label>
          <Form.Control
            id="email"
            type="text"
            value={request.email}
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
          <Alert>
            {msg.error.map((error) => (
              <div>{error}</div>
            ))}
          </Alert>
        )}

        <Button type="submit" className="m-2">
          Signup
        </Button>

        <Alert>
          Already have an account?
          <Button href="/login" variant="link">
            Login
          </Button>
        </Alert>
      </Form>
    </Jumbotron>
  );
}
