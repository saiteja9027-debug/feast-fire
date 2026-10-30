
// FEAST & FIRE WEBSITE

// Shopping cart
let cart = JSON.parse(localStorage.getItem("feastFireCart")) || [];

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cart.reduce(
            (total, item) => total + item.quantity, 0
        );
    }
}

// Add food to cart
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem("feastFireCart", JSON.stringify(cart));

    updateCartCount();

    alert(name + " added to your cart!");
}

// Remove food from cart
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);

    localStorage.setItem("feastFireCart", JSON.stringify(cart));

    updateCartCount();
}

// Calculate cart total
function getCartTotal() {
    return cart.reduce(
        (total, item) => total + item.price * item.quantity, 0
    );
}

// Display cart details
function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) return;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "Total: ₹0";
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <h3>${item.name}</h3>
            <p>Price: ₹${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Subtotal: ₹${item.price * item.quantity}</p>
            <button onclick="removeFromCart('${item.name}')">
                Remove
            </button>
        </div>
    `).join("");

    cartTotal.textContent = "Total: ₹" + getCartTotal();
}

// Run when page loads
document.addEventListener("DOMContentLoaded", function() {
    updateCartCount();
    displayCart();
});

