const searchBtn=document.querySelector("#search");
const searchInput=document.querySelector("#input");
const tempElem=document.querySelector(".temp");
const locationElem=document.querySelector(".location");
const windElem=document.querySelector(".wind");
const cloudElem=document.querySelector(".clouds");


async function fetchWeather(location){
    const url=`https://api.weatherapi.com/v1/current.json?key=39d0ef0433674dd986462833242007&q=${location}&aqi=yes`
    const response=await fetch(url);
    if(response.status == 400){
        alert("location is invalid!");
        return null;
    }
    else if(response.status == 200){
        const json= await response.json();
        return json;
    }
}

function updateDOM(data){
    console.log("I will update the DOM",data);
    const temp=data.current.temp_c;
    const location=data.location.name;
    const condition=data.current.condition.text;
    const src=data.current.condition.icon;
    tempElem.innerHTML=`<i class="fa-solid fa-temperature-three-quarters"></i>${temp}°C`
    locationElem.innerHTML=`<h1><i class="fa-solid fa-location-dot"></i>${location}</h1>`;
    cloudElem.innerHTML=`<div class="condition-box"><img src="${src}"></img> ${condition}</div>`;

}

searchBtn.addEventListener("click",async function(){
    const location=searchInput.value;
    if(location != ""){
        const data=await fetchWeather(location);
        if(data != null){
            updateDOM(data);
        }
        searchInput.value="";
    }
})

