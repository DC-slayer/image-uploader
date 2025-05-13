const dropdown = document.getElementById("dropdown");
const languageMenu = document.getElementById("language-menu");
const English = document.getElementById("English");
const womenMenu = document.getElementById("women_menu")
const womFash = document.getElementById("EX_1");
const womenDrop = document.getElementById("women_drop");
const carousel = document.getElementById("carousel");
const slides = document.querySelectorAll(".slides");
const scrollArrowLeft = document.getElementById("arrow_scroll_left");
const scrollArrowRight = document.getElementById("arrow_scroll_right");
const hrtIcon = document.getElementById("heart_icon");
const hrtIcon1 = document.getElementById("heart_icon1")
const totalSlides = slides.length; // Total number of slides
let index = 0;

// Open/Close the dropdown
English.addEventListener("click", () => {
  const isMenuVisible = languageMenu.classList.contains("show");
  if (isMenuVisible) {
    languageMenu.classList.remove("show");
    dropdown.classList.remove("rotate");
    English.style.color = "#ffffff";
    English.style.background = "#000000";
  } else {
    languageMenu.classList.add("show");
    dropdown.classList.add("rotate");
    English.style.color = "#000000";
    English.style.background = "#ffffff";
  }
});

womFash.addEventListener("click", () => {
  const isDropdownVisible = womenMenu.classList.contains("show");
  if (isDropdownVisible) {
      console.log("It does have it, unsuccessful");
      womenMenu.classList.remove("show");
      womenDrop.classList.remove("rotate");
  } else {
      console.log("It doesn't have it, successful");
      womenMenu.classList.add("show");
      womenDrop.classList.add("rotate");
  }
});

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
  if (!English.contains(event.target)) {
    languageMenu.classList.remove("show");
    dropdown.classList.remove("rotate");
    English.style.color = "#ffffff";
    English.style.background = "#000000";
  }
});

// Fetch translations and set up language change
fetch('translations.json')
  .then(response => response.json())
  .then(data => {
    const languageOptions = document.querySelectorAll('.language-option'); // Target all language options

    // Add click event to each language option
    languageOptions.forEach(option => {
      option.addEventListener('click', () => {
        const selectedLanguage = option.getAttribute('data-lang'); // Get the language code
        if (data[selectedLanguage]) {
          updateLanguage(data, selectedLanguage); // Update page content
          languageMenu.classList.remove("show"); // Close menu after selection
          dropdown.classList.remove("rotate");
          console.log(`Language switched to: ${selectedLanguage}`);
        } else {
          console.error(`Language "${selectedLanguage}" not found in JSON data.`);
        }
      });
    });

    // Function to dynamically update all elements
    const updateLanguage = (translations, language) => {
      const translationData = translations[language];
      if (translationData) {
        Object.keys(translationData).forEach(key => {
          const element = document.getElementById(key);
          if (element) {
            element.innerText = translationData[key];
            console.log(`Updated ${key} with "${translationData[key]}"`);
          } else {
            console.warn(`Element with id "${key}" not found in HTML.`);
          }
        });
      } else {
        console.error(`Translations for language "${language}" are undefined.`);
      }
    };
  })
  .catch(error => console.error("Error loading JSON:", error));


// Create dots dynamically
const dotsContainer = document.getElementById("carousel-dots");
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.addEventListener("click", () => {
        index = i; // Set index to the clicked dot
        updateCarousel();
    });
    dotsContainer.appendChild(dot);
}

// Function to update the carousel and dots
function updateCarousel() {
    carousel.style.transform = `translateX(-${index * 119}%)`;
    updateDots();
}

// Function to update the active state of the dots
function updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
        dot.classList.remove("active");
        if (i === index) {
            dot.classList.add("active");
        }
    });
}

// Slide automatically every 3 seconds
setInterval(() => {
    index++;
    if (index >= totalSlides) {
        index = 0; // Loop back to the first slide
    }
    updateCarousel();
}, 3000);

// Initialize dots on page load
updateDots();

scrollArrowRight.addEventListener('click', () => {
  for( let i = 0; i < 2; i++) {
  const firstProducts = document.getElementById("first_product");
  firstProducts.style.transform = `translateX(-46%)`
  }
}
)
scrollArrowLeft.addEventListener('click', () => {
  for( let i = 0; i < 2; i++) {
  const firstProducts = document.getElementById("first_product");
  firstProducts.style.transform = `translateX(0%)`
  }
}
)

  // Set the countdown duration (in seconds)
  const countdownDuration = 345600; // 1 day in seconds (for example)
  let timeLeft = countdownDuration;

  function updateCountdown() {
      // Calculate days, hours, minutes, and seconds
      const days = Math.floor(timeLeft / (3600 * 24));
      const hours = Math.floor((timeLeft % (3600 * 24)) / 3600);
      const minutes = Math.floor((timeLeft % 3600) / 60);
      const seconds = timeLeft % 60;

      function formatTime(value) {
        return value < 10 ? '0' + value : value; // Add leading zero if value is less than 10
    }
      // Update the countdown display
      document.getElementById('Days').innerText = 
          `${formatTime(days)}`;
      document.getElementById('Hours').innerText = 
        `${formatTime(hours)}`;
      document.getElementById('Minutes').innerText = 
        `${formatTime(minutes)}`;
      document.getElementById('Seconds').innerText = 
        `${formatTime(seconds)}`;
      // Check if the countdown has finished
      if (timeLeft <= 0) {
          clearInterval(countdown);
          document.getElementById('Days').innerText = "0";
          document.getElementById('Hours').innerText = "00";
          document.getElementById('Minutes').innerText = "00";
          document.getElementById('Seconds').innerText = "00";
      } else {
          timeLeft--; // Decrease the time left by 1 second
      }
  }

  // Start the countdown
  const countdown = setInterval(updateCountdown, 1000); // Update every second

  // Initial call to display the countdown immediately
  updateCountdown();


function myfunc(){
  try{
    hrtIcon.style.display = "none";
    hrtIcon1.style.display = 'flex';
  }catch{
    console.log("What tf are you doing?");
  }
}

function myfunc1(){
  try{
    hrtIcon1.style.display = 'none';
    hrtIcon.style.display = "flex";
  }catch{
    console.log("I've forgotten how to Javascript");
  }
}