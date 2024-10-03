

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/pets`;

// Fetch all pets
const index = async () => {
  try {
    const res = await fetch(BASE_URL);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

// Create a new pet
const create = async (formData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

// Update a pet
const updatePet = async (formData, petId) => {
  try {
    const res = await fetch(`${BASE_URL}/${petId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

// Delete a pet
const deletePet = async (petId) => {
  try {
    const res = await fetch(`${BASE_URL}/${petId}`, {
      method: "DELETE",
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};


export { index, create, updatePet, deletePet };
