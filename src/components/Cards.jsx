import { useState, useEffect } from 'react';
import '../styles/cards.css';  
import ScoreBoard from './ScoreBoard';

export default function Cards() {
    const [cardImages, setCardImages] = useState([]);
    const [clickedCards, setClickedCards] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [originalOrder, setOriginalOrder] = useState([]);
    const [cardNumber, setCardNumber] = useState(8);

    const resetGame = () => {
        setScore(0);
        setClickedCards([]);
        setCardNumber(8); 
        setCardImages(originalOrder); // Reset card images to their original order
    };

    const changeLevel = (number) => {
        setCardNumber(number);
        
    }
    
    useEffect(() => {
        async function getCardImages(){
            try {
                const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php');
                const data = await response.json();
                const images = data.data
                .filter(card => card.type === "Effect Monster")
                .map(card => card.card_images[0].image_url_small)
                .slice(0, cardNumber);
                setCardImages(images);
                setOriginalOrder(images); // Store the original order of card images
            } catch (error) {
                console.log('Error: ', error);
            } 
        }
        getCardImages();
    }, [cardNumber]);

    const updateScore = () => {
        setScore(prevScore => prevScore + 1); // Update score based on previous score
    
        // Update game level based on current score
        if(score + 1 === cardNumber) {
            changeLevel(cardNumber + 4);
            shuffleCards();
        } 
     
        // Update high score if the current score is higher
        setHighScore(prevHighScore => {
            if (prevHighScore < score + 1) {
                return score + 1;
            }
            return prevHighScore;
        });
    };
    

    const checkClickedCard = (event) => {
        if (clickedCards.includes(event.target.alt)) {
            resetGame(); // Reset the game if the user loses
        } else {
            updateScore();
            shuffleCards();
            setClickedCards([...clickedCards, event.target.alt]);
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
        <>
            <ScoreBoard score={score} highScore={highScore}></ScoreBoard>
            <div className='cards'>
                {cardImages.map((imageUrl, index) => (
                    <div key={index} onClick={checkClickedCard}>
                        <img src={imageUrl} alt={`Effect Monster ${index}`} />
                    </div>
                ))}
            </div>
        </>
    );
}
