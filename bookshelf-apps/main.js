document.addEventListener("DOMContentLoaded", () => {
  const inputBookForm = document.getElementById("inputBook");
  const searchBookForm = document.getElementById("searchBook");
  const inputBookIsComplete = document.getElementById("inputBookIsComplete");
  const bookSubmitButton = document.getElementById("bookSubmit");

  let books = [];

  // Load books from local storage
  function loadBooks() {
    if (localStorage.getItem("books")) {
      books = JSON.parse(localStorage.getItem("books"));
    }
  }

  // Save books to local storage
  function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
  }

  // Display books
  function displayBooks(books) {
    const incompleteBookshelfList = document.getElementById(
      "incompleteBookshelfList"
    );
    const completeBookshelfList = document.getElementById(
      "completeBookshelfList"
    );

    incompleteBookshelfList.innerHTML = "";
    completeBookshelfList.innerHTML = "";

    books.forEach((book) => {
      const newBook = createBook(book);

      if (book.isCompleted) {
        completeBookshelfList.append(newBook);
      } else {
        incompleteBookshelfList.append(newBook);
      }
    });
  }

  // Create book element
  function createBook(book) {
    const article = document.createElement("article");
    article.classList.add("book_item");

    const h3 = document.createElement("h3");
    h3.textContent = book.title;
    article.append(h3);

    const author = document.createElement("p");
    author.textContent = `Penulis: ${book.author}`;
    article.append(author);

    const year = document.createElement("p");
    year.textContent = `Tahun: ${book.year}`;
    article.append(year);

    const action = document.createElement("div");
    action.classList.add("action");

    if (book.isCompleted) {
      const undo = document.createElement("button");
      undo.classList.add("green");
      undo.textContent = "Tandai belum selesai";
      //   const undoIcon = document.createElement("img");
      //   undoIcon.src = "/assets/read.png";
      //   undoIcon.alt = "Belum selesai dibaca";
      undo.addEventListener("click", () => {
        book.isCompleted = false;
        saveBooks();
        displayBooks(books);
      });
      action.append(undo);
    } else {
      const done = document.createElement("button");
      done.classList.add("green");
      done.textContent = "Tandai selesai";
      //   const doneIcon = document.createElement("img");
      //   doneIcon.src = "/assets/ceklis.png";
      //   doneIcon.alt = "Selesai dibaca";
      done.addEventListener("click", () => {
        book.isCompleted = true;
        saveBooks();
        displayBooks(books);
      });
      action.append(done);
    }

    const remove = document.createElement("button");
    remove.classList.add("red");
    remove.textContent = "Hapus buku";
    // const removeIcon = document.createElement("img");
    // removeIcon.src = "/assets/trash-white.png";
    // removeIcon.alt = "Hapus buku";
    remove.addEventListener("click", () => {
      books = books.filter((b) => b.title !== book.title);
      saveBooks();
      displayBooks(books);
    });
    action.append(remove);

    article.append(action);

    return article;
  }

  // Add submitted book to books array and display
  inputBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;
    const isCompleted = document.getElementById("inputBookIsComplete").checked;

    const newBook = { title, author, year, isCompleted };
    books.push(newBook);
    saveBooks();
    displayBooks(books);

    inputBookForm.reset();
  });

  // Display books on load
  loadBooks();
  displayBooks(books);

  // Search functionality
  searchBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = searchBookTitle.value.trim().toLowerCase();

    if (!searchTerm) {
      displayBooks(books);
      return;
    }

    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm)
    );
    displayBooks(filteredBooks);
  });

  // Change submit button text based on checkbox
  inputBookIsComplete.addEventListener("change", () => {
    if (inputBookIsComplete.checked) {
      bookSubmitButton.innerHTML =
        "Masukkan ke rak <span>Buku selesai dibaca</span>";
    } else {
      bookSubmitButton.innerHTML =
        "Masukkan ke rak <span>Buku belum selesai dibaca</span>";
    }
  });
});
