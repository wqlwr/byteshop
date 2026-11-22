// Основной скрипт магазина ByteShop.
// Здесь подключаются функции из ПЗ №15, рендер каталога,
// фильтрация, поиск, сортировка, корзина, модальное окно и валидация формы.
// ARIA проставляется только там, где обычного HTML недостаточно.

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
  const finalPrice = numericPrice - discountValue;

  // Цену без скидки оставляем как есть.
  if (!(discountValue > 0)) return Math.round(finalPrice);

  // Цену со скидкой округляем до 10 ₽,
  // чтобы не появлялись суммы вида 89 991 ₽.
  return Math.round(finalPrice / 10) * 10;
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
// Вспомогательные функции доступности
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

// Текст только для скринридера. Класс .visually-hidden уже есть в style.css.
function createScreenReaderText(text) {
  const span = document.createElement('span');
  span.className = 'visually-hidden';
  span.textContent = text;
  return span;
}

// Записываем значение вместе со скрытой подписью.
// Без подписи скринридер читает две цены подряд и не понимает, где какая.
function setLabelledValue(element, label, value) {
  element.textContent = '';
  element.appendChild(createScreenReaderText(label));
  element.appendChild(document.createTextNode(value));
}

// Декоративные элементы: эмодзи и инициалы не должны читаться вслух.
// Скринридер озвучивает 📍 как «round pushpin», а 🛒 — как «shopping trolley».
function markDecorativeElements() {
  const decorativeSelectors = [
    '.site-footer__icon',
    '.feature-card__icon',
    '.chat-button__icon',
    '.icon-button__icon',
    '.category-card__code',
    '.team-card__avatar',
    '.account-profile__avatar',
    '[data-cart-count]'
  ];

  document.querySelectorAll(decorativeSelectors.join(', ')).forEach((element) => {
    element.setAttribute('aria-hidden', 'true');
  });
}

// Звёзды в отзывах — это оценка, а не текст. Прячем символы
// и добавляем рядом текстовую расшифровку «Оценка: 5 из 5».
function describeReviewStars() {
  document.querySelectorAll('.review-card__stars').forEach((element) => {
    if (element.dataset.described === 'true') return;

    // В разметке уже стоит готовая подпись — дублировать её не нужно.
    const next = element.nextElementSibling;

    if (next && next.classList.contains('visually-hidden')) {
      element.setAttribute('aria-hidden', 'true');
      element.dataset.described = 'true';
      return;
    }

    const filled = (element.textContent.match(/★/g) || []).length;

    element.setAttribute('aria-hidden', 'true');
    element.dataset.described = 'true';

    const description = createScreenReaderText(`Оценка: ${filled} из 5`);
    element.parentNode.insertBefore(description, element.nextSibling);
  });
}

// Подписи блоков навигации и отметка текущей страницы.
// На странице несколько nav, поэтому без aria-label их не различить.
function improveNavigation() {
  const headerNav = document.querySelector('.site-nav');

  if (headerNav && !headerNav.hasAttribute('aria-label')) {
    headerNav.setAttribute('aria-label', 'Основная навигация');
  }

  const breadcrumbs = document.querySelector('nav.breadcrumbs');

  if (breadcrumbs && !breadcrumbs.hasAttribute('aria-label')) {
    breadcrumbs.setAttribute('aria-label', 'Хлебные крошки');
  }

  // Подвал: имя блока берём из его видимого заголовка.
  document.querySelectorAll('.site-footer nav').forEach((nav) => {
    if (nav.hasAttribute('aria-label')) return;

    const title = nav.querySelector('.site-footer__title');

    if (title) {
      nav.setAttribute('aria-label', title.textContent.trim());
    }
  });

  // Текущая страница определяется по адресу, чтобы не забыть атрибут в разметке.
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.site-nav__link').forEach((link) => {
    if (link.getAttribute('href') === currentPage) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

// Живые области: без role="status" сообщение появляется молча.
function initStatusRegions() {
  const toast = document.getElementById('toast');

  if (toast) {
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.setAttribute('aria-atomic', 'true');
  }

  const successMessage = document.getElementById('success-message');

  if (successMessage) {
    successMessage.setAttribute('role', 'status');
    successMessage.setAttribute('aria-live', 'polite');
  }

  const emptyMessage = document.getElementById('catalog-empty');

  if (emptyMessage) {
    emptyMessage.setAttribute('role', 'status');
  }

  // Карта без title — это безымянный фрейм для скринридера.
  document.querySelectorAll('iframe').forEach((frame) => {
    if (!frame.hasAttribute('title')) {
      frame.setAttribute('title', 'Карта расположения магазина ByteShop');
    }
  });
}

// ===============================
// Состояние каталога
// ===============================
let currentCategory = 'all';
let currentSort = 'default';
let currentSearch = '';
let cartCount = 0;
let cartListenerAttached = false;

// ===============================
// Рендер карточки товара
// ===============================
function renderProductCard(item) {
  // Используем document.createElement, чтобы не применять innerHTML к данным.
  const article = document.createElement('article');
  article.className = 'product-card';

  // Ссылка-картинка дублирует ссылку-заголовок.
  // Даём ей имя и убираем из порядка Tab, чтобы не было двух одинаковых остановок.
  const media = document.createElement('a');
  media.className = 'product-card__media';
  media.href = `product.html?id=${item.id}`;
  media.tabIndex = -1;
  media.setAttribute('aria-label', item.title);

  const image = document.createElement('img');
  image.className = 'product-card__image';
  image.src = item.image;
  image.alt = `${categoryAltWords[item.category] || 'Товар'} ${item.title}`;
  image.width = 640;
  image.height = 480;
  image.loading = 'lazy';
  image.srcset = `${item.image} 640w`;
  image.sizes = '(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw';
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
  setLabelledValue(
    currentPrice,
    'Цена: ',
    formatPrice(calculateFinalPrice(item.price, item.discountPercent))
  );
  priceBlock.appendChild(currentPrice);

  if (item.oldPrice && item.oldPrice > 0) {
    const oldPrice = document.createElement('span');
    oldPrice.className = 'product-card__old';
    setLabelledValue(oldPrice, 'Старая цена: ', formatPrice(item.oldPrice));
    priceBlock.appendChild(oldPrice);
  }

  // На кнопке только «+», поэтому имя задаём через aria-label.
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

    if (item.badge === 'hit') {
      badge.textContent = 'Хит';
    } else if (item.badge === 'new') {
      badge.textContent = 'Новинка';
    } else if (item.badge === 'discount') {
      // «-15%» само по себе непонятно на слух — добавляем слово «Скидка».
      setLabelledValue(badge, 'Скидка ', `-${item.discountPercent}%`);
    }

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
}

// ===============================
// Корзина: счётчик и toast
// ===============================
function updateCartCount() {
  const counters = document.querySelectorAll('[data-cart-count]');

  counters.forEach((el) => {
    el.textContent = cartCount;
  });

  // Число спрятано от скринридера, поэтому количество передаём в имени кнопки.
  document.querySelectorAll('.site-header__cart').forEach((button) => {
    button.setAttribute('aria-label', `Корзина, товаров: ${cartCount}`);
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

// Один обработчик на документ вместо перенавешивания после каждого рендера.
function attachCartButtons() {
  if (cartListenerAttached) return;

  cartListenerAttached = true;

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;

    const button = event.target.closest('.product-card__cart, .product-page__cart');

    if (!button || button.disabled) return;

    const productName = button.dataset.product || 'Товар';

    cartCount += 1;
    updateCartCount();
    showToast(`«${productName}» добавлен в корзину`);
  });
}

// ===============================
// Вкладки категорий
// ===============================
// Подсвечиваем нужную кнопку и перерисовываем сетку.
function setCategory(category) {
  currentCategory = category;

  const tabsGroup = document.querySelector('.catalog__tabs');

  if (tabsGroup) {
    tabsGroup.setAttribute('role', 'group');
    tabsGroup.setAttribute('aria-label', 'Категории товаров');
  }

  document.querySelectorAll('.catalog__tab').forEach((tab) => {
    const isActive = tab.dataset.tab === category;

    tab.classList.toggle('catalog__tab--active', isActive);

    // Выбранная категория отличается только цветом — сообщаем состояние явно.
    tab.setAttribute('aria-pressed', String(isActive));
    tab.setAttribute('aria-controls', 'catalog-grid');
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

  if (!orderDialog) return;

  // У диалога должно быть имя — берём его из видимого заголовка.
  const dialogTitle = orderDialog.querySelector('.order-dialog__title');

  if (dialogTitle) {
    if (!dialogTitle.id) {
      dialogTitle.id = 'order-dialog-title';
    }

    orderDialog.setAttribute('aria-labelledby', dialogTitle.id);
  }

  const closeDialogButton = document.getElementById('close-order-dialog');

  if (closeDialogButton) {
    // На кнопке только символ «×», он не является понятным именем.
    closeDialogButton.setAttribute('aria-label', 'Закрыть окно');

    closeDialogButton.addEventListener('click', () => {
      orderDialog.close();
    });
  }
}

// ===============================
// Валидация формы
// ===============================

// Название поля для текстового сообщения об ошибке.
function getFieldTitle(field) {
  if (field.id) {
    const label = document.querySelector(`label[for="${field.id}"]`);

    if (label) return label.textContent.replace(/\s+/g, ' ').trim();
  }

  const wrapper = field.closest('label');

  if (wrapper) return wrapper.textContent.replace(/\s+/g, ' ').trim();

  return field.name || 'поле';
}

// Скрытая живая область: браузерные подсказки валидации
// озвучиваются не во всех скринридерах.
function getFormErrorRegion(form) {
  let region = form.querySelector('.order-form__errors');

  if (!region) {
    region = document.createElement('p');
    region.className = 'order-form__errors visually-hidden';
    region.setAttribute('role', 'alert');
    form.appendChild(region);
  }

  return region;
}

function attachForms() {
  const forms = document.querySelectorAll('.order-form');
  const successMessage = document.getElementById('success-message');

  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const errorRegion = getFormErrorRegion(form);
      const formElements = Array.from(form.elements);
      const invalidFields = [];

      // Сбрасываем предыдущие признаки ошибок.
      formElements.forEach((element) => {
        if (element.willValidate) {
          element.removeAttribute('aria-invalid');
        }
      });

      // Проверяем встроенные HTML-ограничения формы.
      if (!form.checkValidity()) {
        formElements.forEach((element) => {
          if (element.willValidate && !element.checkValidity()) {
            // aria-invalid ставится только на поле с реальной ошибкой.
            element.setAttribute('aria-invalid', 'true');
            invalidFields.push(getFieldTitle(element));
          }
        });

        errorRegion.textContent =
          `Проверьте правильность заполнения: ${invalidFields.join(', ')}.`;

        form.reportValidity();
        return;
      }

      errorRegion.textContent = '';

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

    if (item.badge === 'discount' && badgeText) {
      setLabelledValue(badge, 'Скидка ', badgeText);
    } else {
      badge.textContent = badgeText;
    }

    badge.hidden = badgeText === '';
  }

  // Картинка.
  const image = document.getElementById('product-image');

  if (image) {
    image.src = item.image;
    image.alt = `${categoryAltWords[item.category] || 'Товар'} ${item.title}`;
    image.width = 640;
    image.height = 480;
    image.srcset = `${item.image} 640w`;
    image.sizes = '(max-width: 767px) 100vw, 50vw';
  }

  // Основные данные.
  const brand = document.getElementById('product-brand');

  if (brand) brand.textContent = item.brand;

  const title = document.getElementById('product-title');

  if (title) title.textContent = item.title;

  // Рейтинг: звёзды decorative, число остаётся текстом.
  const stars = document.getElementById('product-stars');

  if (stars) {
    stars.textContent = getStarsText(item.rating);
    stars.setAttribute('aria-hidden', 'true');
  }

  const rating = document.getElementById('product-rating');

  if (rating) {
    rating.textContent = Number(item.rating).toFixed(1);
    rating.appendChild(createScreenReaderText(' из 5'));
  }

  const reviewCount = document.getElementById('product-review-count');

  if (reviewCount) {
    reviewCount.textContent =
      `${item.reviewCount} ${getReviewsWord(item.reviewCount)}`;
  }

  // Цена, старая цена и скидка.
  const price = document.getElementById('product-price');

  if (price) setLabelledValue(price, 'Цена: ', formatPrice(finalPrice));

  const oldPrice = document.getElementById('product-old-price');

  if (oldPrice) {
    const hasOldPrice = item.oldPrice && item.oldPrice > 0;

    if (hasOldPrice) {
      setLabelledValue(oldPrice, 'Старая цена: ', formatPrice(item.oldPrice));
    } else {
      oldPrice.textContent = '';
    }

    oldPrice.hidden = !hasOldPrice;
  }

  const discount = document.getElementById('product-discount');

  if (discount) {
    const hasDiscount = item.discountPercent > 0;

    if (hasDiscount) {
      setLabelledValue(discount, 'Скидка ', `-${item.discountPercent}%`);
    } else {
      discount.textContent = '';
    }

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

  markDecorativeElements();
  describeReviewStars();
  improveNavigation();
  initStatusRegions();

  renderProductPage();
  setCategory(getCategoryFromHash() || 'all');
  attachTabs();
  attachToolbar();
  attachCartButtons();
  attachModal();
  attachForms();
  updateCartCount();
});