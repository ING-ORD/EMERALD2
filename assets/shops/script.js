window.onload = function(){
	console.log("Firs start js");
	document.getElementById("basket").onclick = function (e) {
		// console.log(this);
		if (this.querySelector("img").classList == "basket" ){
			this.querySelector("img").classList = "next";
			this.querySelector("img").src = "assets/shops/images/next.svg";
			createShopingCartPage(shopingCart);
		} else {
			this.querySelector("img").classList = "basket";
			this.querySelector("img").src = "assets/shops/images/basket.svg";
			createShopPage(allProducts);
		} 
	}

	// document.getElementById("basket").onclick = () => window.location = "basket.html";
	$.ajax({
		url: 'assets/shops/php/FirstRequestPageHome.php',
		type: "POST",
		data: {
			user:"client"
		},
		datatype: "json",
		success:function(data){
			allProducts = {...JSON.parse(data)};
			sectionProductsCreate.apply(document.getElementById("products"),[allProducts]);
		}
	});


}

//массив продуктов
let allProducts = {};
//массив покупок
let shopingCart = [];

//синтаксис для создания нового дум элемента tag с клссом cl 
let create = function (tag,cl){ 
	let html = document.createElement(tag);
	if(cl){
		html.classList = cl;
	}
	return html
}

//создает один элемент продукта в окне магазина
let oneProductCreate = function (data, id) {
	let count = 1;
	let {name,linkImg} = data

	let html = create("div", "oneproduct");

	let img = create("img" , "oneproduct__img");
	img.src = linkImg;
	img.alt = name;

	let title = create("div", "oneproduct__title");
	title.innerText = name;

	let activity = create("div", "activity");

	let activitySend = create("div", "activity__send");
	activitySend.innerText = "В корзину";
	activitySend.dataset["idProduct"] = id;
	activitySend.onclick = function(e){
		let inBasket = create("div","in-basket");
		inBasket.innerText = "В корзине";
		activity.innerHTML = "";
		activity.append(inBasket);

		shopingCart.push({name,count,linkImg})
	}

	let counter = create("div", "counter");

	let counterMinus = create("div","counter__minus");
	counterMinus.innerText = "-";
	let counterCheck = create("div","counter__check");
	counterCheck.innerText = count;
	let counterPlus = create("div","counter__plus");
	counterPlus.innerText = "+";

	counterMinus.onclick = function(e){
		if(counterCheck.innerText > 1){
			count -= 1;
			counterCheck.innerText = count;
		}
	}

	counterPlus.onclick = function(e){
		count += 1;
		counterCheck.innerText = count;
	}

	counter.append(counterMinus,counterCheck,counterPlus);

	activity.append(activitySend,counter);	

	html.append(img, title, activity);

	return html;
}

//создание секции с продуктами магазина
let sectionProductsCreate = function(data){
	this.innerHTML = "";
	for (let item in data){
		this.append( oneProductCreate(data[item], item) );
	}
}

//создание заказа в окне корзины
let oneOrderCreate = function(data , id){

	let {name,count,linkImg} = data;
	let iterable = count;

	let html = create("div", "oneorder");

	let img = create("img", "oneorder__img");
	img.src = linkImg;
	img.alt = name;

	let title = create("div" , "oneorder__title");
	title.innerText = name;

	let counter = create("div" , "counter");

	let counterMinus = create("div" , "counter__minus");
	counterMinus.innerText = "-";

	let counterCheck = create("div" , "counter__check");
	counterCheck.innerText = iterable;

	let counterPlus = create("div" , "counter__plus");
	counterPlus.innerText = "+";

	let deleteBtn = create("div", "oneorder__delete");
	deleteBtn.innerText = "Удалить";
	deleteBtn.dataset["idOrder"] = id;

	counterMinus.onclick = function(e){
		if(counterCheck.innerText > 1){
			iterable -= 1;
			counterCheck.innerText = iterable;
			shopingCart[id]["count"] = iterable;
		}
	}

	counterPlus.onclick = function(e){
		iterable += 1;
		counterCheck.innerText = iterable;
		shopingCart[id]["count"] = iterable;

	}

	deleteBtn.onclick = function(e){
		let deleteOneOrderEvent = new Event("deleteOneOrder", {bubbles: true});
		deleteBtn.dispatchEvent(deleteOneOrderEvent);
		let newshopingCart = {};
		let id = deleteBtn.dataset["idOrder"];
		for (let i in shopingCart){
			console.log(i)
			if (i != id) {
				newshopingCart[i] = shopingCart[i];
			}
		}
		console.log(newshopingCart);
		shopingCart = newshopingCart;
		let len = 0;
		for(let i in shopingCart){
			len++ 
		}

		document.querySelector(".sends_activity__discription").innerText = "В корзине "+ len + " заказа";

	}

	html.addEventListener("deleteOneOrder",()=>{
		html.outerHTML = "";
	})

	counter.append(counterMinus, counterCheck, counterPlus);

	html.append(img , title , counter, deleteBtn);

	return html;
}

let sectionOrderCreate = function(data){
	this.innerHTML = "";
	for (let item in data){
		this.append( oneOrderCreate(data[item], item) );
	}
}


// 
let createShopingCartPage = function(data){
	let main = document.getElementById("main");
	main.className = "is-orders";

	let sectionOrder = create("section");
	sectionOrder.id = "orders";

	sectionOrderCreate.apply(sectionOrder,[data]);

	let sectionSend = create("section");
	sectionSend.id = "sends";

	let sendsActivity = create("div","sends_activity");

	let activityDiscription = create("div","sends_activity__discription");
	let len = 0;
	for(let i in data){
		len++ 
	}
	activityDiscription.innerText = "В корзине "+ len + " заказа";
	
	let activitySend = create("div", "activity__send");
	activitySend.innerText = "Заказать";

	activitySend.onclick = function (){
		console.log(shopingCart);
		document.getElementById("orders").innerHTML = "Заказ принят";
		$.ajax({
			url: "assets/shops/php/ajaxRespons.php",
			type: "POST",
			data: {data:shopingCart} ,
			datatype:"JSON",
			success:function(data){
				console.log(data);
			}
		});
		setTimeout(()=>{
			createShopPage(allProducts);
		}, 4000)
	}

	sendsActivity.append(activityDiscription , activitySend);
	sectionSend.append(sendsActivity);

	main.innerHTML = "";
	main.append(sectionOrder,sectionSend);

}

let createShopPage = function(data){
	let main = document.getElementById("main");
	main.className = "is-products";

	let sectionProduct = create("section");
	sectionProduct.id = "products";

	sectionProductsCreate.apply(sectionProduct,[data]);

	main.innerHTML = "";
	main.append(sectionProduct);
};

