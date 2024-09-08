const toggleButton = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
toggleButton.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// services box
const boxViews = document.querySelectorAll(".services-box"),
  boxBtns = document.querySelectorAll(".services-button"),
  boxCloses = document.querySelectorAll(".services-box-close");

let box = function (boxClick) {
  boxViews[boxClick].classList.add("active-box");
};

boxBtns.forEach((boxBtn, i) => {
  boxBtn.addEventListener("click", () => {
    box(i);
  });
});

boxCloses.forEach((boxClose) => {
  boxClose.addEventListener("click", () => {
    boxViews.forEach((boxView) => {
      boxView.classList.remove("active-box");
    });
  });
});

// change bg header
function scrollHeader() {
  const nav = document.getElementById("home");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 200) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

// scroll to top
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);








document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('contactFormModal');
  const openButton = document.getElementById('openContactForm');
  const closeButton = document.querySelector('.close');
  const form = document.getElementById('contactForm');
  const steps = document.querySelectorAll('.form-step');
  const nextButtons = document.querySelectorAll('.next-step');
  const prevButtons = document.querySelectorAll('.prev-step');
  const progress = document.querySelector('.progress');
  let currentStep = 0;

  openButton.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });

  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  function updateProgress() {
    const progressPercentage = ((currentStep + 1) / steps.length) * 100;
    progress.style.width = `${progressPercentage}%`;
  }

  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      step.classList.toggle('active', index === stepIndex);
    });
    updateProgress();
  }

  function validateStep(stepIndex) {
    const currentStepElement = steps[stepIndex];
    const inputs = currentStepElement.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.checkValidity()) {
        isValid = false;
        showError(input, input.validationMessage);
      } else {
        clearError(input);
      }
    });

    return isValid;
  }

  function showError(input, message) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    input.classList.add('error');
  }

  function clearError(input) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    input.classList.remove('error');
  }

  nextButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (validateStep(currentStep)) {
        currentStep++;
        showStep(currentStep);
        if (currentStep === steps.length - 1) {
          generateSummary();
        }
      }
    });
  });

  prevButtons.forEach(button => {
    button.addEventListener('click', () => {
      currentStep--;
      showStep(currentStep);
    });
  });

  function generateSummary() {
    const summaryDiv = document.getElementById('summary');
    const formData = new FormData(form);
    let summaryHTML = '';

    for (let [key, value] of formData.entries()) {
      summaryHTML += `<p><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</p>`;
    }

    summaryDiv.innerHTML = summaryHTML;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Here you would typically send the data to your server
      console.log('Form submitted:', data);

      // Show a success message
      steps[currentStep].innerHTML = `
        <h3>Thank You!</h3>
        <p>Your message has been sent successfully. We'll get back to you soon.</p>
      `;

      // Reset the form after 5 seconds and close the modal
      setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        form.reset();
        currentStep = 0;
        showStep(currentStep);
      }, 5000);
    }
  });

  // Real-time validation
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.checkValidity()) {
        clearError(input);
      }
    });
  });
});