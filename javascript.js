const dropdowns = document.querySelectorAll(".CountryDropdown");
let frominputplaceholder = document.querySelector(".frominputplaceholder");
let toinputplaceholder = document.querySelector(".toinputplaceholder");
async function getlatestRate(from, to) {
  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.min.json`;
  const data = await fetch(url).then(res => res.json());
  if (!data[from][to]) {
    throw new Error(`Currency '${to}' not found in response`);
  }
  return data[from][to];
}


let selects = document.querySelectorAll("select");
let fromOption = selects[0];
let toOption = selects[1];

for (let dropdown of dropdowns) {
  dropdown.innerHTML = "";

  for (const key in countryList) {
    let option = document.createElement("option");
    option.value = key;
    option.textContent = key;
    if (dropdown.name === "from" && key === "INR") {
      option.selected = key;
    }
    if (dropdown.name === "to" && key === "USD") {
      option.selected = key;
    }
    dropdown.append(option);
  }

  dropdown.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let Newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = Newsrc;
  frominputplaceholder.value = ""; 
  toinputplaceholder.value = ""; 
};

const log = (Print) => {
  console.log(Print);
};

frominputplaceholder.addEventListener("input", async () => {
  let inputValue = frominputplaceholder.value;
  
//   log(fromOption.value);  
//   log(toOption.value);

  let lowerFrom = fromOption.value.toLowerCase();
  let lowerTo = toOption.value.toLowerCase();

  try {
    const rate = await getlatestRate(lowerFrom, lowerTo);
    // console.log(rate);
    toinputplaceholder.value = inputValue * rate;
  } catch(err) {
    console.error(err.message);
  }

  
});
