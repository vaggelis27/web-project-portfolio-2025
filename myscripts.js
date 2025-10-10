document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#gallery a").forEach((link) => {
    const img = link.querySelector("img");
    if (!img) return;

    const altText = img.getAttribute("alt");
    if (!altText) return;

    if (!link.hasAttribute("aria-label")) {
      link.setAttribute("aria-label", altText);
    }

    if (!link.hasAttribute("title")) {
      link.setAttribute("title", altText);
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
