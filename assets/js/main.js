var url = `http://localhost:3000/`;
const getHeaderCategories =async ()=>{
    let {data} = await axios.get(`${url}category/active`);
    return data.category;
}
const displayHomeCategories =async ()=>{
    const categories = await getHeaderCategories();
 const  result= categories.map((ele)=>
   `<li><a class="dropdown-item" href="category.html?id=${ele._id}">${ele.name}</a></li>`).join('')
    document.querySelector("#categories").innerHTML=result;

}

async function getPlatforms() {
    let { data } = await axios.get(`${url}setting`);
    return data.platforms;
}
const displayPlatfroms = async ()=>{
    const platforms = await getPlatforms();
    let result = ``;
    result += platforms.map((ele) => {
        return `
        <a href="${ele.link}">
         <img src="${
            ele.image.secure_url
        }" width="img-fluid"/>
        </a>
        `;
    }).join('');

    document.getElementById("platforms").innerHTML = result;
 }


const getAds = async()=>{
    const {data} = await axios.get(`http://localhost:3000/ad/activeAds`);
    return data.ads;
}
const displayAdPosition_one = async()=>{

    const ads = await getAds();
    const ad = ads.find( (ele)=> ele.position==1 )
    document.querySelector(".ads .ad_postion_one").innerHTML=
    `
    <a href=${ad.url}><img src='${ad.image.secure_url}' /></a>
    `;

}
displayPlatfroms();
displayHomeCategories();

displayAdPosition_one();
