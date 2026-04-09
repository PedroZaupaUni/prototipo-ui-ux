const STORAGE_KEY = 'prototipo-ui-ux-cart';

const restaurants = [
  { name: 'Bella Pizza', meta: '4.8 · Pizza', badge: '20 min' },
  { name: 'Sabor Grill', meta: '4.7 · Grill', badge: '25 min' },
  { name: 'Massa Prime', meta: '4.9 · Massas', badge: '18 min' },
  { name: 'Doce Ponto', meta: '4.6 · Sobremesas', badge: '15 min' }
];

const categories = [
  { title: 'Pizza', icon: '🍕' },
  { title: 'Lanches', icon: '🍔' },
  { title: 'Sobremesas', icon: '🍰' }
];

const recents = [
  { label: 'Pizza', short: 'P' },
  { label: 'Combo', short: 'C' },
  { label: 'Sushi', short: 'S' },
  { label: 'Bolo', short: 'B' },
  { label: 'Açaí', short: 'A' }
];

const featuredItems = [
  { id: 'pizza-calabresa', title: 'Pizza Calabresa', description: 'Molho artesanal, queijo e calabresa.', price: 39.9 },
  { id: 'combo-burger', title: 'Combo Burger', description: 'Hambúrguer artesanal com fritas.', price: 28.9 },
  { id: 'acai-especial', title: 'Açaí Especial', description: 'Açaí cremoso com banana e granola.', price: 18.0 }
];

const flavors = [
  { id: 'calabresa', title: 'Calabresa', description: 'Calabresa fatiada, cebola roxa e queijo.', price: 42.9 },
  { id: 'frango', title: 'Frango', description: 'Frango desfiado, milho e requeijão.', price: 39.9 },
  { id: 'portuguesa', title: 'Portuguesa', description: 'Presunto, ovo, cebola, ervilha e queijo.', price: 44.9 }
];

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(entry => entry.id === item.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart(cart);
  updateCartCount();
  showToast(`${item.title} adicionado ao carrinho.`);
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('[data-cart-count]').forEach(element => {
    element.textContent = count;
  });
}

function showToast(message) {
  const previous = document.querySelector('.toast');
  if (previous) previous.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2200);
}

function createRestaurantCard(item) {
  return `
    <article class="restaurant-card">
      <div class="restaurant-card__thumb">
        <span class="restaurant-card__badge">${item.badge}</span>
      </div>
      <div class="restaurant-card__body">
        <h3 class="restaurant-card__title">${item.name}</h3>
        <p class="restaurant-card__meta">${item.meta}</p>
      </div>
    </article>
  `;
}

function createCategoryCard(item) {
  return `
    <article class="category-card">
      <div class="category-card__icon" aria-hidden="true">${item.icon}</div>
      <h3 class="category-card__title">${item.title}</h3>
    </article>
  `;
}

function createRecentCard(item) {
  return `
    <article class="recent-item">
      <div class="recent-item__bubble" aria-hidden="true">${item.short}</div>
      <span class="recent-item__label">${item.label}</span>
    </article>
  `;
}

function createFeaturedCard(item) {
  return `
    <article class="feature-card">
      <div class="feature-card__content">
        <h3 class="feature-card__title">${item.title}</h3>
        <p class="feature-card__meta">${item.description}</p>
        <strong class="feature-card__price">${formatCurrency(item.price)}</strong>
      </div>
      <div class="feature-card__thumb-wrap">
        <div class="feature-card__thumb" aria-hidden="true">🍽️</div>
        <button class="feature-card__cta" type="button" data-add-id="${item.id}" aria-label="Adicionar ${item.title}">+</button>
      </div>
    </article>
  `;
}

function createFlavorCard(item) {
  return `
    <article class="product-option">
      <div class="product-option__content">
        <h3 class="product-option__title">${item.title}</h3>
        <p class="product-option__description">${item.description}</p>
        <strong class="product-option__price">${formatCurrency(item.price)}</strong>
      </div>
      <button class="product-option__cta" type="button" data-add-id="${item.id}" aria-label="Adicionar ${item.title}">+</button>
    </article>
  `;
}

function renderHome() {
  const restaurantList = document.getElementById('restaurant-list');
  const categoryList = document.getElementById('category-list');
  const recentList = document.getElementById('recent-list');
  const featuredList = document.getElementById('featured-list');

  if (restaurantList) restaurantList.innerHTML = restaurants.map(createRestaurantCard).join('');
  if (categoryList) categoryList.innerHTML = categories.map(createCategoryCard).join('');
  if (recentList) recentList.innerHTML = recents.map(createRecentCard).join('');
  if (featuredList) featuredList.innerHTML = featuredItems.map(createFeaturedCard).join('');
}

function renderProduct() {
  const flavorList = document.getElementById('flavor-list');
  if (flavorList) flavorList.innerHTML = flavors.map(createFlavorCard).join('');

  const addFeaturedButton = document.getElementById('add-featured-product');
  if (addFeaturedButton) {
    addFeaturedButton.addEventListener('click', () => {
      addToCart({ id: 'pizza-da-casa', title: 'Pizza da Casa', price: 39.9 });
      window.location.href = 'carrinho.html';
    });
  }
}

function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const subtotalElement = document.getElementById('subtotal-value');
  const totalElement = document.getElementById('total-value');
  const checkoutButton = document.getElementById('checkout-button');
  const cart = getCart();

  if (!cartItemsContainer || !subtotalElement || !totalElement) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-row">
        <div>
          <p class="cart-row__title">Seu carrinho está vazio</p>
          <p class="cart-row__meta">Adicione um item na tela de produto.</p>
        </div>
        <a class="text-action" href="produto.html">Ver produto</a>
      </div>
    `;
  } else {
    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="cart-row">
        <div>
          <p class="cart-row__title">${item.quantity}x ${item.title}</p>
          <p class="cart-row__meta">Item selecionado para entrega.</p>
        </div>
        <strong>${formatCurrency(item.price * item.quantity)}</strong>
      </div>
    `).join('');
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + 5;
  subtotalElement.textContent = formatCurrency(subtotal);
  totalElement.textContent = formatCurrency(total);

  if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Adicione itens antes de finalizar o pedido.');
        return;
      }
      showToast('Pedido estático confirmado com sucesso.');
    });
  }
}

function bindAddButtons() {
  document.addEventListener('click', event => {
    const target = event.target.closest('[data-add-id]');
    if (!target) return;

    const itemId = target.getAttribute('data-add-id');
    const item = [...featuredItems, ...flavors].find(entry => entry.id === itemId);
    if (!item) return;

    addToCart(item);
  });
}

function init() {
  updateCartCount();
  bindAddButtons();

  const page = document.body.dataset.page;
  if (page === 'home') renderHome();
  if (page === 'produto') renderProduct();
  if (page === 'carrinho') renderCart();
}

window.addEventListener('DOMContentLoaded', init);
