/* ============================================================
   Loren Vize Deneyimler — yorum üreteci
   ~500 adet kendi yazdığımız (kurgusal) yorum, yıldız puanlı.
   Tohumlu (deterministik) üretim: her açılışta aynı liste.
   window.LOREN_REVIEWS olarak dışa verilir.
   ============================================================ */
(function () {
  "use strict";

  // --- Tohumlu rastgele (mulberry32) ---
  function makeRng(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  var rng = makeRng(20260612);
  function pick(arr) {
    return arr[Math.floor(rng() * arr.length)];
  }
  function chance(p) {
    return rng() < p;
  }

  var FIRST = [
    "Ahmet", "Mehmet", "Mustafa", "Ali", "Hüseyin", "Hasan", "İbrahim", "Murat",
    "Ömer", "Yusuf", "Emre", "Burak", "Caner", "Serkan", "Onur", "Kerem",
    "Barış", "Volkan", "Tolga", "Cem", "Engin", "Eren", "Furkan", "Gökhan",
    "Halil", "Kaan", "Levent", "Okan", "Selim", "Tarık", "Uğur", "Yiğit",
    "Elif", "Zeynep", "Merve", "Ayşe", "Fatma", "Esra", "Büşra", "Sena",
    "Gizem", "Derya", "Selin", "Ceren", "Beyza", "Dilara", "Ebru", "Gamze",
    "Hande", "İrem", "Kübra", "Melike", "Nazlı", "Özge", "Pınar", "Rabia",
    "Sıla", "Tuğçe", "Yasemin", "Aslı", "Damla", "Ece", "Funda", "Gül",
    "Berk", "Deniz", "Ege", "Can", "Arda", "Sinan", "Koray", "Mert",
    "Naz", "Sude", "Defne", "Ela", "Lara", "Mira", "Nehir", "Toprak",
  ];
  var LAST = [
    "Yılmaz", "Kaya", "Demir", "Şahin", "Çelik", "Yıldız", "Yıldırım", "Öztürk",
    "Aydın", "Özdemir", "Arslan", "Doğan", "Kılıç", "Aslan", "Çetin", "Kara",
    "Koç", "Kurt", "Özkan", "Şimşek", "Erdoğan", "Korkmaz", "Aksoy", "Polat",
    "Güneş", "Bulut", "Acar", "Karadağ", "Avcı", "Eroğlu", "Taş", "Bozkurt",
    "Ateş", "Yalçın", "Tekin", "Köse", "Turan", "Aktaş", "Çakır", "Güler",
    "Sezer", "Uçar", "Tan", "Yavuz", "Sarı", "Duman", "Keskin", "Başaran",
  ];

  var COUNTRIES = [
    { name: "Amerika", flag: "🇺🇸" },
    { name: "İngiltere", flag: "🇬🇧" },
    { name: "Kanada", flag: "🇨🇦" },
    { name: "Almanya", flag: "🇩🇪" },
    { name: "Fransa", flag: "🇫🇷" },
    { name: "Hollanda", flag: "🇳🇱" },
    { name: "İtalya", flag: "🇮🇹" },
    { name: "İspanya", flag: "🇪🇸" },
    { name: "Schengen", flag: "🇪🇺" },
    { name: "Dubai (BAE)", flag: "🇦🇪" },
    { name: "İsviçre", flag: "🇨🇭" },
    { name: "Yunanistan", flag: "🇬🇷" },
    { name: "Avusturya", flag: "🇦🇹" },
    { name: "Belçika", flag: "🇧🇪" },
    { name: "Çekya", flag: "🇨🇿" },
    { name: "Japonya", flag: "🇯🇵" },
  ];

  var VISA_TYPES = [
    "Turistik Vize",
    "Ticari Vize",
    "Eğitim Vizesi",
    "Çalışma Vizesi",
    "Aile Ziyareti",
    "Schengen Vizesi",
    "Transit Vize",
  ];

  var CITIES = [
    "İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Adana", "Konya",
    "Gaziantep", "Kayseri", "Eskişehir", "Samsun", "Trabzon", "Kocaeli",
    "Mersin", "Diyarbakır", "Denizli", "Sakarya", "Muğla", "Tekirdağ",
  ];

  // Yorum şablonları — {ulke} ve {tur} yer tutucularıyla
  var TEMPLATES_5 = [
    "{ulke} {tur} başvurum ilk seferde onaylandı. Tüm evrak listesi tek tek hazırlandı, hiçbir aşamada belirsizlik yaşamadım.",
    "Dosyamı profilime göre kurguladılar, {ulke} vizesi sorunsuz çıktı. Gerçekten profesyonel bir ekip.",
    "{ulke} için randevu ve evrak sürecinin tamamını takip ettiler. Sonuç: tek seferde onay. Teşekkürler Loren Vize.",
    "Daha önce reddedilmiştim, Loren Vize ile {ulke} {tur} başvurum bu kez kabul edildi. Dosya stratejisi gerçekten fark yaratıyor.",
    "Her sorduğum soruya saatler içinde dönüş yaptılar. {ulke} vizem zamanında ve eksiksiz çıktı.",
    "{tur} başvurumda finansal evrakların nasıl sunulacağına kadar yönlendirdiler. {ulke} onayı geldi, çok memnunum.",
    "Süreç boyunca panelden her adımı görebildim. {ulke} {tur} başvurum başarıyla sonuçlandı.",
    "Aile olarak {ulke} vizesine başvurduk, hepimizin dosyası ayrı ayrı düzenlendi ve hepsi onaylandı.",
    "Randevu bulma konusunda gerçekten hızlılar. {ulke} {tur} işlemim beklediğimden çok daha çabuk tamamlandı.",
    "İlk kez vizeye başvuruyordum, baştan sona elimden tuttular. {ulke} onayı çıkınca çok sevindim.",
    "{ulke} ticari vizem fuar tarihine yetişti. Zamanlama ve evrak planı kusursuzdu.",
    "Öğrenci olarak {ulke} eğitim vizesi aldım. Kabul mektubu sonrası tüm finansman evrağını birlikte hazırladık.",
    "Profil analizi yapıp bana en uygun kategoriyi önerdiler. {ulke} {tur} başvurum onaylandı.",
    "Telefonla bile saatlerce sabırla anlattılar. {ulke} vizem sorunsuz çıktı, kesinlikle tavsiye ederim.",
    "Evraklarımdaki eksikleri başvurudan önce yakaladılar. {ulke} {tur} onayı ilk denemede geldi.",
    "{ulke} için pasaportumu vizeli teslim aldım. Süreç şeffaf ve düzenliydi, hiç stres yaşamadım.",
    "Acil seyahatim vardı, {ulke} vizesini kısa sürede çıkardılar. Gerçekten hayat kurtardılar.",
    "Danışmanım her aşamada bilgilendirdi. {ulke} {tur} başvurum hiçbir pürüz olmadan onaylandı.",
    "Bal gibi reddedilecek bir profildim ama doğru kurguyla {ulke} vizemi aldım. İşini bilen ekip.",
    "İkinci kez yine onlarla çalıştım, yine {ulke} onayı. Güvenilir ve sonuç odaklılar.",
    "Schengen başvurumda ana ülke seçiminden tarih planına kadar her şeyi düşündüler. Onay geldi.",
    "{ulke} {tur} sürecinde tek bir gün bile belirsizlik yaşamadım. Her şey planladıkları gibi ilerledi.",
    "Belgelerim İngilizceye çevrilirken bile destek oldular. {ulke} vizem onaylandı, teşekkürler.",
    "Eşimle birlikte {ulke} vizesine başvurduk, ikimiz de aynı gün onay aldık. Süper bir deneyimdi.",
    "Bütçe dostu ve sonuç odaklı bir hizmet. {ulke} {tur} başvurum ilk seferde kabul edildi.",
  ];
  var TEMPLATES_4 = [
    "{ulke} {tur} başvurum onaylandı. Süreç biraz uzun sürdü ama sonuç güzeldi, ekip ilgiliydi.",
    "Genel olarak memnunum, {ulke} vizem çıktı. Yoğun dönemde dönüşler biraz gecikti ama sorun çözüldü.",
    "{ulke} için evrak desteği iyiydi. Randevu biraz geç bulundu ama onay sorunsuz geldi.",
    "İşlerini iyi yapıyorlar, {ulke} {tur} onayı aldım. Başta iletişimde ufak aksama oldu, sonra düzeldi.",
    "Memnun kaldım, {ulke} vizem onaylandı. Birkaç evrağı tekrar hazırlamak gerekti ama yönlendirme netti.",
    "{ulke} {tur} başvurum başarılı oldu. Süreç beklediğimden biraz uzundu ama ekip hep ulaşılabilirdi.",
  ];

  var months = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
  ];
  function randomDate() {
    var y = chance(0.65) ? 2026 : 2025;
    var m = Math.floor(rng() * 12);
    var d = 1 + Math.floor(rng() * 27);
    return { label: d + " " + months[m] + " " + y, sort: y * 372 + m * 31 + d };
  }

  var avatarColors = [
    ["#fe9132", "#f77401"],
    ["#000346", "#00057e"],
    ["#1a9c5b", "#0f6e3f"],
    ["#3b6fd6", "#23499c"],
    ["#9b4dca", "#6f2f93"],
    ["#e0567b", "#b53456"],
    ["#0fa3a3", "#0a7373"],
    ["#c98a13", "#9c6a0d"],
  ];

  function initials(first, last) {
    return (first.charAt(0) + last.charAt(0)).toUpperCase();
  }

  function maskName(first, last) {
    // Gizlilik için soyadı kısalt: "Ahmet Y."
    return first + " " + last.charAt(0) + ".";
  }

  function buildReview(i) {
    var first = pick(FIRST);
    var last = pick(LAST);
    var country = pick(COUNTRIES);
    var visa = pick(VISA_TYPES);
    var city = pick(CITIES);
    var isFive = !chance(0.18); // ~%82 beş yıldız
    var rating = isFive ? 5 : 4;
    var tpl = isFive ? pick(TEMPLATES_5) : pick(TEMPLATES_4);
    var text = tpl.replace(/\{ulke\}/g, country.name).replace(/\{tur\}/g, visa.toLowerCase());
    var date = randomDate();
    var color = avatarColors[i % avatarColors.length];
    return {
      id: i + 1,
      name: maskName(first, last),
      initials: initials(first, last),
      city: city,
      country: country.name,
      flag: country.flag,
      visa: visa,
      rating: rating,
      text: text,
      date: date.label,
      sort: date.sort,
      color: color,
      verified: chance(0.9),
    };
  }

  var COUNT = 496;
  var reviews = [];
  for (var i = 0; i < COUNT; i++) reviews.push(buildReview(i));
  reviews.sort(function (a, b) {
    return b.sort - a.sort;
  });

  window.LOREN_REVIEWS = reviews;
  window.LOREN_REVIEW_COUNTRIES = COUNTRIES;
  window.LOREN_REVIEW_VISAS = VISA_TYPES;
})();
