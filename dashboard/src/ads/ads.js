let categories = [];
let ads = [];
let url = `http://localhost:3000/`;


let AdminData={};
getAds();
async function getLoginAdminData(){
    const token =localStorage.getItem("token");

    const {data} = await axios.get(`${url}user/admin`
    ,{headers: {Authorization:`Library__${token}`} });
    if(data.message=='success'){
        AdminData = data.user;
        adminName.innerHTML=AdminData.userName
    }
}

if(localStorage.getItem("token") == null){
    location.href='../../src/auth/login.html';
}else{
    getLoginAdminData();
}

async function createAd(e){

    e.preventDefault();
    const position = document.querySelector("#position").value;
    const url_ = document.querySelector("#url").value;
    const file = document.querySelector("#file").files[0];
    const formData = new FormData();
    const token =localStorage.getItem("token");

    formData.append('position',position);
    formData.append('mainImage',file);
    formData.append('url',url_);
    formData.append('createdBy',AdminData._id);
    formData.append('updatedBy',AdminData._id);
   const {data} = await axios.post(`${url}Ad`,formData,{headers:{Authorization:`Library__${token}`} });
   if(data.message=='success'){
    Swal.fire({
        title: "اضافة اعلان جديد",
        text: "تم اضافة الإعلان بنجاح",
        icon: "success",
      });

      setTimeout( ()=>{
        location.href='index.html'
       },3000 )
   }

   setTimeout( ()=>{
    location.href='index.html'
   },3000 )

   }

async function getAds(){
    const token =localStorage.getItem("token");

    let {data} = await axios.get(`${url}ad`,{headers:{Authorization:`Library__${token}`}});
    ads=data.ads;

    displayAds();
}
async function getAd(){
    const url_array = document.URL.split('?id=');
    const id = url_array[1];
 const {data} = await axios.get(`${url}ad/${id}`);
    const status = document.querySelector('#status');

    if(data.message=='success'){
        const ad = data.ad;
        document.querySelector("#old_position").value=ad.position;
        document.querySelector("#old_image").src=ad.image.secure_url;
        document.querySelector("#ad_id").value=ad._id;
        document.querySelector("#old_url").value=ad.url;

        ad.status=='Active'?status.children[0].setAttribute('selected','selected'):status.children[1].setAttribute('selected','selected')


    }
}
function displayAds(){
    let s = ``;

    s+=ads.map( (ele)=>{
        return `<tr  data-id='${ele._id}'>
        <td>
        <div class="media">
            <div class="avatar me-2">
                <img alt="avatar" src="${ele.image.secure_url}" class="rounded-circle">
            </div>

        </div>
    </td>
        <td>
            <p class="mb-0">${ele.position}</p>
        </td>
        <td>
        <p class="mb-0">${ele.url}</p>
    </td>

        <td class="text-center">

            <span class="badge badge-light-${ele.status=='Active'?'success':'danger'}"  >${ele.status=='Active'?'فعال':'غير فعال'}</span>


         </td>


        <td class="text-center">
            <div class="action-btns">

                <a href="edit.html?id=${ele._id}" class="action-btn btn-edit bs-tooltip me-2" data-toggle="tooltip" data-placement="top" title="" data-bs-original-title="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                </a>
                <a onclick="deleteAd('${ele._id}')"
                class="action-btn btn-delete bs-tooltip " data-toggle="tooltip"
                data-placement="top" title="" data-bs-original-title="Delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></a>
            </div>
        </td>
    </tr>`
    } )

    document.getElementById("ads").innerHTML=s;

}

async function updateAd(e){
    try{


    e.preventDefault();
    const token =localStorage.getItem("token");
    const position = document.querySelector("#old_position").value;
    const id = document.querySelector("#ad_id").value;
    const status = document.querySelector("#status").value;
    const old_url = document.querySelector("#old_url").value;
    const formData = new FormData();
    if(document.querySelector("#file").files.length!=0){
        const file = document.querySelector("#file").files[0];
        formData.append('mainImage',file);
    }
    formData.append('position',position);
    formData.append('status',status);
    formData.append('url',old_url);
    //formData.append('updatedBy',AdminData._id);
   const {data} = await axios.put(`${url}ad/${id}`,formData,{headers:{Authorization:`Library__${token}`} });
   if(data.message=='success'){
    Swal.fire({
        title: "تعديل التصنيف ",
        text: "تم تعديل التصنيف بنجاح",
        icon: "success",
      });

      setTimeout( ()=>{
        location.href='index.html'
       },3000 )
   }
    }catch(error){
        Swal.fire({
            title: "تعديل الإعلان ",
            text: "حدثت مشكلة اثناء تحديث الإعلان يرحى التاكد من القيم المدخلة",
            icon: "error",
          });
    }
}

 async function deleteAd(id){
    const token = localStorage.getItem('token');

    Swal.fire({
      title: "هل انت متاكد من الحذف ؟",
      showDenyButton: true,
      confirmButtonText: "نعم",
      denyButtonText: `لا`
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let {data} = await axios.delete(`${url}ad/${id}`,{headers:{Authorization:`Library__${token}`} });

    if(data.message=='success'){
     let deletedCategory=document.querySelector(`[data-id="${id}"]`);
     deletedCategory.remove();
     Swal.fire({
        title: "حذف عنصر",
        text: "تم حذف الإعلان بنجاح",
        icon: "success",
      });


    }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });




 }

 getAds();
