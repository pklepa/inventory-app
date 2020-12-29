let markedCategories = [];

document.querySelectorAll(".category-checkbox-selector").forEach((item) => {
  const hiddenCheckboxId = item.id.split("_")[1];
  console.log(item.dataset);
  if (item.dataset.ischecked) {
    markedCategories.push(hiddenCheckboxId);
    item.classList.add("selected");
  }

  item.addEventListener("click", (e) => {
    let index = markedCategories.indexOf(hiddenCheckboxId);
    if (index > -1) {
      markedCategories.splice(index, 1);

      document.getElementById(
        hiddenCheckboxId
      ).checked = !document.getElementById(hiddenCheckboxId).checked;
      e.target.classList.toggle("selected");
    } else if (markedCategories.length < 5) {
      markedCategories.push(hiddenCheckboxId);

      document.getElementById(
        hiddenCheckboxId
      ).checked = !document.getElementById(hiddenCheckboxId).checked;
      e.target.classList.toggle("selected");
    }
  });
});
