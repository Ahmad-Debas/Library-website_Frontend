var url = `http://localhost:3000/`;
const registerClick = document.querySelector("#registerClick");
const loginClick = document.querySelector("#loginClick");
const logoutClick = document.querySelector(".logout");
const sendCodeClick = document.querySelector("#sendCodeClick");
const updatePasswordClick = document.querySelector("#updatePasswordClick");
registerClick?.addEventListener("click",function(e){
    e.preventDefault();
    register();
})
loginClick?.addEventListener("click",function(e){
    e.preventDefault();
    login();
})
logoutClick?.addEventListener("click",function(e){
    e.preventDefault();
    logout();
})
sendCodeClick?.addEventListener("click",function(e){
    e.preventDefault();
    sendCode();
})
updatePasswordClick?.addEventListener("click",function(e){
    e.preventDefault();
    updatePassword();
})
async function register(){
    document.querySelector(".overlay").classList.remove('d-none');

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const userName = document.querySelector("#name").value;
    const phone = document.querySelector("#phone").value;

    try{
    const {data} = await axios.post(`${url}auth/signup`,{userName,email,phone,password});
    if(data.message=='success'){
        document.querySelector(".overlay").classList.add('d-none');

        Swal.fire({
            title: "تم انشاء الحساب بنجاح!",
            text: "يرجى تاكيد البريد الإلكتروني لتتمكن من تسجيل الدخول!",
            icon: "success"
          });
    }
}catch(error){
    document.querySelector(".overlay").classList.add('d-none');
    console.log(error);
    Swal.fire({
        text: error.response.data.message,
        icon: "danger"
      });
}

}
async function login(){
    document.querySelector(".overlay").classList.remove('d-none');

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    try{
        const {data} = await axios.post(`http://localhost:3000/auth/login`,{email,password});
        if(data.message=='success'){
            localStorage.setItem("token",data.token);
    document.querySelector(".overlay").classList.add('d-none');

            location.href='index.html';
        }
    }catch(error){
    document.querySelector(".overlay").classList.add('d-none');
        Swal.fire({
            title: "خطا في تسجيل الدخول!",
            text: error.response.data.message,
            icon: "danger"
          });

    }

}
async function sendCode(){
    document.querySelector(".overlay").classList.remove('d-none');
try{


    const email = document.querySelector("#email").value;
    const {data} = await axios.patch(`${url}auth/sendCode`,{email});
    if(data.message=='success'){
    document.querySelector(".overlay").classList.add('d-none');

        Swal.fire({
            title: "تعديل كلمة المرور !",
            text: "تم ارسال رمز الى بريدك الإلكتروني !",
            icon: "success"
          });
          setTimeout( ()=>{
            location.href='updatePassword.html';
          },3000)


    }
}catch(error){
    document.querySelector(".overlay").classList.add('d-none');

    Swal.fire({
        text: "حدث خطا ما!",
        icon: "danger"
      });
}
}
async function updatePassword(){
    document.querySelector(".overlay").classList.remove('d-none');

    const email = document.querySelector("#email").value;
    const code = document.querySelector("#code").value;
    const password = document.querySelector("#password").value;
    try{


    const {data} = await axios.patch(`${url}auth/forgotPassword`,{email,code,
        password});
    if(data.message=='success'){
        Swal.fire({
            title: "تعديل كلمة المرور !",
            text: "تم تعديل كلمة المرور بنجاح",
            icon: "success"
          });
    document.querySelector(".overlay").classList.add('d-none');

          setTimeout( ()=>{
            location.href='login.html';
          },3000)
        }

    }catch(error){
    document.querySelector(".overlay").classList.add('d-none');
    Swal.fire({
        text: error.response.data.message,
        icon: "danger"
      });
    }
}
const logout = ()=>{
    localStorage.removeItem("token");
    location.href='index.html';
}
const getUserDataWithToken = async (token)=>{
    try{
        const {data} = await axios.get(`${url}user/token`,
        {headers:{authorization:`Library__${token}`}});
        user= data.user;
        document.querySelector(".overlay").classList.add('d-none');
        return user;

    }catch(error){
        console.log(error);
        document.querySelector(".overlay").classList.add('d-none');


    }

}
const checkUser = async ()=>{

    document.querySelector(".overlay").classList.remove('d-none');

    if(localStorage.getItem('token')){
        const token = localStorage.getItem('token');
        const user=  await getUserDataWithToken(token);
        document.querySelector(".auth-icons").classList.remove('d-none');
        document.querySelector("#not-authLink").classList.add("hide-auth");
        document.querySelector("#authLink").classList.remove("hide-auth");
        document.querySelector("#userName").textContent=user.userName
        document.querySelector(".cart-count").textContent=await getCartCount();

    }
    document.querySelector(".overlay").classList.add('d-none');

    console.log( document.querySelector(".overlay").classList.contains('d-none'))


}
checkUser();
const getCartCount = async()=>{
    const token= localStorage.getItem('token');
    const {data} = await axios.get(`${url}cart`,{headers:{authorization:`Library__${token}`}});
    return data.count;
}
const searchBook = async()=>{
    const bookName = document.querySelector(".bookSearchName").value;

    location.href=`books.html?page=1&search=${bookName}`;
}



const footerOffset = document.querySelector("footer").offsetTop;
document.querySelector("body").style.height=footerOffset+"px";

