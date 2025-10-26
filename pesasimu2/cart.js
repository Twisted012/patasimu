// Cart functionality
class ShoppingCart {
    constructor() {
        this.cart = [];
        this.cartContainer = document.getElementById('cartItems');
        this.cartTotal = document.getElementById('cartTotal');
        this.cartCount = document.getElementById('cartBadge');
        this.cartButton = document.getElementById('cartButton');
        this.cartSidebar = document.querySelector('.cart-sidebar');
        this.checkoutBtn = document.getElementById('checkoutBtn');
        
        this.init();
    }

    init() {
        this.loadCart();
        this.setupEventListeners();
        this.updateCartUI();
    }

    setupEventListeners() {
        // Toggle cart sidebar
        if (this.cartButton) {
            this.cartButton.addEventListener('click', () => {
                this.toggleCart();
            });
        }

        // Close cart when clicking outside
        document.addEventListener('click', (e) => {
            if (this.cartSidebar && this.cartSidebar.classList.contains('active') && 
                !e.target.closest('.cart-sidebar') && 
                !e.target.closest('#cartButton')) {
                this.toggleCart(false);
            }
        });

        // Handle checkout
        if (this.checkoutBtn) {
            this.checkoutBtn.addEventListener('click', () => {
                this.checkout();
            });
        }

        // Delegate events for dynamic content
        document.addEventListener('click', (e) => {
            // Add to cart from product card
            const addToCartBtn = e.target.closest('.btn-add-to-cart');
            if (addToCartBtn) {
                e.preventDefault();
                const phoneId = addToCartBtn.dataset.phone;
                if (phoneId) {
                    this.addToCart(phoneId);
                    this.showNotification('Item added to cart!', 'success');
                }
            }

            // Remove item from cart
            const removeBtn = e.target.closest('.remove-item');
            if (removeBtn) {
                const phoneId = removeBtn.dataset.phone;
                if (phoneId) {
                    this.removeFromCart(phoneId);
                    this.showNotification('Item removed from cart', 'info');
                }
            }

            // Update quantity
            const quantityInput = e.target.closest('.quantity-input');
            if (quantityInput) {
                const phoneId = quantityInput.dataset.phone;
                const newQuantity = parseInt(quantityInput.value);
                if (phoneId && !isNaN(newQuantity) && newQuantity > 0) {
                    this.updateQuantity(phoneId, newQuantity);
                }
            }
        });
    }

    toggleCart(show = null) {
        if (this.cartSidebar) {
            if (show === null) {
                this.cartSidebar.classList.toggle('active');
            } else {
                show ? this.cartSidebar.classList.add('active') : this.cartSidebar.classList.remove('active');
            }
        }
    }

    addToCart(phoneId, quantity = 1) {
        const phone = phoneSpecs[phoneId];
        if (!phone) return;

        const existingItem = this.cart.find(item => item.id === phoneId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: phoneId,
                name: phone.name,
                price: parseInt(phone.price.replace(/[^0-9]/g, '')), // Convert price to number
                image: phone.image,
                quantity: quantity
            });
        }

        this.saveCart();
        this.updateCartUI();
        this.toggleCart(true); // Show cart when adding an item
    }

    removeFromCart(phoneId) {
        this.cart = this.cart.filter(item => item.id !== phoneId);
        this.saveCart();
        this.updateCartUI();
    }

    updateQuantity(phoneId, quantity) {
        const item = this.cart.find(item => item.id === phoneId);
        if (item) {
            item.quantity = quantity;
            this.saveCart();
            this.updateCartUI();
        }
    }

    updateCartUI() {
        if (!this.cartContainer || !this.cartTotal || !this.cartCount) return;

        if (this.cart.length === 0) {
            this.cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            this.cartTotal.textContent = 'KSh 0';
            this.cartCount.textContent = '0';
            if (this.checkoutBtn) this.checkoutBtn.disabled = true;
            return;
        }

        // Update cart items
        this.cartContainer.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">KSh ${item.price.toLocaleString()}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn" data-phone="${item.id}" data-action="decrease">-</button>
                        <input type="number" class="quantity-input" data-phone="${item.id}" value="${item.quantity}" min="1">
                        <button class="quantity-btn" data-phone="${item.id}" data-action="increase">+</button>
                    </div>
                </div>
                <button class="remove-item" data-phone="${item.id}" aria-label="Remove item">×</button>
            </div>
        `).join('');

        // Update total and count
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        this.cartTotal.textContent = `KSh ${total.toLocaleString()}`;
        this.cartCount.textContent = itemCount.toString();
        
        if (this.checkoutBtn) this.checkoutBtn.disabled = false;
    }

    checkout() {
        if (this.cart.length === 0) return;
        
        // Here you would typically redirect to a checkout page or show a checkout form
        alert('Proceeding to checkout!');
        console.log('Checkout items:', this.cart);
        
        // For demo purposes, we'll just clear the cart
        // this.cart = [];
        // this.saveCart();
        // this.updateCartUI();
        // this.showNotification('Order placed successfully!', 'success');
    }

    saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    }

    loadCart() {
        const savedCart = localStorage.getItem('shoppingCart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
            this.updateCartUI();
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Add show class after a small delay for animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new ShoppingCart();
});
