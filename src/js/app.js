import Popover from "../js/components/popover/popover";

document.addEventListener("DOMContentLoaded", () => {
  const buttonElement = `<button class="btn" data-title="Popover title" data-content="And here's some amazing content. It's very engaging. Right?">
                    Click to toggle popover
                  </button>
                 `;

  document.body.insertAdjacentHTML("beforeEnd", buttonElement);

  const button = document.querySelector(".btn");

  new Popover(button);
});
