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
    
    bad_domains = ['alamy', 'shutterstock', 'istock', 'getty', 'stock', 'dreamstime']
    
    for item in data.get('results', []):
        url = item['image']
        lower_url = url.lower()
        if any(bad in lower_url for bad in bad_domains):
            continue
            
        if url.endswith('.jpg') or url.endswith('.jpeg'):
            print(f"Trying: {url}")
            out = "tour_cayman.webp"
            tmp = f"/tmp/{out}.jpg"
            img_req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            try:
                with open(tmp, 'wb') as f:
                    f.write(urllib.request.urlopen(img_req, timeout=5).read())
                subprocess.run(["/opt/homebrew/bin/cwebp", "-q", "80", "-resize", "1200", "0", tmp, "-o", f"public/images/{out}"], capture_output=True)
                print(f"Saved {out} (Size: {os.path.getsize(f'public/images/{out}')//1024}KB)")
                os.remove(tmp)
                return url
            except Exception as e:
                print(f"Failed: {e}")
    return None

search_ddg_images("stingray city grand cayman underwater")
