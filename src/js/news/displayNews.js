import { getNewsItemIdFromURL, isValidNewsItemId } from "./newsValidation.js";

const newsList = $("#news-list"); // selects the news-list element. This display all the articles
const newsDetails = $("#news-details"); // selects the news-details element. This display all a specific article

/**
 * Show all news items
 * @param {*} newsItems - The array of news items
 */
export const showNewsList = (newsItems) => {
  newsItems.reverse();
  newsItems.forEach((item) => {
    const newsListComponent = $(`
    <article class="news-article">
        <div class="img-container">
        ${
          item.HeaderImage
            ? `<img src="src/assets${item.HeaderImage}" class="img-news" alt="">`
            : `<img src="src/assets/images/news/defaultHeader.jpg" class="img-news" alt="">`
        }
        </div>
        <div class="news-preview">
            <div class="article-content">
              <h3>${item.Title}</h3>
              <p class="news-article-date"><small>${item.PublishDate}</small></p>
              <p class="intro-font-family">${item.Intro}</p>
            </div>
            <button class="read-more" data-id="${item.ID}">Lees meer</button>
        </div>
    </article>`);

    newsList.append(newsListComponent);
  });
};

/**
 * Show the selected news item
 * @param {*} id - the selected id
 * @param {*} newsItems - The array of news items
 */
const showDetailsNews = (id, newsItems) => {
  $(".section-header").hide();
  const newsItem = getNewsItem(id, newsItems);

  let detailsComponent = $(`
        <div class="news-title-section">
          <h1>${newsItem.Title}</h1>
          <p><div class="pill">${newsItem.Category}</div></p>
          <p><i>Gepubliceerd: ${newsItem.PublishDate}</i></p>
        </div>
        <div class="header-container-img-news">
        ${
          newsItem.HeaderImage
            ? `<img src="src/assets${newsItem.HeaderImage}" class="img-news" alt="">`
            : `<img src="src/assets/images/news/defaultHeader.jpg" class="img-news" alt="">`
        }
        </div>
        <p class="news-details-intro">${newsItem.Intro}</p>
        <p class="article-spacing">${newsItem.Text}</p>
        ${
          newsItem.Image1
            ? `<div class="container-img-news"><img src="src/assets${newsItem.Image1}" class="img-news" alt=""></div>`
            : ""
        }
        ${newsItem.Text1 ? `<p class="article-spacing">${newsItem.Text1}</p>` : ""}
        ${
          newsItem.Image2
            ? `<div class="container-img-news"><img src="src/assets${newsItem.Image2}" class="img-news" alt=""></div>`
            : ""
        }
        ${newsItem.Text2 ? `<p class="article-spacing">${newsItem.Text2}</p>` : ""}
    `);

  newsDetails.append(detailsComponent);
};

/**
 * This returns the selected news item to display
 * @param {*} id - the selected id
 * @param {*} newsItems - The array of news items
 * @returns - news object
 */
const getNewsItem = (id, newsItems) => {
  return newsItems.find((item) => id === item.ID);
};

/**
 * This determines what view you should be seeing
 * @param {*} newsItems - The array of news items
 */
export const determineDisplayState = (newsItems) => {
  const id = getNewsItemIdFromURL();
  const isValid = isValidNewsItemId(id, newsItems);
  if (id && isValid) {
    showDetailsNews(id, newsItems);
  } else if (id && !isValid) {
    // Handle case where ID is invalid or not provided
    alert("Er bestaat geen artikel met dit id");
    window.location.href = "nieuws.html";
  } else {
    // Otherwise show the list of News
    showNewsList(newsItems);
  }
};
