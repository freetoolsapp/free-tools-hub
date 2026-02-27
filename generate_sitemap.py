#!/usr/bin/env python3
# ================================================
# FREE TOOLS HUB — Sitemap Generator
# Run karo: python generate_sitemap.py
# sitemap.xml ban jayegi same folder mein
# ================================================

import os
from datetime import date

BASE_URL = "https://freetoolshub.online"
TODAY = date.today().strftime("%Y-%m-%d")

# Priority aur changefreq settings
PRIORITY_MAP = {
    'index.html':       ('1.0', 'daily'),
    'tools.html':       ('0.9', 'daily'),
    'blog.html':        ('0.9', 'weekly'),
    'news.html':        ('0.9', 'daily'),
    'resources.html':   ('0.8', 'weekly'),
    'tutorials.html':   ('0.8', 'weekly'),
    'education.html':   ('0.8', 'weekly'),
    'coupons.html':     ('0.8', 'daily'),
    'store.html':       ('0.8', 'weekly'),
    'contact.html':     ('0.5', 'monthly'),
    'about.html':       ('0.5', 'monthly'),
    'privacy.html':     ('0.3', 'monthly'),
    'terms.html':       ('0.3', 'monthly'),
    'disclaimer.html':  ('0.3', 'monthly'),
}

def get_priority(filepath):
    filename = os.path.basename(filepath)
    if filename in PRIORITY_MAP:
        return PRIORITY_MAP[filename]
    # Tool pages
    if 'tools/' in filepath.replace('\\', '/'):
        return ('0.7', 'monthly')
    # Blog pages
    if 'blogs/' in filepath.replace('\\', '/'):
        return ('0.7', 'weekly')
    # Resource pages
    if 'resources/' in filepath.replace('\\', '/'):
        return ('0.6', 'weekly')
    # Tutorial pages
    if 'tutorials/' in filepath.replace('\\', '/'):
        return ('0.6', 'weekly')
    return ('0.5', 'monthly')

# Sab HTML files collect karo
html_files = []
for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', '.github']]
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file).replace('.\\', '').replace('./', '')
            filepath = filepath.replace('\\', '/')
            html_files.append(filepath)

html_files.sort()

# Sitemap XML banao
xml_lines = ['<?xml version="1.0" encoding="UTF-8"?>']
xml_lines.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

for filepath in html_files:
    # index.html ko root URL do
    if filepath == 'index.html':
        url = BASE_URL + '/'
    else:
        url = BASE_URL + '/' + filepath

    priority, changefreq = get_priority(filepath)

    xml_lines.append('  <url>')
    xml_lines.append(f'    <loc>{url}</loc>')
    xml_lines.append(f'    <lastmod>{TODAY}</lastmod>')
    xml_lines.append(f'    <changefreq>{changefreq}</changefreq>')
    xml_lines.append(f'    <priority>{priority}</priority>')
    xml_lines.append('  </url>')

xml_lines.append('</urlset>')

sitemap_content = '\n'.join(xml_lines)

with open('sitemap.xml', 'w', encoding='utf-8') as f:
    f.write(sitemap_content)

print("=" * 55)
print("  FREE TOOLS HUB — Sitemap Generator")
print("=" * 55)
print(f"\n  ✅ sitemap.xml created!")
print(f"  📄 Total URLs: {len(html_files)}")
print(f"  📅 Last Modified: {TODAY}")
print(f"  🌐 Base URL: {BASE_URL}")
print("\n" + "=" * 55)
print("\nAb GitHub par push karo!")
print("Phir Google Search Console mein submit karo:")
print(f"  {BASE_URL}/sitemap.xml")
