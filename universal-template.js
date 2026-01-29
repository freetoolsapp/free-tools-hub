/* ===================================
   Free Tools Hub Universal Template
   Auto-loads Header, Footer & Navigation
   Version: 1.0
   =================================== */

// Configuration
const SITE_CONFIG = {
    siteName: 'Free Tools Hub',
    siteTagline: 'Tools • Blogs • Resources',
    baseUrl: '../../', // Adjust based on tool location
    year: new Date().getFullYear()
};

// Social Media Links
const SOCIAL_LINKS = [
    { icon: 'fa-twitter', url: '#', name: 'Twitter', color: 'hover:bg-blue-400' },
    { icon: 'fa-facebook', url: '#', name: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: 'fa-youtube', url: '#', name: 'YouTube', color: 'hover:bg-red-500' },
    { icon: 'fa-instagram', url: '#', name: 'Instagram', color: 'hover:bg-pink-500' }
];

// Categories for Footer & Navigation
const CATEGORIES = [
    { name: 'Utility Tools', slug: 'utility', icon: 'fa-wrench' },
    { name: 'Student Tools', slug: 'student', icon: 'fa-graduation-cap' },
    { name: 'Design Tools', slug: 'design', icon: 'fa-palette' },
    { name: 'SEO Tools', slug: 'seo', icon: 'fa-chart-line' },
    { name: 'Web Dev Tools', slug: 'webdev', icon: 'fa-code' },
    { name: 'Social Media Tools', slug: 'social', icon: 'fa-instagram', fab: true }
];

// Generate Header HTML
function generateHeader() {
    return `
    <header class="bg-white shadow-md sticky top-0 z-50">
        <div class="container mx-auto px-4 py-4">
            <div class="flex justify-between items-center">
                <a href="${SITE_CONFIG.baseUrl}index.html" class="flex items-center space-x-3">
                    <div class="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <i class="fas fa-tools text-white text-xl"></i>
                    </div>
                    <div>
                        <h1 class="font-bold text-xl text-gray-800">${SITE_CONFIG.siteName}</h1>
                        <p class="text-xs text-gray-500">${SITE_CONFIG.siteTagline}</p>
                    </div>
                </a>
                
                <nav class="hidden md:flex items-center space-x-6" aria-label="Main Navigation">
                    <a href="${SITE_CONFIG.baseUrl}index.html" class="text-gray-700 hover:text-blue-600 font-medium transition">
                        <i class="fas fa-home mr-1"></i>Home
                    </a>
                    <a href="${SITE_CONFIG.baseUrl}index.html#tools" class="text-gray-700 hover:text-blue-600 font-medium transition">
                        <i class="fas fa-tools mr-1"></i>Tools
                    </a>
                    <a href="${SITE_CONFIG.baseUrl}blog.html" class="text-gray-700 hover:text-blue-600 font-medium transition">
                        <i class="fas fa-blog mr-1"></i>Blog
                    </a>
                    <a href="${SITE_CONFIG.baseUrl}resources.html" class="text-gray-700 hover:text-blue-600 font-medium transition">
                        <i class="fas fa-book mr-1"></i>Resources
                    </a>
                    <a href="${SITE_CONFIG.baseUrl}tutorials.html" class="text-gray-700 hover:text-blue-600 font-medium transition">
                        <i class="fas fa-chalkboard-teacher mr-1"></i>Tutorials
                    </a>
                    <a href="${SITE_CONFIG.baseUrl}comparisons.html" class="text-gray-700 hover:text-blue-600 font-medium transition">
                        <i class="fas fa-balance-scale mr-1"></i>Compare
                    </a>
                    <a href="${SITE_CONFIG.baseUrl}contact.html" class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition">
                        <i class="fas fa-envelope mr-1"></i>Contact
                    </a>
                </nav>
                
                <button id="mobileMenuBtn" class="md:hidden text-gray-700" aria-label="Toggle mobile menu">
                    <i class="fas fa-bars text-2xl"></i>
                </button>
            </div>
            
            <nav id="mobileMenu" class="hidden md:hidden mt-4 space-y-2" aria-label="Mobile Navigation">
                <a href="${SITE_CONFIG.baseUrl}index.html" class="block py-2 hover:text-blue-600 transition">
                    <i class="fas fa-home mr-2"></i>Home
                </a>
                <a href="${SITE_CONFIG.baseUrl}index.html#tools" class="block py-2 hover:text-blue-600 transition">
                    <i class="fas fa-tools mr-2"></i>Tools
                </a>
                <a href="${SITE_CONFIG.baseUrl}blog.html" class="block py-2 hover:text-blue-600 transition">
                    <i class="fas fa-blog mr-2"></i>Blog
                </a>
                <a href="${SITE_CONFIG.baseUrl}resources.html" class="block py-2 hover:text-blue-600 transition">
                    <i class="fas fa-book mr-2"></i>Resources
                </a>
                <a href="${SITE_CONFIG.baseUrl}tutorials.html" class="block py-2 hover:text-blue-600 transition">
                    <i class="fas fa-chalkboard-teacher mr-2"></i>Tutorials
                </a>
                <a href="${SITE_CONFIG.baseUrl}comparisons.html" class="block py-2 hover:text-blue-600 transition">
                    <i class="fas fa-balance-scale mr-2"></i>Compare
                </a>
                <a href="${SITE_CONFIG.baseUrl}contact.html" class="block py-2 hover:text-blue-600 transition">
                    <i class="fas fa-envelope mr-2"></i>Contact
                </a>
            </nav>
        </div>
    </header>
    `;
}

// Generate Breadcrumb HTML
function generateBreadcrumb(toolName, category = 'Tools') {
    return `
    <div class="bg-gray-100 py-3 border-b">
        <div class="container mx-auto px-4">
            <div class="flex items-center text-sm text-gray-600">
                <a href="${SITE_CONFIG.baseUrl}index.html" class="hover:text-blue-600 transition">
                    <i class="fas fa-home mr-1"></i>Home
                </a>
                <i class="fas fa-chevron-right mx-2 text-xs"></i>
                <a href="${SITE_CONFIG.baseUrl}index.html#tools" class="hover:text-blue-600 transition">${category}</a>
                <i class="fas fa-chevron-right mx-2 text-xs"></i>
                <span class="text-gray-800 font-semibold">${toolName}</span>
            </div>
        </div>
    </div>
    `;
}

// Generate Footer HTML
function generateFooter() {
    const socialLinksHTML = SOCIAL_LINKS.map(link => `
        <a href="${link.url}" class="text-2xl ${link.color} transition" aria-label="${link.name}">
            <i class="fab ${link.icon}"></i>
        </a>
    `).join('');
    
    const categoriesHTML = CATEGORIES.map(cat => `
        <li>
            <a href="${SITE_CONFIG.baseUrl}index.html#tools" class="hover:text-white transition">
                <i class="${cat.fab ? 'fab' : 'fas'} ${cat.icon} mr-2"></i>${cat.name}
            </a>
        </li>
    `).join('');
    
    return `
    <footer class="bg-gray-800 text-white py-12 mt-16">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
                <!-- Brand -->
                <div>
                    <h3 class="font-bold text-lg mb-4">
                        <i class="fas fa-tools mr-2"></i>${SITE_CONFIG.siteName}
                    </h3>
                    <p class="text-gray-400 text-sm">Your complete hub for free online tools, expert blogs, and curated resources. Fast, simple, and secure.</p>
                </div>
                
                <!-- Categories -->
                <div>
                    <h4 class="font-bold mb-4">Categories</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        ${categoriesHTML}
                    </ul>
                </div>
                
                <!-- Resources -->
                <div>
                    <h4 class="font-bold mb-4">Resources</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="${SITE_CONFIG.baseUrl}blog.html" class="hover:text-white transition"><i class="fas fa-blog mr-2"></i>Blog</a></li>
                        <li><a href="${SITE_CONFIG.baseUrl}tutorials.html" class="hover:text-white transition"><i class="fas fa-chalkboard-teacher mr-2"></i>Tutorials</a></li>
                        <li><a href="${SITE_CONFIG.baseUrl}resources.html" class="hover:text-white transition"><i class="fas fa-book mr-2"></i>Resources</a></li>
                        <li><a href="${SITE_CONFIG.baseUrl}comparisons.html" class="hover:text-white transition"><i class="fas fa-balance-scale mr-2"></i>Compare Tools</a></li>
                    </ul>
                </div>
                
                <!-- Company -->
                <div>
                    <h4 class="font-bold mb-4">Company</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="${SITE_CONFIG.baseUrl}about.html" class="hover:text-white transition"><i class="fas fa-info-circle mr-2"></i>About Us</a></li>
                        <li><a href="${SITE_CONFIG.baseUrl}contact.html" class="hover:text-white transition"><i class="fas fa-envelope mr-2"></i>Contact</a></li>
                        <li><a href="${SITE_CONFIG.baseUrl}privacy.html" class="hover:text-white transition"><i class="fas fa-shield-alt mr-2"></i>Privacy Policy</a></li>
                        <li><a href="${SITE_CONFIG.baseUrl}terms.html" class="hover:text-white transition"><i class="fas fa-file-contract mr-2"></i>Terms of Service</a></li>
                    </ul>
                </div>
                
                <!-- Connect -->
                <div>
                    <h4 class="font-bold mb-4">Connect</h4>
                    <div class="flex space-x-4 mb-4">
                        ${socialLinksHTML}
                    </div>
                    <p class="text-gray-400 text-xs mt-4">by freetoolsapp</p>
                </div>
            </div>
            
            <!-- Footer Bottom -->
            <div class="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
                <p>&copy; ${SITE_CONFIG.year} ${SITE_CONFIG.siteName}. All rights reserved. Made with <i class="fas fa-heart text-red-500"></i> for creators and learners.</p>
            </div>
        </div>
    </footer>
    `;
}

// Initialize mobile menu functionality
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    
    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
            
            // Change icon
            const icon = btn.querySelector('i');
            if (menu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!btn.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.add('hidden');
                const icon = btn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// Add smooth scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Add back to top button
function addBackToTop() {
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

// Main initialization function
function initUniversalTemplate(toolName, category) {
    // Load Header
    const headerPlaceholder = document.getElementById('universal-header');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = generateHeader();
    }
    
    // Load Breadcrumb
    const breadcrumbPlaceholder = document.getElementById('universal-breadcrumb');
    if (breadcrumbPlaceholder && toolName) {
        breadcrumbPlaceholder.innerHTML = generateBreadcrumb(toolName, category);
    }
    
    // Load Footer
    const footerPlaceholder = document.getElementById('universal-footer');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = generateFooter();
    }
    
    // Initialize features
    initMobileMenu();
    initSmoothScroll();
    addBackToTop();
    
    console.log('✅ Free Tools Hub Universal Template loaded successfully!');
}

// Auto-initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Get tool name from meta tag or page title
    const toolName = document.querySelector('meta[name="tool-name"]')?.content || 
                     document.title.split('-')[0].trim();
    const category = document.querySelector('meta[name="tool-category"]')?.content || 'Tools';
    
    initUniversalTemplate(toolName, category);
});

// Export for manual initialization if needed
window.initUniversalTemplate = initUniversalTemplate;
