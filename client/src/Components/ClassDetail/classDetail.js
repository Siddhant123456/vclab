import { useSelector } from "react-redux"; 



const ClassDetail = (props) => {
    const id = props.match.params.id;
    const classes = useSelector((state) => state.classes);
    let individualClass = {};
    classes.forEach(element => {
        if(element._id === id){
            individualClass = element;
        }
    });
    
    return (
        <div>
            <h1>This is Individual Class Page</h1>
            <h1>{individualClass?.className}</h1>

        </div>
    )
}


export default ClassDetail;