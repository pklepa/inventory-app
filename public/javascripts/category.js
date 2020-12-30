const modal = document.getElementById("delete-category-modal");

document
  .getElementById("delete-category-cancel-btn")
  .addEventListener("click", (e) => {
    modal.classList.add("hide");
  });

document
  .getElementById("show-delete-category-modal-btn")
  .addEventListener("click", (e) => {
    modal.classList.remove("hide");
  });
