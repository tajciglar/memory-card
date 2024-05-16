import { useState, useEffect } from 'react';
import '../styles/cards.css';  

export default function Cards() {
    const [cardImages, setCardImages] = useState([]);
    const [gameLevel, setGameLevel] = useState(0);
    const [clickedCards, setClickedCards] = useState([]);
    

    const changeLevels = () => {
        setGameLevel(gameLevel + 1);
    }
    
    useEffect(() => {
        async function getCardImages(){
            try {
                const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php');
                const data = await response.json();
                const images = data.data
                .filter(card => card.type === "Effect Monster")
                .map(card => card.card_images[0].image_url_small)
                .slice(0, 8);
                setCardImages(images);
            } catch (error) {
                console.log('Error: ', error);
            } 
        }
        getCardImages();
    }, []);


    const checkClickedCard = (event) => {
        if (clickedCards.includes(event.target.alt)) {
            alert("end game");
        } else {
            shuffleCards();
            
            setClickedCards([...clickedCards, event.target.alt]);
            console.log(clickedCards)
        }
    }

    const shuffleCards = () => {
        const cardElements = Array.from(document.querySelectorAll(".cards div"));
        const parentElement = cardElements[0].parentNode; // Get parent element
        for (let i = cardElements.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // Swap the positions of whole <img> elements within the parent element
            parentElement.insertBefore(cardElements[i], cardElements[j]);
        }
    };

    return (
        <div className='cards'>
            {cardImages.map((imageUrl, index) => (
                <div key={index} onClick={checkClickedCard}>
                   <img src={imageUrl} alt={`Effect Monster ${index}`} />
                </div>
            ))}
        </div>
    );
}