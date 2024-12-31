const API_KEY = "10ad0afe25714c8b96fdae2e928a94d1"; // API key for accessing the news API
const url = "https://newsapi.org/v2/"; // Base URL for the news API

let currentPage = 1; //<a> Initialize page counter for infinite scroll
let currentQuery = "bangladesh"; //<j> Default query used for the initial load
let isLoading = false; //<h> Boolean flag to prevent duplicate API requests
let firstLoad = true; //<a> Boolean flag to show loading bar and alert only on initial load

//<r> Attach an event listener to the window load event
window.addEventListener("load", () => fetchNews(currentQuery, currentPage)); // <U> Fetch initial news articles when page loads


// <l> Add this block immediately after the initial variable declarations:
window.addEventListener("load", () => {
    fetchNews(currentQuery, currentPage); // Load initial news articles on page load
    searchText.value = ""; // Clear the search input field on page load
});


// Function to reload the current page
function reload() {
    window.location.reload(); //   Refreshes the current view of the page
}

// Function to fetch news articles from the API based on a query and page
async function fetchNews(query, page = 1) {
    if (isLoading) return; //  <Ajharul> Exit if a request is already in progress
    isLoading = true; // Set loading flag to prevent duplicate requests

    const loadingBar = document.getElementById("loading-bar"); // Get the loading bar element by its ID
    if (firstLoad) loadingBar.style.display = "block"; // Show loading bar only on the first load

    let apiUrl; // Declare a variable to store the API endpoint URL
    // Customize API URL based on the specific query type
    if (query.toLowerCase() === "sports") {
        apiUrl = `${url}everything?q=football OR cricket&apiKey=${API_KEY}&sortBy=publishedAt&page=${page}`; // URL for sports news
    } else if (query.toLowerCase() === "technology") {
        apiUrl = `${url}everything?q=technology&apiKey=${API_KEY}&sortBy=publishedAt&page=${page}`; // URL for technology news
    } else {
        apiUrl = `${url}everything?q=${query}&apiKey=${API_KEY}&sortBy=publishedAt&page=${page}`; // General query URL
    }

    try {
        const res = await fetch(apiUrl); // Make the API request
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`); // Handle HTTP errors
        const data = await res.json(); // Parse response as JSON data
        if (!data.articles || data.articles.length === 0) { // Check if articles are available
            if (page === 1 && firstLoad) alert("No articles found for this query."); // Show alert if no articles on first load
            window.removeEventListener("scroll", handleScroll); // Stop infinite scroll if no more articles
            return; // Exit function if no articles found
        }
        bindData(data.articles); // Append fetched articles to the page
        currentPage++; // Increment page for next load in infinite scroll
    } catch (error) {
        console.error("Error fetching news:", error); // Log any errors to the console
        if (firstLoad) alert("Failed to fetch news. Please try again later."); // Show alert on error if it’s the first load
    } finally {
        isLoading = false; // Reset loading flag after fetch is complete
        if (firstLoad) {
            loadingBar.style.display = "none"; // Hide loading bar after first load is complete
            firstLoad = false; // Set firstLoad to false to prevent loading bar on subsequent loads
        }
    }
}

// Function to bind the fetched articles to the UI
function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container"); // Get the container element for news cards
    const newsCardTemplate = document.getElementById("template-news-card"); // Get the news card template element

    articles.forEach((article) => { // Loop through each article in the fetched data
        if (!article.urlToImage) return; // Skip articles without an image
        const cardClone = newsCardTemplate.content.cloneNode(true); // Clone the news card template
        fillDataInCard(cardClone, article); // Fill the cloned card with article data
        cardsContainer.appendChild(cardClone); // Append the card to the container
    });
}

// Function to fill a news card with data from a single article
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img"); // Get image element in the card
    const newsTitle = cardClone.querySelector("#news-title"); // Get title element in the card
    const newsSource = cardClone.querySelector("#news-source"); // Get source element in the card
    const newsDesc = cardClone.querySelector("#news-desc"); // Get description element in the card

    newsImg.src = article.urlToImage; // Set the source of the image element
    newsTitle.innerHTML = article.title || "No title available."; // Set the title or default text if unavailable
    newsDesc.innerHTML = article.description || "No description available."; // Set description or default text

    const date = new Date(article.publishedAt).toLocaleString("en-US", { // Format the publication date in Dhaka timezone
        timeZone: "Asia/Dhaka",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`; // Set the source name and formatted date
    cardClone.firstElementChild.addEventListener("click", () => { // Add click event to open article in new tab
        window.open(article.url, "_blank"); // Open article in a new browser tab
    });
}

// Navigation item click handler function
let curSelectedNav = null; // Variable to keep track of the selected navigation item
function onNavItemClick(id) {
    window.scrollTo(0, 0); // Scroll to the top of the page
    currentQuery = id; // Set current query to the clicked navigation item’s ID
    currentPage = 1; // Reset page counter for new query
    isLoading = false; // Reset loading flag
    firstLoad = true; // Reset firstLoad flag for new navigation selection
    document.getElementById("cards-container").innerHTML = ""; // Clear previous articles
    fetchNews(currentQuery, currentPage); // Fetch news based on the selected navigation item

    const navItem = document.getElementById(id); // Get the clicked navigation item
    curSelectedNav?.classList.remove("active"); // Remove active class from previously selected item
    curSelectedNav = navItem; // Set the clicked navigation item as the current selection
    curSelectedNav.classList.add("active"); // Add active class to the selected item
}

// Search button click event listener
const searchButton = document.getElementById("search-button"); // Get the search button element
const searchText = document.getElementById("search-text"); // Get the search input element

searchButton.addEventListener("click", () => { // Attach click event to search button
    const query = searchText.value.trim(); // Get and trim the search query text
    if (!query) return; // Exit if search text is empty
    currentQuery = query; // Set current query to the search query
    currentPage = 1; // Reset page counter for new search
    firstLoad = true; // Reset firstLoad flag for new search
    document.getElementById("cards-container").innerHTML = ""; // Clear previous articles
    fetchNews(currentQuery, currentPage); // Fetch news based on search query
    curSelectedNav?.classList.remove("active"); // Remove active class from any selected nav item
    curSelectedNav = null; // Clear current navigation selection
});

// Infinite scroll function to fetch more news as the user scrolls down
function handleScroll() {
    const scrollTop = window.scrollY; // Get the current vertical scroll position
    const docHeight = document.documentElement.scrollHeight - window.innerHeight; // Calculate total scrollable height
    const scrollPercent = (scrollTop / docHeight) * 100; // Calculate scroll percentage

    if (scrollPercent > 99 && !isLoading) { // Fetch more articles when scrolled over 99%
        fetchNews(currentQuery, currentPage); // Fetch more news
    }
}

// Attach the scroll event for infinite scroll
window.addEventListener("scroll", handleScroll); // Listen for scroll events to trigger handleScroll function

// Function to update the loading bar based on page scroll percentage
function updateLoadingBar() {
    const scrollTop = window.scrollY; // Get the current vertical scroll position
    const docHeight = document.documentElement.scrollHeight - window.innerHeight; // Calculate total scrollable height
    const scrollPercent = (scrollTop / docHeight) * 100; // Calculate scroll percentage

    loadingBar.style.display = "block"; // Ensure loading bar is visible
    loadingBar.querySelector(".loading-bar-inner").style.width = scrollPercent + "%"; // Update loading bar width based on scroll
}

// Listen for scroll events to update the loading bar
window.addEventListener("scroll", updateLoadingBar); // Attach the scroll event listener for loading bar updates
