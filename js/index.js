let rowData = document.getElementById('rowData')
let Categories = document.getElementById('Categories')
let Area = document.getElementById('Area')
let search = document.getElementById('search')
let Ingredients = document.getElementById('Ingredients')
let Contact = document.getElementById('Contact')
let SearchByName = document.getElementById('SearchByName')
let SearchByFirstLitter = document.getElementById('SearchByFirstLitter')
let searchContainer = document.getElementById('searchContainer')
let searchRow = document.getElementById('searchRow')


// let enterNameTouched = false;
// let enterEmailTouched = false;
// let enterYourPhoneTouched = false;
// let enterYourNumTouched = false;
// let enterYourPasswordTouched = false;
// let reenterYourPasswordTouched = false;


jQuery(function () {
    $(".load-layer").fadeOut(500);
    $("body").css({ overflow: "auto" });
});

function openNav() {
    $(".side-nav").animate({ left: 0 }, 500);
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
        $(".nav-links li")
            .eq(i)
            .animate({ top: 0 }, (i + 6) * 100);
    }
}

function closeNav() {
    let navWidth = $(".side-nav .nav-items").outerWidth();
    $(".side-nav").animate({ left: -navWidth }, 500);
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
    $(".nav-links li").animate({ top: 300 }, 500);
}

closeNav();
$(".side-nav i.open-close-icon").on("click", function () {
    $(".side-nav").toggle();
    if ($(".side-nav").css("left") == "0px") {
        closeNav();
    } else {
        openNav();
    }
});

function showMeals(arr) {
    let cartoona = ``;
    for (let i = 0; i < arr.length; i++) {
        cartoona +=
            ` 
        <div class="col-md-3">
            <div onclick="getMealDetails('${arr[i].idMeal}')" class="position-relative overflow-hidden rounded-2 meal">
                <img class="w-100 rounded-3" src="${arr[i].strMealThumb}"
                    alt="">
                <div class="layer position-absolute d-flex justify-content-center align-items-center p-2">
                    <h3>${arr[i].strMeal}</h3>
                </div>
            </div>
        </div>`
        rowData.innerHTML = cartoona
    }
}
searchByName("");


Categories.addEventListener('click', function () {
    searchByCategory();
})

async function searchByCategory() {
    $(".sec-load-layer").fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()


    displayCategories(response.categories);
    $(".sec-load-layer").fadeOut(300);
}
function displayCategories(arr) {
    closeNav();
    let cartoona = ``;
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
         <div class="col-md-3">
         <div onclick="getCategoryMeal('${arr[i].strCategory}')" class="meal cursor rounded-2 position-relative overflow-hidden">
         <img class="w-100" src="${arr[i].strCategoryThumb}" alt="">
         <div class="layer position-absolute text-center p-2">
         <h3 class="pt-4">${arr[i].strCategory}</h3>
         <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
         </div>
         </div>
         </div>`;
    }
    rowData.innerHTML = cartoona;
}

Area.addEventListener('click', function () {
    getArea();
})

async function getArea() {
    $(".sec-load-layer").fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json()
    displayArea(response.meals);
    $(".sec-load-layer").fadeOut(300);

}

function displayArea(arr) {
    closeNav();
    let cartoona = ``;
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
         <div class="col-md-3">
         <div onclick="getAreaMeal('${arr[i].strArea}')" class="meal cursor rounded-2 text-white ">
         <div class=" text-center p-2">
         <i class="fa-4x  text-white fa-solid fa-house-laptop"></i>
         <h3>${arr[i].strArea}</h3>
         </div>
         </div>
         </div>`;
    }
    rowData.innerHTML = cartoona;

}

Ingredients.addEventListener('click', function () {
    getIngredients();
})

async function getIngredients() {
    $(".sec-load-layer").fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await response.json()
    displayIngredients(response.meals.slice(0, 20));
    $(".sec-load-layer").fadeOut(300);
}

function displayIngredients(arr) {
    closeNav();
    let cartoona = ``;
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
         <div class="col-md-3">
         <div onclick="getIngredientsMeal('${arr[i].strIngredient}')" class="meal cursor rounded-2 text-white ">
         <div class=" text-center p-2">
         <i class="fa-4x text-white fa-solid fa-drumstick-bite "></i>
         <h3>${arr[i].strIngredient}</h3>
         <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
         </div>
         </div>
         </div>`;
    }
    rowData.innerHTML = cartoona;
}

async function getCategoryMeal(e) {
    $(".sec-load-layer").fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${e}`)
    response = await response.json()
    showMeals(response.meals.slice(0, 20));
    $(".sec-load-layer").fadeOut(300);
}


async function getAreaMeal(x) {
    $(".sec-load-layer").fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${x}`)
    response = await response.json()
    showMeals(response.meals.slice(0, 20));
    $(".sec-load-layer").fadeOut(300);
}


async function getIngredientsMeal(z) {
    $(".sec-load-layer").fadeIn(300);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${z}`)
    response = await response.json()
    showMeals(response.meals.slice(0, 20));
    $(".sec-load-layer").fadeOut(300);
}

search.addEventListener('click', function () {
    closeNav();
    searchContainer.innerHTML = `
    <div id="searchRow" class="row py-4  ">

            <div class="col-md-6 placeholderwhite">
                <input id="SearchByName" onkeyup="searchByName(this.value)" class=" bg-transparent form-control  text-white " type="text" placeholder="Search By Name"></input>
            </div>
            <div class="col-md-6 placeholderwhite">
                <input id="SearchByFirstLitter" onkeyup="SearchFirstLitter(this.value)" maxlength="1" class=" bg-transparent form-control text-white " type="text" placeholder="Search By First Litter"></input>
             </div>
        </div>`
    rowData.innerHTML = "";

})


async function searchByName(y) {
    $(".sec-load-layer").fadeIn(300);
    closeNav()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${y}`)
    response = await response.json()
    response.meals ? showMeals(response.meals) : showMeals([])
    showMeals(response.meals);
    $(".sec-load-layer").fadeOut(300);

}

async function SearchFirstLitter(y) {
    $(".sec-load-layer").fadeIn(300);
    closeNav()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${y}`)
    response = await response.json()
    response.meals ? showMeals(response.meals) : showMeals([])
    showMeals(response.meals);
    $(".sec-load-layer").fadeOut(300);
}


async function getMealDetails(id) {
    $(".sec-load-layer").fadeIn(300);
    closeNav();

    rowData.innerHTML = "";

    searchRow.innerHTML = "";

    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    response = await response.json();

    displayMealDetails(response.meals[0]);
    $(".sec-load-layer").fadeOut(300);
}
function displayMealDetails(meal) {
    searchRow.innerHTML = "";

    let ingredients = ``;

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
        }
    }

    let tags = meal.strTags?.split(",");
    if (!tags) tags = [];

    let tagsStr = "";
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
            <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
    }

    let cartoona = `
        <div class="col-md-4 text-white">
                    <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                        alt="">
                        <h2>${meal.strMeal}</h2>
                </div>
                <div class="col-md-8 text-white">
                    <h2>Instructions</h2>
                    <p>${meal.strInstructions}</p>
                    <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                    <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                    <h3>Recipes :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        ${ingredients}
                    </ul>
    
                    <h3>Tags :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        ${tagsStr}
                    </ul>
    
                    <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                    <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
                </div>`;

    rowData.innerHTML = cartoona;
}


Contact.addEventListener('click', function () {
    closeNav();
    rowData.innerHTML = `<section>
    <div class="contactUS text-center vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 mx-auto" text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="enterName" onkeyup="inputsValidation()" type="text" class="form-control  " placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="enterEmail" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="enterYourPhone" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="enterYourNum" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="enterYourPassword" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password Minimum eight characters, at least one letter and one number:
                </div>
            </div>
            <div class="col-md-6">
                <input  id="reenterYourPassword" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="RePassword">
                <div id="rePasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid rePassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div>
</section>`
    submitBtn = document.getElementById("submitBtn");

    document.getElementById("enterName").addEventListener("focus", function () {
        enterNameTouched = true;
    });

    document.getElementById("enterEmail").addEventListener("focus", function () {
        enterEmailTouched = true;
    });

    document.getElementById("enterYourPhone").addEventListener("focus", function () {
        enterYourPhoneTouched = true;
    });

    document.getElementById("enterYourNum").addEventListener("focus", function () {
        enterYourNumTouched = true;
    });

    document.getElementById("enterYourPassword").addEventListener("focus", function () {
        enterYourPasswordTouched = true;
    });

    document.getElementById("reenterYourPassword").addEventListener("focus", function () {
        reenterYourPasswordTouched = true;
    });
})

function inputsValidation() {
    if (enterNameTouched) {
        if (nameValidation()) {
            document
                .getElementById("nameAlert")
                .classList.replace("d-block", "d-none");
        } else {
            document
                .getElementById("nameAlert")
                .classList.replace("d-none", "d-block");
        }
    }
    if (enterEmailTouched) {
        if (emailValidation()) {
            document
                .getElementById("emailAlert")
                .classList.replace("d-block", "d-none");
        } else {
            document
                .getElementById("emailAlert")
                .classList.replace("d-none", "d-block");
        }
    }

    if (enterYourPhoneTouched) {
        if (phoneValidation()) {
            document
                .getElementById("phoneAlert")
                .classList.replace("d-block", "d-none");
        } else {
            document
                .getElementById("phoneAlert")
                .classList.replace("d-none", "d-block");
        }
    }

    if (enterYourNumTouched) {
        if (ageValidation()) {
            document
                .getElementById("ageAlert")
                .classList.replace("d-block", "d-none");
        } else {
            document
                .getElementById("ageAlert")
                .classList.replace("d-none", "d-block");
        }
    }

    if (enterYourPasswordTouched) {
        if (passwordValidation()) {
            document
                .getElementById("passwordAlert")
                .classList.replace("d-block", "d-none");
        } else {
            document
                .getElementById("passwordAlert")
                .classList.replace("d-none", "d-block");
        }
    }
    if (reenterYourPasswordTouched) {
        if (rePasswordValidation()) {
            document
                .getElementById("rePasswordAlert")
                .classList.replace("d-block", "d-none");
        } else {
            document
                .getElementById("rePasswordAlert")
                .classList.replace("d-none", "d-block");
        }
    }

    if (
        nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        rePasswordValidation()
    ) {
        submitBtn.removeAttribute("disabled");
    } else {
        submitBtn.setAttribute("disabled", true);
    }
}

function nameValidation() {
    return /^[a-zA-Z ]+$/.test(document.getElementById("enterName").value);
}

function emailValidation() {
    return /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/.test(
        document.getElementById("enterEmail").value
    );
}

function phoneValidation() {
    return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(
        document.getElementById("enterYourPhone").value
    );
}

function ageValidation() {
    return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
        document.getElementById("enterYourNum").value
    );
}

function passwordValidation() {
    return /^(?=.\d)(?=.[a-z])[0-9a-zA-Z]{8,}$/.test(
        document.getElementById("enterYourPassword").value
    );
}

function rePasswordValidation() {
    return (
        document.getElementById("reenterYourPassword").value ==
        document.getElementById("enterYourPassword").value
    );
}