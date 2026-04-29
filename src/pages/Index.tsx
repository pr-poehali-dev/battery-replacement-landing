import { useState, FormEvent } from "react";
import Icon from "@/components/ui/icon";

const BEFORE_IMG = "https://cdn.poehali.dev/projects/35584a31-c265-46ef-9e16-d65f79f0a648/files/a499cc80-3930-433b-8c15-0f96e0f4367a.jpg";
const AFTER_IMG = "https://cdn.poehali.dev/projects/35584a31-c265-46ef-9e16-d65f79f0a648/files/9edc1c07-411f-4e02-8f48-15bce2e4fdef.jpg";

const services = [
  {
    icon: "Wrench",
    title: "Замена батарей",
    desc: "Снимем старый радиатор и установим новый. Работаем с чугунными, биметаллическими и алюминиевыми батареями.",
    price: "от 3 500 ₽",
  },
  {
    icon: "Droplets",
    title: "Промывка системы",
    desc: "Очистка труб и радиаторов от накипи и отложений. Батареи начнут греть на 30% лучше.",
    price: "от 1 500 ₽",
  },
  {
    icon: "Settings",
    title: "Установка терморегулятора",
    desc: "Монтаж термостатических клапанов для точного управления температурой в каждой комнате.",
    price: "от 1 200 ₽",
  },
  {
    icon: "ShieldCheck",
    title: "Устранение течи",
    desc: "Диагностика и ремонт протечек в системе отопления. Приедем в день обращения.",
    price: "от 800 ₽",
  },
];

const gallery = [
  { before: BEFORE_IMG, after: AFTER_IMG, room: "Спальня, ул. Ленина 12" },
  { before: BEFORE_IMG, after: AFTER_IMG, room: "Кухня, ул. Гагарина 5" },
  { before: BEFORE_IMG, after: AFTER_IMG, room: "Гостиная, пр. Мира 88" },
];

const reviews = [
  {
    name: "Ольга М.",
    text: "Приехали вовремя, работали аккуратно. Убрали за собой весь мусор. Новые батареи греют отлично!",
    stars: 5,
    date: "Октябрь 2024",
  },
  {
    name: "Дмитрий К.",
    text: "Вызвал по рекомендации соседей. Заменили три батареи за полдня. Цена соответствует качеству.",
    stars: 5,
    date: "Ноябрь 2024",
  },
  {
    name: "Светлана Р.",
    text: "Давно хотела заменить старые чугунные радиаторы. Теперь дома тепло и красиво. Спасибо!",
    stars: 5,
    date: "Сентябрь 2024",
  },
];

function BeforeAfterCard({ item }: { item: (typeof gallery)[0] }) {
  const [showAfter, setShowAfter] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-white group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={showAfter ? item.after : item.before}
          alt={showAfter ? "После" : "До"}
          className="w-full h-full object-cover transition-all duration-500"
        />
        <div className="absolute inset-0 flex items-end p-4">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              showAfter ? "bg-blue-600 text-white" : "bg-gray-800 text-white"
            }`}
          >
            {showAfter ? "После" : "До"}
          </span>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">{item.room}</span>
        <button
          onClick={() => setShowAfter(!showAfter)}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
        >
          {showAfter ? "Смотреть ДО" : "Смотреть ПОСЛЕ"}
          <Icon name="ArrowRight" size={14} />
        </button>
      </div>
    </div>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  );
}

function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="bg-blue-600 rounded-2xl p-8 flex flex-col justify-between text-white">
      {sent ? (
        <div className="flex flex-col items-center justify-center h-full gap-4 py-6">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Icon name="CheckCircle" size={32} className="text-white" />
          </div>
          <h3 className="font-bold text-xl text-center">Заявка принята!</h3>
          <p className="text-blue-100 text-sm text-center leading-relaxed">
            Перезвоним в течение 15 минут и согласуем удобное время
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <h3 className="font-bold text-xl mb-1">Оставить заявку</h3>
            <p className="text-blue-100 text-sm">Перезвоним в течение 15 минут</p>
          </div>
          <div className="flex flex-col gap-3 mt-2">
            <div>
              <label className="text-xs text-blue-200 mb-1 block">Ваше имя</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Иван Иванов"
                required
                className="w-full bg-white/15 border border-white/25 text-white placeholder-blue-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-blue-200 mb-1 block">Номер телефона</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (___) ___-__-__"
                required
                className="w-full bg-white/15 border border-white/25 text-white placeholder-blue-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white transition-colors"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-white text-blue-600 px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors disabled:opacity-70 mt-1"
          >
            {loading ? (
              <>
                <Icon name="Loader" size={16} className="animate-spin" />
                Отправляем...
              </>
            ) : (
              <>
                <Icon name="Send" size={16} />
                Отправить заявку
              </>
            )}
          </button>
          <p className="text-xs text-blue-200 text-center">
            Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
          </p>
        </form>
      )}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="font-golos bg-white text-gray-900 min-h-screen">
      {/* NAV */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-blue-600 tracking-tight">БАТАРЕЙКИН</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <button
              onClick={() => scrollTo("services")}
              className="hover:text-blue-600 transition-colors"
            >
              Услуги
            </button>
            <button
              onClick={() => scrollTo("gallery")}
              className="hover:text-blue-600 transition-colors"
            >
              Галерея
            </button>
            <button
              onClick={() => scrollTo("reviews")}
              className="hover:text-blue-600 transition-colors"
            >
              Отзывы
            </button>
            <button
              onClick={() => scrollTo("contacts")}
              className="hover:text-blue-600 transition-colors"
            >
              Контакты
            </button>
          </nav>
          <a
            href="tel:+79001234567"
            className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors"
          >
            <Icon name="Phone" size={16} />
            +7 (900) 123-45-67
          </a>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-4">
            <button
              onClick={() => scrollTo("services")}
              className="text-left text-sm font-medium text-gray-700"
            >
              Услуги
            </button>
            <button
              onClick={() => scrollTo("gallery")}
              className="text-left text-sm font-medium text-gray-700"
            >
              Галерея
            </button>
            <button
              onClick={() => scrollTo("reviews")}
              className="text-left text-sm font-medium text-gray-700"
            >
              Отзывы
            </button>
            <button
              onClick={() => scrollTo("contacts")}
              className="text-left text-sm font-medium text-gray-700"
            >
              Контакты
            </button>
            <a
              href="tel:+79001234567"
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm w-full justify-center"
            >
              <Icon name="Phone" size={16} />
              Позвонить
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white pt-16 pb-20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Icon name="MapPin" size={14} />
              Работаем по всему городу
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
              Замена батарей
              <br />
              <span className="text-blue-600">без хлопот</span>
            </h1>
            <p className="text-lg text-gray-500 mb-8 max-w-md leading-relaxed">
              Демонтируем старое, установим новое. Работаем чисто, быстро и с гарантией. Приедем
              в день звонка.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+79001234567"
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-7 py-3.5 rounded-xl font-bold text-base hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-200"
              >
                <Icon name="Phone" size={18} />
                Вызвать мастера
              </a>
              <button
                onClick={() => scrollTo("gallery")}
                className="flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 px-7 py-3.5 rounded-xl font-semibold text-base hover:border-blue-300 transition-colors"
              >
                Смотреть работы
                <Icon name="ArrowRight" size={18} />
              </button>
            </div>
            <div className="flex items-center gap-6 mt-10">
              <div className="text-center">
                <div className="text-2xl font-black text-blue-600">500+</div>
                <div className="text-xs text-gray-400 mt-0.5">замен выполнено</div>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <div className="text-2xl font-black text-blue-600">1 день</div>
                <div className="text-xs text-gray-400 mt-0.5">приедем сегодня</div>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <div className="text-2xl font-black text-blue-600">2 года</div>
                <div className="text-xs text-gray-400 mt-0.5">гарантия на работы</div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full max-w-md">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-100">
              <img
                src={AFTER_IMG}
                alt="Новый радиатор"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-xl px-4 py-2 flex items-center gap-2 shadow">
                <Icon name="CheckCircle" size={16} className="text-green-500" />
                <span className="text-sm font-semibold text-gray-800">Результат за 1 день</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Наши услуги</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Всё для вашей системы отопления — от диагностики до полной замены
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:shadow-blue-50 hover:border-blue-100 transition-all group"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <Icon name={s.icon} fallback="Wrench" size={22} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.desc}</p>
                <span className="text-blue-600 font-bold text-sm">{s.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Наши работы</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Нажмите кнопку, чтобы увидеть результат после замены
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gallery.map((item, i) => (
              <BeforeAfterCard key={i} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">Почему выбирают нас</h2>
            <p className="text-blue-100 max-w-md mx-auto">
              Работаем честно и с заботой о ваших трубах и кошельке
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "Clock",
                title: "Приедем сегодня",
                desc: "Работаем без выходных с 8:00 до 21:00. Срочный выезд в течение 2 часов.",
              },
              {
                icon: "ShieldCheck",
                title: "Гарантия 2 года",
                desc: "На все выполненные работы и установленное оборудование даём письменную гарантию.",
              },
              {
                icon: "CreditCard",
                title: "Честная цена",
                desc: "Фиксированная стоимость без скрытых доплат. Сметы согласовываем заранее.",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mb-4">
                  <Icon name={item.icon} fallback="Star" size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Отзывы клиентов</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Нам доверяют жители города уже более 5 лет
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <Stars count={r.stars} />
                <p className="text-gray-700 text-sm leading-relaxed mt-4 mb-5">«{r.text}»</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900 text-sm">{r.name}</span>
                  <span className="text-xs text-gray-400">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Свяжитесь с нами</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Позвоните или напишите — ответим быстро и назначим удобное время
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-6 text-lg">Контакты</h3>
              <div className="flex flex-col gap-5">
                <a
                  href="tel:+79001234567"
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Icon name="Phone" size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Телефон</div>
                    <div className="font-semibold">+7 (900) 123-45-67</div>
                  </div>
                </a>
                <a
                  href="https://wa.me/79001234567"
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                    <Icon name="MessageCircle" size={18} className="text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">WhatsApp</div>
                    <div className="font-semibold">Написать сейчас</div>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Icon name="Clock" size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Время работы</div>
                    <div className="font-semibold">Пн–Вс, 8:00–21:00</div>
                  </div>
                </div>
              </div>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-white font-black text-lg tracking-tight">БАТАРЕЙКИН</span>
          <span className="text-sm">© 2025 Замена батарей и радиаторов. Все права защищены.</span>
          <a href="tel:+79001234567" className="text-sm hover:text-white transition-colors">
            +7 (900) 123-45-67
          </a>
        </div>
      </footer>
    </div>
  );
}