import Card from "react-bootstrap/Card";
import CardDeck from 'react-bootstrap/CardDeck';
import "./chemicalStyle.css";

function Chemical() {

    const chemicals = [
        {
            label: 'Copper Sulphate',
            photo: 'Assets/copper_sulphate.jpg'
        },
        {
            label: 'Zinc Sulphate',
            photo: 'Assets/zinc_sulphate.jpg'
        },
        {
            label: 'Iron Sulphate',
            photo: 'Assets/iron_sulphate.jpg'
        },
        {
            label: 'Aluminium Sulphate',
            photo: 'Assets/aluminium_sulphate.jpg'
        },  
        {
            label: 'Copper Metal',
            photo: 'Assets/copper_nails.jpg'
        },
        {
            label: 'Zinc Metal',
            photo: 'Assets/zinc_strips.png'
        },
        {
            label: 'Iron Metal',
            photo: 'Assets/iron_nails.jpg'
        },
        {
            label: 'Aluminium Metal',
            photo: 'Assets/aluminium_nails.jpg'
        }
    ];

    const chem_item = chemicals.map((appr) => {
        return (
            <Card className="shelf-item">
                <Card.Img variant="top" src={appr.photo} className="app-img"/>
                <button className="label-button"><p>{appr.label}</p></button>
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