import { useState, useEffect } from "react";
import PetList from "./components/PetList";
import PetDetail from "./components/PetDetail";
import PetForm from "./components/PetForm";
import * as petService from "./services/petService";

const App = () => {
  const [petList, setPetList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false); // Track if the form is open or closed

  // Fetch pets from the server on mount
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const pets = await petService.index();
        setPetList(pets);
      } catch (error) {
        console.log("Error fetching pets:", error);
      }
    };
    fetchPets();
  }, []);

  // Toggle form visibility
  const handleFormView = (pet) => {
    if (!pet?.name) setSelected(null);
    setIsFormOpen(!isFormOpen);
  };

  // Handle adding a new pet
  const handleAddPet = async (formData) => {
    try {
      const newPet = await petService.create(formData);
      if (newPet.error) {
        throw new Error(newPet.error);
      }
      setPetList([newPet, ...petList]); // Add the new pet to the pet list
      setIsFormOpen(false); // Close the form after submission
    } catch (error) {
      console.log("Error adding pet:", error);
    }
  };

  // Handle updating a pet
  const handleUpdatePet = async (formData, petId) => {
    try {
      const updatedPet = await petService.updatePet(formData, petId);
      if (updatedPet.error) {
        throw new Error(updatedPet.error);
      }

      // Update the petList with the updated pet using .map()
      const updatedPetList = petList.map((pet) =>
        pet._id !== updatedPet._id ? pet : updatedPet
      );
      setPetList(updatedPetList); // Set updated pet list
      setSelected(updatedPet); // Update the selected state with the updated pet
      setIsFormOpen(false); // Close the form after submission
    } catch (error) {
      console.log("Error updating pet:", error);
    }
  };

  return (
    <div>
      <button onClick={() => handleFormView()}>
        {isFormOpen ? "Close" : "Create a Pet"}
      </button>

      {isFormOpen ? (
        <PetForm
          handleAddPet={handleAddPet}
          handleUpdatePet={handleUpdatePet}
          selected={selected}
        />
      ) : (
        <PetDetail selected={selected} handleFormView={handleFormView} />
      )}

      <PetList
        petList={petList}
        updateSelected={setSelected}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
      />
    </div>
  );
};

export default App;
