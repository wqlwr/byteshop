// Данные магазина ByteShop.

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
    reviewCount: 86,
    description: [
      'Игровой процессор с 3D V-Cache: высокий FPS в играх и стабильные кадры даже в симуляторах и стратегиях.',
      '8 ядер и 16 потоков хватает для стримов и монтажа, а сокет AM5 оставляет запас для апгрейда.',
    ],
    details: [
      ['Сокет', 'AM5'],
      ['Ядра / потоки', '8 / 16'],
      ['Частота', 'до 5.2 ГГц'],
      ['Кэш L3', '96 МБ'],
      ['TDP', '120 Вт'],
    ],
    image: 'img/7_9800.jpg',
    alt: 'Процессор AMD Ryzen 7 9800X3D: металлическая крышка с гравировкой, вид сверху'
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
    reviewCount: 64,
    description: [
      'Гибридный процессор для работы и игр: 20 ядер распределяют нагрузку между фоновыми задачами и тяжёлыми приложениями.',
      'Подходит для рендеринга, компиляции кода и монтажа видео 4K.',
    ],
    details: [
      ['Сокет', 'LGA1700'],
      ['Ядра / потоки', '20 / 28'],
      ['Частота', 'до 5.6 ГГц'],
      ['Кэш L3', '33 МБ'],
      ['TDP', '125 Вт'],
    ],
    image: 'img/i7.jpg',
    alt: 'Процессор Intel Core i7-14700K вид сверху с маркировкой модели'
  },
  {
    id: 3,
    title: 'Ryzen 5 7600',
    category: 'cpu',
    brand: 'AMD · Ryzen 5',
    price: 25990,
    oldPrice: 25990,
    discountPercent: 12,
    rating: 4.7,
    isAvailable: true,
    badge: 'discount',
    specs: ['6 ядер', 'AM5'],
    reviewCount: 41,
    description: [
      'Доступный шестиядерный процессор для игровых и рабочих сборок среднего уровня.',
      'В комплекте идёт кулер, поэтому можно сэкономить на охлаждении.',
    ],
    details: [
      ['Сокет', 'AM5'],
      ['Ядра / потоки', '6 / 12'],
      ['Частота', 'до 5.1 ГГц'],
      ['Кэш L3', '32 МБ'],
      ['TDP', '65 Вт'],
    ],
    image: 'img/5_7600.jpg',
    alt: 'Процессор AMD Ryzen 5 7600 вид сверху с маркировкой модели'
  },

  // Видеокарты
  {
    id: 4,
    title: 'RTX 5070 Ti 16 GB',
    category: 'gpu',
    brand: 'NVIDIA · GeForce RTX',
    price: 99990,
    oldPrice: 99990,
    discountPercent: 10,
    rating: 4.8,
    isAvailable: true,
    badge: 'hit',
    specs: ['16 GB GDDR7', 'PCIe 5.0'],
    reviewCount: 124,
    description: [
      'Видеокарта для игр в 2K и 4K, работы с графикой и монтажа. 16 ГБ видеопамяти, поддержка DLSS 3 и трассировки лучей.',
      'Благодаря 16 ГБ памяти модель хорошо показывает себя в монтаже видео, 3D-рендеринге и работе с нейросетями.',
    ],
    details: [
      ['Объём памяти', '16 GB'],
      ['Тип памяти', 'GDDR7'],
      ['Интерфейс', 'PCIe 5.0'],
      ['Рекомендуемый блок питания', '750 Вт'],
    ],
    image: 'img/5070ti.jpg',
    alt: 'Видеокарта NVIDIA GeForce RTX 5070 Ti с двумя вентиляторами, надписью GEFORCE RTX и золотыми контактами PCIe'
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
    reviewCount: 57,
    description: [
      'Старшая видеокарта серии для 4K-гейминга с запасом производительности на несколько лет вперёд.',
      'Подходит для VR, тяжёлого 3D и работы с видео 8K.',
    ],
    details: [
      ['Объём памяти', '16 GB'],
      ['Тип памяти', 'GDDR7'],
      ['Интерфейс', 'PCIe 5.0'],
      ['Рекомендуемый блок питания', '850 Вт'],
    ],
    image: 'img/5080.jpg',
    alt: 'Видеокарта NVIDIA GeForce RTX 5080 с массивным кожухом и вентиляторами, вид сверху'
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
    reviewCount: 38,
    description: [
      'Видеокарта для стабильных 100+ FPS в 1440p и комфортной игры в 4K с FSR.',
      'Хорошо сочетается со сборками на процессорах Ryzen.',
    ],
    details: [
      ['Объём памяти', '16 GB'],
      ['Тип памяти', 'GDDR6'],
      ['Интерфейс', 'PCIe 4.0'],
      ['Рекомендуемый блок питания', '700 Вт'],
    ],
    image: 'img/7800.jpg',
    alt: 'Видеокарта AMD Radeon RX 7800 XT в чёрном кожухе с вентиляторами, вид сверху'
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
    reviewCount: 52,
    description: [
      'Материнская плата на B650 для процессоров Ryzen 7000 и 9000: усиленное питание, два слота M.2 и Wi-Fi 6E.',
      'Радиаторы на VRM и накопителях помогают держать температуры под контролем в закрытом корпусе.',
    ],
    details: [
      ['Сокет', 'AM5'],
      ['Чипсет', 'B650'],
      ['Память', '4 × DDR5 до 128 ГБ'],
      ['Слоты M.2', '2'],
    ],
    image: 'img/msi.jpg',
    alt: 'Материнская плата MSI MAG B650 Tomahawk: текстолит, радиаторы VRM и слоты расширения'
  },
  {
    id: 8,
    title: 'ASUS ROG Strix Z790-E',
    category: 'mb',
    brand: 'ASUS · ROG',
    price: 54990,
    oldPrice: 54990,
    discountPercent: 11,
    rating: 4.8,
    isAvailable: true,
    badge: 'discount',
    specs: ['LGA1700', 'DDR5'],
    reviewCount: 47,
    description: [
      'Флагманская плата для Intel с мощным VRM и поддержкой PCIe 5.0 — для сборок с топовыми процессорами и видеокартами.',
      'Подходит для разгона и сборок с большим количеством накопителей.',
    ],
    details: [
      ['Сокет', 'LGA1700'],
      ['Чипсет', 'Z790'],
      ['Память', '4 × DDR5 до 192 ГБ'],
      ['Слоты M.2', '4'],
    ],
    image: 'img/asus.jpg',
    alt: 'Материнская плата ASUS ROG Strix Z790-E с радиаторами и разъёмами питания'
  },

  // Оперативная память
  {
    id: 9,
    title: 'DDR5 32 GB 6000 МГц',
    category: 'ram',
    brand: 'Kingston · Fury Beast',
    price: 68590,
    oldPrice: null,
    discountPercent: 0,
    rating: 4.8,
    isAvailable: true,
    badge: 'hit',
    specs: ['2 × 16 GB', 'CL30'],
    reviewCount: 93,
    description: [
      'Комплект из двух модулей DDR5: профиль XMP/EXPO включается в один клик, частота держится без ручной настройки.',
      'Невысокие радиаторы не мешают установке башенных кулеров.',
    ],
    details: [
      ['Объём', '2 × 16 ГБ'],
      ['Частота', '6000 МГц'],
      ['Тайминги', 'CL30'],
      ['Профили', 'XMP 3.0 / EXPO'],
    ],
    image: 'img/kingstom.jpg',
    alt: 'Два модуля оперативной памяти Kingston Fury Beast DDR5 с чёрными радиаторами'
  },
  {
    id: 10,
    title: 'DDR5 64 GB 6400 МГц',
    category: 'ram',
    brand: 'G.Skill · Trident Z5',
    price: 126499,
    oldPrice: null,
    discountPercent: 0,
    rating: 4.9,
    isAvailable: true,
    badge: 'new',
    specs: ['2 × 32 GB', 'CL32'],
    reviewCount: 29,
    description: [
      'Большой объём памяти для рендеринга, виртуальных машин и работы с тяжёлыми проектами.',
      'Высокая частота и низкие тайминги при полноценном двухканальном режиме.',
    ],
    details: [
      ['Объём', '2 × 32 ГБ'],
      ['Частота', '6400 МГц'],
      ['Тайминги', 'CL32'],
      ['Профили', 'XMP 3.0 / EXPO'],
    ],
    image: 'img/gskill.jpg',
    alt: 'Два модуля памяти G.Skill Trident Z5 DDR5 с высокими радиаторами'
  },

  // Накопители
  {
    id: 11,
    title: 'NVMe SSD 2 TB',
    category: 'ssd',
    brand: 'Samsung · 990 PRO',
    price: 28490,
    oldPrice: 28490,
    discountPercent: 15,
    rating: 4.9,
    isAvailable: true,
    badge: 'discount',
    specs: ['PCIe 4.0', '7450 МБ/с'],
    reviewCount: 111,
    description: [
      'Быстрый NVMe-накопитель для системы, игр и монтажа: до 7450 МБ/с на чтение.',
      'Форм-фактор M.2 2280 подходит большинству современных плат.',
    ],
    details: [
      ['Объём', '2 ТБ'],
      ['Интерфейс', 'PCIe 4.0'],
      ['Скорость чтения', '7450 МБ/с'],
      ['Форм-фактор', 'M.2 2280'],
    ],
    image: 'img/samsungssd.jpg',
    alt: 'NVMe-накопитель Samsung 990 PRO в форм-факторе M.2 2280, вид сверху'
  },
  {
    id: 12,
    title: 'NVMe SSD 1 TB',
    category: 'ssd',
    brand: 'Kingston · NV2',
    price: 14490,
    oldPrice: null,
    discountPercent: 0,
    rating: 4.5,
    isAvailable: true,
    badge: null,
    specs: ['PCIe 4.0', '3500 МБ/с'],
    reviewCount: 78,
    description: [
      'Накопитель для апгрейда готового ПК: система и игры загружаются заметно быстрее, чем с SATA-диском.',
      'Оптимальный объём под систему, программы и несколько крупных игр.',
    ],
    details: [
      ['Объём', '1 ТБ'],
      ['Интерфейс', 'PCIe 4.0'],
      ['Скорость чтения', '3500 МБ/с'],
      ['Форм-фактор', 'M.2 2280'],
    ],
    image: 'img/kingstronssd.jpg',
    alt: 'NVMe-накопитель Kingston NV2 в форм-факторе M.2 2280, вид сверху'
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
    reviewCount: 44,
    description: [
      'Тихий блок питания с сертификатом 80 PLUS Platinum и модульными кабелями.',
      'Запас по мощности позволяет ставить его в сборки с топовыми видеокартами.',
    ],
    details: [
      ['Мощность', '850 Вт'],
      ['Сертификат', '80 PLUS Platinum'],
      ['Кабели', 'Модульные'],
      ['Вентилятор', '135 мм'],
    ],
    image: 'img/bequiet.jpg',
    alt: 'Блок питания Be Quiet! Straight Power 12: чёрный корпус, вентилятор и модульные разъёмы'
  },
  {
    id: 14,
    title: 'Corsair RM1000x',
    category: 'psu',
    brand: 'Corsair · RMx',
    price: 22990,
    oldPrice: 22990,
    discountPercent: 13,
    rating: 4.9,
    isAvailable: true,
    badge: 'discount',
    specs: ['1000 Вт', '80+ Gold'],
    reviewCount: 66,
    description: [
      'Блок питания на 1000 Вт для сборок с мощными видеокартами и запасом на разгон.',
      'До высокой нагрузки работает в тихом режиме.',
    ],
    details: [
      ['Мощность', '1000 Вт'],
      ['Сертификат', '80 PLUS Gold'],
      ['Кабели', 'Модульные'],
      ['Вентилятор', '140 мм'],
    ],
    image: 'img/corsair.jpg',
    alt: 'Блок питания Corsair RM1000x в чёрном корпусе с вентилятором'
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