import cv2
import numpy as np
from PIL import Image
import os

# Путь к исходному логотипу
input_path = 'public/logo.png'
output_path = 'public/logo_cropped.png'

# Загружаем изображение
img = cv2.imread(input_path, cv2.IMREAD_UNCHANGED)

if img is None:
    print(f"Ошибка: не удалось загрузить изображение {input_path}")
    exit(1)

# Конвертируем в RGB, если есть альфа-канал
if img.shape[2] == 4:
    # Создаем белый фон для изображения с прозрачностью
    rgb_img = cv2.cvtColor(img[:, :, :3], cv2.COLOR_BGR2RGB)
    alpha = img[:, :, 3]
    # Создаем белый фон
    white_bg = np.ones_like(rgb_img) * 255
    # Накладываем изображение на белый фон с учетом альфа-канала
    img_rgb = (rgb_img * (alpha[:, :, np.newaxis] / 255.0) + 
               white_bg * (1 - alpha[:, :, np.newaxis] / 255.0)).astype(np.uint8)
    gray = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2GRAY)
else:
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Пробуем найти круг с помощью HoughCircles
circles = cv2.HoughCircles(
    gray,
    cv2.HOUGH_GRADIENT,
    dp=1,
    minDist=100,
    param1=50,
    param2=30,
    minRadius=50,
    maxRadius=0
)

if circles is not None:
    # Берем первый найденный круг
    circles = np.uint16(np.around(circles))
    circle = circles[0][0]
    center_x, center_y, radius = int(circle[0]), int(circle[1]), int(circle[2])
    
    # Добавляем небольшой отступ
    padding = int(radius * 0.15)
    size = (radius + padding) * 2
    
    # Ограничиваем размер размером изображения
    max_size = min(img_rgb.shape[0], img_rgb.shape[1])
    size = min(size, max_size)
    
    # Вычисляем координаты с проверкой границ
    x1 = max(0, center_x - size // 2)
    y1 = max(0, center_y - size // 2)
    x2 = min(img_rgb.shape[1], x1 + size)
    y2 = min(img_rgb.shape[0], y1 + size)
    
    # Корректируем, если вышли за границы
    if x2 - x1 < size:
        x1 = max(0, x2 - size)
    if y2 - y1 < size:
        y1 = max(0, y2 - size)
    
    # Делаем квадрат
    actual_size = min(x2 - x1, y2 - y1)
    center_x_final = (x1 + x2) // 2
    center_y_final = (y1 + y2) // 2
    
    x1 = max(0, center_x_final - actual_size // 2)
    y1 = max(0, center_y_final - actual_size // 2)
    x2 = min(img_rgb.shape[1], x1 + actual_size)
    y2 = min(img_rgb.shape[0], y1 + actual_size)
    
    # Обрезаем изображение
    cropped = img_rgb[y1:y2, x1:x2]
    
    # Если исходное изображение имело альфа-канал, сохраняем его
    if img.shape[2] == 4:
        # Обрезаем альфа-канал тоже
        alpha_cropped = alpha[y1:y2, x1:x2]
        # Создаем RGBA изображение
        cropped_rgba = np.zeros((cropped.shape[0], cropped.shape[1], 4), dtype=np.uint8)
        cropped_rgba[:, :, :3] = cropped
        cropped_rgba[:, :, 3] = alpha_cropped
        result_img = Image.fromarray(cropped_rgba, 'RGBA')
    else:
        result_img = Image.fromarray(cropped, 'RGB')
    
    # Сохраняем обрезанное изображение
    result_img.save(output_path)
    print(f"Логотип успешно обрезан (найден круг) и сохранен как {output_path}")
    print(f"Размеры: {cropped.shape[1]}x{cropped.shape[0]}")
else:
    # Если не нашли круг через HoughCircles, используем контуры
    _, thresh = cv2.threshold(gray, 10, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    if contours:
        # Находим контур с максимальной площадью
        largest_contour = max(contours, key=cv2.contourArea)
        
        # Получаем ограничивающий прямоугольник
        x, y, w, h = cv2.boundingRect(largest_contour)
        
        # Делаем квадрат, чтобы круг был в центре
        size = max(w, h)
        # Добавляем небольшой отступ
        padding = int(size * 0.1)
        size += padding * 2
        
        # Центрируем
        center_x = x + w // 2
        center_y = y + h // 2
        
        # Ограничиваем размер размером изображения
        max_size = min(img_rgb.shape[0], img_rgb.shape[1])
        size = min(size, max_size)
        
        x1 = max(0, center_x - size // 2)
        y1 = max(0, center_y - size // 2)
        x2 = min(img_rgb.shape[1], x1 + size)
        y2 = min(img_rgb.shape[0], y1 + size)
        
        # Корректируем, если вышли за границы
        if x2 - x1 < size:
            x1 = max(0, x2 - size)
        if y2 - y1 < size:
            y1 = max(0, y2 - size)
        
        # Делаем квадрат
        actual_size = min(x2 - x1, y2 - y1)
        center_x_final = (x1 + x2) // 2
        center_y_final = (y1 + y2) // 2
        
        x1 = max(0, center_x_final - actual_size // 2)
        y1 = max(0, center_y_final - actual_size // 2)
        x2 = min(img_rgb.shape[1], x1 + actual_size)
        y2 = min(img_rgb.shape[0], y1 + actual_size)
        
        # Обрезаем изображение
        cropped = img_rgb[y1:y2, x1:x2]
        
        # Если исходное изображение имело альфа-канал, сохраняем его
        if img.shape[2] == 4:
            # Обрезаем альфа-канал тоже
            alpha_cropped = alpha[y1:y2, x1:x2]
            # Создаем RGBA изображение
            cropped_rgba = np.zeros((cropped.shape[0], cropped.shape[1], 4), dtype=np.uint8)
            cropped_rgba[:, :, :3] = cropped
            cropped_rgba[:, :, 3] = alpha_cropped
            result_img = Image.fromarray(cropped_rgba, 'RGBA')
        else:
            result_img = Image.fromarray(cropped, 'RGB')
        
        # Сохраняем обрезанное изображение
        result_img.save(output_path)
        print(f"Логотип успешно обрезан (через контуры) и сохранен как {output_path}")
        print(f"Размеры: {cropped.shape[1]}x{cropped.shape[0]}")
    else:
        print("Не удалось найти контуры на изображении")
        # Если не нашли контуры, обрезаем центральную часть вручную
        h, w = img_rgb.shape[:2]
        size = min(w, h)
        x1 = (w - size) // 2
        y1 = (h - size) // 2
        x2 = x1 + size
        y2 = y1 + size
        
        cropped = img_rgb[y1:y2, x1:x2]
        
        if img.shape[2] == 4:
            alpha_cropped = alpha[y1:y2, x1:x2]
            cropped_rgba = np.zeros((cropped.shape[0], cropped.shape[1], 4), dtype=np.uint8)
            cropped_rgba[:, :, :3] = cropped
            cropped_rgba[:, :, 3] = alpha_cropped
            result_img = Image.fromarray(cropped_rgba, 'RGBA')
        else:
            result_img = Image.fromarray(cropped, 'RGB')
        
        result_img.save(output_path)
        print(f"Логотип обрезан по центру и сохранен как {output_path}")

