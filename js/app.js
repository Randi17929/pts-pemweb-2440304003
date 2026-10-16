/**
 * PesisirNiaga — Dashboard Katalog & Monitoring Produk Hasil Olahan Laut Pesisir Tarakan
 * Pembuat : Muhammad Randi Febrian (2440304003)
 * Varian  : 003 (X=0: Products, Y=0: Search+Sort, Z=3: Min 1 Kategori, C=3: Toggle Grid/List)
 * Tahap 4 & 5 : Fetch REST API DummyJSON, Mapping Data Olahan Laut, Render DOM, & Analitik Data
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
   ========================================================================== */
const TARAKAN_SEAFOOD_CATALOG = [
  {
    title: 'Ikan Tipis Goreng (Pepija)',
    category: 'Camilan & Seafood Kering',
    brand: 'Sentra Oleh-Oleh Tanjung Batu',
    price: 30000,
    unitInfo: 'Kemasan kecil Rp25.000–Rp35.000 | Mentah/Kiloan Rp170.000–Rp200.000/kg',
    description: 'Camilan ikan tipis (pepija) goreng renyah khas pesisir Tarakan dengan daya tahan tinggi, sangat cocok dibawa sebagai oleh-oleh perjalanan jauh.',
    thumbnail: 'https://cdn-jjmn.jawapos.com/images/10/radartarakan/2018/09/resep-keripik-ikan-pepija.JPG'
  },
  {
    title: 'Amplang Bandeng Khas Tarakan',
    category: 'Camilan & Seafood Kering',
    brand: 'UMKM Pesisir Mamburungan',
    price: 25000,
    unitInfo: 'Eceran Rp15.000–Rp35.000/bungkus | Paket dus isi 12 Rp162.000',
    description: 'Kerupuk kuku macan (amplang) berbahan daging ikan bandeng segar tambak Tarakan dengan tekstur renyah dan rasa gurih alami.',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiQF-oalHh0qoW33LEGwXNwWsW4jqm0xL-ib3BFWuIa5q1b5C7rqlMNeA&s=10'
  },
  {
    title: 'Abon Ikan Bandeng & Abon Kepiting',
    category: 'Camilan & Seafood Kering',
    brand: 'Kelompok Olahan Nelayan Tarakan',
    price: 25000,
    unitInfo: 'Kemasan kedap udara mulai dari Rp25.000 per bungkus',
    description: 'Olahan serat daging ikan bandeng dan kepiting bakau pilihan yang dimasak dengan rempah tradisional hingga kering dan tahan lama.',
    thumbnail: 'https://assets.pikiran-rakyat.com/crop/0x0:0x0/720x0/webp/photo/2023/02/22/57469522.jpg'
  },
  {
    title: 'Kerupuk Udang & Rumput Laut',
    category: 'Camilan & Seafood Kering',
    brand: 'Koperasi Pesisir Pantai Amal',
    price: 22500,
    unitInfo: 'Kemasan Rp15.000–Rp30.000 per bungkus (sesuai ukuran berat)',
    description: 'Paduan udang pesisir dan rumput laut budidaya Pantai Amal yang diolah menjadi kerupuk renyah bebas bahan pengawet.',
    thumbnail: 'https://images.alodokter.com/dk0z4ums3/image/upload/v1760598875/attached_image/kalori-kerupuk-udang-dan-cara-konsumsi-yang-sehat.jpg'
  },
  {
    title: 'Ebi Kering Pesisir Tarakan',
    category: 'Camilan & Seafood Kering',
    brand: 'Sentra Pengeringan Juata Laut',
    price: 57500,
    unitInfo: 'Kemasan 250 gram Rp40.000–Rp75.000 (tergantung ukuran udang)',
    description: 'Udang ebi kering kualitas super hasil tangkapan nelayan lokal Tarakan, dijemur higienis untuk bumbu masakan maupun camilan.',
    thumbnail: 'https://asset.kompas.com/crops/ozz6AvVDkL5Zka1dl2KzNnMj9C8=/74x0:919x563/1200x800/data/photo/2022/01/14/61e0d95e95a7a.jpg'
  },
  {
    title: 'Kepiting Soka Goreng Tepung',
    category: 'Kuliner Basah & Frozen',
    brand: 'Sentra Kuliner Kaltara Fried Crab',
    price: 90000,
    unitInfo: 'Siap saji isi 8 ekor Rp90.000/porsi | Kemasan Frozen Rp120.000–Rp180.000/kg',
    description: 'Kepiting cangkang lunak (soka) khas tambak Tarakan yang dapat dikonsumsi utuh bersama cangkangnya, tersedia siap santap maupun frozen.',
    thumbnail: 'https://foto.kontan.co.id/lpGLjKaZ5R7NEi5RNVE_JRo99WU=/smart/filters:format(webp)/2022/03/17/1795779015.jpg'
  },
  {
    title: 'Kapah Rebus Pantai Amal',
    category: 'Kuliner Basah & Frozen',
    brand: 'Warung Pesisir Pantai Amal',
    price: 55000,
    unitInfo: 'Hidangan segar Rp50.000–Rp60.000 per porsi / keranjang pesanan',
    description: 'Kerang kapah segar hasil tangkapan perairan Pantai Amal yang direbus dengan serai dan rempah aromatik, disajikan dengan sambal khas.',
    thumbnail: 'https://img-global.cpcdn.com/recipes/5507047363c4493e/1200x630cq80/photo.jpg'
  },
  {
    title: 'Bandeng Tanpa Duri (Batari) Frozen',
    category: 'Kuliner Basah & Frozen',
    brand: 'Unit Pengolahan Ikan Tarakan',
    price: 42500,
    unitInfo: 'Kemasan vakum frozen Rp35.000–Rp50.000 per ekor (sesuai gramasi)',
    description: 'Ikan bandeng tambak organik Tarakan yang telah dicabut seluruh durinya secara higienis dan dibekukan dalam kemasan vakum siap masak.',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR00k-0Z0yACpDarMOmD_OkHIOKf03U6zDE_Z64BAW-MJmQliaabyMoYrg&s=10'
  },
  {
    title: 'Kepiting Saus Khas Tarakan',
    category: 'Kuliner Basah & Frozen',
    brand: 'Kuliner Laut Bakau Tarakan',
    price: 225000,
    unitInfo: 'Kepiting bakau jantan/bertelur Rp150.000–Rp300.000+ per porsi/kg',
    description: 'Hidangan ikonik kepiting bakau berdaging tebal khas Kalimantan Utara yang dimasak dengan saus asam manis pedas kaya rempah.',
    thumbnail: 'https://awsimages.detik.net.id/customthumb/2010/12/09/1030/detik_kepiting-kenari.jpg?w=600&q=90'
  },
  {
    title: 'Dodol Rumput Laut Pantai Amal',
    category: 'Diversifikasi & Lainnya',
    brand: 'Kelompok Wanita Nelayan Mamburungan',
    price: 15000,
    unitInfo: 'Kemasan kotak 250 gram mulai dari Rp15.000',
    description: 'Manisan dodol kenyal tinggi serat yang diolah dari rumput laut segar Eucheuma cottonii hasil budidaya masyarakat pesisir Pantai Amal.',
    thumbnail: 'https://www.tokomesin.com/wp-content/uploads/2015/06/13281722_963e223a-6650-4e3c-a44a-347dd741d552-dodol-rumput-laut-tokomesin.jpg'
  },
  {
    title: 'Sabun Rumput Laut (Kosmetik UMKM)',
    category: 'Diversifikasi & Lainnya',
    brand: 'Inovasi Biota Pesisir Tarakan',
    price: 22500,
    unitInfo: 'Kemasan batang alami Rp15.000–Rp30.000 per batang',
    description: 'Produk perawatan kulit alami berbahan ekstrak rumput laut Tarakan yang kaya antioksidan dan kolagen alami untuk menjaga kelembapan kulit.',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7fYZWw4e2FWMapky2ITbBiZDi1egDz2RAyHgrouerq9Mx2QE-Q5Rzv3s8&s=10'
  },
  {
    title: 'Petis Udang Khas Tarakan',
    category: 'Diversifikasi & Lainnya',
    brand: 'UMKM Sari Laut Tanjung Batu',
    price: 30000,
    unitInfo: 'Kemasan botol/cup kecil Rp20.000–Rp40.000',
    description: 'Bumbu petis kental gurih hasil olahan kaldu udang segar pesisir Tarakan, cocok untuk cocolan gorengan, tahu tek, dan rujak pesisir.',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNmOXB9wXYzrt7K-gOOdqDavULjAUKjC18SpJvj-Qzwg&s=10'
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
  statTotalProducts: document.getElementById('stat-total-products'),
  statAvgPrice: document.getElementById('stat-avg-price'),
  statMaxProduct: document.getElementById('stat-max-product'),
  statMaxPrice: document.getElementById('stat-max-price'),
  statTotalCategories: document.getElementById('stat-total-categories'),

  searchInput: document.getElementById('search-input'),
  sortSelect: document.getElementById('sort-select'),
  btnGridView: document.getElementById('btn-grid-view'),
  btnListView: document.getElementById('btn-list-view'),

  statusMessage: document.getElementById('status-message'),
  productContainer: document.getElementById('product-container'),

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

function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

/* ==========================================================================
   5. TAHAP 4: IMPLEMENT FETCH DATA & DATA MAPPING
   ========================================================================== */
async function fetchProducts() {
  appState.isLoading = true;
  appState.errorMessage = null;
  renderLoadingState();

  try {
    const response = await fetch(API_CONFIG.PRODUCTS_ENDPOINT);
    
    if (!response.ok) {
      throw new Error(`Gagal memuat data dari server (Status HTTP: ${response.status})`);
    }

    const data = await response.json();
    const rawApiProducts = data.products || [];

    // Mapping objek REST API DummyJSON dengan 12 Produk Olahan Laut Tarakan
    appState.allProducts = rawApiProducts.map((item, index) => {
      const localSeafood = TARAKAN_SEAFOOD_CATALOG[index] || TARAKAN_SEAFOOD_CATALOG[0];
      return {
        id: item.id,
        title: localSeafood.title,
        category: localSeafood.category,
        brand: localSeafood.brand,
        price: localSeafood.price,
        unitInfo: localSeafood.unitInfo,
        description: localSeafood.description,
        thumbnail: localSeafood.thumbnail,
        rating: item.rating ?? 4.8,
        stock: item.stock ?? 25,
        discountPercentage: item.discountPercentage ?? 5
      };
    });

    appState.filteredProducts = [...appState.allProducts];
    appState.isLoading = false;
    clearLoadingState();

    // Jalankan render DOM & analitik
    renderAnalytics(appState.allProducts);
    renderProducts(appState.filteredProducts);

  } catch (error) {
    console.error('Error fetching products:', error);
    appState.isLoading = false;
    appState.errorMessage = error.message || 'Terjadi kesalahan jaringan saat mengambil data.';
    renderErrorState(appState.errorMessage);
  }
}

/* ==========================================================================
   6. TAHAP 5: RENDER ANALITIK & KARTU PRODUK KE DOM
   ========================================================================== */
function renderAnalytics(products) {
  if (!products || products.length === 0) return;

  // 1. Total Produk
  domElements.statTotalProducts.textContent = `${products.length} Item`;

  // 2. Rata-Rata Harga menggunakan method .reduce() (Materi Pertemuan 4)
  const totalPrice = products.reduce((sum, p) => sum + p.price, 0);
  const avgPrice = totalPrice / products.length;
  domElements.statAvgPrice.textContent = formatRupiah(avgPrice);

  // 3. Produk Harga Tertinggi (Materi Pertemuan 4)
  const maxProduct = products.reduce((prev, curr) => (curr.price > prev.price) ? curr : prev, products[0]);
  domElements.statMaxProduct.textContent = maxProduct.title;
  domElements.statMaxPrice.textContent = `${formatRupiah(maxProduct.price)}`;

  // 4. Jumlah Kategori Unik menggunakan .map() dan Set
  const uniqueCategories = new Set(products.map(p => p.category));
  domElements.statTotalCategories.textContent = `${uniqueCategories.size} Kategori`;
}

function renderProducts(products) {
  const container = domElements.productContainer;
  container.innerHTML = '';

  if (products.length === 0) {
    container.innerHTML = `
      <div class="status-box" style="grid-column: 1 / -1; text-align: center;">
        <p>Tidak ada produk olahan laut yang cocok dengan kata kunci pencarian Anda.</p>
      </div>
    `;
    return;
  }

  // Render aman menggunakan teknik DOM creation (Materi Pertemuan 5)
  products.forEach(product => {
    const article = document.createElement('article');
    article.className = 'product-card';
    article.setAttribute('tabindex', '0');
    article.setAttribute('data-id', product.id);

    // Wrapper Gambar
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'product-img-wrapper';

    const img = document.createElement('img');
    img.src = product.thumbnail;
    img.alt = product.title;
    img.className = 'product-img';
    img.loading = 'lazy';

    const badge = document.createElement('span');
    badge.className = 'product-category-badge';
    badge.textContent = product.category;

    imgWrapper.append(img, badge);

    // Body Kartu
    const body = document.createElement('div');
    body.className = 'product-body';

    const title = document.createElement('h3');
    title.className = 'product-title';
    title.textContent = product.title;

    const brand = document.createElement('p');
    brand.className = 'product-brand';
    brand.textContent = product.brand;

    const meta = document.createElement('div');
    meta.className = 'product-meta';

    const price = document.createElement('span');
    price.className = 'product-price';
    price.textContent = formatRupiah(product.price);

    const rating = document.createElement('span');
    rating.className = 'product-rating';
    rating.innerHTML = `&#9733; ${product.rating} | Stok: ${product.stock}`;

    meta.append(price, rating);

    const btnDetail = document.createElement('button');
    btnDetail.type = 'button';
    btnDetail.className = 'btn-detail';
    btnDetail.setAttribute('data-id', product.id);
    btnDetail.textContent = 'Lihat Detail Produk';

    body.append(title, brand, meta, btnDetail);
    article.append(imgWrapper, body);

    // Event Listener Klik Kartu untuk Membuka Modal Detail
    article.addEventListener('click', (e) => {
      // Cegah trigger ganda jika tombol detail diklik langsung
      openProductModal(product);
    });

    container.append(article);
  });
}

/* ==========================================================================
   7. STATE LOADING & ERROR HANDLERS
   ========================================================================== */
function renderLoadingState() {
  domElements.statusMessage.hidden = false;
  domElements.statusMessage.className = 'status-box';
  domElements.statusMessage.textContent = 'Memuat katalog produk olahan laut dari REST API...';
}

function clearLoadingState() {
  domElements.statusMessage.hidden = true;
  domElements.statusMessage.textContent = '';
}

function renderErrorState(message) {
  domElements.statusMessage.hidden = false;
  domElements.statusMessage.className = 'status-box error-state';
  domElements.statusMessage.innerHTML = `
    <p><strong>Gagal Memuat Data:</strong> ${message}</p>
    <button type="button" id="btn-retry" class="btn-primary" style="margin-top: 0.75rem;">Coba Lagi (Retry)</button>
  `;
  
  const btnRetry = document.getElementById('btn-retry');
  if (btnRetry) {
    btnRetry.addEventListener('click', fetchProducts);
  }
}

/* ==========================================================================
   8. MODAL DETAIL PRODUK (<dialog>)
   ========================================================================== */
function openProductModal(product) {
  domElements.modalCategory.textContent = product.category;
  domElements.modalImage.src = product.thumbnail;
  domElements.modalImage.alt = product.title;
  domElements.modalTitle.textContent = product.title;
  domElements.modalBrand.textContent = product.brand;
  domElements.modalPrice.textContent = formatRupiah(product.price);
  domElements.modalDescription.textContent = product.description;
  domElements.modalRating.textContent = `${product.rating} / 5.0`;
  domElements.modalStock.textContent = `${product.stock} Unit / Kemasan`;
  domElements.modalDiscount.textContent = product.unitInfo;
  domElements.modalStatus.textContent = 'Tersedia di PesisirNiaga';

  if (typeof domElements.productModal.showModal === 'function') {
    domElements.productModal.showModal();
  } else {
    domElements.productModal.setAttribute('open', true);
  }
}

if (domElements.btnCloseModal) {
  domElements.btnCloseModal.addEventListener('click', () => {
    domElements.productModal.close();
  });
}

domElements.productModal.addEventListener('click', (event) => {
  const rect = domElements.productModal.getBoundingClientRect();
  const isInDialog = (
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom
  );
  if (!isInDialog) {
    domElements.productModal.close();
  }
});

/* ==========================================================================
   INICIALISASI UTAMA SAAT HALAMAN DIMUAT
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  console.info('PesisirNiaga [Tahap 4 & 5]: Menjalankan fetch data API...');
  fetchProducts();
});


/* ==========================================================================
   9. TAHAP 6: FITUR UTAMA (Y=0: SEARCH + SORT) & CHALLENGE (C=3: TOGGLE VIEW)
   ========================================================================== */

// --- Fungsi Terpusat: Filter & Sort ---
function applyFilterAndSort() {
  const query = appState.searchQuery.toLowerCase();
  
  // 1. Filter Pencarian (Y = 0)
  let result = appState.allProducts.filter(product => {
    return product.title.toLowerCase().includes(query) || 
           product.category.toLowerCase().includes(query) ||
           product.brand.toLowerCase().includes(query);
  });

  // 2. Pengurutan (Y = 0)
  if (appState.sortBy === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (appState.sortBy === 'price-desc') {
    result.sort((a, b) => b.price - a.price);
  } else if (appState.sortBy === 'name-asc') {
    result.sort((a, b) => a.title.localeCompare(b.title));
  } else if (appState.sortBy === 'rating-desc') {
    result.sort((a, b) => b.rating - a.rating);
  } else {
    // default: berdasarkan ID asli dari API
    result.sort((a, b) => a.id - b.id);
  }

  appState.filteredProducts = result;
  renderProducts(appState.filteredProducts);
}

// --- Event Listener: Input Search Real-Time ---
if (domElements.searchInput) {
  domElements.searchInput.addEventListener('input', (e) => {
    appState.searchQuery = e.target.value.trim();
    applyFilterAndSort();
  });
}

// --- Event Listener: Select Sort ---
if (domElements.sortSelect) {
  domElements.sortSelect.addEventListener('change', (e) => {
    appState.sortBy = e.target.value;
    applyFilterAndSort();
  });
}

// --- Fungsi & Event Listener: Toggle Grid/List (Challenge C = 3) ---
function setViewMode(mode) {
  // Update state & localStorage
  appState.viewMode = mode;
  localStorage.setItem(API_CONFIG.STORAGE_KEY_VIEW, mode);

  // Update DOM Classes
  if (mode === 'list') {
    domElements.productContainer.classList.remove('grid-view');
    domElements.productContainer.classList.add('list-view');
    domElements.btnListView.classList.add('active');
    domElements.btnListView.setAttribute('aria-pressed', 'true');
    domElements.btnGridView.classList.remove('active');
    domElements.btnGridView.setAttribute('aria-pressed', 'false');
  } else {
    domElements.productContainer.classList.remove('list-view');
    domElements.productContainer.classList.add('grid-view');
    domElements.btnGridView.classList.add('active');
    domElements.btnGridView.setAttribute('aria-pressed', 'true');
    domElements.btnListView.classList.remove('active');
    domElements.btnListView.setAttribute('aria-pressed', 'false');
  }
}

if (domElements.btnGridView && domElements.btnListView) {
  domElements.btnGridView.addEventListener('click', () => setViewMode('grid'));
  domElements.btnListView.addEventListener('click', () => setViewMode('list'));
  
  // Terapkan view mode saat halaman dimuat (mengambil dari localStorage)
  setViewMode(appState.viewMode);
}

/* ==========================================================================
   10. TAHAP 7: IMPLEMENT FORM VALIDATION (Digit Z = 3)
   ========================================================================== */

function clearFormErrors() {
  // Bersihkan teks error
  domElements.nameError.textContent = '';
  domElements.contactError.textContent = '';
  domElements.categoryError.textContent = '';
  
  // Hapus class input-error
  domElements.mitraNameInput.classList.remove('input-error');
  domElements.mitraContactInput.classList.remove('input-error');
  
  // Sembunyikan pesan sukses
  domElements.formSuccess.hidden = true;
  domElements.formSuccess.textContent = '';
}

function validateSupplyForm(event) {
  // Cegah halaman refresh (perilaku bawaan submit form)
  event.preventDefault();
  clearFormErrors();
  
  let isValid = true;
  let firstErrorElement = null;

  // 1. Validasi Input Nama (Tidak boleh kosong, min 3 karakter)
  const nameValue = domElements.mitraNameInput.value.trim();
  if (!nameValue) {
    domElements.nameError.textContent = 'Nama usaha atau pemilik wajib diisi.';
    domElements.mitraNameInput.classList.add('input-error');
    isValid = false;
    if (!firstErrorElement) firstErrorElement = domElements.mitraNameInput;
  } else if (nameValue.length < 3) {
    domElements.nameError.textContent = 'Nama usaha minimal harus 3 karakter.';
    domElements.mitraNameInput.classList.add('input-error');
    isValid = false;
    if (!firstErrorElement) firstErrorElement = domElements.mitraNameInput;
  }

  // 2. Validasi Kontak/Email (Tidak boleh kosong)
  const contactValue = domElements.mitraContactInput.value.trim();
  if (!contactValue) {
    domElements.contactError.textContent = 'Nomor WhatsApp atau Email wajib diisi.';
    domElements.mitraContactInput.classList.add('input-error');
    isValid = false;
    if (!firstErrorElement) firstErrorElement = domElements.mitraContactInput;
  }

  // 3. Validasi Kategori - Syarat Z=3 (Minimal 1 Kategori Dipilih)
  const checkedCategories = domElements.supplyForm.querySelectorAll('input[name="categories"]:checked');
  if (checkedCategories.length === 0) {
    domElements.categoryError.textContent = 'Anda wajib memilih minimal satu kategori produk olahan laut.';
    isValid = false;
    // Jika error pertama ada di checkbox, fokuskan ke checkbox pertama
    if (!firstErrorElement) {
      firstErrorElement = domElements.supplyForm.querySelector('input[name="categories"]');
    }
  }

  // Evaluasi Akhir Validasi
  if (!isValid) {
    // Fokuskan keyboard/layar ke elemen pertama yang error (Aksesibilitas)
    if (firstErrorElement) {
      firstErrorElement.focus();
    }
    return; // Hentikan proses jika masih ada error
  }

  // JIKA VALIDASI BERHASIL
  // Kumpulkan data yang dipilih (opsional, untuk simulasi pengiriman data)
  const selectedCategoryNames = Array.from(checkedCategories).map(cb => cb.value).join(', ');
  
  // Tampilkan pesan sukses
  domElements.formSuccess.textContent = `Pengajuan pendaftaran etalase untuk "${nameValue}" berhasil dikirim! Kategori: ${selectedCategoryNames}. Tim kami akan segera menghubungi ${contactValue}.`;
  domElements.formSuccess.hidden = false;
  
  // Kosongkan form setelah sukses (kecuali pesan suksesnya)
  domElements.supplyForm.reset();
  
  // Arahkan fokus kembali ke pesan sukses agar dibaca oleh screen reader
  domElements.formSuccess.setAttribute('tabindex', '-1');
  domElements.formSuccess.focus();
}

// Pasang Event Listener ke Form
if (domElements.supplyForm) {
  // Validasi saat ditekan Submit
  domElements.supplyForm.addEventListener('submit', validateSupplyForm);
  
  // Event Reset untuk membersihkan form + error secara manual
  domElements.supplyForm.addEventListener('reset', () => {
    // Timeout sedikit agar reset form selesai sebelum class dihapus
    setTimeout(clearFormErrors, 10);
  });
}

// Opsional: Validasi real-time saat pengguna mengetik untuk menghapus error
if (domElements.mitraNameInput) {
  domElements.mitraNameInput.addEventListener('input', (e) => {
    if (e.target.value.trim().length >= 3) {
      domElements.nameError.textContent = '';
      domElements.mitraNameInput.classList.remove('input-error');
    }
  });
}