import PropTypes from "prop-types";

const PetList = (props) => {
  return (
    <div>
      <h1>Pet List</h1>
      <ul>
        {props.petList.length > 0 ? (
          props.petList.map((pet) => (
            <li key={pet._id} onClick={() => props.updateSelected(pet)}>
              {pet.name}
              <button onClick={() => props.handleFormView(pet)}>Edit</button>
            </li>
          ))
        ) : (
          <p>No pets available</p>
        )}
      </ul>
    </div>
  );
};
// Add PropTypes validation for the component's props
PetList.propTypes = {
  petList: PropTypes.array.isRequired,
  handleFormView: PropTypes.func.isRequired,
  isFormOpen: PropTypes.bool.isRequired,
  updateSelected: PropTypes.func.isRequired,
};

export default PetList;
