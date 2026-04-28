#!/bin/bash
OUT="public/images"
CWEBP="/opt/homebrew/bin/cwebp"

download() {
  local url="$1"
  local outfile="$2"
  local tmp="/tmp/dl.jpg"
  echo "Downloading $outfile"
  curl -sL --retry 3 "$url" -o "$tmp"
  
  if file "$tmp" | grep -q "image data"; then
    sips -Z 1600 --setProperty format jpeg "$tmp" --out "/tmp/resized.jpg" 2>/dev/null
    "$CWEBP" -q 80 "/tmp/resized.jpg" -o "$OUT/$outfile" 2>/dev/null
    echo "  -> Saved $(du -sh $OUT/$outfile | cut -f1)"
    rm -f "/tmp/resized.jpg"
  else
    echo "  -> Failed (not an image)"
  fi
  rm -f "$tmp"
}

download "https://upload.wikimedia.org/wikipedia/commons/4/41/Dunns_River_Falls_climb.JPG" "tour_dunns_river.webp"
download "https://upload.wikimedia.org/wikipedia/commons/6/6f/Turtle_Beach_Ocho_Rios.jpg" "tour_dunns_beach.webp"
download "https://upload.wikimedia.org/wikipedia/commons/e/e9/Martha_Brae_Rafting_Village.jpg" "tour_bamboo_raft_1776115624127.webp"
download "https://upload.wikimedia.org/wikipedia/commons/9/91/Grace_Bay_Beach%2C_Providenciales%2C_Turks_and_Caicos.jpg" "tour_turks.webp"
download "https://upload.wikimedia.org/wikipedia/commons/8/87/Stingray_City%2C_Grand_Cayman_%28343759616%29.jpg" "tour_cayman.webp"
download "https://upload.wikimedia.org/wikipedia/commons/8/85/Tulum_2.jpg" "tour_mexico.webp"
download "https://upload.wikimedia.org/wikipedia/commons/8/8a/Rose_Hall_Great_House.JPG" "tour_rose_hall.webp"
download "https://upload.wikimedia.org/wikipedia/commons/a/ae/Devon_House_Kingston_Jamaica.jpg" "tour_history_1776115655578.webp"
