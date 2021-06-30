import { useSelector } from "react-redux"; 
import {Button } from "@material-ui/core";
import {Container} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {leaveClass} from '../../actions/joinClass';
import { useDispatch } from "react-redux";



const ClassDetail = (props) => {
    const id = props.match.params.id;
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useSelector((state) => state.classes);
    const user = JSON.parse(localStorage.getItem("profile")).result?._id;
    
    let individualClass = {};
    classes.forEach(element => {
        if(element._id === id){
            individualClass = element;
        }
    });
    
    return (
        <Container>
            <div style = {{display :'inline-block'}}>
            <h1  className = "my-5">{individualClass?.className} ({individualClass?.classCode})</h1>
            <p></p>
            <Button variant = "contained" color = "primary" onClick = {() => {
                const id = individualClass?._id;
                dispatch(leaveClass(id,history,user));


            }}>Leave</Button>
            </div>
        
        </Container>
    )
}


export default ClassDetail;