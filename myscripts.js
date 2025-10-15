// ✅ Updated script – modified because the page was lagging during scroll,
// especially on the gallery section. Improved performance and added safety checks.

// Add alt text to gallery links for accessibility
document.addEventListener("DOMContentLoaded", () => {
  const galleryLinks = document.querySelectorAll("#gallery a");
  if (galleryLinks.length) {
    galleryLinks.forEach((link) => {
      const img = link.querySelector("img");
      if (!img) return;

      const altText = img.getAttribute("alt");
      if (altText) {
        if (!link.hasAttribute("aria-label"))
          link.setAttribute("aria-label", altText);
        if (!link.hasAttribute("title")) link.setAttribute("title", altText);
      }

      const setLightboxDimensions = () => {
        const { naturalWidth, naturalHeight } = img;
        let width = naturalWidth || img.width || 1600;
        let height = naturalHeight || img.height || 900;

        link.dataset.pswpWidth = Math.round(width);
        link.dataset.pswpHeight = Math.round(height);
      };

      if (img.complete) {
        setLightboxDimensions();
      } else {
        img.addEventListener("load", setLightboxDimensions, { once: true });
      }
    });
  }
});

// Updated scroll event – changed because it was causing scroll lag.
// Added passive listener and requestAnimationFrame throttling for smoother performance.
(() => {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          navbar.classList.add("navbar-scrolled");
        } else {
          navbar.classList.remove("navbar-scrolled");
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  // Passive listener for smoother scrolling
  window.addEventListener("scroll", onScroll, { passive: true });
  // Initial state check
  onScroll();
})();

// ✅ Updated Web3Forms submit handler – changed because the script threw errors
// on pages without a form, which caused the page to freeze or stutter.
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
