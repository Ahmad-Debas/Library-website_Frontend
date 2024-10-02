const contactForm = document.querySelector(".contactForm");
contactForm.onsubmit = async function(e){
    document.querySelector(".overlay").classList.toggle("d-none");
    e.preventDefault();
    try{


    const elements = e.target.elements;
    const name = elements['name'].value;
    const email = elements['email'].value;
    const message = elements['message'].value;

    console.log(name, email, message);

    const {data} = await axios.post(`http://localhost:3000/user/contact`,{
    name,email,message
    });

    if(data.message=='success'){
        document.querySelector(".overlay").classList.toggle("d-none");
        Swal.fire({
            title: " ارسال ايميل ",
            text: "تم ارسال الإيميل  بنجاح",
            icon: "success"
          });


          setTimeout( ()=>{
            location.href="contact.html"
          },2000)
    }

}catch(error){
    document.querySelector(".overlay").classList.toggle("d-none");

    Swal.fire({
        text: error.response.data.message,
        icon: "danger"
      });
}
}

const getQuestions = async()=>{
    const {data} = await axios.get('http://localhost:3000/question');
    return data.questions;
}

const displayQuestions = async () => {
    try {
        const questions = await getQuestions(); // استرجاع الأسئلة من الخادم

        // إنشاء قائمة الأسئلة باستخدام خاصية map
        const questionList = questions.map((question,index) => {

            return `
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index+1}" aria-expanded="false" aria-controls="collapse${index+1}">
                            ${question.question}
                        </button>
                    </h2>
                    <div id="collapse${index+1}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>${question.answer}</strong>
                            <!-- يمكنك إضافة أي تفاصيل إضافية لكل سؤال هنا -->
                        </div>
                    </div>
                </div>
            `;
        }).join(''); // دمج هياكل الـ accordion في سلسلة واحدة

        // إعداد عنصر الـ accordion الرئيسي
        const accordionElement = document.querySelector("#accordionExample");
        accordionElement.innerHTML = questionList; // إضافة الـ accordion إلى عنصر HTML الرئيسي
    } catch (error) {
        console.error("Error displaying questions:", error);
    }
};

// استدعاء الدالة لعرض الأسئلة عند تحميل الصفحة
displayQuestions();



displayQuestions();
