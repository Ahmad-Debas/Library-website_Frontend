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
const creatAdminSubmit = document.querySelector(".creatAdmin");
console.log(creatAdminSubmit);
creatAdminSubmit.onsubmit = createAdmin;
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

async function getUsers() {
   // const token = localStorage.getItem("token");

    let { data } = await axios.get(`${url}user`);
    books = data.books;
    return data.users;
}
async function displayUsers() {
    const users = await getUsers();


   const result= users.map((ele) => {
        return `<tr  data-id='${ele._id}'>

        <td>
            <p class="mb-0">${ele.userName} ${ele.online==true?`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#13cf13" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/></svg>`:''}</p>
        </td>
        <td>
        <p class="mb-0">${ele.email}</p>

    </td>

    <td>
    <p class="mb-0">${ele.status}</p>
    </td>

    <td>
    <p class="mb-0">${ele.role}</p>


    </td>
        <td class="text-center">
            <div class="action-btns">

                <a href="edit.html?id=${
                    ele._id
                }" class="action-btn btn-edit bs-tooltip me-2" data-toggle="tooltip" data-placement="top" title="" data-bs-original-title="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                </a>
            </div>
        </td>
    </tr>`;
    });

    document.querySelector(".users").innerHTML = result;
}
 async function getUser(id){

    const {data} = await axios.get(`${url}user/${id}`);
    return data;
 }
 async  function editItem() {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    const data = await getUser(id);
    console.log(data);
    const user =data.user;
    const status = document.querySelector('.status');
    const role = document.querySelector('.role');
    user.status=='Active'?status.children[0].setAttribute('selected','selected'):status.children[1].setAttribute('selected','selected')
    user.role=='User'?role.children[0].setAttribute('selected','selected'):role.children[1].setAttribute('selected','selected')

    };

  async function createAdmin(e){
    e.preventDefault();
    const elements = e.target.elements;
    const userName = elements[0].value;
    const email = elements[1].value;
    const phone = elements[2].value;
    const password = elements[3].value;
    const  role ='Admin';

    const {data} = await axios.post(`${url}auth/signup`,{
        userName,
email,
phone,
password,
role
    });
    if(data.message=='success'){
        Swal.fire({
            title: " اضافة ادمن",
            text: "تم اضافة ادمن  بنجاح",
            icon: "success",
          });
          setTimeout(() => {
            location.href = "index.html";
        }, 3000);
    }

  }
  async function updateUser(e) {
    e.preventDefault();
    const status= document.querySelector('.status').value;
    const role= document.querySelector('.role').value;
    const token  = localStorage.getItem("token");

    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");

    const { data } = await axios.patch(`${url}user/updateUser/${id}`, {status,role}, {
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
                <td><button onclick="returnBook('${data.order._id}','${id}')" class="btn btn-info">ارجاع</button></td>
            </tr>
        `;
    });


        document.querySelector(".borrowBooks").innerHTML=result;

}

async function returnBook(orderId,userId){
    console.log(orderId);
    console.log(userId)

}
