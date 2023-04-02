class Library {
  constructor() {
    this.borrowedBooks = [];
    this.returnedBooks = [];
    this.loadReturnedBooks()
    this.loadBooks();
  }
  loadReturnedBooks() {
    let rBooks = localStorage.getItem("rebooks");
    if (rBooks) {
      this.returnedBooks = JSON.parse(rBooks);
    } else {
      this.returnedBooks = [];
    }
  }
  loadBooks() {
    let b = localStorage.getItem("books");
    this.borrowedBooks = b ? JSON.parse(b) : [];
  }
  borrowBook(id, name, borower, date) {
    if (!this.checkAvailability(id)) {
      this.borrowedBooks.push({ id, name, borower, date });
      this.updateBooks();
      this.renderBookList();
    } else {
      alert("This book is already issued");
    }
  }
  checkAvailability(id) {
    for (let i in this.borrowedBooks) {
      if (this.borrowedBooks[i].id == id) {
        return false;
      }
      return true;
    }
  }
  updateBooks() {
    localStorage.setItem("books", JSON.stringify(this.borrowedBooks));
  }
  renderBookList() {
    document.getElementById("booklist").innerHTML = "";
    let table = document.getElementById("booklist");
    let h = table.createTHead();
    let r = h.insertRow(0);
    r.insertCell().innerHTML = "<b>Book ID</b>";

    r.insertCell().innerHTML = "<b>Book Name</b>";
    r.insertCell().innerHTML = "<b>Borrower Name</b>";
    r.insertCell().innerHTML = "<b>Role</b>";
    r.insertCell().innerHTML = "<b>Class-Section</b>";
    r.insertCell().innerHTML = "<b>Date</b>";
    r.insertCell().innerHTML = "<b>Option</b>";
    for (let i in this.borrowedBooks) {
      let r = table.insertRow(-1);
      r.insertCell().innerHTML = this.borrowedBooks[i].id;
      r.insertCell().innerHTML = this.borrowedBooks[i].name;
      r.insertCell().innerHTML = this.borrowedBooks[i].borower.name;
      r.insertCell().innerHTML = this.borrowedBooks[i].borower.role;
      r.insertCell().innerHTML = this.borrowedBooks[i].borower.cls;
      r.insertCell().innerHTML = this.borrowedBooks[i].date;
      r.insertCell().innerHTML = `<button onclick = "lib.returnBook('${this.borrowedBooks[i].id}')">Returned</button>`;
    }
  }
  updateReturnedBooks() {
    console.log(this.returnedBooks)
    localStorage.setItem("rebooks", JSON.stringify(this.returnedBooks));
  }
  returnBook(id) {
    if (confirm("Are you sure book is returned? ")) {
      let table = document.getElementById("booklist");
      for (let i in this.borrowedBooks) {
        console.log(i);
        if (this.borrowedBooks[i].id == id) {
          this.returnedBooks.push(this.borrowedBooks[i]);
          this.updateReturnedBooks();
          this.borrowedBooks.splice(i, 1);
          this.updateBooks();
          table.deleteRow(i + 1);
          break;
        }
      }
    }
  }
  loadAndRenderReturnedBooks() {
    let rBooks = localStorage.getItem("rebooks");
    if (rBooks) {
      this.returnedBooks = JSON.parse(rBooks);
    } else {
      this.returnedBooks = [];
    }
    let table = document.getElementById("rebookslist");
    let h = table.createTHead();
    let r = h.insertRow(0);
    r.insertCell().innerHTML = "<b>Book Name</b>";
    r.insertCell().innerHTML = "<b>Borrower Name</b>";
    r.insertCell().innerHTML = "<b>Role</b>";
    r.insertCell().innerHTML = "<b>Class-Section</b>";
    r.insertCell().innerHTML = "<b>Date</b>";
    for (let i in this.returnedBooks) {
      let r = table.insertRow(-1);
      r.insertCell().innerHTML = this.returnedBooks[i].name;
      r.insertCell().innerHTML = this.returnedBooks[i].borower.name;
      r.insertCell().innerHTML = this.returnedBooks[i].borower.role;
      r.insertCell().innerHTML = this.returnedBooks[i].borower.cls;
      r.insertCell().innerHTML = this.returnedBooks[i].date;
    }
  }
}
let lib = new Library();
function issue() {
  let id = document.getElementById("idInput").value;
  let bookname = document.getElementById("bookName").value;
  let borrowername = document.getElementById("borrowername").value;
  let role = document.getElementById("role").value;
  let cls = document.getElementById("cls").value;
  if (id && bookname && borrowername && role) {
    let borrower = { name: borrowername, role, cls };
    let date = new Date();
    lib.borrowBook(
      id,
      bookname,
      borrower,
      `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    );
    document.getElementById("idInput").value = "";
    document.getElementById("bookName").value = "";
    document.getElementById("borrowername").value = "";
    document.getElementById("role").value = "";
    document.getElementById("cls").value = "";
  } else {
    alert("Missing Input Feild");
  }
}
