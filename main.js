/*
<body>
<div class="container">
    <h1 class="container__title">CHUCK NORRIS JOKES</h1>
    <p class="container__text">Select the type of jokes you want:</p>
    <div class="container__box">
        <div class="container__basic-btn"></div>
    </div>
</div>    

<div class="joke">
    <img class="joke__img" src="./assets/chuck.png" alt="Chuck Norris img">
    <p class="joke__text"></p>
</div>
</body>

*/


//Identification:

let container = document.getElementsByClassName('container__box')[0];
let btnDivBox = document.getElementsByClassName('container__basic-btn')[0];
let joke = document.getElementsByClassName('joke__text')[0];


//Variables:

let url = 'https://api.chucknorris.io/jokes/categories';
let urlBasic = 'https://api.chucknorris.io/jokes/random'; 
let urlAleatorie = 'https://api.chucknorris.io/jokes/random?category=';
let urlCategorie='';
let categoriesSelected = [];
let btnVariable;

//Functions:

function pintarBtnBasicos() {
    
    let btnNewJoke = document.createElement('button');
    let btnReset = document.createElement('button');

    btnReset.classList.add('container__btn-reset');
    btnReset.textContent = 'RESET';
    btnDivBox.appendChild(btnReset);
    btnNewJoke.classList.add('container__btn-send');
    btnNewJoke.textContent = 'NEW JOKE';
    btnDivBox.appendChild(btnNewJoke);
    btnNewJoke.addEventListener('click', enviarCategories);
    btnReset.addEventListener('click', borrarCategories);
  
}

function btnCategory() {

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(respuesta => pintarBtn(respuesta))
    .catch(error => console.log(error))
}

function pintarBtn(array) {   

    array.forEach((element, index) => {

        btnVariable = document.createElement('button');
        btnVariable.className = 'container__btn';
        btnVariable.setAttribute('id',index);
        btnVariable.textContent = element;
        container.appendChild(btnVariable);
        btnVariable.addEventListener('click',function(){anadirCategoria(element, index)});

    });
}

function anadirCategoria(categorie, index) {
    let btnSelect = document.getElementById(index);
    btnSelect.classList.add('container__btn--select');
    
        if ( categoriesSelected.includes(categorie)){
            
            btnSelect.classList.remove('container__btn--select');
            let posArrayCtegr = categoriesSelected.indexOf(categorie);
            categoriesSelected.splice(posArrayCtegr,1);
        } else{ 
            categoriesSelected.push(categorie);
        }
        urlCategorie = urlAleatorie + categoriesSelected.toString();
}

const enviarCategories = async () => {
    const url = categoriesSelected.length === 0 ? urlBasic : urlCategorie
    console.log(url)
    
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        joke.textContent = '"'+respuesta.value+'"';
    })
    .catch(error => console.log(error)) 
}
   


function borrarCategories() {
    categoriesSelected = [];
    joke.textContent = '';
    let btns = document.querySelectorAll('.container__btn');
    btns.forEach(function(btn){
        btn.classList.remove('container__btn--select');
    });
}

function jokeAleatorie() {
    fetch()
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        joke.textContent = '"'+respuesta.value+'"';
    })
    .catch(error => console.log(error)) 
}



//Calling functions:

pintarBtnBasicos()
btnCategory(); 
