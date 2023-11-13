import PropTypes from "prop-types";
export default function Card(props) {
  return (
    <div
      className="shrink-0 p-4 border"
      onClick={() => props.onclick(props.card.id)}
      draggable="false">
      <img
        draggable="false"
        className=" w-28 h-36 md:w-48 md:h-56 rounded shadow-lg hover:scale-105"
        src={props.card.images.original.url}
        alt={props.card.title}
      />
    </div>
  );
}

Card.propTypes = {
  onclick: PropTypes.func,
  card: PropTypes.object,
};
