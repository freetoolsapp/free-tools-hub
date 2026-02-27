#!/usr/bin/env python3
# ================================================
# FREE TOOLS HUB — PWA Code Adder
# Run karo: python add_pwa.py
# Sab pages mein PWA code automatically add hoga
# ================================================

import os
import re

updated = 0
skipped = 0
errors  = 0

PWA_CODE = '''    <!-- PWA -->
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#5b21b6">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="Free Tools Hub">
    <link rel="apple-touch-icon" href="/icon-192.png">'''

SW_CODE = '''    <!-- Service Worker -->
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('/sw.js')
            .then(function(reg) { console.log('SW registered'); })
            .catch(function(err) { console.log('SW error:', err); });
        });
      }
    </script>'''

def process_file(filepath):
    global updated, skipped, errors

    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except Exception as e:
        print(f"  ERROR reading {filepath}: {e}")
        errors += 1
        return

    if '</head>' not in content:
        skipped += 1
        return

    # Already done check
    if 'manifest.json' in content and 'serviceWorker' in content:
        print(f"  ⏭️  Skipped (already done): {filepath}")
        skipped += 1
        return

    original = content

    # Add PWA meta tags before </head>
    if 'manifest.json' not in content:
        content = content.replace('</head>', PWA_CODE + '\n</head>', 1)

    # Add SW registration before </body>
    if 'serviceWorker' not in content:
        content = content.replace('</body>', SW_CODE + '\n</body>', 1)

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
print("  FREE TOOLS HUB — PWA Code Adder")
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
print("Ab GitHub par push karo!")
print("Website install hogi mobile par!")
