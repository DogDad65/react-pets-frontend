import { useState, useEffect } from "react";
import PetList from "./components/PetList";
import PetDetail from "./components/PetDetail";
import PetForm from "./components/PetForm";
import * as petService from "./services/petService";
import './App.css';

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

  // Toggle form visibility and clear selected pet if creating new
  const handleFormView = (pet = null) => {
    setSelected(pet); // Set selected pet if editing, null if creating new
    setIsFormOpen(!isFormOpen); // Toggle form state
  };

  // Update selected pet
  const updateSelected = (pet) => {
    setSelected(pet);
    setIsFormOpen(false); // Close form if open
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

  // Handle removing a pet
  const handleRemovePet = async (petId) => {
    try {
      const deletedPet = await petService.deletePet(petId);
      if (deletedPet.error) {
        throw new Error(deletedPet.error);
      }

      setPetList(petList.filter((pet) => pet._id !== deletedPet._id)); // Remove the deleted pet
      setSelected(null); // Clear selected pet
      setIsFormOpen(false); // Close the form
    } catch (error) {
      console.log("Error deleting pet:", error);
    }
  };

  return (
    <div id="root-container">
      <PetList
        petList={petList}
        isFormOpen={isFormOpen}
        updateSelected={updateSelected} // Update selected pet
        handleFormView={handleFormView} // Trigger form view
      />

      <div id="main-content">
        {isFormOpen ? (
          <PetForm
            selected={selected}
            handleAddPet={handleAddPet}
            handleUpdatePet={handleUpdatePet}
          />
        ) : selected ? (
          <PetDetail
            selected={selected}
            handleFormView={handleFormView}
            handleRemovePet={handleRemovePet}
          />
        ) : (
          <div className="no-details">
            <h1>NO DETAILS</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
