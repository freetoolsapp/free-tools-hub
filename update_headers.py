#!/usr/bin/env python3
# ================================================
# FREE TOOLS HUB — Auto Header Updater v2
# ================================================

import os
import re

updated = 0
skipped = 0
errors  = 0

CSS_LINKS = {
    0: '<link rel="stylesheet" href="header-new.css">',
    1: '<link rel="stylesheet" href="../header-new.css">',
    2: '<link rel="stylesheet" href="../../header-new.css">',
}
JS_HEADERS = {
    0: '<div id="site-header"></div>\n<script src="header.js"></script>',
    1: '<div id="site-header"></div>\n<script src="../header.js"></script>',
    2: '<div id="site-header"></div>\n<script src="../../header.js"></script>',
}

def get_depth(filepath):
    parts = filepath.replace('\\', '/').split('/')
    return len(parts) - 1

def fix_css_link(content, depth):
    if 'header-new.css' in content:
        return content
    css = CSS_LINKS.get(min(depth, 2))
    for old in [
        '<link rel="stylesheet" href="style.css">',
        "<link rel='stylesheet' href='style.css'>",
    ]:
        if old in content:
            return content.replace(old, old + '\n    ' + css, 1)
    # Agar style.css nahi mila to </head> se pehle add karo
    return content.replace('</head>', '    ' + css + '\n</head>', 1)

def fix_header(content, depth):
    new_h = JS_HEADERS.get(min(depth, 2))

    # Pattern 1: <!-- HEADER --> comment ke saath
    p1 = re.sub(
        r'<!--\s*={3,}\s*HEADER\s*={3,}\s*-->\s*<header[^>]*>.*?</header>',
        new_h, content, count=1, flags=re.DOTALL | re.IGNORECASE
    )
    if p1 != content:
        return p1

    # Pattern 2: sirf <header class="site-header"
    p2 = re.sub(
        r'<header\s+class=["\']site-header["\'][^>]*>.*?</header>',
        new_h, content, count=1, flags=re.DOTALL | re.IGNORECASE
    )
    if p2 != content:
        return p2

    # Pattern 3: koi bhi <header ...> tag
    p3 = re.sub(
        r'<header[^>]*>.*?</header>',
        new_h, content, count=1, flags=re.DOTALL | re.IGNORECASE
    )
    if p3 != content:
        return p3

    # Pattern 4: fth-topbar wala naya header (already updated)
    if 'fth-topbar' in content or 'site-header' in content and 'id="site-header"' in content:
        return content

    # Pattern 5: <body> ke baad inject karo (last resort)
    if '<body' in content and 'site-header' not in content:
        return re.sub(
            r'(<body[^>]*>)',
            r'\1\n' + new_h,
            content, count=1
        )

    return content

def process_file(filepath):
    global updated, skipped, errors

    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except Exception as e:
        print(f"  ERROR reading {filepath}: {e}")
        errors += 1
        return

    if '<body' not in content:
        skipped += 1
        return

    # Already properly updated
    if 'id="site-header"' in content:
        print(f"  ✅ Already done: {filepath}")
        skipped += 1
        return

    depth = get_depth(filepath)
    original = content

    content = fix_css_link(content, depth)
    content = fix_header(content, depth)

    if content != original:
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  ✅ Updated: {filepath}")
            updated += 1
        except Exception as e:
            print(f"  ERROR writing {filepath}: {e}")
            errors += 1
    else:
        print(f"  ⏭️  Skipped: {filepath}")
        skipped += 1

# ── Main ──
print("=" * 55)
print("  FREE TOOLS HUB — Header Auto Updater v2")
print("=" * 55)
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
print("=" * 55)
print(f"  ✅ Updated  : {updated} files")
print(f"  ⏭️  Skipped  : {skipped} files")
print(f"  ❌ Errors   : {errors} files")
print("=" * 55)
print()
print("Ab apni website GitHub par push karo!")
