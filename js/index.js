console.log("This is index.js");
showNotes();

let addNotes = document.getElementById('addNotes');
let title = document.getElementById('title');
let description = document.getElementById('description');
let form = document.getElementById('form');
let find = document.getElementById('find');

// description.parentNode

const addNote = () => {

    if (title.value == '') {
        let str = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
  <strong>Error!</strong> Please type valid value in title.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;

        alertContainer.innerHTML = str;
        return;
    }
    if (description.value == '') {
        let str = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
  <strong>Error!</strong> Please type valid value in description.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;

        alertContainer.innerHTML = str;
        return;
    }

    let notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = "<h2 class='text-center mb-3'>Your Notes</h2>";

    let note = localStorage.getItem('notes');
    let notesObj;
    if (note == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(note);
    }

    let notes = {
        title: title.value,
        description: description.value,
    }
    notesObj.push(notes);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
    title.value = '';
    description.value = '';
    let str = `<div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong>Success!</strong> Note added successfully.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;

        alertContainer.innerHTML = str;
}

function showNotes() {
    let ltitle = localStorage.getItem('notes');
    if (ltitle == null) {
        notesContainer.innerHTML = "<h2 class='text-center mb-3'>Your Notes</h2>";
        let newElement = document.createElement('p');
        newElement.innerHTML = "Noting to show here. Please add an item.";
        notesContainer.appendChild(newElement);
    } else {
        notesContainer.innerHTML = "<h2 class='text-center mb-3'>Your Notes</h2>";
        Array.from(JSON.parse(ltitle)).forEach((element, index) => {
            let notesContainer = document.getElementById('notesContainer');
            let str = `
            <div class="card-body" id="${index}">
        <h5 class="card-title title">${element.title}</h5>
        <p class="card-desc">${element.description}</p>
        <button class="btn btn-danger" onclick="deleteNote(this.parentNode.id)">Delete</button>
    </div>`;

            let newElement = document.createElement('div');
            newElement.setAttribute('class', 'card mx-2 my-1 noteCard');
            newElement.setAttribute('style', 'width: 18rem;');
            newElement.innerHTML = str;

            notesContainer.appendChild(newElement);

        });
    }
}

const deleteNote = (id) => {
    let notes = localStorage.getItem('notes');

    let notesObj = JSON.parse(notes);
    notesObj.splice(id, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    if (notesObj.length == 0) {
        localStorage.clear();
    }
    showNotes();
}

find.addEventListener('input', () => {
    let inputTxt = find.value;
    let noteCard = document.getElementsByClassName('noteCard');
    console.log(Array.from(noteCard));
    Array.from(noteCard).forEach((element) => {
        let txt = element.getElementsByTagName('p')[0].innerText;
        if (txt.includes(inputTxt)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    });
});

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let inputTxt = find.value;
    // let noteCard = document.getElementsByClassName('noteCard');
    let noteCard = document.getElementById('notesContainer');
    Array.from(noteCard).forEach((element) => {
        let txt = element.getElementsByTagName('p')[0].innerText;
        if (txt.includes(inputTxt)) {
            element.style.display = 'block';
        }
        else {
            element.style.visibility = 'hidden';
        }
    });
});

addNotes.addEventListener('click', addNote);
