import { useState, useEffect } from 'react';
import '../styles/cards.css';


export default function Cards() {
    const [cardImages, setCardImages] = useState([]);
    const [clickedCards, setClickedCards] = useState([]);
    const [wrongClick, setWrongClick] = useState(false);

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

    const handleCardClick = (event) => {
        const clickedCard = event.target;
        console.log(clickedCard.src);
        if (!clickedCards.includes(clickedCard.src)) {
            setClickedCards(prevClickedCards => [...prevClickedCards, clickedCard.src]);
            shuffleCards();
        } else {
            alert("wrong")
            setWrongClick(true);
        }
        
    }

    function shuffleCards() {
        for (let i = cardImages.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [cardImages[i], cardImages[randomIndex]] = [cardImages[randomIndex], cardImages[i]];
        }
    }

    const cardsContent = (
        <div className='cardsContainer'>
            {cardImages.map((imageUrl, index) => (
                <div key={index}>
                    <img src={imageUrl} alt={`Effect Monster ${index}`} id={index} onClick={handleCardClick} />
                </div>
            ))}
        </div>
    );

    // JSX content for when wrongClick is true
    const errorMessage = (
        <div>
            {/* Add your error message JSX here */}
        </div>
    );

    return wrongClick ? errorMessage : cardsContent;
}