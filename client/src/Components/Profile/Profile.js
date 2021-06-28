import { Container, Tab, Row, Col, ListGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Profile = () => {
    return (
        <Container>
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
  <Row>
    <Col sm={4}>
      <ListGroup>
        <ListGroup.Item action>
          <Link to = "/dashboard" exact>Dashboard</Link>
        </ListGroup.Item>
        <ListGroup.Item action>
          <Link to = "/profile" exact>Profile</Link>
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