const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

getRandomUser();
getRandomUser();

let pointer = 0;
let data = [];
// functions
async function getRandomUser() {
    const res = await fetch("https://randomuser.me/api");
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1_000_000),
    };
    addData(newUser);
}

function addData(newUserObj) {
    data.push(newUserObj);
    updateDOM();
}

function updateDOM(providedData = data) {
    main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
    data.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("person");
        div.innerHTML = `<p><strong>${item.name}</strong></p><p>${formatMoney(
            item.money
        )}</p>`;
        main.appendChild(div);
    });
}

function formatMoney(number) {
    return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"); // 12,345.67
}
// Event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", () => {
    data = data.map((user) => {
        return { ...user, money: user.money * 2 };
    });
    updateDOM();
});
showMillionairesBtn.addEventListener("click", () => {
    data = data.filter((item) => {
        return item.money > 1000000;
    });
    updateDOM();
});
sortBtn.addEventListener("click", () => {
    data = data.sort((user1, user2) => {
        return user2.money - user1.money;
    });
    updateDOM();
});
calculateWealthBtn.addEventListener("click", () => {
    let sum = data.reduce((accumulator, user) => {
        return accumulator + user.money;
    }, 0);
    // console.dir(sum);
    const wealthEl = document.createElement("div");
    wealthEl.innerHTML = `<h3><p>Total Wealth: </p><p><strong>${formatMoney(
        sum
    )}</strong></p></h3>`;
    main.appendChild(wealthEl);
    // updateDOM();
});
