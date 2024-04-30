import { useState, useEffect } from 'react';


export default function Cards() {
    const [cardImages, setCardImages] = useState([]);

    useEffect(() => {
        async function getCardImages(){
            try {
                const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php');
                const data = await response.json();
                console.log(data)
                const images = data.data
                .filter(card => card.type === "Effect Monster")
                .map(card => card.card_images[0].image_url_small)
                .slice(0, 8);
                console.log('image url:', images)
                setCardImages(images);
            } catch (error) {
                console.log('Error: ', error);
            } 
        }
        getCardImages();
    }, []);

    return (
        <div>
            {cardImages.map((imageUrl, index) => (
                <div key={index}>
                   <img src={imageUrl} alt={`Effect Monster ${index}`} />
                </div>
            ))}
        </div>
    );
}