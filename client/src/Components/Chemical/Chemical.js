import { useState } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from 'react-bootstrap/CardDeck';
import "./chemicalStyle.css";

function Chemical(props) {

    const chemicals = [
        {
            label: 'Copper Sulphate',
            photo: 'Assets/copper_sulphate.jpg', 
            element: 'Cu',
            matter: 'solution'
        },
        {
            label: 'Zinc Sulphate',
            photo: 'Assets/zinc_sulphate.jpg',
            element: 'Zn',
            matter: 'solution'
        },
        {
            label: 'Iron Sulphate',
            photo: 'Assets/iron_sulphate.jpg',
            element: 'Fe',
            matter: 'solution'
        },
        {
            label: 'Aluminium Sulphate',
            photo: 'Assets/aluminium_sulphate.jpg',
            element: 'Al',
            matter: 'solution'
        },  
        {
            label: 'Copper Metal',
            photo: 'Assets/copper_nails.jpg',
            element: 'Cu',
            matter: 'metal'
        },
        {
            label: 'Zinc Metal',
            photo: 'Assets/zinc_strips.png',
            element: 'Zn',
            matter: 'metal'
        },
        {
            label: 'Iron Metal',
            photo: 'Assets/iron_nails.jpg',
            element: 'Fe',
            matter: 'metal'
        },
        {
            label: 'Aluminium Metal',
            photo: 'Assets/aluminium_nails.jpg',
            element: 'Al',
            matter: 'metal'
        }
    ];

    const [chemSelected, setChemSelected] = useState({
        solution: ' ',
        metal: ' '
    });

    const chem_item = chemicals.map((appr, index) => {
        return (
            <Card className="shelf-item">
                <Card.Img variant="top" src={appr.photo} className="app-img"/>
                <button className="label-button" onClick={
                    () => {
                       // if(chemSelected.solutionution===' ')
                            setChemSelected(
                                (prevState) => {
                                    return {...prevState, [appr.matter]: appr.element};
                                }
                            )
                        /*else
                            setChemSelected(
                                (prevState) => {
                                    return {...prevState, metal: appr.element};
                                }
                            ) */
                        let obj = {
                            solution: '',
                            metal: ''
                        };    
                        if(appr.matter==='metal')
                            obj.metal = appr.element;
                        else 
                            obj.solution = appr.element;                            
                        props.getChemicals(obj);
                    }
                }><p>{appr.label}</p></button>
            </Card>
        )
    });

    return (
        <CardDeck className="shelf-card">
            {chem_item}
        </CardDeck>
    );

}

export default Chemical;