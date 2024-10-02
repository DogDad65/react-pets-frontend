import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const PetForm = (props) => {
  const [formData, setFormData] = useState(
    props.selected || { name: "", age: "", breed: "" }
  );

  useEffect(() => {
    setFormData(props.selected || { name: "", age: "", breed: "" });
  }, [props.selected]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
        <input name="age" value={formData.age} onChange={handleChange} />
      </label>
      <label>
        Breed:
        <input name="breed" value={formData.breed} onChange={handleChange} />
      </label>
      <button type="submit">{props.selected ? "Update Pet" : "Add Pet"}</button>
    </form>
  );
};
// Add PropTypes validation for the props
PetForm.propTypes = {
  selected: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.string,
    breed: PropTypes.string,
  }),
  handleAddPet: PropTypes.func.isRequired,
  handleUpdatePet: PropTypes.func.isRequired,
};

export default PetForm;
