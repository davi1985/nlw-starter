function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");
  const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

  fetch(url)
    .then((res) => res.json())
    .then((states) => {
      for (state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]"); // input hidden

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = "<option value=''>Selecione a Cidade</option>";
  citySelect.disabled = true;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }
      citySelect.disabled = false;
    });
}

populateUFs(); // execute the function

document.querySelector("select[name=uf]").addEventListener("change", getCities);

// items
const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]"); // input hidden
let selectedItems = [];
function handleSelectedItem(event) {
  const itemLi = event.target;
  // add or remove class in html
  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;

  // verify if there is items and get all items selecteds
  const alreadySelecyed = selectedItems.findIndex((item) => {
    return item == itemId; // true or false
  });

  if (alreadySelecyed >= 0) {
    // if already selected - remove
    const filteredItems = selectedItems.filter((item) => {
      const itemIsDifferent = item != itemId;
      return itemIsDifferent;
    });
    selectedItems = filteredItems;
  } else {
    // if it is not selected - add
    selectedItems.push(itemId);
  }
  // update hidden input with all selected items
  collectedItems.value = selectedItems;
}
