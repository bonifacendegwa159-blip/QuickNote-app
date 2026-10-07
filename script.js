const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

let notes = [];

function saveNotes() {
    localStorage.setItem("quickNotes", JSON.stringify(notes));
}

function loadNotes() {
    const savedNotes = localStorage.getItem("quickNotes");

    if (savedNotes) {
        notes = JSON.parse(savedNotes);
    }
}

function render(searchTerm = "") {
    notesList.textContent = "";

    const filteredNotes = notes.filter((note) =>
        note.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredNotes.length === 0 && searchTerm.trim() !== "") {
        const message = document.createElement("li");
        message.textContent = "No notes match your search.";
        notesList.appendChild(message);
    }

    filteredNotes.forEach((note) => {
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

        deleteButton.addEventListener("click", () => {
            notes = notes.filter((item) => item.id !== note.id);
            saveNotes();
            render(searchInput.value);
        });

        li.appendChild(noteText);
        li.appendChild(categoryLabel);
        li.appendChild(dateText);
        li.appendChild(deleteButton);

        notesList.appendChild(li);
    });

    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${notes.length} notes.`;
    }
}

noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = noteInput.value.trim();
    const category = noteCategory.value;

    if (text === "") {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    if (text.length > 200) {
        errorMessage.textContent = "Notes must be 200 characters or fewer.";
        return;
    }

    errorMessage.textContent = "";

    const note = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    notes.push(note);

    saveNotes();
    render();

    noteInput.value = "";
});

searchInput.addEventListener("input", () => {
    render(searchInput.value);
});

loadNotes();
render();