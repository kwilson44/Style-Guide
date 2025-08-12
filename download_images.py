import os
import json
import requests
from PIL import Image
from io import BytesIO
from time import sleep

# Extended color map with more LEGO colors
COLOR_ID_MAP = {
    "Black": 11,
    "Dark Brown": 120,
    "Reddish Brown": 88, 
    "White": 1,
    "Medium Nougat": 150,
    "Light Bluish Gray": 86,
    "Dark Bluish Gray": 85,
    "Tan": 2,
    "Brown": 8,
    "Dark Tan": 69,
    "Copper": 51,
    "Yellow": 3,
    "Bright Light Yellow": 103,
    "Dark Orange": 68,
    "Light Aqua": 152,
    "Red": 5,
    "Dark Red": 59,
    "Orange": 4,
    "Bright Light Orange": 110,
    "Magenta": 71,
    "Dark Purple": 89,
    "Dark Pink": 47,
    "Medium Lavender": 157,
    "Green": 6,
    "Lime": 34,
    "Pearl Gold": 115,
    "Flat Silver": 95,
    "Metallic Gold": 82,
    "Trans-Purple": 51
}

def download_image(url, retries=3, delay=1):
    """Download image with retry logic and delay, using a legitimate User-Agent"""
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/115.0.0.0 Safari/537.36"
        )
    }

    for attempt in range(retries):
        try:
            response = requests.get(url, timeout=10, headers=headers)
            response.raise_for_status()
            
            content_type = response.headers.get('content-type', '')
            if not content_type.startswith('image/'):
                raise ValueError(f"Response is not an image: {content_type}")
                
            img = Image.open(BytesIO(response.content))
            return img
            
        except Exception as e:
            if attempt == retries - 1:
                raise e
            print(f"Attempt {attempt + 1} failed, retrying...")
            sleep(delay)
            delay *= 2  # Exponential backoff
    
def process_image(img, size=(400, 400)):
    """Process image to standard size with transparency"""
    # Convert to RGBA if needed
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
        
    # Resize preserving aspect ratio
    img.thumbnail(size, Image.LANCZOS)
    
    # Center on transparent canvas
    canvas = Image.new('RGBA', size, (255, 255, 255, 0))
    paste_x = (size[0] - img.width) // 2
    paste_y = (size[1] - img.height) // 2
    canvas.paste(img, (paste_x, paste_y), img)
    
    return canvas

def main():
    # Create image directory
    img_dir = "images/hair"
    os.makedirs(img_dir, exist_ok=True)

    # Load the JSON data
    with open("black_coded_hair_pieces.json", "r") as f:
        data = json.load(f)

    # Track progress
    total = len(data)
    successful = 0
    failed = 0
    skipped = 0

    # Track which item_number-color combos we've processed
    processed = set()

    for i, entry in enumerate(data, 1):
        item_number = entry["item_number"]
        color = entry["Name"]
        filename = f"{item_number}.png"
        
        # Skip if we've already processed this combo
        if (item_number, color) in processed:
            skipped += 1
            continue
        
        processed.add((item_number, color))
        
        # Get color ID
        color_id = COLOR_ID_MAP.get(color)
        if color_id is None:
            print(f"[SKIP] Unknown color ID for {color} ({item_number})")
            skipped += 1
            continue

        save_path = os.path.join(img_dir, filename)
        img_url = f"https://img.bricklink.com/ItemImage/PN/{color_id}/{item_number}.png"

        print(f"Processing {i}/{total}: {filename}")
        
        try:
            # Download and process image
            img = download_image(img_url)
            processed_img = process_image(img)
            processed_img.save(save_path)
            
            successful += 1
            print(f"[✓] Saved {filename}")
            
        except Exception as e:
            failed += 1
            print(f"[!] Failed to download {filename}: {str(e)}")
            
        # Be nice to the server
        sleep(0.5)

    # Create placeholder image
    placeholder = Image.new("RGBA", (400, 400), (255, 255, 255, 0))
    placeholder_path = os.path.join(img_dir, "placeholder.png")
    placeholder.save(placeholder_path)
    print("\n[✓] Created placeholder.png")

    # Print summary
    print(f"\nDownload Summary:")
    print(f"Total items: {total}")
    print(f"Successfully downloaded: {successful}")
    print(f"Failed: {failed}")
    print(f"Skipped (duplicates/unknown colors): {skipped}")

if __name__ == "__main__":
    main()