import { useState, useEffect } from "react";

const PetForm = (props) => {
  
  const initialState = { name: "", age: "", breed: "" };
  const [formData, setFormData] = useState(props.selected || initialState);

  useEffect(() => {
    const initialState = { name: "", age: "", breed: "" }; 
    setFormData(props.selected || initialState);
  }, [props.selected]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // If a pet is selected, we update it. Otherwise, we add a new one.
    if (props.selected) {
      props.handleUpdatePet(formData, props.selected._id);
    } else {
      props.handleAddPet(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Age:
        <input
          name="age"
          value={formData.age}
          onChange={handleChange}
          type="number"
        />
      </label>
      <label>
        Breed:
        <input
          name="breed"
          value={formData.breed}
          onChange={handleChange}
        />
      </label>
      <button type="submit">
        {props.selected ? "Update Pet" : "Add New Pet"}
      </button>
    </form>
  );
};

export default PetForm;
