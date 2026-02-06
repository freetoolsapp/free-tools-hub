/* ===================================
   Blog Management System
   Simple & Easy to Use
   =================================== */

let allBlogs = [];
let currentCategory = 'all';

// Load blogs from JSON file
async function loadBlogs() {
    try {
        const response = await fetch('../data/blogs.json');
        const data = await response.json();
        allBlogs = data.blogs;
        renderBlogs();
        console.log('✅ Blogs loaded successfully:', allBlogs.length, 'blogs');
    } catch (error) {
        console.error('❌ Error loading blogs:', error);
        showError();
    }
}

// Render blogs to the grid
function renderBlogs(blogsToRender = allBlogs) {
    const grid = document.getElementById('blogsGrid');
    
    if (!grid) {
        console.error('❌ blogsGrid element not found');
        return;
    }
    
    // Filter only published blogs
    const publishedBlogs = blogsToRender.filter(blog => blog.status === 'published');
    
    if (publishedBlogs.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-search text-gray-400 text-6xl mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-700 mb-2">No blogs found</h3>
                <p class="text-gray-500">Try a different search or category</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = publishedBlogs.map(blog => {
        const categoryColors = {
            'ai': 'blue',
            'productivity': 'green',
            'seo': 'purple',
            'design': 'pink',
            'student': 'yellow',
            'webdev': 'indigo'
        };
        
        const color = categoryColors[blog.category] || 'blue';
        
        return `
            <article class="blog-card bg-white rounded-lg shadow-lg overflow-hidden" data-category="${blog.category}">
                ${blog.featured ? '<div class="featured-badge absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-gray-800 z-10"><i class="fas fa-star mr-1"></i>Featured</div>' : ''}
                
                <div class="relative h-48 overflow-hidden">
                    <img src="${blog.image}" 
                         alt="${blog.title}" 
                         class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                         loading="lazy">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                
                <div class="p-6">
                    <span class="inline-block bg-${color}-100 text-${color}-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                        <i class="fas fa-tag mr-1"></i>${getCategoryName(blog.category)}
                    </span>
                    
                    <h3 class="text-xl font-bold text-gray-800 mb-3 hover:text-${color}-600 transition">
                        <a href="${blog.url}">${blog.title}</a>
                    </h3>
                    
                    <p class="text-gray-600 mb-4 line-clamp-3">${blog.description}</p>
                    
                    <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span><i class="fas fa-user mr-1"></i>${blog.author}</span>
                        <span><i class="fas fa-calendar mr-1"></i>${blog.date}</span>
                        <span><i class="fas fa-clock mr-1"></i>${blog.readTime}</span>
                    </div>
                    
                    <a href="${blog.url}" class="block w-full bg-gradient-to-r from-${color}-600 to-${color}-700 text-white px-4 py-3 rounded-lg font-semibold text-center hover:shadow-xl transition-all">
                        Read Article <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </article>
        `;
    }).join('');
    
    console.log('✅ Rendered', publishedBlogs.length, 'blogs');
}

// Get category display name
function getCategoryName(category) {
    const names = {
        'ai': 'AI & Technology',
        'productivity': 'Productivity',
        'seo': 'SEO & Marketing',
        'design': 'Design',
        'student': 'Student Resources',
        'webdev': 'Web Development'
    };
    return names[category] || category;
}

// Filter blogs by category
function filterCategory(category) {
    currentCategory = category;
    
    // Update button states
    const buttons = document.querySelectorAll('.category-badge');
    buttons.forEach(btn => {
        btn.classList.remove('bg-gradient-to-r', 'from-blue-600', 'to-purple-600', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-700');
    });
    
    // Add active class to clicked button
    if (event && event.target) {
        event.target.classList.remove('bg-gray-200', 'text-gray-700');
        event.target.classList.add('bg-gradient-to-r', 'from-blue-600', 'to-purple-600', 'text-white');
    }
    
    // Filter and render blogs
    const filtered = category === 'all' 
        ? allBlogs 
        : allBlogs.filter(blog => blog.category === category);
    
    renderBlogs(filtered);
    
    console.log('✅ Filtered to category:', category, '-', filtered.length, 'blogs');
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchBlogs');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            filterBlogsByCategory(currentCategory);
            return;
        }
        
        // Search in all blogs
        const searchResults = allBlogs.filter(blog => {
            return blog.title.toLowerCase().includes(searchTerm) ||
                   blog.description.toLowerCase().includes(searchTerm) ||
                   blog.category.toLowerCase().includes(searchTerm);
        });
        
        renderBlogs(searchResults);
        console.log('🔍 Search results for "' + searchTerm + '":', searchResults.length, 'blogs');
    });
}

// Helper function to filter by category
function filterBlogsByCategory(category) {
    const filtered = category === 'all' 
        ? allBlogs 
        : allBlogs.filter(blog => blog.category === category);
    renderBlogs(filtered);
}

// Show error message
function showError() {
    const grid = document.getElementById('blogsGrid');
    if (grid) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-exclamation-triangle text-red-500 text-6xl mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-700 mb-2">Error Loading Blogs</h3>
                <p class="text-gray-500 mb-4">Unable to load blogs. Please check if blogs.json exists.</p>
                <button onclick="location.reload()" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    <i class="fas fa-redo mr-2"></i>Refresh Page
                </button>
            </div>
        `;
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Blog system initializing...');
    loadBlogs();
    initializeSearch();
    console.log('✅ Blog system loaded successfully!');
});

// Export functions
window.filterCategory = filterCategory;
