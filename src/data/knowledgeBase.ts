// src/data/knowledgeBase.ts
export interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  readTime: number; // minutes
  lastUpdated: string;
  content: {
    summary: string;
    sections: KnowledgeSection[];
  };
}

export interface KnowledgeSection {
  title: string;
  type: 'text' | 'list' | 'steps' | 'warning' | 'tip' | 'table';
  content: string | string[] | TableData;
}

export interface TableData {
  headers: string[];
  rows: string[][];
}

export const knowledgeCategories = [
  { id: 'basics', name: '🎯 Základy', icon: '🎯' },
  { id: 'washing', name: '🚿 Mytí', icon: '🚿' },
  { id: 'paint', name: '🎨 Lak & Leštění', icon: '🎨' },
  { id: 'interior', name: '🪑 Interiér', icon: '🪑' },
  { id: 'wheels', name: '⚙️ Kola & Pneumatiky', icon: '⚙️' },
  { id: 'protection', name: '🛡️ Ochrana', icon: '🛡️' },
  { id: 'tools', name: '🔧 Nástroje & Vybavení', icon: '🔧' },  
  { id: 'troubleshooting', name: '🚨 Řešení problémů', icon: '🚨' },
  { id: 'advanced', name: '🎓 Pokročilé techniky', icon: '🎓' },
  { id: 'business', name: '💼 Podnikání', icon: '💼' }
];

export const knowledgeBase: KnowledgeArticle[] = [
  // === EXISTING ARTICLES ===
  {
    id: 'detailing-basics',
    title: 'Základy auto detailingu',
    category: 'basics',
    tags: ['začátečník', 'základy', 'přehled'],
    difficulty: 'beginner',
    readTime: 8,
    lastUpdated: '2024-08-02',
    content: {
      summary: 'Komplexní úvod do světa auto detailingu pro začátečníky. Naučte se základní principy, postupy a terminologii.',
      sections: [
        {
          title: 'Co je auto detailing?',
          type: 'text',
          content: 'Auto detailing je umění a věda zároveň. Jde o proces důkladného čištění, renovace a ochrany vozidla jak zvenčí, tak zevnitř. Na rozdíl od běžného mytí se detailing zaměřuje na dosažení perfektního vzhledu a dlouhodobou ochranu všech povrchů vozidla.'
        },
        {
          title: 'Základní principy',
          type: 'list',
          content: [
            'Vždy pracujte shora dolů - gravitace je váš nepřítel',
            'Používejte metodu dvou kýblů pro předcházení škrábanců',
            'Nikdy nepracujte za přímého slunečního svitu',
            'Kvalitní materiály = kvalitní výsledky',
            'Trpělivost je klíčová - nespěchejte',
            'Bezpečnost především - ochranné prostředky jsou nutné'
          ]
        },
        {
          title: 'Základní workflow',
          type: 'steps',
          content: [
            'Předmytí - oplach a snow foam',
            'Mytí - dvou-kýblová metoda',
            'Sušení - mikrovlákna nebo dmychadlo',
            'Dekontaminace - clay bar, iron remover',
            'Korekce laku - leštění (pokud potřeba)',
            'Ochrana - vosk, sealant nebo coating',
            'Interiér - vysátí, čištění, ochrana',
            'Finální kontrola a detaily'
          ]
        },
        {
          title: 'Časté chyby začátečníků',
          type: 'warning',
          content: 'Mytí kruhových pohybů (škrábe lak), použití domácích prostředků (dish soap), práce za horka, nesprávné skladování nářadí, přeskakování kroků.'
        }
      ]
    }
  },
  {
    id: 'two-bucket-method',
    title: 'Metoda dvou kýblů',
    category: 'washing',
    tags: ['mytí', 'technika', 'bezpečnost'],
    difficulty: 'beginner',
    readTime: 5,
    lastUpdated: '2024-08-02',
    content: {
      summary: 'Naučte se správnou techniku mytí pomocí dvou kýblů, která minimalizuje riziko poškození laku.',
      sections: [
        {
          title: 'Proč dva kýble?',
          type: 'text',
          content: 'Metoda dvou kýblů je zlatý standard v auto detailingu. Jeden kýbl obsahuje čistou mýdlovou vodu, druhý slouží k oplachování rukavice. Tím zabráníme zpětnému zanášení nečistot na vozidlo.'
        },
        {
          title: 'Potřebné vybavení',
          type: 'list',
          content: [
            'Dva kýble (minimálně 15 litrů)',
            'Grit guards (síta na dno kýblů)',
            'Kvalitní mikrovláknové rukavice',
            'pH neutrální autošampon',
            'Měkká voda (ideálně demineralizovaná)'
          ]
        },
        {
          title: 'Postup krok za krokem',
          type: 'steps',
          content: [
            'Naplňte první kýbl čistou vodou (oplachový)',
            'Druhý kýbl naplňte vodou a přidejte šampon',
            'Do obou kýblů vložte grit guards',
            'Namočte rukavici v mýdlovém kýblu',
            'Umyjte jednu sekci vozidla (přibližně 60x60 cm)',
            'Opláchněte rukavici v čistém kýblu',
            'Třepejte rukavicí o grit guard',
            'Vraťte se k mýdlovému kýblu a pokračujte'
          ]
        },
        {
          title: 'Pro tip',
          type: 'tip',
          content: 'Používejte více rukavic - jednu pro horní části (méně špinavé), druhou pro spodní části a podběhy. Měňte vodu v kýblech, pokud se příliš znečistí.'
        }
      ]
    }
  },
  {
    id: 'paint-correction-guide',
    title: 'Kompletní průvodce korekcí laku',
    category: 'paint',
    tags: ['leštění', 'korekce', 'defekty'],
    difficulty: 'advanced',
    readTime: 20,
    lastUpdated: '2024-08-02',
    content: {
      summary: 'Detailní průvodce korekcí laku od diagnostiky defektů až po finální leštění. Pro pokročilé detailery.',
      sections: [
        {
          title: 'Typy defektů laku',
          type: 'table',
          content: {
            headers: ['Defekt', 'Příčina', 'Odstranitelnost', 'Metoda'],
            rows: [
              ['Swirl marks', 'Nesprávné mytí', 'Ano', 'Jemné leštění'],
              ['Škrábance', 'Kontakt s ostrými předměty', 'Částečně', 'Hrubé + jemné leštění'],
              ['Oxidace', 'UV záření, stáří', 'Ano', 'Compound + polish'],
              ['Etch marks', 'Kyselé látky', 'Částečně', 'Wet sanding + polish'],
              ['Holograms', 'Nesprávné leštění', 'Ano', 'Jemný polish'],
              ['Orange peel', 'Tovární nástřik', 'Ano', 'Wet sanding + polish']
            ]
          }
        },
        {
          title: 'Diagnostika pomocí světla',
          type: 'text',
          content: 'Použijte LED svítilnu nebo halogenovou lampu k odhalení defektů. Světlo držte pod různými úhly a sledujte odraz. Swirl marks vypadají jako pavoučí síť, škrábance jako přímé čáry, oxidace zatemňuje lesk.'
        },
        {
          title: 'Výběr správných produktů',
          type: 'steps',
          content: [
            'Otestujte na malé, skryté ploše',
            'Začněte nejjemnějším produktem',
            'Postupně zvyšujte agresivitu podle potřeby',
            'Vždy dokončete jemným polishem',
            'Použijte IPA wipe pro odstranění olejů'
          ]
        },
        {
          title: 'Mokré broušení - extrémní případy',
          type: 'warning',
          content: 'Mokré broušení odstraňuje mikrony laku a je nevratné! Používejte pouze v krajních případech a vždy s bruskami P1500 a jemnějšími. Vyžaduje rozsáhlé znalosti a zkušenosti.'
        },
        {
          title: 'Technika strojového leštění',
          type: 'list',
          content: [
            'Rychlost: začněte pomalu (speed 2-3)',
            'Tlak: nechte váhu stroje pracovat',
            'Pohyb: překrývající se tahy 50%',
            'Pattern: crosshatch (křížový vzor)',
            'Pracovní plocha: 60x60 cm sekce',
            'Počet průchodů: 4-6 v každém směru'
          ]
        }
      ]
    }
  },
  {
    id: 'ceramic-coating-application',
    title: 'Aplikace keramických coatingů',
    category: 'protection',
    tags: ['coating', 'ochrana', 'aplikace'],
    difficulty: 'expert',
    readTime: 15,
    lastUpdated: '2024-08-02',
    content: {
      summary: 'Profesionální průvodce aplikací keramických coatingů s důrazem na přípravu povrchu a správnou techniku.',
      sections: [
        {
          title: 'Příprava prostředí',
          type: 'text',
          content: 'Keramické coatingy vyžadují kontrolované prostředí. Ideální teplota je 18-25°C, vlhkost pod 60%. Zajistěte dobré osvětlení a větrání. Avoid přímého slunečního světla a prachu.'
        },
        {
          title: 'Příprava povrchu - kritická fáze',
          type: 'steps',
          content: [
            'Dokonalé mytí a dekontaminace',
            'Clay bar treatment',
            'Paint correction (100% nezbytné)',
            'IPA wipe (isopropanol 50:50)',
            'Panel wipe pro odstranění všech olejů',
            'Kontrola pod LED světlem',
            'Tack cloth pro finální čištění'
          ]
        },
        {
          title: 'Aplikační technika',
          type: 'list',
          content: [
            'Nanášejte po malých sekcích (50x50 cm)',
            'Rovnoměrné kruhové pohyby',
            'Tenká vrstva - méně je více',
            'Leveling time: 1-2 minuty',
            'Buffing mikroverlurem v křížovém vzoru',
            'Kontrola pod světlem po každé sekci',
            'Nepřekrývejte již vytvrzené oblasti'
          ]
        },
        {
          title: 'Vytvrzování a údržba',
          type: 'text',
          content: 'První 24 hodin je kritických - žádný kontakt s vodou! Plné vytvrzení trvá 7-14 dní. První mytí až po týdnu, pouze pH neutrálním šamponem. Avoid automatické myčky minimálně 30 dní.'
        },
        {
          title: 'Časté problémy a řešení',
          type: 'table',
          content: {
            headers: ['Problém', 'Příčina', 'Prevence', 'Řešení'],
            rows: [
              ['High spots', 'Příliš tlustá vrstva', 'Tenčí aplikace', 'Polish + reaplikace'],
              ['Streaking', 'Nerovnoměrné bufování', 'Lepší technika', 'Panel wipe + reaplikace'],
              ['Rainbow effect', 'Kontaminace povrchu', 'Lepší příprava', 'Odstranění + začít znovu'],
              ['Poor durability', 'Špatná příprava', 'Dokonalá dekontaminace', 'Kompletní příprava znovu']
            ]
          }
        }
      ]
    }
  },
  {
    id: 'leather-care-guide',
    title: 'Péče o kožený interiér',
    category: 'interior',
    tags: ['kůže', 'interiér', 'údržba'],
    difficulty: 'intermediate',
    readTime: 12,
    lastUpdated: '2024-08-02',
    content: {
      summary: 'Kompletní průvodce péčí o kožený interiér - od čištění po dlouhodobou ochranu.',
      sections: [
        {
          title: 'Typy kožených povrchů',
          type: 'text',
          content: 'Rozlišujeme přírodní kůži (nejkvalitější), semi-aniline (středně ošetřená), pigmentovanou kůži (nejvíce ošetřená) a umělou kůži. Každý typ vyžaduje specifický přístup a produkty.'
        },
        {
          title: 'Test typu kůže',
          type: 'tip',
          content: 'Kapněte malou kapku vody na nenápadné místo. Pokud se vsákne rychle, je kůže málo ošetřená. Pokud stečt, je silně pigmentovaná. Semi-aniline vsaje pomalu.'
        },
        {
          title: 'Čištění kůže krok za krokem',
          type: 'steps',
          content: [
            'Důkladné vysátí všech spár a záhybů',
            'Test čisticího prostředku na skryté místo',
            'Aplikace leather cleaner na mikrovlákno',
            'Jemné kruhové pohyby bez tlaku',
            'Odstraňování nečistot čistým vlhkým hadříkem',
            'Sušení na vzduchu (ne fén!)',
            'Kontrola výsledku pod dobrým světlem'
          ]
        },
        {
          title: 'Kondicionování a ochrana',
          type: 'list',
          content: [
            'Aplikujte kondicionér jen na čistou kůži',
            'Tenká vrstva rovnoměrně rozprostřená',
            'Nechte působit dle návodu (obvykle 15-30 min)',
            'Buffujte přebytky čistým mikrovláknem',
            'Pro extra ochranu použijte leather protectant',
            'Opakujte proces každé 3-6 měsíců'
          ]
        },
        {
          title: 'Řešení běžných problémů',
          type: 'table',
          content: {
            headers: ['Problém', 'Řešení', 'Prevence'],
            rows: [
              ['Praskliny', 'Leather repair kit', 'Pravidelné kondicionování'],
              ['Vyblednutí', 'Leather dye/colorant', 'UV ochrana, kondicionér'],
              ['Skvrny', 'Specialized cleaner', 'Okamžité čištění'],
              ['Tvrdost', 'Intenzivní kondicionování', 'Pravidelná údržba'],
              ['Nepříjemný zápach', 'Ozone treatment', 'Větrání, čištění']
            ]
          }
        },
        {
          title: 'Dlouhodobá údržba',
          type: 'warning',
          content: 'Kůže potřebuje „dýchat" - nepřekrývejte ji nepropustnými materiály. Vyvarujte se extrémních teplot a přímého slunečního světla. Při parkování používejte sluneční clony.'
        }
      ]
    }
  },
  {
    id: 'wheel-restoration',
    title: 'Renovace poškozených kol',
    category: 'wheels',
    tags: ['kola', 'renovace', 'oprava'],
    difficulty: 'advanced',
    readTime: 18,
    lastUpdated: '2024-08-02',
    content: {
      summary: 'Profesionální techniký renovace poškozených alu kol včetně opravy škrábanců a koroze.',
      sections: [
        {
          title: 'Diagnostika poškození',
          type: 'list',
          content: [
            'Povrchové škrábance - pouze v laku',
            'Hluboké škrábance - až do kovu',
            'Koroze - bílé/černé skvrny',
            'Deformace - ohnutí nebo praskliny',
            'Poškození ventilku - úniky vzduchu',
            'Opotřebení náboje - vůle v ložiskách'
          ]
        },
        {
          title: 'Demontáž a příprava',
          type: 'steps',
          content: [
            'Sejmutí kola z vozidla',
            'Vypuštění vzduchu z pneumatiky',
            'Demontáž pneumatiky (pokud nutné)',
            'Odmašťování celého kola',
            'Maskování ventilku a senzorů',
            'Hrubé čištění rotačním kartáčem',
            'Kontrola trhlin pod UV lampou'
          ]
        },
        {
          title: 'Proces renovace',
          type: 'text',
          content: 'Začněte hrubým broušením P400-P600 pro odstranění poškození. Postupně přecházejte na jemnější brusiva až P1500. Pro hluboké škrábance použijte spot putty. Primer aplikujte ve 2-3 tenkých vrstvách.'
        },
        {
          title: 'Lakování kol',
          type: 'warning',
          content: 'Používejte pouze vysokoteplotní automotive laky! Standardní laky nevydrží brzdné teplo. Aplikujte 3-4 tenké vrstvy s 15min intervaly. Vytvrzování při 60°C po dobu 30 minut.'
        },
        {
          title: 'Speciální techniky podle typu kola',
          type: 'table',
          content: {
            headers: ['Typ povrchu', 'Technika', 'Speciální požadavky'],
            rows: [
              ['Lesklý lak', 'Standardní proces', 'Clear coat povinný'],
              ['Matný lak', 'Bez clear coatu', 'Speciální matný lak'],
              ['Kartáčovaný hliník', 'Scotch-Brite pad', 'Konzistentní vzor'],
              ['Eloxovaný povrch', 'Chemické odstraňování', 'Znovu-eloxování'],
              ['Chrome/PVD', 'Pouze leštění', 'Speciální poliery']
            ]
          }
        }
      ]
    }
  },
  {
    id: 'water-spots-removal',
    title: 'Odstranění vodních skvrn',
    category: 'troubleshooting',
    tags: ['skvrny', 'voda', 'minerály'],
    difficulty: 'intermediate',
    readTime: 10,
    lastUpdated: '2024-08-02',
    content: {
      summary: 'Komplexní řešení problému vodních skvrn - od prevence po odstranění nejodolnějších typů.',
      sections: [
        {
          title: 'Typy vodních skvrn',
          type: 'text',
          content: 'Rozlišujeme Type I (minerální usazeniny na povrchu), Type II (etch marks do laku) a kombinované skvrny. Type I lze odstranit čištěním, Type II vyžaduje leštění nebo i wet sanding.'
        },
        {
          title: 'Identifikace typu skvrny',
          type: 'tip',
          content: 'Po umytí a osušení přejeďte prstem po skvrně. Pokud cítíte výstupek, je to Type I. Pokud je povrch hladký ale skvrna viditelná, je to Type II (etch mark).'
        },
        {
          title: 'Odstranění Type I skvrn (minerální usazeniny)',
          type: 'steps',
          content: [
            'Umyjte vozidlo standardně',
            'Aplikujte water spot remover',
            'Nechte působit 2-5 minut',
            'Jemně protřete mikrovláknem',
            'Opláchněte demineralizovanou vodou',
            'Okamžitě osušte',
            'Při neúspěchu opakujte nebo použijte clay bar'
          ]
        },
        {
          title: 'Ošetření Type II skvrn (etch marks)',
          type: 'list',
          content: [
            'Lehké etch marks: jemný polish + DA polisher',
            'Středně hluboké: cutting compound + polish',
            'Hluboké etch marks: wet sanding P2000 + compound',
            'Extrémní případy: mokré broušení P1500 + korekce',
            'Vždy dokončete jemným polishem',
            'Aplikujte ochranu (vosk/sealant/coating)'
          ]
        },
        {
          title: 'Prevence vodních skvrn',
          type: 'table',
          content: {
            headers: ['Opatření', 'Účinnost', 'Náklady'],
            rows: [
              ['Mytí ve stínu', 'Vysoká', 'Žádné'],
              ['Okamžité sušení', 'Vysoká', 'Nízké'],
              ['Demineralizovaná voda', 'Velmi vysoká', 'Střední'],
              ['Hydrofobní coating', 'Extrémní', 'Vysoké'],
              ['Garážování', 'Absolutní', 'Vysoké'],
              ['Rychlý detailer po mytí', 'Střední', 'Nízké']
            ]
          }
        },
        {
          title: 'Domácí řešení',
          type: 'warning',
          content: 'Vyhněte se domácím receptům s octem nebo citronovou šťávou! Kyseliny mohou způsobit permanentní poškození laku. Používejte pouze produkty určené pro automotive použití.'
        }
      ]
    }
  },
  {
    id: 'detailing-business-basics',
    title: 'Založení detailing podnikání',
    category: 'business', 
    tags: ['podnikání', 'startup', 'finance'],
    difficulty: 'intermediate',
    readTime: 25,
    lastUpdated: '2024-08-02',
    content: {
      summary: 'Praktický průvodce založením úspěšného detailing podnikání od business plánu po první zakázky.',
      sections: [
        {
          title: 'Výchozí investice',
          type: 'table',
          content: {
            headers: ['Kategorie', 'Základní úroveň', 'Profesionální úroveň', 'Premium úroveň'],
            rows: [
              ['Stroje', '50,000 Kč', '150,000 Kč', '500,000 Kč'],
              ['Chemie', '30,000 Kč', '80,000 Kč', '200,000 Kč'],
              ['Vybavení', '25,000 Kč', '75,000 Kč', '150,000 Kč'],
              ['Fahrzeug/Přívěs', '0 Kč', '200,000 Kč', '800,000 Kč'],
              ['Marketing', '10,000 Kč', '50,000 Kč', '150,000 Kč'],
              ['Celkem', '115,000 Kč', '555,000 Kč', '1,800,000 Kč']
            ]
          }
        },
        {
          title: 'Cenová strategie',
          type: 'text',
          content: 'Analyzujte lokální konkurenci, ale nekopírujte ceny. Kalkulujte všechny náklady včetně času, materiálu, režie a zisku. Minimální hodinová sazba by měla být 500-800 Kč v závislosti na regionu a úrovni služeb.'
        },
        {
          title: 'Typy služeb pro začátek',
          type: 'list',
          content: [
            'Kompletní mytí vozu (vnější + vnitřní)',
            'Paint correction (základní úroveň)',
            'Aplikace vosků a sealantů',
            'Hloubkové čištění interiéru',
            'Čištění a ochrana kol',
            'Sezonní příprava vozidla',
            'Odstraňování skvrn a pachů'
          ]
        },
        {
          title: 'Marketing a získávání zákazníků',
          type: 'steps',
          content: [
            'Vytvořte profesionální web s galerií',
            'Aktivní přítomnost na sociálních sítích',
            'Before/after fotografie - nejsilnější marketing',
            'Lokální SEO optimalizace',
            'Partnerství s autosalony a servisy',
            'Doporučující program pro stávající zákazníky',
            'Prezence na autoshow a meetingech'
          ]
        },
        {
          title: 'Právní a administrativní záležitosti',
          type: 'list',
          content: [
            'Živnostenský list (řemeslná živnost)',
            'Pojištění odpovědnosti (minimum 10M Kč)',
            'Pojištění vybavení a vozidla',
            'Daňová evidence nebo účetnictví',
            'GDPR compliance pro zákaznická data',
            'Smlouvy s dodavateli chemie',
            'Všeobecné obchodní podmínky'
          ]
        },
        {
          title: 'Časté chyby při zakládání',
          type: 'warning',
          content: 'Podcenění pojištění, špatná cenová kalkulace, investice do špatného vybavení, absence marketingu, ignorování konkurence, nedostatek provozního kapitálu na první měsíce.'
        },
        {
          title: 'Škálování podnikání',
          type: 'text',
          content: 'Po stabilizaci základu zvažte rozšíření o mobile služby, zaměstnance, specialized služby (PPF, ceramic coating), nebo franchise model. Vždy růst postupně a udržujte kvalitu.'
        }
      ]
    }
  },

  // === NEW ENHANCED ARTICLES ===
  {
    id: 'microfiber-mastery',
    title: 'Mikrovolánka - kompletní průvodce',
    category: 'tools',
    tags: ['mikrovlákna', 'nástroje', 'údržba', 'technika'],
    difficulty: 'intermediate',
    readTime: 12,
    lastUpdated: '2024-08-04',
    content: {
      summary: 'Profesionální poznání mikrovelánek - od výběru správného typu po péči a skladování. Důležité pro každého detailera.',
      sections: [
        {
          title: 'Anatomie mikrovlákna',
          type: 'text',
          content: 'Mikrovlákno je syntetická směs polyesteru (80%) a polyamidu (20%). Jednotlivá vlákna jsou 100x tenčí než lidský vlas. Polyester zajišťuje pevnost, polyamid (nylon) absorpci. GSM (gramy na m²) určuje hustotu a kvalitu.'
        },
        {
          title: 'Typy podle GSM a účelu',
          type: 'table',
          content: {
            headers: ['Typ', 'GSM', 'Účel', 'Vlastnosti'],
            rows: [
              ['Waffle weave', '200-300', 'Sušení', 'Vysoká absorpce, bezpečné'],
              ['Plush edgeless', '350-500', 'Buffing, final wipe', 'Ultra jemné, bez okrajů'],
              ['Short pile', '300-400', 'Aplikace produktů', 'Rovnoměrná distribuce'],
              ['Terry cloth', '400-600', 'Hrubé čištění', 'Mechanické působení'],
              ['Suede finish', '250-350', 'Glass cleaning', 'Bez šmouh na skle'],
              ['Pearl weave', '500-800', 'Premium buffing', 'Luxusní finish']
            ]
          }
        },
        {
          title: 'Color coding systém',
          type: 'list',
          content: [
            'Žlutá/Bílá - Lak, jemná povrchy',
            'Modrá - Skla a zrcátka',
            'Červená - Kola a podběhy',
            'Zelená - Interiér obecně',
            'Šedá/Černá - Nejšpinačivější práce',
            'Oranžová - Engine bay, technické kapaliny'
          ]
        },
        {
          title: 'Správná péče o mikrovlákna',
          type: 'steps',
          content: [
            'Proplachování před praním - odstranění hrubých nečistot',
            'Praní při 30-40°C s mikrovelákovým práškem',
            'NIKDY nepoužívejte aviváž nebo bělidla',
            'Sušení na vzduchu nebo nízké teploty (max 60°C)',
            'Skladování v uzavřených kontejnerech',
            'Separace podle použití a stupně znečistění',
            'Pravidelná kontrola a výměna opotřebených'
          ]
        },
        {
          title: 'Profi techniky používání',
          type: 'text',
          content: 'Používejte "folding technique" - složte do čtvrtiny, získáte 8 čistých povrchů. Pro buffing používejte křížový vzor. Tlak vždy minimální - mikrovlákno pracuje kapilárně. Pro skla používejte lineární pohyby, ne kruhy.'
        },
        {
          title: 'Časté chyby a jejich důsledky',
          type: 'warning',
          content: 'Míchání s bavlnou v pračce (kontaminace vlákny), používání aviváže (snižuje absorpci), přílišný tlak (poškození povrchu), nesprávné skladování (bakterie, plísně).'
        },
        {
          title: 'Test kvality mikrovlákna',
          type: 'tip',
          content: 'Kapněte vodu na mikrovlákno. Kvalitní okamžitě absorbuje, nekvalitní voda stéká. Přejeďte rukou - kvalitní je jemné a nepráská, nekvalitní drápe a je drsné.'
        }
      ]
    }
  },

  {
    id: 'snow-foam-science',
    title: 'Věda za snow foam aplikací',
    category: 'washing',
    tags: ['snow foam', 'předmytí', 'chemie', 'technika'],
    difficulty: 'intermediate',
    readTime: 10,
    lastUpdated: '2024-08-04',
    content: {
      summary: 'Pochopte principy snow foam, správné poměry míchání a optimální techniky aplikace pro maximální účinnost.',
      sections: [
        {
          title: 'Chemie snow foam',
          type: 'text',
          content: 'Snow foam obsahuje anionaktivní tenzidy (snižují povrchové napětí), stabilizátory pěny (prodlužují dwell time), enkapsulující látky (obalují nečistoty) a pH buffery (ochrana laku). Správné pH je 7-10 pro bezpečnost.'
        },
        {
          title: 'Parametry míchání podle kontaminace',
          type: 'table',
          content: {
            headers: ['Stav vozidla', 'Poměr (foam:voda)', 'Dwell time', 'Opakování'],
            rows: [
              ['Čisté (týdenní)', '1:10', '3-5 min', '1x'],
              ['Lehce špinavé', '1:8', '5-7 min', '1x'],
              ['Středně špinavé', '1:6', '7-10 min', '1-2x'],
              ['Velmi špinavé', '1:4', '10-15 min', '2-3x'],
              ['Extrémní znečištění', '1:3', '15+ min', '3x+ s opláchnutím']
            ]
          }
        },
        {
          title: 'Technika aplikace pro maximum účinnosti',
          type: 'steps',
          content: [
            'Oplach vozidla studenou vodou pro navlhčení',
            'Aplikace odspoda nahoru - gravitace pomáhá',
            'Překrytí spray patternu o 50%',
            'Tlustá, stabilní vrstva - "snow" efekt',
            'Respektování dwell time dle teploty',
            'Oplach shora dolů vysokým tlakem',
            'Kontrola účinnosti před hand wash'
          ]
        },
        {
          title: 'Faktory ovlivňující účinnost',
          type: 'list',
          content: [
            'Teplota vozidla - chladnější = lepší',
            'Tvrdost vody - měkká voda = stabilnější pěna',
            'Směr větru - může urychlit schnoucí',
            'Typ kontaminace - organická vs. anorganická',
            'Typ laku - citlivější require gentle formulas',
            'Kvalita foam lance - komprese a tryska'
          ]
        },
        {
          title: 'Troubleshooting běžných problémů',
          type: 'table',
          content: {
            headers: ['Problém', 'Příčina', 'Řešení'],
            rows: [
              ['Tenká pěna', 'Vysoké ředění', 'Snižte poměr vody'],
              ['Rychle mizí', 'Tvrdá voda/horko', 'Destilovaná voda/stín'],
              ['Nezvedá nečistoty', 'Krátký dwell time', 'Prodlužte působení'],
              ['Zaschlá na laku', 'Příliš horko', 'Pracujte ve stínu'],
              ['Špatná adheze', 'Mastný povrch', 'IPA wipe před aplikací']
            ]
          }
        },
        {
          title: 'Zimní specifika',
          type: 'tip',
          content: 'V zimě používejte teplejší vodu (ne horkou!) pro lepší aktivaci. Očekávejte rychlejší schnutí kvůli nízké vlhkosti. Protimrazové přísady mohou bránit foam aktivitě.'
        },
        {
          title: 'Safety upozornění',
          type: 'warning',
          content: 'Nikdy nenechávejte foam zaschnout na laku! V extrémních teplotách zkraťte dwell time. Vždy testujte nové produkty na malé ploše.'
        }
      ]
    }
  },

  {
    id: 'machine-polishing-fundamentals',
    title: 'Základy strojového leštění',
    category: 'tools',
    tags: ['leštění', 'stroje', 'technika', 'DA polisher'],
    difficulty: 'advanced',
    readTime: 18,
    lastUpdated: '2024-08-04',
    content: {
      summary: 'Komplexní průvodce strojovým leštěním - od výběru stroje po pokročilé techniky. Nezbytné pro quality paint correction.',
      sections: [
        {
          title: 'Typy polisherů a jejich použití',
          type: 'table',
          content: {
            headers: ['Typ', 'Pohyb', 'Agresivita', 'Použití', 'Pro začátečníky'],
            rows: [
              ['Dual Action (DA)', 'Orbitální + rotační', 'Nízká-střední', 'Universal, bezpečný', 'Ano'],
              ['Rotační', 'Pouze rotační', 'Vysoká', 'Heavy correction', 'Ne'],
              ['Forced Rotation', 'DA s gear driven', 'Střední-vysoká', 'Efficient correction', 'Částečně'],
              ['Mikro DA', '8-12mm orbit', 'Velmi nízká', 'Finishing, detaily', 'Ano'],
              ['Long Throw DA', '15-21mm orbit', 'Střední', 'Fast cutting', 'Částečně']
            ]
          }
        },
        {
          title: 'Výběr správných padů',
          type: 'text',
          content: 'Pody určují agresivitu. Microfiber cutting pads = nejvyšší korekce, foam cutting = střední korekce, foam polishing = finishing, microfiber finishing = ultra fine finishing. Velikost padu: 75-80% plochy backup plate.'
        },
        {
          title: 'Základní technika - SPEED, PRESSURE, PATTERN',
          type: 'steps',
          content: [
            'START: Speed 2, žádný dodatečný tlak',
            'Prime pad - rozetřete product bez zapnutí',
            'Zapněte stroj na speed 1, spread product',
            'Zvyšte na working speed (3-4)',
            'Overlapping passes - 50% překrytí',
            'Work time: 60-90 sekund per section',
            'Finishing pass na speed 2 s čistým padem',
            'Wipe off s IPA solution'
          ]
        },
        {
          title: 'Správný grip a pozice těla',
          type: 'list',
          content: [
            'Grip: jedna ruka na tělo, druhá na auxiliary handle',
            'Pozice: rovné záda, flex v kolenou',
            'Výška: stroj v úrovni pasu-hrudníku',
            'Pohyb: celým tělem, ne jen rukama',
            'Směr: lineární tahy v křížovém vzoru',
            'Break: každých 20-30 minut rest'
          ]
        },
        {
          title: 'Troubleshooting - časté problémy',
          type: 'table',
          content: {
            headers: ['Problém', 'Příčina', 'Řešení'],
            rows: [
              ['Hologrmy/buffer trails', 'Příliš rychlá speed', 'Snižte otáčky, longer work time'],
              ['Nedostatečný cut', 'Málo agresivní setup', 'Agresivnější pad/compound'],
              ['Burn through', 'Příliš agresivní', 'Jemnější setup, watch pressure'],
              ['Product splatter', 'Příliš vysoká speed', 'Lower speed pro priming'],
              ['Swirl marks', 'Dirty/worn pad', 'Clean nebo replace pad'],
              ['Uneven correction', 'Inconsistent pressure', 'Steady, light pressure']
            ]
          }
        },
        {
          title: 'Údržba strojů a padů',
          type: 'text',
          content: 'Pravidelně čistěte pady během práce compressed air nebo pad cleaning brush. Po skončení důkladné vyčištění padů (IPA + microfiber), kontrola backing plate (plochosti), mazání bearings u quality strojů každých 50 hodin provozu.'
        },
        {
          title: 'Bezpečnostní upozornění',
          type: 'warning',
          content: 'Vždy ochranné brýle a respirátor! Nepoužívejte na hot panels. Watch pro electrical cords. Nikdy nenechávejte running stroj bez kontaktu s površí - pad může explode.'
        },
        {
          title: 'Pro tip pro efektivitu',
          type: 'tip',
          content: 'Investujte do quality backing plates (balanced, precise). Mějte multiple pads ready - alternation je efficient. Use pad conditioner pro extended pad life.'
        }
      ]
    }
  },

  {
    id: 'engine-bay-detailing',
    title: 'Detailing motorového prostoru',
    category: 'advanced',
    tags: ['motor', 'engine bay', 'čištění', 'bezpečnost'],
    difficulty: 'intermediate',
    readTime: 15,
    lastUpdated: '2024-08-04',
    content: {
      summary: 'Bezpečné a efektivní čištění motorového prostoru. Od přípravy po finální ochranu s důrazem na elektroniku.',
      sections: [
        {
          title: 'Příprava - kritická fáze',
          type: 'steps',
          content: [
            'Motor studený - minimálně 2 hodiny po jízdě',
            'Odpojení záporné svorky baterie',
            'Demontáž air intake (pokud možné)',
            'Zakrytí citlivých komponentů plastic bags',
            'Foto dokumentace before state',
            'Kontrola úniků oleje/coolant',
            'Příprava nářadí a ochranných pomůcek'
          ]
        },
        {
          title: 'Co zakrýt/chránit',
          type: 'list',
          content: [
            'Alternátor a starter motor',
            'Fuse box a electrical connectors',
            'Engine control unit (ECU)',
            'Air intake system',
            'Brake fluid reservoir',
            'Battery terminals (pokud připojené)',
            'Sensitive sensors (MAF, O2 sensors)'
          ]
        },
        {
          title: 'Čisticí proces podle kontaminace',
          type: 'table',
          content: {
            headers: ['Typ znečištění', 'Produkt', 'Metoda', 'Dwell time'],
            rows: [
              ['Standardní prach', 'APC 1:10', 'Soft brush + microfiber', '2-3 min'],
              ['Mastný povrch', 'Degreaser', 'Steam + brush', '5-10 min'],
              ['Starý olej', 'Heavy degreaser', 'Multiple applications', '15+ min'],
              ['Koroze', 'Rust converter', 'Brush application', 'Per instructions'],
              ['Salt deposits', 'Acid-based cleaner', 'Careful application', '3-5 min']
            ]
          }
        },
        {
          title: 'Doporučené nástroje',
          type: 'text',
          content: 'Steam cleaner (ideální), soft bristle brushes různých velikostí, detail brushes pro tight spaces, microfiber cloths, compressed air pro sušení, LED light pro visibility.'
        },
        {
          title: 'Sušení a finalizace',
          type: 'steps',
          content: [
            'Compressed air - důkladné vysušení',
            'Odstraňování protective covers',
            'Kontrola všech connections',
            'Aplikace dressing na plastic/rubber parts',
            'Final inspection pod good lighting',
            'Test start - engine functionality',
            'Photo documentation after state'
          ]
        },
        {
          title: 'Aplikace protection products',
          type: 'list',
          content: [
            'Silicone spray - rubber hoses a seals',
            'Plastic restorer - faded trim pieces',
            'Metal polish - appropriate surfaces',
            'Ceramic coating - long-term protection',
            'Avoid - oil-based products on hot surfaces'
          ]
        },
        {
          title: 'Bezpečnostní upozornění',
          type: 'warning',
          content: 'NIKDY nesprejujte water directly na electrical components! Vždy odpojte battery. Pokud nejste si jisti, konzultujte s mechanikem. Some vehicles require special procedures.'
        },
        {
          title: 'Seasonal considerations',
          type: 'tip',
          content: 'Zimní engine bay cleaning should focus na salt removal. Letní cleaning může být více aggressive díky better drying conditions. Always check manufacturer warranties před aggressive cleaning.'
        }
      ]
    }
  },

  {
    id: 'paint-protection-film-guide',
    title: 'Paint Protection Film (PPF) průvodce',
    category: 'protection',
    tags: ['PPF', 'ochrana', 'instalace', 'údržba'],
    difficulty: 'expert',
    readTime: 22,
    lastUpdated: '2024-08-04',
    content: {
      summary: 'Komplexní guide pro PPF - od výběru materiálu po instalaci a dlouhodobou údržbu. Pro profesionální aplikátory.',
      sections: [
        {
          title: 'Typy PPF materiálů',
          type: 'table',
          content: {
            headers: ['Typ', 'Tloušťka', 'Self-healing', 'Záruka', 'Použití'],
            rows: [
              ['Standard TPU', '150-180 μm', 'Ne', '5-7 let', 'Basic protection'],
              ['Self-healing TPU', '150-200 μm', 'Ano (teplo)', '7-10 let', 'Premium applications'],
              ['Ceramic coated PPF', '180-200 μm', 'Ano', '10+ let', 'Ultimate protection'],
              ['Matte PPF', '150-180 μm', 'Limitované', '5-7 let', 'Matte finishes'],
              ['Colored PPF', '180-200 μm', 'Varies', '5-8 let', 'Color change + protection']
            ]
          }
        },
        {
          title: 'Příprava povrchu - absolutně kritická',
          type: 'steps',
          content: [
            'Paint correction - 95%+ perfection required',
            'Clay bar treatment - zero contamination',
            'IPA wipe - 50:50 isopropanol solution',
            'Panel wipe - remove all polish oils',
            'Tack cloth - final dust removal',
            'Environmental control - dust-free space',
            'Temperature control - 20-25°C ideal',
            'Final inspection under proper lighting'
          ]
        },
        {
          title: 'Nástroje pro professional instalaci',
          type: 'list',
          content: [
            'Heat gun - controllable temperature',
            'Felt edge squeegees - various sizes',
            'Knifeless tape - clean cutting',
            'Spray bottles - slip solution',
            'IR thermometer - temperature monitoring',
            'Precision cutting tools - exacto knives',
            'Quality lighting - LED panels preferred'
          ]
        },
        {
          title: 'Instalační proces overview',
          type: 'text',
          content: 'Wet aplikace method: spray panel i film s slip solution (baby shampoo + water). Position film, squeeze out solution od centra k okrajům. Heat forming na curves - gentle heat, avoid overheating. Edge tucking requires precision cutting.'
        },
        {
          title: 'Common problémы a solutions',
          type: 'table',
          content: {
            headers: ['Problém', 'Příčina', 'Prevention', 'Fix možnost'],
            rows: [
              ['Bubbles/tunneling', 'Trapped air/solution', 'Better squeegee technique', 'Pin prick + heat'],
              ['Edge lifting', 'Contamination/poor prep', 'Perfect surface prep', 'Re-adhesion možné'],
              ['Orange peel texture', 'Too much heat', 'Temperature control', 'Often permanent'],
              ['Distortion', 'Over-stretching', 'Proper film handling', 'Usually permanent'],
              ['Poor conformability', 'Wrong film choice', 'Research aplikace', 'Material replacement']
            ]
          }
        },
        {
          title: 'Post-installation care',
          type: 'steps',
          content: [
            'Curing period - 48-72 hours no water',
            'Initial inspection - address issues immediately',
            'First wash - hand wash only, pH neutral',
            'Avoid automatic car washes - 30 days minimum',
            'Regular maintenance - treat jako premium paint',
            'Professional inspection - annually recommended'
          ]
        },
        {
          title: 'Maintenance best practices',
          type: 'text',
          content: 'PPF requires careful maintenance. Use only pH neutral products, avoid abrasive polishes, regular washing prevents contaminant buildup. Self-healing activated by heat (sun or heat gun). Professional PPF-safe ceramic coatings can enhance protection.'
        },
        {
          title: 'ROI considerations',
          type: 'tip',
          content: 'Quality PPF installation pays for itself through paint preservation. Resale value significantly higher na protected vehicles. Factor in time saved na paint maintenance when ROI calculating.'
        },
        {
          title: 'Professional tip',
          type: 'text',
          content: 'Investment in proper training is essential. Každý manufacturer má specific techniques. Template vs hand-cutting depends na shape complexity. Always keep spare material pro problem areas.'
        }
      ]
    }
  },

  {
    id: 'contamination-identification',
    title: 'Identifikace kontaminantů na laku',
    category: 'troubleshooting',
    tags: ['kontaminace', 'diagnostika', 'identifikace', 'čištění'],
    difficulty: 'intermediate',
    readTime: 14,
    lastUpdated: '2024-08-04',
    content: {
      summary: 'Naučte se rozpoznávat různé typy kontaminace na laku a vybírat správnou metodu odstranění pro každý typ.',
      sections: [
        {
          title: 'Touch test - základní diagnostika',
          type: 'text',
          content: 'Po umytí a osušení vozidla vložte ruku do plastic bag a přejeďte po laku. Cítíte-li nerovnosti, jedná se o surface contamination. Hladký povrch = embedded contamination nebo sub-surface defects.'
        },
        {
          title: 'Typy kontaminace a identifikace',
          type: 'table',
          content: {
            headers: ['Kontaminant', 'Vzhled', 'Touch test', 'Původ', 'Odstranění'],
            rows: [
              ['Polétavá rez', 'Oranžové tečky', 'Hrubý povrch', 'Železné částice', 'Iron remover + clay'],
              ['Tree sap', 'Lepkavé skvrny', 'Výstupky', 'Stromy', 'Citrus cleaner + heat'],
              ['Road tar', 'Černé skvrny', 'Soft výstupky', 'Asfalt', 'Tar remover'],
              ['Industrial fallout', 'Různobarevné tečky', 'Sharp feeling', 'Továrny', 'Clay bar + lubrication'],
              ['Water spots', 'Světlé kruhy', 'Hladké/rough', 'Minerály', 'Acid/abrasive method'],
              ['Bug remains', 'Žluté/černé skvrny', 'Textured', 'Hmyz', 'Bug remover + patience']
            ]
          }
        },
        {
          title: 'Seasonal contamination patterns',
          type: 'list',
          content: [
            'Jaro: Pollen, tree sap, road salt residue',
            'Léto: Bug splatter, tar, UV damage',
            'Podzim: Leaf stains, mud, early road treatments',
            'Zima: Road salt, sand, ice scraper damage',
            'Industrial areas: Metal particles year-round',
            'Coastal areas: Salt spray, sea minerals'
          ]
        },
        {
          title: 'Removal progression - least aggressive first',
          type: 'steps',
          content: [
            'Identifikace kontaminantu - visual + touch',
            'Test cleaning - small area first',
            'Chemical removal - specific product',
            'Mechanical removal - clay bar method',
            'Abrasive removal - polishing compound',
            'Wet sanding - extreme cases only',
            'Re-protection - wax/sealant/coating aplikace'
          ]
        },
        {
          title: 'Specialized removal techniques',
          type: 'text',
          content: 'Iron remover: spray on, wait for color change (purple), rinse thoroughly. Tar removal: apply product, let dwell, gently wipe. Tree sap: warm panel slightly, apply citrus-based remover. Clay bar: always use lubrication, light pressure, linear motions.'
        },
        {
          title: 'Prevention strategies',
          type: 'list',
          content: [
            'Regular washing - prevent buildup',
            'Quality protection - ceramic coatings repel',
            'Covered parking - limit exposure',
            'Seasonal preparation - appropriate products',
            'Quick response - fresh contamination easier',
            'Route awareness - avoid construction zones'
          ]
        },
        {
          title: 'Tools for identification',
          type: 'text',
          content: 'LED flashlight pro detailed inspection, magnifying glass pro small particles, plastic bag pro touch test, pH strips pro unknown substances, UV light pro certain contaminants (some glow under blacklight).'
        },
        {
          title: 'When to seek professional help',
          type: 'warning',
          content: 'Neznámé chemické látky, rozsáhlá contamination, valuable/rare vehicles, warranty concerns, lack of proper tools nebo experience. Better safe than sorry approach.'
        },
        {
          title: 'Documentation tip',
          type: 'tip',
          content: 'Photographujte contamination before/during/after treatment. Helps s learning process a může být valuable pro insurance claims if damage occurs.'
        }
      ]
    }
  },

  {
    id: 'interior-odor-elimination',
    title: 'Odstranění zápachů z interiéru',
    category: 'interior',
    tags: ['zápach', 'dezinfekce', 'ozon', 'interiér'],
    difficulty: 'intermediate',
    readTime: 16,
    lastUpdated: '2024-08-04',
    content: {
      summary: 'Systematický přístup k odstranění různých typů zápachů z automobilu. Od diagnostiky po dlouhodobé řešení.',
      sections: [
        {
          title: 'Kategorie zápachů a jejich zdroje',
          type: 'table',
          content: {
            headers: ['Typ zápachu', 'Typický zdroj', 'Identifikace', 'Difficulty'],
            rows: [
              ['Organické', 'Jídlo, zvířata, tělesné tekutiny', 'Sladký/kyselý', 'Střední'],
              ['Bakteriální', 'Vlhkost, plíseň', 'Zatuchlý, kyselý', 'Vysoká'],
              ['Chemické', 'Čisticí prostředky, fuel', 'Ostrý, chemický', 'Nízká'],
              ['Tobacco', 'Kouření', 'Charakteristický', 'Velmi vysoká'],
              ['Pet related', 'Moč, chlupy, slinty', 'Amoniak-like', 'Vysoká'],
              ['Mold/Mildew', 'Vlhkost v HVAC', 'Zemitý, plesnivý', 'Extrémní']
            ]
          }
        },
        {
          title: 'Diagnostický process',
          type: 'steps',  
          content: [
            'Visual inspection - hledej source stains',
            'Smell mapping - kde je nejsilnější',
            'UV light inspection - reveals biological',
            'Moisture meter - detect wet areas',
            'HVAC system check - common odor source',
            'Under seat inspection - hidden problems',
            'Trunk/cargo area - often overlooked'
          ]
        },
        {
          title: 'Treatment methods podle typu',
          type: 'text',
          content: 'Enzymatic cleaners pro organické zápachs, antimicrobial treatments pro bacteria/mold, ozone generation pro tobacco/pets, activated charcoal pro chemical odors, fogging systems pro complete cabin treatment.'
        },
        {
          title: 'Ozone treatment - professional approach',
          type: 'list',
          content: [
            'Vehicle preparation - remove all personal items',
            'Close all vents except one for circulation',
            'Set HVAC to recirculate mode',
            'Ozone generator sizing - proper CFM rating',
            'Treatment time - 30min to 4 hours depending',
            'Ventilation period - minimum 1 hour after',
            'Air quality test before customer return'
          ]
        },
        {
          title: 'Enzymatic cleaning protocol',
          type: 'steps',
          content: [
            'Locate exact odor source areas',
            'Apply enzymatic cleaner generously', 
            'Allow extended dwell time (často overnight)',
            'Keep area moist during treatment',
            'Extract liquid if applicable',
            'Repeat process if necessary',
            'Final anti-microbial treatment'
          ]
        },
        {
          title: 'HVAC system deodorizing',
          type: 'text',
          content: 'Replace cabin air filter, clean evaporator coil s antimicrobial foaming cleanser, treat air ducts with fogging equipment. Run system with treatment product, ensure complete coverage all vents and chambers.'
        },
        {
          title: 'Prevention strategies',
          type: 'list',
          content: [
            'Regular cabin filter replacement',
            'Prompt cleanup of spills',
            'Proper ventilation after wet weather',
            'UV protectant use - reduces material breakdown',
            'No eating/smoking policies',
            'Professional odor barriers on fabrics'
          ]
        },
        {
          title: 'Troubleshooting persistent odors',
          type: 'table',
          content: {
            headers: ['Persistent odor', 'Likely cause', 'Advanced solution'],
            rows: [
              ['Returns after treatment', 'Source not eliminated', 'Deeper diagnostic needed'],
              ['Worse after cleaning', 'Spread contamination', 'Professional extraction'],
              ['Only when wet', 'Moisture activated', 'Dehumidification + sealing'],
              ['Seasonal return', 'HVAC system issues', 'Complete HVAC service'],
              ['Chemical smell', 'Previous failed treatment', 'Neutralization needed']
            ]
          }
        },
        {
          title: 'Safety considerations',
          type: 'warning',
          content: 'Ozone is dangerous - never inhale directly! Enzymatic products can cause allergic reactions. Always ventilate treated vehicles thoroughly. Some odors indicate health hazards - refer to specialists when needed.'
        },
        {
          title: 'Pricing tip',
          type: 'tip',
          content: 'Odor elimination pricing should reflect time investment. Multiple treatments often necessary. Consider offering guarantee periods but with realistic expectations set.'
        }
      ]
    }
  },

  {
    id: 'business-customer-service',
    title: 'Customer Service Excellence v detailingu',
    category: 'business',
    tags: ['zákazníci', 'komunikace', 'servis', 'business'],
    difficulty: 'intermediate',
    readTime: 20,
    lastUpdated: '2024-08-04',
    content: {
      summary: 'Jak vybudovat exceptional customer service, který vede k repeat business a positive reviews. Klíč k long-term success.',
      sections: [
        {
          title: 'Customer Journey Mapping',
          type: 'text',
          content: 'Zákaznická cesta začíná před first contact a končí long po service completion. Každý touchpoint je příležitost vytvořit positive impression. Map celou cestu a identifikujte improvement opportunities.'
        },
        {
          title: 'Communication best practices',
          type: 'table',
          content: {
            headers: ['Phase', 'Communication goal', 'Method', 'Timeline'],
            rows: [
              ['Initial inquiry', 'Build trust, set expectations', 'Phone/email detailed response', 'Within 2 hours'],
              ['Booking confirmation', 'Reduce anxiety, confirm details', 'Written confirmation + reminders', '24-48h before'],
              ['Service day', 'Professional impression', 'Punctual arrival, clear updates', 'Real-time'],
              ['During service', 'Transparency, involvement', 'Progress photos, issue discussion', 'As needed'],
              ['Completion', 'Satisfaction, next steps', 'Walk-through, care instructions', 'Before payment'],
              ['Follow-up', 'Relationship building', 'Thank you, maintenance reminders', '1 week, 3 months']
            ]
          }
        },
        {
          title: 'Setting proper expectations',
          type: 'list',
          content: [
            'Realistic time estimates - add 20% buffer',
            'Clear scope of work - what\'s included/excluded',
            'Condition assessment - document before state',
            'Pricing transparency - no surprise charges',
            'Weather contingencies - reschedule policies',
            'Results expectations - some defects permanent',
            'Maintenance requirements - post-service care'
          ]
        },
        {
          title: 'Handling difficult situations',
          type: 'steps',
          content: [
            'Listen completely before responding',
            'Acknowledge customer\'s feelings and concerns',
            'Ask clarifying questions to understand fully',
            'Propose specific solutions, not excuses',
            'Follow up to ensure satisfaction',
            'Document lessons learned for future',
            'Sometimes refund is best business decision'
          ]
        },
        {
          title: 'Building customer loyalty',
          type: 'text',
          content: 'Loyalty programs with service history tracking, birthday/anniversary recognition, priority booking pro regular customers, referral incentives, seasonal reminders, small surprise gifts, consistent quality delivery.'
        },
        {
          title: 'Digital customer service tools',
          type: 'list',
          content: [
            'CRM system - track history and preferences',
            'Automated booking system - convenience',
            'Progress photo sharing - real-time updates',
            'Digital invoicing - professional presentation',
            'Review management - encourage feedback',
            'Social media responsiveness - public perception',
            'FAQ section - reduce repetitive inquiries'
          ]
        },
        {
          title: 'Pricing discussions',
          type: 'text',
          content: 'Present value, not just price. Explain what customer gets for their investment. Offer options at different price points. Be confident in your pricing - don\'t apologize for professional rates. Payment plans for expensive services.'
        },
        {
          title: 'Review and reputation management',
          type: 'steps',
          content: [
            'Ask for reviews from satisfied customers only',
            'Make review process easy - direct links',
            'Respond to all reviews professionally',
            'Address negative reviews constructively',
            'Use positive reviews in marketing',
            'Monitor review sites regularly',
            'Learn from feedback patterns'
          ]
        },
        {
          title: 'Customer retention strategies',
          type: 'table',
          content: {
            headers: ['Strategy', 'Implementation', 'Expected result', 'Cost'],
            rows: [
              ['Service packages', 'Annual maintenance deals', 'Guaranteed revenue', 'Low'],
              ['VIP treatment', 'Premium service level', 'Higher margins', 'Medium'],
              ['Personal touches', 'Remember preferences', 'Emotional connection', 'Low'],
              ['Educational content', 'Care tips, newsletters', 'Position as expert', 'Low'],
              ['Exclusive offers', 'First access to new services', 'Feel special', 'Medium']
            ]
          }
        },
        {
          title: 'Training your team',
          type: 'text',
          content: 'Every team member represents your brand. Train on technical skills AND customer interaction. Role-play difficult scenarios. Empower staff to make small decisions without manager approval. Regular customer service training updates.'
        },
        {
          title: 'Measuring success',
          type: 'list',
          content: [
            'Customer satisfaction surveys',
            'Net Promoter Score (NPS) tracking',
            'Repeat customer percentage',
            'Average customer lifetime value',
            'Review ratings and volume',
            'Referral tracking',
            'Complaint resolution time'
          ]
        },
        {
          title: 'Common mistakes to avoid',
          type: 'warning',
          content: 'Over-promising and under-delivering, poor communication during delays, arguing with customers, not following up after service, ignoring online reviews, treating price objections dismissively.'
        }
      ]
    }
  },

  {
    id: 'seasonal-detailing-strategies',
    title: 'Sezonní detailing strategie',
    category: 'basics',
    tags: ['sezónní', 'plánování', 'ochrana', 'strategie'],
    difficulty: 'intermediate',
    readTime: 14,
    lastUpdated: '2024-08-04',
    content: {
      summary: 'Optimalizujte své detailing services podle ročních období. Maximize revenue a provide relevant protection pro customers.',
      sections: [
        {
          title: 'Jarní detailing priorities',
          type: 'list',
          content: [
            'Winter damage assessment - salt, sand removal',
            'Paint decontamination - industrial fallout',
            'Protection renewal - winter strips coatings',
            'Interior deep clean - winter cabin syndrome',
            'Underhood detailing - salt corrosion prevention', 
            'HVAC system cleaning - pollen season prep',
            'Convertible top preparation - upcoming season'
          ]
        },
        {
          title: 'Letní focus areas',
          type: 'table',
          content: {
            headers: ['Service area', 'Challenge', 'Solution', 'Revenue opportunity'],
            rows: [
              ['Paint protection', 'UV damage', 'Ceramic coatings, quality wax', 'High'],
              ['Interior cooling', 'Heat buildup', 'Window tinting, UV protection', 'Medium'],
              ['Bug removal', 'Frequent splatter', 'Regular maintenance plans', 'Medium'],
              ['Wheel care', 'Brake dust buildup', 'Ceramic wheel coatings', 'High'],
              ['Convertible care', 'Top protection', 'Specialized treatments', 'Premium'],
              ['AC system', 'Efficiency maintenance', 'Evaporator cleaning', 'Medium']
            ]
          }
        },
        {
          title: 'Podzimní preparation services',
          type: 'text',
          content: 'Pre-winter protection application, leaf stain prevention/removal, paint correction before storage, interior protection against wet weather tracking, lighting system cleaning for shorter days, tire changeover detailing.'
        },
        {
          title: 'Zimní specialized services',
          type: 'steps',
          content: [
            'Salt protection barrier application',
            'Undercarriage coating před salt season',
            'Interior floor protection upgrade',
            'Lighting optimization - visibility critical',
            'Battery terminal protection',
            'Wiper blade maintenance/replacement',
            'Emergency kit stocking service'
          ]
        },
        {
          title: 'Revenue planning by season',
          type: 'table',  
          content: {
            headers: ['Season', 'High demand services', 'Pricing strategy', 'Marketing focus'],
            rows: [
              ['Spring', 'Full correction, protection', 'Premium pricing', 'Damage reversal'],
              ['Summer', 'Maintenance, protection', 'Volume pricing', 'Convenience, protection'],
              ['Fall', 'Pre-winter prep', 'Package deals', 'Winter preparation'],
              ['Winter', 'Maintenance, repairs', 'Value-added', 'Indoor services']
            ]
          }
        },
        {
          title: 'Equipment adaptation',
          type: 'list',
          content: [
            'Heated workspace - winter comfort',
            'Portable lighting - shorter daylight',
            'Dehumidifiers - moisture control',
            'Heated water systems - consistent temperature',
            'Mobile unit winterization',
            'Seasonal product inventory rotation',
            'Weather protection equipment'
          ]
        },
        {
          title: 'Customer education by season',
          type: 'text',
          content: 'Spring: explain winter damage, summer prep importance. Summer: UV protection benefits, maintenance frequency. Fall: winter preparation necessity. Winter: proper care techniques, when to avoid washing.'
        },
        {
          title: 'Scheduling optimization',
          type: 'steps',
          content: [
            'Weather-dependent booking systems',
            'Indoor backup options during bad weather',
            'Seasonal service packages',
            'Advanced booking incentives',
            'Flexible rescheduling policies',
            'Peak season staff scaling',
            'Off-season facility improvements'
          ]
        },
        {
          title: 'Product inventory management',
          type: 'text',
          content: 'Stock seasonal products in advance, rotate inventory to prevent expiration, bulk purchasing před peak seasons, supplier relationship management pro consistent availability, alternative product sourcing.'
        },
        {
          title: 'Marketing calendar alignment',
          type: 'list',
          content: [
            'Pre-spring damage assessment campaigns',
            'Summer protection education series',
            'Fall winter-prep urgency messaging',  
            'Winter indoor service promotions',
            'Holiday gift package offerings',
            'New Year resolution targeting',
            'Seasonal before/after showcases'
          ]
        },
        {
          title: 'Business sustainability',
          type: 'tip',
          content: 'Develop year-round revenue streams. Indoor services during winter, storage services, detailed planning prevents seasonal cash flow issues. Consider southern winter market expansion.'
        }
      ]
    }
  }
];

export const getArticleById = (id: string): KnowledgeArticle | undefined => {
  return knowledgeBase.find(article => article.id === id);
};

export const getArticlesByCategory = (category: string): KnowledgeArticle[] => {
  return knowledgeBase.filter(article => article.category === category);
};

export const searchArticles = (query: string): KnowledgeArticle[] => {
  const searchTerm = query.toLowerCase();
  return knowledgeBase.filter(article => 
    article.title.toLowerCase().includes(searchTerm) ||
    article.content.summary.toLowerCase().includes(searchTerm) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    article.content.sections.some(section => {
      if (typeof section.content === 'string') {
        return section.content.toLowerCase().includes(searchTerm);
      } else if (Array.isArray(section.content)) {
        return section.content.some(item => item.toLowerCase().includes(searchTerm));
      }
      return false;
    })
  );
};
