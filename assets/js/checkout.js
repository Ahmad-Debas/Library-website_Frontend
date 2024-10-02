const getCart = async () => {
    const token = localStorage.getItem('token');
    const { data } = await axios.get(`${url}cart`, { headers: { authorization: `Library__${token}` } });
    return data;
}

const displayCart = async () => {
    document.querySelector(".overlay").classList.remove('d-none');
    const { data } = await axios.get(`${url}delivary`);
    const delivaryPrice = data.delivary.finalPrice;
    const order = await getCart();
    console.log(order)
    const books = order.cart;
    if(books.length == 0){
        location.href="index.html";
    }
    let sumfinalPrie=0;
    if(order.type=='purchase'){
         sumfinalPrice = books.reduce((sum, book) => sum + book.details.hardCopyPrice, 0)

    }else{
         sumfinalPrice = books.reduce((sum, book) => sum + book.details.finalPrice, 0)

    }
    const result = books.map(book =>
        `<li class="list-group-item d-flex justify-content-between align-items-center">
        ${book.details.name}
    <span class="badge bg-primary">السعر: ${order.type=='purchase'?book.details.hardCopyPrice:book.details.finalPrice} $</span>

  </li>
    `);
    document.querySelector(".checkout .list-group").innerHTML = result +
        `
  <li class="list-group-item d-flex justify-content-between align-items-center">
  التوصيل
  <span class="badge bg-warning text-dark">السعر : ${delivaryPrice}</span>
</li>
  `;

    document.querySelector(".finalPrice").textContent = sumfinalPrice + delivaryPrice;
    document.querySelector(".type").setAttribute("value",order.type);
    document.querySelector(".overlay").classList.add('d-none');




}

displayCart();

const createFormBtn = document.querySelector(".createForm");

createFormBtn?.addEventListener("submit", function (e) {
    e.preventDefault();
    createOrder(e);
})
async function createOrder(e) {
   try{
    document.querySelector(".overlay").classList.remove('d-none');

    const elements = e.target.elements;
    const phone = elements['phone'].value;
    const address = elements['address'].value
    const paymentType = elements['paymentMethod'].value
    const type = elements['type'].value


    const token = localStorage.getItem('token');
    const { data } = await axios.post(`http://localhost:3000/order`, { phone, address,paymentType,type },
    {
        headers:{authorization:`Library__${token}`}
    });

    if(data.message=='success'){
    document.querySelector(".overlay").classList.add('d-none');

        Swal.fire({
            title: "اضافة طلب جديد",
            text: "تم اضافة الطلب بنجاح وهو قيد المراجعة حالياً",
            icon: "succes",
          });

          setTimeout(()=>{
            location.href="profile.html"
          },2000)
    }
   }catch(error){
    console.log(error);
    document.querySelector(".overlay").classList.add('d-none');

    if(error.response?.status==409){
        Swal.fire({
            title: "اضافة طلب جديد",
            text: "لا يمكن انشاء طلب الآن , يوجد لديك طلب معلق",
            icon: "error",
          });
    }else{
        Swal.fire({
            title: "اضافة طلب جديد",
            text: "حدث خطا ما, تاكد من تعبئة البيانات بشكل صحيح",
            icon: "error",
          });
    }
   }







}



