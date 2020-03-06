window.onload = function(){
	console.log("Firs start js");

	$.ajax({
		url:"assets/admin/php/FirstRequestPageHome.php",
		type:"POST",
		data:{
			user:"admin"
		},
		datatype:"JSON",
		success: function(data){
			console.log(data)
			answer = JSON.parse(data);
			console.log(answer);
			// listOrders = answer["buys"];
			// sectionOrderCreate(listOrders);
			// listDrivers = answer["providers"];
			listProvider = answer["providers"];
			listProducts = answer["products"];
			listClients = answer["clients"];
			listPostDelivery = answer["postDelivery"];
			listDelivery = answer["delivery"];

			for (let id in listPostDelivery) {
				listPostDeliveryCreate.apply(document.querySelector(".list-post_delivery"), [listPostDelivery[id]]);
			}

			for (let id in listDelivery) {
				listDeliveryCreate.apply(document.querySelector(".list-delivery"), [listDelivery[id]]);
			}
		}

	});


	document.querySelector(".add-plan-post-delivery-btn").onclick = function(){
		if(this.classList.contains("new")){
			document.querySelector(".post-delivery-add").append(addPlanPanelCreate([]))
			this.classList.remove("new");
			this.classList.add("confirm");
			this.querySelector(".add-plan-btn__title").innerText = "Подтвердить строку плана";

		}else{
			let data = getDataPostDelivery();
			listPostDeliveryCreate.apply(document.querySelector(".list-post_delivery"),[data])
			
			data["typeOfTransportation"] = 0;
			listPostDelivery.push(data);

			document.querySelector(".post-delivery-add").innerHTML = "";
			this.classList.remove("confirm");
			this.classList.add("new");
			this.querySelector(".add-plan-btn__title").innerText = "Добавить новую строку плана";
			$.ajax({
				url:"assets/admin/php/ajaxRespons.php",
				type:"POST",
				data:{
					data:data
				},
				datatype:"JSON",
				success: function(data){
					return true;
				},
				error: function(err){console.log(err)}


			});

		}

		return false;
	}
	document.querySelector(".add-plan-delivery-btn").onclick = function(){
		if(this.classList.contains("new")){
			document.querySelector(".delivery-add").append(addPlanPanelCreate([],true))
			this.classList.remove("new");
			this.classList.add("confirm");
			this.querySelector(".add-plan-btn__title").innerText = "Подтвердить строку плана";

		}else{
			let data = getDataDelivery();
			listDeliveryCreate.apply(document.querySelector(".list-delivery"),[data]);
			data["typeOfTransportation"] = 1;
			listDelivery.push(data);

			document.querySelector(".delivery-add").innerHTML = "";
			this.classList.remove("confirm");
			this.classList.add("new");
			this.querySelector(".add-plan-btn__title").innerText = "Добавить новую строку плана";
			// {
			// 	data:{
			// 		count:"",
			// 		typeOfTransportation:"",
			// 		provider:"",
			// 		product:""
			// 	}
			// }
			$.ajax({
				url:"assets/admin/php/ajaxRespons.php",
				type:"POST",
				data:{
					data:data
				},
				datatype:"JSON",
				success: function(data){
					return true;
				}


			});

		}

		return false;
	}

	// document.querySelector(".check-plans").addEventListener("click", function(e){
	// 	if (e.target.classList.contains("check-plans__all") ) {
	// 		this.querySelectorAll(".active").forEach( function(item){
	// 			item.classList.remove("active");
	// 		});
	// 		e.target.classList.add("active");
	// 		document.querySelector(".check-plans__specific").innerHTML = "Выбрать";

	// 	}
	// 	if (e.target.classList.contains("check-plans__specific") ) {
	// 		this.querySelectorAll(".active").forEach( function(item){
	// 			item.classList.remove("active");
	// 		});
	// 		e.target.classList.add("active");

	// 		let number = create("div","check-plans__number");
	// 		number.innerText = "Пункт №";

	// 		let input = create("input");
	// 		input.classList = "check-plans__input"
	// 		input.placeholder = "1";
	// 		input.value = 1;

	// 		e.target.innerHTML = "";
	// 		e.target.append(number,input);
	// 	}
	// });
	// 
	document.querySelector(".check-plans__input").onblur = function(e){
		let value = e.target.value || 1;
		$.ajax({
			url:"assets/admin/php/findRespons.php",
			type:"POST",
			data:{"data":value},
			datatype:"JSON",
			success:function(data){
				let $answer = JSON.parse(data);
				listPostDelivery = $answer["postDelivery"];
				listDelivery = $answer["delivery"];
				console.log(listPostDelivery);
				console.log(listDelivery);

				let post_delivery = document.querySelector(".list-post_delivery");
				post_delivery.innerHTML = '';
				for(id in listPostDelivery) {

					listPostDeliveryCreate.apply(post_delivery, [listPostDelivery[id]]);
				}

				let delivery = document.querySelector(".list-delivery");
				delivery.innerHTML = '';
				for(id in listDelivery) {
					listDeliveryCreate.apply(delivery, [listDelivery[id]]);
				}
			}
		});
	}
	document.querySelector(".end_plan").onclick = function(e){
		document.querySelector(".add-plan-post-delivery-btn").outerHTML= "";
		document.querySelector(".add-plan-delivery-btn").outerHTML = "";

		$.ajax({
			url:"assets/admin/php/retryRespons.php",
			type:"POST"
		});

	}
}

let listOrders = [];

// let listDrivers = [];
let listProducts = []
let listClients = [];
let listProvider = [];

let listPostDelivery = [];
let listDelivery = [];


let create = function(tag, cl){
	let html = document.createElement(tag);
	if (cl) html.classList = cl;
	return html;
}


//секция клиентов
let oneClientCreate = function(data,id = 0){
	let html = create("li","one-client");

	let name = create("div","one-client__name");
	console.log(data);
	name.innerText = data[id]["client"];

	let products = create("ol", "prodects");

	listProductCreate.apply(products,[data]);

	html.append(name,products);
	return html;
}

let listClientCreate = function(data){
	this.innerHTML = "";
	this.append( oneClientCreate(data,0) );
	
}

let oneProductCreate = function(data,id){

	let html = create("li","one-product");

	let {product:DTitle,count:DCount} = data;

	let wrap = create("div", "wrap-one-prodect");

	let title = create("div","one-product__title");
	title.innerText = DTitle;

	let count = create("div","one-product__count");
	count.innerText = DCount + " шт";

	wrap.append(title,count);

	html.append(wrap);

	return html;
}

let listProductCreate = function (data){
	this.innerHTML = "";
	for (let id in data){
		this.append( oneProductCreate(data[id],id) );
	}
}

let sectionOrderCreate = function(data){
	let listClients = document.querySelector(".list-clients");
	listClientCreate.apply(listClients,[data]);
}

let addPlanPanelCreate = function(data,check = false){
	let html = create("div", "add-plan-panel");

	let tool = create("div", "tool-plan-panel");

	// let toolDriver = create("select", "tool-plan-panel__provider");
	// for (let id in listDrivers){
	// 	let option = create("option");
	// 	if(check && listDrivers[id]["type"] == "1"){
	// 		option.innerText = listDrivers[id]["name"];
	// 		toolDriver.append(option);
	// 	}else if (!check && listDrivers[id]["type"] == "0") {
	// 		option.innerText = listDrivers[id]["name"];
	// 		toolDriver.append(option);
	// 	}
	// }

	let toolCount = create("select", "tool-plan-panel__count");
	for (let i = 1 ; i<4 ; i++){
		let option = create("option");
		option.innerText = i + " шт";
		if (data.countProduct == i){
			option.setAttribute("selected","selected");
		}
		toolCount.append(option);
	}

	let toolProduct = create("select", "tool-plan-panel__products");
	for (let id in listProducts){
		let option = create("option");
		option.innerText = listProducts[id]["name"];
		if (data.product == listProducts[id]["name"]){
			option.setAttribute("selected","selected");
		}
		toolProduct.append(option);
	}


	let checkStory = create("div","check-store");

	let checkStoryTitle = create("div", "check-store__title");
	checkStoryTitle.innerText = "Продуктов на складе";

	tool.append(toolCount, toolProduct);

	if(check){
		let toolDestination = create("select", "tool-plan-panel__client");
		for (let id in listClients){
			let option = create("option");
			option.innerText = listClients[id]["name"];
			if (data.destination == listClients[id]["name"]){
				option.setAttribute("selected","selected");
			}
			toolDestination.append(option);
		}
		tool.append(toolDestination);
	}else{
		let toolDestination = create("select", "tool-plan-panel__provider");
		for (let id in listProvider){
			let option = create("option");
			option.innerText = listProvider[id]["name"];
			if (data.destination == listProvider[id]["name"]){
				option.getAttribute("selected","selected");
			}
			toolDestination.append(option);
		}
		tool.append(toolDestination);
	}

	checkStory.append(checkStoryTitle);

	html.append(tool, checkStory);

	return html;
}

let onePostDeliveryCreate = function(data){
	let html = create("li","one-post_delivery");

	let wrap = create("div","wrap-one-post-delivery");
	let {product:DProduct, countProduct:DCountProduct, provider:DProvider, destination:DDestination} = data

	let product = create("div", "products");
	product.innerText = DProduct;

	let countProduct = create("div", "count_product");
	countProduct.innerText = DCountProduct + " шт";

	let destination = create("div", "destination");
	destination.innerText = DDestination;

	wrap.append(product, countProduct , destination);

	let check_click = false;

	html.onclick = function(e) {

		if (check_click){
			clearingHtmlFromTagAndContentBySelector(".tools-mode");
			check_click = false;
		}else{

			check_click = createToolsForLineOnPlane.call(data, html);
		}

		return true;
	}
	
	html.append(wrap);

	return html;
}

let listPostDeliveryCreate = function(data){
	this.append( onePostDeliveryCreate(data))
}

let oneDeliveryCreate = function(data){
	let html = create("li","one-delivery");

	let wrap = create("div","wrap-one-delivery");
	let {product:DProduct, countProduct:DCountProduct, destination:DDestination} = data;

	let product = create("div", "products");
	product.innerText = DProduct;

	let countProduct = create("div", "count_product");
	countProduct.innerText = DCountProduct + " шт";

	let destination = create("div", "destination");
	destination.innerText = DDestination;
	
	wrap.append(product, countProduct, destination);

	let check_click = false;

	html.onclick = function(e) {

		if (check_click){
			clearingHtmlFromTagAndContentBySelector(".tools-mode");
			check_click = false;
		}else{

			check_click = createToolsForLineOnPlane.call(data, html);
		}

		return true;
	}
	

	html.append(wrap);

	return html;
}

let listDeliveryCreate = function(data){
	this.append( oneDeliveryCreate(data));
}

let getDataPostDelivery = function(){
	let destination = document.querySelector(".tool-plan-panel__provider").value;
	let item = document.querySelector(".check-plans__input").value || 1;
	let countProduct = document.querySelector(".tool-plan-panel__count").value.split(" ")[0];
	let product = document.querySelector(".tool-plan-panel__products").value;
	return {item,product, countProduct , destination}
}	

let getDataDelivery = function(){
	let item = document.querySelector(".check-plans__input").value || 1;
	// let provider = document.querySelector(".tool-plan-panel__provider").value;
	let countProduct = document.querySelector(".tool-plan-panel__count").value.split(" ")[0];
	let product = document.querySelector(".tool-plan-panel__products").value;
	let destination = document.querySelector(".tool-plan-panel__client").value;
	return {item, product, countProduct  /*, provider*/,destination};
}

let createToolsForLineOnPlane = function (html) {

	let data = this;
	console.log(data);

	clearingHtmlFromTagAndContentBySelector(".tools-mode");

	let tools = create("div", "tools-mode");

	let tools_edit = create("div", "tools-mode-edit");

	let tools_edit_image = create ("img", "tools-mode-edit_img");

	tools_edit_image.setAttribute("src", "./assets/admin/images/edit.svg")

	tools_edit.append(tools_edit_image);

	let otstup = create("div", "tools-mode-empty");


	let tools_remove = create("div", "tools-mode-remove");

	let tools_remove_image = create ("img", "tools-mode-remove_img");

	tools_remove_image.setAttribute("src", "./assets/admin/images/delete.svg")

	tools_remove.append(tools_remove_image);
	
	tools_remove.onclick = function(){

		html.outerHTML = ""

		$.ajax({
			url:"assets/admin/php/deleteLineOfItem.php",
			type:"POST",
			data:{"data":data.id},
			datatype:"JSON",
			success:function(data){
				html.outerHTML = ""
			}
		});

		//сделать запрос на сервер для удаления

		return true;
	}

	tools_edit.onclick = function(){
		html.outerHTML = "";

		html.outerHTML = ""

		$.ajax({
			url:"assets/admin/php/deleteLineOfItem.php",
			type:"POST",
			data:{"data":data.id},
			datatype:"JSON",
			success:function(data){
				html.outerHTML = ""
			}
		});
		
		if (data.typeOfTransportation == "0") {

			let self = document.querySelector(".add-plan-post-delivery-btn");
			document.querySelector(".post-delivery-add").innerHTML = "";
			document.querySelector(".post-delivery-add").append(addPlanPanelCreate(data))
			self.classList.remove("new");
			self.classList.add("confirm");
			self.querySelector(".add-plan-btn__title").innerText = "Подтвердить строку плана";

		} else if (data.typeOfTransportation == "1") {

			let self = document.querySelector(".add-plan-delivery-btn");
			document.querySelector(".delivery-add").innerHTML = "";
			document.querySelector(".delivery-add").append(addPlanPanelCreate(data, true))
			self.classList.remove("new");
			self.classList.add("confirm");
			self.querySelector(".add-plan-btn__title").innerText = "Подтвердить строку плана";

		}


		return true;
	}


	tools.append(otstup,tools_edit, tools_remove);

	html.append(tools);

	console.log(this.countProduct);

	return true;

}

let clearingHtmlFromTagAndContentBySelector = function(selector) {
	let tools_selectors = document.querySelectorAll(selector);

	for ( let item of tools_selectors ) {
		item.outerHTML = "";
	}
}


