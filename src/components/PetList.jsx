const PetList = (props) => {
  return (
    <div id="sidebar">
      <h1>Pet List</h1>
      <ul>
        {props.petList.length > 0 ? (
          props.petList.map((pet) => (
            <li key={pet._id} onClick={() => props.updateSelected(pet)}>
              <span style={{ cursor: "pointer", color: "#61dafb" }}>
                {pet.name}
              </span>
            </li>
          ))
        ) : (
          <p>No pets available</p>
        )}
      </ul>
      <button onClick={() => props.handleFormView(null)}>New Pet</button>
    </div>
  );
};

export default PetList;
