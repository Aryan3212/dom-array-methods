const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

getRandomUser();

getRandomUser();


let pointer = 0;
let data = [];
// functions
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    
    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1_000_000),
    };
    addData(newUser);
}

function addData(newUserObj){
    data.push(newUserObj);
    updateDOM();
}

function updateDOM(providedData = data){
    main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
    data.forEach((item)=>{
        const div = document.createElement('div');
        div.classList.add('person');
        div.innerHTML = `<p>${item.name}</p><p>${item.money}</p>`;
        main.appendChild(div);
    });
}
// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', ()=>{
    data.map((user)=>
    {
       return  {...user}, money: money*2};
    });
showMillionairesBtn.addEventListener('click', getRandomUser);
sortBtn.addEventListener('click', getRandomUser);
calculateWealthBtn.addEventListener('click', getRandomUser);
