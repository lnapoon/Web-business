/* ========================================
   BADMINTON PRO SHOP — JavaScript
   Full E-commerce Functionality
   ======================================== */

// ========================================
// DATA STORES (localStorage-backed)
// ========================================
const CART_KEY = 'bps_cart';
const WISHLIST_KEY = 'bps_wishlist';
const USER_KEY = 'bps_user';
const MEMBERS_KEY = 'bps_members';

// Available Coupons
const COUPONS = {
  'BADMINTON10': { type: 'percent', value: 10, desc: 'ลด 10%' },
  'WELCOME500': { type: 'fixed', value: 500, desc: 'ลด 500 บาท' },
  'FREESHIP': { type: 'freeship', value: 0, desc: 'ฟรีค่าจัดส่ง' },
  'MEMBER15': { type: 'percent', value: 15, desc: 'สมาชิกลด 15%' },
};

const SHIPPING_COST = 50;

// ========================================
// UTILITY FUNCTIONS
// ========================================
function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getWishlist() {
  try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; }
  catch { return []; }
}

function saveWishlist(list) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
}

function getUser() {
  try { return JSON.parse(localStorage.getItem(USER_KEY)); }
  catch { return null; }
}

function saveUser(user) {
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(USER_KEY);
}

function getMembers() {
  try { return JSON.parse(localStorage.getItem(MEMBERS_KEY)) || []; }
  catch { return []; }
}

function saveMembers(members) {
  localStorage.setItem(MEMBERS_KEY, JSON.stringify(members));
}

function formatPrice(n) {
  return '฿' + Number(n).toLocaleString();
}

function generateId(name) {
  // Support Thai characters by stripping them and keeping alphanumeric
  return name.toLowerCase().replace(/[^a-z0-9\u0E00-\u0E7F]+/g, '-').replace(/-+$/g, '').replace(/^-+/g, '');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
    disable: 'mobile'
  });

  initNavbarScroll();
  initBrandFilter();
  initCategoryFilter();
  initLoginTabs();
  initWishlistButtons();
  initBackToTop();
  initParallax();
  initStatsObserver();
  initChartsObserver();
  initPromoBanner();

  // Restore state from localStorage
  restoreCartUI();
  restoreWishlistUI();
  restoreUserUI();

  // Cart button opens offcanvas
  document.getElementById('btnCart').addEventListener('click', openCart);
  document.getElementById('btnWishlist').addEventListener('click', openWishlist);
});

// ========================================
// PROMO BANNER
// ========================================
function initPromoBanner() {
  const closeBtn = document.getElementById('promoClose');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      document.getElementById('promoBanner').style.display = 'none';
      document.body.style.paddingTop = '';
    });
  }
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
function initNavbarScroll() {
  const navbar = document.getElementById('mainNavbar');
  const navLinks = document.querySelectorAll('.navbar-custom .nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    const sections = ['hero', 'brands', 'products', 'stats'];
    let currentSection = 'hero';
    sections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          currentSection = sectionId;
        }
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

// ========================================
// PARALLAX EFFECT FOR HERO
// ========================================
function initParallax() {
  const heroBg = document.getElementById('heroBg');
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      heroBg.style.transform = `scale(1.1) translateY(${window.scrollY * 0.3}px)`;
    }
  });
}

// ========================================
// CATEGORY FILTER
// ========================================
let activeCategory = 'all';
let activeBrand = 'all';

function initCategoryFilter() {
  const catBtns = document.querySelectorAll('.category-filter-btn');
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      applyFilters();
    });
  });
}

// ========================================
// BRAND FILTER
// ========================================
function initBrandFilter() {
  const filterBtns = document.querySelectorAll('.brand-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeBrand = btn.getAttribute('data-brand');
      applyFilters();
    });
  });
}

// Combined filter logic
function applyFilters() {
  const productCols = document.querySelectorAll('.product-col');
  let visibleIndex = 0;

  productCols.forEach((col) => {
    const brand = col.getAttribute('data-brand');
    const category = col.getAttribute('data-category');
    const matchBrand = activeBrand === 'all' || brand === activeBrand;
    const matchCategory = activeCategory === 'all' || category === activeCategory;

    if (matchBrand && matchCategory) {
      col.classList.remove('hidden');
      col.style.display = '';
      setTimeout(() => col.classList.add('show'), visibleIndex * 60);
      visibleIndex++;
    } else {
      col.classList.remove('show');
      col.classList.add('hidden');
      setTimeout(() => {
        if (col.classList.contains('hidden')) col.style.display = 'none';
      }, 400);
    }
  });

  // Show "no results" message if needed
  const noResults = document.getElementById('noResults');
  if (noResults) {
    noResults.style.display = visibleIndex === 0 ? 'block' : 'none';
  }
}

// ========================================
// CART SYSTEM
// ========================================
function addToCart(button, productName, ev) {
  const card = button.closest('.product-card');
  const priceText = card.querySelector('.product-price').textContent;
  const price = parseInt(priceText.replace(/[^0-9]/g, ''));
  const image = card.querySelector('.product-img-wrapper img').getAttribute('src');
  const brand = card.querySelector('.product-brand').textContent;
  const id = generateId(productName);

  let cart = getCart();
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name: productName, price, image, brand, qty: 1 });
  }

  saveCart(cart);
  updateCartBadge();

  // Button feedback
  const originalHTML = button.innerHTML;
  button.innerHTML = '<i class="bi bi-check-lg me-1"></i>เพิ่มแล้ว!';
  button.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
  button.style.color = 'white';
  button.style.borderColor = '#16a34a';
  button.disabled = true;

  setTimeout(() => {
    button.innerHTML = originalHTML;
    button.style.background = '';
    button.style.color = '';
    button.style.borderColor = '';
    button.disabled = false;
  }, 1500);

  showToast(`✅ เพิ่ม "${productName}" ลงตะกร้าแล้ว!`);

  // Ripple effect (fixed: pass event properly)
  if (ev) createRipple(button, ev);
}

function removeFromCart(id) {
  let cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
  updateCartBadge();
  renderCartItems();
}

function updateCartQty(id, delta) {
  let cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
  }
  saveCart(cart);
  updateCartBadge();
  renderCartItems();
}

function updateCartBadge() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById('cartBadge');
  if (badge) {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? '' : 'none';
  }
}

function restoreCartUI() {
  updateCartBadge();
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

function openCart() {
  renderCartItems();
  const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(document.getElementById('cartOffcanvas'));
  offcanvas.show();
}

function renderCartItems() {
  const container = document.getElementById('cartItemsList');
  const totalEl = document.getElementById('cartTotalPrice');
  const emptyEl = document.getElementById('cartEmpty');
  const cartFooter = document.getElementById('cartFooter');
  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = '';
    emptyEl.style.display = 'block';
    cartFooter.style.display = 'none';
    return;
  }

  emptyEl.style.display = 'none';
  cartFooter.style.display = 'block';

  container.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${escapeHtml(item.id)}">
      <div class="cart-item-img">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}">
      </div>
      <div class="cart-item-info">
        <div class="cart-item-brand">${escapeHtml(item.brand)}</div>
        <div class="cart-item-name">${escapeHtml(item.name)}</div>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
        <div class="cart-item-controls">
          <button class="cart-qty-btn" onclick="updateCartQty('${escapeHtml(item.id)}', -1)">
            <i class="bi bi-dash"></i>
          </button>
          <span class="cart-qty-num">${item.qty}</span>
          <button class="cart-qty-btn" onclick="updateCartQty('${escapeHtml(item.id)}', 1)">
            <i class="bi bi-plus"></i>
          </button>
          <button class="cart-remove-btn" onclick="removeFromCart('${escapeHtml(item.id)}')">
            <i class="bi bi-trash3"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  totalEl.textContent = formatPrice(getCartTotal());
}

// ========================================
// CHECKOUT SYSTEM
// ========================================
let appliedCoupon = null;

function openCheckout() {
  // Don't open checkout if cart is empty
  const cart = getCart();
  if (cart.length === 0) {
    showToast('❌ ตะกร้าว่าง ไม่สามารถสั่งซื้อได้');
    return;
  }

  // Close cart offcanvas
  const cartOC = bootstrap.Offcanvas.getInstance(document.getElementById('cartOffcanvas'));
  if (cartOC) cartOC.hide();

  setTimeout(() => {
    renderCheckoutSummary();
    const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('checkoutModal'));
    modal.show();
  }, 350);
}

function renderCheckoutSummary() {
  const cart = getCart();
  const listEl = document.getElementById('checkoutItemsList');
  const subtotalEl = document.getElementById('checkoutSubtotal');
  const discountRow = document.getElementById('discountRow');
  const discountEl = document.getElementById('checkoutDiscount');
  const shippingEl = document.getElementById('checkoutShipping');
  const totalEl = document.getElementById('checkoutTotal');
  const couponMsg = document.getElementById('couponMessage');

  // Render items
  listEl.innerHTML = cart.map(item => `
    <div class="checkout-item">
      <img src="${item.image}" alt="${item.name}" class="checkout-item-img">
      <div class="checkout-item-detail">
        <div class="checkout-item-name">${item.name}</div>
        <div class="checkout-item-qty">x${item.qty}</div>
      </div>
      <div class="checkout-item-price">${formatPrice(item.price * item.qty)}</div>
    </div>
  `).join('');

  // Calculate totals
  const subtotal = getCartTotal();
  let discount = 0;
  let shipping = SHIPPING_COST;

  if (appliedCoupon) {
    const coupon = COUPONS[appliedCoupon];
    if (coupon) {
      if (coupon.type === 'percent') {
        discount = Math.round(subtotal * coupon.value / 100);
      } else if (coupon.type === 'fixed') {
        discount = coupon.value;
      } else if (coupon.type === 'freeship') {
        shipping = 0;
      }
    }
  }

  const total = Math.max(0, subtotal - discount + shipping);

  subtotalEl.textContent = formatPrice(subtotal);
  
  if (discount > 0) {
    discountRow.style.display = 'flex';
    discountEl.textContent = '-' + formatPrice(discount);
  } else {
    discountRow.style.display = appliedCoupon && COUPONS[appliedCoupon]?.type !== 'freeship' ? 'flex' : 'none';
    discountEl.textContent = '-฿0';
  }

  shippingEl.textContent = shipping === 0 ? 'ฟรี!' : formatPrice(shipping);
  if (shipping === 0) shippingEl.classList.add('text-success');
  else shippingEl.classList.remove('text-success');
  
  totalEl.textContent = formatPrice(total);
}

function applyCoupon() {
  const input = document.getElementById('couponInput');
  const msg = document.getElementById('couponMessage');
  const code = input.value.trim().toUpperCase();

  if (!code) {
    msg.textContent = '⚠️ กรุณากรอกโค้ดส่วนลด';
    msg.className = 'coupon-msg error';
    return;
  }

  if (COUPONS[code]) {
    appliedCoupon = code;
    msg.textContent = `✅ ใช้คูปอง "${code}" สำเร็จ — ${COUPONS[code].desc}`;
    msg.className = 'coupon-msg success';
    renderCheckoutSummary();
  } else {
    appliedCoupon = null;
    msg.textContent = '❌ โค้ดส่วนลดไม่ถูกต้อง';
    msg.className = 'coupon-msg error';
    renderCheckoutSummary();
  }
}

function removeCoupon() {
  appliedCoupon = null;
  document.getElementById('couponInput').value = '';
  document.getElementById('couponMessage').textContent = '';
  document.getElementById('couponMessage').className = 'coupon-msg';
  renderCheckoutSummary();
}

function handleCheckout(event) {
  event.preventDefault();
  
  const name = document.getElementById('shipName').value.trim();
  const address = document.getElementById('shipAddress').value.trim();
  const phone = document.getElementById('shipPhone').value.trim();
  const payment = document.querySelector('input[name="paymentMethod"]:checked');

  if (!name || !address || !phone) {
    showToast('❌ กรุณากรอกข้อมูลจัดส่งให้ครบ');
    return;
  }

  if (!payment) {
    showToast('❌ กรุณาเลือกวิธีชำระเงิน');
    return;
  }

  // Show success
  const modal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));

  // Show confirmation in the modal
  document.getElementById('checkoutFormContent').style.display = 'none';
  document.getElementById('checkoutSuccess').style.display = 'block';

  // Clear cart
  saveCart([]);
  updateCartBadge();
  appliedCoupon = null;

  // Auto close after 4 seconds
  setTimeout(() => {
    if (modal) modal.hide();
    // Reset checkout view
    setTimeout(() => {
      document.getElementById('checkoutFormContent').style.display = '';
      document.getElementById('checkoutSuccess').style.display = 'none';
      document.getElementById('checkoutForm').reset();
      document.getElementById('couponInput').value = '';
      document.getElementById('couponMessage').textContent = '';
    }, 500);
  }, 4000);
}

// ========================================
// WISHLIST SYSTEM
// ========================================
function initWishlistButtons() {
  const wishlistBtns = document.querySelectorAll('.product-wishlist');
  wishlistBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-card');
      const name = card.querySelector('.product-name').textContent;
      const priceText = card.querySelector('.product-price').textContent;
      const price = parseInt(priceText.replace(/[^0-9]/g, ''));
      const image = card.querySelector('.product-img-wrapper img').getAttribute('src');
      const brand = card.querySelector('.product-brand').textContent;
      const id = generateId(name);

      let wishlist = getWishlist();
      const icon = btn.querySelector('i');

      if (btn.classList.contains('active')) {
        // Remove from wishlist
        btn.classList.remove('active');
        icon.classList.remove('bi-heart-fill');
        icon.classList.add('bi-heart');
        wishlist = wishlist.filter(item => item.id !== id);
        showToast('💔 นำออกจากรายการโปรดแล้ว');
      } else {
        // Add to wishlist
        btn.classList.add('active');
        icon.classList.remove('bi-heart');
        icon.classList.add('bi-heart-fill');
        btn.style.transform = 'scale(1.3)';
        setTimeout(() => btn.style.transform = '', 200);
        if (!wishlist.find(item => item.id === id)) {
          wishlist.push({ id, name, price, image, brand });
        }
        showToast('❤️ เพิ่มในรายการโปรดแล้ว!');
      }

      saveWishlist(wishlist);
      updateWishlistBadge();
    });
  });
}

function updateWishlistBadge() {
  const wishlist = getWishlist();
  const badge = document.getElementById('wishlistBadge');
  if (badge) {
    badge.textContent = wishlist.length;
    badge.style.display = wishlist.length > 0 ? '' : 'none';
  }
}

function restoreWishlistUI() {
  const wishlist = getWishlist();
  updateWishlistBadge();

  // Restore heart icons
  document.querySelectorAll('.product-card').forEach(card => {
    const name = card.querySelector('.product-name').textContent;
    const id = generateId(name);
    const btn = card.querySelector('.product-wishlist');
    const icon = btn.querySelector('i');

    if (wishlist.find(item => item.id === id)) {
      btn.classList.add('active');
      icon.classList.remove('bi-heart');
      icon.classList.add('bi-heart-fill');
    }
  });
}

function openWishlist() {
  renderWishlistItems();
  const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(document.getElementById('wishlistOffcanvas'));
  offcanvas.show();
}

function renderWishlistItems() {
  const container = document.getElementById('wishlistItemsList');
  const emptyEl = document.getElementById('wishlistEmpty');
  const wishlist = getWishlist();

  if (wishlist.length === 0) {
    container.innerHTML = '';
    emptyEl.style.display = 'block';
    return;
  }

  emptyEl.style.display = 'none';

  container.innerHTML = wishlist.map(item => `
    <div class="wishlist-item" data-id="${item.id}">
      <div class="wishlist-item-img">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="wishlist-item-info">
        <div class="wishlist-item-brand">${item.brand}</div>
        <div class="wishlist-item-name">${item.name}</div>
        <div class="wishlist-item-price">${formatPrice(item.price)}</div>
      </div>
      <div class="wishlist-item-actions">
        <button class="btn-wishlist-cart" onclick="addWishlistToCart('${item.id}')" title="เพิ่มลงตะกร้า">
          <i class="bi bi-cart-plus"></i>
        </button>
        <button class="btn-wishlist-remove" onclick="removeFromWishlist('${item.id}')" title="ลบ">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
  `).join('');
}

function addWishlistToCart(id) {
  const wishlist = getWishlist();
  const item = wishlist.find(i => i.id === id);
  if (!item) return;

  let cart = getCart();
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  saveCart(cart);
  updateCartBadge();
  showToast(`✅ เพิ่ม "${item.name}" ลงตะกร้าแล้ว!`);
}

function removeFromWishlist(id) {
  let wishlist = getWishlist().filter(item => item.id !== id);
  saveWishlist(wishlist);
  updateWishlistBadge();
  renderWishlistItems();

  // Update heart icon on product card
  document.querySelectorAll('.product-card').forEach(card => {
    const name = card.querySelector('.product-name').textContent;
    const cardId = generateId(name);
    if (cardId === id) {
      const btn = card.querySelector('.product-wishlist');
      const icon = btn.querySelector('i');
      btn.classList.remove('active');
      icon.classList.remove('bi-heart-fill');
      icon.classList.add('bi-heart');
    }
  });

  showToast('💔 นำออกจากรายการโปรดแล้ว');
}

// ========================================
// MEMBERSHIP / AUTH SYSTEM
// ========================================
function initLoginTabs() {
  const tabs = document.querySelectorAll('.login-tab');
  const loginContent = document.getElementById('loginTabContent');
  const registerContent = document.getElementById('registerTabContent');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabName = tab.getAttribute('data-tab');
      if (tabName === 'login') {
        loginContent.classList.add('active');
        registerContent.classList.remove('active');
      } else {
        loginContent.classList.remove('active');
        registerContent.classList.add('active');
      }
    });
  });
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    ['loginEmail', 'loginPassword'].forEach(id => {
      const input = document.getElementById(id);
      if (!input.value) {
        input.classList.add('error');
        setTimeout(() => input.classList.remove('error'), 500);
      }
    });
    return;
  }

  // Check against stored members
  const members = getMembers();
  const member = members.find(m => m.email === email && m.password === password);

  if (member) {
    const user = { name: member.name, email: member.email, phone: member.phone };
    saveUser(user);
    restoreUserUI();
    showToast(`✅ ยินดีต้อนรับ ${member.name}! สมาชิกใช้โค้ด MEMBER15 ลดเพิ่ม 15%`);

    setTimeout(() => {
      const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
      if (modal) modal.hide();
      document.getElementById('loginEmail').value = '';
      document.getElementById('loginPassword').value = '';
    }, 800);
  } else {
    showToast('❌ อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    document.getElementById('loginPassword').classList.add('error');
    setTimeout(() => document.getElementById('loginPassword').classList.remove('error'), 500);
  }
}

function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('regPasswordConfirm').value;

  if (!name || !email || !phone || !password || !confirmPassword) {
    showToast('❌ กรุณากรอกข้อมูลให้ครบทุกช่อง');
    return;
  }

  if (password !== confirmPassword) {
    ['regPassword', 'regPasswordConfirm'].forEach(id => {
      document.getElementById(id).classList.add('error');
      setTimeout(() => document.getElementById(id).classList.remove('error'), 500);
    });
    showToast('❌ รหัสผ่านไม่ตรงกัน กรุณาลองใหม่');
    return;
  }

  if (password.length < 6) {
    showToast('❌ รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
    return;
  }

  // Check if email already exists
  const members = getMembers();
  if (members.find(m => m.email === email)) {
    showToast('❌ อีเมลนี้ถูกใช้งานแล้ว');
    return;
  }

  // Save member
  members.push({ name, email, phone, password });
  saveMembers(members);

  // Auto login
  const user = { name, email, phone };
  saveUser(user);
  restoreUserUI();

  showToast('🎉 สมัครสมาชิกสำเร็จ! ใช้โค้ด MEMBER15 ลดเพิ่ม 15%');

  setTimeout(() => {
    const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    if (modal) modal.hide();
    // Reset form
    document.getElementById('registerForm').reset();
  }, 800);
}

function restoreUserUI() {
  const user = getUser();
  const loginBtn = document.getElementById('btnLoginNav');
  const userDropdown = document.getElementById('userDropdown');
  const userName = document.getElementById('userNameDisplay');

  if (user) {
    loginBtn.style.display = 'none';
    userDropdown.style.display = 'flex';
    userName.textContent = user.name;
  } else {
    loginBtn.style.display = '';
    userDropdown.style.display = 'none';
  }
}

function handleLogout() {
  saveUser(null);
  restoreUserUI();
  showToast('👋 ออกจากระบบแล้ว');
}

function socialLogin(provider) {
  showToast(`🔗 กำลังเชื่อมต่อกับ ${provider}...`);
  setTimeout(() => {
    const user = { name: `ผู้ใช้ ${provider}`, email: `user@${provider.toLowerCase()}.com`, phone: '' };
    saveUser(user);
    restoreUserUI();
    showToast(`✅ เข้าสู่ระบบด้วย ${provider} สำเร็จ!`);
    setTimeout(() => {
      const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
      if (modal) modal.hide();
    }, 800);
  }, 1200);
}

// ========================================
// TOAST NOTIFICATION
// ========================================
let toastTimeout = null;

function showToast(message) {
  const toast = document.getElementById('cartToast');
  const toastMsg = document.getElementById('toastMessage');
  toastMsg.textContent = message;

  // Clear any existing timeout to prevent race conditions
  if (toastTimeout) clearTimeout(toastTimeout);

  toast.classList.add('show');
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
    toastTimeout = null;
  }, 3000);
}

// ========================================
// RIPPLE EFFECT
// ========================================
function createRipple(element, e) {
  const ripple = document.createElement('span');
  ripple.style.cssText = `
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.4);
    width: 20px;
    height: 20px;
    animation: ripple 0.6s ease-out;
    pointer-events: none;
  `;
  ripple.style.left = '50%';
  ripple.style.top = '50%';
  ripple.style.transform = 'translate(-50%, -50%)';
  element.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

// ========================================
// STATS COUNTER ANIMATION
// ========================================
function initStatsObserver() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        animateCounters(statNumbers);
      }
    });
  }, { threshold: 0.3 });
  statNumbers.forEach(num => observer.observe(num));
}

function animateCounters(elements) {
  elements.forEach(el => {
    const target = parseFloat(el.getAttribute('data-target'));
    const isDecimal = el.getAttribute('data-decimal') === 'true';
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = target * easedProgress;

      if (isDecimal) {
        el.textContent = currentValue.toFixed(1);
      } else {
        el.textContent = Math.floor(currentValue).toLocaleString();
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        if (isDecimal) {
          el.textContent = target.toFixed(1);
        } else {
          el.textContent = target.toLocaleString() + '+';
        }
      }
    }
    requestAnimationFrame(updateCounter);
  });
}

// ========================================
// CHARTS (Chart.js)
// ========================================
let chartsInitialized = false;

function initChartsObserver() {
  const chartsSection = document.getElementById('stats');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !chartsInitialized) {
        chartsInitialized = true;
        setTimeout(() => {
          initMonthlySalesChart();
          initBrandSalesChart();
          initRevenueChart();
        }, 300);
      }
    });
  }, { threshold: 0.1 });
  observer.observe(chartsSection);
}

function getChartDefaults() {
  return {
    color: '#52525b',
    borderColor: 'rgba(9, 9, 11, 0.06)',
    font: { family: "'Plus Jakarta Sans', 'Prompt', sans-serif" }
  };
}

function initMonthlySalesChart() {
  const ctx = document.getElementById('monthlySalesChart').getContext('2d');
  const defaults = getChartDefaults();
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'],
      datasets: [{
        label: 'ยอดขาย (ชิ้น)',
        data: [1850, 2100, 2450, 1980, 2800, 3200],
        backgroundColor: ['rgba(230,0,18,0.85)', 'rgba(9,9,11,0.85)', 'rgba(82,82,91,0.85)', 'rgba(161,161,170,0.85)', 'rgba(230,0,18,0.7)', 'rgba(9,9,11,0.95)'],
        borderColor: ['#e60012', '#09090b', '#52525b', '#a1a1aa', '#e60012', '#09090b'],
        borderWidth: 1.5,
        borderRadius: 4,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#09090b',
          titleFont: { family: defaults.font.family, weight: '700' },
          bodyFont: { family: defaults.font.family },
          borderColor: 'rgba(230,0,18,0.2)', borderWidth: 1, cornerRadius: 6, padding: 12,
          callbacks: { label: ctx => ` ยอดขาย: ${ctx.parsed.y.toLocaleString()} ชิ้น` }
        }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: defaults.borderColor }, ticks: { color: defaults.color, font: { family: defaults.font.family } } },
        x: { grid: { display: false }, ticks: { color: defaults.color, font: { family: defaults.font.family } } }
      },
      animation: { duration: 1200, easing: 'easeOutCubic' }
    }
  });
}

function initBrandSalesChart() {
  const ctx = document.getElementById('brandSalesChart').getContext('2d');
  const defaults = getChartDefaults();
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Yonex', 'Li-Ning', 'Victor', 'RSL', 'Apacs', 'อื่นๆ'],
      datasets: [{
        data: [35, 25, 20, 10, 6, 4],
        backgroundColor: ['#e60012', '#09090b', '#52525b', '#a1a1aa', '#d4d4d8', '#e4e4e7'],
        borderColor: '#ffffff', borderWidth: 3, hoverOffset: 8,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '70%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: defaults.color, font: { family: defaults.font.family, size: 11, weight: '600' }, padding: 14, usePointStyle: true, pointStyleWidth: 10 }
        },
        tooltip: {
          backgroundColor: '#09090b',
          titleFont: { family: defaults.font.family, weight: '700' },
          bodyFont: { family: defaults.font.family },
          borderColor: 'rgba(230,0,18,0.2)', borderWidth: 1, cornerRadius: 6, padding: 12,
          callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` }
        }
      },
      animation: { animateRotate: true, animateScale: true, duration: 1200, easing: 'easeOutCubic' }
    }
  });
}

function initRevenueChart() {
  const ctx = document.getElementById('revenueChart').getContext('2d');
  const defaults = getChartDefaults();
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(230,0,18,0.12)');
  gradient.addColorStop(1, 'rgba(230,0,18,0)');
  const gradient2 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient2.addColorStop(0, 'rgba(9,9,11,0.04)');
  gradient2.addColorStop(1, 'rgba(9,9,11,0)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'],
      datasets: [
        {
          label: 'รายได้จริง (บาท)', data: [850000, 1020000, 1350000, 980000, 1580000, 1850000],
          borderColor: '#e60012', backgroundColor: gradient, borderWidth: 3, fill: true, tension: 0.35,
          pointBackgroundColor: '#e60012', pointBorderColor: '#ffffff', pointBorderWidth: 2.5, pointRadius: 5, pointHoverRadius: 7,
        },
        {
          label: 'เป้าหมายรายได้ (บาท)', data: [900000, 950000, 1100000, 1200000, 1400000, 1600000],
          borderColor: 'rgba(9,9,11,0.4)', backgroundColor: gradient2, borderWidth: 2, borderDash: [6, 4], fill: true, tension: 0.35,
          pointBackgroundColor: 'rgba(9,9,11,0.6)', pointBorderColor: '#ffffff', pointBorderWidth: 2, pointRadius: 4, pointHoverRadius: 6,
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: {
          position: 'top', align: 'end',
          labels: { color: defaults.color, font: { family: defaults.font.family, size: 11, weight: '600' }, padding: 14, usePointStyle: true }
        },
        tooltip: {
          backgroundColor: '#09090b',
          titleFont: { family: defaults.font.family, weight: '700' },
          bodyFont: { family: defaults.font.family },
          borderColor: 'rgba(230,0,18,0.2)', borderWidth: 1, cornerRadius: 6, padding: 12,
          callbacks: { label: ctx => ` ${ctx.dataset.label}: ฿${ctx.parsed.y.toLocaleString()}` }
        }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: defaults.borderColor }, ticks: { color: defaults.color, font: { family: defaults.font.family }, callback: v => '฿' + (v / 1000000).toFixed(1) + 'M' } },
        x: { grid: { display: false }, ticks: { color: defaults.color, font: { family: defaults.font.family } } }
      },
      animation: { duration: 1500, easing: 'easeOutCubic' }
    }
  });
}

// ========================================
// BACK TO TOP BUTTON
// ========================================
function initBackToTop() {
  const btn = document.getElementById('btnBackTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========================================
// NEWSLETTER HANDLER
// ========================================
function handleNewsletter(event) {
  event.preventDefault();
  const input = event.target.querySelector('.newsletter-input');
  if (input.value) {
    // Save subscriber
    const subscribers = JSON.parse(localStorage.getItem('bps_subscribers') || '[]');
    if (!subscribers.includes(input.value)) {
      subscribers.push(input.value);
      localStorage.setItem('bps_subscribers', JSON.stringify(subscribers));
    }
    showToast('🎉 สมัครรับข่าวสารสำเร็จ! ขอบคุณค่ะ');
    input.value = '';
  }
}

// ========================================
// TYPING ANIMATION
// ========================================
const typingTexts = [
  'Yonex • Li-Ning • Victor • RSL • Apacs',
  'ไม้แบด • ลูกขนไก่ • รองเท้า • กระเป๋า',
  'ของแท้ 100% • จัดส่งทั่วไทย • ราคาดีที่สุด',
  'Professional Badminton Equipment Store'
];

let currentTextIndex = 0;

function cycleTypingText() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;
  typingElement.style.animation = 'none';
  typingElement.style.opacity = '0';
  typingElement.style.transition = 'opacity 0.3s';

  setTimeout(() => {
    currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
    typingElement.textContent = typingTexts[currentTextIndex];
    typingElement.style.opacity = '1';
    typingElement.style.animation = 'none';
    typingElement.offsetHeight;
    typingElement.style.animation = 'typing 3s steps(40, end), blink 0.75s step-end infinite';
    typingElement.style.transition = '';
  }, 300);
}

setInterval(cycleTypingText, 5000);
