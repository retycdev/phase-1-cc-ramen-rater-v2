const main = () => {
  document.addEventListener("DOMContentLoaded", () => {
    displayRamens(); // Display ramen images
    addSubmitListener(); // Attach form submit listener
  });
};

// Function to display existing ramen images
const displayRamens = () => {
  // Use raw URL from GitHub
  fetch(
    `https://raw.githubusercontent.com/retycdev/phase-1-cc-ramen-rater-v2/main/db.json`
  )
    .then((response) => {
      // Check if the response is okay
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      const ramens = data.ramens; // Access the 'ramens' array in the JSON
      let menu = document.getElementById("ramen-menu"); // Get the ramen menu div

      ramens.forEach((ramen) => {
        // Create an img element for each ramen
        let img = document.createElement("img");
        img.src = ramen.image; // Set the image source to the ramen's image URL
        img.alt = ramen.name; // Set an alt attribute for accessibility

        // Add click event listener to the ramen image
        img.addEventListener("click", () => handleClick(ramen));

        // Append the image to the menu
        menu.appendChild(img);
      });
    })
    .catch((err) => {
      console.error("Error fetching ramen data:", err);
      alert(
        "Sorry, there was an error fetching the ramen data. Please try again later."
      );
    });
};

// Function to handle form submission
const addSubmitListener = () => {
  const form = document.getElementById("new-ramen"); // Get the form element

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect input values from the form
    const ramenName = document.getElementById("new-name").value.trim();
    const ramenImage = document.getElementById("new-image").value.trim();
    const ramenRestaurant = document
      .getElementById("new-restaurant")
      .value.trim();
    const ramenRating = document.getElementById("new-rating").value.trim();
    const ramenComment = document.getElementById("new-comment").value.trim();

    // Simple validation to check if fields are filled
    if (
      !ramenName ||
      !ramenImage ||
      !ramenRestaurant ||
      !ramenRating ||
      !ramenComment
    ) {
      alert("Please fill out all fields.");
      return;
    }

    // Create a new ramen object
    const newRamen = {
      name: ramenName,
      image: ramenImage,
      restaurant: ramenRestaurant,
      rating: ramenRating,
      comment: ramenComment,
    };

    // Create a new ramen image element
    let img = document.createElement("img");
    img.src = ramenImage; // Set the new ramen image source
    img.alt = ramenName; // Set the new ramen alt text (name)

    // Add click event listener to the new ramen image
    img.addEventListener("click", () => handleClick(newRamen));

    // Append the new image to the ramen menu
    document.getElementById("ramen-menu").appendChild(img);

    // Reset the form after submission
    form.reset();
  });
};

// Function to handle the click on a ramen image
const handleClick = (ramen) => {
  // Get the detail elements
  let image = document.getElementsByClassName("detail-image")[0];
  let name = document.getElementsByClassName("name")[0];
  let restaurant = document.getElementsByClassName("restaurant")[0];
  let rating = document.getElementById("rating-display");
  let comment = document.getElementById("comment-display");

  // Update the details with the clicked ramen's information
  image.src = ramen.image;
  name.textContent = ramen.name;
  restaurant.textContent = ramen.restaurant;
  rating.textContent = ramen.rating;
  comment.textContent = ramen.comment;
};

// Start the main function
main();
