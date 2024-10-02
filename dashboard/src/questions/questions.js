
let url=`http://localhost:3000/`;
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
async function createQuestion(e) {
    e.preventDefault();

 const question= document.getElementsByName("question")[0].value;
 const answer= document.getElementsByName("answer")[0].value;



    const token = localStorage.getItem("token");


    const { data } = await axios.post(`${url}question`, {question,answer}, {
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

async function getQuestions() {
   // const token = localStorage.getItem("token");

    let { data } = await axios.get(`${url}question`);
    questions = data.questions;
    displayQuestions();
}
function displayQuestions() {

   const s= questions.map((ele) => {
        return `<tr  data-id='${ele._id}'>

        <td>
            <p class="mb-0">${ele.question}</p>
        </td>
        <td>
        <p class="mb-0">${ele.answer}</p>

    </td>

        <td class="text-center">
            <div class="action-btns">

                <a href="edit.html?id=${
                    ele._id
                }" class="action-btn btn-edit bs-tooltip me-2" data-toggle="tooltip" data-placement="top" title="" data-bs-original-title="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                </a>
                <a onclick="deleteQuestion('${ele._id}')"
                class="action-btn btn-delete bs-tooltip " data-toggle="tooltip"
                data-placement="top" title="" data-bs-original-title="Delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></a>
            </div>
        </td>
    </tr>`;
    });

    document.getElementById("questions").innerHTML = s;
}

async function deleteQuestion(id){
    const token = localStorage.getItem('token');

    Swal.fire({
      title: "هل انت متاكد من الحذف ؟",
      showDenyButton: true,
      confirmButtonText: "نعم",
      denyButtonText: `لا`
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let {data} = await axios.delete(`${url}question/${id}`,{headers:{Authorization:`Library__${token}`} });

    if(data.message=='success'){
     let deletedQuestion=document.querySelector(`[data-id="${id}"]`);
     deletedQuestion.remove();
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

 async function getQuestion(id){

    const {data} = await axios.get(`${url}question/${id}`);
    return data;
 }
 async function editItem() {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    const data = await getQuestion(id);
    const question = data.question
    document.getElementsByName("question")[0].value = question.question;
    document.getElementsByName("answer")[0].value = question.answer;

}


  async function updateQuestion(e) {
    e.preventDefault();
    const question= document.getElementsByName("question")[0].value
    const answer=  document.getElementsByName("answer")[0].value
    const token = localStorage.getItem("token");

    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");

    const { data } = await axios.put(`${url}question/${id}`, {question,answer}, {
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
