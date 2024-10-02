let url = `http://localhost:3000/`;

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

async function getOrders() {
   const token = localStorage.getItem("token");
    let { data } = await axios.get(`${url}order/allOrders`,{
        headers: { Authorization: `Library__${token}`},
    });
    return data.orders;

}
async function displayOrders() {

    const orders = await getOrders();

   const result = orders.map((ele) => {
        return `<tr>

        <td>
            <p class="mb-0">${ele.userId.userName}</p>
        </td>
        <td>
        <p class="mb-0">${ele.address}</p>

    </td>

    <td>
    <p class="mb-0">${ele.phone}</p>
    </td>

    <td>
    <p class="mb-0">${ele.finalPrice}</p>
    </td>
    <td>
    ${ele.status=='pending' ?
    `
    <form>
        <input type="text" class="duration" value='${ele.duration??0}' required/>
        <input type="submit" value="اعتماد" onClick="addDuration(event,'${ele._id}')" class="btn btn-outline-secondary"  />
    </form>`:`${ele.duration}`}
  </td>


  <td>
    ${ele.type}
  </td>
    <td>

    <p class="mb-0">${ele.status}</p>
    </td>
      <td data-id=${ele._id}>

      ${ele.status=='pending' ? "<button onclick=\"changeStatus(event,'confirmed')\" class='btn btn-info' >الموافقة</button> <button class='btn btn-danger' onclick=\"changeStatus('cancelled')\">الغاء</button>" : ''}
      ${ele.status=='confirmed' ? "<button onclick=\"changeStatus(event,'onWay')\" class='btn btn-info' >الى التوصيل</button>   <button class='btn btn-danger' onclick=\"changeStatus('cancelled')\">الغاء</button>" : ''}
      ${ele.status=='onWay' ? "<button onclick=\"changeStatus(event,'deliverd')\" class='btn btn-info' >تم التسليم</button>   <button class='btn btn-danger' onclick=\"changeStatus('cancelled')\">الغاء</button>" : ''}
      ${ele.status=='deliverd' ? "<span class='badge badge-danger'>تم الإستلام</span>  <button onclick=\"changeStatus(event,'return')\" class='btn btn-info'>ارجاع الكتب</button>":''}
      ${ele.status=='return' ? "<span class='badge badge-success'>تم </span>":''}
      </td>


    </tr>`;
    });

    document.getElementById("orders").innerHTML = result;
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

 async function getBook(id){

    const {data} = await axios.get(`${url}book/${id}`);
    return data;
 }
 async  function editItem() {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    const data = await getBook(id);
    const book =data.book;
    document.getElementsByName("name")[0].value = book.name;
    document.getElementsByName("description")[0].value = book.description;
     document.getElementsByName("price")[0].value = book.price;
    document.getElementsByName("discount")[0].value = book.discount;
     document.getElementsByName("stock")[0].value = book.stock;
     document.getElementsByName("author")[0].value = book.author
     document.querySelector(".currentImage").setAttribute("src",book.mainImage.secure_url)
     displayCategories(book.categoryId);
    };

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


async function changeStatus(event,status){
    const id =event.target.closest('td').dataset.id;
    console.log(id);
    const token = localStorage.getItem('token');
    const {data} = await axios.patch(`${url}order/changeStatus/${id}`,{status:status},
    {
        headers:{
            authorization:`Library__${token}`
        }
    });

    console.log(data);

}


async function addDuration(e,orderId){
    e.preventDefault();
    const token = localStorage.getItem('token');
    const duration = document.querySelector(".duration").value;
    console.log(token);

    const {data} = await axios.patch(`${url}order/addDuration/${orderId}`,{duration},
    {
        headers:{
            authorization:`Library__${token}`
        }    });
    if(data.message=='success'){
        Swal.fire({
            title: "تعديل عنصر",
            text: "تم تعديل المدة بنجاح",
            icon: "success",
          });
          setTimeout(() => {
            location.href = "index.html";
        }, 3000);
    }
    }

