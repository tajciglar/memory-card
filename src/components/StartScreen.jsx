// eslint-disable-next-line react/prop-types
export default function StartScreen ({ startGame }) {
    return (
        <div className="startScreen">
            <h1>
                Yu Gi Oh Memory Card Game
            </h1>
            <div className="instructions">
                <h4>Instructions</h4>
                <p>Welcome to the Yu Gi Oh Memory Card Game! Here&apos;s how to play:</p>
                <ol>
                    <li>Click on any card to reveal its image.</li>
                    <li>Try to remember the position of each card.</li>
                    <li>Click on another card to reveal its image.</li>
                    <li>If the two revealed cards match, they stay face up.</li>
                    <li>If the two revealed cards do not match, they will flip back over.</li>
                    <li>Continue flipping cards until you match all pairs without pressing the same one twice.</li>
                    <li>If you press the same card twice, the game resets.</li>
                    <li>Complete the current level by matching all cards without making a mistake.</li>
                    <li>Each level increases the number of cards:</li>
                        <ul>
                            <li>Level 1: 6 cards</li>
                            <li>Level 2: 8 cards</li>
                            <li>Level 3: 10 cards</li>
                            <li>and so on...</li>
                        </ul>
                    <li>Try to achieve the highest score by completing as many levels as you can!</li>
                </ol>
            </div>
            <button onClick={startGame}>Press to start</button>
        </div>
    )
}
