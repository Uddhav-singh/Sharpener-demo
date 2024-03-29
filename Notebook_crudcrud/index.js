function handleFormSubmit(event) {
  event.preventDefault();
  const noteDetails = {
    date: Date.now(),
    title: event.target.title.value,
    description: event.target.description.value,
    //   phone: event.target.phone.value,
  };
  
  axios
    .post(
      "https://crudcrud.com/api/bddf7fbdab7e4928b06dd7bc7e76a498/noteDetails",
      noteDetails
    )
    .then((response) => displayNoteOnScreen(response.data))
    .catch((error) => console.log(error));

  // Clearing the input fields
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  // document.getElementById("phone").value = "";
}

function displayNoteOnScreen(noteDetails) {
  // Create a list item element to hold the note details
  const noteItem = document.createElement("li");

  // Create and add text content for the note title and description
  noteItem.innerHTML = `<strong>${noteDetails.title}</strong>:<br> ${noteDetails.description}`;

  // Create a delete button for the note item
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  // Append the delete button to the note item
  noteItem.appendChild(deleteBtn);

  // Get the list element where notes will be displayed
  const noteList = document.getElementById("noteList");

  // Append the note item to the note list
  noteList.appendChild(noteItem);

  // Add event listener to delete button to handle note deletion
  deleteBtn.addEventListener("click", () => {
    // Remove the note item from the DOM
    noteList.removeChild(noteItem);

    // Here, you can add code to send a request to delete the note from the server
    // For example:
    axios
      .delete(
        `https://crudcrud.com/api/bddf7fbdab7e4928b06dd7bc7e76a498/noteDetails/${noteDetails.date}`
      )
      .then((response) => {
        console.log("Note deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  });
}
// Function to save notes to localStorage
function saveNotesToLocalStorage(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
  }
  
  // Function to load notes from localStorage
  function loadNotesFromLocalStorage() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach(note => {
      displayNoteOnScreen(note);
    });
    return notes;
  }
  
  // Retrieve notes from localStorage when the page loads
  document.addEventListener("DOMContentLoaded", () => {
    loadNotesFromLocalStorage();
  });


// For searching the notes 
function searchNotes() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const notes = document.querySelectorAll("#noteList li");

    let totalNotes = 0;
  let matchingNotes = 0;
  
    notes.forEach(note => {
      const title = note.querySelector("strong").textContent.toLowerCase();
      const description = note.textContent.toLowerCase();
      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        note.style.display = "block";
        matchingNotes++;
      } else {
        note.style.display = "none";
      }
      totalNotes++;
    });
    // Update total notes count
    document.querySelector('p:nth-of-type(1)').textContent = `Total Notes: ${totalNotes}`;

    // Update showing count
    document.querySelector('p:nth-of-type(2)').textContent = `Showing: ${matchingNotes}`;
  }
  
  // Attach event listener to search input for real-time search
  document.getElementById("search").addEventListener("input", searchNotes);
  

// Do not touch code below
module.exports = {
  handleFormSubmit,
  displayNoteOnScreen,
};
