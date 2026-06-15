/* ========================================
   BADMINTON PRO SHOP — JavaScript
   Interactions, Charts, Animations
   ======================================== */

// ========================================
// 1. INITIALIZE AOS (Animate On Scroll)
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
  initLoginTabs();
  initWishlistButtons();
  initBackToTop();
  initParallax();
  initStatsObserver();
  initChartsObserver();
});

// ========================================
// 2. NAVBAR SCROLL EFFECT
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

    // Update active nav link based on scroll position
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
// 3. PARALLAX EFFECT FOR HERO
// ========================================
function initParallax() {
  const heroBg = document.getElementById('heroBg');

  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      const scrolled = window.scrollY;
      heroBg.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
    }
  });
}

// ========================================
// 4. BRAND FILTER
// ========================================
function initBrandFilter() {
  const filterBtns = document.querySelectorAll('.brand-filter-btn');
  const productCols = document.querySelectorAll('.product-col');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const brand = btn.getAttribute('data-brand');

      productCols.forEach((col, index) => {
        const productBrand = col.getAttribute('data-brand');

        if (brand === 'all' || productBrand === brand) {
          col.classList.remove('hidden');
          col.style.display = '';
          // Stagger animation
          setTimeout(() => {
            col.classList.add('show');
          }, index * 80);
        } else {
          col.classList.remove('show');
          col.classList.add('hidden');
          // After animation, hide completely
          setTimeout(() => {
            if (col.classList.contains('hidden')) {
              col.style.display = 'none';
            }
          }, 500);
        }
      });
    });
  });
}

// ========================================
// 5. CART FUNCTIONALITY
// ========================================
let cartCount = 0;

function addToCart(button, productName) {
  cartCount++;

  // Update cart badge
  const badge = document.getElementById('cartBadge');
  badge.textContent = cartCount;
  badge.style.animation = 'none';
  badge.offsetHeight; // Trigger reflow
  badge.style.animation = 'pulse 0.5s ease';

  // Button feedback
  const originalHTML = button.innerHTML;
  button.innerHTML = '<i class="bi bi-check-lg me-1"></i>เพิ่มแล้ว!';
  button.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
  button.disabled = true;

  setTimeout(() => {
    button.innerHTML = originalHTML;
    button.style.background = '';
    button.disabled = false;
  }, 1500);

  // Show toast notification
  showToast(`✅ เพิ่ม "${productName}" ลงตะกร้าแล้ว!`);

  // Ripple effect
  createRipple(button, event);
}

function showToast(message) {
  const toast = document.getElementById('cartToast');
  const toastMsg = document.getElementById('toastMessage');
  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

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

  const rect = element.getBoundingClientRect();
  ripple.style.left = '50%';
  ripple.style.top = '50%';
  ripple.style.transform = 'translate(-50%, -50%)';
  element.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}

// ========================================
// 6. LOGIN MODAL TABS
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

function socialLogin(provider) {
  showToast(`🔗 กำลังเชื่อมต่อกับ ${provider}...`);

  // Simulate loading
  setTimeout(() => {
    showToast(`✅ เข้าสู่ระบบด้วย ${provider} สำเร็จ!`);

    // Close modal after short delay
    setTimeout(() => {
      const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
      if (modal) modal.hide();
    }, 1000);
  }, 1500);
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail');
  const password = document.getElementById('loginPassword');

  if (!email.value || !password.value) {
    // Shake animation on error
    [email, password].forEach(input => {
      if (!input.value) {
        input.classList.add('error');
        setTimeout(() => input.classList.remove('error'), 500);
      }
    });
    return;
  }

  showToast('✅ เข้าสู่ระบบสำเร็จ! ยินดีต้อนรับ');

  setTimeout(() => {
    const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    if (modal) modal.hide();
    email.value = '';
    password.value = '';
  }, 1000);
}

function handleRegister(event) {
  event.preventDefault();
  const password = document.getElementById('regPassword');
  const confirmPassword = document.getElementById('regPasswordConfirm');

  if (password.value !== confirmPassword.value) {
    [password, confirmPassword].forEach(input => {
      input.classList.add('error');
      setTimeout(() => input.classList.remove('error'), 500);
    });
    showToast('❌ รหัสผ่านไม่ตรงกัน กรุณาลองใหม่');
    return;
  }

  showToast('✅ สมัครสมาชิกสำเร็จ! ยินดีต้อนรับ');

  setTimeout(() => {
    const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    if (modal) modal.hide();
  }, 1000);
}

// ========================================
// 7. WISHLIST BUTTONS
// ========================================
function initWishlistButtons() {
  const wishlistBtns = document.querySelectorAll('.product-wishlist');

  wishlistBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const icon = btn.querySelector('i');

      if (btn.classList.contains('active')) {
        icon.classList.remove('bi-heart');
        icon.classList.add('bi-heart-fill');
        btn.style.transform = 'scale(1.3)';
        setTimeout(() => btn.style.transform = '', 200);
        showToast('❤️ เพิ่มในรายการโปรดแล้ว!');
      } else {
        icon.classList.remove('bi-heart-fill');
        icon.classList.add('bi-heart');
        showToast('💔 นำออกจากรายการโปรดแล้ว');
      }
    });
  });
}

// ========================================
// 8. STATS COUNTER ANIMATION
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
    const start = 0;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out-cubic)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = start + (target - start) * easedProgress;

      if (isDecimal) {
        el.textContent = currentValue.toFixed(1);
      } else {
        el.textContent = Math.floor(currentValue).toLocaleString();
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Final value with "+" suffix for large numbers
        if (isDecimal) {
          el.textContent = target.toFixed(1);
        } else if (target >= 100) {
          el.textContent = target.toLocaleString() + '+';
        } else {
          el.textContent = target.toLocaleString() + '+';
        }
      }
    }

    requestAnimationFrame(updateCounter);
  });
}

// ========================================
// 9. CHARTS (Chart.js)
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

// Chart.js Global Defaults
function getChartDefaults() {
  return {
    color: '#52525b', // Zinc 600
    borderColor: 'rgba(9, 9, 11, 0.06)', // Very light charcoal line
    font: {
      family: "'Plus Jakarta Sans', 'Prompt', sans-serif"
    }
  };
}

// Monthly Sales Bar Chart
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
        backgroundColor: [
          'rgba(230, 0, 18, 0.85)', // Red
          'rgba(9, 9, 11, 0.85)',   // Black
          'rgba(82, 82, 91, 0.85)',  // Dark Gray
          'rgba(161, 161, 170, 0.85)', // Light Gray
          'rgba(230, 0, 18, 0.7)',   // Translucent Red
          'rgba(9, 9, 11, 0.95)'    // Solid Black
        ],
        borderColor: [
          '#e60012',
          '#09090b',
          '#52525b',
          '#a1a1aa',
          '#e60012',
          '#09090b'
        ],
        borderWidth: 1.5,
        borderRadius: 4,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: '#09090b',
          titleFont: { family: defaults.font.family, weight: '700' },
          bodyFont: { family: defaults.font.family },
          borderColor: 'rgba(230, 0, 18, 0.2)',
          borderWidth: 1,
          cornerRadius: 6,
          padding: 12,
          callbacks: {
            label: function(context) {
              return ` ยอดขาย: ${context.parsed.y.toLocaleString()} ชิ้น`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: defaults.borderColor,
          },
          ticks: {
            color: defaults.color,
            font: { family: defaults.font.family }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: defaults.color,
            font: { family: defaults.font.family }
          }
        }
      },
      animation: {
        duration: 1200,
        easing: 'easeOutCubic'
      }
    }
  });
}

// Brand Sales Doughnut Chart
function initBrandSalesChart() {
  const ctx = document.getElementById('brandSalesChart').getContext('2d');
  const defaults = getChartDefaults();

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Yonex', 'Li-Ning', 'Victor', 'RSL', 'Apacs', 'อื่นๆ'],
      datasets: [{
        data: [35, 25, 20, 10, 6, 4],
        backgroundColor: [
          '#e60012', // Yonex Red
          '#09090b', // Li-Ning Black
          '#52525b', // Victor Dark Gray
          '#a1a1aa', // RSL Light Gray
          '#d4d4d8', // Apacs Silver
          '#e4e4e7'  // Others Light
        ],
        borderColor: '#ffffff',
        borderWidth: 3,
        hoverOffset: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: defaults.color,
            font: { family: defaults.font.family, size: 11, weight: '600' },
            padding: 14,
            usePointStyle: true,
            pointStyleWidth: 10
          }
        },
        tooltip: {
          backgroundColor: '#09090b',
          titleFont: { family: defaults.font.family, weight: '700' },
          bodyFont: { family: defaults.font.family },
          borderColor: 'rgba(230, 0, 18, 0.2)',
          borderWidth: 1,
          cornerRadius: 6,
          padding: 12,
          callbacks: {
            label: function(context) {
              return ` ${context.label}: ${context.parsed}%`;
            }
          }
        }
      },
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1200,
        easing: 'easeOutCubic'
      }
    }
  });
}

// Revenue Line Chart
function initRevenueChart() {
  const ctx = document.getElementById('revenueChart').getContext('2d');
  const defaults = getChartDefaults();

  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(230, 0, 18, 0.12)');
  gradient.addColorStop(1, 'rgba(230, 0, 18, 0)');

  const gradient2 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient2.addColorStop(0, 'rgba(9, 9, 11, 0.04)');
  gradient2.addColorStop(1, 'rgba(9, 9, 11, 0)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'],
      datasets: [
        {
          label: 'รายได้จริง (บาท)',
          data: [850000, 1020000, 1350000, 980000, 1580000, 1850000],
          borderColor: '#e60012',
          backgroundColor: gradient,
          borderWidth: 3,
          fill: true,
          tension: 0.35,
          pointBackgroundColor: '#e60012',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2.5,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
        {
          label: 'เป้าหมายรายได้ (บาท)',
          data: [900000, 950000, 1100000, 1200000, 1400000, 1600000],
          borderColor: 'rgba(9, 9, 11, 0.4)',
          backgroundColor: gradient2,
          borderWidth: 2,
          borderDash: [6, 4],
          fill: true,
          tension: 0.35,
          pointBackgroundColor: 'rgba(9, 9, 11, 0.6)',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: {
          position: 'top',
          align: 'end',
          labels: {
            color: defaults.color,
            font: { family: defaults.font.family, size: 11, weight: '600' },
            padding: 14,
            usePointStyle: true,
          }
        },
        tooltip: {
          backgroundColor: '#09090b',
          titleFont: { family: defaults.font.family, weight: '700' },
          bodyFont: { family: defaults.font.family },
          borderColor: 'rgba(230, 0, 18, 0.2)',
          borderWidth: 1,
          cornerRadius: 6,
          padding: 12,
          callbacks: {
            label: function(context) {
              return ` ${context.dataset.label}: ฿${context.parsed.y.toLocaleString()}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: defaults.borderColor,
          },
          ticks: {
            color: defaults.color,
            font: { family: defaults.font.family },
            callback: function(value) {
              return '฿' + (value / 1000000).toFixed(1) + 'M';
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: defaults.color,
            font: { family: defaults.font.family }
          }
        }
      },
      animation: {
        duration: 1500,
        easing: 'easeOutCubic'
      }
    }
  });
}


// ========================================
// 10. BACK TO TOP BUTTON
// ========================================
function initBackToTop() {
  const btn = document.getElementById('btnBackTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========================================
// 11. NEWSLETTER HANDLER
// ========================================
function handleNewsletter(event) {
  event.preventDefault();
  const input = event.target.querySelector('.newsletter-input');

  if (input.value) {
    showToast('🎉 สมัครรับข่าวสารสำเร็จ! ขอบคุณค่ะ');
    input.value = '';
  }
}

// ========================================
// 12. TYPING ANIMATION RESTART
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

  // Fade out
  typingElement.style.animation = 'none';
  typingElement.style.opacity = '0';
  typingElement.style.transition = 'opacity 0.3s';

  setTimeout(() => {
    currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
    typingElement.textContent = typingTexts[currentTextIndex];
    typingElement.style.opacity = '1';

    // Restart typing animation
    typingElement.style.animation = 'none';
    typingElement.offsetHeight; // Trigger reflow
    typingElement.style.animation = 'typing 3s steps(40, end), blink 0.75s step-end infinite';
    typingElement.style.transition = '';
  }, 300);
}

// Cycle typing text every 5 seconds
setInterval(cycleTypingText, 5000);
