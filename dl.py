import urllib.request
import subprocess
import os

images = {
    "tour_dunns_river.webp": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Dunns_River_Falls_climb.JPG/1600px-Dunns_River_Falls_climb.JPG",
    "tour_dunns_beach.webp": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Turtle_Beach_Ocho_Rios.jpg/1600px-Turtle_Beach_Ocho_Rios.jpg",
    "tour_bamboo_raft_1776115624127.webp": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Martha_Brae_Rafting_Village.jpg/1600px-Martha_Brae_Rafting_Village.jpg",
    "tour_turks.webp": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Grace_Bay_Beach%2C_Providenciales%2C_Turks_and_Caicos.jpg/1600px-Grace_Bay_Beach%2C_Providenciales%2C_Turks_and_Caicos.jpg",
    "tour_cayman.webp": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Stingray_City%2C_Grand_Cayman_%28343759616%29.jpg/1600px-Stingray_City%2C_Grand_Cayman_%28343759616%29.jpg",
    "tour_mexico.webp": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tulum_2.jpg/1600px-Tulum_2.jpg"
}

opener = urllib.request.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36')]
urllib.request.install_opener(opener)

for out_name, url in images.items():
    print(f"Downloading {out_name}")
    try:
        urllib.request.urlretrieve(url, f"/tmp/tmp_{out_name}.jpg")
        subprocess.run(["/opt/homebrew/bin/cwebp", "-q", "80", f"/tmp/tmp_{out_name}.jpg", "-o", f"public/images/{out_name}"], check=True, capture_output=True)
        os.remove(f"/tmp/tmp_{out_name}.jpg")
        print(f"Saved {out_name}")
    except Exception as e:
        print(f"Error on {out_name}: {e}")
