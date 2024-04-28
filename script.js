const table = document.querySelector(`tbody`);
const form = document.getElementById(`add`);


const myLibrary = [];

function Book(author, title, status) {
  this.author = author;
  this.title = title;
  this.status = status;
}

Book.prototype.toggle = function() {
    if (this.status === `read`) {
        this.status = `not read`;
    } else {
        this.status = `read`;
    }
    createTable();
};

function createTable () {
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    for (let i = 0; i < myLibrary.length; i++) {
        const row = document.createElement(`tr`);
        const deleteButton = document.createElement(`button`);
        deleteButton.textContent = `❌`
        table.appendChild(row); 
        for (const [key, value] of Object.entries(myLibrary[i])) {
            const data = document.createElement(`td`);
            row.appendChild(data);
            data.textContent = `${value}`
        }
        
        deleteButton.setAttribute(`data-index-number`, `${i}`);
        deleteButton.addEventListener(`click`, removeBook);
        row.appendChild(deleteButton)
    }
    const statusCells = document.querySelectorAll(`td:nth-child(3)`);
    let i = 0;
    statusCells.forEach((cell) => {
        cell.setAttribute(`data-index-number`, `${i}`);
        cell.addEventListener(`click`, function (e) {
            const index = e.target.getAttribute(`data-index-number`);
            myLibrary[index].toggle();
        });
        i++;
    });
}

form.addEventListener(`submit`, (e) => {
    e.preventDefault();

    const author = document.getElementById(`author`);
    const title = document.getElementById(`title`);
    const status = document.getElementById(`status`);

    const book = new Book(author.value, title.value, status.value)

    myLibrary.push(book);

    createTable();
    form.reset();
});

function removeBook(e) {
    const index = e.target.getAttribute(`data-index-number`);
    myLibrary.splice(index, 1);
    createTable(myLibrary);
}












