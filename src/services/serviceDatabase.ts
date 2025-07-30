// src/services/serviceDatabase.ts
//
// 👉 order = suggested position in professional detailing workflow
//    (lower number = earlier)
//
// 👉 times  = labour minutes
// 👉 basePrice = retail CZK incl. VAT
//

import { ServiceDatabase, VehicleSize } from '../types';

/**
 * Complete database of auto detailing services with pricing and timing
 * information for different vehicle conditions.
 */
export const serviceDatabase: ServiceDatabase = {
  /* ─────────────── WASH (10‑24) ─────────────── */
  'exterior-rinse': {
    name: 'Oplach karoserie',
    category: 'wash',
    order: 10,
    times: { excellent: 5, dirty: 8, neglected: 10, extreme: 12 },
    basePrice: { excellent: 50, dirty: 70, neglected: 90, extreme: 100 }
  },
  'snow-foam': {
    name: 'Snow‑foam aplikace',
    category: 'wash',
    order: 12,
    times: { excellent: 10, dirty: 12, neglected: 15, extreme: 18 },
    basePrice: { excellent: 100, dirty: 130, neglected: 160, extreme: 200 }
  },
  'hand-wash': {
    name: 'Ruční mytí karoserie',
    category: 'wash',
    order: 14,
    times: { excellent: 30, dirty: 40, neglected: 50, extreme: 60 },
    basePrice: { excellent: 300, dirty: 400, neglected: 500, extreme: 600 }
  },
  'pressure-wash': {
    name: 'Tlakové mytí',
    category: 'wash',
    order: 16,
    times: { excellent: 15, dirty: 20, neglected: 25, extreme: 30 },
    basePrice: { excellent: 150, dirty: 200, neglected: 250, extreme: 300 }
  },
  'contactless-wash': {
    name: 'Bezkontaktní mytí',
    category: 'wash',
    order: 18,
    times: { excellent: 20, dirty: 25, neglected: 30, extreme: 35 },
    basePrice: { excellent: 200, dirty: 260, neglected: 320, extreme: 400 }
  },
  'undercarriage-wash': {
    name: 'Mytí podvozku',
    category: 'wash',
    order: 20,
    times: { excellent: 20, dirty: 25, neglected: 30, extreme: 35 },
    basePrice: { excellent: 400, dirty: 500, neglected: 600, extreme: 700 }
  },
  'door-jambs': {
    name: 'Čištění zárubní dveří',
    category: 'wash',
    order: 22,
    times: { excellent: 20, dirty: 25, neglected: 30, extreme: 35 },
    basePrice: { excellent: 200, dirty: 250, neglected: 300, extreme: 350 }
  },
  'final-rinse': {
    name: 'Závěrečný oplach',
    category: 'wash',
    order: 24,
    times: { excellent: 5, dirty: 7, neglected: 8, extreme: 10 },
    basePrice: { excellent: 50, dirty: 70, neglected: 80, extreme: 100 }
  },

  /* ────────────── WHEELS (30‑39) ─────────────── */
  'wheel-cleaning-basic': {
    name: 'Základní mytí kol',
    category: 'wheels',
    order: 30,
    times: { excellent: 30, dirty: 40, neglected: 50, extreme: 60 },
    basePrice: { excellent: 300, dirty: 380, neglected: 450, extreme: 500 }
  },
  'wheel-cleaning-deep': {
    name: 'Hloubkové čištění kol',
    category: 'wheels',
    order: 31,
    times: { excellent: 60, dirty: 75, neglected: 90, extreme: 120 },
    basePrice: { excellent: 600, dirty: 750, neglected: 900, extreme: 1000 }
  },
  'brake-dust-removal': {
    name: 'Odstranění brzd. prachu',
    category: 'wheels',
    order: 32,
    times: { excellent: 30, dirty: 38, neglected: 45, extreme: 55 },
    basePrice: { excellent: 400, dirty: 480, neglected: 550, extreme: 600 }
  },
  'wheel-arch-cleaning': {
    name: 'Čištění podběhů',
    category: 'wheels',
    order: 33,
    times: { excellent: 45, dirty: 55, neglected: 65, extreme: 75 },
    basePrice: { excellent: 500, dirty: 600, neglected: 700, extreme: 800 }
  },
  'tire-cleaning': {
    name: 'Čištění pneumatik',
    category: 'wheels',
    order: 34,
    times: { excellent: 20, dirty: 25, neglected: 30, extreme: 35 },
    basePrice: { excellent: 200, dirty: 250, neglected: 300, extreme: 350 }
  },
  'tire-shine': {
    name: 'Ošetření pneumatik',
    category: 'wheels',
    order: 35,
    times: { excellent: 15, dirty: 18, neglected: 22, extreme: 25 },
    basePrice: { excellent: 150, dirty: 180, neglected: 220, extreme: 300 }
  },
  'wheel-polishing': {
    name: 'Leštění alu kol (per wheel)',
    category: 'wheels',
    order: 36,
    times: { excellent: 90, dirty: 105, neglected: 120, extreme: 150 },
    basePrice: { excellent: 1000, dirty: 1150, neglected: 1300, extreme: 1500 }
  },
  'wheel-restoration': {
    name: 'Renovace poškozených kol (per wheel)',
    category: 'wheels',
    order: 37,
    times: { excellent: 180, dirty: 240, neglected: 300, extreme: 360 },
    basePrice: { excellent: 2000, dirty: 2700, neglected: 3400, extreme: 4000 }
  },
  'wheel-coating': {
    name: 'Ochranný povlak kol (set 4 ks)',
    category: 'wheels',
    order: 38,
    times: { excellent: 120, dirty: 150, neglected: 180, extreme: 210 },
    basePrice: { excellent: 2000, dirty: 2500, neglected: 3000, extreme: 3500 }
  },
  'lug-nuts-cleaning': {
    name: 'Čištění matic kol',
    category: 'wheels',
    order: 39,
    times: { excellent: 20, dirty: 25, neglected: 30, extreme: 35 },
    basePrice: { excellent: 200, dirty: 230, neglected: 270, extreme: 300 }
  },

  /* ─────────── EXTERIOR DECON (40‑49) ─────────── */
  'clay-bar-treatment': {
    name: 'Clay‑bar ošetření',
    category: 'exterior',
    order: 40,
    times: { excellent: 60, dirty: 75, neglected: 90, extreme: 120 },
    basePrice: { excellent: 800, dirty: 950, neglected: 1100, extreme: 1200 }
  },
  'iron-decon': {
    name: 'Odstranění polétavé rzi',
    category: 'exterior',
    order: 41,
    times: { excellent: 30, dirty: 45, neglected: 60, extreme: 75 },
    basePrice: { excellent: 400, dirty: 500, neglected: 600, extreme: 700 }
  },
  'tar-removal': {
    name: 'Odstranění asfaltu',
    category: 'exterior',
    order: 42,
    times: { excellent: 30, dirty: 45, neglected: 60, extreme: 75 },
    basePrice: { excellent: 400, dirty: 550, neglected: 700, extreme: 800 }
  },
  'bug-removal': {
    name: 'Odstranění hmyzu',
    category: 'exterior',
    order: 43,
    times: { excellent: 20, dirty: 30, neglected: 35, extreme: 40 },
    basePrice: { excellent: 200, dirty: 280, neglected: 350, extreme: 400 }
  },
  'tree-sap-removal': {
    name: 'Odstranění pryskyřice',
    category: 'exterior',
    order: 44,
    times: { excellent: 30, dirty: 45, neglected: 60, extreme: 75 },
    basePrice: { excellent: 400, dirty: 550, neglected: 700, extreme: 800 }
  },
  'water-spot-removal': {
    name: 'Odstranění vodních skvrn',
    category: 'exterior',
    order: 45,
    times: { excellent: 45, dirty: 60, neglected: 75, extreme: 90 },
    basePrice: { excellent: 600, dirty: 800, neglected: 1000, extreme: 1200 }
  },
  'exterior-trim-restoration': {
    name: 'Obnova exteriérových plastů',
    category: 'exterior',
    order: 46,
    times: { excellent: 60, dirty: 80, neglected: 100, extreme: 120 },
    basePrice: { excellent: 900, dirty: 1200, neglected: 1500, extreme: 1800 }
  },
  'glass-polishing': {
    name: 'Leštění autoskel',
    category: 'exterior',
    order: 47,
    times: { excellent: 60, dirty: 75, neglected: 90, extreme: 120 },
    basePrice: { excellent: 1000, dirty: 1300, neglected: 1600, extreme: 2000 }
  },
  'sticker-adhesive-removal': {
    name: 'Odstranění polepů a zbytků lepidla',
    category: 'exterior',
    order: 48,
    times: { excellent: 45, dirty: 60, neglected: 90, extreme: 120 },
    basePrice: { excellent: 800, dirty: 1000, neglected: 1300, extreme: 1600 }
  },

  /* ───────── PAINT CORRECTION (50‑59) ─────────── */
  'paint-correction-1step': {
    name: 'Korekce laku – 1 krok',
    category: 'exterior',
    order: 50,
    times: { excellent: 360, dirty: 480, neglected: 540, extreme: 600 },
    basePrice: { excellent: 6000, dirty: 8000, neglected: 9000, extreme: 10000 }
  },
  'paint-correction-2step': {
    name: 'Korekce laku – 2 kroky',
    category: 'exterior',
    order: 52,
    times: { excellent: 600, dirty: 720, neglected: 840, extreme: 960 },
    basePrice: { excellent: 9000, dirty: 12000, neglected: 14000, extreme: 16000 }
  },
  'paint-correction-3step': {
    name: 'Korekce laku – 3 kroky',
    category: 'exterior',
    order: 54,
    times: { excellent: 960, dirty: 1200, neglected: 1440, extreme: 1800 },
    basePrice: { excellent: 12000, dirty: 15000, neglected: 18000, extreme: 20000 }
  },
  'wet-sanding': {
    name: 'Mokré broušení',
    category: 'exterior',
    order: 56,
    times: { excellent: 240, dirty: 300, neglected: 420, extreme: 480 },
    basePrice: { excellent: 3000, dirty: 4000, neglected: 5000, extreme: 6000 }
  },
  'headlight-restoration': {
    name: 'Renovace světlometů',
    category: 'exterior',
    order: 58,
    times: { excellent: 120, dirty: 140, neglected: 160, extreme: 180 },
    basePrice: { excellent: 1200, dirty: 1400, neglected: 1700, extreme: 2000 }
  },
  'drying': {
    name: 'Profesionální sušení',
    category: 'exterior',
    order: 59,
    times: { excellent: 15, dirty: 20, neglected: 22, extreme: 25 },
    basePrice: { excellent: 150, dirty: 200, neglected: 220, extreme: 300 }
  },

  /* ─────────── PROTECTION (60‑66) ─────────────── */
  'paint-sealant': {
    name: 'Polymerový sealant',
    category: 'protection',
    order: 60,
    times: { excellent: 60, dirty: 80, neglected: 100, extreme: 120 },
    basePrice: { excellent: 1000, dirty: 1200, neglected: 1400, extreme: 1500 }
  },
  'hard-wax': {
    name: 'Tuhý karnaubský vosk',
    category: 'protection',
    order: 61,
    times: { excellent: 45, dirty: 60, neglected: 75, extreme: 90 },
    basePrice: { excellent: 700, dirty: 900, neglected: 1100, extreme: 1300 }
  },
  'ceramic-coating': {
    name: 'Keramická ochrana laku',
    category: 'protection',
    order: 62,
    times: { excellent: 240, dirty: 300, neglected: 360, extreme: 420 },
    basePrice: { excellent: 8000, dirty: 9500, neglected: 11000, extreme: 12500 }
  },
  'glass-coating': {
    name: 'Hydrofobní coating skel',
    category: 'protection',
    order: 63,
    times: { excellent: 45, dirty: 60, neglected: 75, extreme: 90 },
    basePrice: { excellent: 1000, dirty: 1200, neglected: 1500, extreme: 2000 }
  },
  'leather-protect': {
    name: 'Keramický coating kůže',
    category: 'protection',
    order: 64,
    times: { excellent: 90, dirty: 110, neglected: 130, extreme: 150 },
    basePrice: { excellent: 3000, dirty: 3500, neglected: 4000, extreme: 5000 }
  },
  'fabric-guard': {
    name: 'Ochrana čalounění (textil) – nano',
    category: 'protection',
    order: 65,
    times: { excellent: 60, dirty: 80, neglected: 100, extreme: 120 },
    basePrice: { excellent: 1500, dirty: 1800, neglected: 2200, extreme: 2500 }
  },
  'ppf-partial-wrap': {
    name: 'PPF – částečný wrap',
    category: 'protection',
    order: 66,
    times: { excellent: 360, dirty: 420, neglected: 480, extreme: 540 },
    basePrice: { excellent: 9500, dirty: 11000, neglected: 12500, extreme: 14000 }
  },

  /* ──────────── INTERIOR (70‑79) ─────────────── */
  'interior-vacuum': {
    name: 'Kompletní vysávání',
    category: 'interior',
    order: 70,
    times: { excellent: 20, dirty: 30, neglected: 40, extreme: 50 },
    basePrice: { excellent: 300, dirty: 400, neglected: 450, extreme: 500 }
  },
  'dashboard-detail': {
    name: 'Detailní čištění palubovky',
    category: 'interior',
    order: 71,
    times: { excellent: 25, dirty: 35, neglected: 45, extreme: 55 },
    basePrice: { excellent: 300, dirty: 400, neglected: 500, extreme: 600 }
  },
  'interior-deep-clean': {
    name: 'Hloubkové čištění interiéru',
    category: 'interior',
    order: 72,
    times: { excellent: 120, dirty: 160, neglected: 200, extreme: 250 },
    basePrice: { excellent: 1500, dirty: 1900, neglected: 2300, extreme: 2800 }
  },
  'upholstery-shampoo': {
    name: 'Šamponování čalounění',
    category: 'interior',
    order: 73,
    times: { excellent: 90, dirty: 120, neglected: 150, extreme: 180 },
    basePrice: { excellent: 1200, dirty: 1600, neglected: 2000, extreme: 2400 }
  },
  'leather-conditioning': {
    name: 'Čištění + kondicionér kůže',
    category: 'interior',
    order: 74,
    times: { excellent: 45, dirty: 60, neglected: 75, extreme: 90 },
    basePrice: { excellent: 800, dirty: 1000, neglected: 1200, extreme: 1500 }
  },
  'steam-cleaning': {
    name: 'Parní dezinfekce kabiny',
    category: 'interior',
    order: 75,
    times: { excellent: 40, dirty: 55, neglected: 70, extreme: 85 },
    basePrice: { excellent: 500, dirty: 700, neglected: 900, extreme: 1100 }
  },
  'ozone-treatment': {
    name: 'Ozonová dezodorace',
    category: 'interior',
    order: 76,
    times: { excellent: 30, dirty: 40, neglected: 50, extreme: 60 },
    basePrice: { excellent: 500, dirty: 650, neglected: 800, extreme: 900 }
  },
  'fabric-protection': {
    name: 'Impregnace látek (standard)',
    category: 'interior',
    order: 77,
    times: { excellent: 30, dirty: 40, neglected: 50, extreme: 60 },
    basePrice: { excellent: 500, dirty: 650, neglected: 800, extreme: 950 }
  },
  'hvac-sanitization': {
    name: 'Dezinfekce klimatizace',
    category: 'interior',
    order: 78,
    times: { excellent: 20, dirty: 30, neglected: 40, extreme: 50 },
    basePrice: { excellent: 400, dirty: 500, neglected: 600, extreme: 700 }
  },
  'headliner-cleaning': {
    name: 'Čištění stropnice',
    category: 'interior',
    order: 79,
    times: { excellent: 40, dirty: 60, neglected: 90, extreme: 120 },
    basePrice: { excellent: 800, dirty: 1000, neglected: 1300, extreme: 1600 }
  },

  /* ─────────── RESTORATION (80‑86) ───────────── */
  'paint-chip-repair': {
    name: 'Lepení odštěpků laku',
    category: 'restoration',
    order: 80,
    times: { excellent: 120, dirty: 150, neglected: 180, extreme: 210 },
    basePrice: { excellent: 1500, dirty: 1900, neglected: 2300, extreme: 2700 }
  },
  'dent-removal': {
    name: 'PDR odstranění důlků',
    category: 'restoration',
    order: 81,
    times: { excellent: 180, dirty: 240, neglected: 300, extreme: 360 },
    basePrice: { excellent: 2500, dirty: 3200, neglected: 3900, extreme: 4600 }
  },
  'windshield-chip-repair': {
    name: 'Oprava odštípnutí skla',
    category: 'restoration',
    order: 82,
    times: { excellent: 45, dirty: 60, neglected: 75, extreme: 90 },
    basePrice: { excellent: 800, dirty: 1000, neglected: 1200, extreme: 1400 }
  },
  'plastic-rejuvenation': {
    name: 'Renovace interiér. plastů',
    category: 'restoration',
    order: 83,
    times: { excellent: 60, dirty: 80, neglected: 100, extreme: 120 },
    basePrice: { excellent: 900, dirty: 1200, neglected: 1500, extreme: 1800 }
  },
  'convertible-top-restore': {
    name: 'Oprava + impregnace střechy cabria',
    category: 'restoration',
    order: 84,
    times: { excellent: 120, dirty: 160, neglected: 200, extreme: 240 },
    basePrice: { excellent: 1800, dirty: 2200, neglected: 2600, extreme: 3000 }
  },
  'emblem-restoration': {
    name: 'Leštění a lakování emblémů',
    category: 'restoration',
    order: 85,
    times: { excellent: 60, dirty: 75, neglected: 90, extreme: 105 },
    basePrice: { excellent: 800, dirty: 1000, neglected: 1200, extreme: 1400 }
  },
  'instrument-cluster-polish': {
    name: 'Leštění budíků a dekorů',
    category: 'restoration',
    order: 86,
    times: { excellent: 45, dirty: 60, neglected: 75, extreme: 90 },
    basePrice: { excellent: 500, dirty: 700, neglected: 900, extreme: 1100 }
  },

  /* ─────────── SPECIALTY (90‑96) ─────────────── */
  'engine-bay-detail': {
    name: 'Detailní čištění motoru',
    category: 'specialty',
    order: 90,
    times: { excellent: 60, dirty: 75, neglected: 90, extreme: 105 },
    basePrice: { excellent: 900, dirty: 1100, neglected: 1300, extreme: 1500 }
  },
  'pet-hair-removal': {
    name: 'Odstranění zvířecí srsti',
    category: 'specialty',
    order: 91,
    times: { excellent: 60, dirty: 90, neglected: 120, extreme: 150 },
    basePrice: { excellent: 800, dirty: 1100, neglected: 1400, extreme: 1700 }
  },
  'odor-neutralization': {
    name: 'Odstranění zápachů',
    category: 'specialty',
    order: 92,
    times: { excellent: 40, dirty: 55, neglected: 70, extreme: 85 },
    basePrice: { excellent: 600, dirty: 800, neglected: 1000, extreme: 1200 }
  },
  'biohazard-cleanup': {
    name: 'Biohazard & mold sanitace',
    category: 'specialty',
    order: 93,
    times: { excellent: 240, dirty: 300, neglected: 360, extreme: 420 },
    basePrice: { excellent: 6000, dirty: 7500, neglected: 9000, extreme: 10500 }
  },
  'showcar-preparation': {
    name: 'Show‑car finální příprava',
    category: 'specialty',
    order: 94,
    times: { excellent: 300, dirty: 360, neglected: 420, extreme: 480 },
    basePrice: { excellent: 9000, dirty: 10500, neglected: 12000, extreme: 13500 }
  },
  'matte-paint-maintenance': {
    name: 'Údržba matného laku',
    category: 'specialty',
    order: 95,
    times: { excellent: 120, dirty: 160, neglected: 200, extreme: 240 },
    basePrice: { excellent: 2500, dirty: 3200, neglected: 3900, extreme: 4600 }
  },
  'undercoating-rustproof': {
    name: 'Antikorozní nástřik podvozku',
    category: 'specialty',
    order: 96,
    times: { excellent: 240, dirty: 300, neglected: 360, extreme: 420 },
    basePrice: { excellent: 6000, dirty: 7500, neglected: 9000, extreme: 10500 }
  }
};

/**
 * Multipliers applied to service times and prices based on vehicle size.
 * Larger vehicles have higher multipliers.
 */
export const sizeMultipliers: Record<VehicleSize, number> = {
  small: 0.7,
  sedan: 0.8,
  combi: 0.9,
  suv:   1.0,
  van:   1.1,
  truck: 1.3
};