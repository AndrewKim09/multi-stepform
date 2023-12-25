let index = 1;

const titles = {1: {title: 'Personal info', subtext: "Please provide your name, email addres, and phone number"},
                2: {title: 'Select your plan', subtext: "You have the option of monthly or yearly billing"},
                3: {title: "Pick add-ons", subtext: "Add-ons help enhance your gaming experience"},
                4: {title: "Finishing up", subtext: "Double-check everything ooks OK before confirming"}} 

const planPrices = {1: {monthly: 9, yearly: 90, name: "Arcade"},
                    2: {monthly: 12, yearly: 120, name: "Advanced"},
                    3: {monthly: 15, yearly: 150, name: "Pro"}}

const addOnPrices = {1: {yearly: 10, monthly: 1, name: "Online Service"},
                     2: {yearly: 20, monthly: 2, name: "Larger Storage"},
                     3: {yearly: 20, monthly: 2, name: "Online Service"}}

document.addEventListener("DOMContentLoaded", () => {

    const nextButton = document.getElementById("next");
    const backButton = document.getElementById("back");

    const switchButton = document.getElementById("switchButton");
    const plans = document.querySelectorAll(".plan");
    const addOnItems = document.querySelectorAll(".addOnItem");

    nextButton.addEventListener("click", () => {
        next();
    });

    backButton.addEventListener("click", () => {
        back();
    });

    switchButton.addEventListener("click", () => {
        planSwitch();
    });

    plans.forEach(plan => {
        plan.addEventListener("click", () => {
            plans.forEach(plan => {
                plan.classList.remove("active");
            });
            plan.classList.add("active");
        });
    });

    addOnItems.forEach(addOnItem => {
        addOnItem.addEventListener("click", () => {
            addOnItem.classList.toggle("active");
            const checkbox = addOnItem.children[0];

            if(addOnItem.classList.contains("active")) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
        });
    });





});

const next = () => {

    if(index == 1){
        const name = document.getElementById("name")
        const email = document.getElementById("email")
        const phone = document.getElementById("phone")

        const infoTextBoxs = document.querySelectorAll(".infoTextBox")

        let check = true

        if(name.value == ""){
            name.classList.add("error");
            infoTextBoxs[0].children[1].classList.remove("hidden");

            check = false
        }
        else{
            name.classList.remove("error"); 
            infoTextBoxs[0].children[1].classList.add("hidden");
        }

        if(email.value == ""){
            email.classList.add("error");
            infoTextBoxs[1].children[1].classList.remove("hidden");
            check = false
        }
        else{
            email.classList.remove("error");
            infoTextBoxs[1].children[1].classList.add("hidden");
        }

        if(phone.value == ""){
            phone.classList.add("error");
            infoTextBoxs[2].children[1].classList.remove("hidden");
            check = false
        }
        else{
            phone.classList.remove("error");
            infoTextBoxs[2].children[1].classList.add("hidden");
        }
        if(check == false){
            return
        }
    }
    if (index < 4) {
        index++;
        document.querySelector("#title").innerHTML = titles[index].title;
        document.querySelector("#subtext").innerHTML = titles[index].subtext;
        document.querySelector("#step" + index).style.display = "block";
        document.querySelector("#step" + (index - 1)).style.display = "none";
        document.querySelector("#sidebarButton" + index).classList.add("current");
        document.querySelector("#sidebarButton" + (index - 1)).classList.remove("current");
    }

    if(index == 3){
        const price = document.querySelectorAll(".addOnPrices");
        const time = document.querySelector(".time.current");

        if(time.id === "monthText"){
            price.forEach((price, index) => {
                price.innerHTML = `$${addOnPrices[index +1].monthly}/mo`;
            });
        }
        else{
            price.forEach((price, index) => {
                price.innerHTML = `$${addOnPrices[index + 1].yearly}/yr`;
            });
        }
    }

    if(index == 4){
        const nextButton = document.querySelector(".nextStepButton");
        nextButton.innerHTML = "Confirm";
        const plan = document.querySelector(".plan.active");
        const time = document.querySelector(".time.current");
        const addOns = document.querySelectorAll(".addOnItem.active");

        const totalBox = document.querySelector(".totalBox");

        const planChoiceBox = document.querySelector(".planChoice");
        const addOnChoicesBox = document.querySelector(".addOnChoices");

        let total = planPrices[plan.dataset.value][time.innerHTML === 'Monthly' ? 'monthly': 'yearly'];

        planChoiceBox.innerHTML = 
        (`
        <div class="planChoiceText">
          <span class="planType">
            ${planPrices[plan.dataset.value].name}(${time.innerHTML})
          </span>
          <span class="change">Change</span>
        </div>
        <p class="planPrice">$${planPrices[plan.dataset.value][time.innerHTML === 'Monthly' ? 'monthly': 'yearly']}/${time.innerHTML === "Monthly" ? 'mo': 'yr'}</p>
        `);

        if(addOns.length > 0){

            const addOnsList = [];

            addOns.forEach(addOn => {
                addOnsList.push({
                    name: addOnPrices[addOn.dataset.value].name,
                    price: addOnPrices[addOn.dataset.value][time.innerHTML === 'Monthly' ? 'monthly': 'yearly']
                })
            })

            addOnChoicesBox.innerHTML = "";
    
            addOnChoicesBox.innerHTML += addOnsList.map((addOn) => {
                total += addOn.price;
    
                return(`
                    <div class="addOnChoice">
                        <p class="addOnType">${addOn.name}</p>
                        <p class="addOnPrice">+$${addOn.price}/${time.innerHTML === 'Monthly' ? 'mo': 'yr'}</p>
                    </div>
                `);
                
    
            }).join('');
            }

        totalBox.children[0].innerHTML = `total (per ${time.innerHTML === "Monthly" ? "month": "year"})`;

        totalBox.children[1].innerHTML = `$${total}`;

    }

    if(index > 1){
        document.querySelector(".backButton").classList.remove("hidden");
    
    }
}

const back = () => {
    if (index > 1) {
        index--;
        document.querySelector("#title").innerHTML = titles[index].title;
        document.querySelector("#subtext").innerHTML = titles[index].subtext;
        document.querySelector("#step" + index).style.display = "block";
        document.querySelector("#step" + (index + 1)).style.display = "none";
        document.querySelector("#sidebarButton" + index).classList.add("current");
        document.querySelector("#sidebarButton" + (index + 1)).classList.remove("current");
        
    }

    if(index == 1){
        document.querySelector(".backButton").classList.add("hidden");
    }

    if(index == 3){
        const nextButton = document.querySelector(".nextStepButton");
        nextButton.innerHTML = "Next Step";
    }
}

const planSwitch = () => {
    const switchBall = document.getElementById("switchBall");
    const monthly = document.getElementById("monthText");
    const yearly = document.getElementById("yearText");
    const prices = document.querySelectorAll(".price");
    const discounts = document.querySelectorAll(".discount");
    switchBall.classList.toggle("active");

    monthly.classList.toggle("current");
    monthly.classList.toggle("year");
    yearly.classList.toggle("current");

    if(monthly.classList.contains("year")) {
        prices[0].innerHTML = "$90/yr";
        prices[1].innerHTML = "$120/yr";
        prices[2].innerHTML = "$150/yr";
    }
    else{
        prices[0].innerHTML = "$9/mo";
        prices[1].innerHTML = "$12/mo";
        prices[2].innerHTML = "$15/mo";
    }

    discounts.forEach(discount => {
        discount.classList.toggle("hidden");
    });
}