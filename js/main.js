// Основной скрипт магазина ByteShop.
// Здесь подключаются функции из ПЗ №15, рендер каталога,
// фильтрация, поиск, сортировка, корзина, модальное окно и валидация формы.

// Сообщаем в консоль, что файл подключён.
console.log('Файл main.js подключён');

// ===============================
// Функции из практической работы №15
// ===============================

// Функция форматирования цены.
function formatPrice(price) {
  const numericPrice = Number(price);

  // Проверяем, что цена является корректным числом.
  if (!Number.isFinite(numericPrice) || numericPrice < 0) {
    return '0 ₽';
  }

  return `${numericPrice.toLocaleString('ru-RU')} ₽`;
}

// Функция расчёта размера скидки.
function calculateDiscount(price, discountPercent) {
  const numericPrice = Number(price);
  const numericDiscountPercent = Number(discountPercent);

  if (!Number.isFinite(numericPrice) || !Number.isFinite(numericDiscountPercent)) {
    return 0;
  }

  // Арифметические операторы: умножение и деление.
  return numericPrice * numericDiscountPercent / 100;
}

// Функция расчёта итоговой цены после скидки.
function calculateFinalPrice(price, discountPercent) {
  const numericPrice = Number(price);
  const discountValue = calculateDiscount(numericPrice, discountPercent);

  // Арифметический оператор: вычитание.
  return numericPrice - discountValue;
}

// Функция определения статуса товара.
function getProductStatus(productItem) {
  // Логический оператор && и операторы сравнения.
  if (productItem.isAvailable === true && productItem.price > 0) {
    return 'В наличии';
  }

  return 'Нет в наличии';
}

// Функция формирования краткого описания товара.
function createProductSummary(productItem) {
  const finalPrice = calculateFinalPrice(productItem.price, productItem.discountPercent);
  const status = getProductStatus(productItem);

  // Оператор сравнения.
  const hasDiscount = productItem.discountPercent > 0;

  let summary = `${productItem.title}: ${formatPrice(finalPrice)}. Статус: ${status}.`;

  if (hasDiscount) {
    summary += ` Скидка: ${productItem.discountPercent}%.`;
  }

  return summary;
}

// ===============================
// Проверка объекта товара и вывод в консоль
// ===============================
if (typeof product !== 'undefined') {
  console.log('Объект товара из data.js:');
  console.log(product);
  console.table(product);

  console.log('Цена:', formatPrice(product.price));
  console.log('Скидка:', calculateDiscount(product.price, product.discountPercent));
  console.log('Итоговая цена:', calculateFinalPrice(product.price, product.discountPercent));
  console.log('Статус:', getProductStatus(product));
  console.log('Краткое описание:', createProductSummary(product));
}

// ===============================
// Состояние каталога
// ===============================
let currentCategory = 'cpu';
let currentSort = 'default';
let currentSearch = '';
let cartCount = 0;

// ===============================
// Рендер карточки товара
// ===============================
function renderProductCard(item) {
  // Используем document.createElement, чтобы не применять innerHTML к пользовательским данным.
  const article = document.createElement('article');
  article.className = 'product-card';

  // Медиа-ссылка.
  const media = document.createElement('a');
  media.className = 'product-card__media';
  media.href = 'product.html';

  const image = document.createElement('img');
  image.className = 'product-card__image';
  image.src = item.image;
  image.alt = item.title;
  image.width = 640;
  image.height = 480;
  image.loading = 'lazy';
  media.appendChild(image);

  // Тело карточки.
  const body = document.createElement('div');
  body.className = 'product-card__body';

  const brand = document.createElement('p');
  brand.className = 'product-card__brand';
  brand.textContent = item.brand;

  const title = document.createElement('h3');
  title.className = 'product-card__title';

  const titleLink = document.createElement('a');
  titleLink.href = 'product.html';
  titleLink.textContent = item.title;
  title.appendChild(titleLink);

  // Список характеристик.
  const specs = document.createElement('ul');
  specs.className = 'product-card__specs';
  item.specs.forEach((spec) => {
    const li = document.createElement('li');
    li.textContent = spec;
    specs.appendChild(li);
  });

  // Футер карточки с ценой и кнопкой.
  const footer = document.createElement('div');
  footer.className = 'product-card__footer';

  const priceBlock = document.createElement('div');
  priceBlock.className = 'product-card__price';

  const currentPrice = document.createElement('span');
  currentPrice.className = 'product-card__current';
  currentPrice.textContent = formatPrice(calculateFinalPrice(item.price, item.discountPercent));
  priceBlock.appendChild(currentPrice);

  if (item.oldPrice && item.oldPrice > 0) {
    const oldPrice = document.createElement('span');
    oldPrice.className = 'product-card__old';
    oldPrice.textContent = formatPrice(item.oldPrice);
    priceBlock.appendChild(oldPrice);
  }

  const cartButton = document.createElement('button');
  cartButton.className = 'product-card__cart';
  cartButton.type = 'button';
  cartButton.textContent = '+';
  cartButton.dataset.product = item.title;
  cartButton.setAttribute('aria-label', `Добавить ${item.title} в корзину`);

  footer.appendChild(priceBlock);
  footer.appendChild(cartButton);

  body.appendChild(brand);
  body.appendChild(title);
  body.appendChild(specs);
  body.appendChild(footer);

  article.appendChild(media);
  article.appendChild(body);

  // Бейдж.
  if (item.badge) {
    const badge = document.createElement('span');
    badge.className = `product-card__badge product-card__badge--${item.badge}`;

    if (item.badge === 'hit') badge.textContent = 'Хит';
    else if (item.badge === 'new') badge.textContent = 'Новинка';
    else if (item.badge === 'discount') badge.textContent = `-${item.discountPercent}%`;

    article.appendChild(badge);
  }

  return article;
}

// ===============================
// Фильтрация, поиск, сортировка
// ===============================
function getFilteredProducts() {
  let list = products.slice();

  // Фильтр по категории.
  if (currentCategory !== 'all') {
    list = list.filter((item) => item.category === currentCategory);
  }

  // Поиск по названию.
  if (currentSearch.trim() !== '') {
    const query = currentSearch.trim().toLowerCase();
    list = list.filter((item) => item.title.toLowerCase().includes(query));
  }

  // Сортировка.
  if (currentSort === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'name') {
    list.sort((a, b) => a.title.localeCompare(b.title));
  }

  return list;
}

// ===============================
// Рендер каталога
// ===============================
function renderCatalog() {
  const grid = document.getElementById('catalog-grid');
  const empty = document.getElementById('catalog-empty');

  if (!grid) return;

  // Очищаем сетку.
  grid.innerHTML = '';

  const list = getFilteredProducts();

  if (list.length === 0) {
    if (empty) empty.hidden = false;
    return;
  }

  if (empty) empty.hidden = true;

  // Создаём карточки через document.createElement.
  list.forEach((item) => {
    const card = renderProductCard(item);
    grid.appendChild(card);
  });

  // Навешиваем обработчики на кнопки «+».
  attachCartButtons();
}

// ===============================
// Корзина: счётчик и toast
// ===============================
function updateCartCount() {
  const counters = document.querySelectorAll('[data-cart-count]');
  counters.forEach((el) => {
    el.textContent = cartCount;
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.hidden = false;

  clearTimeout(showToast.timerId);
  showToast.timerId = setTimeout(() => {
    toast.hidden = true;
  }, 2500);
}

function attachCartButtons() {
  const buttons = document.querySelectorAll('.product-card__cart, .product-page__cart');

  buttons.forEach((button) => {
    // Удаляем старый обработчик, если он был.
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);

    newButton.addEventListener('click', () => {
      const productName = newButton.dataset.product;
      cartCount += 1;
      updateCartCount();
      showToast(`«${productName}» добавлен в корзину`);
    });
  });
}

// ===============================
// Вкладки категорий
// ===============================
function attachTabs() {
  const tabs = document.querySelectorAll('.catalog__tab');
  if (tabs.length === 0) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('catalog__tab--active'));
      tab.classList.add('catalog__tab--active');

      currentCategory = tab.dataset.tab;
      renderCatalog();
    });
  });
}

// ===============================
// Поиск и сортировка
// ===============================
function attachToolbar() {
  const searchInput = document.getElementById('catalog-search');
  const sortSelect = document.getElementById('catalog-sort');

  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      currentSearch = event.target.value;
      renderCatalog();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (event) => {
      currentSort = event.target.value;
      renderCatalog();
    });
  }
}

// ===============================
// Модальное окно
// ===============================
function attachModal() {
  const orderDialog = document.getElementById('order-dialog');
  const closeDialogButton = document.getElementById('close-order-dialog');

  if (closeDialogButton && orderDialog) {
    closeDialogButton.addEventListener('click', () => {
      orderDialog.close();
    });
  }
}

// ===============================
// Валидация формы
// ===============================
function attachForms() {
  const forms = document.querySelectorAll('.order-form');
  const successMessage = document.getElementById('success-message');

  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      // Сбрасываем предыдущие признаки ошибок.
      const formElements = Array.from(form.elements);
      formElements.forEach((element) => {
        if (element.willValidate) {
          element.removeAttribute('aria-invalid');
        }
      });

      // Проверяем встроенные HTML-ограничения.
      if (!form.checkValidity()) {
        formElements.forEach((element) => {
          if (element.willValidate && !element.checkValidity()) {
            element.setAttribute('aria-invalid', 'true');
          }
        });
        form.reportValidity();
        return;
      }

      // Показываем сообщение об успешной отправке.
      if (successMessage) {
        successMessage.hidden = false;
        setTimeout(() => {
          successMessage.hidden = true;
        }, 3000);
      }

      showToast('Заявка отправлена!');
      form.reset();

      // Закрываем модальное окно, если форма находится в нём.
      const dialog = form.closest('dialog');
      if (dialog) {
        dialog.close();
      }
    });
  });
}

// ===============================
// Инициализация
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM загружен, инициализация ByteShop');

  renderCatalog();
  attachTabs();
  attachToolbar();
  attachCartButtons();
  attachModal();
  attachForms();
  updateCartCount();
});