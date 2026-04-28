#!/bin/bash
# Download real tour photos and convert to compressed WebP
# Using Unsplash direct download links (free, attribution-free for use)

OUT="public/images"
CWEBP="/opt/homebrew/bin/cwebp"
QUALITY=80

echo "=== Downloading real tour photos ==="

download_and_convert() {
  local url="$1"
  local tmpfile="$2"
  local outfile="$3"
  
  echo "⬇️  Downloading → $outfile"
  curl -sL --max-time 30 --retry 2 "$url" -o "$tmpfile"
  
  if [ -f "$tmpfile" ] && [ -s "$tmpfile" ]; then
    "$CWEBP" -q $QUALITY "$tmpfile" -o "$outfile" 2>/dev/null
    rm -f "$tmpfile"
    local size=$(du -sh "$outfile" 2>/dev/null | cut -f1)
    echo "   ✅ $outfile ($size)"
  else
    echo "   ❌ Failed: $tmpfile"
  fi
}

# ── LOCAL JAMAICA ──────────────────────────────────────────────────────
# Dunn's River Falls — real waterfall photo
download_and_convert \
  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=85&auto=format&fit=crop" \
  "/tmp/dunns_river_dl.jpg" \
  "$OUT/tour_dunns_river.webp"

# Ocho Rios Beach — Jamaica beach
download_and_convert \
  "https://images.unsplash.com/photo-1512273222628-4daea6e55abb?w=1600&q=85&auto=format&fit=crop" \
  "/tmp/dunns_beach_dl.jpg" \
  "$OUT/tour_dunns_beach.webp"

# Rose Hall Great House — plantation / heritage building
download_and_convert \
  "https://images.unsplash.com/photo-1589393922695-ef4af1601f08?w=1600&q=85&auto=format&fit=crop" \
  "/tmp/rose_hall_dl.jpg" \
  "$OUT/tour_rose_hall.webp"

# Bamboo River Rafting — river raft in jungle
download_and_convert \
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85&auto=format&fit=crop" \
  "/tmp/bamboo_raft_dl.jpg" \
  "$OUT/tour_bamboo_raft_1776115624127.webp"

# Jungle ATV — ATV off-road adventure
download_and_convert \
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85&auto=format&fit=crop" \
  "/tmp/jungle_atv_dl.jpg" \
  "$OUT/tour_jungle_atv_1776115609750.webp"

# Heritage Tour — historic colonial building / old street
download_and_convert \
  "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1600&q=85&auto=format&fit=crop" \
  "/tmp/history_dl.jpg" \
  "$OUT/tour_history_1776115655578.webp"

# ── OVERSEAS ───────────────────────────────────────────────────────────
# Santorini — iconic blue dome churches
download_and_convert \
  "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1600&q=85&auto=format&fit=crop" \
  "/tmp/santorini_dl.jpg" \
  "$OUT/tour_santorini.webp"

# Machu Picchu — ruins with mountains
download_and_convert \
  "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1600&q=85&auto=format&fit=crop" \
  "/tmp/machu_picchu_dl.jpg" \
  "$OUT/tour_machu_picchu.webp"

# Bali — temple with rice fields
download_and_convert \
  "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=1600&q=85&auto=format&fit=crop" \
  "/tmp/bali_dl.jpg" \
  "$OUT/tour_bali.webp"

# Turks & Caicos — crystal clear shallow water beach
download_and_convert \
  "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1600&q=85&auto=format&fit=crop" \
  "/tmp/turks_dl.jpg" \
  "$OUT/tour_turks.webp"

# Grand Cayman — clear Caribbean water with stingrays / sea life
download_and_convert \
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&q=85&auto=format&fit=crop" \
  "/tmp/cayman_dl.jpg" \
  "$OUT/tour_cayman.webp"

# Tulum Mexico — ruins with ocean backdrop
download_and_convert \
  "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=1600&q=85&auto=format&fit=crop" \
  "/tmp/mexico_dl.jpg" \
  "$OUT/tour_mexico.webp"

# Hero Tours — panoramic tropical destination
download_and_convert \
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=85&auto=format&fit=crop" \
  "/tmp/hero_tours_dl.jpg" \
  "$OUT/hero_tours.webp"

# Service tours card image
download_and_convert \
  "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1600&q=85&auto=format&fit=crop" \
  "/tmp/service_tours_dl.jpg" \
  "$OUT/service_tours_1776110861151.webp"

echo ""
echo "=== Final sizes ==="
ls -lah "$OUT" | grep tour | awk '{print $5, $9}'
ls -lah "$OUT" | grep hero_tours | awk '{print $5, $9}'
echo "Done! ✅"
