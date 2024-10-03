const PetDetail = (props) => {
  // return if props.selected is null
  if (!props.selected)
    return (
      <div>
        <h2 className="no-details">NO DETAILS</h2>
      </div>
    );

  return (
    <div>
      <h1>{props.selected.name}</h1>
      <h2>Breed: {props.selected.breed}</h2>
      <h2>
        Age: {props.selected.age} year{props.selected.age > 1 ? "s" : ""} old
      </h2>
      <div className="button-group">
        <button onClick={() => props.handleFormView(props.selected)}>Edit</button>
        <button onClick={() => props.handleRemovePet(props.selected._id)}>Delete</button>
      </div>
    </div>
  );
};

export default PetDetail;
