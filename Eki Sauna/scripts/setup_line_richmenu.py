#!/usr/bin/env python3
import sys
import os
import json
import urllib.request
import urllib.error

# Load .env if present
env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
if os.path.exists(env_path):
    with open(env_path) as f:
        for line in f:
            if line.startswith('LINE_CHANNEL_ACCESS_TOKEN='):
                os.environ['LINE_CHANNEL_ACCESS_TOKEN'] = line.strip().split('=', 1)[1]

IMAGE_PATH = os.path.join(os.path.dirname(__file__), '..', 'public', 'eki_rich_menu_2500x1686.jpg')

def get_current_rich_menus(channel_access_token: str):
    headers = {'Authorization': f'Bearer {channel_access_token}'}
    req = urllib.request.Request('https://api.line.me/v2/bot/richmenu/list', headers=headers)
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode('utf-8')).get('richmenus', [])

def delete_rich_menu(channel_access_token: str, rich_menu_id: str):
    headers = {'Authorization': f'Bearer {channel_access_token}'}
    req = urllib.request.Request(f'https://api.line.me/v2/bot/richmenu/{rich_menu_id}', headers=headers, method='DELETE')
    try:
        with urllib.request.urlopen(req) as resp:
            print(f'🗑️ Deleted old Rich Menu ID: {rich_menu_id}')
    except Exception as e:
        print(f'Note: Could not delete {rich_menu_id}: {e}')

def create_and_set_rich_menu(channel_access_token: str, custom_actions: dict = None):
    # Action configuration for the areas
    actions = {
        'membership': custom_actions.get('membership') if (custom_actions and 'membership' in custom_actions) else {
            'type': 'uri',
            'label': 'บัตรสมาชิก',
            'uri': 'https://liff.line.me/2011345397-1XKydCv0'
        },
        'buy_coupon': custom_actions.get('buy_coupon') if (custom_actions and 'buy_coupon' in custom_actions) else {
            'type': 'uri',
            'label': 'ซื้อคูปอง',
            'uri': 'https://liff.line.me/2011345397-1XKydCv0?page=shop'
        },
        'promotion': custom_actions.get('promotion') if (custom_actions and 'promotion' in custom_actions) else {
            'type': 'uri',
            'label': 'โปรโมชั่น',
            'uri': 'https://liff.line.me/2011345397-1XKydCv0?page=promotion'
        },
        'my_voucher': custom_actions.get('my_voucher') if (custom_actions and 'my_voucher' in custom_actions) else {
            'type': 'message',
            'text': 'คูปองของฉัน'
        },
        'contact_us': custom_actions.get('contact_us') if (custom_actions and 'contact_us' in custom_actions) else {
            'type': 'message',
            'text': 'ติดต่อ'
        }
    }

    rich_menu_data = {
        'size': {'width': 2500, 'height': 1686},
        'selected': True,
        'name': 'Eki Onsen & Sauna Luxury Menu',
        'chatBarText': 'เมนูหลัก',
        'areas': [
            {
                # 1. Top-Left: เมนู บัตรสมาชิก (Membership) -> Open LIFF Webview
                'bounds': {'x': 0, 'y': 360, 'width': 1250, 'height': 540},
                'action': actions['membership']
            },
            {
                # 2. Top-Right: ซื้อคูปอง (Buy Coupon)
                'bounds': {'x': 1250, 'y': 360, 'width': 1250, 'height': 540},
                'action': actions['buy_coupon']
            },
            {
                # 3. Middle-Left: โปรโมชั่น (Promotion)
                'bounds': {'x': 0, 'y': 900, 'width': 1250, 'height': 520},
                'action': actions['promotion']
            },
            {
                # 4. Middle-Right: MY VOUCHER ของฉัน (My Voucher)
                'bounds': {'x': 1250, 'y': 900, 'width': 1250, 'height': 520},
                'action': actions['my_voucher']
            },
            {
                # 5. Bottom-Right / Bottom: ติดต่อสอบถาม -> ส่งข้อความ 'ติดต่อ'
                'bounds': {'x': 1200, 'y': 1420, 'width': 1300, 'height': 266},
                'action': actions['contact_us']
            }
        ]
    }

    headers = {
        'Authorization': f'Bearer {channel_access_token}',
        'Content-Type': 'application/json'
    }

    # Step 1: Create Rich Menu Structure
    print('📦 1. Creating Rich Menu structure with LIFF URI: https://liff.line.me/2011345397-1XKydCv0 ...')
    req = urllib.request.Request('https://api.line.me/v2/bot/richmenu', data=json.dumps(rich_menu_data).encode('utf-8'), headers=headers, method='POST')
    try:
        with urllib.request.urlopen(req) as resp:
            body = json.loads(resp.read().decode('utf-8'))
            rich_menu_id = body.get('richMenuId')
            print(f'✅ Rich Menu Created! ID: {rich_menu_id}')
    except urllib.error.HTTPError as e:
        print(f'❌ Failed to create Rich Menu: {e.code} - {e.read().decode("utf-8")}')
        return

    # Step 2: Upload Image
    print(f'🖼️ 2. Uploading 2500x1686 Rich Menu image: {IMAGE_PATH}')
    with open(IMAGE_PATH, 'rb') as f:
        img_bytes = f.read()

    img_headers = {
        'Authorization': f'Bearer {channel_access_token}',
        'Content-Type': 'image/jpeg'
    }
    img_req = urllib.request.Request(f'https://api-data.line.me/v2/bot/richmenu/{rich_menu_id}/content', data=img_bytes, headers=img_headers, method='POST')
    try:
        with urllib.request.urlopen(img_req) as resp:
            print('✅ Image uploaded successfully!')
    except urllib.error.HTTPError as e:
        print(f'❌ Failed to upload image: {e.code} - {e.read().decode("utf-8")}')
        return

    # Step 3: Set as Default Rich Menu
    print(f'🌟 3. Setting as Default Rich Menu for all users...')
    set_headers = {'Authorization': f'Bearer {channel_access_token}'}
    set_req = urllib.request.Request(f'https://api.line.me/v2/bot/user/all/richmenu/{rich_menu_id}', headers=set_headers, method='POST')
    try:
        with urllib.request.urlopen(set_req) as resp:
            print(f'🎉 Success! Rich Menu {rich_menu_id} is now ACTIVE as DEFAULT for all LINE users.')
    except urllib.error.HTTPError as e:
        print(f'❌ Failed to set default Rich Menu: {e.code} - {e.read().decode("utf-8")}')

    # Step 4: Clean up old rich menus
    try:
        all_menus = get_current_rich_menus(channel_access_token)
        for m in all_menus:
            old_id = m.get('richMenuId')
            if old_id != rich_menu_id:
                delete_rich_menu(channel_access_token, old_id)
    except Exception as e:
        print('Cleanup note:', e)

if __name__ == '__main__':
    token = sys.argv[1] if len(sys.argv) > 1 else os.environ.get('LINE_CHANNEL_ACCESS_TOKEN')
    if not token:
        print('Usage: python3 setup_line_richmenu.py <LINE_CHANNEL_ACCESS_TOKEN>')
        sys.exit(1)
    create_and_set_rich_menu(token)
