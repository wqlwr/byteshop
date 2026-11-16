// Данные магазина ByteShop.
// Здесь хранится массив товаров и объект товара для проверки функций из ПЗ №15.

// Массив товаров для каталога.
const products = [
  // Процессоры
  {
    id: 1,
    title: 'Ryzen 7 9800X3D',
    category: 'cpu',
    brand: 'AMD · Ryzen 7',
    price: 54990,
    oldPrice: null,
    discountPercent: 0,
    rating: 4.9,
    isAvailable: true,
    badge: 'new',
    specs: ['8 ядер', 'AM5'],
    image: 'img/7_9800.jpg'
  },
  {
    id: 2,
    title: 'Core i7-14700K',
    category: 'cpu',
    brand: 'Intel · Core i7',
    price: 42990,
    oldPrice: null,
    discountPercent: 0,
    rating: 4.8,
    isAvailable: true,
    badge: null,
    specs: ['20 ядер', 'LGA1700'],
    image: 'img/i7.jpg'
  },
  {
    id: 3,
    title: 'Ryzen 5 7600',
    category: 'cpu',
    brand: 'AMD · Ryzen 5',
    price: 22990,
    oldPrice: 25990,
    discountPercent: 12,
    rating: 4.7,
    isAvailable: true,
    badge: 'discount',
    specs: ['6 ядер', 'AM5'],
    image: 'img/5_7600.jpg'
  },

  // Видеокарты
  {
    id: 4,
    title: 'RTX 5070 Ti 16 GB',
    category: 'gpu',
    brand: 'NVIDIA · GeForce RTX',
    price: 89990,
    oldPrice: 99990,
    discountPercent: 10,
    rating: 4.8,
    isAvailable: true,
    badge: 'hit',
    specs: ['16 GB GDDR7', 'PCIe 5.0'],
    image: 'img/5070ti.jpg'
  },
  {
    id: 5,
    title: 'RTX 5080 16 GB',
    category: 'gpu',
    brand: 'NVIDIA · GeForce RTX',
    price: 129990,
    oldPrice: null,
    discountPercent: 0,
    rating: 4.9,
    isAvailable: true,
    badge: 'new',
    specs: ['16 GB GDDR7', 'PCIe 5.0'],
    image: 'img/5080.jpg'
  },
  {
    id: 6,
    title: 'RX 7800 XT 16 GB',
    category: 'gpu',
    brand: 'AMD · Radeon',
    price: 64990,
    oldPrice: null,
    discountPercent: 0,
    rating: 4.6,
    isAvailable: false,
    badge: null,
    specs: ['16 GB GDDR6', 'PCIe 4.0'],
    image: 'img/7800.jpg'
  },

  // Материнские платы
  {
    id: 7,
    title: 'MSI MAG B650 Tomahawk',
    category: 'mb',
    brand: 'MSI · MAG',
    price: 24990,
    oldPrice: null,
    discountPercent: 0,
    rating: 4.7,
    isAvailable: true,
    badge: null,
    specs: ['AM5', 'DDR5'],
    image: 'img/msi.jpg'
  },
  {
    id: 8,
    title: 'ASUS ROG Strix Z790-E',
    category: 'mb',
    brand: 'ASUS · ROG',
    price: 48990,
    oldPrice: 54990,
    discountPercent: 11,
    rating: 4.8,
    isAvailable: true,
    badge: 'discount',
    specs: ['LGA1700', 'DDR5'],
    image: 'img/asus.jpg'
  },

  // Оперативная память
  {
    id: 9,
    title: 'DDR5 32 GB 6000 МГц',
    category: 'ram',
    brand: 'Kingston · Fury Beast',
    price: 11490,
    oldPrice: null,
    discountPercent: 0,
    rating: 4.8,
    isAvailable: true,
    badge: 'hit',
    specs: ['2 × 16 GB', 'CL30'],
    image: 'img/kingstom.jpg'
  },
  {
    id: 10,
    title: 'DDR5 64 GB 6400 МГц',
    category: 'ram',
    brand: 'G.Skill · Trident Z5',
    price: 24990,
    oldPrice: null,
    discountPercent: 0,
    rating: 4.9,
    isAvailable: true,
    badge: 'new',
    specs: ['2 × 32 GB', 'CL32'],
    image: 'img/gskill.jpg'
  },

  // Накопители
  {
    id: 11,
    title: 'NVMe SSD 2 TB',
    category: 'ssd',
    brand: 'Samsung · 990 PRO',
    price: 17990,
    oldPrice: 21190,
    discountPercent: 15,
    rating: 4.9,
    isAvailable: true,
    badge: 'discount',
    specs: ['PCIe 4.0', '7450 МБ/с'],
    image: 'img/samsungssd.jpg'
  },
  {
    id: 12,
    title: 'NVMe SSD 1 TB',
    category: 'ssd',
    brand: 'Kingston · NV2',
    price: 6490,
    oldPrice: null,
    discountPercent: 0,
    rating: 4.5,
    isAvailable: true,
    badge: null,
    specs: ['PCIe 4.0', '3500 МБ/с'],
    image: 'img/kingstronssd.jpg'
  },

  // Блоки питания
  {
    id: 13,
    title: 'Be Quiet! Straight Power 12 850W',
    category: 'psu',
    brand: 'Be Quiet! · Straight Power',
    price: 16990,
    oldPrice: null,
    discountPercent: 0,
    rating: 4.8,
    isAvailable: true,
    badge: null,
    specs: ['850 Вт', '80+ Platinum'],
    image: 'img/5070ti.jpg'
  },
  {
    id: 14,
    title: 'Corsair RM1000x',
    category: 'psu',
    brand: 'Corsair · RMx',
    price: 19990,
    oldPrice: 22990,
    discountPercent: 13,
    rating: 4.9,
    isAvailable: true,
    badge: 'discount',
    specs: ['1000 Вт', '80+ Gold'],
    image: 'img/5080.jpg'
  }
];

// Объект товара для проверки функций из практической работы №15.
const product = {
  id: 4,
  title: 'RTX 5070 Ti 16 GB',
  category: 'gpu',
  price: 89990,
  discountPercent: 10,
  rating: 4.8,
  isAvailable: true
};

// Справочник категорий.
const categories = {
  cpu: 'Процессоры',
  gpu: 'Видеокарты',
  mb: 'Материнские платы',
  ram: 'Оперативная память',
  ssd: 'Накопители',
  psu: 'Блоки питания'
};