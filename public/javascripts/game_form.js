let markedCategories = [];

document.querySelectorAll(".category-checkbox-selector").forEach((item) => {
  item.addEventListener("click", (e) => {
    const hiddenCheckboxId = e.target.id.split("_")[1];

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
