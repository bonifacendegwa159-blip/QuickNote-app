const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

function render() {
    notesList.textContent = "";

    notes.forEach((note) => {
        const li = document.createElement("li");

        li.className = `note-card category-${note.category.toLowerCase()}`;

        const noteText = document.createElement("p");
        noteText.textContent = note.text;

        const categoryLabel = document.createElement("small");
        categoryLabel.textContent = note.category;

        const dateText = document.createElement("small");
        dateText.textContent = note.createdAt;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.type = "button";

        li.appendChild(noteText);
        li.appendChild(categoryLabel);
        li.appendChild(dateText);
        li.appendChild(deleteButton);

        notesList.appendChild(li);
    });

    noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = noteInput.value.trim();
    const category = noteCategory.value;

    const note = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    notes.push(note);

    render();

    noteInput.value = "";
});

}


