from PIL import Image
import os

# Путь к обрезанному логотипу
input_path = 'public/logo_cropped.png'
output_path = 'public/favicon.png'

# Размер для favicon.png (обычно 32x32 или 64x64)
size = 64

try:
    # Загружаем исходное изображение
    img = Image.open(input_path)
    
    # Конвертируем в RGBA, если нужно
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    print(f"Исходное изображение: {img.size[0]}x{img.size[1]}")
    
    # Изменяем размер с сохранением пропорций и качественной интерполяцией
    resized = img.resize((size, size), Image.Resampling.LANCZOS)
    
    # Сохраняем как favicon.png
    resized.save(output_path, 'PNG', optimize=True)
    print(f"Создан: favicon.png ({size}x{size})")
    
except FileNotFoundError:
    print(f"Ошибка: файл {input_path} не найден")
except Exception as e:
    print(f"Ошибка: {e}")


