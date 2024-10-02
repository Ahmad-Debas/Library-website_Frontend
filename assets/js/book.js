const getBook = async()=>{
    const id = document.URL.split("?bookId=")[1];
    const {data} = await axios.get(`${url}book/${id}`);
    const reviews = data.book.reviews;
    displayReviews(reviews);
    return data.book;
}
const displayBook = async()=>{
    const book = await getBook();
    const token = localStorage.getItem('token');
    const result =
    `
    <div class="col-lg-4">
    <div class="book-image">
        <img src="${book.mainImage.secure_url}" />
    </div>
</div>
<div class="col-lg-8">
    <div class="book-info d-flex flex-column gap-4">
        <div class="book-data d-flex flex-column gap-3">
            <h1>${book.name}</h1>
            <h2>${book.author}</h2>
            <p>يوجد لدينا : <span id="stock">${book.stock}</span> نسخة حالياً</p>

            <p> ${book.description}</p>
        </div>
        <div class="divider"></div>
        <div class="book-price d-flex flex-column gap-3">
            <div class="price d-flex gap-2">

                <span class="fw-bold"> السعر : </span>
                <span>${book.price} $</span>
            </div>

            <div class="discount d-flex gap-2">
                <span>الخصم : </span>
                <span>${book.discount}%</span>
            </div>

            ${book.hardCopy==true?`
                <p>يمكن شراء هذا الكتاب</p>
                <p>السعر : ${book.hardCopyPrice}</p>


            `:''}
            ${token && book.hardCopy == true ? `
            <p>يمكن شراء هذا الكتاب</p>
            <p>السعر : ${book.hardCopyPrice}</p>
            <button class="cart w-25" onClick="addToCart('${book._id}','borrow')">اضافة للسلة ( استعارة )</button>
            <button class="cart w-25" onClick="addToCart('${book._id}','purchase')">اضافة للسلة ( شراء )</button>
        ` : token ? `
            <button class="cart w-25" onClick="addToCart('${book._id}','borrow')">اضافة للسلة ( استعارة )</button>
        ` : ''}

        </div>
    </div>

</div>
    `

    document.querySelector("#bookDetails").innerHTML=result;

    if(!token){
        document.querySelector('.add-comment-form').classList.add('d-none');
    }
 }


 const addToCart = async(bookId,type)=>{
    document.querySelector(".overlay").classList.remove('d-none');
    const token = localStorage.getItem("token");
    try{
        const {data} = await axios.post(`${url}cart`,{bookId,type},{headers:{Authorization:`Library__${token}`}})
        if(data.message=='success'){
            document.querySelector(".overlay").classList.add('d-none');
            Swal.fire({
                title: "اضافة الكتاب للسلة",
                text: "تم اضافة الكتاب للسلة بنجاح",
                icon: "success"
              });

              setTimeout( ()=>{
                location.href="index.html"
              },2000)
        }
    }catch(error){
        document.querySelector(".overlay").classList.add('d-none');
        if(error.response.status==409){
            Swal.fire({
                title: "اضافة الكتاب للسلة",
                text: "الكتاب مضاف مسبقاً الى السلة الخاصة بك",
                icon: "error",
              });
        }
    }
}



const displayReviews = async(reviews)=>{
    const result = reviews.map( (review)=>
    `<div class="comment">
        <p class="username">${review.userId.userName}</p>
        <p class="comment-text"> ${review.content}</p>
    </div>`).join('');

    document.querySelector(".comments").innerHTML=result;

}



const addCommentClick = document.querySelector(".addComment");

addCommentClick?.addEventListener("click",function(e){
    e.preventDefault();
    createReview();
})
async function createReview(){
    document.querySelector(".overlay").classList.remove('d-none');
    const content = document.querySelector("#content").value;
    const rating =1;
    const id = document.URL.split("?bookId=")[1];

    const token = localStorage.getItem("token");
    const {data} = await axios.post(`${url}review/${id}`,{content
        ,rating},{
            headers:{authorization:`Library__${token}`}
        });
    if(data.message=='success'){
        document.querySelector(".overlay").classList.add('d-none');
        Swal.fire({
            text: "تم اضافة التعليق بنجاح",
            icon: "success"
          });
          setTimeout( ()=>{
            location.href=`book.html?bookId=${id}`
          } ,2000)
    }

}
