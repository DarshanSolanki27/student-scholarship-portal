import React, { useEffect, useState } from "react";
import { Alert, Jumbotron, Spinner } from "react-bootstrap";

import { authOptions } from "../../utils/requestOptions";
import ScholarshipCard from "./ScholarshipCard";

export default function ScholarshipList() {
  const axios = require("axios");
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/scholarship`, authOptions(localStorage.getItem("wsdc_at")))
      .then((response) => {
        setScholarships(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [scholarships]);

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  } else {
    if (scholarships.length === 0) {
      return (
        <Alert variant="danger" className="m-4 text-center">
          <Alert.Heading>No scholarship option right now.</Alert.Heading>
        </Alert>
      );
    } else {
      return (
        <Jumbotron className="d-flex m-1 justify-content-center">
          {scholarships.map((scholarship) => (
            <ScholarshipCard scholarship={scholarship} />
          ))}
        </Jumbotron>
      );
    }
  }
}
