/**
 * PesisirNiaga — Dashboard Katalog & Monitoring Produk Hasil Olahan Laut Pesisir Tarakan
 * Pembuat : Muhammad Randi Febrian (2440304003)
 * Varian  : 003 (X=0: Products, Y=0: Search+Sort, Z=3: Min 1 Kategori, C=3: Toggle Grid/List)
 * Tahap 3 : Konfigurasi REST API, Data Mapping Katalog Pesisir, State, & Seleksi DOM
 */

'use strict';

/* ==========================================================================
   1. KONFIGURASI REST API & WEB STORAGE (Digit X = 0 & Challenge C = 3)
   ========================================================================== */
const API_CONFIG = {
  BASE_URL: 'https://dummyjson.com',
  PRODUCTS_ENDPOINT: 'https://dummyjson.com/products?limit=12',
  STORAGE_KEY_VIEW: 'pesisirniaga_view_mode',
  STORAGE_KEY_DRAFT: 'pesisirniaga_umkm_draft'
};

/* ==========================================================================
   2. DATA KATALOG 12 PRODUK OLAHAN LAUT PESISIR TARAKAN
   Dipetakan di atas respons REST API DummyJSON Products agar tampilan sesuai
   konteks lokal UMKM Pesisir Tarakan tanpa mengubah endpoint wajib X = 0.
   ========================================================================== */
const TARAKAN_SEAFOOD_CATALOG = [
  {
    title: 'Ikan Tipis Goreng (Pepija)',
    category: 'Camilan & Seafood Kering',
    brand: 'Sentra Oleh-Oleh Tanjung Batu',
    price: 30000,
    unitInfo: 'Kemasan kecil Rp25.000–Rp35.000 | Mentah/Kiloan Rp170.000–Rp200.000/kg',
    description: 'Camilan ikan tipis (pepija) goreng renyah khas pesisir Tarakan dengan daya tahan tinggi, sangat cocok dibawa sebagai oleh-oleh perjalanan jauh.',
    thumbnail: 'https://images.unsplash.com/photo-1625943553852-781c6dd46faa?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Amplang Bandeng Khas Tarakan',
    category: 'Camilan & Seafood Kering',
    brand: 'UMKM Pesisir Mamburungan',
    price: 25000,
    unitInfo: 'Eceran Rp15.000–Rp35.000/bungkus | Paket dus isi 12 Rp162.000',
    description: 'Kerupuk kuku macan (amplang) berbahan daging ikan bandeng segar tambak Tarakan dengan tekstur renyah dan rasa gurih alami.',
    thumbnail: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Abon Ikan Bandeng & Abon Kepiting',
    category: 'Camilan & Seafood Kering',
    brand: 'Kelompok Olahan Nelayan Tarakan',
    price: 25000,
    unitInfo: 'Kemasan kedap udara mulai dari Rp25.000 per bungkus',
    description: 'Olahan serat daging ikan bandeng dan kepiting bakau pilihan yang dimasak dengan rempah tradisional hingga kering dan tahan lama.',
    thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Kerupuk Udang & Rumput Laut',
    category: 'Camilan & Seafood Kering',
    brand: 'Koperasi Pesisir Pantai Amal',
    price: 22500,
    unitInfo: 'Kemasan Rp15.000–Rp30.000 per bungkus (sesuai ukuran berat)',
    description: 'Paduan udang pesisir dan rumput laut budidaya Pantai Amal yang diolah menjadi kerupuk renyah bebas bahan pengawet.',
    thumbnail: 'https://images.unsplash.com/photo-1604908554025-aaa87c152c7b?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Ebi Kering Pesisir Tarakan',
    category: 'Camilan & Seafood Kering',
    brand: 'Sentra Pengeringan Juata Laut',
    price: 57500,
    unitInfo: 'Kemasan 250 gram Rp40.000–Rp75.000 (tergantung ukuran udang)',
    description: 'Udang ebi kering kualitas super hasil tangkapan nelayan lokal Tarakan, dijemur higienis untuk bumbu masakan maupun camilan.',
    thumbnail: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Kepiting Soka Goreng Tepung',
    category: 'Kuliner Basah & Frozen',
    brand: 'Sentra Kuliner Kaltara Fried Crab',
    price: 90000,
    unitInfo: 'Siap saji isi 8 ekor Rp90.000/porsi | Kemasan Frozen Rp120.000–Rp180.000/kg',
    description: 'Kepiting cangkang lunak (soka) khas tambak Tarakan yang dapat dikonsumsi utuh bersama cangkangnya, tersedia siap santap maupun frozen.',
    thumbnail: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Kapah Rebus Pantai Amal',
    category: 'Kuliner Basah & Frozen',
    brand: 'Warung Pesisir Pantai Amal',
    price: 55000,
    unitInfo: 'Hidangan segar Rp50.000–Rp60.000 per porsi / keranjang pesanan',
    description: 'Kerang kapah segar hasil tangkapan perairan Pantai Amal yang direbus dengan serai dan rempah aromatik, disajikan dengan sambal khas.',
    thumbnail: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Bandeng Tanpa Duri (Batari) Frozen',
    category: 'Kuliner Basah & Frozen',
    brand: 'Unit Pengolahan Ikan Tarakan',
    price: 42500,
    unitInfo: 'Kemasan vakum frozen Rp35.000–Rp50.000 per ekor (sesuai gramasi)',
    description: 'Ikan bandeng tambak organik Tarakan yang telah dicabut seluruh durinya secara higienis dan dibekukan dalam kemasan vakum siap masak.',
    thumbnail: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Kepiting Saus Khas Tarakan',
    category: 'Kuliner Basah & Frozen',
    brand: 'Kuliner Laut Bakau Tarakan',
    price: 225000,
    unitInfo: 'Kepiting bakau jantan/bertelur Rp150.000–Rp300.000+ per porsi/kg',
    description: 'Hidangan ikonik kepiting bakau berdaging tebal khas Kalimantan Utara yang dimasak dengan saus asam manis pedas kaya rempah.',
    thumbnail: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Dodol Rumput Laut Pantai Amal',
    category: 'Diversifikasi & Lainnya',
    brand: 'Kelompok Wanita Nelayan Mamburungan',
    price: 15000,
    unitInfo: 'Kemasan kotak 250 gram mulai dari Rp15.000',
    description: 'Manisan dodol kenyal tinggi serat yang diolah dari rumput laut segar Eucheuma cottonii hasil budidaya masyarakat pesisir Pantai Amal.',
    thumbnail: 'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Sabun Rumput Laut (Kosmetik UMKM)',
    category: 'Diversifikasi & Lainnya',
    brand: 'Inovasi Biota Pesisir Tarakan',
    price: 22500,
    unitInfo: 'Kemasan batang alami Rp15.000–Rp30.000 per batang',
    description: 'Produk perawatan kulit alami berbahan ekstrak rumput laut Tarakan yang kaya antioksidan dan kolagen alami untuk menjaga kelembapan kulit.',
    thumbnail: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Petis Udang Khas Tarakan',
    category: 'Diversifikasi & Lainnya',
    brand: 'UMKM Sari Laut Tanjung Batu',
    price: 30000,
    unitInfo: 'Kemasan botol/cup kecil Rp20.000–Rp40.000',
    description: 'Bumbu petis kental gurih hasil olahan kaldu udang segar pesisir Tarakan, cocok untuk cocolan gorengan, tahu tek, dan rujak pesisir.',
    thumbnail: 'https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?q=80&w=600&auto=format&fit=crop'
  }
];

/* ==========================================================================
   3. STATE APLIKASI TERPUSAT
   ========================================================================== */
const appState = {
  allProducts: [],
  filteredProducts: [],
  searchQuery: '',
  sortBy: 'default',
  viewMode: localStorage.getItem(API_CONFIG.STORAGE_KEY_VIEW) ?? 'grid',
  isLoading: false,
  errorMessage: null
};

/* ==========================================================================
   4. SELEKSI ELEMEN DOM & HELPER FORMAT RUPIAH
   ========================================================================== */
const domElements = {
  // Elemen Statistik Analitik
  statTotalProducts: document.getElementById('stat-total-products'),
  statAvgPrice: document.getElementById('stat-avg-price'),
  statMaxProduct: document.getElementById('stat-max-product'),
  statMaxPrice: document.getElementById('stat-max-price'),
  statTotalCategories: document.getElementById('stat-total-categories'),

  // Elemen Kontrol Interaktif (Y = 0 & C = 3)
  searchInput: document.getElementById('search-input'),
  sortSelect: document.getElementById('sort-select'),
  btnGridView: document.getElementById('btn-grid-view'),
  btnListView: document.getElementById('btn-list-view'),

  // Elemen Katalog & Status State
  statusMessage: document.getElementById('status-message'),
  productContainer: document.getElementById('product-container'),

  // Elemen Modal Detail Produk (<dialog>)
  productModal: document.getElementById('product-modal'),
  btnCloseModal: document.getElementById('btn-close-modal'),
  modalCategory: document.getElementById('modal-category'),
  modalImage: document.getElementById('modal-image'),
  modalTitle: document.getElementById('modal-title'),
  modalBrand: document.getElementById('modal-brand'),
  modalPrice: document.getElementById('modal-price'),
  modalDescription: document.getElementById('modal-description'),
  modalRating: document.getElementById('modal-rating'),
  modalStock: document.getElementById('modal-stock'),
  modalDiscount: document.getElementById('modal-discount'),
  modalStatus: document.getElementById('modal-status'),

  // Elemen Formulir Pendaftaran UMKM (Z = 3)
  supplyForm: document.getElementById('supply-form'),
  mitraNameInput: document.getElementById('mitra-name'),
  mitraContactInput: document.getElementById('mitra-contact'),
  mitraNotesInput: document.getElementById('mitra-notes'),
  nameError: document.getElementById('name-error'),
  contactError: document.getElementById('contact-error'),
  categoryError: document.getElementById('category-error'),
  formSuccess: document.getElementById('form-success'),
  btnResetForm: document.getElementById('btn-reset-form')
};

/**
 * Memformat angka numerik menjadi format mata uang Rupiah (contoh: Rp 30.000)
 * @param {number} amount
 * @returns {string}
 */
function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

document.addEventListener('DOMContentLoaded', () => {
  console.info('PesisirNiaga [Tahap 3]: Konfigurasi API & referensi DOM siap.', {
    endpoint: API_CONFIG.PRODUCTS_ENDPOINT,
    catalogCount: TARAKAN_SEAFOOD_CATALOG.length,
    savedViewMode: appState.viewMode
  });
});