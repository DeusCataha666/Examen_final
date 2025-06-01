document.addEventListener("DOMContentLoaded", function () {
  // Datos de libros para el carrusel
  const booksData = [
    {
      title: "Neuromante",
      author: "William Gibson",
      Image:
        "https://m.media-amazon.com/images/I/71QKQ9mwV7L._AC_UF1000,1000_QL80_.jpg",
      category: "Ciberpunk",
      year: 1984,
      rating: 4.5,
      description:
        "Neuromante es una novela de ciencia ficción escrita por William Gibson y publicada en 1984. Es una obra seminal del género cyberpunk y la primera novela de la Trilogía del Sprawl.",
    },
    {
      title: "Snow Crash",
      author: "Neal Stephenson",
      Image:
        "https://m.media-amazon.com/images/I/81dQwQlAXoL._AC_UF1000,1000_QL80_.jpg",
      category: "Ciberpunk",
      year: 1992,
      rating: 4.3,
      description:
        "Snow Crash es una novela de ciencia ficción escrita por Neal Stephenson y publicada en 1992. Combina elementos de cyberpunk, humor y filosofía en un futuro distópico.",
    },
    {
      title: "Dune",
      author: "Frank Herbert",
      Image:
        "https://m.media-amazon.com/images/I/81ym3QUd3KL._AC_UF1000,1000_QL80_.jpg",
      category: "Ciencia Ficción",
      year: 1965,
      rating: 4.7,
      description:
        "Dune es una novela épica de ciencia ficción escrita por Frank Herbert en 1965. Ganó el Premio Hugo y el Premio Nébula a la mejor novela en su año, y se considera la mayor obra de ciencia ficción de todos los tiempos.",
    },
    {
      title: "Fundación",
      author: "Isaac Asimov",
      Image:
        "https://m.media-amazon.com/images/I/81ym3QUd3KL._AC_UF1000,1000_QL80_.jpg",
      category: "Ciencia Ficción",
      year: 1951,
      rating: 4.6,
      description:
        "Fundación es una novela de ciencia ficción de Isaac Asimov, publicada en 1951. Es la primera de una serie de relatos que más tarde serían agrupados en la Trilogía de la Fundación o Ciclo de Trántor.",
    },
    {
      title: "El problema de los tres cuerpos",
      author: "Liu Cixin",
      Image:
        "https://m.media-amazon.com/images/I/81ym3QUd3KL._AC_UF1000,1000_QL80_.jpg",
      category: "Ciencia Ficción",
      year: 2008,
      rating: 4.4,
      description:
        "El problema de los tres cuerpos es una novela de ciencia ficción del escritor chino Liu Cixin. Es el primer libro de la trilogía titulada El recuerdo del pasado de la Tierra.",
    },
    {
      title: "Ready Player One",
      author: "Ernest Cline",
      Image:
        "https://m.media-amazon.com/images/I/81ym3QUd3KL._AC_UF1000,1000_QL80_.jpg",
      category: "Realidad Virtual",
      year: 2011,
      rating: 4.2,
      description:
        "Ready Player One es una novela de ciencia ficción escrita por Ernest Cline, publicada en 2011. La historia tiene lugar en un futuro distópico en el año 2044, donde la gente escapa de la realidad a través de un mundo de realidad virtual llamado OASIS.",
    },
    {
      title: "The Diamond Age",
      author: "Neal Stephenson",
      Image:
        "https://m.media-amazon.com/images/I/81ym3QUd3KL._AC_UF1000,1000_QL80_.jpg",
      category: "Nanotecnología",
      year: 1995,
      rating: 4.1,
      description:
        "The Diamond Age: Or, A Young Lady's Illustrated Primer es una novela de ciencia ficción postcyberpunk escrita por Neal Stephenson y publicada en 1995. Ganó los premios Hugo y Locus en 1996.",
    },
    {
      title: "Do Androids Dream of Electric Sheep?",
      author: "Philip K. Dick",
      Image:
        "https://m.media-amazon.com/images/I/81ym3QUd3KL._AC_UF1000,1000_QL80_.jpg",
      category: "Ciencia Ficción",
      year: 1968,
      rating: 4.3,
      description:
        "¿Sueñan los androides con ovejas eléctricas? es una novela de ciencia ficción escrita por Philip K. Dick en 1968. La historia sigue a Rick Deckard, un cazarrecompensas que persigue androides fugados.",
    },
  ];

  // Generar libros en el carrusel
  const carouselTrack = document.querySelector(".carousel-track");
  booksData.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.className = "carousel-book";
    bookElement.tabIndex = 0;
    bookElement.setAttribute(
      "aria-label",
      `Libro: ${book.title} por ${book.author}`
    );

    // Color basado en categoría
    let color1, color2;
    switch (book.category) {
      case "Ciberpunk":
        color1 = "#4cc9f0";
        color2 = "#4895ef";
        break;
      case "Ciencia Ficción":
        color1 = "#7209b7";
        color2 = "#3a0ca3";
        break;
      case "Realidad Virtual":
        color1 = "#f72585";
        color2 = "#b5179e";
        break;
      default:
        color1 = "#4cc9f0";
        color2 = "#7209b7";
    }

    bookElement.innerHTML = `
      <div class="book-category">${book.category}</div>
      <h3 class="book-title">${book.title}</h3>
      <img class="book-img" src="${book.Image}" alt="Portada de ${
      book.title
    }" loading="lazy">
      <p class="book-author">${book.author}</p>
      <div class="book-meta">
        <span>${book.year}</span>
        <span>${"★".repeat(Math.floor(book.rating))}${"☆".repeat(
      5 - Math.floor(book.rating)
    )}</span>
      </div>
      <style>
        .carousel-book[data-title="${book.title}"]::after {
          background: linear-gradient(90deg, ${color1}, ${color2});
        }
      </style>
    `;
    bookElement.setAttribute("data-title", book.title);
    carouselTrack.appendChild(bookElement);
  });

  // Carrusel
  const carousel = document.querySelector(".nexus-carousel");
  const track = document.querySelector(".carousel-track");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");
  const books = Array.from(track.children);
  let currentIndex = 0;

  function getVisibleCount() {
    if (!books.length) return 1;
    const bookWidth =
      books[0].offsetWidth +
      parseInt(getComputedStyle(books[0]).marginRight || 0);
    return Math.floor(carousel.offsetWidth / bookWidth) || 1;
  }

  function updateCarousel() {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(books.length - visibleCount, 0);

    currentIndex = Math.min(currentIndex, maxIndex);
    currentIndex = Math.max(currentIndex, 0);

    const bookWidth =
      books[0].offsetWidth +
      parseInt(getComputedStyle(books[0]).marginRight || 0);
    track.style.transform = `translateX(-${currentIndex * bookWidth}px)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  }

  nextBtn.addEventListener("click", () => {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(books.length - visibleCount, 0);

    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  window.addEventListener("resize", updateCarousel);
  updateCarousel();
  setTimeout(updateCarousel, 100);

  // Navegación suave
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const sectionId = this.getAttribute("data-section");
      if (sectionId) {
        document.querySelector(`.${sectionId}-section`).scrollIntoView({
          behavior: "smooth",
        });
      }

      document.querySelectorAll(".nav-link").forEach((navLink) => {
        navLink.classList.remove("active");
      });
      this.classList.add("active");
    });
  });

  // Menú desplegable en el portal
  const dropdown = document.querySelector(".navbar-nav .dropdown");
  const dropdownToggle = dropdown.querySelector(".nav-link");
  const dropdownMenu = dropdown.querySelector(".dropdown-menu");
  const portal = document.getElementById("dropdown-portal");
  const main = document.querySelector("main");

  let isDropdownOpen = false;

  function showDropdownMenu() {
    portal.style.width = main.offsetWidth + "px";
    portal.style.position = "relative";
    portal.style.left = "0";
    portal.style.top = "0";
    portal.style.zIndex = 2000;
    portal.innerHTML = "";
    portal.appendChild(dropdownMenu);
    dropdownMenu.style.display = "block";
    dropdownMenu.style.position = "relative";
    dropdownMenu.style.opacity = "1";
    dropdownMenu.style.boxShadow = "0 8px 24px rgba(10,25,47,0.18)";
    dropdownMenu.style.borderRadius = "8px";
    dropdownMenu.style.background = "var(--secondary-bg)";
    dropdownMenu.style.margin = "0";
    dropdownMenu.style.padding = "0.5rem 0.5rem";

    setTimeout(() => {
      main.style.transition = "margin-top 0.3s";
      main.style.marginTop = dropdownMenu.offsetHeight + "px";
    }, 10);

    isDropdownOpen = true;
  }

  function hideDropdownMenu() {
    dropdown.appendChild(dropdownMenu);
    dropdownMenu.style.display = "";
    dropdownMenu.style.position = "";
    dropdownMenu.style.opacity = "";
    portal.innerHTML = "";
    main.style.marginTop = "";
    isDropdownOpen = false;
  }

  dropdownToggle.addEventListener("click", function (e) {
    e.preventDefault();
    if (isDropdownOpen) {
      hideDropdownMenu();
    } else {
      showDropdownMenu();
    }
  });

  document.addEventListener("click", function (e) {
    if (
      isDropdownOpen &&
      !dropdown.contains(e.target) &&
      !portal.contains(e.target)
    ) {
      hideDropdownMenu();
    }
  });

  window.addEventListener("resize", function () {
    if (isDropdownOpen) {
      portal.style.width = main.offsetWidth + "px";
    }
  });

  // Búsqueda inteligente
  const searchInput = document.getElementById("search-input");
  const searchResults = document.querySelector(".search-results");
  const searchBtn = document.getElementById("search-btn");

  function performSearch(query) {
    if (query.length < 2) {
      searchResults.classList.remove("show");
      return;
    }

    const results = booksData.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.category.toLowerCase().includes(query.toLowerCase())
    );

    displayResults(results);
  }

  function displayResults(results) {
    searchResults.innerHTML = "";

    if (results.length === 0) {
      searchResults.innerHTML =
        '<div class="search-result-item">No se encontraron resultados</div>';
    } else {
      results.slice(0, 5).forEach((book) => {
        const item = document.createElement("div");
        item.className = "search-result-item";
        item.tabIndex = 0;
        item.innerHTML = `
          <div><strong>${book.title}</strong></div>
          <small>${book.author} - ${book.category}</small>
        `;
        item.addEventListener("click", () => {
          showQuickView(book);
          searchResults.classList.remove("show");
          searchInput.value = "";
        });
        item.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            showQuickView(book);
            searchResults.classList.remove("show");
            searchInput.value = "";
          }
        });
        searchResults.appendChild(item);
      });
    }

    searchResults.classList.add("show");
  }

  searchInput.addEventListener("input", (e) => performSearch(e.target.value));
  searchBtn.addEventListener("click", () => performSearch(searchInput.value));

  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.remove("show");
    }
  });

  // Sistema de recomendaciones
  function getRecommendations() {
    return booksData.sort((a, b) => b.rating - a.rating).slice(0, 4);
  }

  function displayRecommendations() {
    const recommendations = getRecommendations();
    const container = document.querySelector(".recommendations-container");

    container.innerHTML = "";

    recommendations.forEach((book) => {
      const card = document.createElement("div");
      card.className = "recommendation-card";
      card.tabIndex = 0;
      card.setAttribute(
        "aria-label",
        `Recomendación: ${book.title} por ${book.author}`
      );
      card.innerHTML = `
        <h3>${book.title}</h3>
        <img class="img-reco" src="${
          book.Image || "https://via.placeholder.com/150x200?text=No+Image"
        }" alt="Portada de ${book.title}" loading="lazy">
        <p>${book.author}</p>

        <div class="rating">${"★".repeat(Math.floor(book.rating))}${"☆".repeat(
        5 - Math.floor(book.rating)
      )}</div>
        <button class="btn btn-sm mt-2" style="background: var(--accent-color); color: var(--primary-bg);">Ver detalles</button>
      `;

      card.addEventListener("click", (e) => {
        if (e.target.tagName !== "BUTTON") {
          showQuickView(book);
        }
      });

      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          showQuickView(book);
        }
      });

      card.querySelector("button").addEventListener("click", () => {
        showQuickView(book);
      });

      container.appendChild(card);
    });
  }

  // Quick View
  function setupQuickView() {
    document
      .querySelectorAll(".carousel-book, .recommendation-card")
      .forEach((book) => {
        book.addEventListener("click", function (e) {
          if (e.target.tagName === "BUTTON") return;

          const title =
            this.querySelector("h3")?.textContent ||
            this.querySelector(".book-title")?.textContent;
          const bookData = booksData.find((b) => b.title === title);

          if (bookData) {
            showQuickView(bookData);
          }
        });
      });
  }

  function showQuickView(book) {
    const quickView = document.createElement("div");
    quickView.className = "quick-view-overlay";
    quickView.innerHTML = `
      <div class="quick-view-content">
        <button class="close-btn" aria-label="Cerrar vista rápida">&times;</button>
        <div class="quick-view-body">
          <div class="quick-view-image">
            <img src="${
              book.Image || "https://via.placeholder.com/300x450?text=No+Image"
            }" alt="Portada de ${book.title}" loading="lazy">
          </div>
          <div class="quick-view-info">
            <h2>${book.title}</h2>
            <p class="author">${book.author}</p>
            <p class="category">${book.category}</p>
            <div class="rating">${"★".repeat(
              Math.floor(book.rating)
            )}${"☆".repeat(5 - Math.floor(book.rating))}</div>
            <p class="description">${book.description}</p>
            <div class="quick-view-actions">
              <button class="btn primary-btn add-to-cart">Añadir al carrito</button>
              <button class="btn secondary-btn">Ver detalles</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(quickView);
    document.body.style.overflow = "hidden";

    quickView.querySelector(".close-btn").addEventListener("click", () => {
      document.body.removeChild(quickView);
      document.body.style.overflow = "";
    });

    quickView.querySelector(".add-to-cart").addEventListener("click", () => {
      addToCart(book);
      document.body.removeChild(quickView);
      document.body.style.overflow = "";
    });
  }

  // Carrito de compras
  let cart = [];
  const cartBtn = document.getElementById("cart-btn");
  const cartSidebar = document.getElementById("cart-sidebar");
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartCount = document.querySelector(".cart-count");
  const totalAmount = document.querySelector(".total-amount");
  const cartOverlay = document.querySelector(".cart-overlay");

  function addToCart(book) {
    const existingItem = cart.find((item) => item.id === book.title);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: book.title,
        title: book.title,
        author: book.author,
        image:
          book.Image || "https://via.placeholder.com/150x200?text=No+Image",
        price: 19.99,
        quantity: 1,
      });
    }

    updateCart();

    // Animación del carrito
    cartBtn.classList.add("animate-bounce");
    setTimeout(() => cartBtn.classList.remove("animate-bounce"), 1000);
  }

  function updateCart() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        '<p class="text-center py-4">Tu carrito está vacío</p>';
    } else {
      cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
        <div class="cart-item-details">
        <h4 class="cart-item-title">${item.title}</h4>
        <img src="${item.image}" alt="Portada de ${
          item.title
        }" class="cart-item-img" loading="lazy">
            <p class="cart-item-author">${item.author}</p>
            <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            <div class="cart-item-actions">
              <button class="decrease" aria-label="Reducir cantidad">-</button>
              <span class="quantity">${item.quantity}</span>
              <button class="increase" aria-label="Aumentar cantidad">+</button>
            </div>
            <button class="remove-item" aria-label="Eliminar del carrito"><i class="bi bi-trash"></i></button>
          </div>
        `;

        cartItem.querySelector(".decrease").addEventListener("click", () => {
          if (item.quantity > 1) {
            item.quantity -= 1;
            updateCart();
          }
        });

        cartItem.querySelector(".increase").addEventListener("click", () => {
          item.quantity += 1;
          updateCart();
        });

        cartItem.querySelector(".remove-item").addEventListener("click", () => {
          cart = cart.filter((cartItem) => cartItem.id !== item.id);
          updateCart();
        });

        cartItemsContainer.appendChild(cartItem);
      });
    }

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    totalAmount.textContent = `$${totalPrice.toFixed(2)}`;
  }

  cartBtn.addEventListener("click", () => {
    cartSidebar.classList.add("open");
    cartOverlay.classList.add("show");
    document.body.style.overflow = "hidden";
  });

  document.querySelector(".close-cart").addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  function closeCart() {
    cartSidebar.classList.remove("open");
    cartOverlay.classList.remove("show");
    document.body.style.overflow = "";
  }

  // Animaciones al scroll
  function setupScrollAnimations() {
    const elements = document.querySelectorAll(".scroll-animation");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    elements.forEach((el) => {
      observer.observe(el);
    });
  }

  // Newsletter
  document
    .querySelector(".newsletter-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector("input").value;
      // Aquí iría la lógica para enviar el email
      alert(`¡Gracias por suscribirte con ${email}!`);
      this.reset();
    });

  // Inicialización
  displayRecommendations();
  setupQuickView();
  setupScrollAnimations();
  updateCart();

  // Carga inicial del carrusel
  setTimeout(updateCarousel, 300);
});
