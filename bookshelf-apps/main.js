document.addEventListener("DOMContentLoaded", () => {
  const book_form = document.getElementById("input_book");
  const search_book = document.getElementById("search_title_book");
  const input_finished = document.getElementById("input_finished");
  const submit_change = document.getElementById("submit_book");

  let books = [];

  // Memuat buku dari local storage
  function load_page() {
    if (localStorage.getItem("books")) {
      books = JSON.parse(localStorage.getItem("books"));
      display_all(books);
    }
  }

  // Menyimpan buku ke local storage
  function save_to_list() {
    localStorage.setItem("books", JSON.stringify(books));
  }

  // Menampilkan semua buku berdasarkan kategori raknya
  function display_all(books) {
    const unfinished_list = document.getElementById("unfinished_list");
    const finished_list = document.getElementById("finished_list");

    unfinished_list.innerHTML = "";
    finished_list.innerHTML = "";

    books.forEach((book) => {
      const new_book = add_book(book);

      if (book.isComplete) {
        finished_list.append(new_book);
      } else {
        unfinished_list.append(new_book);
      }
    });
  }

  // Tambah data buku
  function add_book(book) {
    const article = document.createElement("article");
    article.classList.add("book_item");

    const h3 = document.createElement("h3");
    h3.textContent = book.title;
    article.append(h3);

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;
    article.append(author);

    const year = document.createElement("p");
    year.textContent = `Year: ${book.year}`;
    article.append(year);

    const action = document.createElement("div");
    action.classList.add("action");

    if (book.isComplete) {
      const not_yet = document.createElement("button");
      not_yet.classList.add("green");
      not_yet.textContent = "Mark as Unfinished";
      not_yet.addEventListener("click", () => {
        book.isComplete = false;
        save_to_list();
        display_all(books);
      });
      action.append(not_yet);
    } else {
      const done = document.createElement("button");
      done.classList.add("green");
      done.textContent = "Mark as Finished";
      done.addEventListener("click", () => {
        book.isComplete = true;
        save_to_list();
        display_all(books);
      });
      action.append(done);
    }

    const remove = document.createElement("button");
    remove.classList.add("red");
    remove.textContent = "Remove Book";
    remove.addEventListener("click", () => {
      books = books.filter((b) => b.id !== book.id);
      save_to_list();
      display_all(books);
    });
    action.append(remove);
    article.append(action);
    return article;
  }

  // Submit form tambah buku
  book_form.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = +new Date();
    const title = document.getElementById("input_title_book").value;
    const author = document.getElementById("input_author_name").value;
    const year = parseInt(document.getElementById("input_release_date").value);
    const isComplete = document.getElementById("input_finished").checked;

    const new_book = { id, title, author, year, isComplete };
    books.push(new_book);
    save_to_list();
    display_all(books);

    book_form.reset();
  });

  load_page();

  // Fitur search
  search_book.addEventListener("submit", (e) => {
    e.preventDefault();
    const search_term = search_book_title.value.trim().toLowerCase();

    if (!search_term) {
      display_all(books);
      return;
    }

    const filter_book = books.filter((book) =>
      book.title.toLowerCase().includes(search_term)
    );
    display_all(filter_book);
  });

  // Ubah tulisan di button sesuai kondisi tertentu
  input_finished.addEventListener("change", () => {
    if (input_finished.checked) {
      submit_change.innerHTML =
        "Masukkan ke rak <span>Buku selesai dibaca</span>";
    } else {
      submit_change.innerHTML =
        "Masukkan ke rak <span>Buku belum selesai dibaca</span>";
    }
  });
});
