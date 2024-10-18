// Main function to start the app logic
const main = () => {
  document.addEventListener("DOMContentLoaded", () => {
    displayRamens(); // Fetch and display ramen images from the server
    addSubmitListener(); // Attach submit listener to form
  });
};

// Function to fetch and display ramen images
const displayRamens = () => {
  fetch(
    "https://github.com/retycdev/phase-1-cc-ramen-rater-v2/blob/main/db.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const menu = document.getElementById("ramen-menu"); // Get ramen menu div
      menu.innerHTML = ""; // Clear menu in case of previous data

      data.forEach((ramen) => {
        const img = document.createElement("img"); // Create img element
        img.src = ramen.image; // Set image source
        img.alt = ramen.name; // Set alt text

        // Add click event listener to display ramen details when clicked
        img.addEventListener("click", () => handleClick(ramen));

        // Append img to the ramen menu div
        menu.appendChild(img);
      });
    })
    .catch((err) => {
      console.error("Error fetching ramen data:", err);
    });
};

// Function to display ramen details when image is clicked
const handleClick = (ramen) => {
  // Get elements for ramen details
  const image = document.querySelector(".detail-image");
  const name = document.querySelector(".name");
  const restaurant = document.querySelector(".restaurant");
  const ratingDisplay = document.getElementById("rating-display");
  const commentDisplay = document.getElementById("comment-display");

  // Update elements with clicked ramen's details
  image.src = ramen.image;
  name.textContent = ramen.name;
  restaurant.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
};

// Function to handle form submission for adding new ramen
const addSubmitListener = () => {
  const form = document.getElementById("new-ramen"); // Get the form element

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form input values
    const ramenName = document.getElementById("new-name").value.trim();
    const ramenRestaurant = document
      .getElementById("new-restaurant")
      .value.trim();
    const ramenImage = document.getElementById("new-image").value.trim();
    const ramenRating = document.getElementById("new-rating").value.trim();
    const ramenComment = document.getElementById("new-comment").value.trim();

    // Validation: Ensure all fields are filled
    if (
      !ramenName ||
      !ramenRestaurant ||
      !ramenImage ||
      !ramenRating ||
      !ramenComment
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // Create a new ramen object
    const newRamen = {
      name: ramenName,
      restaurant: ramenRestaurant,
      image: ramenImage,
      rating: ramenRating,
      comment: ramenComment,
    };

    // Add new ramen image to the menu
    const img = document.createElement("img");
    img.src = ramenImage;
    img.alt = ramenName;

    // Add click event to show new ramen details
    img.addEventListener("click", () => handleClick(newRamen));

    // Append the new ramen to the ramen menu
    document.getElementById("ramen-menu").appendChild(img);

    // Reset the form
    form.reset();
  });
};

// Start the main function
main();
