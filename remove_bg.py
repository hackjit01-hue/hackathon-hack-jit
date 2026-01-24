from rembg import remove
from PIL import Image
import os

input_path = 'src/assets/dept_earth_combined.png'
output_path = 'src/assets/dept_earth_combined_no_bg.png'

if os.path.exists(input_path):
    print(f"Processing {input_path}...")
    try:
        with open(input_path, 'rb') as i:
            input_data = i.read()
            output_data = remove(input_data)
            with open(output_path, 'wb') as o:
                o.write(output_data)
        print(f"Finished! Saved to {output_path}")
    except Exception as e:
        print(f"Error: {e}")
else:
    print(f"Input file not found: {input_path}")
