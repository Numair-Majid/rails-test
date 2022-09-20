import React, { useState } from "react";
import { Container, Pagination } from "react-bootstrap";
import { useParams } from "react-router-dom";
import baseApi from "../api/baseApi";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Job = (props) => {
  const params = useParams();
  console.log(params.slug);
  const [job, setJob] = useState(null);

  const applyToJob = () => {
    const payload = {
      job_id: job.id,
    };
    baseApi
      .post("/job_applications", payload)
      .then((res) => console.log("job", res));
  };

  const deleteToJob = () => {
    const payload = {
      job_id: job.id,
    };
    baseApi
      .delete(`/job_applications/${job.id}`, payload);
  };

  React.useEffect(() => {
    baseApi
      .get("/jobs/" + params.slug)
      .then((res) => {
        setJob(res.data);
      })
      .catch((err) => {
        setJob([]);
        console.log(err);
      });
  }, []);

  return (
    <Container>
      {job && (
        <Card style={{ width: "22rem", margin: "auto" }}>
          <Card.Header as="h5">
            <span style={{ marginRight: "2rem", fontWeight: "bolder" }}>
              Job slug
            </span>
            {job.slug}
          </Card.Header>
          <Card.Body>
            <Card.Title>
              <span style={{ marginRight: "2rem", fontWeight: "bolder" }}>
                Job title
              </span>
              {job.title}
            </Card.Title>
            <Card.Text>
              <span style={{ marginRight: "2rem", fontWeight: "bolder" }}>
                created at
              </span>
              {job.created_at}
            </Card.Text>
            <Card.Text>
              <Button onClick={applyToJob}>Apply to Job</Button>
              <Button variant="danger" onClick={deleteToJob}>Delete</Button>

            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Job;
