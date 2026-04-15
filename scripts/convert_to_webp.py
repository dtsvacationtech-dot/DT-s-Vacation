#!/usr/bin/env python3
"""
Convert all JPG/PNG images in public/images/ to WebP format.
- Quality 82: excellent visual quality, ~60-80% size reduction vs PNG/JPG
- Keeps originals as backup in public/images/_originals/
- Prints a before/after size report
"""

import os
import shutil
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("ERROR: Pillow not installed. Run: pip3 install Pillow")
    exit(1)

IMAGES_DIR = Path(__file__).parent.parent / "public" / "images"
BACKUP_DIR = IMAGES_DIR / "_originals"
WEBP_QUALITY = 82  # 82 is sweet spot: great quality, small file
EXTENSIONS = {".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"}

def human_size(num_bytes):
    for unit in ["B", "KB", "MB"]:
        if abs(num_bytes) < 1024.0:
            return f"{num_bytes:.1f} {unit}"
        num_bytes /= 1024.0
    return f"{num_bytes:.1f} GB"

def convert_images():
    BACKUP_DIR.mkdir(exist_ok=True)

    image_files = [
        f for f in IMAGES_DIR.iterdir()
        if f.is_file() and f.suffix in EXTENSIONS
    ]

    if not image_files:
        print("No images found to convert.")
        return

    total_before = 0
    total_after = 0
    converted = []
    failed = []

    print(f"\n{'='*65}")
    print(f"  Converting {len(image_files)} images → WebP (quality={WEBP_QUALITY})")
    print(f"{'='*65}")
    print(f"  {'Filename':<45} {'Before':>7}  {'After':>7}  {'Saved':>6}")
    print(f"  {'-'*45} {'-'*7}  {'-'*7}  {'-'*6}")

    for src_path in sorted(image_files):
        size_before = src_path.stat().st_size
        webp_path = src_path.with_suffix(".webp")

        try:
            with Image.open(src_path) as img:
                # Preserve color accuracy: convert RGBA → RGB for JPGs
                if img.mode in ("RGBA", "LA", "P"):
                    img = img.convert("RGBA")  # keep alpha for PNG-sourced
                    img.save(webp_path, "WEBP", quality=WEBP_QUALITY, method=6, lossless=False)
                else:
                    img = img.convert("RGB")
                    img.save(webp_path, "WEBP", quality=WEBP_QUALITY, method=6, lossless=False)

            size_after = webp_path.stat().st_size
            saved_pct = (1 - size_after / size_before) * 100

            total_before += size_before
            total_after += size_after
            converted.append((src_path.name, webp_path.name))

            # Backup original
            shutil.copy2(src_path, BACKUP_DIR / src_path.name)
            # Remove original
            src_path.unlink()

            print(f"  ✓ {src_path.name:<45} {human_size(size_before):>7}  {human_size(size_after):>7}  {saved_pct:>5.1f}%")

        except Exception as e:
            failed.append((src_path.name, str(e)))
            print(f"  ✗ {src_path.name:<45} FAILED: {e}")

    print(f"{'='*65}")
    total_saved_pct = (1 - total_after / total_before) * 100 if total_before > 0 else 0
    print(f"  {'TOTAL':<45} {human_size(total_before):>7}  {human_size(total_after):>7}  {total_saved_pct:>5.1f}%")
    print(f"{'='*65}")
    print(f"\n  ✅ Converted: {len(converted)}  |  ❌ Failed: {len(failed)}")
    print(f"  📦 Originals backed up → public/images/_originals/")
    print()

    if failed:
        print("  Failed files:")
        for name, err in failed:
            print(f"    - {name}: {err}")

if __name__ == "__main__":
    convert_images()
