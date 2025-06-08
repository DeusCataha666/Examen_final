// Función para cargar libros destacados
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedBooks();
    updateCartCount();
});

// Función para cargar libros destacados (simulando llamada a API)
function loadFeaturedBooks() {
    // En una implementación real, esto vendría de una API o base de datos
    const featuredBooks = [
        {
            id: 1,
            title: "Neuromante",
            author: "William Gibson",
            genre: "cyberpunk",
            cover: "images/neuromancer.jpg",
            price: 19.99,
            rating: 4.8
        },
        {
            id: 2,
            title: "Snow Crash",
            author: "Neal Stephenson",
            genre: "cyberpunk",
            cover: "images/snow-crash.jpg",
            price: 17.99,
            rating: 4.6
        },
        {
            id: 3,
            title: "Ready Player One",
            author: "Ernest Cline",
            genre: "vr",
            cover: "images/ready-player-one.jpg",
            price: 15.99,
            rating: 4.5
        }
    ];

    const container = document.getElementById('featured-books-container');
    
    featuredBooks.forEach(book => {
        const bookHtml = `
            <div class="col-md-4">
                <div class="card book-card h-100">
                    <img src="${book.cover}" class="card-img-top" alt="${book.title}">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text text-muted">${book.author}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="badge bg-primary">${book.genre}</span>
                            <div>
                                <span class="text-warning">
                                    ${'★'.repeat(Math.floor(book.rating))}${'☆'.repeat(5 - Math.floor(book.rating))}
                                </span>
                                <span class="ms-1">${book.rating}</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer bg-transparent">
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 mb-0">$${book.price.toFixed(2)}</span>
                            <button class="btn btn-sm btn-accent add-to-cart" data-id="${book.id}">
                                <i class="fas fa-cart-plus"></i> Añadir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML += bookHtml;
    });

    // Añadir event listeners a los botones de añadir al carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const bookId = this.getAttribute('data-id');
            addToCart(bookId);
        });
    });
}

// Funciones del carrito (simplificadas)
function addToCart(bookId) {
    let cart = JSON.parse(localStorage.getItem('nexusCart')) || [];
    
    // Verificar si el libro ya está en el carrito
    const existingItem = cart.find(item => item.id === bookId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: bookId, quantity: 1 });
    }
    
    localStorage.setItem('nexusCart', JSON.stringify(cart));
    updateCartCount();
    
    // Mostrar notificación
    alert('Libro añadido al carrito');
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('nexusCart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

// Integración con Google Books API (ejemplo)
async function fetchBookDetails(isbn) {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
            return data.items[0].volumeInfo;
        }
        return null;
    } catch (error) {
        console.error('Error fetching book details:', error);
        return null;
    }
}