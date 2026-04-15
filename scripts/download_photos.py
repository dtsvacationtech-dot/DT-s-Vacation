#!/usr/bin/env python3
"""
Download high-quality travel photos from Unsplash/Pexels and convert to WebP.
Photos are downloaded at 1400px wide (web-optimized) then saved as WebP quality 82.
"""

import os
import urllib.request
from pathlib import Path
from PIL import Image
import io

OUTPUT_DIR = Path(__file__).parent.parent / "public" / "images"
WEBP_QUALITY = 82

# Map: output filename → source URL
PHOTOS = [
    ("hero_tours.webp",       "https://images.pexels.com/photos/14788935/pexels-photo-14788935.jpeg?auto=compress&cs=tinysrgb&w=1400"),
    ("tour_bali.webp",        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1400&q=80"),
    ("tour_dunns_river.webp", "https://images.unsplash.com/photo-1464419014442-769c523d575b?auto=format&fit=crop&w=1400&q=80"),
    ("tour_mexico.webp",      "https://images.unsplash.com/photo-1665618980645-ca9cd5e68508?auto=format&fit=crop&w=1400&q=80"),
    ("tour_machu_picchu.webp","https://images.unsplash.com/photo-1587590227264-0ac64ce63ce8?auto=format&fit=crop&w=1400&q=80"),
    ("tour_dunns_beach.webp", "https://images.unsplash.com/photo-1549468057-5b7fa1a41d7a?auto=format&fit=crop&w=1400&q=80"),
    ("tour_rose_hall.webp",   "https://images.unsplash.com/photo-1607659398814-e6744dd2254d?auto=format&fit=crop&w=1400&q=80"),
    ("hero_cruises.webp",     "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1400&q=80"),
    ("unsplash_cruise.webp",  "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1400&q=80"),
    ("hero_hotels.webp",      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=80"),
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/121.0.0.0 Safari/537.36",
    "Accept": "image/webp,image/jpeg,image/*",
}

def download_and_convert(filename, url):
    out_path = OUTPUT_DIR / filename
    print(f"  ↓  {filename} ...", end=" ", flush=True)

    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = resp.read()

    img = Image.open(io.BytesIO(data)).convert("RGB")
    img.save(out_path, "WEBP", quality=WEBP_QUALITY, method=6)

    size_kb = out_path.stat().st_size // 1024
    w, h = img.size
    print(f"✓  {w}×{h}  →  {size_kb} KB")

def main():
    print(f"\n{'='*60}")
    print(f"  Downloading {len(PHOTOS)} photos → WebP (quality={WEBP_QUALITY})")
    print(f"{'='*60}")

    success, failed = 0, []
    for filename, url in PHOTOS:
        try:
            download_and_convert(filename, url)
            success += 1
        except Exception as e:
            print(f"✗  FAILED: {e}")
            failed.append((filename, str(e)))

    print(f"\n  ✅ Done: {success}/{len(PHOTOS)}")
    if failed:
        print("  Failed:")
        for f, e in failed:
            print(f"    • {f}: {e}")

if __name__ == "__main__":
    main()
