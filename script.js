document.addEventListener("DOMContentLoaded", () => {
  let currentStep = 0;
  const steps = document.querySelectorAll(".step");
  const nextBtns = document.querySelectorAll(".nextBtn");
  const prevBtns = document.querySelectorAll(".prevBtn");
  const form = document.getElementById("jewelleryForm");

  showStep(currentStep);

  nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (validateForm()) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentStep--;
      showStep(currentStep);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form from submitting

    if (validateForm()) {
      console.log("Form submitted successfully!");
      alert("Form submitted successfully!");
      location.reload();
      logFormValues();
    }
  });

  document
    .getElementById("outfit")
    .addEventListener("change", function (event) {
      const outfitPreview = document.getElementById("outfitPreview");
      outfitPreview.innerHTML = ""; // Clear previous preview

      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = document.createElement("img");
          img.src = e.target.result;
          outfitPreview.appendChild(img);
        };
        reader.readAsDataURL(file);
      }
    });

  document.getElementById("budget").addEventListener("input", function (event) {
    const budgetValue = document.getElementById("budgetValue");
    budgetValue.textContent = `Rs.${event.target.value}`;
  });

  function showStep(step) {
    steps.forEach((stepElement, index) => {
      stepElement.classList.toggle("active", index === step);
    });
  }

  function validateForm() {
    const activeStep = steps[currentStep];
    const inputs = activeStep.querySelectorAll(
      "input[required], select[required]"
    );
    let valid = true;

    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        valid = false;
        input.reportValidity();
      }
    });

    return valid;
  }

  function logFormValues() {
    const formData = new FormData(form);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  }
});
