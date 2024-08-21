import "./popover.css";

export default class Popover {
  constructor(element) {
    this.element = element;

    this.showPopover = this.showPopover.bind(this);
    this.hidePopover = this.hidePopover.bind(this);

    this.element.addEventListener("click", this.showPopover);
  }

  popoverRender(id) {
    return `
    <div class="popover" id="${id}">
      <div class="popover-header">${this.element.getAttribute(
        "data-title"
      )}</div>
      <div class="popover-body">${this.element.getAttribute(
        "data-content"
      )}</div>
      <div class="popover-arrow-left"></div>
      <div class="popover-arrow-right"></div>
    </div>
  `;
  }

  showPopover() {
    if (this.element.getAttribute("aria-describedby")) return;

    this.element.setAttribute("aria-describedby", performance.now());

    const valueAttributeElement = this.element.getAttribute("aria-describedby");
    const popoverElement = this.popoverRender(valueAttributeElement);

    this.element.insertAdjacentHTML("beforeBegin", popoverElement);

    const { top, right } = this.element.getBoundingClientRect();
    const popovers = document.querySelectorAll(".popover");

    popovers.forEach((popover) => {
      if (popover.id === valueAttributeElement) {
        popover.style.left =
          right - popover.offsetWidth / 2 - this.element.offsetWidth / 2 + "px";
        popover.style.top = top - popover.offsetHeight - 10 + "px";
      }
    });

    this.element.addEventListener("click", this.hidePopover);
  }

  hidePopover() {
    const popovers = document.querySelectorAll(".popover");

    popovers.forEach((popover) => {
      if (popover.id === this.element.getAttribute("aria-describedby")) {
        this.element.removeAttribute("aria-describedby");
        popover.remove();
        this.element.removeEventListener("click", this.hidePopover);
      }
    });
  }
}
