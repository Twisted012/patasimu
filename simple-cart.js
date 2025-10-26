// Simple Cart Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Cart state
    let cart = [];
    
    // DOM Elements
    const cartBtn = document.getElementById('cartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCartBtn = document.getElementById('closeCart');
    const cartItemsEl = document.getElementById('cartItems');
    const cartCountEl = document.getElementById('cartCount');
    const cartTotalEl = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    // Initialize cart from localStorage
    function loadCart() {
        const savedCart = localStorage.getItem('simpleCart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartUI();
        }
    }
    
    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('simpleCart', JSON.stringify(cart));
    }
    
    // Add item to cart
    function addToCart(phoneId) {
        const phone = phoneSpecs[phoneId];
        if (!phone) return;
        
        const existingItem = cart.find(item => item.id === phoneId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: phoneId,
                name: phone.name,
                price: parseInt(phone.price.replace(/[^0-9]/g, '')),
                image: phone.image,
                quantity: 1
            });
        }
        
        saveCart();
        updateCartUI();
        showNotification('Added to cart!');
    }
    
    // Remove item from cart
    function removeFromCart(phoneId) {
        cart = cart.filter(item => item.id !== phoneId);
        saveCart();
        updateCartUI();
        showNotification('Item removed');
    }
    
    // Update item quantity
    function updateQuantity(phoneId, newQuantity) {
        const item = cart.find(item => item.id === phoneId);
        if (item) {
            item.quantity = Math.max(1, parseInt(newQuantity) || 1);
            saveCart();
            updateCartUI();
        }
    }
    
    // Update cart UI
    function updateCartUI() {
        // Update cart count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountEl) cartCountEl.textContent = totalItems;
        
        // Update cart items
        if (cartItemsEl) {
            if (cart.length === 0) {
                cartItemsEl.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
                cartTotalEl.textContent = 'KSh 0';
                return;
            }
            
            cartItemsEl.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p class="price">KSh ${item.price.toLocaleString()}</p>
                        <div class="quantity-controls">
                            <button class="qty-btn" data-action="decrease" data-id="${item.id}">-</button>
                            <input type="number" class="qty-input" value="${item.quantity}" min="1" data-id="${item.id}">
                            <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <button class="remove-btn" data-id="${item.id}">&times;</button>
                </div>
            `).join('');
            
            // Update total
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotalEl.textContent = `KSh ${total.toLocaleString()}`;
        }
    }
    
    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Toggle cart
    function toggleCart() {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
        document.body.style.overflow = cartSidebar.classList.contains('active') ? 'hidden' : '';
    }
    
    // Event Listeners
    if (cartBtn) cartBtn.addEventListener('click', toggleCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);
    if (cartOverlay) cartOverlay.addEventListener('click', toggleCart);
    
    // Handle cart item events
    document.addEventListener('click', function(e) {
        // Quantity controls
        if (e.target.classList.contains('qty-btn')) {
            const btn = e.target;
            const action = btn.dataset.action;
            const id = btn.dataset.id;
            const input = document.querySelector(`.qty-input[data-id="${id}"]`);
            
            if (action === 'increase') {
                input.value = parseInt(input.value) + 1;
            } else if (action === 'decrease' && parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }
            
            updateQuantity(id, input.value);
        }
        
        // Remove item
        if (e.target.classList.contains('remove-btn')) {
            const id = e.target.dataset.id;
            removeFromCart(id);
        }
    });
    
    // Handle quantity input changes
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('qty-input')) {
            const id = e.target.dataset.id;
            updateQuantity(id, e.target.value);
        }
    });
    
    // Checkout
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length > 0) {
                alert('Proceeding to checkout!');
                // Here you would typically redirect to a checkout page
                console.log('Checkout:', cart);
            } else {
                showNotification('Your cart is empty!');
            }
        });
    }
    
    // Expose addToCart to global scope for use in other files
    window.addToCart = addToCart;
    
    // Initialize
    loadCart();
});
