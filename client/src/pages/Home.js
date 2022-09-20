import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import baseApi from "../api/baseApi";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Pagination from "/home/dev/Pictures/React-Rails-Test/React-Rails-Test/client/src/components/Pagination.js";

const Home = () => {
  const [jobs, setJobs] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  React.useEffect(() => {
    baseApi
      .get("/jobs", {
        params: {
          page: 1
        }
      })
      .then((res) => {
        setJobs(res.data.jobs);
      })
      .catch((err) => {
        setJobs([]);
        console.log(err);
      });
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = jobs.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(jobs.length / recordsPerPage)

  return (
    <div>
      <h1>All Jobs</h1>
      {jobs && (
        <>
          {jobs.map((job) => (
            <Card style={{ width: "22rem", margin: "auto" }}>
              <Card.Header as="h5">
                <span style={{ marginRight: "2rem", fontWeight: "bolder" }}>
                  Job status
                </span>
                {job.status}
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  <span style={{ marginRight: "2rem", fontWeight: "bolder" }}>
                    Title
                  </span>
                  {job.title}
                </Card.Title>
                <Card.Text>
                  <span style={{ marginRight: "2rem", fontWeight: "bolder" }}>
                    Description
                  </span>
                  {job.description}
                </Card.Text>
                <Card.Text>
                  <span style={{ marginRight: "2rem", fontWeight: "bolder" }}>
                    created at
                  </span>
                  {job.created_at}
                </Card.Text>
                <a href={`/jobs/` + job.slug}>view job</a>
                <Card.Text>
                  <span style={{ marginRight: "2rem", fontWeight: "bolder" }}>
                    update job status
                  </span>
                </Card.Text>
                <Card.Text>
                  <Button variant="success">open</Button>
                  <Button variant="danger">close</Button>
                  <Button variant="warning">draft</Button>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default Home;
