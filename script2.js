const locationElem=document.querySelector("#location");
const tempElem=document.querySelector(".temp");
const feelElem=document.querySelector(".feel");
const windElem=document.querySelector(".wind");
const speedElem=document.querySelector(".speed");
const degreeElem=document.querySelector(".Degree");
const chillElem=document.querySelector(".chill");
const heatElem=document.querySelector(".heat");
const rainElem=document.querySelector(".cloud");
const dewElem=document.querySelector(".dew");
const uvElem=document.querySelector(".uv");
const aqiElem=document.querySelector(".aqi");
const searchBtn=document.querySelector("#search");
const searchInput=document.querySelector("#input");

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
function updateDOM(data){
    console.log("I will update the DOM",data);
    const temp=data.current.temp_c;
    const feel=data.current.feelslike_c;
    const wind=data.current.wind_kph;
    const speed=data.current.wind_mph;
    const degree=data.current.wind_degree;
    const dir=data.current.wind_dir;
    const chill=data.current.windchill_c;
    const heat=data.current.heatindex_c;
    const rain=data.current.precip_mm;
    const dew=data.current.dewpoint_c;
    const UV=data.current.uv;
    const aqi=data.current.air_quality;
    tempElem.innerHTML=`<i class="fa-solid fa-temperature-three-quarters"></i>${temp}°C`
    feelElem.innerHTML=`<i class="fa-solid fa-temperature-empty"></i>${feel}(feel)`
    windElem.innerHTML=`<i class="fa-solid fa-wind"></i>${wind}km/hr`
    speedElem.innerHTML=`<i class="fa-solid fa-wind"></i>${speed}m/hr`
    degreeElem.innerHTML=`<i class="fa-solid fa-location-arrow"></i>${degree} ${dir}`
    chillElem.innerHTML=`Low:${chill}`
    heatElem.innerHTML=`High:${heat}`
    rainElem.innerHTML=`Rain:${rain}`
    dewElem.innerHTML=`Dew:${dew}`
    uvElem.innerHTML=`UV:${UV}`
    aqiElem.innerHTML=`AQI:${aqi}`
}