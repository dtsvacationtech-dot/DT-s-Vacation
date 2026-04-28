import urllib.request
import urllib.parse
import json
import os
import subprocess

def get_wikimedia_image(page_title):
    quoted_title = urllib.parse.quote(page_title)
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={quoted_title}&prop=pageimages&format=json&pithumbsize=1600"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        data = json.loads(urllib.request.urlopen(req).read())
        pages = data['query']['pages']
        for page_id in pages:
            if 'thumbnail' in pages[page_id]:
                return pages[page_id]['thumbnail']['source']
    except Exception as e:
        print(f"Failed for {page_title}: {e}")
    return None

def download_and_convert(url, output_file):
    if not url: return
    print(f"Downloading {url} to {output_file}")
    tmp_file = "/tmp/dl.jpg"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with open(tmp_file, 'wb') as f:
        f.write(urllib.request.urlopen(req).read())
    
    subprocess.run(["/opt/homebrew/bin/cwebp", "-q", "80", tmp_file, "-o", output_file], capture_output=True)
    os.remove(tmp_file)
    size = os.path.getsize(output_file)
    print(f"Saved {output_file} ({size // 1024} KB)")

images = {
    "Dunn's River Falls": "public/images/tour_dunns_river.webp",
    "Martha Brae River": "public/images/tour_bamboo_raft_1776115624127.webp",
    "Negril": "public/images/tour_negril.webp",
    "Turks and Caicos Islands": "public/images/tour_turks.webp",
    "Rose Hall, Montego Bay": "public/images/tour_rose_hall.webp",
    "Stingray City, Grand Cayman": "public/images/tour_cayman.webp",
    "Ocho Rios": "public/images/tour_dunns_beach.webp"
}

for title, out_path in images.items():
    url = get_wikimedia_image(title)
    if url:
        download_and_convert(url, out_path)
    else:
        print(f"Could not find image for {title}")

