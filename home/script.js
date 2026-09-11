const track = document.querySelector(".gallery-track");
const wrapper = document.querySelector(".gallery-wrapper");
const prevBtn = document.querySelector(".gallery-btn.prev");
const nextBtn = document.querySelector(".gallery-btn.next");
const totalCards = document.querySelectorAll(".gallery-card").length;

let currentIndex = 0;
let autoplayTimer = null;

function getVisibleCount() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 600) return 2;
  return 1;
}

function getMaxIndex() {
  return totalCards - getVisibleCount();
}

function moveToIndex(index) {
  const pct = 100 / getVisibleCount();
  track.style.transform = `translateX(-${index * pct}%)`;
  currentIndex = index;
}

function goNext() {
  moveToIndex(currentIndex >= getMaxIndex() ? 0 : currentIndex + 1);
}

function goPrev() {
  moveToIndex(currentIndex <= 0 ? getMaxIndex() : currentIndex - 1);
}

function startAutoplay() {
  stopAutoplay();
  autoplayTimer = setInterval(goNext, 4000);
}

function stopAutoplay() {
  clearInterval(autoplayTimer);
}

nextBtn.addEventListener("click", () => {
  goNext();
  startAutoplay();
});
prevBtn.addEventListener("click", () => {
  goPrev();
  startAutoplay();
});

wrapper.addEventListener("mouseenter", stopAutoplay);
wrapper.addEventListener("mouseleave", startAutoplay);

window.addEventListener("resize", () => {
  const max = getMaxIndex();
  moveToIndex(currentIndex > max ? max : currentIndex);
});

startAutoplay();

document.querySelector("#footer-email").textContent =
  "📧 kolaopepo76@gmail.com";


  const contactForm = document.getElementById("contactForm");

  const fullName = document.getElementById("full-name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const message = document.getElementById("message");

  const formSuccess = document.getElementById("formSuccess");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    // Clear previous errors
    document.querySelectorAll(".ct-error").forEach(function (error) {
      error.textContent = "";
    });

    document.querySelectorAll(".ct-input").forEach(function (input) {
      input.classList.remove("ct-input-error");
    });

    formSuccess.style.display = "none";

    // Full Name validation
    if (fullName.value.trim() === "") {
      document.getElementById("name-error").textContent =
        "Please enter your full name.";

      fullName.classList.add("ct-input-error");
      isValid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {
      document.getElementById("email-error").textContent =
        "Please enter your email address.";

      email.classList.add("ct-input-error");
      isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
      document.getElementById("email-error").textContent =
        "Please enter a valid email address.";

      email.classList.add("ct-input-error");
      isValid = false;
    }

    // Phone validation
    // Phone is optional, but if entered it must contain exactly 11 digits.
    if (phone.value.trim() !== "") {
      const phonePattern = /^[0-9]{11}$/;

      if (!phonePattern.test(phone.value.trim())) {
        document.getElementById("phone-error").textContent =
          "Please enter a valid 11-digit phone number.";

        phone.classList.add("ct-input-error");
        isValid = false;
      }
    }

    // Message validation
    if (message.value.trim() === "") {
      document.getElementById("message-error").textContent =
        "Please enter your message.";

      message.classList.add("ct-input-error");
      isValid = false;
    }

    // Stop if validation failed
    if (!isValid) {
      return;
    }

    // Successful validation
    formSuccess.style.display = "block";

    // Clear the form
    contactForm.reset();

    // Scroll slightly to the success message
    formSuccess.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });

  // Allow ONLY numbers in phone field
  phone.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
  });
