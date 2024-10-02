const getOrders = async()=>{
    const token = localStorage.getItem("token");
    const {data} = await axios.get(`${url}order`,
    {
        headers:{authorization:`Library__${token}`}
    }
    );
    return data.orders;
}

const displayOrders = async () => {
    const orders = await getOrders();

    const result = orders.map((order, index) => {
        document.querySelector(".orders").innerHTML +=
            `<tr>
                <td>${index + 1}</td>
                <td>${order.createdAt}</td>
                <td>${order.finalPrice}</td>
                <td>${order.status}</td>
            </tr>`;

        order.books.forEach((book, bookIndex) => {
            document.querySelector(".booksOrders").innerHTML +=
                `<tr>
                    <td>${bookIndex + 1}</td>
                    <td>${book.name}</td>
                    <td>${book.finalPrice}</td>
                        ${order.status=='deliverd'?`<td><a href="${(book.bookId.pdf)?book.bookId.pdf.secure_url:'#'}"
                        target="_blank">${(book.bookId.pdf)?'تحميل':'غير متاح'}</a></td>
                        `:`<td>لا يمكن تحميل الملف حالياً بإنتظار اتمام الطلب</td>`
                    }
                </tr>`;
        });

    });
}

displayOrders();

const displayUserInfo = async()=>{

    const token = localStorage.getItem('token');
    const user =await getUserDataWithToken(token);
    console.log(user);
    document.querySelector("#name").value=user.userName
    document.querySelector("#email").value=user.email
    document.querySelector("#phone").value=user.phone

}
displayUserInfo();
$(document).ready(function() {
    // عند الضغط على رابط معلوماتك
    $(".info-link").click(function(event) {
        event.preventDefault(); // لمنع التصفح الافتراضي
        $(".orders, .booksOrders").hide(); // إخفاء جدول الطلبات والكتب
        $(".profile-form").show(); // عرض النموذج
    });

    // عند الضغط على رابط طلباتك
    $(".orders-link").click(function(event) {
        event.preventDefault(); // لمنع التصفح الافتراضي
        $(".profile-form").hide(); // إخفاء النموذج
        $(".orders, .booksOrders").show(); // عرض جدول الطلبات والكتب
    });

    // اخفاء النموذج عند التحميل الأول
    $(".profile-form").hide();
});


const updateUserForm = document.querySelector(".updateUserForm");
updateUserForm.addEventListener("submit",async (e)=>{
    document.querySelector(".overlay").classList.remove('d-none');
    const token = localStorage.getItem("token");
    e.preventDefault();
    const elements = e.target.elements;
    const userName = elements['userName'].value;
    const email = elements['email'].value;
    const password = elements['password'].value;
    const phone = elements['phone'].value;

    const user ={
        userName,email,password,phone
    }
try{


    const {data} = await axios.patch('http://localhost:3000/user/updateInfo',user,
    {
        headers:{authorization:`Library__${token}`}
    })
    console.log(data);
    if(data.message=='success'){
    document.querySelector(".overlay").classList.add('d-none');
    Swal.fire({
        title: " ارسال ايميل ",
        text: "تم ارسال الإيميل  بنجاح",
        icon: "success"
      });


      setTimeout( ()=>{
        location.href="contact.html"
      },2000)

    }
}catch(error){
    document.querySelector(".overlay").classList.add('d-none');

    Swal.fire({
        text: error.response.data.message,
        icon: "danger"
      });
}
})
