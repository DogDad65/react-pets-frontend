import PropTypes from "prop-types";

const PetDetail = (props) => {
  // return if props.selected is null
  if (!props.selected)
    return (
      <div>
        <h2>NO DETAILS</h2>
      </div>
    );

  return (
    <div>
      <h2>{props.selected.name}</h2>
      <h2>Breed: {props.selected.breed}</h2>
      <h2>
        Age: {props.selected.age} year{props.selected.age > 1 ? "s" : ""} old
      </h2>
    </div>
  );
};

// Add PropTypes validation
PetDetail.propTypes = {
  selected: PropTypes.shape({
    name: PropTypes.string.isRequired,
    breed: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
  }),
};

export default PetDetail;
