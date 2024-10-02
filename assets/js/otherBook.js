const getBook = async()=>{
    const id = document.URL.split("?bookId=")[1];
    const {data} = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
    return data;
}
const displayBook = async()=>{
    const book = await getBook();
    const token = localStorage.getItem('token');
        const result =
    `
    <div class="col-lg-4">
    <div class="book-image">
        <img src="${book.volumeInfo.imageLinks.medium}" class="img-fluid" />
    </div>
</div>
<div class="col-lg-8">
    <div class="book-info d-flex flex-column gap-4">
        <div class="book-data d-flex flex-column gap-3">
            <h1>${book.volumeInfo.title}</h1>

            <a href="${book.accessInfo.pdf.downloadLink}"> مشاهدة</a>
        </div>


    </div>

</div>
    `

    document.querySelector("#bookDetails").innerHTML=result;

    if(!token){
        document.querySelector('.add-comment-form').classList.add('d-none');
    }
 }
