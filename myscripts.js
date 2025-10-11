// Add alt text to gallery links for accessibility
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#gallery a").forEach((link) => {
    const img = link.querySelector("img");
    if (!img) return;

    const altText = img.getAttribute("alt");
    if (altText) {
      if (!link.hasAttribute("aria-label")) {
        link.setAttribute("aria-label", altText);
      }

      if (!link.hasAttribute("title")) {
        link.setAttribute("title", altText);
      }
    }

    const setLightboxDimensions = () => {
      const { naturalWidth, naturalHeight } = img;
      let width = naturalWidth;
      let height = naturalHeight;

      if (!width || !height) {
        const rect = img.getBoundingClientRect();
        width = rect.width || img.width || 1600;
        height = rect.height || img.height || 900;
      }

      link.dataset.pswpWidth = Math.round(width);
      link.dataset.pswpHeight = Math.round(height);
    };

    if (img.complete) {
      setLightboxDimensions();
    } else {
      img.addEventListener("load", setLightboxDimensions, { once: true });
    }
  });
});

document.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});

//  Form submission using Web3Forms
const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = "Form submitted successfully";
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 3000);
    });
});
