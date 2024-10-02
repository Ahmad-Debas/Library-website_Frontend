const addPolicy = document.getElementById("addPolicy");
const editPolicy = document.getElementById("editPolicy");


let url = `http://localhost:3000/`;

const createPolicy = async (e)=>{
    e.preventDefault();
    const token = localStorage.getItem("token");
    const elements = e.target.elements;
    const title = elements.title.value;
    const description = elements.description.value;

    const {data}  = await axios.post(`${url}policy`,{title, description},
    {headers:{
        Authorization:`Library__${token}`
    }});

    console.log(data);

}


addPolicy?.addEventListener("submit",createPolicy);
editPolicy?.addEventListener("submit",updatePolicy)


let AdminData={};
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



async function updatePolicy(e){
    e.preventDefault();
    const token = localStorage.getItem("token");
    const elements = e.target.elements;
    const title = elements.title.value;
    const description = elements.description.value;
    console.log(elements.description.value);

    const {data}  = await axios.patch(`${url}policy`,{title, description},
    {headers:{
        Authorization:`Library__${token}`
    }});

}

async function getPolicy(){

    const {data} = await axios.get(`${url}policy`);
    return data.policy;
}

 async  function editItem() {
    const policy = await getPolicy();
    document.getElementsByName("title")[0].value = policy.title;

    document.getElementsByName("description")[0].value  = policy.description;
    };
