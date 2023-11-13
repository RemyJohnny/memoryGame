import PropTypes from "prop-types";
export default function ScoreBoard({ score, best }) {
  return (
    <>
      <div>
        score <span>{score}</span>
      </div>
      <div>
        best score <span>{best}</span>
      </div>
    </>
  );
}
ScoreBoard.propTypes = {
  score: PropTypes.number.isRequired,
  best: PropTypes.number.isRequired,
};
