// QuickToolsHub - Main JavaScript File

// Global variables
let allTools = [];
let currentCategory = 'all';

// Load tools from JSON file
async function loadTools() {
    try {
        const response = await fetch('tools.json');
        const data = await response.json();
        allTools = data.tools;
        renderTools();
    } catch (error) {
        console.error('Error loading tools:', error);
        // Fallback: show error message
        document.getElementById('toolsGrid').innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
                <p class="text-gray-600 text-lg">Error loading tools. Please refresh the page.</p>
            </div>
        `;
    }
}

// Render tools to the grid
function renderTools(tools = allTools) {
    const grid = document.getElementById('toolsGrid');
    
    if (tools.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-search text-gray-400 text-4xl mb-4"></i>
                <p class="text-gray-600 text-lg">No tools found matching your search.</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = tools.map(tool => `
        <article class="tool-card bg-white rounded-lg shadow hover:shadow-xl transition p-4 border" data-category="${tool.category}">
            <div class="flex items-start justify-between mb-3">
                <h3 class="text-base font-bold text-gray-800 flex-1">
                    <i class="${tool.fab ? 'fab' : 'fas'} ${tool.icon} text-${tool.color}-600 mr-2"></i>${tool.name}
                </h3>
                ${tool.badge ? `<span class="badge-${tool.badge.toLowerCase()} text-white text-xs font-bold px-2 py-1 rounded">${tool.badge}</span>` : ''}
            </div>
            ${tool.description ? `<p class="text-sm text-gray-600 mb-3">${tool.description}</p>` : ''}
            <a href="${tool.url}" class="block bg-${tool.color}-600 text-white px-4 py-2 rounded-lg hover:bg-${tool.color}-700 transition text-center text-sm">
                <i class="fas fa-arrow-right mr-1"></i>Use Tool
            </a>
        </article>
    `).join('');
}

// Filter tools by category
function filterTools(category) {
    currentCategory = category;
    
    // Update active button
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active', 'bg-gradient-to-r', 'from-blue-600', 'to-purple-600', 'text-white');
        btn.classList.add('bg-gray-100', 'text-gray-700');
    });
    
    event.target.classList.add('active', 'bg-gradient-to-r', 'from-blue-600', 'to-purple-600', 'text-white');
    event.target.classList.remove('bg-gray-100', 'text-gray-700');
    
    // Filter and render tools
    if (category === 'all') {
        renderTools(allTools);
    } else {
        const filtered = allTools.filter(tool => tool.category === category);
        renderTools(filtered);
    }
    
    // Scroll to tools section
    document.getElementById('tools').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchTools');
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // If search is empty, show current category
            if (currentCategory === 'all') {
                renderTools(allTools);
            } else {
                const filtered = allTools.filter(tool => tool.category === currentCategory);
                renderTools(filtered);
            }
            return;
        }
        
        // Search in tool name, description, and category
        const searchResults = allTools.filter(tool => {
            const name = tool.name.toLowerCase();
            const description = tool.description ? tool.description.toLowerCase() : '';
            const category = tool.category.toLowerCase();
            
            return name.includes(searchTerm) || 
                   description.includes(searchTerm) || 
                   category.includes(searchTerm);
        });
        
        renderTools(searchResults);
    });
}

// Mobile menu toggle
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
}

// Analytics tracking (optional - add your tracking code)
function trackToolClick(toolName) {
    // Add your analytics tracking code here
    console.log('Tool clicked:', toolName);
    
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'tool_click', {
    //         'event_category': 'Tools',
    //         'event_label': toolName
    //     });
    // }
}

// Add click tracking to all tool links
function setupAnalytics() {
    document.addEventListener('click', (e) => {
        const toolLink = e.target.closest('.tool-card a');
        if (toolLink) {
            const toolName = toolLink.closest('.tool-card').querySelector('h3').textContent.trim();
            trackToolClick(toolName);
        }
    });
}

// Lazy loading for images (if you add images later)
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }
}

// Initialize performance monitoring
function initPerformance() {
    // Log page load time
    window.addEventListener('load', () => {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                        window.performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
    });
}

// Service Worker registration (for PWA support)
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadTools();
    setupSearch();
    setupMobileMenu();
    setupAnalytics();
    setupLazyLoading();
    initPerformance();
    // registerServiceWorker(); // Uncomment when you create sw.js
});

// Export functions for use in other scripts (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        filterTools,
        renderTools,
        loadTools
    };
}
