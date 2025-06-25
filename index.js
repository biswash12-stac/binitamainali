document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile menu toggle (will be added for smaller screens)
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i> Menu';
    
    const nav = document.querySelector('nav .container');
    if (nav) {
        nav.insertBefore(mobileMenuToggle, nav.firstChild);
        
        mobileMenuToggle.addEventListener('click', function() {
            const ul = document.querySelector('nav ul');
            ul.style.display = ul.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Highlight current section in navigation
    const sections = document.querySelectorAll('main section');
    const navItems = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // Image lightbox functionality
    const images = document.querySelectorAll('.activity img');
    if (images.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        document.body.appendChild(lightbox);
        
        images.forEach(image => {
            image.addEventListener('click', () => {
                lightbox.classList.add('active');
                const img = document.createElement('img');
                img.src = image.src;
                img.alt = image.alt;
                
                while (lightbox.firstChild) {
                    lightbox.removeChild(lightbox.firstChild);
                }
                
                lightbox.appendChild(img);
            });
        });
        
        lightbox.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
    }

    // Add responsive table styling
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-responsive';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });

    // Back to top button
    const backToTop = document.createElement('button');
    backToTop.id = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Add some interactive elements
function initInteractiveElements() {
    // Accordion for strategies
    const strategyHeaders = document.querySelectorAll('.strategy h4');
    if (strategyHeaders.length > 0) {
        strategyHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                content.style.display = content.style.display === 'none' ? 'block' : 'none';
                header.classList.toggle('active');
            });
        });
    }

    // Tab system for resource types
    const resourceTabs = document.createElement('div');
    resourceTabs.className = 'resource-tabs';
    resourceTabs.innerHTML = `
        <button class="tab-btn active" data-tab="books">Books</button>
        <button class="tab-btn" data-tab="websites">Websites</button>
        <button class="tab-btn" data-tab="videos">Videos</button>
    `;
    
    const resourcesSection = document.querySelector('.resources');
    if (resourcesSection) {
        resourcesSection.insertBefore(resourceTabs, resourcesSection.querySelector('.resource-list'));
        
        const tabButtons = document.querySelectorAll('.tab-btn');
        const resourceCards = document.querySelectorAll('.resource-card');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const tabName = button.getAttribute('data-tab');
                
                // Hide all resource cards
                resourceCards.forEach(card => {
                    card.style.display = 'none';
                });
                
                // Show only cards for the selected tab
                document.querySelectorAll(`.resource-card.${tabName}`).forEach(card => {
                    card.style.display = 'block';
                });
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initInteractiveElements);