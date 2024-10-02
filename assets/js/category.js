const getBookCategory =async  ()=>{
    const id = document.URL.split("?id=")[1]
    const {data} = await axios.get(`${url}category/${id}`);
    return data.category;
    }

    const displayBooksWitCategory = async()=>{
        const categories = await getBookCategory();
        const books = categories.books;
       const result= books.map( (book)=>
       `<div class=" col-lg-3 col-md-4">
       <div class="book card gap-3">
           <div class="card-header d-flex flex-column gap-2">
               <h3 class="card-title"> ${book.name}</h3>
               <h4 class="card-subtitle">${book.author} </h4>
           </div>
           <div class="card-body">
               <img src=${book.mainImage.secure_url} class="img-fluid" />
           </div>
           <div class="card-footer d-flex justify-content-between">
               <svg width="30" height="30" viewBox="0 0 18 18" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                   <path fill-rule="evenodd" clip-rule="evenodd"
                       d="M5.32993 5.26685V5.26692H4.05015C3.68006 5.26692 3.37153 5.55014 3.33992 5.91888L2.54562 15.1857C2.50995 15.6019 2.83815 15.9594 3.25585 15.9594H14.5337C14.9514 15.9594 15.2796 15.6019 15.2439 15.1857L14.4496 5.91888C14.418 5.55014 14.1095 5.26692 13.7394 5.26692H12.4582V5.26685C12.4582 3.29842 10.8625 1.7027 8.89409 1.7027C6.92566 1.7027 5.32993 3.29842 5.32993 5.26685ZM6.75532 5.26687V5.26692H11.0323V5.26687C11.0323 4.08582 10.0749 3.12838 8.89381 3.12838C7.71276 3.12838 6.75532 4.08582 6.75532 5.26687ZM8.89284 10.9694C10.8458 10.9694 12.4319 9.39869 12.4567 7.4516C12.4577 7.43627 12.4582 7.42082 12.4582 7.40524C12.4582 7.01156 12.139 6.69241 11.7454 6.69241C11.3517 6.69241 11.0325 7.01156 11.0325 7.40524V7.40538H11.0313C11.0313 8.58644 10.0738 9.54387 8.89278 9.54387C7.72469 9.54387 6.77534 8.60735 6.75463 7.44421C6.75532 7.43131 6.75568 7.41831 6.75568 7.40524C6.75568 7.01156 6.43653 6.69241 6.04285 6.69241C5.64916 6.69241 5.33001 7.01156 5.33001 7.40524V7.40538H5.32934V7.33664C5.3289 7.35947 5.32869 7.38236 5.32869 7.4053C5.32869 9.37372 6.92441 10.9694 8.89284 10.9694Z"
                       fill="#F39421" />
               </svg>
               <a href="book.html?bookId=${book._id}" class="btn btn-lg btn-outline-info book-details">التفاصيل</a>
               <div class="price d-flex gap-2">
               <span class="finalPrice">$${book.finalPrice}</span>
               <span class="price text-decoration-line-through">$${book.price}</span>

               </div>

           </div>
       </div>
   </div>
       `
        ).join('');
        console.log(categories);
        document.querySelector(".categoryName").innerHTML=categories.name
        document.querySelector(".books").innerHTML = result;
    }


    displayBooksWitCategory();
    const getCategories =async ()=>{
        let {data} = await axios.get(`${url}category/active`);
        return data.category;
    }
    const displayCategories =async ()=>{
        const categories = await getCategories();
     const  result= categories.map((ele)=>
       `<li><a class="dropdown-item" href="category.html?id=${ele._id}">${ele.name}</a></li>`).join('')
        document.querySelector("#categories").innerHTML=result;

    }
    displayCategories();
