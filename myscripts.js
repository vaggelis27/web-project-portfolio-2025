(() => {
  // Navbar scroll state (adds/removes .navbar-scrolled)
  const nav = document.querySelector(".navbar");
  let ticking = false;

  function applyScrollState() {
    if (!nav) return;
    const scrolled = window.scrollY > 10;
    nav.classList.toggle("navbar-scrolled", scrolled);
    ticking = false;
  }

  function onScrollRaf() {
    if (!ticking) {
      requestAnimationFrame(applyScrollState);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScrollRaf, { passive: true });
  applyScrollState(); // initial check

  // Gallery and PhotoSwipe dimensions
  function enhanceGallery() {
    const galleryLinks = document.querySelectorAll("#gallery a");
    if (!galleryLinks.length) return;

    galleryLinks.forEach((link) => {
      const img = link.querySelector("img");
      if (!img) return;

      // Use image alt as aria-label/title
      const altText = img.getAttribute("alt");
      if (altText) {
        if (!link.hasAttribute("aria-label"))
          link.setAttribute("aria-label", altText);
        if (!link.hasAttribute("title")) link.setAttribute("title", altText);
      }

      // Set dimensions for PhotoSwipe
      const setLightboxDimensions = () => {
        const width = img.naturalWidth || img.width || 1600;
        const height = img.naturalHeight || img.height || 900;
        link.dataset.pswpWidth = Math.round(width);
        link.dataset.pswpHeight = Math.round(height);
      };

      if (img.complete) setLightboxDimensions();
      else img.addEventListener("load", setLightboxDimensions, { once: true });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhanceGallery, {
      once: true,
    });
  } else {
    enhanceGallery();
  }
})();

/* Web3Forms submit handler */
(() => {
  const form = document.getElementById("form");
  const result = document.getElementById("result");
  if (!form || !result) return; // Prevents runtime errors if form doesn't exist

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    result.style.display = "";
    result.textContent = "Please wait...";

    const formData = new FormData(form);
    const obj = Object.fromEntries(formData);

    // obj.access_key = "YOUR_WEB3FORMS_ACCESS_KEY"; // Add this if not defined in HTML

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 200) {
          result.textContent = "Form submitted successfully";
        } else {
          console.log(response);
          result.textContent = data.message || "Submission failed";
        }
      })
      .catch((error) => {
        console.log(error);
        result.textContent = "Something went wrong!";
      })
      .then(() => {
        form.reset();
        setTimeout(() => {
          result.style.display = "none";
        }, 3000);
      });
  });
})();

// Load navbar from index.html
// Load the navbar dynamically
fetch("index.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar-placeholder").innerHTML = data;

    // Highlight active link automatically
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll("#navbar a").forEach((link) => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
      }
    });
  });

window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 80) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});
