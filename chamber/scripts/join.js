const timestamp = document.querySelector("#timestamp");

timestamp.value = new Date().toISOString();

const modalButtons = document.querySelectorAll(".modal-button");
const closeButtons = document.querySelectorAll(".close-modal");

modalButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modalId = button.dataset.modal;
        const modal = document.querySelector(`#${modalId}`);

        modal.showModal();
    });
});

closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});