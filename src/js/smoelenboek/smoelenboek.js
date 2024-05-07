import { fetchCall, pushCall } from "../services/APIrequests.js";
import { showSmoelenboekList, showUpComingBirthday } from "./displaySmoelenboek.js";

// Utils
import { formatPhonenumber, showNewFileNameOnChange, showOrHideDialog } from "./../utils/utils.js";
import { inputValidation } from "./../utils/validation.js";
import { upcomingBirthday } from "./upComingBirthday.js";

$(document).ready(async () => {
  try {
    const personnelList = await fetchCall("/smoelenboek");
    showSmoelenboekList(personnelList.smoelenboek);
    const thePerson = upcomingBirthday(personnelList);
    showUpComingBirthday(thePerson);
  } catch (error) {
    console.error("Error fetching news items:", error);
  }

  // Submit will send POST with a new person
  $("#add-new-personnel-form").submit(function (event) {
    event.preventDefault(); // Prevent default form submission
    const endpoint = "/add-new-personnel";
    const redirect = "smoelenboek.html";

    // Collect form data
    const formData = new FormData($(this)[0]);
    // Validate formData
    const formDataIsValid = inputValidation(formData, [
      "FirstName",
      "LastName",
      "DateOfBirth",
      "Email",
      "Telephonenumber",
    ]);

    // if formData is valid push to endpoint
    if (formDataIsValid) {
      pushCall(endpoint, formData, redirect);
    }
  });

  // Will format the phone number on change
  $("#Telephonenumber").on("input", function () {
    const input = $(this);
    const inputValue = input.val().replace(/[^\d]/g, ""); // Removes all non-numeric characters
    const formattedValue = formatPhonenumber(inputValue);
    input.val(formattedValue);
  });

  showOrHideDialog("#add-personnel");
  showNewFileNameOnChange();
});
