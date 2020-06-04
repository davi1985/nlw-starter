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
  const stateInput = document.querySelector("input[name=state]");

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

populateUFs();

document.querySelector("select[name=uf]").addEventListener("change", getCities);

const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]");
let selectedItems = [];
function handleSelectedItem(event) {
  const itemLi = event.target;
  // add or remove class
  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;

  //verificar se existem items
  //pegar items selecionados
  const alreadySelecyed = selectedItems.findIndex((item) => {
    return item == itemId; // true or false
  });

  if (alreadySelecyed >= 0) {
    //se ja estiver selecionado tirar da seleção
    const filteredItems = selectedItems.filter((item) => {
      const itemIsDifferent = item != itemId;
      return itemIsDifferent;
    });
    selectedItems = filteredItems;
  } else {
    //se não estiver selecionado adicionar
    selectedItems.push(itemId);
  }
  // atualizar o campo escondido com os itens
  collectedItems.value = selectedItems;
}
