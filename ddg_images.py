import urllib.request
import re
import json
import subprocess
import os

def search_ddg_images(query):
    # DDG requires an initial request to get a vqd token
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

import urllib.parse
queries = {
    "tour_dunns_beach.webp": "Ocho Rios beach jamaica resort 4k",
    "tour_bamboo_raft_1776115624127.webp": "martha brae river bamboo rafting jamaica",
    "tour_turks.webp": "grace bay beach turks and caicos sunny",
    "tour_cayman.webp": "stingray city grand cayman underwater",
    "tour_rose_hall.webp": "rose hall great house montego bay jamaica",
    "tour_history_1776115655578.webp": "devon house kingston jamaica",
    "tour_jungle_atv_1776115609750.webp": "jungle atv dirt ride"
}

for out, q in queries.items():
    print(f"Searching for {q}...")
    url = search_ddg_images(q)
    if url:
        print(f"Found: {url}")
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
    else:
        print("No image found.")
