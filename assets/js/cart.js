var url = `http://localhost:3000/`;
const getCart = async()=>{
    document.querySelector(".overlay").classList.remove('d-none');

    const token= localStorage.getItem('token');
    const {data} = await axios.get(`${url}cart`,{headers:{authorization:`Library__${token}`}});
    return data;
}
const displayCart= async()=>{
    const data = await getCart();
    const books =data.cart;
    console.log(data);

    console.log(books);
    let subTotal = 0;
    const result = books.map( (book)=>{
    const bookSubTotal = book.details.finalPrice * book.quantity;
    subTotal += bookSubTotal;

    return `
    <div class="row align-items-center">
                            <div class="col-md-3">
                                <div class="book-details text-center d-flex align-items-center">
                                    <div class="book-img">
                                        <img src="${book.details.mainImage.secure_url}" class="w-50" />
                                    </div>
                                    <div class="book-info">
                                        <h3 class="fs-5">   ${book.details.name}</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="price text-center">
                                    <h2>${data.type=='purchase'?book.details.hardCopyPrice:book.details.finalPrice} $</h2>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="quantity  w-content m-auto text-center">
                                    <div class="test">
                                        <button onClick="updateQuantity('${book.bookId}','-')">-</button>
                                        <span>${book.quantity}</span>
                                        <button onClick="updateQuantity('${book.bookId}','+')">+</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="finalPrice text-center">
                                    <h2>${((data.type=='purchase')?book.details.hardCopyPrice:book.details.finalPrice) * book.quantity}$</h2>
                                </div>
                            </div>

                            <div class="col-md-3">
                            <div class="action text-center">
                               <button class="btn btn-outline-danger" onClick="removeFromCart('${book.bookId}')">Remove</button>
                            </div>
                        </div>
                        </div>
                        <div class="divider"></div>


                        `
    }

    ).join('');
    document.querySelector(".cart-info").innerHTML += result + `<div class="d-flex gap-4 align-items-center justify-content-center">
    <button onClick="clearCart()" class="btn btn-danger mt-3">تفريغ السلة</button>
    <a href="checkout.html"  class="btn btn-info align-self-end">اتمام عملية الشراء</a>
    </div>`;

    document.querySelector(".overlay").classList.add('d-none');

}
const updateQuantity = async (bookId,operation)=>{
    document.querySelector(".overlay").classList.remove('d-none');

    const token = localStorage.getItem('token');
    console.log( bookId,operation);
    const {data} = await axios.patch(`http://localhost:3000/cart/updateQuantity`,{
        bookId,operation
    },{
        headers:{authorization:`Library__${token}`}
    })
   if(data.message=='success'){
    document.querySelector(".overlay").classList.add('d-none');

    location.href='cart.html';
   }
}
displayCart();
const removeFromCart = async(bookId)=>{
    document.querySelector(".overlay").classList.remove('d-none');

    const token = localStorage.getItem('token');

    const {data} = await axios.patch(`${url}cart/removeItem`,{bookId},{
        headers:{authorization:`Library__${token}`}
    });

    if(data.message=='success'){
    document.querySelector(".overlay").classList.add('d-none');

        Swal.fire({
            title: "اضافة الكتاب للسلة",
            text: "تم ازالة الكتاب من السلة",
            icon: "success"
          });

          setTimeout( ()=>{
            location.href='cart.html'
          },1000)
    }
}
const clearCart = async()=>{
    document.querySelector(".overlay").classList.remove('d-none');

    const token = localStorage.getItem('token');

    const {data} = await axios.patch(`${url}cart/clear`,{},{
        headers:{authorization:`Library__${token}`}
    });

    if(data.message=='success'){
    document.querySelector(".overlay").classList.add('d-none');

        Swal.fire({
            title: "تفريغ السلة",
            text: "تم ازالة جميع الكتب من السلة",
            icon: "success"
          });

          setTimeout( ()=>{
            location.href='cart.html'
          },1000)
    }
}
const displayAdPosition_three = async()=>{

    const ads = await getAds();
    const ad = ads.find( (ele)=> ele.position==3)
    console.log(ad);
    document.querySelector(".ads .ad_postion_three").innerHTML=
    `
    <a href=${ad.url}><img src='${ad.image.secure_url}' /></a>
    `;

}
