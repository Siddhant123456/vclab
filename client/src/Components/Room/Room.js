import LabDrawer from '../LabDrawer/LabDrawer';
import Shelf from '../Shelf/Shelf';
import Chemical from '../Chemical/Chemical';
import './room.css';

function Room() 
{
    return (
        <div>
            
            <div className="room-space">
                <div className="room-corner">
                    <LabDrawer/>
                </div>
                <div className="room-center">                    
                    <Shelf/>
                </div>    
                <div className="room-center">                    
                    <Chemical/>
                </div>
            </div>
            <div className="table-top">
                <button >Perform Experiment</button>
            </div>                
        </div>    
    );
}

export default Room;