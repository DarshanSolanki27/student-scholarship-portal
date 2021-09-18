import React from "react";
import { Alert, Jumbotron } from "react-bootstrap";

export default function Home() {
  return (
    <Jumbotron>
      <Alert variant="info" className="m-4 text-center">
        <Alert.Heading>
          Finding the perfect scholarship options made easier.
        </Alert.Heading>
        Welcome to WSDC Student Scholarship Portal!
      </Alert>
      <Alert variant="warning" className="m-5 text-center">
        - Go Scholarships tab to get a scholarship right now!
      </Alert>
      <Alert variant="secondary" className="m-5 text-center">
        - You can review your scholarship applications in the Applications tab.
      </Alert>
    </Jumbotron>
  );
}
