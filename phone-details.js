// Main application object
const phoneApp = {
    // Phone specifications database
    phoneSpecs: {
        // Google Pixel 8 Pro
        'pixel8-pro': {
            name: 'Google Pixel 8 Pro',
            price: 'KSh 145,000',
            image: 'https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8-pro-1.jpg',
            specs: {
                'Display': '6.7" LTPO OLED, 120Hz',
                'Processor': 'Google Tensor G3',
                'RAM': '12GB',
                'Storage': '128GB/256GB/512GB',
                'Camera': '50MP + 48MP + 48MP',
                'Battery': '5050mAh',
                'OS': 'Android 14',
                '5G': 'Yes',
                'Water Resistance': 'IP68',
                'Weight': '213g',
                'Charging': 'USB-C, Fast charging, Wireless'
            }
        },
        // Itel P55 5G
        'p55-5g': {
            name: 'Itel P55 5G',
            price: 'KSh 25,000',
            image: 'https://fdn2.gsmarena.com/vv/pics/itel/itel-p55-5g-1.jpg',
            specs: {
                'Display': '6.6" IPS LCD, 90Hz',
                'Processor': 'Unisoc T750',
                'RAM': '4GB/8GB',
                'Storage': '128GB',
                'Camera': '50MP + 0.3MP',
                'Battery': '5000mAh',
                'OS': 'Android 13',
                '5G': 'Yes',
                'Water Resistance': 'No',
                'Weight': '195g',
                'Charging': 'USB-C, 18W fast charging'
            }
        },
        // Nothing Phone 2
        'nothing-phone2': {
            name: 'Nothing Phone 2',
            price: 'KSh 80,000',
            image: 'https://fdn2.gsmarena.com/vv/pics/nothing/nothing-phone-2-1.jpg',
            specs: {
                'Display': '6.7" LTPO OLED, 120Hz',
                'Processor': 'Snapdragon 8+ Gen 1',
                'RAM': '8GB/12GB',
                'Storage': '128GB/256GB/512GB',
                'Camera': '50MP + 50MP',
                'Battery': '4700mAh',
                'OS': 'Android 13, Nothing OS 2.0',
                '5G': 'Yes',
                'Water Resistance': 'IP54',
                'Weight': '201g',
                'Charging': 'USB-C, 45W fast charging, 15W wireless'
            }
        }
    },
    
    // Initialize the application
    init: function() {
        console.log('Initializing phone app...');
        this.setupEventListeners();
    },
    
    // Set up event listeners
    setupEventListeners: function() {
        // Event delegation for view buttons
        document.addEventListener('click', (e) => {
            const viewButton = e.target.closest('.btn-view');
            if (viewButton) {
                e.preventDefault();
                const phoneId = viewButton.getAttribute('data-phone');
                console.log('View button clicked, phoneId:', phoneId);
                if (phoneId) {
                    this.openPhoneModal(phoneId);
                }
            }
            
            // Close modal when clicking the close button or outside the modal
            const modal = document.getElementById('phoneModal');
            if (e.target === modal || e.target.classList.contains('close-modal')) {
                this.closePhoneModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            const modal = document.getElementById('phoneModal');
            if (e.key === 'Escape' && modal && modal.style.display === 'block') {
                this.closePhoneModal();
            }
        });
    },
    
    // Function to open phone modal
    openPhoneModal: function(phoneId) {
        console.log('Opening modal for:', phoneId);
        const phone = this.phoneSpecs[phoneId];
        const modal = document.getElementById('phoneModal');
        const modalImage = document.getElementById('modalPhoneImage');
        const modalName = document.getElementById('modalPhoneName');
        const modalPrice = document.getElementById('modalPhonePrice');
        const modalSpecs = document.getElementById('phoneSpecs');
        
        if (!phone) {
            console.error('Phone details not found for ID:', phoneId);
            return;
        }
        
        // Update modal content
        if (modalImage) modalImage.src = phone.image || '';
        if (modalImage) modalImage.alt = phone.name || 'Phone Image';
        if (modalName) modalName.textContent = phone.name || 'Phone Details';
        if (modalPrice) modalPrice.textContent = phone.price || 'Price not available';
        
        // Update specs
        if (modalSpecs) {
            modalSpecs.innerHTML = '';
            if (phone.specs) {
                for (const [key, value] of Object.entries(phone.specs)) {
                    const specItem = document.createElement('div');
                    specItem.className = 'spec-item';
                    specItem.innerHTML = `
                        <div class="spec-label">${key}</div>
                        <div class="spec-value">${value}</div>
                    `;
                    modalSpecs.appendChild(specItem);
                }
            }
        }
        
        // Show modal
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
        }
    },
    
    // Function to close phone modal
    closePhoneModal: function() {
        const modal = document.getElementById('phoneModal');
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }
};

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    phoneApp.init();
    
    // Make functions available globally
    window.openPhoneModal = phoneApp.openPhoneModal.bind(phoneApp);
    window.closePhoneModal = phoneApp.closePhoneModal.bind(phoneApp);
});
