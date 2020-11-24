// Store HTML elements in const variable

const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")
const loader = document.getElementById("loader")

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loading
function completeLoading(){
    if (!loading.hidden) { 
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//  Get quote from API 
async function getQuote() {
    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        // If author is blank, add unknown 
        if (data.quoteAuthor === "") {
            authorText.innerText = "Unknown";
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        // Reduce font size for longer quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add("long-quote");
        } else {
            quoteText.classList.remove("long-quote");
        }

        // Take API info from json and place into HTML elements
        quoteText.innerText = data.quoteText;
        
        completeLoading();
    } catch (error) {
        getQuote();
    }
}

//Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event listeners
document.getElementById("new-quote").addEventListener("click", function () {
    getQuote();
})
document.getElementById("twitter").addEventListener("click", function () {
    tweetQuote();
})



//on load
getQuote();
