import React, { useState, useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import baseApi from "../api/baseApi";
import { AuthContext } from "../providers/AuthProvider";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Pagination from "/home/dev/Pictures/React-Rails-Test/React-Rails-Test/client/src/components/Pagination.js";

const Applications = () => {
  const { authenticated } = useContext(AuthContext);
  const [jobApplications, setJobApplication] = useState(null);
  const [showPerPage, setShowPerPage] = useState(4);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  useEffect(() => {
    baseApi
      .get("/job_applications")
      .then((res) => {
        setJobApplication(res.data.job_applications);
      })
      .catch((err) => {
        setJobApplication([]);
        console.log(err);
      });
  }, []);

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  const renderPage = () => {
    if (authenticated) {
      return (
        <div>
          <h1>My Applications</h1>
          {jobApplications && (
            <>
              {jobApplications
                .slice(pagination.start, pagination.end)
                .map((jobApplication) => (
                  <Card style={{ width: "22rem", margin: "auto" }}>
                    <Card.Header as="h5">
                      <span
                        style={{ marginRight: "2rem", fontWeight: "bolder" }}
                      >
                        Job status
                      </span>
                      {jobApplication.status}
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>
                        <span
                          style={{ marginRight: "2rem", fontWeight: "bolder" }}
                        >
                          Title
                        </span>
                        {jobApplication?.job.title}
                      </Card.Title>
                      <Card.Text>
                        <span
                          style={{ marginRight: "2rem", fontWeight: "bolder" }}
                        >
                          Status
                        </span>
                        {jobApplication?.job.status}
                      </Card.Text>
                      
                    </Card.Body>
                  </Card>
                ))}
              <Pagination
                showPerPage={showPerPage}
                onPaginationChange={onPaginationChange}
                total={jobApplications.length}
              />
            </>
          )}
        </div>
      );
    } else {
      return <p>You must be logged in</p>;
    }
  };
  return <Container>{renderPage()}</Container>;
};

export default Applications;
