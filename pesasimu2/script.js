// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const sellForm = document.querySelector('.sell-form');
const contactForm = document.querySelector('.contact-form');

if (sellForm) {
    sellForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(sellForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // Show loading state
        const submitBtn = sellForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Simulate API call
        setTimeout(() => {
            // Here you would typically send this data to a server
            console.log('Sell Form Submitted:', formValues);
            
            // Show success message with animation
            showNotification('Thank you! We will contact you shortly with a quote.', 'success');
            sellForm.reset();
            
            // Reset button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Simulate API call
        setTimeout(() => {
            // Here you would typically send this data to a server
            console.log('Contact Form Submitted:', formValues);
            
            // Show success message with animation
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
            
            // Reset button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Add active class to current section in navigation
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    // Show/hide scroll to top button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }
});

// Phone data
const phoneData = {
    'iphone-13-pro': {
        name: 'iPhone 13 Pro',
        price: 120000,
        image: 'https://images.unsplash.com/photo-1639135215744-2c1996a87ca2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        specs: [
            '6.1" Super Retina XDR display',
            'A15 Bionic chip with 6-core CPU, 5-core GPU',
            'Pro camera system with 12MP Ultra Wide, Wide, and Telephoto cameras',
            '128GB storage',
            'Face ID for secure authentication',
            '5G capable'
        ],
        condition: 'Like New',
        warranty: '3 months'
    },
    'samsung-s21': {
        name: 'Samsung S21',
        price: 95000,
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067eaf1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        specs: [
            '6.2" Dynamic AMOLED 2X display',
            'Exynos 2100 / Snapdragon 888 (Region dependent)',
            'Triple camera setup: 12MP Ultra Wide, 12MP Wide, 64MP Telephoto',
            '128GB storage',
            'In-display fingerprint sensor',
            '5G capable'
        ],
        condition: 'Excellent',
        warranty: '3 months'
    },
    'pixel-6': {
        name: 'Google Pixel 6',
        price: 85000,
        image: 'https://images.unsplash.com/photo-1633894582279-2a5d3a9f5b3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        specs: [
            '6.4" FHD+ OLED display',
            'Google Tensor chip',
            'Dual rear camera system: 50MP wide, 12MP ultrawide',
            '128GB storage',
            'In-display fingerprint sensor',
            '5G capable'
        ],
        condition: 'Good',
        warranty: '3 months'
    }
};

// Shopping cart
let cart = [];
const cartButton = document.getElementById('cartButton');
const cartSidebar = document.getElementById('cartSidebar');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartBadge = document.getElementById('cartBadge');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Modal elements
const modal = document.getElementById('phoneModal');
const phoneDetails = document.getElementById('phoneDetails');
const closeModal = document.querySelector('.close-modal');

// View phone details
function showPhoneDetails(phoneId) {
    const phone = phoneData[phoneId];
    if (!phone) return;
    
    phoneDetails.innerHTML = `
        <div class="phone-detail">
            <div class="phone-detail-image">
                <img src="${phone.image}" alt="${phone.name}">
            </div>
            <div class="phone-detail-info">
                <h2>${phone.name}</h2>
                <p class="price">KSh ${phone.price.toLocaleString()}</p>
                <p class="condition">Condition: <span>${phone.condition}</span></p>
                <p class="warranty">Warranty: <span>${phone.warranty}</span></p>
                
                <h3>Specifications</h3>
                <ul class="specs-list">
                    ${phone.specs.map(spec => `<li>${spec}</li>`).join('')}
                </ul>
                
                <button class="btn btn-primary btn-add-to-cart" data-phone="${phoneId}" style="margin-top: 1.5rem;">
                    Add to Cart - KSh ${phone.price.toLocaleString()}
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Add event listener to the new Add to Cart button
    const addToCartBtn = phoneDetails.querySelector('.btn-add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            addToCart(phoneId);
            modal.classList.remove('show');
            document.body.style.overflow = '';
        });
    }
}

// Add to cart function
function addToCart(phoneId) {
    const phone = phoneData[phoneId];
    if (!phone) return;
    
    const existingItem = cart.find(item => item.id === phoneId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: phoneId,
            name: phone.name,
            price: phone.price,
            image: phone.image,
            quantity: 1
        });
    }
    
    updateCartUI();
    showNotification(`${phone.name} added to cart!`, 'success');
    
    // Save cart to localStorage
    saveCart();
}

// Remove from cart function
function removeFromCart(phoneId) {
    cart = cart.filter(item => item.id !== phoneId);
    updateCartUI();
    saveCart();
}

// Update cart quantity
function updateCartItemQuantity(phoneId, newQuantity) {
    const item = cart.find(item => item.id === phoneId);
    if (item) {
        item.quantity = Math.max(1, newQuantity);
        updateCartUI();
        saveCart();
    }
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartBadge.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <span class="cart-item-price">KSh ${item.price.toLocaleString()}</span>
                    <div class="quantity-selector">
                        <button class="quantity-btn" data-action="decrease" data-phone="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" data-action="increase" data-phone="${item.id}">+</button>
                    </div>
                    <button class="cart-item-remove" data-phone="${item.id}">Remove</button>
                </div>
            </div>
        `).join('');
        
        checkoutBtn.disabled = false;
    }
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `KSh ${total.toLocaleString()}`;
    
    // Add event listeners to quantity buttons and remove buttons
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const phoneId = e.target.dataset.phone;
            const action = e.target.dataset.action;
            const item = cart.find(item => item.id === phoneId);
            
            if (item) {
                if (action === 'increase') {
                    updateCartItemQuantity(phoneId, item.quantity + 1);
                } else if (action === 'decrease') {
                    updateCartItemQuantity(phoneId, item.quantity - 1);
                }
            }
        });
    });
    
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', (e) => {
            const phoneId = e.target.dataset.phone;
            removeFromCart(phoneId);
        });
    });
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('pesaSimuCart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('pesaSimuCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger reflow
    notification.offsetHeight;
    
    // Add show class
    notification.classList.add('show');
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Initialize the app
function init() {
    // Load cart from localStorage
    loadCart();
    
    // Add event listeners to View Details buttons
    document.querySelectorAll('.btn-view').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const phoneId = e.target.dataset.phone;
            showPhoneDetails(phoneId);
        });
    });
    
    // Add event listeners to Add to Cart buttons
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const phoneId = e.target.dataset.phone;
            addToCart(phoneId);
        });
    });
    
    // Cart button click handler
    if (cartButton) {
        cartButton.addEventListener('click', () => {
            cartSidebar.classList.toggle('open');
        });
    }
    
    // Close cart button
    const closeCartBtn = document.querySelector('.close-cart');
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', () => {
            cartSidebar.classList.remove('open');
        });
    }
    
    // Close modal when clicking the X button
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        });
    }
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (!cartSidebar.contains(e.target) && e.target !== cartButton) {
            cartSidebar.classList.remove('open');
        }
    });
    
    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                // In a real app, you would redirect to a checkout page
                alert('Proceeding to checkout...');
                // For demo, we'll just show a success message and clear the cart
                showNotification('Order placed successfully!', 'success');
                cart = [];
                updateCartUI();
                saveCart();
                cartSidebar.classList.remove('open');
            }
        });
    }
    
    // Add scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scrollTopBtn';
    scrollTopBtn.innerHTML = '&uarr;';
    scrollTopBtn.title = 'Back to top';
    document.body.appendChild(scrollTopBtn);
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 25px;
            background: #4CAF50;
            color: white;
            border-radius: 4px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .notification.error {
            background: #f44336;
        }
        
        .notification.warning {
            background: #ff9800;
        }
        
        .notification.info {
            background: #2196F3;
        }
        
        #scrollTopBtn {
            display: none;
            position: fixed;
            bottom: 80px;
            right: 30px;
            z-index: 99;
            border: none;
            outline: none;
            background-color: #2563eb;
            color: white;
            cursor: pointer;
            padding: 12px 16px;
            border-radius: 50%;
            font-size: 18px;
            width: 50px;
            height: 50px;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        #scrollTopBtn.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        #scrollTopBtn:hover {
            background-color: #1d4ed8;
            transform: translateY(-2px);
        }
        
        .quantity-selector {
            display: flex;
            align-items: center;
            margin: 0.5rem 0;
        }
        
        .quantity-btn {
            background: #f1f5f9;
            border: 1px solid #e2e8f0;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 1rem;
            color: #334155;
            transition: all 0.2s;
        }
        
        .quantity-btn:hover {
            background: #e2e8f0;
        }
        
        .quantity {
            width: 30px;
            text-align: center;
            font-weight: 500;
        }
        
        .phone-detail {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }
        
        .phone-detail-image img {
            width: 100%;
            max-height: 400px;
            object-fit: contain;
            border-radius: 0.5rem;
        }
        
        .phone-detail-info h2 {
            margin-top: 0;
            color: #1f2937;
        }
        
        .phone-detail-info .price {
            font-size: 1.75rem;
            font-weight: 700;
            color: #2563eb;
            margin: 1rem 0;
        }
        
        .phone-detail-info .condition,
        .phone-detail-info .warranty {
            font-size: 1.1rem;
            color: #4b5563;
            margin: 0.75rem 0;
        }
        
        .phone-detail-info .condition span,
        .phone-detail-info .warranty span {
            font-weight: 500;
            color: #1f2937;
        }
        
        .specs-list {
            list-style: none;
            padding: 0;
            margin: 1.5rem 0;
        }
        
        .specs-list li {
            padding: 0.5rem 0;
            padding-left: 1.5rem;
            position: relative;
            color: #4b5563;
        }
        
        .specs-list li:before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
        }
        
        @media (min-width: 768px) {
            .phone-detail {
                flex-direction: row;
            }
            
            .phone-detail-image {
                flex: 1;
            }
            
            .phone-detail-info {
                flex: 1;
                padding-left: 2rem;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize the app when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
