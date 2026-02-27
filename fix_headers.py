import os
import re
from pathlib import Path

WEBSITE_ROOT = r"C:\Users\GHS Ahmadani\Desktop\free-tools-hub-main"

def get_relative_path(html_file_path, root):
    rel = os.path.relpath(html_file_path, root)
    depth = len(Path(rel).parts) - 1
    if depth == 0:
        return ""
    elif depth == 1:
        return "../"
    else:
        return "../../"

def fix_css(content, base):
    if "header-new.css" in content:
        return content
    css_link = f'    <link rel="stylesheet" href="{base}header-new.css">'
    content = content.replace("</head>", f"{css_link}\n</head>", 1)
    return content

def fix_div_and_js(content, base):
    already_div = 'id="site-header"' in content
    already_js  = "header.js" in content
    if already_div and already_js:
        return content
    body_match = re.search(r'<body[^>]*>', content, re.IGNORECASE)
    if not body_match:
        return content
    insert_pos = body_match.end()
    insert_str = ""
    if not already_div:
        insert_str += f'\n    <div id="site-header"></div>'
    if not already_js:
        insert_str += f'\n    <script src="{base}header.js"></script>'
    content = content[:insert_pos] + insert_str + content[insert_pos:]
    return content

def process_files():
    root = WEBSITE_ROOT
    fixed      = []
    already_ok = []
    errors     = []

    print("=" * 55)
    print("  FREE TOOLS HUB — Header Auto-Fix")
    print("=" * 55)
    print(f"  Folder: {root}")
    print("=" * 55)

    if not os.path.exists(root):
        print(f"\n  ERROR: Folder nahi mila!")
        print(f"  Path: {root}")
        input("\n  Enter dabayein...")
        return

    all_html = []
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in ['.git', 'node_modules', '__pycache__']]
        for fname in filenames:
            if fname.endswith('.html'):
                all_html.append(os.path.join(dirpath, fname))

    print(f"\n  {len(all_html)} HTML files mile\n")

    for fpath in all_html:
        fname_short = os.path.relpath(fpath, root)
        try:
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                original = f.read()

            css_ok = "header-new.css" in original
            div_ok = 'id="site-header"' in original
            js_ok  = "header.js" in original

            if css_ok and div_ok and js_ok:
                already_ok.append(fname_short)
                print(f"  OK      {fname_short}")
                continue

            base    = get_relative_path(fpath, root)
            content = original
            content = fix_css(content, base)
            content = fix_div_and_js(content, base)

            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(content)

            missing = []
            if not css_ok: missing.append("CSS")
            if not div_ok: missing.append("DIV")
            if not js_ok:  missing.append("JS")

            fixed.append(fname_short)
            print(f"  FIXED   {fname_short}  [{', '.join(missing)}]")

        except Exception as e:
            errors.append((fname_short, str(e)))
            print(f"  ERROR   {fname_short}  [{e}]")

    print("\n" + "=" * 55)
    print("  SUMMARY")
    print("=" * 55)
    print(f"  Pehle se theek : {len(already_ok)} files")
    print(f"  Fix kiye gaye  : {len(fixed)} files")
    print(f"  Errors         : {len(errors)} files")
    if errors:
        print("\n  Error files:")
        for f, e in errors:
            print(f"    - {f} => {e}")
    print("\n  Kaam mukammal hua!")
    print("=" * 55)
    input("\n  Enter dabayein band karne ke liye...")

if __name__ == "__main__":
    process_files()
