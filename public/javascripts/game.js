const modal = document.getElementById("delete-modal");

document.getElementById("delete-cancel-btn").addEventListener("click", (e) => {
  modal.classList.add("hide");
});

document
  .getElementById("show-delete-modal-btn")
  .addEventListener("click", (e) => {
    modal.classList.remove("hide");
  });
