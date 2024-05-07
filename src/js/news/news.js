import { fetchCall, pushCall } from "../services/APIrequests.js";
import { determineDisplayState } from "./displayNews.js";

// Utils
import { inputValidation } from "./../utils/validation.js";
import { showNewFileNameOnChange, showOrHideDialog } from "./../utils/utils.js";

// Execute following once the DOM has been loaded
$(document).ready(async () => {
  try {
    const newsItems = await fetchCall("/news");
    determineDisplayState(newsItems.nieuws);

    // clicking ReadMore will show a detail view of the selected news article
    $(".read-more").click((event) => {
      const newsId = $(event.currentTarget).attr("data-id");
      window.location.href = `nieuws.html?id=${newsId}`;
    });
  } catch (error) {
    console.error("Error fetching news items:", error);
  }

  // Submit will send a POST to the backend with a new news article
  $("#add-news-form").submit(function (event) {
    event.preventDefault(); // Prevent default form submission
    const endpoint = "/add-news-article";
    const redirect = "nieuws.html";

    // Collect form data
    const formData = new FormData($(this)[0]);
    // Validate formData
    const formDataIsValid = inputValidation(formData, ["Title", "Intro", "Text"]);

    if (formDataIsValid) {
      pushCall(endpoint, formData, redirect);
    }
  });

  // Eventlisteners
  showOrHideDialog("#add-news");
  showNewFileNameOnChange();
});
