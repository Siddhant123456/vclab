import { Button } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";
import {
  Container,
  Tab,
  Row,
  Col,
  ListGroup,
  Card,
  CardColumns,
  Toast,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { joinClass } from "../../actions/joinClass";
import { createClass } from "../../actions/createclass";
import "./dashboard.css";
import { deleteNote } from "../../actions/notes";
const Dashboard = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const authData = JSON.parse(localStorage.getItem("profile"))?.result;
  if (authData === undefined) {
    props.history.push("/auth");
  }

  const classInfo = useSelector((state) => state.classes);
  console.log(classInfo);
  const [modal, showModal] = useState(false);

  let initialState = {};
  if (authData?.isStudent) {
    initialState.code = "";
    initialState.id = "";
  } else if (authData?.isTeacher) {
    initialState.name = "";
    initialState.desc = "";
    initialState.duration = "";
    initialState.standard = "";
    initialState.userInfo = "";
  }
  const [formData, setFormData] = useState(initialState);
  const allNotes = useSelector((state) => state.userNotes);

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
    if (formData.code === undefined) {
      formData.userInfo = JSON.parse(localStorage.getItem("profile"));
      dispatch(createClass(formData, history));
    } else {
      formData.id = JSON.parse(localStorage.getItem("profile")).result._id;
      dispatch(joinClass(formData, history));
    }
  };

  return (
    <Container>
      <br />
      <div className="tab-container">
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row>
            <Col sm={12}>
              <ListGroup>
                <ListGroup.Item
                  action
                  className="active"
                  onClick={() => document.getElementById("dashboard1").click()}
                >
                  <Link to="/dashboard" exact style={{ color: "black" }}>
                    <span id="dashboard1">Dashboard</span>
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  onClick={() => document.getElementById("profile1").click()}
                >
                  <Link to="/profile" exact style={{ color: "black" }}>
                    <span id="profile1">Profile</span>
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Tab.Container>
      </div>

      <div className="classInfo">
        <h2>Hello {authData?.name}</h2>
        
        <Button color="secondary" variant="contained" onClick={handleJoin}>
          {authData?.isStudent ? "Join Class" : "Create Class"}
        </Button>
      
        <br />
        <br />
        {classInfo.length !== 0 && 
        <h3>{authData?.isStudent ? "Enrolled Classes" : "Your Classes"} </h3>
        
        }
        <br />
        {classInfo.length === 0 && authData?.isStudent ? (
            <h4>You Are not Enrolled in Any Class</h4>
          ) : (
            ""
          )}
          {classInfo.length === 0 && authData?.isTeacher ? (
            <h4>You Have not Created Any Class</h4>
          ) : (
            ""
          )}
          
        <CardColumns>
         
          {classInfo.length > 0 &&
            classInfo.map((item) => (
              <Link to={`/myclass/${item._id}`} exact key={item._id}>
                <Card
                  style={{
                    width: "14rem",
                    height: "10rem",
                    textAlign: "center",
                  }}
                  bg="dark"
                  text="white"
                  className=""
                >
                  <Card.Body>
                    <Card.Title>{item.className}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {item.classCode}
                    </Card.Subtitle>
                    <Card.Text>{item.classDesc}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            ))}
            
        </CardColumns>
          <br />
          <br />
          {allNotes?.length > 0 &&
            <h3>My Notes</h3>
          
          }
          <br/>
          <Row>

            {allNotes?.length > 0 &&
              allNotes.map((item,index) => {
                return (
                  
                  <Toast className = "ml-4" style = {{marginBottom : '1rem'}} onClose = {() => {
                    const id = item._id;
                    dispatch(deleteNote(id));
                  }}>
          
                      <Toast.Header>
                      <strong className="mr-auto">Note{" "}{index + 1}</strong>
                        <small>{item.createdAt}</small>
                      </Toast.Header>
                      <Toast.Body>
                        {item.note}
                      </Toast.Body>
                    </Toast>
                  
                );
              })}
          
        </Row>
        <Modal
          show={modal}
          onHide={() => {
            showModal((prevState) => !prevState);
          }}
        >
          {authData?.isStudent ? (
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
