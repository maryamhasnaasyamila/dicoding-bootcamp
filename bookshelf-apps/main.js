document.addEventListener("DOMContentLoaded", () => {
  const book_form = document.getElementById("input_book");
  const search_book = document.getElementById("search_title_book");
  const input_finished = document.getElementById("input_finished");
  const submit_change = document.getElementById("submit_book");

  let books = [];

  //  Memuat buku dari penyimpanan lokal
  function load_page() {
    if (localStorage.getItem("books")) {
      books = JSON.parse(localStorage.getItem("books"));
    }
  }

  // Menyimpan buku ke penyimpanan lokal
  function save_to_list() {
    localStorage.setItem("books", JSON.stringify(books));
  }

  // Menampilkan semua data buku
  function display_all(books) {
    const unfinished_list = document.getElementById("unfinished_list");
    const finished_list = document.getElementById("finished_list");

    unfinished_list.innerHTML = "";
    finished_list.innerHTML = "";

    books.forEach((book) => {
      const new_book = add_book(book);

      if (book.finished) {
        finished_list.append(new_book);
      } else {
        unfinished_list.append(new_book);
      }
    });
  }

  // Menambahkan sebuah buku
  function add_book(book) {
    const article = document.createElement("article");
    article.classList.add("book_item");

    const h3 = document.createElement("h3");
    h3.textContent = book.title;
    article.append(h3);

    const author = document.createElement("p");
    author.textContent = `Penulis: ${book.author}`;
    article.append(author);

    const release_year = document.createElement("p");
    release_year.textContent = `Tahun: ${book.release_year}`;
    article.append(release_year);

    const action = document.createElement("div");
    action.classList.add("action");

    if (book.finished) {
      const not_yet = document.createElement("button");
      not_yet.classList.add("green");
      not_yet.textContent = "Tandai belum selesai";
      not_yet.addEventListener("click", () => {
        book.finished = false;
        save_to_list();
        display_all(books);
      });
      action.append(not_yet);
    } else {
      const done = document.createElement("button");
      done.classList.add("green");
      done.textContent = "Tandai selesai";
      done.addEventListener("click", () => {
        book.finished = true;
        save_to_list();
        display_all(books);
      });
      action.append(done);
    }

    const remove = document.createElement("button");
    remove.classList.add("red");
    remove.textContent = "Hapus buku";
    remove.addEventListener("click", () => {
      books = books.filter((b) => b.title !== book.title);
      save_to_list();
      display_all(books);
    });
    action.append(remove);

    article.append(action);

    return article;
  }

  // Menyimpan data buku di array dan menampilkannya
  book_form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("input_title_book").value;
    const author = document.getElementById("input_author_name").value;
    const release_year = document.getElementById("input_release_date").value;
    const finished = document.getElementById("input_finished").checked;

    const new_book = { title, author, release_year, finished };
    books.push(new_book);
    save_to_list();
    display_all(books);

    book_form.reset();
  });

  load_page();
  display_all(books);

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

  // Mengubah otomatis tombol ketika checkbox terisi
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
