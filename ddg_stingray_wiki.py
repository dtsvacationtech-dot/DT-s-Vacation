import urllib.request
import subprocess
import os

url = "https://upload.wikimedia.org/wikipedia/commons/8/87/Stingray_City%2C_Grand_Cayman_%28343759616%29.jpg"
out = "tour_cayman.webp"
tmp = f"/tmp/{out}.jpg"
img_req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/109.0'})

try:
    print("Downloading from Wikimedia Commons...")
    with open(tmp, 'wb') as f:
        f.write(urllib.request.urlopen(img_req, timeout=15).read())
    
    print("Converting to WebP...")
    subprocess.run(["/opt/homebrew/bin/cwebp", "-q", "80", "-resize", "1200", "0", tmp, "-o", f"public/images/{out}"], capture_output=True)
    
    print(f"Saved {out} (Size: {os.path.getsize(f'public/images/{out}')//1024}KB)")
    os.remove(tmp)
except Exception as e:
    print(f"Failed: {e}")

