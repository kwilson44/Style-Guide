import os
import json
import requests
from PIL import Image
from io import BytesIO

def create_placeholder_image():
    # Create a 400x400 transparent image with text
    img = Image.new('RGBA', (400, 400), (255, 255, 255, 0))
    return img

def setup_image_directory():
    # Create images directory if it doesn't exist
    os.makedirs('images/hair', exist_ok=True)
    
    # Create placeholder image
    placeholder = create_placeholder_image()
    placeholder.save('images/hair/placeholder.png')

def download_hair_images():
    # Load hair data
    with open('black_coded_hair_pieces.json', 'r') as f:
        hair_data = json.load(f)
    
    # Track progress
    total = len(hair_data)
    successful = 0
    failed = 0
    
    # Process each hair piece
    for i, hair in enumerate(hair_data, 1):
        item_number = hair['item_number']
        filename = f"images/hair/{item_number}.png"
        
        # Skip if image already exists
        if os.path.exists(filename):
            successful += 1
            continue
            
        try:
            # Try to download from BrickLink
            url = f"https://img.bricklink.com/ItemImage/PN/11/{item_number}.png"
            response = requests.get(url)
            response.raise_for_status()
            
            # Process image
            img = Image.open(BytesIO(response.content))
            img = img.convert('RGBA')
            
            # Resize maintaining aspect ratio
            img.thumbnail((400, 400))
            
            # Create new image with padding
            final_img = Image.new('RGBA', (400, 400), (255, 255, 255, 0))
            paste_x = (400 - img.width) // 2
            paste_y = (400 - img.height) // 2
            final_img.paste(img, (paste_x, paste_y), img)
            
            # Save
            final_img.save(filename)
            successful += 1
            print(f"Downloaded {item_number} ({i}/{total})")
            
        except Exception as e:
            failed += 1
            print(f"Failed to download {item_number}: {str(e)}")
    
    print(f"\nDownload complete:\nSuccessful: {successful}\nFailed: {failed}")

if __name__ == "__main__":
    setup_image_directory()
    download_hair_images()