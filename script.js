let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];



let form = document.getElementById("itemForm");

if(form){

form.addEventListener("submit", function(e){

e.preventDefault();

let file = document.getElementById("image").files[0];
let name = document.getElementById("name").value;
let price = document.getElementById("price").value;
let link = document.getElementById("link").value;
let category = document.getElementById("category").value;

let reader = new FileReader();

reader.onload = function(){

let item = {
image: reader.result,
name: name,
price: price,
link: link,
category: category,
purchased: false
};

wishlist.push(item);

localStorage.setItem("wishlist", JSON.stringify(wishlist));

window.location.href = "index.html";

};

reader.readAsDataURL(file);

});

}



function loadCategory(){

let params = new URLSearchParams(window.location.search);

let cat = params.get("cat");

let title = document.getElementById("categoryName");

if(title){
title.innerText = cat;
}

let container = document.getElementById("items");

if(!container) return;

container.innerHTML = "";

wishlist.forEach(function(item,index){

if(item.category === cat){

container.innerHTML += `

<div class="itemCard">

<img src="${item.image}">

<h3>${item.name}</h3>

<p>${item.price}</p>


<br>
<a href="${item.link}" target="_blank">Buy</a>
<br>
<button onclick="removeItem(${index})">Remove</button>

</div>

`;

}

});

}



function removeItem(index){

wishlist.splice(index,1);

localStorage.setItem("wishlist", JSON.stringify(wishlist));

location.reload();

}


function goAdd(){

window.location.href = "add.html";

}




if(document.getElementById("items")){

loadCategory();

}