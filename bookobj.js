let count = 0
const myLibrary = [];

function Book(author, title, page, isread) {
  // the constructor
  this.author = author
  this.title = title
  this.page = page
  this.isread = isread
  this.id = count++
  this.idDel = false
}


// test obj
let test1 = new Book("LDR", "BTD", "1", true)
addBookToLibrary(test1)


// add book
function addBookToLibrary(bookobj) {
  // add book obj to library 
  myLibrary.push(bookobj)
  render(myLibrary)
}

function render(List) {
  const bookshelf = document.querySelector('.container')
  bookshelf.innerHTML = ''
  // dispaly
  List.forEach(ele => {
    const { author, title, page, isread, isDel } = ele
    // create elements and structure
    const book_item = document.createElement('div')
    const book_title = document.createElement('p')
    const book_author = document.createElement('span')
    const book_page = document.createElement('span')

    const buttons = document.createElement('div')
    const delbtn = document.createElement('button')
    const changeRead = document.createElement('button')
    const buttonsList = [delbtn, changeRead]
    buttonsList.forEach(ele => buttons.appendChild(ele))

    // appendChild with multiple elements : loop through arr
    const childNodeList = [book_title, book_author, book_page, buttons]
    childNodeList.forEach(ele => book_item.appendChild(ele))
    bookshelf.appendChild(book_item)


    // add corresponding content
    book_author.textContent = "Author: " + author
    book_title.innerText = "Title:" + title
    book_page.innerHTML = "Page No.: " + page
    delbtn.innerText = 'delete'
    changeRead.innerText = 'read status'

    // add eventListner for deleting
    delbtn.addEventListener("click", () => {
      ele.isDel = true
      render(myLibrary)
    })

    changeRead.addEventListener('click', () => {
      ele.isread = !isread
      render(myLibrary)

    })



    // isred color
    isread ? book_item.style.backgroundColor = 'pink' : book_item.style.backgroundColor = 'blue'
    isDel ? book_item.style.display = 'none' : ''

    // styling
    buttons.classList.add('buttons')
    delbtn.classList.add('delbtn')
    changeRead.classList.add('delbtn')
    book_item.classList.add('book_item')

  })
}





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
  const isread = formData.get('isRead') === 'true'; // Ensure boolean value

  let newBook = new Book(author, title, page, isread)
  addBookToLibrary(newBook)

  form.reset()

})




