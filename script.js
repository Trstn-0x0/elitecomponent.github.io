/**
 * NOVATECH V4.0 - ENTERPRISE ENGINE
 * Sistema completo SPA + Cart + Builder + UI Effects
 */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // 1. AOS ANIMATIONS
    // =========================================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            offset: 30,
            duration: 700,
            easing: 'ease-out-cubic',
        });
    }

    // =========================================================
    // 2. PRELOADER CYBERPUNK
    // =========================================================
    const preloader = document.getElementById('preloader');
    const loaderText = document.querySelector('.loader-text');

    const bootSequence = [
        "VERIFICANDO COMPONENTES...",
        "CARGANDO INTERFAZ NEURAL...",
        "CONECTANDO CON LIMA, PE...",
        "INICIALIZANDO SISTEMA ELITE COMPONENT..."
    ];

    let step = 0;

    if (preloader && loaderText) {

        const bootInterval = setInterval(() => {

            if (step < bootSequence.length) {

                loaderText.innerText = bootSequence[step];
                step++;

            } else {

                clearInterval(bootInterval);

                preloader.style.opacity = '0';

                setTimeout(() => {
                    preloader.remove();
                }, 600);
            }

        }, 500);
    }

    // =========================================================
    // 3. NAVBAR EFFECT
    // =========================================================
    const navbar = document.getElementById('mainNav');

    if (navbar) {

        window.addEventListener('scroll', () => {

            if (window.scrollY > 20) {

                navbar.style.background = 'rgba(3,3,3,0.95)';
                navbar.style.boxShadow =
                    '0 4px 30px rgba(0,0,0,0.5)';

            } else {

                navbar.style.background =
                    'rgba(3,3,3,0.8)';

                navbar.style.boxShadow = 'none';
            }
        });
    }

    // =========================================================
    // 4. CART DRAWER
    // =========================================================
    const cartBtn = document.getElementById('cart-btn');
    const closeDrawer = document.getElementById('close-drawer');
    const cartDrawer = document.getElementById('cart-drawer');

    if (cartBtn && cartDrawer) {

        const toggleDrawer = () => {
            cartDrawer.classList.toggle('active');
        };

        cartBtn.addEventListener('click', toggleDrawer);

        if (closeDrawer) {
            closeDrawer.addEventListener('click', toggleDrawer);
        }
    }

    // =========================================================
    // 5. CART SYSTEM
    // =========================================================
    const cartBody = document.querySelector('.drawer-body');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    let cart = [];
// =========================================================
// IMÁGENES REALES DE LOS COMPONENTES DEL CATÁLOGO
// Compatible con los nombres exactos de tu HTML
// =========================================================

const productImages = {

    // =====================================================
    // GPUs
    // =====================================================

    'NVIDIA RTX 3060 12GB':
        'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=600&q=80',

    'AMD RX 7600 XT 16GB':
        'https://images.unsplash.com/photo-1626025175510-75b281d11ff9?auto=format&fit=crop&w=600&q=80',

    'NVIDIA RTX 4060 Ti 8GB':
        'https://images.unsplash.com/photo-1616843075240-5e5d32e921d7?auto=format&fit=crop&w=600&q=80',

    'AMD RX 7800 XT 16GB':
        'https://images.unsplash.com/photo-1626025175510-75b281d11ff9?auto=format&fit=crop&w=600&q=80',

    'NVIDIA RTX 4070 Super':
        'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=600&q=80',

    'NVIDIA RTX 4080 Super':
        'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=600&q=80',

    'NVIDIA RTX 5090 32GB ROG':
        'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=600&q=80',

    // =====================================================
    // CPUs
    // =====================================================

    'Ryzen 5 5500':
        'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80',

    'Core i5 13400F':
        'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80',

    'Ryzen 5 7600X':
        'https://images.unsplash.com/photo-1620283085068-5aab1fae02f3?auto=format&fit=crop&w=600&q=80',

    'Ryzen 7 7800X3D':
        'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80',

    'Core i7 14700K':
        'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80',

    'Core i9 14900K':
        'https://images.unsplash.com/photo-1620283085068-5aab1fae02f3?auto=format&fit=crop&w=600&q=80',

    'Ryzen 9 7950X3D':
        'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80',

    // =====================================================
    // MOTHERBOARDS
    // =====================================================

    'GIGABYTE A520M K V2':
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',

    'MSI PRO H610M-G':
        'https://images.unsplash.com/photo-1587202372761-cb8dd4fb64b3?auto=format&fit=crop&w=600&q=80',

    'MSI B550M PRO-VDH WIFI':
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',

    'GIGABYTE B760 AORUS ELITE':
        'https://images.unsplash.com/photo-1587202372761-cb8dd4fb64b3?auto=format&fit=crop&w=600&q=80',

    'ASUS TUF B650-PLUS WIFI':
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',

    'ROG Crosshair X670E Hero':
        'https://images.unsplash.com/photo-1587202372761-cb8dd4fb64b3?auto=format&fit=crop&w=600&q=80',

    'ROG Maximus Z790 Hero':
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',

    // =====================================================
    // RAM / SSD
    // =====================================================

    '16GB DDR4 FURY':
        'https://images.unsplash.com/photo-1562976540-04f32e92c019?auto=format&fit=crop&w=600&q=80',

    '1TB WD Black SN850X':
        'https://images.unsplash.com/photo-1541560052-5e137f229371?auto=format&fit=crop&w=600&q=80',

    '32GB DDR5 Corsair RGB':
        'https://images.unsplash.com/photo-1562976540-04f32e92c019?auto=format&fit=crop&w=600&q=80',

    '2TB Samsung 980 Pro':
        'https://images.unsplash.com/photo-1541560052-5e137f229371?auto=format&fit=crop&w=600&q=80',

    '64GB DDR5 Trident Z5':
        'https://images.unsplash.com/photo-1562976540-04f32e92c019?auto=format&fit=crop&w=600&q=80',

    '96GB DDR5 Dominator':
        'https://images.unsplash.com/photo-1562976540-04f32e92c019?auto=format&fit=crop&w=600&q=80',

    '4TB Samsung 990 Pro':
        'https://images.unsplash.com/photo-1541560052-5e137f229371?auto=format&fit=crop&w=600&q=80',

    // =====================================================
    // ENSAMBLAJE / COOLING
    // =====================================================

    'Deepcool AK400 Air':
        'https://images.unsplash.com/photo-1624838634861-1ee06b2082a5?auto=format&fit=crop&w=600&q=80',

    'EVGA 750W Gold':
        'https://images.unsplash.com/photo-1587202372688-662f5979f187?auto=format&fit=crop&w=600&q=80',

    'Corsair 4000D Airflow':
        'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=600&q=80',

    'Lian Li O11 Dynamic EVO':
        'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=600&q=80',

    'NZXT Kraken Elite 360':
        'https://images.unsplash.com/photo-1624838634861-1ee06b2082a5?auto=format&fit=crop&w=600&q=80',

    'MSI MEG Platinum 1200W':
        'https://images.unsplash.com/photo-1587202372688-662f5979f187?auto=format&fit=crop&w=600&q=80',

    'ROG Thor Titanium 1600W':
        'https://images.unsplash.com/photo-1587202372688-662f5979f187?auto=format&fit=crop&w=600&q=80',

    // =====================================================
    // MONITORES
    // =====================================================

    '24" Xiaomi G24i 165Hz':
        'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',

    '27" AOC 24G2 144Hz IPS':
        'https://images.unsplash.com/photo-1552831388-6a0b35077328?auto=format&fit=crop&w=600&q=80',

    '27" ASUS TUF 165Hz 1440p':
        'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',

    '32" Samsung Odyssey G5':
        'https://images.unsplash.com/photo-1541560052-5e137f229371?auto=format&fit=crop&w=600&q=80',

    '34" Xiaomi Ultrawide 144Hz':
        'https://images.unsplash.com/photo-1616588589676-62b3bd4f6bd4?auto=format&fit=crop&w=600&q=80',

    '27" LG UltraGear 240Hz OLED':
        'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',

    '49" Samsung Odyssey G9 OLED':
        'https://images.unsplash.com/photo-1616588589676-62b3bd4f6bd4?auto=format&fit=crop&w=600&q=80',

    // =====================================================
    // PERIFÉRICOS
    // =====================================================

    'Combo Teraware Entry':
        'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80',

    'Redragon Kumara + Griffin':
        'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80',

    'Logitech G203 + G213':
        'https://images.unsplash.com/photo-1615663245857-ac93bb7c3c9c?auto=format&fit=crop&w=600&q=80',

    'HyperX Alloy Core + Pulsefire':
        'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=600&q=80',

    'Razer Huntsman + DeathAdder':
        'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80',

    'Logi G915 + Pro X Superlight':
        'https://images.unsplash.com/photo-1615663245857-ac93bb7c3c9c?auto=format&fit=crop&w=600&q=80',

    'ROG Azoth + ROG Harpe Ace':
        'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=600&q=80'
};
    // LOAD STORAGE
    const savedCart = localStorage.getItem('novatech-cart');

    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    // =========================================================
    // TOAST NOTIFICATION
    // =========================================================
   
   let activeToast = null;
   
   const showToast = (message) => {

    // SI YA EXISTE UN TOAST, ELIMINARLO
    if (activeToast) {
        activeToast.remove();
        activeToast = null;
    }

    const toast = document.createElement('div');

    activeToast = toast;

    toast.className = 'nova-toast';

    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        ${message}
    `;

    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        background: '#111',
        color: '#fff',
        padding: '14px 20px',
        borderRadius: '10px',
        border: '1px solid cyan',
        zIndex: '99999',
        transform: 'translateY(20px)',
        opacity: '0',
        transition: '0.25s ease'
    });

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    });

    setTimeout(() => {

        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';

        setTimeout(() => {

            toast.remove();

            if (activeToast === toast) {
                activeToast = null;
            }

        }, 250);

    }, 1400);
};
    // =========================================================
    // UPDATE CART UI
    // =========================================================
    const updateCartUI = () => {

        // =========================================================
// CLEAR CART
// =========================================================

const clearCartBtn =
    document.getElementById('clear-cart');

if (clearCartBtn) {

    clearCartBtn.addEventListener('click', () => {

        // VACIAR ARRAY
        cart = [];

        // BORRAR STORAGE
        localStorage.removeItem('novatech-cart');

        // ACTUALIZAR UI
        updateCartUI();

        // TOAST
        showToast('🗑️ Carrito vaciado');

    });

}
        if (!cartBody) return;

        cartBody.innerHTML = '';

        let total = 0;

        cart.forEach((item, index) => {

            total += item.price * item.qty;

            cartBody.innerHTML += `
                <div class="cart-item-card">

                    <img src="${item.img}" alt="${item.name}">

                    <div class="flex-grow-1">

                        <h6 class="mb-1">
                            ${item.name}
                        </h6>

                        <small class="text-gray">
                            S/ ${item.price.toFixed(2)}
                        </small>

                        <div class="qty-control">

                            <button 
                                class="qty-minus"
                                data-index="${index}"
                            >
                                -
                            </button>

                            <span>${item.qty}</span>

                            <button 
                                class="qty-plus"
                                data-index="${index}"
                            >
                                +
                            </button>

                        </div>
                    </div>
                </div>
            `;
        });

        // TOTAL
        if (cartTotal) {
            cartTotal.innerText =
                `S/ ${total.toFixed(2)}`;
        }

        // COUNT
        const totalItems = cart.reduce(
            (acc, item) => acc + item.qty,
            0
        );

        if (cartCount) {
            cartCount.innerText = totalItems;
        }

        // STORAGE
        localStorage.setItem(
            'novatech-cart',
            JSON.stringify(cart)
        );

        // PLUS
        document.querySelectorAll('.qty-plus')
            .forEach(btn => {

                btn.addEventListener('click', () => {

                    const i = btn.dataset.index;

                    cart[i].qty++;

                    updateCartUI();
                });
            });

        // MINUS
        document.querySelectorAll('.qty-minus')
            .forEach(btn => {

                btn.addEventListener('click', () => {

                    const i = btn.dataset.index;

                    cart[i].qty--;

                    if (cart[i].qty <= 0) {
                        cart.splice(i, 1);
                    }

                    updateCartUI();
                });
            });
    };

    // INIT CART
    updateCartUI();

    // =========================================================
    // ADD PRODUCT BUTTONS
    // =========================================================
    const cartButtons =
        document.querySelectorAll('.btn-add-cart');

    cartButtons.forEach(btn => {

       btn.addEventListener('click', function (e) {

    // EVITA SPAM CLICK
    if (this.classList.contains('loading')) return;

    this.classList.add('loading');
            e.preventDefault();

            const card =
                this.closest('.premium-card');

            if (!card) return;

         const name =
    card.querySelector('.product-title')
        ?.textContent.trim() || 'Producto';

const priceElement =
    card.querySelector('.price-block');

const priceText =
    priceElement
        ?.textContent
        .replace('S/', '')
        .replace(',', '')
        .trim() || '0';

const img =
    card.querySelector('img')
        ?.getAttribute('src') || '';

const price = parseFloat(priceText);

            const existing = cart.find(
                item => item.name === name
            );

            if (existing) {

                existing.qty++;

            } else {

                cart.push({
                    name,
                    price,
                    img,
                    qty: 1
                });
            }

            updateCartUI();

            // OPEN DRAWER
            if (cartDrawer) {
                cartDrawer.classList.add('active');
            }

            // BUTTON EFFECT
            this.classList.add('added');

            const originalHTML = this.innerHTML;

            this.innerHTML =
                '<i class="fas fa-check"></i>';

            this.style.background =
                'var(--success)';

            this.style.borderColor =
                'var(--success)';

            this.style.color = '#fff';

         setTimeout(() => {

    this.innerHTML = originalHTML;
    this.style = '';
    this.classList.remove('added');
    this.classList.remove('loading');

}, 800);

            showToast(`${name} agregado al carrito`);

        });
    });

    // =========================================================
    // ADD FULL BUILD
    // =========================================================
    const addBuildBtn =
        document.getElementById('add-build-cart');

    if (addBuildBtn) {

        addBuildBtn.addEventListener('click', () => {

            const selects = [
                'build-cpu',
                'build-mobo',
                'build-gpu',
                'build-ram',
                'build-ssd',
                'build-psu',
                'build-cooler',
                'build-case',
                'build-monitor',
                'build-perif'
            ];

            let added = 0;

            selects.forEach(id => {

                const select =
                    document.getElementById(id);

                if (!select) return;

                const option =
                    select.options[select.selectedIndex];

                const price =
                    parseFloat(option.value) || 0;

                if (price <= 0) return;

                const name = option.text;

            const img =
    productImages[name] ||
    'https://cdn-icons-png.flaticon.com/512/3659/3659899.png';
                const existing = cart.find(
                    item => item.name === name
                );

                if (existing) {

                    existing.qty++;

                } else {

                    cart.push({
                        name,
                        price,
                        img,
                        qty: 1
                    });
                }

                added++;
            });

            updateCartUI();

            if (cartDrawer) {
                cartDrawer.classList.add('active');
            }

            addBuildBtn.innerHTML =
                '<i class="fas fa-check me-2"></i> BUILD AGREGADO';

            addBuildBtn.style.background =
                'var(--success)';

            setTimeout(() => {

                addBuildBtn.innerHTML =
                    '<i class="fas fa-microchip me-2"></i> ENSAMBLAR Y AGREGAR';

                addBuildBtn.style.background = '';

            }, 2000);

            showToast(
                `${added} componentes agregados`
            );
        });
    }

    // =========================================================
    // 6. SMOOTH SCROLL
    // =========================================================
    document.querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener('click', function (e) {

                const targetId =
                    this.getAttribute('href');

                if (
                    this.hasAttribute('data-bs-toggle')
                ) return;

                if (targetId === '#') return;

                const targetElement =
                    document.querySelector(targetId);

                if (targetElement) {

                    e.preventDefault();

                    const offset = 80;

                    const elementPosition =
                        targetElement
                            .getBoundingClientRect().top;

                    const offsetPosition =
                        elementPosition +
                        window.pageYOffset -
                        offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

    // =========================================================
    // 7. NOVA BUILDER ENGINE
    // =========================================================
    const initNovaBuilder = () => {

        const partSelects = [
            'build-cpu',
            'build-mobo',
            'build-gpu',
            'build-ram',
            'build-ssd',
            'build-psu',
            'build-cooler',
            'build-case',
            'build-monitor',
            'build-perif'
        ];

        // UI
        const displayTotal =
            document.getElementById('calc-total');

        const displayWatts =
            document.getElementById('calc-watts');

        const barWatts =
            document.getElementById('bar-watts');

        const displayTier =
            document.getElementById('tier-text');

        const barTier =
            document.getElementById('bar-tier');

        const statusCompat =
            document.getElementById('status-compat');

        // FORMAT
        const formatCurrency = (num) => {

            return new Intl.NumberFormat(
                'es-PE',
                {
                    style: 'currency',
                    currency: 'PEN'
                }
            ).format(num);
        };

        // =====================================================
        // CALCULATE SYSTEM
        // =====================================================
        const calculateSystem = () => {

            let totalCost = 0;
            let totalWatts = 0;
            let partsSelected = 0;

            partSelects.forEach(id => {

                const select =
                    document.getElementById(id);

                if (!select) return;

                const option =
                    select.options[
                        select.selectedIndex
                    ];

                const price =
                    parseFloat(option.value) || 0;

                const watts =
                    parseInt(
                        option.getAttribute(
                            'data-watts'
                        )
                    ) || 0;

                if (price > 0) {
                    partsSelected++;
                }

                totalCost += price;
                totalWatts += watts;
            });

            // TOTAL
            if (displayTotal) {
                displayTotal.innerText =
                    formatCurrency(totalCost);
            }

            // WATTS
            const baseWatts = 50;

            const realWatts =
                totalWatts > 0
                    ? totalWatts + baseWatts
                    : 0;

            if (displayWatts) {
                displayWatts.innerText =
                    `${realWatts} W`;
            }

            if (barWatts) {

                const wattsPercent =
                    Math.min(
                        (realWatts / 1200) * 100,
                        100
                    );

                barWatts.style.width =
                    `${wattsPercent}%`;

                if (wattsPercent > 75) {

                    barWatts.className =
                        'progress-bar bg-danger';

                } else {

                    barWatts.className =
                        'progress-bar bg-warning';
                }
            }

            // TIER
            let tier = 'Pendiente';
            let tierColor = 'bg-secondary';
            let tierPercent = 0;

            if (partsSelected > 0) {

                if (totalCost < 2500) {

                    tier =
                        'Entry Level Gamer';

                    tierColor = 'bg-success';

                    tierPercent = 33;

                } else if (
                    totalCost >= 2500 &&
                    totalCost < 6000
                ) {

                    tier =
                        'Mid-High Performance';

                    tierColor = 'bg-info';

                    tierPercent = 66;

                } else {

                    tier =
                        'Enthusiast / Ultra 4K';

                    tierColor = 'bg-primary';

                    tierPercent = 100;
                }
            }

            if (displayTier) {
                displayTier.innerText = tier;
            }

            if (barTier) {

                barTier.style.width =
                    `${tierPercent}%`;

                barTier.className =
                    `progress-bar ${tierColor}`;
            }

            // COMPATIBILITY
            if (statusCompat) {

                if (partsSelected === 0) {

                    statusCompat.innerHTML =
                        '<i class="fas fa-circle-notch fa-spin text-primary me-2"></i> Esperando componentes...';

                    statusCompat.className =
                        'mb-2 text-primary';

                } else if (partsSelected < 4) {

                    statusCompat.innerHTML =
                        '<i class="fas fa-exclamation-triangle text-warning me-2"></i> Faltan componentes clave';

                    statusCompat.className =
                        'mb-2 text-warning';

                } else {

                    statusCompat.innerHTML =
                        '<i class="fas fa-check-circle text-success me-2"></i> Compatibilidad: ÓPTIMA';

                    statusCompat.className =
                        'mb-2 text-success';

                    if (displayTotal) {

                        displayTotal.style.transform =
                            'scale(1.05)';

                        setTimeout(() => {

                            displayTotal.style.transform =
                                'scale(1)';

                        }, 200);
                    }
                }
            }
        };

        // EVENTS
        partSelects.forEach(id => {

            const el =
                document.getElementById(id);

            if (el) {
                el.addEventListener(
                    'change',
                    calculateSystem
                );
            }
        });

        // INIT
        calculateSystem();
    };

    // INIT BUILDER
    if (
        document.getElementById('pc-builder')
    ) {
        initNovaBuilder();
    }

// INIT BUILDER
if (
    document.getElementById('pc-builder')
) {
    initNovaBuilder();
}

// =========================================================
// WHATSAPP CHECKOUT
// =========================================================

const checkoutBtn =
    document.getElementById('checkout-btn');

if (checkoutBtn) {

    checkoutBtn.addEventListener('click', () => {

        if (cart.length === 0) {

            showToast('El carrito está vacío');
            return;
        }

        let message = '';

        if(cart.length === 1){

            message +=
            'Buenas tardes, deseo este producto. No sé si estará disponible:%0A%0A';

        }else{

            message +=
            'Buenas tardes, deseo estos productos. No sé si estarán disponibles:%0A%0A';

        }

        let total = 0;

        cart.forEach(item => {

            message +=
                `• ${item.name} x${item.qty} - S/ ${(item.price * item.qty).toFixed(2)}%0A`;

            total += item.price * item.qty;
        });

        message +=
            `%0A TOTAL: S/ ${total.toFixed(2)}`;

        const phone = '51957666654';

        const url =
            `https://wa.me/${phone}?text=${message}`;

        window.open(url, '_blank');

    });

}

const searchInput = document.getElementById("search-input");
const searchToggle = document.getElementById("search-toggle");

if (searchInput && searchToggle) {

    searchToggle.addEventListener("click", () => {
        searchInput.classList.toggle("active");
        searchInput.focus();
    });

}

searchInput.addEventListener("keyup", function () {

    const value = this.value.toLowerCase().trim();

    const tabPanes = document.querySelectorAll(".tab-pane");

    if (value === "") {

        document.querySelectorAll(".col-xl-3").forEach(col => {
            col.style.display = "block";
        });

        tabPanes.forEach((tab, index) => {

            tab.style.display = "block";

            if (index === 0) {
                tab.classList.add("show", "active");
            } else {
                tab.classList.remove("show", "active");
            }

        });

        return;
    }

    let firstVisibleTab = null;

    tabPanes.forEach(tab => {

        let found = false;

        const products = tab.querySelectorAll(".col-xl-3");

        products.forEach(product => {

            const text = product.textContent.toLowerCase();

            if (text.includes(value)) {
                product.style.display = "block";
                found = true;
            } else {
                product.style.display = "none";
            }

        });

        if (found) {

            tab.style.display = "block";

            if (!firstVisibleTab) {
                firstVisibleTab = tab;
            }

        } else {

            tab.style.display = "none";
            tab.classList.remove("show", "active");

        }

    });

    if (firstVisibleTab) {

        tabPanes.forEach(tab => {
            tab.classList.remove("show", "active");
        });

        firstVisibleTab.classList.add("show", "active");

    }

});

});





