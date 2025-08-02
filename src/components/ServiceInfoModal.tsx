// src/components/ServiceInfoModal.tsx
import React, { useContext } from 'react';
import { ConfigContext } from '../contexts/ConfigContext';
import { sizeMultipliers } from '../services/serviceDatabase';
import { formatMinutes } from '../utils/format';
import type { ServiceItem, VehicleCondition } from '../types';

interface ServiceInfoModalProps {
  /** The service to display information about */
  service: ServiceItem;
  /** The service key for additional context */
  serviceKey: string;
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
}

// Service descriptions database
const serviceDescriptions: Record<string, string> = {
  'exterior-rinse': 'Počáteční oplach karoserie pro odstranění hrubých nečistot a prachu. Příprava povrchu před dalším čištěním.',
  'snow-foam': 'Aplikace hustého pre-wash mousse, který uvolňuje a rozpouští nečistoty před kontaktním mytím. Snižuje riziko poškrábání laku.',
  'hand-wash': 'Pečlivé ruční mytí karoserie pomocí mikrovláknových rukavic a kvalitních šamponů. Nejšetrnější metoda čištění.',
  'pressure-wash': 'Vysokotlaké čištění pro odstranění odolných nečistot z podběhů, prahů a těžko dostupných míst.',
  'contactless-wash': 'Bezkontaktní mytí pomocí speciálních chemikálií a vysokotlakého opláchnutí. Vhodné pro silně znečištěná vozidla.',
  'undercarriage-wash': 'Důkladné čištění podvozku včetně odstranění soli, bláta a korozních látek. Ochrana před korozí.',
  'door-jambs': 'Detailní čištění všech zárubní dveří, víka kufru a kapoty. Oblasti často opomíjené při běžném mytí.',
  'final-rinse': 'Závěrečný demineralizovaný oplach pro dokonale čistý povrch bez vodních skvrn.',
  
  'wheel-cleaning-basic': 'Základní čištění kol včetně ráfků a pneumatik. Odstranění běžných nečistot a silničního prachu.',
  'wheel-cleaning-deep': 'Hloubkové čištění kol s demontáží pro přístup do všech zákoutí. Perfektní pro silně znečištěná kola.',
  'brake-dust-removal': 'Specializované odstranění kovového prachu z brzd pomocí pH neutrálních prostředků.',
  'wheel-arch-cleaning': 'Důkladné vyčištění všech podběhů kol včetně plastových obkladů a těsnění.',
  'tire-cleaning': 'Čištění pneumatik od silničních nečistot, tuků a starých ošetřujících prostředků.',
  'tire-shine': 'Aplikace kvalitního dresingu na pneumatiky pro dlouhodobou ochranu a elegantní vzhled.',
  'wheel-polishing': 'Profesionální leštění alu kol na vysoký lesk s odstraněním oxidace a škrábanců.',
  'wheel-restoration': 'Kompletní renovace poškozených kol včetně broušení, tmelení a nového povrchu.',
  'wheel-coating': 'Aplikace keramického coating na kola pro dlouhodobou ochranu proti nečistotám.',
  'lug-nuts-cleaning': 'Detailní čištění a leštění matic kol pro dokonalý celkový dojem.',
  
  'clay-bar-treatment': 'Odstranění všech povrchových kontaminantů pomocí clay-baru. Příprava pro leštění a voskování.',
  'iron-decon': 'Chemické odstranění železitých částic (polétavá rez) z laku pomocí speciálních prostředků.',
  'tar-removal': 'Šetrné odstranění asfaltových skvrn a lepkavých nečistot z karoserie.',
  'bug-removal': 'Odstranění zbytků hmyzu z přední části vozidla pomocí specializovaných prostředků.',
  'tree-sap-removal': 'Bezpečné odstranění pryskyřice ze stromů bez poškození laku.',
  'water-spot-removal': 'Odstranění vodních skvrn způsobených minerály v tvrdé vodě.',
  'exterior-trim-restoration': 'Obnova vybledlých plastových dílů exteriéru na původní černou barvu.',
  'glass-polishing': 'Leštění autoskel pro odstranění skvrn, škrábanců a zlepšení viditelnosti.',
  'sticker-adhesive-removal': 'Profesionální odstranění polepů a zbytků lepidla bez poškození laku.',
  
  'paint-correction-1step': 'Jednokroková korekce laku pro odstranění lehkých škrábanců a zlepšení lesku.',
  'paint-correction-2step': 'Dvoustupňová korekce laku: hrubší a jemnější leštění pro dokonalý výsledek.',
  'paint-correction-3step': 'Trojstupňová profesionální korekce pro nejvíce poškozené laky.',
  'wet-sanding': 'Mokré broušení velmi jemnými bruskami pro odstranění hlubokých defektů.',
  'headlight-restoration': 'Renovace zamlžených světlometů broušením a leštěním na původní průhlednost.',
  'drying': 'Profesionální sušení pomocí mikrovláknových utěrek nebo speciálních sušicích prostředků.',
  
  'paint-sealant': 'Aplikace syntetického sealantu pro dlouhodobou ochranu laku až 6 měsíců.',
  'hard-wax': 'Aplikace prémiového karnaubského vosku pro hluboký lesk a ochranu.',
  'ceramic-coating': 'Aplikace keramické ochrany s trvanlivostí 2-5 let. Nejvyšší úroveň ochrany.',
  'glass-coating': 'Hydrofobní úprava skel pro lepší viditelnost za deště.',
  'leather-protect': 'Keramická ochrana kožených sedadel proti skvrnám a opotřebení.',
  'fabric-guard': 'Nano impregnace textilního čalounění proti skvrnám a vlhkosti.',
  'ppf-partial-wrap': 'Ochranná fólie na nejexponovanější části karoserie.',
  
  'interior-vacuum': 'Důkladné vysávání celého interiéru včetně sedadel, koberců a zákoutí.',
  'dashboard-detail': 'Detailní čištění a ošetření palubní desky a všech plastových dílů.',
  'interior-deep-clean': 'Kompletní hloubkové čištění celého interiéru všemi dostupnými metodami.',
  'upholstery-shampoo': 'Šamponování textilního čalounění s extrakcí nečistot.',
  'leather-conditioning': 'Čištění a ošetření kožených sedadel kondicionérem pro zachování pružnosti.',
  'steam-cleaning': 'Parní čištění a dezinfekce interiéru při vysoké teplotě.',
  'ozone-treatment': 'Ozonová dezinfekce pro odstranění zápachů a bakterií.',
  'fabric-protection': 'Impregnace textilních povrchů proti skvrnám.',
  'hvac-sanitization': 'Dezinfekce a čištění klimatizačního systému.',
  'headliner-cleaning': 'Jemné čištění stropnice bez poškození lepidla.',
  
  'paint-chip-repair': 'Retušování malých odštěpků laku pomocí speciálních laků.',
  'dent-removal': 'Paintless Dent Repair - odstranění důlků bez repasování.',
  'windshield-chip-repair': 'Oprava malých prasklin a odštěpků ve skle.',
  'plastic-rejuvenation': 'Renovace vybarvených plastových dílů interiéru.',
  'convertible-top-restore': 'Čištění, oprava a impregnace střechy kabrioletu.',
  'emblem-restoration': 'Renovace chromových a plastových emblémů.',
  'instrument-cluster-polish': 'Leštění budíků a dekorativních dílů interiéru.',
  
  'engine-bay-detail': 'Detailní čištění motorového prostoru s ochranou elektronických dílů.',
  'pet-hair-removal': 'Specializované odstranění zvířecí srsti ze všech textilních povrchů.',
  'odor-neutralization': 'Profesionální odstranění zápachů pomocí ozonizérů a speciálních prostředků.',
  'biohazard-cleanup': 'Sanitace vozidla po biologickém znečištění nebo plísni.',
  'showcar-preparation': 'Perfektní příprava vozidla pro výstavy a soutěže.',
  'matte-paint-maintenance': 'Specializovaná údržba matných laků bez narušení struktury.',
  'undercoating-rustproof': 'Aplikace antikorozní ochrany na podvozek vozidla.'
};

const getServiceDescription = (serviceKey: string): string => {
  return serviceDescriptions[serviceKey] || 'Profesionální auto detailing služba s využitím kvalitních materiálů a ověřených postupů pro dosažení nejlepších výsledků.';
};

const ServiceInfoModal: React.FC<ServiceInfoModalProps> = ({
  service,
  serviceKey,
  isOpen,
  onClose
}) => {
  const { config } = useContext(ConfigContext);
  const { vehicleSize, workers } = config;

  if (!isOpen) return null;

  const conditions: { key: VehicleCondition; label: string; emoji: string; color: string }[] = [
    { key: 'excellent', label: 'Čisté', emoji: '🟢', color: 'text-green-600' },
    { key: 'dirty', label: 'Špinavé', emoji: '🟡', color: 'text-yellow-600' },
    { key: 'neglected', label: 'Zanedbané', emoji: '🔴', color: 'text-red-600' },
    { key: 'extreme', label: 'Extrémní', emoji: '🟣', color: 'text-purple-600' }
  ];

  const calculateValues = (condition: VehicleCondition) => {
    const baseTime = service.times[condition];
    const basePrice = service.basePrice[condition];
    const adjustedTime = Math.round((baseTime * sizeMultipliers[vehicleSize]) / workers);
    const adjustedPrice = Math.round(basePrice * sizeMultipliers[vehicleSize]);
    return { adjustedTime, adjustedPrice };
  };

  const categoryLabels: Record<string, string> = {
    wash: '🚿 Mytí',
    exterior: '🚗 Exteriér',
    wheels: '⚙️ Kola',
    interior: '🪑 Interiér',
    protection: '🛡️ Ochrana',
    restoration: '🔧 Opravy',
    specialty: '⭐ Speciální'
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
        aria-hidden="true"
        data-testid="modal-backdrop"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-info-title"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
            <div>
              <h2 id="service-info-title" className="text-xl font-semibold text-gray-900 dark:text-white">
                {service.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {categoryLabels[service.category]} • Pořadí: {service.order}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Zavřít"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                📝 Popis služby
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {getServiceDescription(serviceKey)}
              </p>
            </div>

            {/* Current Settings */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                ⚙️ Aktuální nastavení
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Velikost vozidla:</span>
                  <span className="ml-2 font-medium">{vehicleSize}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Počet pracovníků:</span>
                  <span className="ml-2 font-medium">{workers}</span>
                </div>
              </div>
            </div>

            {/* Time and Price Breakdown */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                💰 Čas a cena podle stavu vozidla
              </h3>
              <div className="space-y-3">
                {conditions.map(({ key, label, emoji, color }) => {
                  const { adjustedTime, adjustedPrice } = calculateValues(key);
                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{emoji}</span>
                        <span className={`font-medium ${color}`}>{label}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {formatMinutes(adjustedTime)} • {adjustedPrice.toLocaleString()} Kč
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Základ: {formatMinutes(service.times[key])} • {service.basePrice[key].toLocaleString()} Kč
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Professional Tips */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                💡 Profesionální tipy
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                {service.category === 'wash' && (
                  <>
                    <li>• Vždy začněte oplachováním pro odstranění hrubých nečistot</li>
                    <li>• Používejte metodu "shora dolů" pro nejlepší výsledky</li>
                    <li>• Nikdy nemyjte za přímého slunečního svitu</li>
                  </>
                )}
                {service.category === 'wheels' && (
                  <>
                    <li>• Kola čistěte jako první, aby nečistoty nezapadaly na čistou karoserii</li>
                    <li>• Používejte separátní náčiní pro kola a karoserii</li>
                    <li>• Nevynechejte vnitřní strany kol a brzdové kotouče</li>
                  </>
                )}
                {service.category === 'exterior' && (
                  <>
                    <li>• Testujte produkty nejprve na méně viditelném místě</li>
                    <li>• Pracujte po menších sekcích pro rovnoměrný výsledek</li>
                    <li>• Dodržujte doporučené teploty pro aplikaci</li>
                  </>
                )}
                {service.category === 'interior' && (
                  <>
                    <li>• Vyjměte všechny osobní věci před začátkem práce</li>
                    <li>• Chraňte elektroniku před vlhkostí</li>
                    <li>• Zajistěte dobré větrání během sušení</li>
                  </>
                )}
                {service.category === 'protection' && (
                  <>
                    <li>• Aplikujte pouze na dokonale čistý a suchý povrch</li>
                    <li>• Dodržujte dobu vytvrzování dle pokynů výrobce</li>
                    <li>• Vyhněte se dešti a rosě během prvních 24 hodin</li>
                  </>
                )}
                {(service.category === 'restoration' || service.category === 'specialty') && (
                  <>
                    <li>• Před začátkem práce důkladně zhodnoťte rozsah poškození</li>
                    <li>• Používejte pouze kvalitní profesionální materiály</li>
                    <li>• V případě pochybností konzultujte s expertem</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end p-6 border-t dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              data-testid="modal-close-footer-button"
            >
              Zavřít
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceInfoModal;