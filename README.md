/* General Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f4f4f4;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Header Styles */
.header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1rem 0;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo h1 {
    font-size: 1.8rem;
    font-weight: 600;
}

.nav ul {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.3s;
}

.nav a:hover {
    opacity: 0.8;
}

/* Hero Section */
.hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 4rem 0;
    text-align: center;
}

.hero h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.hero p {
    font-size: 1.2rem;
    opacity: 0.9;
}

/* Tools Section */
.tools-section {
    padding: 4rem 0;
    background: white;
    min-height: 400px;
}

.tools-section h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 3rem;
    color: #333;
}

.tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
}

.loading {
    text-align: center;
    color: #667eea;
    font-size: 1.2rem;
    grid-column: 1 / -1;
    padding: 3rem;
}

.tool-card {
    background: white;
    border-radius: 10px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s, box-shadow 0.3s;
}

.tool-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0,0,0,0.2);
}

.tool-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.tool-card h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #667eea;
}

.tool-card p {
    color: #666;
    margin-bottom: 1.5rem;
}

.btn {
    display: inline-block;
    padding: 0.8rem 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: opacity 0.3s;
    font-weight: 500;
}

.btn:hover {
    opacity: 0.9;
}

/* About Section */
.about-section {
    padding: 4rem 0;
    background: #f9f9f9;
}

.about-section h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #333;
}

.about-section p {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
    font-size: 1.1rem;
    color: #666;
    line-height: 1.8;
}

/* Footer Styles */
.footer {
    background: #2c3e50;
    color: white;
    padding: 3rem 0 1rem;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
}

.footer-section h3 {
    margin-bottom: 1rem;
    color: #667eea;
}

.footer-section ul {
    list-style: none;
}

.footer-section ul li {
    margin-bottom: 0.5rem;
}

.footer-section a {
    color: #ecf0f1;
    text-decoration: none;
    transition: color 0.3s;
}

.footer-section a:hover {
    color: #667eea;
}

.footer-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid #34495e;
    color: #95a5a6;
}

/* Tool Page Styles */
.tool-page {
    min-height: 100vh;
    padding: 2rem 0;
    background: white;
}

.tool-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
}

.back-link {
    display: inline-block;
    margin-bottom: 2rem;
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
}

.back-link:hover {
    opacity: 0.8;
}

.tool-header {
    text-align: center;
    margin-bottom: 3rem;
}

.tool-header h1 {
    color: #333;
    margin-bottom: 0.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
    .header .container {
        flex-direction: column;
        gap: 1rem;
    }
    
    .nav ul {
        gap: 1rem;
    }
    
    .hero h2 {
        font-size: 2rem;
    }
    
    .tools-grid {
        grid-template-columns: 1fr;
    }
    
    .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
    }
}
