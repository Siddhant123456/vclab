import {
  Container,
  Tab,
  Row,
  Col,
  ListGroup,
  Form,
  Button,
} from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Avatar, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import "./profile.css";
import { updateProfile } from "../../actions/profile";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    float: "left",

    "& > *": {
      margin: theme.spacing(0),
      width: theme.spacing(60),
      height: theme.spacing(70),
    },
  },
  root2: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
const Profile = (props) => {

  
  const authData1 = JSON.parse(localStorage.getItem("profile"))?.result;
  if (authData1 === undefined) {
    props.history.push("/auth");
  }
  const dispatch = useDispatch();
  const classes = useStyles();
  const authData = useSelector((state) => state.authData);
  const profile = useSelector((state) => state.userProfile);
  let initialState = {};
  initialState.id = "";
  initialState.name = authData.authData?.result?.name;
  initialState.email = authData.authData?.result?.email;
  initialState.age = profile.userProfile?.age;
  initialState.schoolName = profile.userProfile?.schoolName;
  initialState.phoneNumber = profile.userProfile?.phoneNumber;
  
  if (authData.authData?.result?.isStudent) {
    initialState.standard = profile.userProfile?.standard;
  } else if (authData.authData?.result?.isTeacher) {
    initialState.description = profile.userProfile?.description;
    initialState.qualifications = profile.userProfile?.qualifications;
  }
  const [formData, setFormData] = useState(initialState);
  
  
  const handleChange = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    formData.id = authData.authData?.result?._id;
    dispatch(updateProfile(formData));
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
                  onClick={() => document.getElementById("dashboard1").click()}
                >
                  <Link to="/dashboard" exact style={{ color: "black" }}>
                    <span id="dashboard1">Dashboard</span>
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  className="active"
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

      <div className="avatar mt-5">
        <Avatar style={{ height: "8rem", width: "8rem" }}>
          {authData.authData?.result?.name[0]}
        </Avatar>
        <br />
        <h4>{authData.authData?.result?.name}</h4>
        
      </div>
      <br />
      <div className={`mt-4 ${classes.root}`}>
        <Paper variant="outlined" elevation={0}>
          <h3 style={{ textAlign: "center", paddingTop: "10px" }}>
            My Profile
          </h3>
          <hr />

          <Form onSubmit={handleSubmit}>
            <Row className="mt-4 mb-4 ml-2 mr-1">
              <Col>
                <b>Name</b>{" "}
                <Form.Control
                  placeholder="First name"
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                  required
                />
              </Col>
            </Row>
            <Row className="mt-4 mb-4 ml-2 mr-1">
              <Col>
                <b>Email</b>{" "}
                <Form.Control
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  required
                />
              </Col>
            </Row>

            <Row className="mt-4 mb-4 ml-2 mr-1">
              <Col>
                <b>Age</b>
                <Form.Control
                  placeholder="Your Age"
                  onChange={handleChange}
                  name="age"
                  value={formData.age}
                />
              </Col>
              {authData.authData?.result?.isStudent ? (
                <Col>
                  <b>Standard</b>
                  <Form.Control
                    placeholder="Your Standard"
                    onChange={handleChange}
                    name="standard"
                    value={formData.standard}
                  />
                </Col>
              ) : (
                <Col>
                  <b>Qualifications</b>
                  <Form.Control
                    placeholder="Your Qualifications"
                    onChange={handleChange}
                    name="qualifications"
                    value={formData.qualifications}
                  />
                </Col>
              )}
            </Row>
            {authData.authData?.result?.isTeacher && (
              <Row className="mt-4 mb-4 ml-2 mr-1">
                <Col>
                  <b>Bio</b>
                  <Form.Control
                    placeholder="Your Bio"
                    onChange={handleChange}
                    name="description"
                    value={formData.description}
                  />
                </Col>
              </Row>
            )}
            <Row className="mt-4 mb-4 ml-2 mr-1">
              <Col>
                <b>SchoolName</b>
                <Form.Control
                  placeholder="Your School"
                  onChange={handleChange}
                  name="schoolName"
                  value={formData.schoolName}
                />
              </Col>
              <Col>
                <b>Phone Number</b>
                <Form.Control
                  placeholder="Your Phone Number"
                  onChange={handleChange}
                  name="phoneNumber"
                  value={formData.phoneNumber}
                />
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="ml-4 mt-4">
              Update
            </Button>
          </Form>
        </Paper>
      </div>
    </Container>
  );
};

export default Profile;
