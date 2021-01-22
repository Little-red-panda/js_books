var customSelect, i, j, selectElmnt, selectedElmnt, itemsElmnt, optionsElmnt;
customSelect = document.getElementsByClassName("form__custom-select");
for (i = 0; i < customSelect.length; i++) {
  selectElmnt = customSelect[i].getElementsByTagName("select")[0];
  selectedElmnt = document.createElement("DIV");
  selectedElmnt.setAttribute("class", "form__select-selected");
  selectedElmnt.innerHTML = selectElmnt.options[selectElmnt.selectedIndex].innerHTML;
  customSelect[i].appendChild(selectedElmnt);
  itemsElmnt = document.createElement("DIV");
  itemsElmnt.setAttribute("class", "form__select-items form__select-hide");
  for (j = 1; j < selectElmnt.length; j++) {
    optionsElmnt = document.createElement("DIV");
    optionsElmnt.innerHTML = selectElmnt.options[j].innerHTML;
    optionsElmnt.addEventListener("click", function(e) {
        var sameSelected, i, k, select, newSelected;
        select = this.parentNode.parentNode.getElementsByTagName("select")[0];
        newSelected = this.parentNode.previousSibling;
        for (i = 0; i < select.length; i++) {
          if (select.options[i].innerHTML == this.innerHTML) {
            select.selectedIndex = i;
            newSelected.innerHTML = this.innerHTML;
            sameSelected = this.parentNode.getElementsByClassName("form__same-as-selected");
            for (k = 0; k < sameSelected.length; k++) {
              sameSelected[k].removeAttribute("class");
            }
            this.setAttribute("class", "form__same-as-selected");
            selectedElmnt.classList.add("select-active");
            break;
          }
        }
        newSelected.click();
    });
    itemsElmnt.appendChild(optionsElmnt);
  }
  customSelect[i].appendChild(itemsElmnt);
  selectedElmnt.addEventListener("click", function(e) {
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("form__select-hide");
  });
}

function closeAllSelect(elmnt) {
  var items, selected, i, arrNo = [];
  items = document.getElementsByClassName("form__select-items");
  selected = document.getElementsByClassName("form__select-selected");
  for (i = 0; i < selected.length; i++) {
    if (elmnt == selected[i]) {
      arrNo.push(i)
    }
  }
  for (i = 0; i < items.length; i++) {
    if (arrNo.indexOf(i)) {
      items[i].classList.add("form__select-hide");
    }
  }
}

document.addEventListener("click", closeAllSelect);