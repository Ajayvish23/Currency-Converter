let input= document.querySelector(".amount input");
const dropdowns= document.querySelectorAll(".select-currency select");
const btn= document.getElementById("convertButton");
const swipeBtn= document.getElementById("swipeBtn");
const fromCurr= document.querySelector(".from select");
const toCurr= document.querySelector(".to select");
const message= document.querySelector("#message");
const BASE_URL =
  "https://api.frankfurter.app/latest?amount=1&from=";

//const Full_url=`https://api.frankfurter.app/latest?amount=1&from=USD&to=INR`;



import { countryList } from "./codes.js";



for(let select of dropdowns){
    for (let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText= currCode;
        newOption.value=currCode;

        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
            select.value = "USD"; // Force the value immediately
        }
        if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
            select.value = "INR"; // Force the value immediately
        }
        select.append(newOption);
   }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

// Update flags after a small delay to ensure DOM is ready
setTimeout(() => {
    dropdowns.forEach(select => {
        updateFlag(select);
    });
}, 100)


const updateFlag= (element)=>{
    let currCode= element.value;
    //console.log(currCode);
    let countryCode= countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src= newSrc;

}


btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amountValue=amount.value;
    //console.log(amountValue);
    if(amountValue==="" || amountValue< 1){
       amountValue= "1";
    }
    //console.log(fromCurr.value);
    //console.log(toCurr.value);
    const URL= `${BASE_URL}${fromCurr.value}&to=${toCurr.value}`;
    //console.log(URL);


    let response= await fetch(URL);
    let data= await response.json();
    let rate= data[toCurr.value.toLowerCase()];
    //console.log(response);
    let Rate=data.rates[toCurr.value];
    //console.log(Rate);

    let finalAmount= amountValue* Rate;
    message.innerText= `${amountValue} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;  //.toFixed(2) display upto two decimal places

})


swipeBtn.addEventListener("click", (Btn,element)=>{
    Btn.preventDefault();
    let tempValue=fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = tempValue;

    updateFlag(fromCurr);
    updateFlag(toCurr);
    
})


input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault(); // stop form submit
        btn.click(); // trigger convert button
    }
});