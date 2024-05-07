const buttonContainerElement = $("#add-button-container");

/**
 * returns the buttonContainerElement element
 * @param {*} text - The text displayed in the button
 */
export const showAddRequestButton = (text) => {
  const addRequestButtonComponent = $(
    `<button class="add-request-button" id="showAddForm"><i class="fa-solid fa-circle-plus add-button-icon"></i>${text}</button>`
  );

  buttonContainerElement.append(addRequestButtonComponent);
};

/**
 * This will determine if a user should be allowed to see the add-request-button
 * @param {*} sessionUser - the user object
 */
export const toggleDisplayAddRequestButton = (sessionUser) => {
  const user = JSON.parse(sessionUser);
  if (user && user.role === "moderator") {
    const pathname = window.location.pathname;
    const displayText = pathname === "/nieuws.html" ? "Nieuw artikel" : "Nieuw personeel";
    showAddRequestButton(displayText);
  }
};
