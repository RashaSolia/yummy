let closeBtn=document.getElementById('closeBtn')
let navLink=document.querySelectorAll('.navLink li')
let detailes = document.getElementById("detailes");
let search = document.getElementById("search");
let searchByName = document.getElementById("searchByName");
let searchByLitter = document.getElementById("searchByLitter");
let Fname = document.getElementById("name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let age = document.getElementById("age");
let password = document.getElementById("password");
let Repassword = document.getElementById("Repassword");
let subimtBtn = document.getElementById("subimtBtn");
let Mealdetailes = document.getElementById("Mealdetailes");
let contact=document.getElementById('contact')

// ----------------------------loading--------------------------
$(document).ready(function() {
    getSearchDataName("").then(function() {
        $(".loading").slideUp(2000)
        $("body").css("overflow", "visible")

    })
})
// ----------------------------------------navBar--------------------------------------------
function openNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 1000)
    closeBtn.classList.replace('fa-align-justify','fa-x')
    $(".navLink").animate({
        top: 10

        }, 1000)
   
}

function closeNav() {
    let boxWidth = $(".nav").innerWidth()
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 1000)

    closeBtn.classList.replace('fa-x','fa-align-justify')
    $(".navLink").animate({
        bottom: -1000
    }, 1000)

}
closeNav()
$("#closeBtn").click(function() {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeNav()
    } else {
        openNav()
    }
})

// --------------------------------display data in home-------------------
async function getData() {
    detailes.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=`)
    response = await response.json()
    displayCategoreyMeals(response.meals)
    search.classList.replace('d-flex','d-none')
contact.classList.replace('d-flax','d-none')
}

getData()
// ---------------------------categorey----------------------------------
async function getCategoryData() {
    $(".loading").slideDown(1000)
    detailes.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
console.log(response.categories)
    displayCategorey(response.categories)
    $(".loading").slideUp(2000)

    search.classList.replace('d-flex','d-none')
contact.classList.replace('d-flax','d-none')
}

function displayCategorey(data) {
  
    let col= "";
    for (let i= 0; i<data.length; i++) {
        col+= `
        <div class="col-md-3 text-center">
                <div onclick="getCategoryDetailes('${data[i].strCategory}')" class="detailes position-relative overflow-hidden rounded-2">
                    <img class="w-100" src="${data[i].strCategoryThumb}" alt="meal">
                    <div class="detailes-layer position-absolute text-center text-black p-3">
                        <h3>${data[i].strCategory}</h3>
                        <p>${data[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div> `
    }
    detailes.innerHTML = col
}
async function getCategoryDetailes(category) {
  
    detailes.innerHTML = ""
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
     displayCategoreyMeals(response.meals)

}


function displayCategoreyMeals(data) {
  
    let col= "";
    for (let i= 0;i< data.length;i++) {
        col+=`
        <div class="col-md-3 text-center">
                <div onclick="getMealDetails('${data[i].idMeal}')" class="detailes position-relative overflow-hidden rounded-2">
                    <img class="w-100" src="${data[i].strMealThumb}" alt="meal">
                    <div class="detailes-layer position-absolute d-flex align-items-center text-black p-3">
                        <h4>${data[i].strMeal}</h4>
                    </div>
                </div>
        </div>
        `
    }

    detailes.innerHTML=col
}
$('.CategoreyBtn').click(function(){
    getCategoryData()
     closeNav()
})


// -------------------------------Area---------------------------------
async function getAreaData() { 
     ///get area data
     $(".loading").slideDown(1000)
    detailes.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json()
     displayArea(response.meals)
     $(".loading").slideUp(1000)
     search.classList.replace('d-flex','d-none')
contact.classList.replace('d-flex','d-none')
}
function displayArea(data) {  ///display area data
    let col='';
    for (let i= 0; i<data.length; i++) {
        col+= `
        <div class="col-md-3 text-light text-center">
                <div onclick="getAreaDetailes('${data[i].strArea}')" class="detailes position-relative overflow-hidden rounded-2">
                <i class="fa-solid fa-house-laptop fa-4x"></i>      
                <h3>${data[i].strArea}</h3>
                    </div>
        </div>
        `
    }
    detailes.innerHTML = col
    console.log('displayCategoreyMeals3')
}
async function getAreaDetailes(area) {  // get data after click

   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    console.log(response.meals)
    displayCategoreyMeals(response.meals)
}
$('.areaBtn').click(function(){
    getAreaData()
     closeNav() 
})
// ---------------------------------------Ingredients-----------------------------------------

async function getIngredientData() { ///get area data
    $(".loading").slideDown(1000)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await response.json()
    console.log(response.meals)
    displayIngredient(response.meals)
    $(".loading").slideUp(1000)
    search.classList.replace('d-flex','d-none')
    contact.classList.replace('d-flex','d-none')
}


function displayIngredient(data) {
      ///display area data
    
    let col='';
    for (let i= 0; i<data.length; i++) {
       if(data[i].strIngredient !==null && data[i].strDescription!==null){
        col+= `
        <div class="col-md-3 text-light text-center">
                <div onclick="getIngredientDetailes('${data[i].strIngredient}')" class="detailes position-relative overflow-hidden rounded-2">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>      
                <h3>${data[i].strIngredient}</h3>
                <p>${data[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
        } 
    }
    detailes.innerHTML = col
}


async function getIngredientDetailes(Ingredient) {  // get data after click
  
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`)
     response = await response.json()
     console.log(response.meals)
     displayCategoreyMeals(response.meals)
 
 }
 $('.IngredientBtn').click(function(){
 getIngredientData() ;
 closeNav()
})

// -----------------------------detailes---------------------------------------------
async function getMealDetails(meal) {
 
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`);
    respone = await respone.json();
    displayMealDetails(respone.meals[0])

}

function displayMealDetails(meal) {  
   
    let col = `<div class="col-md-4 text-light ">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 text-light">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Tags:</h3>
               <p> ${meal.strTags}</p>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`
            detailes.innerHTML = col
}



// -------------------------------------search by name----------------------------------------

function searche(){  
  
search.classList.replace('d-none','d-flex')
contact.classList.replace('d-flex','d-none')
detailes.innerHTML=""
}
 async function getSearchDataName(name){
 
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    response = await response.json()
    if(response.meals!==null){
        displayCategoreyMeals(response.meals)
 
    }
}
searchByName.addEventListener('input',function(){
    if(searchByName.value!==null){
        getSearchDataName(searchByName.value) 
    }
})

// -------------------------------------search by frist litter----------------------------------------
async function getSearchDataLitter(litter){
  
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${litter}`)
    response = await response.json()

    if(response.meals!==null){
        displayCategoreyMeals(response.meals)
   
    }
}
searchByLitter.addEventListener('input',function(){
    if(searchByLitter.value!==null){
        getSearchDataLitter(searchByLitter.value) 
    }
})
// ----------------------------------contact----------------------------------------------
function contactUs(){
  
contact.classList.replace('d-none','d-flex')
search.classList.replace('d-flex','d-none')
detailes.innerHTML=""
}
function Namevalidation(){
    var Namevaildation = /^[a-zA-Z ]+$/;
    var names =Fname.value;
    if (Namevaildation.test(names)){
        $('#nameAlert').addClass("d-none");
    return true
    }
    else{
        $('#nameAlert').removeClass("d-none");
    return false
    }}
function Emailvalidation(){
    var Emailvaildation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var emails =email.value;
    if (Emailvaildation.test(emails)){
        $('#emailAlert').addClass("d-none");

    return true
    }
    else{
        $('#emailAlert').removeClass("d-none");
    return false
    }}
    
function phonevalidation(){
    var phonevaildation =  /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    var phones =phone.value;
    if (phonevaildation.test(phones)){
        $('#phoneAlert').addClass("d-none");
console.log('true')
    return true
    }
    else{
        $('#phoneAlert').removeClass("d-none");
    return false
    }}
    
    function Agevalidation(){
        var agevalidation =  /^[1-9]?[0-9]{1}$|^100$/;
        var ages =age.value;
        if (agevalidation.test(ages)){
            $('#ageAlert').addClass("d-none");

        return true
        }
        else{
            $('#ageAlert').removeClass("d-none");
        return false
        }}
        
        function Passwordvalidation(){
            var passwordvalidation =  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
            var passwords =password.value;
            if (passwordvalidation.test(passwords)){
                $('#passwordAlert').addClass("d-none");
    
            return true
            }
            else{
                $('#passwordAlert').removeClass("d-none");
            return false
            }}
            
            function RePasswordvalidation(){
                if(password.value===Repassword.value){
                    $('#RepasswordAlert').addClass("d-none");
                        return true
                }

                else{
                    $('#RepasswordAlert').removeClass("d-none");
               return false
                }
                }




        Fname.addEventListener("focus", () => {
                    nameInputTouched = true
                })
            
              email.addEventListener("focus", () => {
                    emailInputTouched = true
                })
            
          phone.addEventListener("focus", () => {
                    phoneInputTouched = true
                })
            age.addEventListener("focus", () => {
                    ageInputTouched = true
                })
            
               password.addEventListener("focus", () => {
                    passwordInputTouched = true
                })
            
           Repassword.addEventListener("focus", () => {
                    repasswordInputTouched = true
                })
          
            
            let nameInputTouched = false;
            let emailInputTouched = false;
            let phoneInputTouched = false;
            let ageInputTouched = false;
            let passwordInputTouched = false;
            let repasswordInputTouched = false;
                
                              
                if(Namevalidation() == true&& (nameInputTouched)
                && Emailvalidation() == true &&(emailInputTouched)
                &&  phonevalidation() == true&&(phoneInputTouched)
                &&  Agevalidation() == true&&(ageInputTouched)
                && Passwordvalidation()==true&&(passwordInputTouched)&&(repasswordInputTouched)
                && RePasswordvalidation()==true) 
 {            
    subimtBtn.removeAttribute('disabled');
}
        
                  else 
                {
                    subimtBtn.setAttribute("disabled", true)
                }

