import React from "react";
import { Card } from "react-bootstrap";

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

export default function StudentApplicationCard({ application }) {
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
      </Card.Header>

      <Card.Body style={{ width: "98%" }}>
        {application.rejection !== null && <div>*{application.rejection}</div>}
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
    </Card>
  );
}
