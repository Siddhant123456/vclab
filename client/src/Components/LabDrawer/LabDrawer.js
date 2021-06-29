import { ListItem, ListItemIcon } from "@material-ui/core";
import { useState } from "react";
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

const intialState = {
  Aim: false,
  Instructions: false,
  Precautions: false,
  Notes: false,
  Quiz: false,
};

const LabDrawer = (props) => {
  
  
  
  const [show, setShow] = useState(intialState);

  

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
    },
    {
      name: "Quiz",
      icon: <Grade fontSize="large" />,
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
          <Modal.Body className ="new-line">{di.alertText}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShow((prevState) => {
                  return { ...prevState, [di.name]: false };
                });
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  });

  return (
    <>
      <div className="d-container">{drawItem}</div>
    </>
  );
}

export default LabDrawer;
