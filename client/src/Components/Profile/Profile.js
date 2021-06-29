import { Container, Tab, Row, Col, ListGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Profile = () => {
    return (
        <Container>
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
  <Row>
    <Col sm={4}>
      <ListGroup>
        <ListGroup.Item action  onClick = {() => document.getElementById("dashboard1").click()}>
          <Link to = "/dashboard" exact  style = {{color:"black"}}><span id = "dashboard1">Dashboard</span></Link>
        </ListGroup.Item>
        <ListGroup.Item action className = "active"  onClick = {() => document.getElementById("profile1").click()}>
          <Link to = "/profile" exact  style = {{color:"black"}}><span id = "profile1">Profile</span></Link>
        </ListGroup.Item>
      </ListGroup>
    </Col>
    
  </Row>
</Tab.Container>

            Profile
        </Container>
    )
}

export default Profile;