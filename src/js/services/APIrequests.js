/**
 * This gets and returns a promise
 * @param {*} url - API Endpoint
 * @returns array with objects
 */
export const fetchCall = (url) => {
  return new Promise((resolve, reject) => {
    $.getJSON(url, (data) => {
      resolve(data);
    }).fail((xhr, status, error) => {
      reject(error);
    });
  });
};

/**
 * This adds either adds news or personnel to our DB
 * @param {*} url - API Endpoint
 * @param {*} formData - all the information from the FROM (inputs, textareas etc)
 * @param {*} redirectLocation - The location to redirect to
 */
export const pushCall = (url, formData, redirectLocation) => {
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    success: function () {
      window.location.href = redirectLocation;
    },
    error: function (xhr, status, error) {
      console.error("Error adding data:", error);
    },
  });
};

/**
 * This will check if the user is logged in
 * @param {*} username - Username
 * @param {*} password - Password
 */
export const setUser = (username, password) => {
  $.post("/login", { username, password })
    .done(function (response) {
      // IMPORTANT!
      // You shouldn't save users in localStorage its very insecure!
      // This is only done for testing purposes
      localStorage.setItem("user", JSON.stringify(response.user));
    })
    .fail(function () {
      alert("Invalid username/email or password.");
    });
};
