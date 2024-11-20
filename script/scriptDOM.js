document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".images img");

  images.forEach((img) => {
    img.addEventListener("mouseenter", (event) => {
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = img.getAttribute("data-number");
      document.body.appendChild(tooltip);

      const rect = img.getBoundingClientRect();
      tooltip.style.left = `${rect.left + rect.width / 2}px`;
      tooltip.style.top = `${rect.top - 10}px`;

      // Small delay for the fade-in effect
      setTimeout(() => {
        tooltip.style.opacity = "1";
      }, 50);

      img._tooltip = tooltip;
    });

    img.addEventListener("mouseleave", (event) => {
      const tooltip = img._tooltip;
      if (tooltip) {
        tooltip.style.opacity = "0";
        setTimeout(() => {
          tooltip.remove();
        }, 500);
        delete img._tooltip;
      }
    });
  });
});
