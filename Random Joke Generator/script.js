const jokeDisplay = document.getElementById("joke-display");
const newJokeButton = document.getElementById("new-joke-btn");
const categorySelect = document.getElementById("category-select");

const jokeApiUrl = "https://official-joke-api.appspot.com";

// Function to fetch a joke
async function fetchJoke(category) {
  let url;
  if (category === "programming") {
    url = `${jokeApiUrl}/jokes/programming/random`;
  } else if (category === "general") {
    url = `${jokeApiUrl}/jokes/general/random`;
  } else {
    url = `${jokeApiUrl}/jokes/random`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayJoke(data[0]);
  } catch (error) {
    jokeDisplay.textContent = "Failed to fetch joke. Please try again!";
    console.error(error);
  }
}

// Function to display the joke
function displayJoke(joke) {
  jokeDisplay.textContent = `${joke.setup} - ${joke.punchline}`;
}

newJokeButton.addEventListener("click", () => {
  const selectedCategory = categorySelect.value;
  fetchJoke(selectedCategory);
});


fetchJoke("random");
