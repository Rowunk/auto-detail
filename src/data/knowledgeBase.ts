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
    article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};