const pageSize = 4; // عدد الكتب في كل صفحة

const getBooks = async (subject) => {

        const {data} = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${subject}`);
        console.log(data);

    return data.items;
}

async function displayBooks(subject='flower') {
    const books = await getBooks(subject);
    console.log(books);
    const result = books.map(book => `
        <div class="col-lg-3 col-md-4">
            <div class="book card gap-3">
                <div class="card-header d-flex flex-column gap-2">
                    <h3 class="card-title">${book.volumeInfo.title.slice(0,8)}</h3>
                </div>
                <div class="card-body">
                    <img src="${book.volumeInfo.imageLinks.thumbnail}" class="img-fluid" />
                </div>
                <div class="card-footer d-flex justify-content-center">

                    <a href="otherbook.html?bookId=${book.id}" class="btn btn-lg btn-outline-info book-details">التفاصيل</a>
                </div>
            </div>
        </div>
    `).join('');

    document.querySelector('.books').innerHTML = result;


}




const searchOtherBooks  = document.querySelector(".searchOtherBooks");
searchOtherBooks.addEventListener("submit",function(e){
    e.preventDefault();
    displayBooks(e.target['subject'].value);

})


displayBooks();
