# Rencana Implementasi: Pemindahan Sungai ke Bawah Peta & Penyesuaian Dimensi Kebun Sawit Anis

## 1. Pemindahan Posisi Sungai Horizontal ke Bagian Bawah (Bottom)
- Memindahkan kontainer sungai horizontal dari posisi tengah (`top: 50%`) ke area dekat dasar bawah peta (**`top: 83%` - `89%`**).
- Memindahkan **Dermaga Nelayan Pak Samad**, sprite Pak Samad, perahu kayu, dan **Jembatan Kayu** ke koordinat Y baru yang selaras dengan posisi sungai di bawah (~`y: 83%`).
- Memperbarui koordinat deteksi interaksi air sungai (untuk ember/ciduk air), waypoint jalan Kak Maya ke sungai, sampah sungai babak 1, serta panah navigasi objektif agar mengarah tepat ke dermaga sungai di area bawah.

## 2. Penyesuaian Dimensi Lahan Kebun Sawit Anis (75%)
- Menyesuaikan dimensi lahan kebun sawit Anis di sisi kanan peta sehingga tinggi vertikalnya menjadi **75%** dari sebelumnya (misalnya dibatasi dari `top: 10%` hingga `top: 75%`, memberikan jarak bebas bersih dari sungai di bagian bawah).
- Menata ulang grid pohon kelapa sawit, gubuk peristirahatan, gerobak tandan buah segar, dan drainase gambut agar proporsional dan tidak bersinggungan dengan sungai.

## 3. Penataan Area Alun-alun & Jalan Desa
- Memperluas area daratan/alun-alun desa di bagian tengah karena sungai bergeser ke bawah, memberikan ruang gerak bebas yang lebih luas dan nyaman bagi karakter pemain.
- Menghubungkan jalan setapak dari Balai Desa dan rumah-rumah desa langsung melintasi jembatan kayu di bawah.
