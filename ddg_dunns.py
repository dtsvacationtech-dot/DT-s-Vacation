import urllib.request
import re
import json
import subprocess
import os
import urllib.parse

def search_ddg_images(query):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    req = urllib.request.Request(f"https://duckduckgo.com/?q={urllib.parse.quote(query)}", headers=headers)
    html = urllib.request.urlopen(req).read().decode('utf-8')
    vqd_match = re.search(r'vqd=([\d-]+)', html)
    if not vqd_match: return None
    vqd = vqd_match.group(1)
    
    search_url = f"https://duckduckgo.com/i.js?q={urllib.parse.quote(query)}&o=json&vqd={vqd}"
    req = urllib.request.Request(search_url, headers=headers)
    data = json.loads(urllib.request.urlopen(req).read().decode('utf-8'))
    for item in data.get('results', []):
        url = item['image']
        if url.endswith('.jpg') or url.endswith('.jpeg'):
            return url
    return None

q = "dunns river falls jamaica"
url = search_ddg_images(q)
if url:
    print(f"Found: {url}")
    out = "tour_dunns_river.webp"
    tmp = f"/tmp/{out}.jpg"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with open(tmp, 'wb') as f:
            f.write(urllib.request.urlopen(req, timeout=10).read())
        subprocess.run(["/opt/homebrew/bin/cwebp", "-q", "80", "-resize", "1200", "0", tmp, "-o", f"public/images/{out}"], capture_output=True)
        print(f"Saved {out} (Size: {os.path.getsize(f'public/images/{out}')//1024}KB)")
        os.remove(tmp)
    except Exception as e:
        print(f"Failed to dl/convert: {e}")
