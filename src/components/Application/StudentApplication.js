import React, { useEffect, useState } from "react";
import { Alert, Jumbotron } from "react-bootstrap";

import { authOptions } from "../../utils/requestOptions";
import StudentApplicationCard from "./StudentApplicationCard";

export default function StudentApplication() {
  const axios = require("axios");
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios
      .get(
        `/api/application/${
          JSON.parse(localStorage.getItem("wsdc_user_data"))["id"]
        }`,
        authOptions(localStorage.getItem("wsdc_at"))
      )
      .then((response) => {
        setApplications(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [applications]);

  if (applications.length === 0) {
    return (
      <Alert variant="danger" className="m-4 text-center">
        <Alert.Heading>No applications.</Alert.Heading>
      </Alert>
    );
  } else {
    return (
      <Jumbotron className="d-flex m-1 justify-content-center">
        {applications.map((application) => (
          <StudentApplicationCard application={application} />
        ))}
      </Jumbotron>
    );
  }
}
