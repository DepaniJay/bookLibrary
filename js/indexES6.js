
// In this file use class and methods for all task

class Book{
    constructor(name,author,type){
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

let bookObj;
class Display{
    add(book){
        // console.log("hii");
        
        // Retraive data from the localStorage 
        let booksList = localStorage.getItem('Books');
        // if data is null then create new array
        if(booksList == null){
            bookObj = [];
        }else{
            // else convert string into array by using json
            bookObj = JSON.parse(booksList);
        }

        // create new object for storing data  
        let myObj = {
            bookName : book.name,
            author : book.author,
            type : book.type
        }
        console.log(myObj);
        // add object into array using push method
        bookObj.push(myObj);


        // add Array of Object into localStorage by converting ArrayOfObject into string using json
        localStorage.setItem('Books',JSON.stringify(bookObj));
        
    }
    
    deleteBook(index){
        let booksList = localStorage.getItem('Books');
        
        if(booksList == null){
            bookObj = [];
        }else{
            // else convert string into array by using json
            bookObj = JSON.parse(booksList);
        }

        bookObj.splice(index,1);

        localStorage.setItem('Books',JSON.stringify(bookObj));
        display.showBook();
    }

    showBook(){
        let booksList = localStorage.getItem('Books');
        let tableBody = document.getElementById('tableBody');
        let uiString = '';

        if(booksList == null){
            bookObj = [];
        }else{
            // else convert string into array by using json
            bookObj = JSON.parse(booksList);
        }
        bookObj.forEach(function(element,index){
            uiString += `
            <tr class="books">
                <th scope="row">${index+1}</th>
                <td class="bookName">${element.bookName}</td>
                <td class="author">${element.author}</td>
                <td class="type">${element.type}</td>
                <td class="text-danger" id="${index}" onclick="display.deleteBook(this.id)"  style="cursor: pointer;"><i class="fa fa-trash-o"></i> Delete</td>
            </tr>
            `;
        })
        tableBody.innerHTML = uiString;
    }


    clear(){
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }


    validate(book){
        if(book.name.length<2 || book.author.length<2){
            return false;
        }else{
            return true;
        }
    }


    show(type,msg){
        let message = document.getElementById('message');
        let boldText;
        if(type === 'success'){
            boldText = "Success";
        }else{
            boldText = "Error";
        }
        message.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <strong>${boldText} Message:</strong> ${msg}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;
        setTimeout(()=>{
            message.innerHTML = '';
        },5000);
    }
}
let display = new Display();
display.showBook();

// Add submit event listener to form
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit',libraryFromSubmit);

function libraryFromSubmit(e){
    
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type = document.getElementById('type').value;
    let book = new Book(name,author,type);
    // console.log(book);

    
    if(display.validate(book)){
        display.add(book);
        display.showBook();
        display.clear();
        display.show('success','Your book has been successfully added.');
    }else{
        display.show('danger','Sorry you cannot add this book.');
    }
    
    e.preventDefault();
}


// get referance search text for search/filter
let search = document.getElementById('searchTxt');
let searchType = document.getElementById('searchType');
// add input event when user write text into search box
search.addEventListener('input',function(){

    // convert all search value to lowercase for batter searching
    let inputVal = search.value.toLowerCase();

    // get referance of card element
    let bookName = document.querySelectorAll('.bookName');
    let author = document.querySelectorAll('.author');
    let type = document.querySelectorAll('.type');
    let books = document.querySelectorAll('.books');
    let searchBy = "";
    if(searchType.value === 'bookName'){
        searchBy = bookName;
    }
    if(searchType.value === 'author'){
        searchBy = author;
    }
    if(searchType.value === 'type'){
        searchBy = type;
    }
    // store all card element to one array usign forEach loop  
    Array.from(searchBy).forEach(function(element,index){

        let text = element.innerText.toLowerCase();
        // check search box text is available into card data if data is availabel then set that element display property to block
        if(!text.includes(inputVal)){
            books[index].style.display = "none";
        }
    })
})