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
        apparatus: '',
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
        
        if(chem.solution!=='')
            setContents(
                (prevState) => {
                    return { ...prevState, solution: chem.solution};
                }
            );
        else        
            setContents(
                (prevState) => {
                    return { ...prevState, metal: chem.metal };
                }
            );
    };

    //Reaction Data
    var reaction = {
        isActive: 'false',
        reactivity_sol: 0,
        reactivity_met: 0,
        willDisplace: 'false'
    }

    //Canvas Initialization

    const canvasRef = useRef(null);
    const [context, setContext] = useState(null);

    var fill_color = "white";
    var metal_color = "white";
    function draw_test_tube (context, fill_color){
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
            context.strokeStyle = 'black';
            context.lineWidth = 1;
            context.stroke();
        }
    }
    function draw_metal (context, metal_color){
        if(context) {
            context.beginPath();
            context.moveTo(50,150);
            context.lineWidth = 10;
            context.strokeStyle = metal_color;
            context.lineTo(22, 90);
            context.stroke();
        }
    }

    useEffect(() => {
        
        if (canvasRef.current) {
        const renderCtx = canvasRef.current.getContext('2d');
            
        
        if (renderCtx) {
            setContext(renderCtx);
        }
    }

        if(contents.apparatus!=='')
        {
            
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
                    draw_test_tube(context, fill_color);
                    break;       
            }

            if(contents.solution!=='')
            {
                switch (contents.solution) {
                    case 'Cu': 
                        reaction.reactivity_sol = 4;
                        fill_color = "rgba(0,136,204,0.9)";
                        break;
                    case 'Fe': 
                        reaction.reactivity_sol = 3;
                        fill_color = "rgba(0,204,136,0.95)";
                        break; 
                    case 'Zn': 
                        reaction.reactivity_sol = 2;
                        fill_color = "rgba(248,240,227,0.95)";
                        break;  
                    case 'Al':
                        reaction.reactivity_sol = 1;
                        fill_color = "rgba(255,255,255,0.95)";
                        break;        
                }

                draw_test_tube(context, fill_color);
            }

            if(contents.metal!=='')
            {
                switch (contents.metal) {
                    case 'Cu': 
                        reaction.reactivity_met = 4;
                        metal_color = "rgba(135,54,0,0.95)";
                        break;
                    case 'Fe': 
                        reaction.reactivity_met = 3;
                        metal_color = "rgba(202,207,210,0.95)";
                        break; 
                    case 'Zn': 
                        reaction.reactivity_met = 2;
                        metal_color = "rgba(153,163,164,0.95)";
                        break;  
                    case 'Al':
                        reaction.reactivity_met = 1;
                        metal_color = "rgba(236,240,241,0.95)";
                        break;        
                }

                draw_metal(context, metal_color);
            }

            if(reaction.reactivity_met > 0 && reaction.reactivity_met<reaction.reactivity_sol) {
                setTimeout(
                    () => {
                        var new_sol = contents.metal;
                        var new_met = contents.solution;

                        switch (new_sol) {
                            case 'Cu': 
                                reaction.reactivity_sol = 4;
                                fill_color = "rgba(0,136,204,0.9)";
                                break;
                            case 'Fe': 
                                reaction.reactivity_sol = 3;
                                fill_color = "rgba(0,204,136,0.95)";
                                break; 
                            case 'Zn': 
                                reaction.reactivity_sol = 2;
                                fill_color = "rgba(248,240,227,0.95)";
                                break;  
                            case 'Al':
                                reaction.reactivity_sol = 1;
                                fill_color = "rgba(255,255,255,0.95)";
                                break;        
                        }
        
                        draw_test_tube(context, fill_color);

                        switch (new_met) {
                            case 'Cu': 
                                reaction.reactivity_met = 4;
                                metal_color = "rgba(135,54,0,0.95)";
                                break;
                            case 'Fe': 
                                reaction.reactivity_met = 3;
                                metal_color = "rgba(135,54,0,0.95)";
                                break; 
                            case 'Zn': 
                                reaction.reactivity_met = 2;
                                metal_color = "rgba(153,163,164,0.95)";
                                break;  
                            case 'Al':
                                reaction.reactivity_met = 1;
                                metal_color = "rgba(236,240,241,0.95)";
                                break;        
                        }
        
                        draw_metal(context, metal_color);

                        alert("Reacted");
                    },
                    5000
                );
            }

            else if(reaction.reactivity_sol>0 && reaction.reactivity_met>reaction.reactivity_sol)
                setTimeout(
                    () => {
                        alert("No Reaction");
                    },
                    5000
            );
            
        }

        

    }, [context, contents, reaction]);    

    console.log(reaction);

    return (
        <div>
            
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
                        <canvas ref={canvasRef} width={200} height={200}/>                        
                        <button onClick={
                            () => {
                                setShow(() => {
                                    return { exButton: true, table: false };
                                });
                                setContents(
                                    () => {
                                        return {
                                            apparatus: '',
                                            solution: '',
                                            metal: ''
                                        };
                                    }
                                )
                            }
                        }>Start New Experiment</button>
                    </div>
                }

            </div>
        </div>
    );
}

export default Room;