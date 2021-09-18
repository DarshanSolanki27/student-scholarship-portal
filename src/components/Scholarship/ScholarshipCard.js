import React from "react";
import { Button, Card } from "react-bootstrap";

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

export default function ScholarshipCard({ scholarship }) {
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
        <h5>{scholarship.instructions}</h5>
        <div className="d-flex">
          <div className="p-1 flex-fill">
            Opening date: {scholarship.opening_date}
          </div>
          <div className="p-1 flex-fill">
            Closing date: {scholarship.closing_date}
          </div>
        </div>

        {JSON.parse(localStorage.getItem("wsdc_user_data"))["is_admin"] ===
          false && (
          <Button
            as="a"
            href={
              scholarship.url !== null
                ? scholarship.url
                : `/scholarship/${scholarship.id}`
            }
            variant="danger"
          >
            Apply
          </Button>
        )}
      </Card.Header>

      <Card.Body style={{ width: "98%" }}>
        <div>Caste: {CASTE[scholarship.caste]}</div>
        <div>Program: {PROGRAM[scholarship.program]}</div>
        {scholarship.program === "M" && (
          <div>
            Specialization: {SPECIALIZATION[scholarship.specialization]}
          </div>
        )}
        <div>Department: {DEPARTMENT[scholarship.department]}</div>
        <div>Gender: {GENDER[scholarship.gender]}</div>
        <div>CGPA: {scholarship.cgpa}</div>
      </Card.Body>
    </Card>
  );
}
