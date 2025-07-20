// PhotoPages.js
document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("./data/PhotoPagesData.json");
  const enrichedPhotos = await response.json();

  const gallery = document.getElementById("photoGallery");
  const paginationContainer = document.getElementById("pagination");

  const modal = document.getElementById("bioModal");
  const modalBio = document.querySelector(".modal-bio");
  const modalName = document.getElementById("modalName");
  const modalBorn = document.getElementById("modalBorn");
  const modalImage = document.getElementById("modalBioImage");
  const exitBtn = document.querySelector(".modal-exit-btn");
  const closeIcon = document.querySelector(".modal-close");

  exitBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  closeIcon.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  const perPage = 12;
  let currentPage = 1;
  const totalPages = Math.ceil(enrichedPhotos.length / perPage);

function renderPage(page) {
  gallery.classList.add("fade-out");

  setTimeout(() => {
    gallery.innerHTML = "";

    const start = (page - 1) * perPage;
    const end = start + perPage;
    const pagePhotos = enrichedPhotos.slice(start, end);

    pagePhotos.forEach((photo) => {
      const card = document.createElement("div");
      card.className = "info-card";
      card.innerHTML = `
        <div class="figure-card">
          <div class="image-wrapper">
            <img src="../img/${photo.pic}" alt="${photo.name}" class="figure-img">
            <div class="caption">${photo.name}</div>
          </div>
          <figcaption class="bio-text">
            <h2>${photo.name}</h2>
            <h3>Born ${photo.born}</h3>
            <p class="bio-snippet">${photo.bioText.replace(/\r?\n/g, '<br>')}</p>
            <button class="toggle-bio">Read More</button>
          </figcaption>
        </div>
      `;

      card.addEventListener("click", () => {
        if (card.classList.contains("expanded")) {
          card.classList.remove("expanded");
        } else {
          document.querySelectorAll(".info-card.expanded").forEach(c => c.classList.remove("expanded"));
          card.classList.add("expanded");
        }
      });

      card.querySelector(".toggle-bio").addEventListener("click", (e) => {
        e.stopPropagation();
        modalName.textContent = photo.name;
        modalBorn.textContent = `Born ${photo.born}`;
        modalImage.src = `../img/${photo.pic}`;
        modalImage.alt = photo.name;
        modalBio.innerHTML = `<p>${photo.bioText.replace(/\r?\n/g, '<br>')}</p>`;
        modal.style.display = "flex";
      });

      gallery.appendChild(card);
    });

    gallery.classList.remove("fade-out");
    gallery.classList.add("fade-in");

    setTimeout(() => {
      gallery.classList.remove("fade-in");
    }, 400);
  }, 300);
}

function createPagination() {
  paginationContainer.innerHTML = "";

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "← Prev";
  prevBtn.className = "nav-btn";
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage(currentPage);
      updateActiveButton();
      createPagination();
    }
  });
  paginationContainer.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = "page-btn";
    if (i === currentPage) btn.classList.add("active");

    btn.addEventListener("click", () => {
      currentPage = i;
      renderPage(currentPage);
      updateActiveButton();
      createPagination();
    });

    paginationContainer.appendChild(btn);
  }

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next →";
  nextBtn.className = "nav-btn";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderPage(currentPage);
      updateActiveButton();
      createPagination();
    }
  });
  paginationContainer.appendChild(nextBtn);
}

function updateActiveButton() {
  document.querySelectorAll(".page-btn").forEach(btn => {
    btn.classList.remove("active");
    if (parseInt(btn.textContent) === currentPage) {
      btn.classList.add("active");
      }
    });
  }

  renderPage(currentPage);
  createPagination();
});