/* ============================================================
   Loren Vize Deneyimler — randevu & pasaport yorum üreteci
   Tohumlu (deterministik) üretim: her açılışta aynı liste.
   window.LorenExperience.build({ seed, count, kind }) ile kullanılır.
   kind: "randevu" | "pasaport"
   ============================================================ */
(function () {
  "use strict";

  function makeRng(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  var FIRST = [
    "Ahmet", "Mehmet", "Mustafa", "Ali", "Hüseyin", "Hasan", "Murat", "Ömer",
    "Yusuf", "Emre", "Burak", "Serkan", "Onur", "Kerem", "Barış", "Volkan",
    "Cem", "Eren", "Furkan", "Gökhan", "Kaan", "Selim", "Uğur", "Yiğit",
    "Elif", "Zeynep", "Merve", "Ayşe", "Esra", "Büşra", "Sena", "Gizem",
    "Selin", "Ceren", "Beyza", "Dilara", "Gamze", "İrem", "Kübra", "Melike",
    "Özge", "Pınar", "Rabia", "Sıla", "Tuğçe", "Yasemin", "Aslı", "Damla",
  ];
  var LAST = [
    "Yılmaz", "Kaya", "Demir", "Şahin", "Çelik", "Yıldız", "Yıldırım", "Öztürk",
    "Aydın", "Özdemir", "Arslan", "Doğan", "Kılıç", "Aslan", "Çetin", "Kara",
    "Koç", "Kurt", "Özkan", "Şimşek", "Korkmaz", "Aksoy", "Polat", "Güneş",
    "Bulut", "Acar", "Avcı", "Eroğlu", "Yalçın", "Tekin", "Turan", "Çakır",
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
  ];

  var VISAS = [
    "Turistik Vize",
    "Ticari Vize",
    "Eğitim Vizesi",
    "Çalışma Vizesi",
    "Aile Ziyareti",
    "Schengen Vizesi",
  ];

  var CITIES = [
    "İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Adana", "Konya",
    "Gaziantep", "Kayseri", "Eskişehir", "Samsun", "Trabzon", "Kocaeli",
    "Mersin", "Denizli", "Sakarya", "Muğla", "Tekirdağ",
  ];

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

  var months = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];

  // Randevu yorumları — {ulke} ve {tur} yer tutucularıyla
  var RANDEVU_TPL = [
    "{ulke} {tur} randevum başvurudan sadece birkaç gün sonra ayarlandı. Tarih ve saat tamamen bana uygun seçildi, çok teşekkürler.",
    "Aylardır {ulke} konsolosluğundan randevu bulamıyordum. Loren Vize sayesinde {tur} randevum kısa sürede oluştu.",
    "{ulke} için {tur} randevusu almak çok zordu ama ekip en yakın tarihi bulup bana iletti. Süreç çok hızlıydı.",
    "{ulke} randevu sistemine sürekli giriyordum, hiç yer açılmıyordu. {tur} randevumu onlar buldu, işini bilen bir ekip.",
    "{tur} için {ulke} randevum onaylandı, SMS ve e-posta ile bilgilendirildim. Tek bir adımı bile kaçırmadım.",
    "{ulke} {tur} randevumu acil istiyordum, 3 iş günü içinde uygun tarih buldular. Gerçekten hayat kurtardılar.",
    "{ulke} konsolosluğunda {tur} randevusu için haftalarca beklemem gerekiyordu, Loren Vize çok daha erken bir tarih ayarladı.",
    "Randevu tarihim, evrak hazırlığıma tam zaman bırakacak şekilde {ulke} için planlandı. Düşünceli bir hizmet.",
    "{ulke} {tur} randevum bulunduktan sonra evrak listemi de hazırladılar. Her şey tek elden ilerledi.",
    "İlk kez vize başvurusu yapıyordum, {ulke} {tur} randevumu benim adıma oluşturdular. Çok rahatladım.",
    "{ulke} için iki kişilik {tur} randevusu aldık, ikimize de aynı güne ardışık saatler ayarlandı. Mükemmel organizasyon.",
    "{ulke} randevumu istediğim şehirdeki başvuru merkezinde ayarladılar, seyahat etmeme gerek kalmadı.",
    "{tur} randevum {ulke} için beklediğimden çok daha erken bir tarihe denk geldi. İletişimleri de çok hızlı.",
    "{ulke} {tur} randevu sürecinde her aşamada bilgilendirildim. Randevu kartım hazır şekilde elime ulaştı.",
    "Randevu bulma stresini tamamen ortadan kaldırdılar. {ulke} {tur} randevum sorunsuz oluştu, teşekkür ederim.",
    "{ulke} {tur} için aylar sonrasına tarih veriyorlardı, Loren Vize bu haftaya randevu buldu. İnanılmaz hızlılar.",
  ];

  // Pasaport (sonuç) yorumları
  var PASAPORT_TPL = [
    "{ulke} {tur} başvurum onaylandı, pasaportumu vize etiketiyle elime aldım. Süreç baştan sona şeffaftı.",
    "Pasaportum {ulke} vizesi basılı şekilde teslim edildi. {tur} başvurumda hiçbir aksaklık yaşamadım.",
    "{ulke} {tur} sonucum olumlu çıktı, pasaportumu güvenle teslim aldım. Çok memnunum, teşekkürler.",
    "Daha önce reddedilmiştim, bu kez {ulke} {tur} başvurum onaylandı ve pasaportum vizeli geldi. Dosya kurgusu fark yarattı.",
    "{ulke} için {tur} vizem pasaportuma işlendi. Teslim anına kadar her aşamadan haberdar edildim.",
    "Pasaportumu {ulke} vize etiketiyle teslim aldığımda çok mutlu oldum. {tur} sürecini kusursuz yönettiler.",
    "{ulke} {tur} onayım çıktı, pasaportumdaki vize tarihleri tam planladığımız gibi. Teşekkürler Loren Vize.",
    "Ailecek {ulke} vizesine başvurduk, pasaportların hepsi {tur} onayıyla birlikte teslim edildi.",
    "{ulke} {tur} başvurum ilk seferde kabul edildi, pasaportum hızlıca elime ulaştı. Kesinlikle tavsiye ederim.",
    "Pasaportum {ulke} için çok yıllık vizeyle döndü. {tur} dosyam doğru kurgulandığı için sonuç mükemmeldi.",
    "{ulke} {tur} vizem onaylandı, pasaport teslimi sırasında bile yanımdaydılar. Güvenilir bir ekip.",
    "{ulke} konsolosluğu {tur} başvurumu onayladı, pasaportumu vize etiketiyle teslim aldım. Süreç çok düzenliydi.",
    "{ulke} {tur} sonucu beklediğimden erken çıktı, pasaportum kargoyla adresime ulaştı. Her şey için teşekkürler.",
    "Vize etiketli pasaportumu görünce çok sevindim. {ulke} {tur} başvurumda tek bir gün bile belirsizlik yaşamadım.",
  ];

  function build(opts) {
    opts = opts || {};
    var rng = makeRng(opts.seed || 1234);
    var count = opts.count || 12;
    var tpls = opts.kind === "pasaport" ? PASAPORT_TPL : RANDEVU_TPL;

    function pick(a) {
      return a[Math.floor(rng() * a.length)];
    }
    function chance(p) {
      return rng() < p;
    }

    var items = [];
    for (var i = 0; i < count; i++) {
      var c = pick(COUNTRIES);
      var visa = pick(VISAS);
      var first = pick(FIRST);
      var last = pick(LAST);
      var rating = chance(0.85) ? 5 : 4;
      var tpl = pick(tpls);
      var text = tpl
        .replace(/\{ulke\}/g, c.name)
        .replace(/\{tur\}/g, visa.toLocaleLowerCase("tr-TR"));
      items.push({
        id: i + 1,
        country: c.name,
        flag: c.flag,
        visa: visa,
        name: first + " " + last.charAt(0) + ".",
        initials: (first.charAt(0) + last.charAt(0)).toLocaleUpperCase("tr-TR"),
        city: pick(CITIES),
        color: avatarColors[i % avatarColors.length],
        rating: rating,
        text: text,
        date:
          1 + Math.floor(rng() * 27) + " " + pick(months) + " " + (chance(0.6) ? "2026" : "2025"),
        verified: chance(0.9),
      });
    }
    return items;
  }

  window.LorenExperience = { build: build, COUNTRIES: COUNTRIES, VISAS: VISAS };
})();
