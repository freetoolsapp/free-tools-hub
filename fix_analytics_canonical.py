#!/usr/bin/env python3
# ================================================
# FREE TOOLS HUB — Analytics + Canonical Fixer
# Yeh script apni website folder mein rakho
# aur run karo: python3 fix_analytics_canonical.py
# ================================================

import os
import re

BASE_URL = "https://freetoolshub.online"

updated = 0
skipped = 0
errors  = 0

ANALYTICS_CODE = '''<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-5GGQGP06F0"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-5GGQGP06F0');
</script>'''

def get_page_url(filepath):
    """Har page ki apni URL banao"""
    path = filepath.replace('\\', '/')
    # index.html ko root URL do
    if path == 'index.html':
        return BASE_URL + '/'
    return BASE_URL + '/' + path

def fix_analytics(content):
    """Analytics add karo agar nahi hai"""
    # Pehle check karo already hai ya nahi
    if 'G-5GGQGP06F0' in content:
        return content, False
    
    # <head> ke baad add karo
    new_content = content.replace(
        '<head>',
        '<head>\n' + ANALYTICS_CODE,
        1
    )
    if new_content != content:
        return new_content, True
    return content, False

def fix_canonical(content, page_url):
    """Canonical URL fix karo"""
    changed = False
    
    # Agar canonical pehle se hai — update karo
    if 'rel="canonical"' in content:
        new_content = re.sub(
            r'<link\s+rel="canonical"\s+href="[^"]*"\s*/?>',
            f'<link rel="canonical" href="{page_url}">',
            content
        )
        if new_content != content:
            return new_content, True
        return content, False
    
    # Agar nahi hai — add karo </head> se pehle
    new_content = content.replace(
        '</head>',
        f'    <link rel="canonical" href="{page_url}">\n</head>',
        1
    )
    if new_content != content:
        return new_content, True
    return content, False

def process_file(filepath):
    global updated, skipped, errors

    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except Exception as e:
        print(f"  ERROR reading {filepath}: {e}")
        errors += 1
        return

    if '<head>' not in content and '</head>' not in content:
        skipped += 1
        return

    page_url = get_page_url(filepath)
    original = content
    a_changed = False
    c_changed = False

    # 1. Analytics fix
    content, a_changed = fix_analytics(content)

    # 2. Canonical fix
    content, c_changed = fix_canonical(content, page_url)

    if content != original:
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            changes = []
            if a_changed: changes.append('Analytics')
            if c_changed: changes.append('Canonical')
            print(f"  ✅ Updated ({', '.join(changes)}): {filepath}")
            updated += 1
        except Exception as e:
            print(f"  ERROR writing {filepath}: {e}")
            errors += 1
    else:
        print(f"  ⏭️  Skipped (already done): {filepath}")
        skipped += 1

# ── Main ──
print("=" * 60)
print("  FREE TOOLS HUB — Analytics + Canonical Fixer")
print("=" * 60)
print()

html_files = []
for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', '.github']]
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file).replace('./', '').replace('.\\', '')
            html_files.append(filepath)

print(f"Found {len(html_files)} HTML files\n")

for filepath in sorted(html_files):
    process_file(filepath)

print()
print("=" * 60)
print(f"  ✅ Updated  : {updated} files")
print(f"  ⏭️  Skipped  : {skipped} files")
print(f"  ❌ Errors   : {errors} files")
print("=" * 60)
print()
print("Ab GitHub par push karo!")
