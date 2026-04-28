#!/bin/bash
OUT="public/images"
CWEBP="/opt/homebrew/bin/cwebp"

download() {
  local url="$1"
  local outfile="$2"
  local tmp="/tmp/dl.jpg"
  echo "Downloading $outfile"
  curl -A "Mozilla/5.0" -sL --retry 3 "$url" -o "$tmp"
  if file "$tmp" | grep -q "image data"; then
    "$CWEBP" -q 75 "$tmp" -o "$OUT/$outfile" 2>/dev/null
    echo "  -> Saved $(du -sh $OUT/$outfile | cut -f1)"
  else
    echo "  -> Failed (not an image)"
  fi
}

download "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Dunns_River_Falls_climb.JPG/1600px-Dunns_River_Falls_climb.JPG" "tour_dunns_river.webp"
download "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Turtle_Beach_Ocho_Rios.jpg/1600px-Turtle_Beach_Ocho_Rios.jpg" "tour_dunns_beach.webp"
download "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Rose_Hall_Great_House.JPG/1600px-Rose_Hall_Great_House.JPG" "tour_rose_hall.webp"
download "https://images.unsplash.com/photo-1596328546171-77e37b5f9220?w=1600&q=85&auto=format&fit=crop" "tour_jungle_atv_1776115609750.webp"
download "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Devon_House_Kingston_Jamaica.jpg/1600px-Devon_House_Kingston_Jamaica.jpg" "tour_history_1776115655578.webp"
download "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Martha_Brae_Rafting_Village.jpg/1600px-Martha_Brae_Rafting_Village.jpg" "tour_bamboo_raft_1776115624127.webp"

download "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Grace_Bay_Beach%2C_Providenciales%2C_Turks_and_Caicos.jpg/1600px-Grace_Bay_Beach%2C_Providenciales%2C_Turks_and_Caicos.jpg" "tour_turks.webp"
download "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Stingray_City%2C_Grand_Cayman_%28343759616%29.jpg/1600px-Stingray_City%2C_Grand_Cayman_%28343759616%29.jpg" "tour_cayman.webp"
download "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tulum_2.jpg/1600px-Tulum_2.jpg" "tour_mexico.webp"
