
# News Fetch Application

This project is a web-based application that fetches and displays news articles using the News API. It supports dynamic searches, categorized navigation, and infinite scrolling for a seamless user experience.

## Features

- **Dynamic News Fetching**: Fetches news articles from the News API based on a user query or category.
- **Search Functionality**: Users can search for news articles by entering a keyword.
- **Category Navigation**: Predefined categories such as "Sports" and "Technology" allow users to explore specific topics.
- **Infinite Scroll**: Automatically loads more articles as the user scrolls down.
- **Interactive UI**: Clickable news cards open the full article in a new browser tab.
- **Loading Bar**: Displays a loading bar during content fetch and updates it based on scroll percentage.

## Technologies Used

- **HTML**: For structuring the user interface.
- **CSS**: For styling the application.
- **JavaScript**: For dynamic functionality, API requests, and user interactions.
- **News API**: Provides the news data.

## Prerequisites

1. A valid API key from the [News API](https://newsapi.org/).
2. A modern web browser!

# How It Works

1. **Page Load**: On initial load, the application fetches and displays news articles based on the default query (e.g., "Bangladesh").
2. **Search**: Users can search for news articles by entering a query in the search bar and clicking the search button.
3. **Category Navigation**: Clicking a category navigates the user to related news articles.
4. **Infinite Scroll**: As the user scrolls past 99% of the page, more articles are fetched automatically.
5. **Clickable News Cards**: Each news card includes an image, title, description, and source. Clicking the card opens the article in a new tab.

## File Structure

- `index.html`: Contains the structure of the web application.
- `styles.css`: Handles the styling of the application.
- `app.js`: Contains all the logic for fetching news, handling user interactions, and updating the UI.

## Key Functions

### `fetchNews(query, page)`
Fetches news articles from the API based on the given query and page number.

### `bindData(articles)`
Binds fetched articles to the UI by creating and appending news cards.

### `fillDataInCard(cardClone, article)`
Fills a news card with data from an individual article.

### `onNavItemClick(id)`
Handles category navigation and fetches related articles.

### `handleScroll()`
Implements infinite scrolling by fetching more articles when the user reaches the bottom of the page.

### `updateLoadingBar()`
Updates the width of the loading bar based on the scroll position.

## Usage

1. Open the application in your browser.
2. Browse news articles by scrolling, searching, or using the navigation menu.
3. Click a news card to open the full article in a new tab.

## Notes

- Ensure the API key is kept private to avoid misuse.
- The application requires an active internet connection to fetch news.

## Potential Enhancements

- Add more categories to the navigation menu.
- Implement pagination controls for better navigation.
- Enhance the UI with animations and responsive design.
- Add error handling for specific error codes from the API.

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add a descriptive commit message"
   ```
4. Push to your forked repository:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request to the main repository.

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute it as per the license terms.

