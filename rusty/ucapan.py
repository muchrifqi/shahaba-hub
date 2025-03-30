import math
import time
import os

# Konfigurasi
WIDTH = 120
HEIGHT = 40
TEXT = "Taqabbalallahu minna wa minkum"
ASCII_GRADIENT = " .:-=+*%#@░▒▓█"  # Gradien simbol dari gelap ke terang [[3]][[9]]
ROTATION_SPEED = 0.05  # Kecepatan rotasi (0.01-0.1)
COLOR_ENABLED = True   # Aktifkan warna gradient

def create_donut():
    os.system('cls' if os.name == 'nt' else 'clear')
    print("\033[?25l")  # Sembunyikan kursor

    A = 0
    B = 0
    K1 = 40  # Skala 3D
    K2 = 5   # Jarak pandang

    while True:
        buffer = [' '] * WIDTH * HEIGHT
        zbuffer = [0] * WIDTH * HEIGHT

        sinA = math.sin(A)
        cosA = math.cos(A)
        sinB = math.sin(B)
        cosB = math.cos(B)

        for theta in range(0, 628, 12):
            theta /= 100
            for phi in range(0, 628, 25):
                phi /= 100

                # Koordinat 3D torus
                circlex = (0.7 + 0.3 * math.cos(theta)) * math.cos(phi)
                circley = (0.7 + 0.3 * math.cos(theta)) * math.sin(phi)
                circlez = 0.3 * math.sin(theta)

                # Rotasi 3D
                x = circlex * cosA - circley * sinA
                y = circlex * sinA + circley * cosA
                z = circlez + K2

                # Proyeksi 2D
                ooz = 1 / z
                xp = int(WIDTH / 2 + K1 * ooz * x)
                yp = int(HEIGHT / 2 + K1 * ooz * y * 0.5)

                # Hitung luminance
                L = (
                    math.sin(theta) * math.cos(phi) * sinA +
                    math.sin(theta) * math.sin(phi) * cosA +
                    math.cos(theta)
                )

                # Mapping ke karakter
                if 0 <= xp < WIDTH and 0 <= yp < HEIGHT and ooz > zbuffer[xp + yp * WIDTH]:
                    char_index = int((L + 1) * (len(ASCII_GRADIENT) - 1) / 2)
                    char = ASCII_GRADIENT[char_index]

                    # Tambahkan warna gradient
                    if COLOR_ENABLED:
                        hue = (math.atan2(y, x) + math.pi) / (2 * math.pi)
                        color = f"\033[38;2;{int(255*hue)};{int(255*(1-abs(hue-0.5)))};{int(255*(1-hue))}m"
                        char = f"{color}{char}\033[0m"

                    buffer[xp + yp * WIDTH] = char
                    zbuffer[xp + yp * WIDTH] = ooz

        # Tampilkan teks utama di tengah
        text_x = (WIDTH - len(TEXT)) // 2
        text_y = HEIGHT // 2
        for i, c in enumerate(TEXT):
            buffer[text_y * WIDTH + text_x + i] = f"\033[1;37m{c}\033[0m" if COLOR_ENABLED else c

        # Render frame
        print('\033[H', end='')
        for y in range(HEIGHT):
            print(''.join(buffer[y * WIDTH:(y + 1) * WIDTH]))
        
        # Update sudut rotasi
        A += ROTATION_SPEED
        B += ROTATION_SPEED * 0.7

if __name__ == "__main__":
    try:
        create_donut()
    except KeyboardInterrupt:
        os.system('cls' if os.name == 'nt' else 'clear')
        print("\033[?25h")  # Tampilkan kursor kembali