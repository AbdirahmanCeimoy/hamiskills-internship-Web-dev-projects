const searchInput = document.getElementById('searchInput');
const categoryBtns = document.querySelectorAll('.category-btn');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const products = document.querySelectorAll('.product');

const cartToggle = document.getElementById('cartToggle');
const miniCart = document.getElementById('miniCart');
const closeCart = document.getElementById('closeCart');
const cartItemsEl = document.getElementById('cartItems');
const cartCountEl = document.getElementById('cartCount');
const cartTotalEl = document.getElementById('cartTotal');
const backToTop = document.getElementById('backToTop');
const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');

let cart = [];

function filterProducts() {
  const q = searchInput.value.trim().toLowerCase();
  const selected = document.querySelector('.category-btn.active').dataset.category;
  const maxPrice = parseFloat(priceRange.value);

  products.forEach(prod => {
    const name = prod.dataset.name.toLowerCase();
    const cat = prod.dataset.category.toLowerCase();
    const price = parseFloat(prod.dataset.price);

    const matchesQuery = name.includes(q);
    const matchesCategory = (selected === 'all') || (cat === selected);
    const matchesPrice = price <= maxPrice;

    prod.style.display = (matchesQuery && matchesCategory && matchesPrice) ? 'flex' : 'none';
  });

  priceValue.textContent = `$${maxPrice}`;
}

searchInput.addEventListener('input', filterProducts);
priceRange.addEventListener('input', filterProducts);

categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterProducts();
  });
});

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const product = button.closest('.product');
    const name = product.dataset.name;
    const price = parseFloat(product.dataset.price);

    cart.push({ name, price });
    updateCartUI();

    const old = button.textContent;
    button.textContent = 'Added ✓';
    setTimeout(() => button.textContent = old, 900);
  });
});

function updateCartUI() {
  cartCountEl.textContent = cart.length;
  cartItemsEl.innerHTML = '';

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="empty">Cart is empty</p>';
    cartTotalEl.textContent = '0.00';
    return;
  }

  let total = 0;
  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `<span>${item.name}</span><span>$${item.price.toFixed(2)}</span>`;
    cartItemsEl.appendChild(div);
    total += item.price;
  });

  cartTotalEl.textContent = total.toFixed(2);
}

cartToggle.addEventListener('click', () => miniCart.classList.toggle('active'));
closeCart.addEventListener('click', () => miniCart.classList.remove('active'));

window.addEventListener('scroll', () => {
  backToTop.style.display = (window.scrollY > 300) ? 'block' : 'none';
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

hamburger.addEventListener('click', () => {
  if (navbar.style.display === 'flex') navbar.style.display = 'none';
  else navbar.style.display = 'flex';
});

filterProducts();
updateCartUI();
