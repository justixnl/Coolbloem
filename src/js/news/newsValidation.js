/**
 * Get the ID from the URL
 * @returns the ID
 */
export const getNewsItemIdFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
};

/**
 * Check if the ID exists in the news items
 * @param {*} id - the selected id
 * @param {*} newsItems - The array of news items
 * @returns a boolean
 */
export const isValidNewsItemId = (id, newsItems) => {
  return newsItems.some((item) => item.ID === id);
};
