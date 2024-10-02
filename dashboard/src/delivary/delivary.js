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


 async function getDelivary(){

    const {data} = await axios.get(`${url}delivary`);
    return data.delivary;
 }
 async function editItem() {
    const delivary = await getDelivary();

    document.getElementsByName("price")[0].value = delivary.price;
    document.getElementsByName("discount")[0].value = delivary.discount;
    document.querySelector(".deliaryFinalPrice").textContent=delivary.finalPrice;

}


  async function updateDelivary(e) {
    e.preventDefault();
    const price= document.getElementsByName("price")[0].value;
    const discount= document.getElementsByName("discount")[0].value;


    const token = localStorage.getItem("token");



    const { data } = await axios.put(`${url}delivary/`, {price,discount}, {
        headers: { Authorization: `Library__${token}` },
    });
    if (data.message == "success") {
        Swal.fire({
            title: "تعديل عنصر",
            text: "تم تعديل التوصيل بنجاح",
            icon: "success",
          });
          setTimeout(() => {
            location.href = "edit.html";
        }, 3000);
    }
    }


