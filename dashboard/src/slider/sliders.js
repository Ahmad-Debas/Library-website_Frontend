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
async function createSlide(e) {
    e.preventDefault();
 const link= document.getElementsByName("link")[0].value;
 const file= document.getElementsByName("mainImage")[0].files[0];

    const formData = new FormData();
    const token = localStorage.getItem("token");
    formData.append("image", file);
    formData.append("link", link);

    const { data } = await axios.post(`${url}slider`, formData, {
        headers: { Authorization: `Library__${token}` },
    });
    if (data.message == "success") {
        Swal.fire({
            title: "اضافة عنصر",
            text: "تم اضافة الصورة بنجاح",
            icon: "success",
          });
          setTimeout(() => {
            location.href = "index.html";
        }, 3000);
    }
    }

async function getSliders() {
    const token = localStorage.getItem("token");

    let { data } = await axios.get(`${url}slider`,
    {
        headers:{authorization:`Library__${token}`}
    }
    );
    return data.sliders;
}
async function displaySliders() {

    const sliders = await  getSliders();
    console.log(sliders);
    const result = sliders.map((ele) => {
        return `<tr  data-id='${ele._id}'>
        <td>
        <div class="media">
            <div class="avatar me-2">
                <img alt="avatar" src="${
                    ele.image.secure_url
                }" class="rounded-circle">
            </div>

        </div>
    </td>
        <td>
            <p class="mb-0">${ele.link}</p>
        </td>
        <td>
        <p class="mb-0">${ele.status}</p>

    </td>
        <td class="text-center">
            <div class="action-btns">

                <a href="edit.html?id=${
                    ele._id
                }" class="action-btn btn-edit bs-tooltip me-2" data-toggle="tooltip" data-placement="top" title="" data-bs-original-title="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                </a>
                <a onclick="deleteImage('${ele._id}')"
                class="action-btn btn-delete bs-tooltip " data-toggle="tooltip"
                data-placement="top" title="" data-bs-original-title="Delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></a>
            </div>
        </td>
    </tr>`;
    });

    document.querySelector(".sliders").innerHTML = result;
}

async function deleteImage(id){
    const token = localStorage.getItem('token');

    Swal.fire({
      title: "هل انت متاكد من الحذف ؟",
      showDenyButton: true,
      confirmButtonText: "نعم",
      denyButtonText: `لا`
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let {data} = await axios.delete(`${url}slider/${id}`,{headers:{Authorization:`Library__${token}`} });

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

 async function getSlider(id){

    const {data} = await axios.get(`${url}slider/details/${id}`);
    return data;
 }
 async  function editItem() {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    const data = await getSlider(id);
    const slider =data.slide;
    document.querySelector(".slideImg").setAttribute("src",slider.image.secure_url);
        console.log(slider);
    document.getElementsByName("link")[0].value = slider.link;
    const status = document.querySelector('#status');

    slider.status=='Active'?status.children[0].setAttribute('selected','selected'):status.children[1].setAttribute('selected','selected')
};



  async function updateSlider(e) {
    e.preventDefault();
    const link= document.getElementsByName("link")[0].value;
    const file= document.getElementsByName("mainImage")[0].files[0];
    const status= document.getElementsByName("status")[0].value;

    const formData = new FormData();
    const token = localStorage.getItem("token");
    formData.append("link", link);
    formData.append("image", file);
    formData.append("status", status);

    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");

    const { data } = await axios.patch(`${url}slider/${id}`, formData, {
        headers: { Authorization: `Library__${token}` },
    });
    if (data.message == "success") {
        Swal.fire({
            title: "تعديل عنصر",
            text: "تم تعديل الصورة بنجاح",
            icon: "success",
          });
          setTimeout(() => {
            location.href = "index.html";
        }, 3000);
    }
    }


