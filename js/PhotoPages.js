// PhotoPages.js
// This script dynamically loads photo data and creates a gallery of family photos.
// It is called by PhotoPages.html.

document.addEventListener("DOMContentLoaded", async () => {
  // Load photo data
  const response = await fetch("./data/PhotoPagesData.json");
  const enrichedPhotos = await response.json();

  const gallery = document.getElementById("photoGallery");

  // Modal references
  const modal = document.getElementById("bioModal");
  const modalBio = document.querySelector(".modal-bio");
  const modalName = document.getElementById("modalName");
  const modalBorn = document.getElementById("modalBorn");
  const modalImage = document.getElementById("modalBioImage");
  const exitBtn = document.querySelector(".modal-exit-btn");

  // Close modal on "Close" button
  exitBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal when clicking outside the content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // Generate photo cards
  enrichedPhotos.forEach((photo) => {
    const card = document.createElement("div");
    card.className = "info-card";

    card.innerHTML = `
      <div class="figure-card">
        <div class="image-wrapper">
          <img src="../img/${photo.pic}" alt="${photo.name}" class="figure-img">
        </div>
        <figcaption class="bio-text">
          <h2>${photo.name}</h2>
          <h3>Born ${photo.born}</h3>
          <p class="bio-snippet">${photo.bioText.replace(/\r?\n/g, '<br>')}</p>
          <button class="toggle-bio">Read More</button>
        </figcaption>
      </div>
    `;

    // Toggle card expansion (image ⇄ bio preview)
    card.addEventListener("click", () => {
      if (card.classList.contains("expanded")) {
        card.classList.remove("expanded");
      } else {
        document.querySelectorAll(".info-card.expanded").forEach(c => c.classList.remove("expanded"));
        card.classList.add("expanded");
      }
    });

    // Open modal on "Read More"
    card.querySelector(".toggle-bio").addEventListener("click", (e) => {
      e.stopPropagation();

      // Set modal header content
      modalName.textContent = photo.name;
      modalBorn.textContent = `Born ${photo.born}`;
      modalImage.src = `../img/${photo.pic}`;
      modalImage.alt = photo.name;

      // Set modal bio content
      modalBio.innerHTML = `<p>${photo.bioText.replace(/\r?\n/g, '<br>')}</p>`;

      // Display modal
      modal.style.display = "flex";
    });

    gallery.appendChild(card);
  });
});