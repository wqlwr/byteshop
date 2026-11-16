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
let currentCategory = 'all';
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
  media.href = `product.html?id=${item.id}`;

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
  titleLink.href = `product.html?id=${item.id}`;
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

// Подсвечиваем нужную кнопку и перерисовываем сетку.
function setCategory(category) {
  currentCategory = category;

  document.querySelectorAll('.catalog__tab').forEach((tab) => {
    tab.classList.toggle('catalog__tab--active', tab.dataset.tab === category);
  });

  renderCatalog();
}

// Категория из адреса вида catalog.html#catalog-gpu.
function getCategoryFromHash() {
  const match = window.location.hash.match(/^#catalog-([a-z]+)$/);

  if (!match || !categories[match[1]]) return null;

  return match[1];
}

function attachTabs() {
  const tabs = document.querySelectorAll('.catalog__tab');
  if (tabs.length === 0) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      setCategory(tab.dataset.tab);
    });
  });

  // Если на страницу пришли по ссылке из блока категорий.
  window.addEventListener('hashchange', () => {
    const category = getCategoryFromHash();
    if (category) setCategory(category);
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
// Карточка товара на странице product.html
// ===============================

// Названия категорий в единственном числе — для alt картинки.
const categoryAltWords = {
  cpu: 'Процессор',
  gpu: 'Видеокарта',
  mb: 'Материнская плата',
  ram: 'Оперативная память',
  ssd: 'Накопитель',
  psu: 'Блок питания'
};

// Товар берём по параметру ?id=, иначе показываем первый из массива.
function getProductFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id'));
  const found = products.find((item) => item.id === id);

  return found || products[0];
}

// Подпись бейджа: «Хит», «Новинка» или скидка в процентах.
function getBadgeText(item) {
  if (item.badge === 'hit') return 'Хит';
  if (item.badge === 'new') return 'Новинка';
  if (item.badge === 'discount') return `-${item.discountPercent}%`;

  return '';
}

// Рейтинг в виде звёзд: ★★★★☆.
function getStarsText(rating) {
  const filled = Math.round(Number(rating)) || 0;
  const stars = Math.min(Math.max(filled, 0), 5);

  return '★'.repeat(stars) + '☆'.repeat(5 - stars);
}

// Правильная форма слова «отзыв» для числа.
function getReviewsWord(count) {
  const lastTwo = Math.abs(Number(count)) % 100;
  const lastOne = lastTwo % 10;

  if (lastTwo > 10 && lastTwo < 20) return 'отзывов';
  if (lastOne === 1) return 'отзыв';
  if (lastOne >= 2 && lastOne <= 4) return 'отзыва';

  return 'отзывов';
}

// Заполняем страницу товара данными из массива products.
function renderProductPage() {
  const page = document.getElementById('product-page');
  if (!page) return;

  const item = getProductFromUrl();
  const finalPrice = calculateFinalPrice(item.price, item.discountPercent);
  const isInStock = item.isAvailable === true;

  // Заголовок вкладки и хлебные крошки.
  document.title = `${item.title} — ByteShop`;

  const breadcrumb = document.getElementById('product-breadcrumb');
  if (breadcrumb) breadcrumb.textContent = item.title;

  // Бейдж на картинке.
  const badge = document.getElementById('product-badge');
  if (badge) {
    const badgeText = getBadgeText(item);
    badge.textContent = badgeText;
    badge.hidden = badgeText === '';
  }

  // Картинка.
  const image = document.getElementById('product-image');
  if (image) {
    image.src = item.image;
    image.alt = `${categoryAltWords[item.category] || 'Товар'} ${item.title}`;
  }

  // Основные данные.
  const brand = document.getElementById('product-brand');
  if (brand) brand.textContent = item.brand;

  const title = document.getElementById('product-title');
  if (title) title.textContent = item.title;

  // Рейтинг и число отзывов.
  const stars = document.getElementById('product-stars');
  if (stars) stars.textContent = getStarsText(item.rating);

  const rating = document.getElementById('product-rating');
  if (rating) rating.textContent = Number(item.rating).toFixed(1);

  const reviewCount = document.getElementById('product-review-count');
  if (reviewCount) {
    reviewCount.textContent = `· ${item.reviewCount} ${getReviewsWord(item.reviewCount)}`;
  }

  // Цена, старая цена и скидка.
  const price = document.getElementById('product-price');
  if (price) price.textContent = formatPrice(finalPrice);

  const oldPrice = document.getElementById('product-old-price');
  if (oldPrice) {
    const hasOldPrice = item.oldPrice && item.oldPrice > 0;
    oldPrice.textContent = hasOldPrice ? formatPrice(item.oldPrice) : '';
    oldPrice.hidden = !hasOldPrice;
  }

  const discount = document.getElementById('product-discount');
  if (discount) {
    const hasDiscount = item.discountPercent > 0;
    discount.textContent = hasDiscount ? `-${item.discountPercent}%` : '';
    discount.hidden = !hasDiscount;
  }

  // Наличие.
  const availability = document.getElementById('product-availability');
  if (availability) {
    availability.textContent = getProductStatus(item);
    availability.classList.toggle('product-page__availability--out', !isInStock);
  }

  // Короткое описание и блок «Описание».
  const descriptionTexts = item.description || [];

  const text = document.getElementById('product-text');
  if (text) text.textContent = descriptionTexts[0] || '';

  const description = document.getElementById('product-description');
  if (description) {
    description.innerHTML = '';

    descriptionTexts.forEach((paragraph) => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      description.appendChild(p);
    });
  }

  // Кнопка «В корзину».
  const cartButton = document.getElementById('product-cart');
  if (cartButton) {
    cartButton.dataset.product = item.title;
    cartButton.setAttribute('aria-label', `Добавить ${item.title} в корзину`);
    cartButton.disabled = !isInStock;
    cartButton.textContent = isInStock ? 'В корзину' : 'Нет в наличии';
  }

  // Таблица характеристик.
  const specsBody = document.getElementById('product-specs-body');
  if (specsBody) {
    specsBody.innerHTML = '';

    const rows = [
      ['Категория', categories[item.category]],
      ...(item.details || []),
      ['Гарантия', '36 месяцев'],
      ['Наличие', getProductStatus(item)]
    ];

    rows.forEach(([name, value]) => {
      const tr = document.createElement('tr');

      const th = document.createElement('th');
      th.scope = 'row';
      th.textContent = name;

      const td = document.createElement('td');
      td.textContent = value;

      tr.appendChild(th);
      tr.appendChild(td);
      specsBody.appendChild(tr);
    });
  }

  const caption = document.getElementById('product-specs-caption');
  if (caption) caption.textContent = `Характеристики: ${item.title}`;
}

// ===============================
// Инициализация
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM загружен, инициализация ByteShop');

  renderProductPage();
  setCategory(getCategoryFromHash() || 'all');
  attachTabs();
  attachToolbar();
  attachCartButtons();
  attachModal();
  attachForms();
  updateCartCount();
});