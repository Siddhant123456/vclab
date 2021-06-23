import Card from "react-bootstrap/Card";
import CardDeck from 'react-bootstrap/CardDeck';
import "./shelfStyle.css";

function Shelf() {

    const apparatus = [
        {
            label: 'Beaker',
            photo: 'Assets/beaker.png'
        },
        {
            label: 'Conical Flask',
            photo: 'Assets/con-flask.png'
        },
        {
            label: 'Test Tube',
            photo: 'Assets/test-tube.png'
        },
        {
            label: 'Cylinder',
            photo: 'Assets/cylinder.jpg'
        },  
        {
            label: 'Pipette',
            photo: 'Assets/pipette.jpg'
        },
        {
            label: 'Volumetric Flask',
            photo: 'Assets/vol-flask.jpg'
        },
        {
            label: 'Buret',
            photo: 'Assets/buret.jpg'
        }
    ];

    const shelf_item_a = apparatus.map((appr) => {
        return (
            <Card className="shelf-item">
                <Card.Img variant="top" src={appr.photo} className="app-img"/>
                <button className="label-button"><p>{appr.label}</p></button>
            </Card>
        )
    });

    return (
        <CardDeck className="shelf-card">
            {shelf_item_a}
        </CardDeck>
    );

}

export default Shelf;