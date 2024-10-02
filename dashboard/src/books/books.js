let url = `http://localhost:3000/`;
url=`http://localhost:3000/`;
let AdminData = {};
async function getLoginAdminData() {
    const token = localStorage.getItem("token");

    const { data } = await axios.get(`${url}user/admin`, {
        headers: { Authorization: `Library__${token}` },
    });
    if (data.message == "success") {
        AdminData = data.user;
        adminName.innerHTML = AdminData.userName;
    }
}
if (localStorage.getItem("token") == null) {
    location.href = "../../src/auth/login.html";
} else {
    getLoginAdminData();
}
async function createBook(e) {
    e.preventDefault();
 const name= document.getElementsByName("name")[0].value;
 const description= document.getElementsByName("description")[0].value;
 const price= document.getElementsByName("price")[0].value;
 const discount= document.getElementsByName("discount")[0].value;
 const stock= document.getElementsByName("stock")[0].value;
 const author= document.getElementsByName("author")[0].value;
 const file= document.getElementsByName("file")[0].files[0];
 const categoryId= document.getElementsByName("categories")[0].value;



    const formData = new FormData();
    const token = localStorage.getItem("token");
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("stock", stock);
    formData.append("author", author);
    formData.append("mainImage", file);
    formData.append("createdBy", AdminData._id);
    formData.append("updatedBy", AdminData._id);
    formData.append("categoryId", categoryId);

    const { data } = await axios.post(`${url}book`, formData, {
        headers: { Authorization: `Library__${token}` },
    });
    if (data.message == "success") {
        Swal.fire({
            title: "اضافة عنصر",
            text: "تم اضافة الكتاب بنجاح",
            icon: "success",
          });
          setTimeout(() => {
            location.href = "index.html";
        }, 3000);
    }
    }

async function getBooks() {
   // const token = localStorage.getItem("token");

    let { data } = await axios.get(`${url}book`);
    books = data.books;
    displayBooks();
}
function displayBooks() {
    let s = ``;

    s += books.map((ele) => {
        return `<tr  data-id='${ele._id}'>
        <td>
        <div class="media">
            <div class="avatar me-2">
                <img alt="avatar" src="${
                    ele.mainImage.secure_url
                }" class="rounded-circle">
            </div>

        </div>
    </td>
        <td>
            <p class="mb-0">${ele.name}</p>
        </td>
        <td>
        <p class="mb-0">${ele.price}</p>

    </td>

    <td>
    <p class="mb-0">${ele.discount}</p>
    </td>

    <td>
    <p class="mb-0">${ele.finalPrice}</p>
    </td>
    <td>
            ${ele.hardCopy==true?'نعم':'لا'}
    </td>
        <td class="text-center">
            <div class="action-btns">
                <a href="javascript:void(0);" class="action-btn btn-view bs-tooltip me-2" data-toggle="tooltip" data-placement="top" title="" data-bs-original-title="View">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </a>
                <a href="edit.html?id=${
                    ele._id
                }" class="action-btn btn-edit bs-tooltip me-2" data-toggle="tooltip" data-placement="top" title="" data-bs-original-title="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                </a>
                <a onclick="deleteBook('${ele._id}')"
                class="action-btn btn-delete bs-tooltip " data-toggle="tooltip"
                data-placement="top" title="" data-bs-original-title="Delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></a>
            </div>
        </td>
    </tr>`;
    });

    document.getElementById("books").innerHTML = s;
}
async function getCategories() {
    let { data } = await axios.get(`${url}category`);
    let allCategories = [];
    categories = data.category;
    allCategories = categories.map((category) => {
        return `<option value="${category._id}">${category.name}</option>`;
    });

    document.querySelector(".categories").innerHTML = allCategories;
}
async function deleteBook(id){
    const token = localStorage.getItem('token');

    Swal.fire({
      title: "هل انت متاكد من الحذف ؟",
      showDenyButton: true,
      confirmButtonText: "نعم",
      denyButtonText: `لا`
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let {data} = await axios.delete(`${url}book/${id}`,{headers:{Authorization:`Library__${token}`} });

    if(data.message=='success'){
     let deletedBook=document.querySelector(`[data-id="${id}"]`);
     deletedBook.remove();
     Swal.fire({
        title: "حذف عنصر",
        text: "تم حذف الكتاب بنجاح",
        icon: "success",
      });


    }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });




 }

 async function getBook(id){

    const {data} = await axios.get(`${url}book/${id}`);
    return data;
 }
 async function editItem() {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    const data = await getBook(id);
    const book = data.book;

    document.getElementsByName("name")[0].value = book.name;
    document.getElementsByName("description")[0].value = book.description;
    document.getElementsByName("price")[0].value = book.price;
    document.getElementsByName("discount")[0].value = book.discount;
    document.getElementsByName("stock")[0].value = book.stock;
    document.getElementsByName("author")[0].value = book.author;
    document.querySelector(".currentImage").setAttribute("src", book.mainImage.secure_url);

    const hardCopyRadios = document.getElementsByName("hardCopy");

    if (book.hardCopy === true) {
        hardCopyRadios[0].checked = true; // القيمة الأولى
        document.querySelector('.hardFinalPrice').value = book.hardCopyPrice;
        document.querySelector('.hardPrice').classList.remove('d-none');
    } else {
        hardCopyRadios[1].checked = true; // القيمة الثانية
    }

    // إضافة مستمع لتغيير قيمة الـ "hardCopy" وإظهار/إخفاء العنصر "hardPrice"
    hardCopyRadios.forEach((radio) => {
        radio.addEventListener('change', function() {
            if (this.value === 'true') {
                document.querySelector('.hardPrice').classList.remove('d-none'); // إزالة الكلاس "d-none"
            } else {
                document.querySelector('.hardPrice').classList.add('d-none'); // إضافة الكلاس "d-none"
            }
        });
    });

    displayCategories(book.categoryId);
}


async function displayCategories (id) {
    try {
      let { data } = await axios.get(`${url}category`);
      categories = data.category;
      const result = categories
        .map(
          (category) =>
            `<option value=${category._id} ${
              category._id == id ? "selected" : ""
            }>${category.name}</option>`
        )
        .join("");
      document.querySelector(".categories").innerHTML = result;
    } catch (error) {
      console.error("Error displaying categories:", error);
    }
  };

  async function updateBook(e) {
    e.preventDefault();
    const name= document.getElementsByName("name")[0].value;
    const description= document.getElementsByName("description")[0].value;
    const price= document.getElementsByName("price")[0].value;
    const discount= document.getElementsByName("discount")[0].value;
    const stock= document.getElementsByName("stock")[0].value;
    const author= document.getElementsByName("author")[0].value;
    const file= document.getElementsByName("mainImage")[0].files[0];
    const categoryId= document.getElementsByName("categories")[0].value;
    const hardFinalPrice= document.getElementsByName("hardFinalPrice")[0].value;


    const hardCopyRadioButtons = document.getElementsByName("hardCopy");
    console.log(hardCopyRadioButtons)
    let hardCopyValue;
    for (let i = 0; i < hardCopyRadioButtons.length; i++) {
        if (hardCopyRadioButtons[i].checked) {
            hardCopyValue = hardCopyRadioButtons[i].value;
            console.log(hardCopyValue);
            break;
        }
    }

    const formData = new FormData();
    const token = localStorage.getItem("token");
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("stock", stock);
    formData.append("author", author);
    formData.append("mainImage", file);
    formData.append("createdBy", AdminData._id);
    formData.append("updatedBy", AdminData._id);
    formData.append("categoryId", categoryId);
    formData.append("hardCopy", hardCopyValue); // Add hardCopy value to formData
    formData.append("hardCopyPrice", hardFinalPrice); // Add hardCopy value to formData


    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");

    const { data } = await axios.put(`${url}book/${id}`, formData, {
        headers: { Authorization: `Library__${token}` },
    });
    if (data.message == "success") {
        Swal.fire({
            title: "تعديل عنصر",
            text: "تم تعديل الكتاب بنجاح",
            icon: "success",
          });
          setTimeout(() => {
            location.href = "index.html";
        }, 3000);
    }
    }


getCategories();



async function getAllUsers(){
    const token = localStorage.getItem("token");
    const {data} = await axios.get(`${url}user/allUsers`,{
        headers:{authorization:`Library__${token}`}
    });

    console.log(data);
    const borrowsUsers = data.users.filter( user=> user.numberBook>0);

    const result= borrowsUsers.map( user=>
        `
         <tr>
            <td>${user.userName}</td>
            <td>${user.numberBook}</td>
            <td><a href="userOrders.html?userId=${user._id}">عرض</a></td>
            <td></td>
         </tr>
        `
        );
        document.querySelector(".users").innerHTML=result;
}


async function getUserOrder(){
    const token = localStorage.getItem("token");
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("userId");
    let {data} = await axios.get(`${url}order/userOrder/${id}`,{
        headers:{authorization:`Library__${token}`}
    });
    document.querySelector(".userBorrowName").textContent = data.order.userId.userName
    const books = data.order.books;
    console.log(data.order);

    const result = books.map(book => {
        // تحويل التاريخ إلى كائن Date
        const createdAtDate = new Date(data.order.createdAt);

        // استخراج جزء من التاريخ
        const formattedDate = createdAtDate.toLocaleDateString(); // أو أي تنسيق آخر حسب الحاجة

        // إعادة العرض
        return `
            <tr>
                <td>${book.name}</td>
                <td>${book.quantity}</td>
                <td>${book.unitPrice}</td>
                <td>${book.finalPrice}</td>
                <td>${formattedDate}</td>
            </tr>
        `;
    });


        document.querySelector(".borrowBooks").innerHTML=result;

}

async function returnBook(orderId,userId){
    console.log(orderId);
    console.log(userId)

}
