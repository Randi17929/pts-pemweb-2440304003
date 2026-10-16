# PesisirNiaga — Dashboard Katalog & Monitoring Suplai Produk UMKM Pesisir Tarakan

## 1. Identitas Mahasiswa
- **Nama:** Muhammad Randi Febrian
- **NIM:** 2440304003
- **Program Studi / Semester:** Teknik Komputer / Semester 5
- **Mata Kuliah:** Pemrograman Web (26TJ453127)

## 2. Nama Aplikasi dan Deskripsi Singkat
**PesisirNiaga** adalah aplikasi *Interactive Data Dashboard* berbasis REST API yang dirancang untuk membantu pengurus koperasi dan pelaku UMKM di kawasan pesisir Kota Tarakan (seperti wilayah Tanjung Batu dan Mamburungan) dalam memantau katalog harga suplai barang, menganalisis statistik harga produk secara *real-time*, serta mengajukan preferensi kategori pasokan barang.

## 3. Perhitungan Variasi Soal Berdasarkan NIM
Tiga digit terakhir NIM **2440304003** adalah **003**:
- **Digit X = 0** → Dataset: **Products** | Tema: **Dashboard Produk / UMKM**
- **Digit Y = 0** → Fitur Utama: **Search real-time + sorting**
- **Digit Z = 3** → Form & Validasi: **Minimal satu kategori/preferensi dipilih**
- **Nilai S** = X + Y + Z = 0 + 0 + 3 = **3**
- **Challenge C** = S mod 4 = 3 mod 4 = **3** → **Toggle Grid/List; pilihan pengguna disimpan pada `localStorage`**

## 4. Dataset / REST API yang Digunakan
- **Sumber API:** DummyJSON Products REST API
- **Endpoint Utama:** `https://dummyjson.com/products`
- **Metode HTTP:** `GET`

## 5. Fitur Utama dan Challenge
1. **Analisis Data Otomatis:** Menampilkan rata-rata harga produk, produk dengan harga tertinggi, dan total kategori unik yang dihitung secara dinamis menggunakan metode array JavaScript.
2. **Search Real-Time & Sorting (Y=0):** Pencarian produk langsung saat pengguna mengetik kata kunci, dikombinasikan dengan pengurutan berdasarkan harga maupun nama produk.
3. **Toggle Grid/List dengan Web Storage (C=3):** Mengubah tata letak katalog antara tampilan *Grid* (kartu) dan *List* (baris daftar), serta menyimpan preferensi pengguna di `localStorage`.
4. **Form Preferensi Suplai & Validasi Client-Side (Z=3):** Formulir pengajuan suplai mitra UMKM yang memvalidasi input wajib serta memastikan minimal satu *checkbox* kategori produk dipilih.

## 6. Cara Menjalankan Project
1. Letakkan folder proyek di dalam direktori server lokal Laragon (`C:\laragon\www\pts-pemweb-2440304003`).
2. Jalankan Laragon dan pastikan layanan Apache aktif.
3. Buka browser dan akses melalui URL `http://localhost/pts-pemweb-2440304003/`.

## 7. Screenshot Desktop dan Mobile
*(Akan dilampirkan setelah seluruh fitur selesai diimplementasikan)*

## 8. Jawaban 10 Pertanyaan Penjelasan Kode
*(Akan dilengkapi sesuai implementasi akhir fungsi pada `js/app.js`)*

## 9. AI Usage Log
| Tanggal | AI/Tool | Tujuan | Prompt/Ringkasan | Bagian Digunakan | Verifikasi/Modifikasi |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 15-16 Okt 2026 | Google Gemini | Brainstorming konteks aplikasi, pemetaan varian NIM 003, dan penyusunan struktur awal proyek | Diskusi penyesuaian tema UMKM Pesisir Tarakan dengan dataset DummyJSON Products serta pembuatan kerangka HTML5 semantik | Kerangka awal `index.html`, variabel dasar `css/styles.css`, dan draf `README.md` | Diuji pada localhost, disesuaikan teks identitas/footer dan struktur elemen semantik. |
| 16 Okt 2026 | Google Gemini | Implementasi Fetch API (X=0) & Data Mapping produk lokal | Meminta panduan penggunaan `async/await` ke endpoint DummyJSON dan cara mapping data API dengan array `TARAKAN_SEAFOOD_CATALOG` | Fungsi `fetchProducts()` dan logika `.map()` di `js/app.js` | Menyesuaikan nama variabel dan memastikan *Network Tab* tetap memanggil endpoint wajib. |
| 16 Okt 2026 | Google Gemini | Logika fitur Search, Sort (Y=0), LocalStorage (C=3), & Validasi Form (Z=3) | Meminta referensi sintaks array `.filter()`, `.sort()`, `localStorage.setItem`, dan selektor DOM `:checked` untuk validasi form | Fungsi `applyFilterAndSort()`, `setViewMode()`, dan `validateSupplyForm()` di `js/app.js` | Mengubah *ID* elemen agar terhubung dengan HTML, mengubah teks *error*, dan menguji *edge case*. |
| 16 Okt 2026 | Google Gemini | Troubleshooting kompatibilitas browser (Firefox) | Menanyakan penyebab gambar logo dengan *absolute path* (`C:/laragon/...`) diblokir oleh sistem keamanan Firefox | Perbaikan tag `<img>` pada `index.html` | Mengubah *absolute path* menjadi *relative path* (`assets/pesisir-niaga.png`) dan mengujinya ulang. |