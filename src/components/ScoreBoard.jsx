import PropTypes from 'prop-types';

function ScoreBoard({ score, highScore }) {
    return (
        <div className="scoreboard">
            <p>Score: {score}</p>
            <p>High score: {highScore}</p>
        </div>
    );
}

ScoreBoard.propTypes = {
    score: PropTypes.number.isRequired,
    highScore: PropTypes.number.isRequired
};

export default ScoreBoard;
