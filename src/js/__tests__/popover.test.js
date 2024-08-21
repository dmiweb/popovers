/**
 * @jest-environment jsdom
 */

import Popover from "../components/popover/popover";

const button = document.createElement("button");

document.body.appendChild(button);

new Popover(button);

test("testing show popover", () => {
  button.click();

  const popover = document.querySelector(".popover");

  expect(popover).not.toBeNull();
});

test("testing hide popover", () => {
  button.click();

  const popover = document.querySelector(".popover");

  expect(popover).toBeNull();
});
