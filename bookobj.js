// let count = 0
// const myLibrary = [];

// function Book(author, title, page, isread) {
//   // the constructor
//   this.author = author
//   this.title = title
//   this.page = page
//   this.isread = isread
//   this.id = count++
//   this.idDel = false
// }
let count = 0
class mybook {

  constructor(author, title, page, isread) {
    this.author = author
    this.title = title
    this.page = page
    this.isread = isread
    this.id = count++
    this.idDel = false
  }
}

class myLibrary {
  constructor() {
    this.books = []
  }


  // add book
  addBook(obj) {
    this.books.push(obj)
    this.render(this.books)
  }

  // removeBook
  removeBook(id) {
    this.books = this.books.filter(ele => ele.id !== id)
    this.render(this.books)
  }

  isread(id) {
    const book = this.books.find(item => item.id === id)
    if (book) book.isread = !book.isread
    this.render()
  }

  render() {
    const bookshelf = document.querySelector('.container')
    bookshelf.innerHTML = ''
    // dispaly
    this.books.forEach(ele => {
      const { author, title, page, isread, isDel, id } = ele
      // create elements and structure
      const book_item = document.createElement('div')
      book_item.classList.add('book_item');
      // isred color
      book_item.style.backgroundColor = isread ? 'pink' : 'blue';

      book_item.innerHTML = `
      <p>Title: ${title}</p>
      <span>Author: ${author}</span>
      <span>Page No.: ${page}</span>
      <div class="buttons">
        <button class="delbtn" data-id="${id}">Delete</button>
        <button class="readbtn" data-id="${id}">Read Status</button>
      </div>
    `;

      bookshelf.appendChild(book_item);

      // delbtn
      document.querySelectorAll('.delbtn').forEach(button => {
        button.addEventListener('click', () => {
          const id = parseInt(button.dataset.id, 10);
          this.removeBook(id);
        });
      });

      document.querySelectorAll('.readbtn').forEach(button => {
        button.addEventListener('click', () => {
          const id = parseInt(button.dataset.id, 10);
          this.isread(id);
        });
      });






    })
  }


}


const mylib = new myLibrary()

// test1
mylib.addBook(new mybook('LDR', 'BTD', 1, 'true'))







// open the dialog
const dialog = document.querySelector('.dialog')
const openbtn = document.querySelector('.open')
const closebtn = document.querySelector('.reset')
const confirmbtn = document.querySelector('.confirm')

// show modal
openbtn.addEventListener('click', () => {
  dialog.showModal()
})
// close
closebtn.addEventListener('click', () => {
  dialog.close()
})


// confirm : collect all data
confirmbtn.addEventListener("click", () => {

  // or select all inputs value
  const form = document.querySelector('form')
  const formData = new FormData(form)
  const author = formData.get('author');
  const title = formData.get('title');
  const page = formData.get('page');
  const isread = formData.get('isread') === 'true'; // Ensure boolean value

  const newBook = new mybook(author, title, page, isread)
  mylib.addBook(newBook)

  form.reset()

})




