import { toggleDisplayAddRequestButton } from "./src/js/components/showButtons.js";
import { setUser } from "./src/js/services/APIrequests.js";

// Import CSS modules
import "./src/styles/base.css";
import "./src/styles/layout.css";
import "./src/styles/buttons.css";
import "./src/styles/forms.css";
import "./src/styles/news.css";
import "./src/styles/smoelenboek.css";
import "./src/styles/others.css";
import "./src/styles/inputs.css";

$(document).ready(function () {
  $(window).scroll(function () {
    var header = $("header");
    if ($(this).scrollTop() > 0) {
      header.addClass("shadow");
    } else {
      header.removeClass("shadow");
    }
  });

  // IMPORTANT! The following is only done so for purpose of faking a login
  // change username to either: user or moderator
  // to see the add buttons disappear or appear
  // only the moderator can add new articles/persons
  const username = "moderator";
  const password = "password";

  const userExists = localStorage.getItem("user");

  if (!userExists) {
    setUser(username, password);
  }

  toggleDisplayAddRequestButton(userExists);
});
