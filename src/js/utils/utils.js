/**
 * This will format the format number to our pattern
 * @param {*} phoneNumber - the phonenumber
 * @returns The correct format
 */
export const formatPhonenumber = (phoneNumber) => {
  if (phoneNumber.length <= 2) {
    return phoneNumber;
  } else {
    return phoneNumber.slice(0, 2) + "-" + phoneNumber.slice(2); // Insert hyphen after first two digits
  }
};

/**
 * This returns an object with a date and month with the month being a stri
 * @param {*} dateString - the original date string
 * @returns an object with date (number) and month (text)
 */
export const getDateInText = (dateString) => {
  const months = [
    "januari",
    "februari",
    "maart",
    "april",
    "mei",
    "juni",
    "juli",
    "augustus",
    "september",
    "oktober",
    "november",
    "december",
  ];

  const dateParts = dateString.split("/");
  const day = parseInt(dateParts[0]);
  const monthIndex = parseInt(dateParts[1]) - 1; // Month index is zero-based in JavaScript
  const monthText = months[monthIndex];

  return { day: day, month: monthText };
};

/**
 * Updates the name on the file upload button
 */
export const showNewFileNameOnChange = () => {
  $("#ImageUpload").on("change", function () {
    let formElement;
    if ($("#add-news-form").length) {
      formElement = $("#add-news-form");
    } else if ($("#add-new-personnel-form").length) {
      formElement = $("#add-new-personnel-form");
    }
    const formData = new FormData(formElement[0]);
    const imageName = formData.get("ImageUpload").name || "Niks geselecteerd";
    $("#file-chosen").text(imageName);
  });
};

/**
 * This toggle the visibility of the dialog
 * @param {*} element - the element to target
 */
export const showOrHideDialog = (element) => {
  $("#showAddForm").click(function () {
    $(".overlay").show();
    $(element).show();
    $("body").css("overflow", "hidden"); // Disable scrolling
  });

  $(".overlay").click(function () {
    $(".overlay").hide();
    $(element).hide();
    $("body").css("overflow", "auto"); // Enable scrolling
  });
};
