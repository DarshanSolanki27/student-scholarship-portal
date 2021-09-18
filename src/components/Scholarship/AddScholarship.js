import React, { useState } from "react";
import { Button, Form, Jumbotron } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { authOptions } from "../../utils/requestOptions";

const CASTE = {
  SCT: "SC/ST",
  OBC: "OBC",
  GEN: "General",
};
const GENDER = { M: "Male", F: "Female", O: "Other" };
const PROGRAM = { B: "BTech", M: "MTech", P: "PhD" };
const DEPARTMENT = {
  BIO: "BioTech",
  CHE: "Chemical",
  CIV: "Civil",
  CSE: "CSE",
  ECE: "ECE",
  EEE: "EEE",
  MEC: "Mechanical",
};

const SPECIALIZATION = {
  MET: "Metallurgical",
  POW: "Power",
  COM: "Communications",
  ENV: "Environmental",
};

export default function AddScholarship() {
  const axios = require("axios");
  const history = useHistory();

  const [request, setRequest] = useState({
    instructions: "",
    caste: "SCT",
    program: "B",
    department: "BIO",
    specialization: "MET",
    gender: "M",
    cgpa: 0,
    url: "",
  });

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
      .post(
        "/api/scholarship",
        JSON.stringify(request),
        authOptions(localStorage.getItem("wsdc_at"))
      )
      .then(() => {
        alert("Added Scholarship successfully.");
        history.push(`/scholarship`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Jumbotron className="d-flex p-2 text-center" style={{ width: "95%" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="d-flex p-2">
          <Form.Label className="m-2">Instructions:</Form.Label>
          <Form.Control
            id="instructions"
            type="textarea"
            value={request.instructions}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="d-flex p-2">
          <Form.Label className="m-2">CGPA:</Form.Label>
          <Form.Control
            id="cgpa"
            type="number"
            value={request.cgpa}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="d-flex p-2">
          <Form.Label className="m-2">Caste:</Form.Label>
          <Form.Control
            as="select"
            id="caste"
            value={request.caste}
            onChange={handleInputChange}
          >
            {Object.entries(CASTE).map(([key, value]) => {
              return <option value={key}>{value}</option>;
            })}
          </Form.Control>
        </Form.Group>

        <Form.Group className="d-flex p-2">
          <Form.Label className="m-2">Program:</Form.Label>
          <Form.Control
            as="select"
            id="program"
            value={request.program}
            onChange={handleInputChange}
          >
            {Object.entries(PROGRAM).map(([key, value]) => {
              return <option value={key}>{value}</option>;
            })}
          </Form.Control>
        </Form.Group>

        <Form.Group className="d-flex p-2">
          <Form.Label className="m-2">Department:</Form.Label>
          <Form.Control
            as="select"
            id="department"
            value={request.department}
            onChange={handleInputChange}
          >
            {Object.entries(DEPARTMENT).map(([key, value]) => {
              return <option value={key}>{value}</option>;
            })}
          </Form.Control>
        </Form.Group>

        <Form.Group className="d-flex p-2">
          <Form.Label className="m-2">Specialization:</Form.Label>
          <Form.Control
            as="select"
            id="specialization"
            value={request.specialization}
            onChange={handleInputChange}
          >
            {Object.entries(SPECIALIZATION).map(([key, value]) => {
              return <option value={key}>{value}</option>;
            })}
          </Form.Control>
        </Form.Group>

        <Form.Group className="d-flex p-2">
          <Form.Label className="m-2">Gender:</Form.Label>
          <Form.Control
            as="select"
            id="gender"
            value={request.gender}
            onChange={handleInputChange}
          >
            {Object.entries(GENDER).map(([key, value]) => {
              return <option value={key}>{value}</option>;
            })}
          </Form.Control>
        </Form.Group>

        <Button type="submit" className="m-2" variant="outline-success">
          Add Scholarship
        </Button>
      </Form>
    </Jumbotron>
  );
}
