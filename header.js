// ================================================
// FREE TOOLS HUB — Universal Header Loader v2
// ================================================

(function() {

// ── Base path calculate karo ──
function getBasePath() {
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);
    
    // Root pages: index.html, about.html, tools.html etc.
    if (parts.length <= 1) return '';
    
    // 1 folder deep: blogs/post.html, tools/tool.html
    if (parts.length === 2) return '../';
    
    // 2 folders deep: tools/utility/pdf-to-word.html
    if (parts.length === 3) return '../../';
    
    return '../../';
}

// ── Active page detect ──
function getActivePage() {
    const path = window.location.pathname;
    if (path.includes('/tools/') || path.endsWith('tools.html')) return 'tools';
    if (path.includes('/blogs/') || path.endsWith('blog.html'))  return 'blog';
    if (path.includes('/tutorials/') || path.endsWith('tutorials.html')) return 'tutorials';
    if (path.includes('/resources/') || path.endsWith('resources.html')) return 'resources';
    if (path.endsWith('coupons.html')) return 'coupons';
    if (path.endsWith('store.html'))   return 'store';
    if (path.endsWith('news.html'))    return 'news';
    if (path.endsWith('index.html') || path === '/' || path === '') return 'home';
    return '';
}

const base = getBasePath();
const activePage = getActivePage();

function isActive(page) {
    return activePage === page ? ' fth-active' : '';
}

const headerHTML = `
<div class="fth-topbar">
    <div class="fth-wrap">
        <div class="fth-tb-left">
            <span><i class="fas fa-fire"></i> 100+ Free Tools — No Signup Needed</span>
            <span class="fth-sep">|</span>
            <span><i class="fas fa-tag"></i> Coupons &amp; Deals Updated Daily!</span>
        </div>
        <div class="fth-tb-right">
            <a href="${base}about.html">About</a>
            <a href="${base}contact.html">Contact</a>
            <a href="${base}privacy.html">Privacy</a>
        </div>
    </div>
</div>

<div class="fth-row1">
    <div class="fth-wrap">
        <a href="${base}index.html" class="fth-logo">
            <div class="fth-logo-icon"><i class="fas fa-bolt"></i></div>
            <div class="fth-logo-text">
                <span class="fth-logo-name">Free Tools Hub</span>
                <span class="fth-logo-tag">Tools · Blogs · Resources</span>
            </div>
        </a>
        <div class="fth-search">
            <i class="fas fa-search fth-search-ico"></i>
            <input type="search" id="fthSearch" placeholder="Search tools, blogs, resources..." autocomplete="off">
            <button class="fth-search-btn" id="fthSearchBtn" aria-label="Search"><i class="fas fa-search"></i></button>
        </div>
        <div class="fth-actions">
            <a href="${base}store.html" class="fth-btn-outline"><i class="fas fa-store"></i> Store</a>
            <a href="${base}contact.html" class="fth-btn-primary"><i class="fas fa-paper-plane"></i> <span>Contact Us</span></a>
            <button class="fth-mob-btn" id="fthMobBtn" aria-label="Menu"><i class="fas fa-bars"></i></button>
        </div>
    </div>
</div>

<div class="fth-row2">
    <div class="fth-wrap">

        <div class="fth-ni">
            <a href="${base}index.html" class="fth-nl${isActive('home')}"><i class="fas fa-home fth-i"></i> Home</a>
        </div>

        <div class="fth-ni">
            <span class="fth-nl${isActive('tools')}"><i class="fas fa-tools fth-i"></i> Free Tools <i class="fas fa-chevron-down fth-ch"></i></span>
            <div class="fth-mega fth-mega3">
                <div class="fth-mbanner">
                    <div class="fth-mbanner-txt">
                        <h4><i class="fas fa-star"></i> 100+ Free Tools — No Signup Required</h4>
                        <p>PDF, AI, SEO, Design, Student &amp; Web Dev tools — always free</p>
                    </div>
                    <a href="${base}tools.html" class="fth-mbanner-btn">Browse All Tools →</a>
                </div>
                <div>
                    <div class="fth-mcol-title"><i class="fas fa-file-pdf"></i> PDF Tools</div>
                    <a href="${base}tools/utility/pdf-to-word.html" class="fth-ddi"><i class="fas fa-exchange-alt"></i> PDF to Word <span class="fth-badge fth-hot">HOT</span></a>
                    <a href="${base}tools/utility/pdf-pages-delete.html" class="fth-ddi"><i class="fas fa-file-minus"></i> Delete PDF Pages</a>
                    <a href="${base}tools/utility/word-to-pdf-converter.html" class="fth-ddi"><i class="fas fa-file-export"></i> Word to PDF</a>
                    <a href="${base}tools/utility/bmi-calculator.html" class="fth-ddi"><i class="fas fa-heartbeat"></i> BMI Calculator</a>
                </div>
                <div>
                    <div class="fth-mcol-title"><i class="fas fa-chart-line"></i> SEO &amp; Design</div>
                    <a href="${base}tools/seo/meta-description-generator.html" class="fth-ddi"><i class="fas fa-tags"></i> Meta Description <span class="fth-badge fth-new">NEW</span></a>
                    <a href="${base}tools/seo/seo-analyzer.html" class="fth-ddi"><i class="fas fa-search"></i> SEO Analyzer</a>
                    <a href="${base}tools/design/image-resizer.html" class="fth-ddi"><i class="fas fa-expand-arrows-alt"></i> Image Resizer</a>
                    <a href="${base}tools/design/youtube-thumbnail-downloader.html" class="fth-ddi"><i class="fab fa-youtube"></i> Thumbnail Downloader</a>
                </div>
                <div>
                    <div class="fth-mcol-title"><i class="fas fa-code"></i> Student &amp; Dev</div>
                    <a href="${base}tools/student/gpa-calculator.html" class="fth-ddi"><i class="fas fa-calculator"></i> GPA Calculator <span class="fth-badge fth-hot">HOT</span></a>
                    <a href="${base}tools/student/plagiarism-checker.html" class="fth-ddi"><i class="fas fa-shield-alt"></i> Plagiarism Checker</a>
                    <a href="${base}tools/webdev/json-formatter.html" class="fth-ddi"><i class="fas fa-code"></i> JSON Formatter</a>
                    <a href="${base}tools.html" class="fth-dda"><i class="fas fa-arrow-right"></i> View All 100+ Tools</a>
                </div>
            </div>
        </div>

        <div class="fth-ni">
            <span class="fth-nl${isActive('blog')}"><i class="fas fa-pen-nib fth-i"></i> Blog <i class="fas fa-chevron-down fth-ch"></i></span>
            <div class="fth-drop">
                <a href="${base}blogs/ai-tools-guide-2026.html" class="fth-ddi"><i class="fas fa-robot"></i> AI Tools Guide 2026 <span class="fth-badge fth-new">NEW</span></a>
                <a href="${base}blogs/productivity-hacks-2026.html" class="fth-ddi"><i class="fas fa-rocket"></i> Productivity Hacks</a>
                <a href="${base}blogs/best-free-seo-tools-2026.html" class="fth-ddi"><i class="fas fa-chart-line"></i> Best Free SEO Tools</a>
                <div class="fth-sep"></div>
                <a href="${base}blog.html" class="fth-dda"><i class="fas fa-arrow-right"></i> All Blog Posts</a>
            </div>
        </div>

        <div class="fth-ni">
            <span class="fth-nl"><i class="fas fa-graduation-cap fth-i"></i> Education <i class="fas fa-chevron-down fth-ch"></i></span>
            <div class="fth-mega fth-mega4 fth-mega-center">
                <div>
                    <div class="fth-mcol-title"><i class="fas fa-book-open"></i> School</div>
                    <a href="${base}matric.html" class="fth-ddi"><i class="fas fa-book-open"></i> Matric (Class 9-10)</a>
                    <a href="${base}fsc.html" class="fth-ddi"><i class="fas fa-graduation-cap"></i> FSc / ICS (11-12)</a>
                    <a href="${base}past-papers.html" class="fth-ddi"><i class="fas fa-file-pdf"></i> Past Papers</a>
                </div>
                <div>
                    <div class="fth-mcol-title"><i class="fas fa-award"></i> Competitive</div>
                    <a href="${base}css.html" class="fth-ddi"><i class="fas fa-award"></i> CSS Preparation</a>
                    <a href="${base}pms.html" class="fth-ddi"><i class="fas fa-trophy"></i> PMS Preparation</a>
                    <a href="${base}fpsc.html" class="fth-ddi"><i class="fas fa-briefcase"></i> FPSC Materials</a>
                </div>
                <div>
                    <div class="fth-mcol-title"><i class="fas fa-university"></i> University</div>
                    <a href="${base}education.html" class="fth-ddi"><i class="fas fa-flask"></i> MDCAT / ECAT</a>
                    <a href="${base}education.html" class="fth-ddi"><i class="fas fa-laptop-code"></i> IT Resources</a>
                    <a href="${base}education.html" class="fth-ddi"><i class="fas fa-calculator"></i> Math / Science</a>
                </div>
                <div>
                    <div class="fth-mcol-title"><i class="fas fa-tools"></i> Study Tools</div>
                    <a href="${base}tools/student/gpa-calculator.html" class="fth-ddi"><i class="fas fa-calculator"></i> GPA Calculator</a>
                    <a href="${base}tools/student/plagiarism-checker.html" class="fth-ddi"><i class="fas fa-shield-alt"></i> Plagiarism Checker</a>
                    <a href="${base}education.html" class="fth-dda"><i class="fas fa-arrow-right"></i> All Materials</a>
                </div>
            </div>
        </div>

        <div class="fth-ni">
            <span class="fth-nl${isActive('resources')}"><i class="fas fa-layer-group fth-i"></i> Resources <i class="fas fa-chevron-down fth-ch"></i></span>
            <div class="fth-drop">
                <div class="fth-dhead">Developer</div>
                <a href="${base}resources.html" class="fth-ddi"><i class="fas fa-plug"></i> Free APIs</a>
                <a href="${base}resources.html" class="fth-ddi"><i class="fas fa-icons"></i> Icon Libraries</a>
                <a href="${base}resources.html" class="fth-ddi"><i class="fas fa-palette"></i> Color Palettes</a>
                <div class="fth-sep"></div>
                <div class="fth-dhead">Design</div>
                <a href="${base}resources/free-stock-photos-2026.html" class="fth-ddi"><i class="fas fa-images"></i> Stock Photos</a>
                <a href="${base}resources.html" class="fth-ddi"><i class="fas fa-object-group"></i> UI Kits</a>
                <div class="fth-sep"></div>
                <a href="${base}resources.html" class="fth-dda"><i class="fas fa-arrow-right"></i> All Resources</a>
            </div>
        </div>

        <div class="fth-ni">
            <span class="fth-nl${isActive('tutorials')}"><i class="fas fa-play-circle fth-i"></i> Tutorials <i class="fas fa-chevron-down fth-ch"></i></span>
            <div class="fth-drop">
                <a href="${base}tutorials.html" class="fth-ddi"><i class="fas fa-robot"></i> AI Tools Mastery</a>
                <a href="${base}tutorials.html" class="fth-ddi"><i class="fas fa-search"></i> SEO Basics</a>
                <a href="${base}tutorials.html" class="fth-ddi"><i class="fas fa-code"></i> Web Development</a>
                <a href="${base}tutorials.html" class="fth-ddi"><i class="fas fa-pencil-ruler"></i> UI/UX Design</a>
                <div class="fth-sep"></div>
                <a href="${base}tutorials.html" class="fth-dda"><i class="fas fa-arrow-right"></i> All Tutorials</a>
            </div>
        </div>

        <div class="fth-ni">
            <span class="fth-nl${isActive('coupons')} fth-nl-hl"><i class="fas fa-tag fth-i"></i> Coupons <span class="fth-pill"><i class="fas fa-fire"></i> HOT</span> <i class="fas fa-chevron-down fth-ch"></i></span>
            <div class="fth-drop">
                <div class="fth-dhead">Today's Best Deals</div>
                <a href="${base}coupons.html" class="fth-ddi"><i class="fas fa-percent"></i> All Coupons <span class="fth-badge fth-new">NEW</span></a>
                <a href="${base}coupons/software-deals.html" class="fth-ddi"><i class="fas fa-laptop"></i> Software Deals</a>
                <a href="${base}coupons/hosting-deals.html" class="fth-ddi"><i class="fas fa-server"></i> Hosting Discounts</a>
                <a href="${base}coupons/ai-tools-deals.html" class="fth-ddi"><i class="fas fa-robot"></i> AI Tools Deals</a>
                <div class="fth-sep"></div>
                <a href="${base}coupons.html" class="fth-dda"><i class="fas fa-arrow-right"></i> All Deals</a>
            </div>
        </div>

        <div class="fth-ni">
            <span class="fth-nl${isActive('store')} fth-nl-hl"><i class="fas fa-shopping-bag fth-i"></i> Store <span class="fth-pill">NEW</span> <i class="fas fa-chevron-down fth-ch"></i></span>
            <div class="fth-drop">
                <a href="${base}store.html" class="fth-ddi"><i class="fas fa-store"></i> All Products <span class="fth-badge fth-new">NEW</span></a>
                <a href="${base}store/digital-tools.html" class="fth-ddi"><i class="fas fa-download"></i> Digital Products</a>
                <a href="${base}store/premium-templates.html" class="fth-ddi"><i class="fas fa-paint-brush"></i> Templates</a>
                <a href="${base}store/ebooks.html" class="fth-ddi"><i class="fas fa-book"></i> eBooks</a>
                <div class="fth-sep"></div>
                <a href="${base}store.html" class="fth-dda"><i class="fas fa-arrow-right"></i> Visit Store</a>
            </div>
        </div>

        <div class="fth-ni">
            <a href="${base}news.html" class="fth-nl${isActive('news')}"><i class="fas fa-newspaper fth-i"></i> News</a>
        </div>

    </div>
</div>

<!-- MOBILE NAV -->
<nav class="fth-mobnav" id="fthMobNav">
    <div class="fth-mni"><a href="${base}index.html" class="fth-mnl"><span class="fth-mni-in"><i class="fas fa-home fth-i"></i> Home</span></a></div>
    <div class="fth-mni">
        <button class="fth-mnl" onclick="fthToggle(this)"><span class="fth-mni-in"><i class="fas fa-tools fth-i"></i> Free Tools</span><i class="fas fa-chevron-down fth-mch"></i></button>
        <div class="fth-msub">
            <a href="${base}tools/utility/pdf-to-word.html"><i class="fas fa-exchange-alt"></i> PDF to Word</a>
            <a href="${base}tools/utility/word-to-pdf-converter.html"><i class="fas fa-file-export"></i> Word to PDF</a>
            <a href="${base}tools/seo/meta-description-generator.html"><i class="fas fa-tags"></i> Meta Description</a>
            <a href="${base}tools/design/image-resizer.html"><i class="fas fa-expand-arrows-alt"></i> Image Resizer</a>
            <a href="${base}tools/student/gpa-calculator.html"><i class="fas fa-calculator"></i> GPA Calculator</a>
            <a href="${base}tools.html"><i class="fas fa-arrow-right"></i> All 100+ Tools</a>
        </div>
    </div>
    <div class="fth-mni">
        <button class="fth-mnl" onclick="fthToggle(this)"><span class="fth-mni-in"><i class="fas fa-pen-nib fth-i"></i> Blog</span><i class="fas fa-chevron-down fth-mch"></i></button>
        <div class="fth-msub">
            <a href="${base}blog.html"><i class="fas fa-arrow-right"></i> All Blogs</a>
        </div>
    </div>
    <div class="fth-mni">
        <button class="fth-mnl" onclick="fthToggle(this)"><span class="fth-mni-in"><i class="fas fa-graduation-cap fth-i"></i> Education</span><i class="fas fa-chevron-down fth-mch"></i></button>
        <div class="fth-msub">
            <a href="${base}matric.html"><i class="fas fa-book-open"></i> Matric</a>
            <a href="${base}fsc.html"><i class="fas fa-graduation-cap"></i> FSc / ICS</a>
            <a href="${base}css.html"><i class="fas fa-award"></i> CSS Prep</a>
            <a href="${base}past-papers.html"><i class="fas fa-file-pdf"></i> Past Papers</a>
            <a href="${base}education.html"><i class="fas fa-arrow-right"></i> All Materials</a>
        </div>
    </div>
    <div class="fth-mni">
        <button class="fth-mnl" onclick="fthToggle(this)"><span class="fth-mni-in"><i class="fas fa-layer-group fth-i"></i> Resources</span><i class="fas fa-chevron-down fth-mch"></i></button>
        <div class="fth-msub">
            <a href="${base}resources.html"><i class="fas fa-arrow-right"></i> All Resources</a>
        </div>
    </div>
    <div class="fth-mni">
        <button class="fth-mnl" onclick="fthToggle(this)"><span class="fth-mni-in"><i class="fas fa-play-circle fth-i"></i> Tutorials</span><i class="fas fa-chevron-down fth-mch"></i></button>
        <div class="fth-msub">
            <a href="${base}tutorials.html"><i class="fas fa-arrow-right"></i> All Tutorials</a>
        </div>
    </div>
    <div class="fth-mni">
        <button class="fth-mnl" onclick="fthToggle(this)"><span class="fth-mni-in"><i class="fas fa-tag fth-i"></i> Coupons</span><i class="fas fa-chevron-down fth-mch"></i></button>
        <div class="fth-msub">
            <a href="${base}coupons.html"><i class="fas fa-percent"></i> All Coupons</a>
        </div>
    </div>
    <div class="fth-mni">
        <button class="fth-mnl" onclick="fthToggle(this)"><span class="fth-mni-in"><i class="fas fa-store fth-i"></i> Store</span><i class="fas fa-chevron-down fth-mch"></i></button>
        <div class="fth-msub">
            <a href="${base}store.html"><i class="fas fa-store"></i> All Products</a>
        </div>
    </div>
    <div class="fth-mni"><a href="${base}news.html" class="fth-mnl"><span class="fth-mni-in"><i class="fas fa-newspaper fth-i"></i> News</span></a></div>
    <div class="fth-mni"><a href="${base}contact.html" class="fth-mnl" style="color:#7c3aed;font-weight:600;"><span class="fth-mni-in"><i class="fas fa-paper-plane fth-i"></i> Contact Us</span></a></div>
</nav>
`;

// Inject
const container = document.getElementById('site-header');
if (container) container.innerHTML = headerHTML;

// Mobile button
const btn = document.getElementById('fthMobBtn');
const nav = document.getElementById('fthMobNav');
if (btn && nav) {
    btn.addEventListener('click', function() {
        const open = nav.classList.toggle('fth-open');
        btn.innerHTML = open ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
}

// Search
const ss   = document.getElementById('fthSearch');
const sbtn = document.getElementById('fthSearchBtn');
function doSearch() {
    const q = ss ? ss.value.trim() : '';
    if (q) window.location.href = base + 'tools.html?q=' + encodeURIComponent(q);
}
if (ss)   ss.addEventListener('keydown', function(e) { if (e.key === 'Enter') doSearch(); });
if (sbtn) sbtn.addEventListener('click', doSearch);

})();

function fthToggle(btn) {
    const item = btn.closest('.fth-mni');
    const isOpen = item.classList.contains('fth-open');
    document.querySelectorAll('.fth-mni.fth-open').forEach(function(el) { el.classList.remove('fth-open'); });
    if (!isOpen) item.classList.add('fth-open');
}
