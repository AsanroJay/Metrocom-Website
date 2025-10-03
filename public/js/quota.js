document.addEventListener("DOMContentLoaded", () => {
  const selects = document.querySelectorAll(".pricing-mode");

  selects.forEach(select => {
    const card = select.closest(".cart-item");
    const baseWrapper = card.querySelector(".base-price-wrapper");
    const baseInput = card.querySelector(".base-price");
    const input = card.querySelector(".custom-price");
    const label = card.querySelector(".custom-label");
    const perProductEl = card.querySelector(".unit-price");
    const totalEl = card.querySelector(".total-price");
    const qty = parseInt(card.querySelector(".product-qty").textContent, 10) || 1;

    function recalc() {
      let perProduct = 0;

      if (select.value === "margin") {
        const base = parseFloat(baseInput.value) || 0;
        const margin = parseFloat(input.value) || 0;
        perProduct = base + (base * margin / 100);
      } else {
        perProduct = parseFloat(input.value) || 0;
      }

      const total = perProduct * qty;
      perProductEl.textContent = `₱${perProduct.toFixed(2)}`;
      totalEl.textContent = `₱${total.toFixed(2)}`;
    }

    // Mode switch
    select.addEventListener("change", () => {
      if (select.value === "margin") {
        label.textContent = "Custom Margin (%)";
        input.placeholder = "Enter %";
        baseWrapper.style.display = "block";
      } else {
        label.textContent = "Custom Price";
        input.placeholder = "Enter value";
        baseWrapper.style.display = "none";
      }
      recalc();
    });

    // Recalc when typing
    input.addEventListener("input", recalc);
    baseInput.addEventListener("input", recalc);
  });
});
