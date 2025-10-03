let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("caption");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  captionText.innerHTML = dots[slideIndex - 1].alt;
}

document.querySelectorAll(".mySlides img").forEach((img) => {
  img.addEventListener("load", () => {
    SmartCrop.crop(img, {
      width: img.parentElement.clientWidth,
      height: img.parentElement.clientHeight,
    }).then((result) => {
      const crop = result.topCrop;
      // Μετατρέπουμε το crop σε object-position
      const posX = ((crop.x + crop.width / 2) / img.naturalWidth) * 100;
      const posY = ((crop.y + crop.height / 2) / img.naturalHeight) * 100;
      img.style.objectFit = "cover";
      img.style.objectPosition = `${posX}% ${posY}%`;
    });
  });
});

