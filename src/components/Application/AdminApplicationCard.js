import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

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

export default function AdminApplicationCard({ application }) {
  const axios = require("axios");
  const [required, setRequired] = useState({});

  const handleApplicationStatus = (newStatus) => {
    axios
      .put(
        `/api/application/${application.id}/update`,
        {
          // admin: JSON.parse(localStorage.getItem("wsdc_user_data"))["id"],
          status: newStatus,
        },
        authOptions(localStorage.getItem("wsdc_at"))
      )
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(
        `/api/scholarship/${application.scholarship}`,
        authOptions(localStorage.getItem("wsdc_at"))
      )
      .then((response) => {
        setRequired(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [required]);

  return (
    <Card
      className="d-flex m-3 flex-fill"
      style={{
        border: "2px solid",
        minWidth: "20rem",
        width: "40%",
      }}
    >
      <Card.Header>
        <div className="d-flex">
          <div className="p-1 flex-fill">
            Applied on date: {application.applied}
          </div>
          {application.status === null ? (
            <div
              className="p-2"
              style={{ backgroundColor: "lightblue", borderRadius: "1rem" }}
            >
              Status Pending
            </div>
          ) : application.status === true ? (
            <div
              className="p-2"
              style={{ backgroundColor: "green", borderRadius: "1rem" }}
            >
              Status: Accepted
            </div>
          ) : (
            <div
              className="p-2"
              style={{ backgroundColor: "red", borderRadius: "1rem" }}
            >
              Status: Rejected
            </div>
          )}
        </div>
        {application.status === null && (
          <div>
            <Button
              variant="success"
              onClick={() => handleApplicationStatus(true)}
            >
              Accept
            </Button>
            <Button
              variant="danger"
              onClick={() => handleApplicationStatus(false)}
            >
              Reject
            </Button>
          </div>
        )}
      </Card.Header>

      <div className="d-flex">
        <Card.Body style={{ width: "98%" }}>
          <div>Caste: {CASTE[application.caste]}</div>
          <div>Program: {PROGRAM[application.program]}</div>
          {application.program === "M" && (
            <div>
              Specialization: {SPECIALIZATION[application.specialization]}
            </div>
          )}
          <div>Department: {DEPARTMENT[application.department]}</div>
          <div>Gender: {GENDER[application.gender]}</div>
          <div>CGPA: {application.cgpa}</div>
        </Card.Body>

        <Card.Body style={{ width: "98%" }}>
          <div>Caste: {CASTE[required.caste]}</div>
          <div>Program: {PROGRAM[required.program]}</div>
          {application.program === "M" && (
            <div>Specialization: {SPECIALIZATION[required.specialization]}</div>
          )}
          <div>Department: {DEPARTMENT[required.department]}</div>
          <div>Gender: {GENDER[required.gender]}</div>
          <div>CGPA: {required.cgpa}</div>
        </Card.Body>
      </div>
    </Card>
  );
}
