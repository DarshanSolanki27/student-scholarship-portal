import React, { useEffect, useState } from "react";
import { Alert, Jumbotron } from "react-bootstrap";

import { authOptions } from "../../utils/requestOptions";
import AdminApplicationCard from "./AdminApplicationCard";

export default function AdminApplication() {
  const axios = require("axios");
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/application`, authOptions(localStorage.getItem("wsdc_at")))
      .then((response) => {
        setApplications(response.data);
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
          <AdminApplicationCard application={application} />
        ))}
      </Jumbotron>
    );
  }
}
