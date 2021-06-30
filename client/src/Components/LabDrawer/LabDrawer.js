import { ListItem, ListItemIcon } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Help,
  TouchApp,
  BorderColor,
  AssignmentLate,
  Grade,
} from "@material-ui/icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./labdrawer.css";
import { notes } from "../../actions/notes";

const intialState = {
  Aim: false,
  Instructions: false,
  Precautions: false,
  Notes: false,
  Quiz: false,
};

const LabDrawer = (props) => {
  const noteState = {
    note: "",
    id : JSON.parse(localStorage.getItem("profile"))?.result?._id
  }
  const [show, setShow] = useState(intialState);
  const [formData,setFormData] = useState(noteState)
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    
    
    dispatch(notes(formData));
   
  }

  const changeHandler = (e) => {
    setFormData((prevState) => {
      return {...prevState , [e.target.name] : e.target.value};
    })
  }
  const drawIcon = [
    {
      name: "Aim",
      icon: <TouchApp fontSize="large" />,
      alertText: `To observe the action of Zn, Fe, Cu and Al metals on the following salt solutions: ZnSO4, FeSO4, CuSO4, Al2(SO4)3`,
    },
    {
      name: "Instructions",
      icon: <Help fontSize="large" />,
      alertText: `1. Take four clean test tubes. 
        2. With a marker label them as A, B, C and D. 
       3. Take copper sulphate solution in each test tube. 
       4. Dip a small, clean piece of aluminium, zinc, iron and copper metals in test tubes A, B, C and D respectively.
       5. Record your observations.`,
    },
    {
      name: "Precautions",
      icon: <AssignmentLate fontSize="large" />,
      alertText:
        "1. Clean the metals by rubbing them with a piece of sand paper before dipping them in the salt solutions. \n2. Wash the test tubes after every set of observations of interaction of a particular metal with the four salt solution. \n3. Use very little amount of saturated solution of copper sulphate, aluminium sulphate, iron sulphate and zinc sulphate. \n4. Use very small pieces of metal every time. \n5. Do not touch any chemical.",
    },
    {
      name: "Notes",
      icon: <BorderColor fontSize="large" />,
      alertText: `Create A New Note`,
    },
    {
      name: "Quiz",
      icon: <Grade fontSize="large" />,
      alertText :"Coming Soon",
    },
  ];

  const drawItem = drawIcon.map((di, index) => {
    return (
      <>
        <ListItem
          button
          key={di.name}
          onClick={() => {
            setShow((prevState) => {
              return { ...prevState, [di.name]: true };
            });
          }}
          className="tool-op"
        >
          {di.icon && <ListItemIcon>{di.icon}</ListItemIcon>}
        </ListItem>
        <Modal
          show={show[di.name]}
          onHide={() => {
            setShow((prevState) => {
              return { ...prevState, [di.name]: false };
            });
          }}
        >
          <Modal.Header>
            <Modal.Title>{di.name}</Modal.Title>
          </Modal.Header>
          <form onSubmit = {submitHandler}>
            <Modal.Body className="new-line">
              <b>{di.alertText}</b>
              <br/>
              <br/>
              {di.name === "Notes" && (
                <textarea
                  rows={3}
                  name = "note"
                  style={{ width: "100%" }}
                  placeholder="Start Typing..."
                  onChange = {changeHandler}
                ></textarea>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button color="primary" type="submit" onClick = {() => {
                     setShow((prevState) => {
                      return {...prevState , [di.name]: false};
                    })
                }}>
                Submit
                
              </Button>

              <Button
                variant="secondary"
                id = "close"
                onClick={() => {
                  setShow((prevState) => {
                    return { ...prevState, [di.name]: false };
                  });
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </>
    );
  });

  return (
    <>
      <div className="d-container">{drawItem}</div>
    </>
  );
};

export default LabDrawer;
