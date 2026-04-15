from PIL import Image
import os, glob

files = sorted(glob.glob("public/images/*.webp"), key=lambda f: os.path.getsize(f), reverse=True)
header = "{:<55} {:>8}  {:>12}".format("File", "Size", "Resolution")
print(header)
print("-" * 80)
for f in files[:10]:
    sz = os.path.getsize(f)
    with Image.open(f) as img:
        w, h = img.size
    line = "{:<55} {:>6} KB  {}x{}".format(os.path.basename(f), int(sz / 1024), w, h)
    print(line)
