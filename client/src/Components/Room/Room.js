import { useState, useRef, useEffect } from 'react';
import LabDrawer from '../LabDrawer/LabDrawer';
import Shelf from '../Shelf/Shelf';
import Chemical from '../Chemical/Chemical';
import './room.css';


const initialState = {
    exButton: true,
    table: false
};

function Room(props) {
    const authData = JSON.parse(localStorage.getItem("profile"))?.result;
    if (authData === undefined) {
        props.history.push('/auth');
    }

    const [show, setShow] = useState(initialState);

    const [contents, setContents] = useState({
        apparatus: 'Test Tube',
        solution: '',
        metal: ''
    });

    const getApparatusHandler = (appr) => {
        setContents(
            (prevState) => {
                return { ...prevState, apparatus: appr };
            }
        );
    };

    const getChemicalsHandler = (chem) => {
        setContents(
            (prevState) => {
                return { ...prevState, solution: chem.solution, metal: chem.metal };
            }
        );
    };

    //Canvas Initialization

    const canvasRef = useRef(null);
    const [context, setContext] = useState(null);

    useEffect(() => {
        if (canvasRef.current) {
        const renderCtx = canvasRef.current.getContext('2d');
    
        if (renderCtx) {
            setContext(renderCtx);
        }
    }

        if(contents.apparatus!=='')
        {
            var fill_color = "white";
            switch (contents.apparatus) {
                case 'Beaker': 
                    console.log("Not functional");
                    break;
                case 'Conical Flask': 
                    console.log("Not functional");
                    break;
                case 'Cylinder': 
                    console.log("Not functional");
                    break;
                case 'Pipette': 
                    console.log("Not functional");
                    break;                        
                case 'Volumetric Flask': 
                    console.log("Not functional");
                    break; 
                case 'Buret': 
                    console.log("Not functional");
                    break; 
                case 'Test Tube': 
                    if (context) {
                        context.beginPath();
                        context.arc(50, 120, 30, 0, Math.PI, false);
                        context.fillStyle = fill_color;
                        context.fillRect(20, 60, 60, 60);
                        context.fill();
                        context.moveTo(80, 120)
                        context.lineTo(80, 20);
                        context.lineTo(90, 10);
                        context.moveTo(20, 120);
                        context.lineTo(20, 20);
                        context.lineTo(10, 10);

                        context.stroke();
                    }
                    break;   
            }
        }
    }, [context]);    

    return (
        <div>
            {console.log(contents)}
            <div className="room-space">
                <div className="room-corner">
                    <LabDrawer />
                </div>
                <div className="room-center">
                    <Shelf getApparatus={getApparatusHandler} />
                </div>
                <div className="room-center">
                    <Chemical getChemicals={getChemicalsHandler} />
                </div>
            </div>
            <div className="table-top">

                {show.exButton
                    &&
                    <button
                        onClick={() => {
                            setShow(() => {
                                return { exButton: false, table: true };
                            })
                        }}
                    >Perform Experiment</button>}
            </div>
            <div className="table-top">
                {show.table
                    &&
                    <div>
                        <canvas id="canvas" width={200} height={200}/>
                        
                        
                        <button onClick={
                            () => {
                                setShow(() => {
                                    return { exButton: true, table: false };
                                })
                            }
                        }>Start New Experiment</button>
                    </div>
                }

            </div>
        </div>
    );
}

export default Room;