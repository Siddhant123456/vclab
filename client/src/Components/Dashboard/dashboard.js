import { Button } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";
import { Table, Container, Tab, Row, Col, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { joinClass } from "../../actions/joinClass";
import {createClass} from '../../actions/createclass';

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const authData = useSelector((state) => state.authData);
  const classInfo = useSelector((state) => state.classes);
  console.log(classInfo);
  const [modal, showModal] = useState(false);

  let initialState = {};

  if (authData.length > 0 && authData.isStudent) {
    initialState.code = "";
  } else if (authData.length > 0 && authData.isTeacher) {
    initialState.name = "";
    initialState.desc = "";
    initialState.duration = "";
    initialState.standard = "";
    initialState.userInfo = ""
  }
  const [formData, setFormData] = useState(initialState);

  const handleJoin = () => {
    showModal((prevState) => !prevState);
  };
  const handleForm = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if(formData.code === undefined){
      
      formData.userInfo = JSON.parse(localStorage.getItem("profile"));
      dispatch(createClass(formData,history));
    }
    else{
      
      dispatch(joinClass(formData, history));
    }
    
  };

  return (
    <Container>
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row>
          <Col sm={4}>
            <ListGroup>
              <Link to="/dashboard" exact>
                <ListGroup.Item>Dashboard</ListGroup.Item>
              </Link>
              <Link to="/profile" exact>
                <ListGroup.Item>Profile</ListGroup.Item>
              </Link>
            </ListGroup>
          </Col>
        </Row>
      </Tab.Container>

      <div className="classInfo">
        <h3>
          {authData.length > 0 && authData.isStudent ? "Student" : "Teacher"}{" "}
          Class Information
        </h3>
        <Button color="secondary" variant="contained" onClick={handleJoin}>
          {authData.length > 0 && authData.isStudent
            ? "Join Class"
            : "Create Class"}
        </Button>
        <br />
        <br />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Class Code</th>
              <th>Class Name</th>
              <th>Class Teacher</th>
              <th>Number of Students</th>
            </tr>
          </thead>
          <tbody>
            {classInfo.length > 0 &&
              classInfo.map((classData) => (
                <tr>
                  <td>{classData.classCode}</td>
                  <td>{classData.className}</td>
                  <td>{classData.teacher}</td>
                  <td>0</td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Modal
          show={modal}
          onHide={() => {
            showModal((prevState) => !prevState);
          }}
        >
          {authData.length > 0 && authData.isStudent ? (
            <>
              <Modal.Header>
                <Modal.Title>Enter Class Code</Modal.Title>
              </Modal.Header>
              <form method="POST" onSubmit={submitHandler}>
                <Modal.Body className="new-line">
                  <label>Enter Code:</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter class Code here"
                    style={{ width: "100%" }}
                    required
                    onChange={handleForm}
                    name="code"
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    style={{ marginRight: "20px" }}
                    onClick={() => {}}
                  >
                    Submit
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => {
                      showModal((prevState) => !prevState);
                    }}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </form>
            </>
          ) : (
            <>
              <Modal.Header>
                <Modal.Title>Enter Class Information</Modal.Title>
              </Modal.Header>
              <form method="POST" onSubmit={submitHandler}>
                <Modal.Body className="new-line">
                  <label>Class Name</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter class name here"
                    style={{ width: "100%" }}
                    required
                    onChange={handleForm}
                    name="name"
                  />
                  <br />
                  <label>Class Description</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter class desc here"
                    style={{ width: "100%" }}
                    required
                    onChange={handleForm}
                    name="desc"
                  />
                  <br />
                  <label>Class Duration</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter class Duration here"
                    style={{ width: "100%" }}
                    required
                    onChange={handleForm}
                    name="duration"
                  />
                  <br />
                  <label>Class Name</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter class standard here"
                    style={{ width: "100%" }}
                    required
                    onChange={handleForm}
                    name="standard"
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    style={{ marginRight: "20px" }}
                    onClick={() => {}}
                  >
                    Submit
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => {
                      showModal((prevState) => !prevState);
                    }}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </form>
            </>
          )}
        </Modal>
      </div>
    </Container>
  );
};

export default Dashboard;
