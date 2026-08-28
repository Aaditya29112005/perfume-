/* ==========================================================================
   FRASMETICS PARIS — MAISON BRAND BOOK VOL 1.0 (2026) ENGINE
   Direct Root & Assets Fallback Image Engine for 100% Reliability
   ========================================================================== */

const CURRENCIES = {
  EUR: { symbol: '€', rate: 1, suffix: '€' },
  USD: { symbol: '$', rate: 1.10, suffix: '$' },
  GBP: { symbol: '£', rate: 0.85, suffix: '£' },
  INR: { symbol: '₹', rate: 90, suffix: '₹' }
};

let currentCurrency = localStorage.getItem('frasmetics_currency') || 'EUR';
let soundEnabled = localStorage.getItem('frasmetics_sound') !== 'false';

/* Section 04 — Collection Five Accords & Extended Boutique Collection */
const PRODUCTS = [
  {
    id: 'hdo50',
    number: 'ACCORD #01',
    name: 'HÉRITAGE D\'OUD',
    italic: 'Le rendez-vous parfait.',
    category: 'boise',
    rating: '4.9 ★ (1,840 Reviews)',
    desc: 'Frasmetics crafts niche fragrances at the meeting point of French perfumery tradition and contemporary design.',
    img20: 'hdo50.png',
    img50: 'hdo50.png',
    prices: { 20: 75, 50: 160 },
    oldPrices: { 20: 95, 50: 220 },
    discount: '-27% OFF',
    badge: 'FLAGSHIP ACCORD',
    tete: 'Cambodian Oud',
    coeur: 'Russian Leather',
    fond: 'Indonesian Patchouli'
  },
  {
    id: 'oud_rouge',
    number: 'ACCORD #02',
    name: 'OUD ROUGE',
    italic: 'L\'incendie écarlate.',
    category: 'oriental',
    rating: '4.9 ★ (1,250 Reviews)',
    desc: 'A fiery crimson composition of saffron strands, May Rose, and agarwood resin.',
    img20: 'or20.png',
    img50: 'or50.png',
    prices: { 20: 80, 50: 175 },
    oldPrices: { 20: 105, 50: 240 },
    discount: '-27% OFF',
    badge: 'ACTIVE ACCORD',
    tete: 'Red Saffron',
    coeur: 'Damask Rose',
    fond: 'Smoked Oud'
  },
  {
    id: 'pure_nuit',
    number: 'ACCORD #03',
    name: 'PRIVÉ NUIT',
    italic: 'L\'éclat de la nuit lunaire.',
    category: 'frais',
    rating: '4.8 ★ (1,550 Reviews)',
    desc: 'An ethereal veil of Florentine iris, cashmere wood, and clean white musk.',
    img20: 'pn20.png',
    img50: 'pn50.png',
    prices: { 20: 65, 50: 145 },
    oldPrices: { 20: 85, 50: 195 },
    discount: '-25% OFF',
    badge: 'CLEAN LUXURY',
    tete: 'Florentine Iris',
    coeur: 'Cashmere Wood',
    fond: 'Pure White Musk'
  },
  {
    id: 'on_a_date',
    number: 'ACCORD #04',
    name: 'ON A DATE',
    italic: 'L\'étincelle romantique.',
    category: 'gourmand',
    rating: '5.0 ★ (2,400 Reviews)',
    desc: 'Juicy dark cherry, sparkling bergamot, golden amber, and hypnotic musk.',
    img20: 'oad20.png',
    img50: 'oad50.png',
    prices: { 20: 75, 50: 165 },
    oldPrices: { 20: 98, 50: 225 },
    discount: '-26% OFF',
    badge: 'BESTSELLER',
    tete: 'Italian Bergamot',
    coeur: 'Golden Amber',
    fond: 'Velvet Musk'
  },
  {
    id: 'tobacco_whiskey',
    number: 'ACCORD #05',
    name: 'TOBACCO & WHISKEY',
    italic: 'Le club privé parisien.',
    category: 'boise',
    rating: '4.9 ★ (2,100 Reviews)',
    desc: 'Barrel-aged bourbon liquor infused with cured Havana tobacco and Madagascar vanilla bean.',
    img20: 'taw20.png',
    img50: 'tw50.png',
    prices: { 20: 78, 50: 170 },
    oldPrices: { 20: 100, 50: 230 },
    discount: '-26% OFF',
    badge: 'ICONIC ACCORD',
    tete: 'Blonde Tobacco',
    coeur: 'Aged Whiskey',
    fond: 'Bourbon Vanilla'
  },
  {
    id: 'tobacco_wine_vanilla',
    number: 'ACCORD #06',
    name: 'TOBACCO WINE VANILLA',
    italic: 'L\'envoûtement velouté.',
    category: 'gourmand',
    rating: '4.9 ★ (1,670 Reviews)',
    desc: 'Vintage wine accord married with cured pipe tobacco and toasted tonka.',
    img20: 'twv20.png',
    img50: 'twv50.png',
    prices: { 20: 82, 50: 180 },
    oldPrices: { 20: 110, 50: 245 },
    discount: '-26% OFF',
    badge: 'EXTRAIT DE PARFUM',
    tete: 'Cured Tobacco',
    coeur: 'Vintage Wine',
    fond: 'Madagascar Vanilla'
  },
  {
    id: 'rose_wood_oud',
    number: 'ACCORD #07',
    name: 'ROSE WOOD OUD',
    italic: 'Les pétales et le bois fumé.',
    category: 'oriental',
    rating: '4.8 ★ (1,120 Reviews)',
    desc: 'Grasse May Rose petals layered over smoked cedar and agarwood.',
    img20: 'rwo20.png',
    img50: 'rwo50.png',
    prices: { 20: 72, 50: 155 },
    oldPrices: { 20: 95, 50: 210 },
    discount: '-26% OFF',
    badge: 'LIMITED EDITION',
    tete: 'Grasse Rose',
    coeur: 'Cedarwood',
    fond: 'Agarwood'
  },
  {
    id: 'saffron_amber_oud',
    number: 'ACCORD #08',
    name: 'SAFFRON AMBER OUD',
    italic: 'L\'or liquide d\'Orient.',
    category: 'oriental',
    rating: '4.9 ★ (1,340 Reviews)',
    desc: 'Red saffron strands blended with molten amber resin and agarwood.',
    img20: 'sao20.png',
    img50: 'sao50.png',
    prices: { 20: 85, 50: 185 },
    oldPrices: { 20: 115, 50: 250 },
    discount: '-26% OFF',
    badge: 'ROYAL ACCORD',
    tete: 'Red Saffron',
    coeur: 'Molten Amber',
    fond: 'Royal Oud'
  },
  {
    id: 'leather_honey_musk',
    number: 'ACCORD #09',
    name: 'LEATHER HONEY MUSK',
    italic: 'La caresse du cuir.',
    category: 'boise',
    rating: '4.8 ★ (990 Reviews)',
    desc: 'Supple Tuscan leather infused with wildflower honey and dark musk.',
    img20: 'lhm20.png',
    img50: 'lhm50.png',
    prices: { 20: 76, 50: 165 },
    oldPrices: { 20: 100, 50: 225 },
    discount: '-26% OFF',
    badge: 'EXCLUSIVE',
    tete: 'Wild Honey',
    coeur: 'Tuscan Leather',
    fond: 'Dark Musk'
  },
  {
    id: 'intense_tobacco_floral',
    number: 'ACCORD #10',
    name: 'INTENSE TOBACCO FLORAL',
    italic: 'La fleur nocturne.',
    category: 'gourmand',
    rating: '4.9 ★ (880 Reviews)',
    desc: 'Night-blooming jasmine juxtaposed with Virginia tobacco leaves.',
    img20: 'itf20.png',
    img50: 'itf50.png',
    prices: { 20: 74, 50: 160 },
    oldPrices: { 20: 98, 50: 220 },
    discount: '-27% OFF',
    badge: 'NEW RELEASE',
    tete: 'Virginia Tobacco',
    coeur: 'Night Jasmine',
    fond: 'White Cedar'
  },
  {
    id: 'leather_amber_tobacco',
    number: 'ACCORD #11',
    name: 'LEATHER AMBER TOBACCO',
    italic: 'La chaleur ambrée.',
    category: 'boise',
    rating: '4.9 ★ (1,050 Reviews)',
    desc: 'Bold leather accord anchored with glowing amber crystals.',
    img20: 'lat50.png',
    img50: 'lat50.png',
    prices: { 20: 78, 50: 170 },
    oldPrices: { 20: 102, 50: 230 },
    discount: '-26% OFF',
    badge: 'BOUTIQUE EDITION',
    tete: 'Cured Tobacco',
    coeur: 'Tuscan Leather',
    fond: 'Amber Crystal'
  },
  {
    id: 'cosmic_nuit',
    number: 'ACCORD #12',
    name: 'COSMIC NUIT EXTRAIT',
    italic: 'L\'explosion stellaire.',
    category: 'frais',
    rating: '5.0 ★ (3,100 Reviews)',
    desc: 'Our crown jewel Extrait de Parfum featuring celestial iris and velvet vanilla.',
    img20: 'cn50.png',
    img50: 'cn50.png',
    prices: { 20: 85, 50: 180 },
    oldPrices: { 20: 115, 50: 240 },
    discount: '-25% OFF',
    badge: 'BESTSELLER',
    tete: 'Celestial Iris',
    coeur: 'Golden Amber',
    fond: 'Velvet Vanilla'
  }
];

let cart = JSON.parse(localStorage.getItem('frasmetics_cart')) || [];
let selectedVolumes = {
  hdo50: 50, oud_rouge: 50, pure_nuit: 50, on_a_date: 50,
  tobacco_whiskey: 50, tobacco_wine_vanilla: 50, rose_wood_oud: 50,
  saffron_amber_oud: 50, leather_honey_musk: 50, intense_tobacco_floral: 50,
  leather_amber_tobacco: 50, cosmic_nuit: 50
};
let customEngraving = localStorage.getItem('frasmetics_engraving') || '';

function getImgSrc(filename) {
  return filename;
}

function saveCartToStorage() {
  localStorage.setItem('frasmetics_cart', JSON.stringify(cart));
}

function playSpraySound() {
  if (!soundEnabled) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const bufferSize = ctx.sampleRate * 0.15;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 3000;
    filter.Q.value = 3;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  } catch (e) {}
}

function toggleAudioFx() {
  soundEnabled = !soundEnabled;
  localStorage.setItem('frasmetics_sound', soundEnabled);
  const btn = document.getElementById('soundToggleBtn');
  if (btn) {
    btn.innerHTML = soundEnabled 
      ? '<i class="fa-solid fa-volume-high"></i> SOUND: ON'
      : '<i class="fa-solid fa-volume-xmark"></i> SOUND: OFF';
  }
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-check-circle" style="color: var(--color-rouge-marianne);"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

function formatPrice(eurAmount) {
  const curr = CURRENCIES[currentCurrency];
  const converted = Math.round(eurAmount * curr.rate);
  return `${converted} ${curr.suffix}`;
}

function renderProducts(filter = 'all') {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  let filtered = PRODUCTS;
  if (filter !== 'all') {
    filtered = PRODUCTS.filter(p => p.category === filter);
  }

  grid.innerHTML = filtered.map(p => {
    const selectedVol = selectedVolumes[p.id] || 50;
    const currentImg = selectedVol === 20 ? p.img20 : p.img50;
    const price = p.prices[selectedVol];
    const oldPrice = p.oldPrices[selectedVol];

    return `
      <div class="product-card">
        <div class="product-card-header">
          <span class="product-number">${p.number}</span>
          <span class="rating-badge"><i class="fa-solid fa-star"></i> ${p.rating}</span>
        </div>

        <div class="product-img-box" onclick="goToProductDetail('${p.id}')">
          <img src="${currentImg}" onerror="this.onerror=null; this.src='assets/${currentImg}';" alt="${p.name}">
          <span class="badge-overlay">${p.badge}</span>
        </div>

        <h3 class="product-title" onclick="goToProductDetail('${p.id}')" style="cursor: pointer;">${p.name}</h3>
        <p class="product-accords-italic">"${p.italic}"</p>

        <div class="notes-hairline-grid">
          <div class="note-cell">
            <div class="note-cell-label">Tête</div>
            <div class="note-cell-value">${p.tete}</div>
          </div>
          <div class="note-cell">
            <div class="note-cell-label">Cœur</div>
            <div class="note-cell-value">${p.coeur}</div>
          </div>
          <div class="note-cell">
            <div class="note-cell-label">Fond</div>
            <div class="note-cell-value">${p.fond}</div>
          </div>
        </div>

        <div class="volume-selector">
          <button class="vol-btn ${selectedVol === 20 ? 'active' : ''}" onclick="changeProductVol('${p.id}', 20)">20 ML</button>
          <button class="vol-btn ${selectedVol === 50 ? 'active' : ''}" onclick="changeProductVol('${p.id}', 50)">50 ML</button>
        </div>

        <div class="card-bottom-row">
          <div class="price-block">
            <span class="card-price-current">${formatPrice(price)}</span>
            <span class="card-price-old">${formatPrice(oldPrice)}</span>
            <span class="discount-badge">${p.discount}</span>
          </div>

          <div class="card-action-btns">
            <button class="btn-sarkar-primary" onclick="buyNowDirect('${p.id}')" style="flex: 1; padding: 14px 10px; font-size: 0.72rem; justify-content: center;">
              ACQUIRE — ${p.name.split(' ')[0]}
            </button>
            <button class="btn-add-cart" onclick="addToCart('${p.id}')" title="Add to Bag">
              <i class="fa-solid fa-bag-shopping"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function goToProductDetail(id) {
  window.location.href = `product.html?id=${id}`;
}

function changeProductVol(productId, volume) {
  selectedVolumes[productId] = volume;
  playSpraySound();
  const currentFilter = document.querySelector('.filter-btn.active')?.getAttribute('onclick')?.match(/'([^']+)'/)[1] || 'all';
  renderProducts(currentFilter);
}

function filterProducts(category, btnElement) {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
  renderProducts(category);
}

function changeCurrency(currencyCode) {
  currentCurrency = currencyCode;
  localStorage.setItem('frasmetics_currency', currencyCode);
  renderProducts();
  updateCartUI();
  if (typeof renderSingleProductPage === 'function') renderSingleProductPage();
  if (typeof renderFullCartPage === 'function') renderFullCartPage();
}

function buyNowDirect(productId) {
  playSpraySound();
  addToCart(productId);
  window.location.href = 'cart.html';
}

function addToCart(productId, customVol = null) {
  const p = PRODUCTS.find(prod => prod.id === productId);
  if (!p) return;

  playSpraySound();
  const vol = customVol || selectedVolumes[productId] || 50;
  const img = vol === 20 ? p.img20 : p.img50;
  const price = p.prices[vol];
  const itemKey = `${productId}_${vol}_${customEngraving}`;

  const existingIndex = cart.findIndex(item => item.key === itemKey);
  if (existingIndex > -1) {
    cart[existingIndex].qty += 1;
  } else {
    cart.push({
      key: itemKey,
      id: p.id,
      name: p.name,
      img: img,
      vol: vol,
      price: price,
      qty: 1,
      engraving: customEngraving
    });
  }

  saveCartToStorage();
  updateCartUI();
  showToast(`Flacon ajouté: ${p.name} (${vol}ml)`);
  toggleCartDrawer(true);
}

function addDirectToCart(id, vol, price, name, img) {
  playSpraySound();
  const itemKey = `${id}_${vol}_${customEngraving}`;
  const existingIndex = cart.findIndex(item => item.key === itemKey);
  if (existingIndex > -1) {
    cart[existingIndex].qty += 1;
  } else {
    cart.push({
      key: itemKey,
      id: id,
      name: name,
      img: img,
      vol: vol,
      price: price,
      qty: 1,
      engraving: customEngraving
    });
  }
  saveCartToStorage();
  updateCartUI();
  showToast(`Flacon ajouté: ${name}`);
  toggleCartDrawer(true);
}

function updateCartQty(key, delta) {
  const index = cart.findIndex(item => item.key === key);
  if (index === -1) return;

  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCartToStorage();
  updateCartUI();
  if (typeof renderFullCartPage === 'function') renderFullCartPage();
}

function updateCartUI() {
  const countBadge = document.getElementById('cartCountBadge');
  const drawerCount = document.getElementById('drawerCartCount');
  const cartBody = document.getElementById('cartItemsBody');
  const subtotalText = document.getElementById('cartSubtotalText');
  const checkoutTotalText = document.getElementById('checkoutTotalText');

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalEur = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  if (countBadge) countBadge.textContent = totalQty;
  if (drawerCount) drawerCount.textContent = totalQty;

  if (subtotalText) subtotalText.textContent = formatPrice(totalEur);
  if (checkoutTotalText) checkoutTotalText.textContent = formatPrice(totalEur);

  if (cartBody) {
    if (cart.length === 0) {
      cartBody.innerHTML = `
        <div style="text-align: center; padding: 40px 0; color: #A0AEC0;">
          <i class="fa-solid fa-bag-shopping" style="font-size: 3rem; margin-bottom: 16px; opacity: 0.3;"></i>
          <p>Votre panier est vide.</p>
          <a href="collection.html" class="btn-sarkar-primary" style="margin-top: 20px; font-size: 0.75rem; display: inline-block;">
            ACQUIRE AN ACCORD
          </a>
        </div>
      `;
    } else {
      cartBody.innerHTML = cart.map(item => `
        <div style="display: flex; gap: 14px; background: rgba(255,255,255,0.03); padding: 12px; border: var(--hairline);">
          <img src="${item.img}" onerror="this.onerror=null; this.src='assets/${item.img}';" alt="${item.name}" style="width: 65px; height: 80px; object-fit: contain;">
          <div style="flex: 1;">
            <h4 style="font-size: 0.9rem; margin-bottom: 2px;">${item.name}</h4>
            <p style="font-size: 0.75rem; color: #A0AEC0; margin-bottom: 8px;">Size: ${item.vol} ml ${item.engraving ? `• Engraved: "${item.engraving}"` : ''}</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 800; color: white;">${formatPrice(item.price * item.qty)}</span>
              <div style="display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.1); padding: 2px 8px;">
                <button onclick="updateCartQty('${item.key}', -1)" style="background: none; border: none; color: white; cursor: pointer;">-</button>
                <span style="font-size: 0.85rem;">${item.qty}</span>
                <button onclick="updateCartQty('${item.key}', 1)" style="background: none; border: none; color: white; cursor: pointer;">+</button>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }
  }
}

function toggleCartDrawer(forceOpen = null) {
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');
  if (!overlay || !drawer) return;

  const isOpen = drawer.classList.contains('active');
  const shouldOpen = forceOpen !== null ? forceOpen : !isOpen;

  if (shouldOpen) {
    overlay.classList.add('active');
    drawer.classList.add('active');
  } else {
    overlay.classList.remove('active');
    drawer.classList.remove('active');
  }
}

// BESPOKE ACCORD MIXER
function updateScentMixer() {
  const oudVal = parseInt(document.getElementById('rangeOud')?.value || 40);
  const floralVal = parseInt(document.getElementById('rangeFloral')?.value || 30);
  const vanillaVal = parseInt(document.getElementById('rangeVanilla')?.value || 30);

  if (document.getElementById('labelOud')) document.getElementById('labelOud').textContent = `${oudVal}%`;
  if (document.getElementById('labelFloral')) document.getElementById('labelFloral').textContent = `${floralVal}%`;
  if (document.getElementById('labelVanilla')) document.getElementById('labelVanilla').textContent = `${vanillaVal}%`;

  const nameEl = document.getElementById('mixerName');
  const descEl = document.getElementById('mixerDesc');

  if (nameEl && descEl) {
    if (oudVal >= floralVal && oudVal >= vanillaVal) {
      nameEl.textContent = 'ROYAL SMOKED OUD';
      descEl.textContent = 'A commanding formulation centered on raw Cambodian Oud & smoked oak wood.';
    } else if (floralVal >= oudVal && floralVal >= vanillaVal) {
      nameEl.textContent = 'GRASSE VELVET ROSE';
      descEl.textContent = 'An ethereal, romantic bouquet of morning Grasse rose & Florentine iris.';
    } else {
      nameEl.textContent = 'GOLDEN BOURBON VANILLA';
      descEl.textContent = 'A warm intoxicating gourmand accord infused with amber & roasted tonka.';
    }
  }
}

function addCustomMixerToCart() {
  const name = document.getElementById('mixerName')?.textContent || 'ROYAL SMOKED OUD';
  addDirectToCart('bespoke_mixer', 50, 195, `BESPOKE FORMULATION: ${name}`, 'hdo50.png');
}

// SCENT PYRAMID INTERACTIVE
const PYRAMID_DATA = {
  top: {
    tier: 'TÊTE · TOP NOTES (0-30 MINS)',
    headline: 'The Radiant Volatile Burst',
    text: 'Formulated with hand-pressed Reggio Calabria Bergamot and Crimson Saffron to deliver an exhilarating immediate impression.',
    volatilidade: '95%',
    sillage: '92%'
  },
  heart: {
    tier: 'CŒUR · HEART NOTES (1-4 HOURS)',
    headline: 'The Scent Soul & Identity',
    text: 'The core character of our perfumes. Imperial Grasse Rose harvested at dawn, Florentine Iris Pallida, and Nocturnal Jasmine.',
    volatilidade: '60%',
    sillage: '96%'
  },
  base: {
    tier: 'FOND · BASE NOTES (4-24+ HOURS)',
    headline: 'Deep Sillage & Memory',
    text: 'The lingering warm foundation anchoring to skin. Wild eco-harvested Cambodian Oud, smoked oakwood, and Madagascar bourbon vanilla.',
    volatilidade: '20%',
    sillage: '99%'
  }
};

function selectPyramidTier(tierKey, element) {
  playSpraySound();
  document.querySelectorAll('.dock-item-accord, .pyramid-card-box').forEach(t => t.classList.remove('active'));
  element.classList.add('active');

  const data = PYRAMID_DATA[tierKey];
  if (!data) return;

  if (document.getElementById('detailTierName')) document.getElementById('detailTierName').textContent = data.tier;
  if (document.getElementById('detailHeadline')) document.getElementById('detailHeadline').textContent = data.headline;
  if (document.getElementById('detailText')) document.getElementById('detailText').textContent = data.text;
  if (document.getElementById('meterVolatilidade')) document.getElementById('meterVolatilidade').textContent = data.volatilidade;
  if (document.getElementById('fillVolatilidade')) document.getElementById('fillVolatilidade').style.width = data.volatilidade;
  if (document.getElementById('meterSillage')) document.getElementById('meterSillage').textContent = data.sillage;
  if (document.getElementById('fillSillage')) document.getElementById('fillSillage').style.width = data.sillage;
}

// SCENT QUIZ
let quizAnswers = {};
function selectQuizOption(step, value, element) {
  playSpraySound();
  const parent = element.parentElement;
  parent.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
  element.classList.add('selected');
  quizAnswers[`step${step}`] = value;
}

function nextQuizStep(targetStep) {
  document.querySelectorAll('.quiz-step').forEach(step => step.style.display = 'none');
  const target = document.getElementById(`quizStep${targetStep}`);
  if (target) target.style.display = 'block';

  if (targetStep === 3) {
    computeQuizResult();
  }
}

function prevQuizStep(targetStep) {
  document.querySelectorAll('.quiz-step').forEach(step => step.style.display = 'none');
  const target = document.getElementById(`quizStep${targetStep}`);
  if (target) target.style.display = 'block';
}

function computeQuizResult() {
  const ans = quizAnswers.step1 || 'intense';
  let matchedProduct = PRODUCTS[0];

  if (ans === 'mysterious') matchedProduct = PRODUCTS.find(p => p.id === 'on_a_date');
  else if (ans === 'ethereal') matchedProduct = PRODUCTS.find(p => p.id === 'pure_nuit');
  else if (ans === 'warm') matchedProduct = PRODUCTS.find(p => p.id === 'tobacco_whiskey');
  else if (ans === 'intense') matchedProduct = PRODUCTS.find(p => p.id === 'oud_rouge');

  if (document.getElementById('quizMatchTitle')) document.getElementById('quizMatchTitle').textContent = `YOUR MATCH: ${matchedProduct.name}`;
  if (document.getElementById('quizMatchSubtitle')) document.getElementById('quizMatchSubtitle').textContent = matchedProduct.italic;
  if (document.getElementById('quizMatchImg')) document.getElementById('quizMatchImg').src = matchedProduct.img50;

  const btn = document.getElementById('quizAddToCartBtn');
  if (btn) {
    btn.setAttribute('onclick', `addToCart('${matchedProduct.id}')`);
    btn.innerHTML = `<i class="fa-solid fa-bag-shopping"></i> ACQUIRE MATCHED BOTTLE (${formatPrice(matchedProduct.prices[50])})`;
  }
}

function restartQuiz() {
  quizAnswers = {};
  document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
  nextQuizStep(1);
}

function openEngravingModal() {
  const m = document.getElementById('engravingModal');
  if (m) m.classList.add('active');
}

function updateEngravingPreview(val) {
  const display = document.getElementById('engravingLiveText');
  if (display) display.textContent = val.trim() ? val.toUpperCase() : 'YOUR INITIALS';
}

function saveEngravingText() {
  const input = document.getElementById('engravingInput');
  customEngraving = input ? input.value.trim().toUpperCase() : '';
  localStorage.setItem('frasmetics_engraving', customEngraving);
  closeModal('engravingModal');
  showToast(`Gravure "${customEngraving || 'Aucune'}" enregistrée !`);
}

function closeModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.remove('active');
}

function openSearchModal() {
  const m = document.getElementById('searchModal');
  if (m) m.classList.add('active');
}

function liveSearch(query) {
  const resultsBox = document.getElementById('searchResults');
  if (!resultsBox) return;

  if (!query.trim()) {
    resultsBox.innerHTML = '';
    return;
  }

  const q = query.toLowerCase();
  const matches = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(q) ||
    p.tete.toLowerCase().includes(q) ||
    p.coeur.toLowerCase().includes(q) ||
    p.fond.toLowerCase().includes(q)
  );

  if (matches.length === 0) {
    resultsBox.innerHTML = '<p style="color: #A0AEC0; font-size: 0.85rem;">No matching scent found.</p>';
  } else {
    resultsBox.innerHTML = matches.map(p => `
      <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.06); padding: 10px; cursor: pointer;" onclick="goToProductDetail('${p.id}'); closeModal('searchModal');">
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="${p.img50}" onerror="this.onerror=null; this.src='assets/${p.img50}';" style="width: 40px; height: 50px; object-fit: contain;">
          <div>
            <h4 style="font-size: 0.9rem;">${p.name}</h4>
            <p style="font-size: 0.75rem; color: #A0AEC0;">Tête: ${p.tete}</p>
          </div>
        </div>
        <span style="font-size: 0.9rem; font-weight: 800; color: var(--color-gold-light);">${formatPrice(p.prices[50])}</span>
      </div>
    `).join('');
  }
}

function processOrder(e) {
  e.preventDefault();
  playSpraySound();
  const container = document.getElementById('fullCartPageLayout');
  const orderId = 'SRK-' + Math.floor(100000 + Math.random() * 900000);

  if (container) {
    container.innerHTML = `
      <div style="text-align: center; padding: 60px 0; grid-column: 1 / -1;">
        <i class="fa-solid fa-circle-check" style="font-size: 4.5rem; color: #22C55E; margin-bottom: 20px;"></i>
        <p style="font-size: 0.75rem; color: var(--color-rouge-marianne); font-weight: 800; letter-spacing: 0.15em;">COMMANDE CONFIRMÉE</p>
        <h2 style="font-size: 2.2rem; margin-bottom: 12px;">THANK YOU FOR YOUR ORDER</h2>
        <p style="color: #A0AEC0; font-size: 1rem; margin-bottom: 28px;">
          Tracking Number: <strong style="color: var(--color-gold-light);">${orderId}</strong>. Your custom engraved bottles are being hand-prepared in Grasse, France.
        </p>

        <a href="index.html" class="btn-sarkar-primary" style="display: inline-block;">
          RETURN TO MAISON STORE
        </a>
      </div>
    `;
  }

  cart = [];
  saveCartToStorage();
  updateCartUI();
}

function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2.2 + 0.8,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.6 + 0.2
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 16, 46, ${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

document.addEventListener('DOMContentLoaded', () => {
  const currSelect = document.getElementById('currencySelect');
  if (currSelect) currSelect.value = currentCurrency;

  renderProducts();
  updateCartUI();
  initParticleCanvas();
});
