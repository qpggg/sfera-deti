from PIL import Image
import os

# Путь к обрезанному логотипу
input_path = 'public/logo_cropped.png'
output_dir = 'public'

# Размеры для разных устройств
sizes = [
    (16, 16, 'favicon-16x16.png'),
    (32, 32, 'favicon-32x32.png'),
    (48, 48, 'favicon-48x48.png'),
    (192, 192, 'android-chrome-192x192.png'),
    (512, 512, 'android-chrome-512x512.png')
]

# Загружаем исходное изображение
try:
    img = Image.open(input_path)
    
    # Конвертируем в RGBA, если нужно
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    print(f"Исходное изображение: {img.size[0]}x{img.size[1]}")
    
    # Создаем фавиконы разных размеров
    for width, height, filename in sizes:
        # Изменяем размер с сохранением пропорций и качественной интерполяцией
        resized = img.resize((width, height), Image.Resampling.LANCZOS)
        
        # Сохраняем
        output_path = os.path.join(output_dir, filename)
        resized.save(output_path, 'PNG', optimize=True)
        print(f"Создан: {filename} ({width}x{height})")
    
    # Создаем также favicon.ico (16x16 и 32x32 в одном файле)
    # Для .ico файла создаем несколько размеров
    ico_sizes = [16, 32, 48]
    ico_images = []
    for size in ico_sizes:
        resized = img.resize((size, size), Image.Resampling.LANCZOS)
        ico_images.append(resized)
    
    # Сохраняем как .ico
    ico_path = os.path.join(output_dir, 'favicon.ico')
    ico_images[0].save(ico_path, format='ICO', sizes=[(s, s) for s in ico_sizes])
    print(f"Создан: favicon.ico")
    
    print("\nВсе фавиконы успешно созданы!")
    
except FileNotFoundError:
    print(f"Ошибка: файл {input_path} не найден")
except Exception as e:
    print(f"Ошибка: {e}")

