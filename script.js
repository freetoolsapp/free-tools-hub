/* ===================================
   Free Tools Hub - Complete Script
   Version: 2.0
   =================================== */

// Global variables
let allTools = [];
let currentFilter = 'all';

// Load tools from JSON file
async function loadTools() {
    try {
        const response = await fetch('tools.json');
        const data = await response.json();
        allTools = data.tools;
        renderTools();
        console.log('✅ Tools loaded successfully:', allTools.length, 'tools');
    } catch (error) {
        console.error('❌ Error loading tools:', error);
        showError();
    }
}

// Render tools to the grid
function renderTools(toolsToRender = allTools) {
    const grid = document.getElementById('toolsGrid');
    
    if (!grid) {
        console.error('❌ toolsGrid element not found');
        return;
    }
    
    if (toolsToRender.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-search text-gray-400 text-6xl mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-700 mb-2">No tools found</h3>
                <p class="text-gray-500">Try a different search or category</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = toolsToRender.map(tool => {
        const isComingSoon = tool.status === 'coming_soon';
        const badgeColor = tool.badge === 'HOT' ? 'red' : 
                          tool.badge === 'NEW' ? 'green' : 
                          tool.badge === 'POPULAR' ? 'yellow' :
                          tool.badge === 'COMING SOON' ? 'gray' : 'blue';
        
        return `
            <div class="tool-card bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 ${isComingSoon ? 'opacity-75' : ''}" data-category="${tool.category}">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex-1">
                        <div class="flex items-center mb-2">
                            <div class="w-12 h-12 bg-${tool.color}-100 rounded-lg flex items-center justify-center mr-3">
                                <i class="${tool.fab ? 'fab' : 'fas'} ${tool.icon} text-${tool.color}-600 text-2xl"></i>
                            </div>
                            <h3 class="text-lg font-bold text-gray-800">${tool.name}</h3>
                        </div>
                        ${tool.description ? `<p class="text-sm text-gray-600 mb-3">${tool.description}</p>` : ''}
                    </div>
                    ${tool.badge ? `<span class="bg-${badgeColor}-500 text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap ml-2">${tool.badge}</span>` : ''}
                </div>
                
                ${isComingSoon ? `
                    <button disabled class="w-full bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold cursor-not-allowed">
                        <i class="fas fa-clock mr-2"></i>Coming Soon
                    </button>
                ` : `
                    <a href="${tool.file || tool.url}" class="block w-full bg-gradient-to-r from-${tool.color}-600 to-${tool.color}-700 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all text-center">
                        <i class="fas fa-arrow-right mr-2"></i>Use Tool
                    </a>
                `}
            </div>
        `;
    }).join('');
    
    console.log('✅ Rendered', toolsToRender.length, 'tools');
}

// Filter tools by category
function filterTools(category) {
    currentFilter = category;
    
    // Update button states
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active', 'bg-gradient-to-r', 'from-blue-600', 'to-purple-600', 'text-white');
        btn.classList.add('bg-gray-100', 'text-gray-700');
    });
    
    // Add active class to clicked button
    event.target.classList.add('active', 'bg-gradient-to-r', 'from-blue-600', 'to-purple-600', 'text-white');
    event.target.classList.remove('bg-gray-100', 'text-gray-700');
    
    // Filter and render tools
    const filtered = category === 'all' 
        ? allTools 
        : allTools.filter(tool => tool.category === category);
    
    renderTools(filtered);
    
    // Scroll to tools section
    document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
    
    console.log('✅ Filtered to category:', category, '-', filtered.length, 'tools');
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchTools');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // If search is empty, show filtered tools by current category
            filterToolsByCategory(currentFilter);
            return;
        }
        
        // Search in all tools
        const searchResults = allTools.filter(tool => {
            return tool.name.toLowerCase().includes(searchTerm) ||
                   (tool.description && tool.description.toLowerCase().includes(searchTerm)) ||
                   tool.category.toLowerCase().includes(searchTerm);
        });
        
        renderTools(searchResults);
        console.log('🔍 Search results for "' + searchTerm + '":', searchResults.length, 'tools');
    });
}

// Helper function to filter by category without updating UI
function filterToolsByCategory(category) {
    const filtered = category === 'all' 
        ? allTools 
        : allTools.filter(tool => tool.category === category);
    renderTools(filtered);
}

// Mobile menu toggle
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // Change icon
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// Show error message
function showError() {
    const grid = document.getElementById('toolsGrid');
    if (grid) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-exclamation-triangle text-red-500 text-6xl mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-700 mb-2">Error Loading Tools</h3>
                <p class="text-gray-500 mb-4">Unable to load tools. Please refresh the page.</p>
                <button onclick="location.reload()" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    <i class="fas fa-redo mr-2"></i>Refresh Page
                </button>
            </div>
        `;
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add active class to navigation on scroll
function initializeScrollSpy() {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-blue-600');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('text-blue-600');
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Free Tools Hub initializing...');
    
    // Load and display tools
    loadTools();
    
    // Initialize features
    initializeSearch();
    initializeMobileMenu();
    initializeSmoothScroll();
    initializeScrollSpy();
    
    console.log('✅ Free Tools Hub loaded successfully!');
});

// Export functions for use in HTML onclick attributes
window.filterTools = filterTools;

// Add to top button (bonus feature)
function addBackToTop() {
    // Create button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hidden z-50';
    backToTop.id = 'backToTop';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);
    
    // Show/hide based on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.remove('hidden');
        } else {
            backToTop.classList.add('hidden');
        }
    });
    
    // Scroll to top on click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Initialize back to top button
addBackToTop();
