import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import AppFooter from '../components/organisms/AppFooter';
import { ASSETS } from '../utils/data';
import { CATEGORIES, getCategoryEmoji } from '../utils/categories';
import { PRIMARY_HEX } from '../utils/theme';
import { ButtonFooter, PrimaryButton, PriceBadgeS, SafeAreaSpacer } from '../components/atoms';

type Tab = 'Accueil' | 'Carte' | 'Billets' | 'Profil';
type DateFilter = 'all' | 'today' | 'week' | 'weekend' | 'custom';
type SortBy = 'recommended' | 'date' | 'distance';

const DATE_PILLS: { id: DateFilter; label: string }[] = [
  { id: 'today', label: "Aujourd'hui" },
  { id: 'week', label: 'Cette semaine' },
  { id: 'weekend', label: 'Ce week-end' },
];

const MAX_PRICE = 50;

const SORT_OPTIONS: { id: SortBy; label: string }[] = [
  { id: 'recommended', label: 'Recommandé' },
  { id: 'date', label: 'Date' },
  { id: 'distance', label: 'Distance' },
];

const mapEvents = [
  {
    id: 'yoga',
    emoji: '🧘',
    lat: 48.8588,
    lng: 2.376,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
    category: '🧘 Bien-être',
    title: 'Yoga Rooftop au coucher de soleil',
    location: 'Paris 11e',
    time: 'Auj. 19h00',
    price: '18 €',
    originalPrice: '25 €',
    priceValue: 18,
    promo: true,
    distance: 0.3,
    dateOrder: 0,
    date: '2026-06-17',
    dateFilters: ['today', 'week'] as DateFilter[],
  },
  {
    id: 'standup',
    emoji: '🎭',
    lat: 48.874,
    lng: 2.362,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    category: '🎭 Spectacle',
    title: 'Soirée Stand-Up · Les Révélations',
    location: 'Paris 10e',
    time: 'Demain · 20h30',
    price: '12 €',
    priceValue: 12,
    promo: false,
    distance: 1.2,
    dateOrder: 1,
    date: '2026-06-18',
    dateFilters: ['week'] as DateFilter[],
  },
  {
    id: 'basket',
    emoji: '⚽',
    lat: 48.8556,
    lng: 2.2986,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop',
    category: '⚽ Sport',
    title: 'Match de basket 3x3 en plein air',
    location: 'Paris 7e',
    time: 'Ven 19 juin · 18h00',
    price: '5 €',
    priceValue: 5,
    promo: false,
    distance: 2.1,
    dateOrder: 2,
    date: '2026-06-19',
    dateFilters: ['week'] as DateFilter[],
  },
  {
    id: 'expo',
    emoji: '🎨',
    lat: 48.8303,
    lng: 2.36,
    image: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=400&h=300&fit=crop',
    category: '🎨 Culture',
    title: "Expo Immersive · Lumières d'Orient",
    location: 'Paris 13e',
    time: 'Dim · 14h00',
    price: '22 €',
    priceValue: 22,
    promo: false,
    distance: 3.5,
    dateOrder: 4,
    date: '2026-06-21',
    dateFilters: ['week', 'weekend'] as DateFilter[],
  },
  {
    id: 'jazz',
    emoji: '🎵',
    lat: 48.8793,
    lng: 2.3825,
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop',
    category: '🎵 Musique',
    title: 'Concert Jazz en plein air',
    location: 'Buttes-Chaumont',
    time: 'Sam · 18h00',
    price: '10 €',
    priceValue: 10,
    promo: false,
    distance: 4.2,
    dateOrder: 3,
    date: '2026-06-20',
    dateFilters: ['week', 'weekend'] as DateFilter[],
  },
  {
    id: 'sashiko',
    emoji: '✏️',
    lat: 48.862,
    lng: 2.3578,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop',
    category: '✏️ Atelier',
    title: 'Sashiko · Broderie japonaise',
    location: 'Paris 3e',
    time: 'Dim 22 juin · 14h00',
    price: '40 €',
    priceValue: 40,
    promo: false,
    distance: 0.8,
    dateOrder: 5,
    date: '2026-06-22',
    dateFilters: ['week', 'weekend'] as DateFilter[],
  },
  {
    id: 'jeux',
    emoji: '🎲',
    lat: 48.8532,
    lng: 2.3692,
    image: 'https://images.unsplash.com/photo-1585504198199-20277593b94f?w=400&h=300&fit=crop',
    category: '🎲 Jeu',
    title: 'Soirée Jeux de société',
    location: 'Paris 11e',
    time: 'Mar 23 juin · 19h30',
    price: '8 €',
    priceValue: 8,
    promo: false,
    distance: 1.5,
    dateOrder: 6,
    date: '2026-06-23',
    dateFilters: [] as DateFilter[],
  },
  {
    id: 'piquenique',
    emoji: '🌿',
    lat: 48.8955,
    lng: 2.389,
    image: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=400&h=300&fit=crop',
    category: '🌿 Plein air',
    title: 'Pique-nique musical à la Villette',
    location: 'Paris 19e',
    time: 'Mer 24 juin · 17h00',
    price: '5 €',
    priceValue: 5,
    promo: false,
    distance: 5.4,
    dateOrder: 7,
    date: '2026-06-24',
    dateFilters: [] as DateFilter[],
  },
  {
    id: 'poterie',
    emoji: '👶',
    lat: 48.8462,
    lng: 2.3372,
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=300&fit=crop',
    category: '👶 Kids friendly',
    title: 'Atelier poterie en famille',
    location: 'Paris 6e',
    time: 'Jeu 25 juin · 10h00',
    price: '28 €',
    priceValue: 28,
    promo: false,
    distance: 3.2,
    dateOrder: 8,
    date: '2026-06-25',
    dateFilters: [] as DateFilter[],
  },
  {
    id: 'musees',
    emoji: '🖼️',
    lat: 48.8662,
    lng: 2.3125,
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400&h=300&fit=crop',
    category: '🖼️ Exposition',
    title: 'Nuit des Musées',
    location: 'Paris 8e',
    time: 'Ven 26 juin · 20h00',
    price: '15 €',
    priceValue: 15,
    promo: false,
    distance: 2.6,
    dateOrder: 9,
    date: '2026-06-26',
    dateFilters: [] as DateFilter[],
  },
];

type MapEvent = typeof mapEvents[0];

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km % 1 === 0 ? km : km.toFixed(1)} km`;
}

const USER_MARKER_ICON = L.divIcon({
  className: '',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  html: `<div style="width:40px;height:40px;position:relative;">
    <div style="width:40px;height:40px;border-radius:50%;background:rgba(81,112,255,0.2);position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);animation:joy-pulse 2s ease-in-out infinite;"></div>
    <div style="width:22px;height:22px;border-radius:50%;background:${PRIMARY_HEX};border:3px solid white;box-shadow:0 2px 10px rgba(81,112,255,0.5);position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);"></div>
  </div>`,
});

function makeClusterIcon(count: number) {
  return L.divIcon({
    className: '',
    iconSize: [58, 58],
    iconAnchor: [29, 57],
    html: `<div style="width:58px;height:58px;display:flex;align-items:center;justify-content:center;">
      <div style="transform:rotate(-45deg);width:40px;height:40px;">
        <div style="width:40px;height:40px;background:${PRIMARY_HEX};border-radius:20px 20px 20px 0;box-shadow:0px 2px 6px rgba(81,112,255,0.4);display:flex;align-items:center;justify-content:center;">
          <span style="transform:rotate(45deg);font-size:15px;font-weight:800;color:white;font-family:sans-serif;line-height:1;">${count}</span>
        </div>
      </div>
    </div>`,
  });
}

type Cluster = { ids: string[]; lat: number; lng: number };

function ClusteredMarkers({
  events,
  selectedId,
  icons,
  onSelect,
}: {
  events: MapEvent[];
  selectedId: string | null;
  icons: Record<string, L.DivIcon>;
  onSelect: (id: string | null) => void;
}) {
  const map = useMap();
  const [singles, setSingles] = useState<MapEvent[]>([]);
  const [clusters, setClusters] = useState<Cluster[]>([]);

  const compute = useCallback(() => {
    const RADIUS = 50;
    const visited = new Set<string>();
    const newSingles: MapEvent[] = [];
    const newClusters: Cluster[] = [];

    for (const e of events) {
      if (visited.has(e.id)) continue;
      if (e.id === selectedId) {
        visited.add(e.id);
        newSingles.push(e);
        continue;
      }
      visited.add(e.id);
      const p = map.latLngToLayerPoint([e.lat, e.lng]);
      const group: MapEvent[] = [e];

      for (const other of events) {
        if (visited.has(other.id) || other.id === selectedId) continue;
        const op = map.latLngToLayerPoint([other.lat, other.lng]);
        const dx = p.x - op.x;
        const dy = p.y - op.y;
        if (Math.sqrt(dx * dx + dy * dy) < RADIUS) {
          visited.add(other.id);
          group.push(other);
        }
      }

      if (group.length === 1) {
        newSingles.push(e);
      } else {
        newClusters.push({
          ids: group.map(ev => ev.id),
          lat: group.reduce((s, ev) => s + ev.lat, 0) / group.length,
          lng: group.reduce((s, ev) => s + ev.lng, 0) / group.length,
        });
      }
    }

    setSingles(newSingles);
    setClusters(newClusters);
  }, [map, events, selectedId]);

  useEffect(() => { compute(); }, [compute]);
  useMapEvents({ moveend: compute, zoomend: compute, click: () => onSelect(null) });

  return (
    <>
      {singles.map(e => (
        <Marker
          key={e.id}
          position={[e.lat, e.lng]}
          icon={icons[e.id]}
          eventHandlers={{
            click: (evt) => {
              L.DomEvent.stopPropagation(evt);
              onSelect(e.id === selectedId ? null : e.id);
            },
          }}
        />
      ))}
      {clusters.map(cluster => (
        <Marker
          key={cluster.ids.join('-')}
          position={[cluster.lat, cluster.lng]}
          icon={makeClusterIcon(cluster.ids.length)}
          eventHandlers={{
            click: (evt) => {
              L.DomEvent.stopPropagation(evt);
              onSelect(null);
              map.flyTo([cluster.lat, cluster.lng], map.getZoom() + 2, { duration: 0.5 });
            },
          }}
        />
      ))}
    </>
  );
}

function FlyToUser({ position }: { position: [number, number] | null }) {
  const map = useMap();
  const didFly = useRef(false);
  useEffect(() => {
    if (position && !didFly.current) {
      didFly.current = true;
      map.flyTo(position, 15, { duration: 1.5 });
    }
  }, [position, map]);
  return null;
}

function makeMarkerIcon(emoji: string, selected: boolean) {
  const bg = selected ? PRIMARY_HEX : 'white';
  return L.divIcon({
    className: '',
    iconSize: [58, 58],
    iconAnchor: [29, 57],
    html: `<div style="width:58px;height:58px;display:flex;align-items:center;justify-content:center;">
      <div style="transform:rotate(-45deg);width:40px;height:40px;">
        <div style="width:40px;height:40px;background:${bg};border-radius:20px 20px 20px 0;box-shadow:0px 2px 8px rgba(0,0,0,0.18);display:flex;align-items:center;justify-content:center;">
          <span style="transform:rotate(45deg);font-size:20px;line-height:1;display:block;user-select:none;">${emoji}</span>
        </div>
      </div>
    </div>`,
  });
}

function activityLabel(n: number) {
  return n === 1 ? 'Voir 1 activité' : `Voir les ${n} activités`;
}

// ─── Shared sub-components ──────────────────────────────────────────────────

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full overflow-hidden transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0 ${checked ? 'bg-primary' : 'bg-black/[0.16]'}`}
    >
      <span
        className={`absolute left-0 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}
      />
    </button>
  );
}

function SearchBar({ onClick, value, onChange, inputRef }: { onClick?: () => void; value?: string; onChange?: (v: string) => void; inputRef?: React.RefObject<HTMLInputElement | null> }) {
  if (onChange !== undefined) {
    return (
      <div className="flex-1 bg-white rounded-2xl h-11 flex items-center gap-2 px-3 shadow-sheet focus-within:ring-2 focus-within:ring-primary">
        <img src={import.meta.env.BASE_URL + "icons/map-search.svg"} alt="" aria-hidden="true" className="size-5 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Chercher une activité…"
          className="flex-1 bg-transparent font-sans font-semibold text-[14px] text-dark placeholder:text-dark/50 outline-none"
          aria-label="Chercher une activité"
        />
        {value && (
          <button onClick={() => onChange('')} className="shrink-0 text-muted" aria-label="Effacer">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        )}
      </div>
    );
  }
  return (
    <button
      onClick={onClick}
      className="flex-1 bg-white rounded-2xl h-11 flex items-center gap-2 px-3 shadow-sheet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-left"
      aria-label="Chercher une activité"
    >
      <img src={import.meta.env.BASE_URL + "icons/map-search.svg"} alt="" aria-hidden="true" className="size-5 shrink-0" />
      <span className="font-sans font-semibold text-[14px] text-dark/50 select-none">Chercher une activité…</span>
    </button>
  );
}

function FilterButton({ onClick, activeCount }: { onClick: () => void; activeCount: number }) {
  return (
    <button
      onClick={onClick}
      className="relative bg-white rounded-2xl size-11 flex items-center justify-center shadow-sheet shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label="Filtres avancés"
    >
      <img src={import.meta.env.BASE_URL + "icons/map-filter.svg"} alt="" aria-hidden="true" className="size-[17px] brightness-0" />
      {activeCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary rounded-full size-3" />
      )}
    </button>
  );
}

function DatePills({
  active,
  onChange,
  customDate,
  onCustomDate,
  showCustom = true,
}: {
  active: DateFilter;
  onChange: (f: DateFilter) => void;
  customDate: string;
  onCustomDate: (d: string) => void;
  showCustom?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const pillClass = (selected: boolean) =>
    `shrink-0 h-9 rounded-full px-4 font-sans font-bold text-[12px] leading-[18px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
      selected
        ? 'bg-primary text-white'
        : 'bg-white text-dark shadow-[0px_2px_4px_rgba(0,0,0,0.08)]'
    }`;

  return (
    <div className="flex gap-2 flex-wrap" role="group" aria-label="Filtrer par date">
      {DATE_PILLS.map(({ id, label }) => (
        <button key={id} onClick={() => onChange(active === id ? 'all' : id)} aria-pressed={active === id} className={pillClass(active === id)}>
          {label}
        </button>
      ))}
      {showCustom && (
        <>
          <button
            onClick={() => {
              if (active === 'custom') { onChange('all'); } else { inputRef.current?.showPicker?.() ?? inputRef.current?.click(); }
            }}
            aria-pressed={active === 'custom'}
            className={`${pillClass(active === 'custom')} flex items-center gap-1.5`}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M1 5h10" stroke="currentColor" strokeWidth="1.2" />
              <path d="M4 1v2M8 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            {active === 'custom' && customDate
              ? new Date(customDate + 'T00:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
              : 'Choisir'}
          </button>
          <input
            ref={inputRef}
            type="date"
            className="sr-only"
            value={customDate}
            min="2026-06-17"
            onChange={e => {
              onCustomDate(e.target.value);
              onChange('custom');
            }}
          />
        </>
      )}
    </div>
  );
}

function SortSelector({ sortBy, onChange }: { sortBy: SortBy; onChange: (s: SortBy) => void }) {
  const [open, setOpen] = useState(false);
  const current = SORT_OPTIONS.find(o => o.id === sortBy)!;
  const others = SORT_OPTIONS.filter(o => o.id !== sortBy);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
      >
        <span className="font-sans text-[12px] text-muted">Trier par</span>
        <span className="font-sans font-bold text-[12px] text-primary">{current.label}</span>
        <svg
          width="10" height="10" viewBox="0 0 10 10" fill="none"
          className={`text-primary transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-[0px_4px_16px_rgba(0,0,0,0.12)] py-1.5 z-50 min-w-[130px]">
            {others.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => { onChange(id); setOpen(false); }}
                className="w-full text-left px-4 py-2 font-sans text-[14px] text-dark hover:bg-black/[0.03] transition-colors focus-visible:outline-none focus-visible:bg-black/[0.03]"
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ResultCard({ image, category, title, location, time, price, originalPrice, onClick, geoGranted, distance }: MapEvent & { onClick?: () => void; geoGranted?: boolean }) {
  const place = geoGranted ? `${location} · ${formatDistance(distance)}` : location;
  return (
    <article
      className="bg-white rounded-2xl flex items-center gap-3 p-3 shadow-chip cursor-pointer active:opacity-80 transition-opacity"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      <img src={image} alt={title} className="size-20 rounded-xl object-cover shrink-0" loading="lazy" />
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <p className="typo-label text-accent-coral">{getCategoryEmoji(category)} {category}</p>
        <p className="typo-title text-dark leading-[18px] line-clamp-2">{title}</p>
        <div className="flex items-center gap-0.5">
          <img src={ASSETS.icons.clockSmall} alt="" aria-hidden="true" className="size-3 shrink-0" />
          <span className="typo-caption text-dark-warm truncate">{time}</span>
        </div>
        <div className="flex items-center gap-1">
          <img src={ASSETS.icons.pinSmall} alt="" aria-hidden="true" className="size-3 shrink-0" />
          <span className="typo-caption text-dark-warm truncate">{place}</span>
        </div>
      </div>
      <PriceBadgeS price={price} originalPrice={originalPrice} className="shrink-0" surface="card" />
    </article>
  );
}

// ─── Filter sheet ────────────────────────────────────────────────────────────

interface FilterSheetProps {
  filteredCount: number;
  hasActiveFilters: boolean;
  dateFilter: DateFilter;
  onDateFilter: (f: DateFilter) => void;
  customDate: string;
  onCustomDate: (d: string) => void;
  selectedCategories: string[];
  onCategoriesChange: (cats: string[]) => void;
  personCount: number;
  onPersonCount: (n: number) => void;
  maxPrice: number;
  onMaxPrice: (p: number) => void;
  promoOnly: boolean;
  onPromoOnly: (v: boolean) => void;
  onReset: () => void;
  onClose: () => void;
}

function FilterSheet({
  filteredCount,
  hasActiveFilters,
  dateFilter,
  onDateFilter,
  customDate,
  onCustomDate,
  selectedCategories,
  onCategoriesChange,
  personCount,
  onPersonCount,
  maxPrice,
  onMaxPrice,
  promoOnly,
  onPromoOnly,
  onReset,
  onClose,
}: FilterSheetProps) {
  function toggleCategory(id: string) {
    onCategoriesChange(
      selectedCategories.includes(id) ? selectedCategories.filter(c => c !== id) : [...selectedCategories, id],
    );
  }

  const pillClass = (selected: boolean) =>
    `h-9 px-4 rounded-full typo-chip transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
      selected
        ? 'bg-primary text-white'
        : 'bg-white text-dark shadow-chip'
    }`;

  const sectionTitle = 'font-sans font-bold text-[14px] text-dark mb-3';
  const divider = 'border-t border-black/[0.05] my-6';

  return (
    <div className="fixed inset-0 z-[3000] flex flex-col bg-cream overflow-hidden">
      {/* Status bar */}
      <SafeAreaSpacer />

      {/* Header */}
      <div className="relative flex items-center justify-between px-4 pt-6 pb-6 shrink-0">
        <button
          onClick={onReset}
          className={`flex items-center gap-1.5 font-sans font-bold text-[10px] uppercase tracking-[0.5px] leading-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded transition-opacity z-10 ${hasActiveFilters ? 'text-primary opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 7A5.5 5.5 0 1 0 3 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M1.5 2v2h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Réinitialiser
        </button>
        <span className="absolute inset-x-0 text-center font-sans font-extrabold text-[24px] text-dark pointer-events-none">Filtrer</span>
        <button
          onClick={onClose}
          className="bg-white/65 backdrop-blur-[2px] rounded-full size-9 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Fermer"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2L16 16M16 2L2 16" stroke="#1a1a24" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Date */}
        <section>
          <p className={sectionTitle}>Date</p>
          <DatePills
            active={dateFilter}
            onChange={onDateFilter}
            customDate={customDate}
            onCustomDate={onCustomDate}
          />
        </section>

        <div className={divider} />

        {/* Category */}
        <section>
          <p className={sectionTitle}>Catégorie</p>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(({ id, emoji }) => (
              <button
                key={id}
                onClick={() => toggleCategory(id)}
                aria-pressed={selectedCategories.includes(id)}
                className={`${pillClass(selectedCategories.includes(id))} flex items-center gap-1.5`}
              >
                <span>{emoji}</span>
                <span>{id}</span>
              </button>
            ))}
          </div>
        </section>

        <div className={divider} />

        {/* Person count */}
        <section>
          <div className="flex items-center justify-between">
            <p className={sectionTitle.replace('mb-3', '')}>Nombre de personnes</p>
            <div className="flex items-center gap-3 bg-white rounded-2xl px-3 py-2">
              <button
                onClick={() => onPersonCount(Math.max(1, personCount - 1))}
                disabled={personCount <= 1}
                className="size-8 rounded-xl bg-black/[0.04] flex items-center justify-center font-sans font-bold text-[18px] text-dark disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-opacity"
                aria-label="Moins"
              >
                −
              </button>
              <span className="font-sans font-bold text-[18px] text-dark w-6 text-center">
                {personCount === 1 ? '1' : personCount}
              </span>
              <button
                onClick={() => onPersonCount(personCount + 1)}
                className="size-8 rounded-xl bg-primary flex items-center justify-center font-sans font-bold text-[18px] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Plus"
              >
                +
              </button>
            </div>
          </div>
        </section>

        <div className={divider} />

        {/* Price */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <p className={sectionTitle.replace('mb-3', '')}>Prix par personne</p>
            <span className="font-sans font-normal text-[14px] text-primary">
              {maxPrice >= MAX_PRICE ? 'Tous les prix' : `Jusqu'à ${maxPrice} €`}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max={MAX_PRICE}
            step="1"
            value={maxPrice}
            onChange={e => onMaxPrice(Number(e.target.value))}
            className="w-full"
            style={{
              background: `linear-gradient(to right, ${PRIMARY_HEX} 0%, ${PRIMARY_HEX} ${(maxPrice / MAX_PRICE) * 100}%, #e2deda ${(maxPrice / MAX_PRICE) * 100}%, #e2deda 100%)`,
            }}
            aria-label="Prix maximum"
          />
          <div className="flex justify-between mt-1.5">
            <span className="font-sans text-[12px] text-muted">0 €</span>
            <span className="font-sans text-[12px] text-muted">{MAX_PRICE} €</span>
          </div>

          <div className="h-px bg-black/[0.05] mt-3.5" />

          <div className="flex items-center justify-between mt-5">
            <div>
              <p className="font-sans font-bold text-[14px] text-dark">Promos uniquement</p>
            </div>
            <Toggle checked={promoOnly} onChange={onPromoOnly} />
          </div>
        </section>
      </div>

      {/* Footer */}
      <ButtonFooter className="shrink-0">
        <PrimaryButton onClick={onClose}>
          {activityLabel(filteredCount)}
        </PrimaryButton>
      </ButtonFooter>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

interface MapPageProps {
  onTabChange: (tab: Tab) => void;
  onOpenEvent?: () => void;
  geoGranted?: boolean;
  onGeoGranted?: () => void;
}

export default function MapPage({ onTabChange, onOpenEvent, geoGranted, onGeoGranted }: MapPageProps) {
  const [listOpen, setListOpen] = useState(false);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Filter state
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [customDate, setCustomDate] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [personCount, setPersonCount] = useState(1);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [promoOnly, setPromoOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>('recommended');
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const focusSearchOnOpen = useRef(false);

  // Geolocation state
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [locating, setLocating] = useState(false);
  const watchIdRef = useRef<number | null>(null);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [dragDelta, setDragDelta] = useState(0);
  const dragStartRef = useRef(0);

  useEffect(() => {
    const styleId = 'joy-user-marker-style';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `@keyframes joy-pulse { 0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.5} 50%{transform:translate(-50%,-50%) scale(2);opacity:0} }`;
      document.head.appendChild(style);
    }
    return () => {
      if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
    };
  }, []);

  function handleLocate() {
    if (!navigator.geolocation) return;
    if (userPosition) {
      // Second tap: clear tracking
      if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
      setUserPosition(null);
      setLocating(false);
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        setUserPosition([pos.coords.latitude, pos.coords.longitude]);
        setLocating(false);
        onGeoGranted?.();
      },
      () => setLocating(false),
    );
    if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
    watchIdRef.current = navigator.geolocation.watchPosition(
      pos => setUserPosition([pos.coords.latitude, pos.coords.longitude]),
      () => {},
    );
  }

  useEffect(() => {
    if (!listOpen || !focusSearchOnOpen.current) return;
    focusSearchOnOpen.current = false;
    const timer = setTimeout(() => searchInputRef.current?.focus(), 350);
    return () => clearTimeout(timer);
  }, [listOpen]);

  useEffect(() => {
    if (geoGranted && !userPosition && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setUserPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        () => {},
      );
    }
  }, [geoGranted, userPosition]);

  const handleSheetTouchStart = (e: React.TouchEvent) => {
    dragStartRef.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleSheetTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const delta = currentY - dragStartRef.current;
    setDragDelta(delta);
  };

  const handleSheetTouchEnd = () => {
    setIsDragging(false);
    const threshold = 60;
    const velocity = dragDelta / 0.3;

    if (listOpen) {
      if (dragDelta > threshold || velocity > 500) {
        setListOpen(false);
      }
    } else {
      if (dragDelta < -threshold || velocity < -500) {
        setListOpen(true);
        setSelectedId(null);
      }
    }

    setDragDelta(0);
  };

  function handleReset() {
    setDateFilter('all');
    setCustomDate('');
    setSelectedCategories([]);
    setPersonCount(1);
    setMaxPrice(MAX_PRICE);
    setPromoOnly(false);
  }

  const hasActiveFilters =
    dateFilter !== 'all' || selectedCategories.length > 0 || personCount > 1 || maxPrice < MAX_PRICE || promoOnly;

  const activeFilterCount = [
    hasActiveFilters,
  ].filter(Boolean).length;

  const filteredEvents = useMemo(() => {
    let events = [...mapEvents];

    // Date
    if (dateFilter === 'custom' && customDate) {
      events = events.filter(e => e.date === customDate);
    } else if (dateFilter !== 'all') {
      events = events.filter(e => e.dateFilters.includes(dateFilter));
    }

    // Category
    if (selectedCategories.length > 0) {
      events = events.filter(e => selectedCategories.some(cat => e.category.includes(cat)));
    }

    // Price
    if (maxPrice < MAX_PRICE) {
      events = events.filter(e => e.priceValue <= maxPrice);
    }

    // Promo
    if (promoOnly) {
      events = events.filter(e => e.promo);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      events = events.filter(e =>
        e.title.toLowerCase().includes(q) || e.category.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'date') events = [...events].sort((a, b) => a.dateOrder - b.dateOrder);
    else if (sortBy === 'distance') events = [...events].sort((a, b) => a.distance - b.distance);

    return events;
  }, [dateFilter, customDate, selectedCategories, maxPrice, promoOnly, sortBy, searchQuery]);

  // Clear selection when the selected event is filtered out
  const selectedEvent = filteredEvents.find(e => e.id === selectedId) ?? null;
  if (selectedId && !selectedEvent) setSelectedId(null);

  const icons = useMemo(
    () => Object.fromEntries(filteredEvents.map(e => [e.id, makeMarkerIcon(e.emoji, e.id === selectedId)])),
    [filteredEvents, selectedId],
  );

  const filterSheetProps: FilterSheetProps = {
    filteredCount: filteredEvents.length,
    hasActiveFilters,
    dateFilter,
    onDateFilter: setDateFilter,
    customDate,
    onCustomDate: setCustomDate,
    selectedCategories,
    onCategoriesChange: setSelectedCategories,
    personCount,
    onPersonCount: setPersonCount,
    maxPrice,
    onMaxPrice: setMaxPrice,
    promoOnly,
    onPromoOnly: setPromoOnly,
    onReset: handleReset,
    onClose: () => setFilterSheetOpen(false),
  };


  // ── Unified map + animated sheet view ──────────────────────────────────────
  const TAB_BAR_CLEARANCE = 98; // px — space reserved for the floating tab bar, which overlays (not reserves) layout
  const PEEK_H = 76 + TAB_BAR_CLEARANCE; // px — visible collapsed-sheet handle, clearing the tab bar

  return (
    <>
      {/* Map — fixed full-viewport background layer, so it extends behind the floating tab bar */}
      <MapContainer
        center={[48.856, 2.348]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className="fixed inset-0"
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <ClusteredMarkers
          events={filteredEvents}
          selectedId={selectedId}
          icons={icons}
          onSelect={setSelectedId}
        />
        {userPosition && <Marker position={userPosition} icon={USER_MARKER_ICON} />}
        <FlyToUser position={userPosition} />
      </MapContainer>

      <div className="relative h-svh overflow-hidden pointer-events-none">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          {/* Search header overlay — fades out when sheet opens */}
          <div
            className="absolute top-0 left-0 right-0 z-[1000] flex flex-col pointer-events-none transition-opacity duration-300"
            style={{ opacity: listOpen ? 0 : 1, pointerEvents: listOpen ? 'none' : undefined }}
          >
            <SafeAreaSpacer />
            <div className="flex gap-2.5 pt-4 pb-2 px-4 pointer-events-auto">
              <SearchBar onClick={() => { focusSearchOnOpen.current = true; setListOpen(true); }} />
              <FilterButton onClick={() => setFilterSheetOpen(true)} activeCount={activeFilterCount} />
            </div>
            <div className="pointer-events-auto px-4 pt-2 pb-2">
              <DatePills
                active={dateFilter}
                onChange={setDateFilter}
                customDate={customDate}
                onCustomDate={setCustomDate}
                showCustom={false}
              />
            </div>
          </div>

          {/* Navigate button */}
          <button
            onClick={handleLocate}
            className={`absolute right-4 z-[1001] rounded-2xl size-11 flex items-center justify-center shadow-[0px_2px_12px_rgba(0,0,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-[opacity,bottom,background-color] duration-300 active:opacity-75 ${userPosition ? 'bg-primary-light' : 'bg-white'}`}
            style={{
              opacity: listOpen ? 0 : 1,
              pointerEvents: listOpen ? 'none' : 'auto',
              bottom: (selectedEvent && !listOpen ? 152 : 112) + TAB_BAR_CLEARANCE,
            }}
            aria-label="Ma position"
            aria-pressed={!!userPosition}
          >
            {locating ? (
              <svg className="animate-spin size-[18px] text-primary" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.2" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            ) : (
              <img src={import.meta.env.BASE_URL + "icons/map-navigate.svg"} alt="" aria-hidden="true" className={`size-[18px] ${userPosition ? '[filter:invert(35%)_sepia(80%)_saturate(600%)_hue-rotate(210deg)]' : ''}`} />
            )}
          </button>

          {/* Floating selected card */}
          {selectedEvent && !listOpen && (
            <div className="absolute left-4 right-4 z-[1000] pointer-events-auto" style={{ bottom: 16 + TAB_BAR_CLEARANCE }}>
              <div className="relative">
                <ResultCard {...selectedEvent} onClick={onOpenEvent} geoGranted={geoGranted} />
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute -top-2 -right-2 bg-white rounded-full size-6 flex items-center justify-center shadow-[0px_2px_8px_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:opacity-70 transition-opacity"
                  aria-label="Fermer"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1 1L9 9M9 1L1 9" stroke="#1a1a24" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* ── Animated bottom sheet ─────────────────────────────────────────── */}
          <div
            className="absolute inset-x-0 bottom-0 z-[1000] flex flex-col bg-cream rounded-t-3xl shadow-[0px_-4px_24px_rgba(0,0,0,0.08)] pointer-events-auto"
            onTouchStart={handleSheetTouchStart}
            onTouchMove={handleSheetTouchMove}
            onTouchEnd={handleSheetTouchEnd}
            style={{
              height: '100%',
              transform: listOpen ? `translateY(${Math.max(dragDelta, 0)}px)` : selectedEvent ? `translateY(calc(100% + ${Math.max(dragDelta, 0)}px))` : `translateY(calc(100% - ${PEEK_H}px + ${Math.max(dragDelta, 0)}px))`,
              transition: isDragging ? 'none' : 'transform 0.45s cubic-bezier(0.32, 0.72, 0, 1)',
              willChange: 'transform',
            }}
          >
            {/* Handle row — only in peek state */}
            {!listOpen && (
              <button
                onClick={() => { setListOpen(true); setSelectedId(null); }}
                className="shrink-0 flex flex-col items-center gap-3 pt-3 pb-3 w-full focus-visible:outline-none active:opacity-70 transition-opacity border-b border-black/[0.05]"
                aria-label={activityLabel(filteredEvents.length)}
              >
                <div className="bg-[#e0dcd9] h-1 w-9 rounded-full" />
                <span className="typo-title text-dark">{activityLabel(filteredEvents.length)}</span>
              </button>
            )}

            {/* List content — fades in after sheet slides up */}
            <div
              className="flex-1 overflow-y-auto flex flex-col min-h-0"
              style={{
                opacity: listOpen ? 1 : 0,
                transition: 'opacity 0.25s ease',
                transitionDelay: listOpen ? '0.25s' : '0s',
                pointerEvents: listOpen ? 'auto' : 'none',
              }}
            >
              {/* Safe-area spacer — matches the map overlay's top gap */}
              <SafeAreaSpacer />

              {/* Search + filters header */}
              <div className="shrink-0 flex flex-col gap-4 pt-4 pb-3 px-4">
                <div className="flex gap-2.5">
                  <SearchBar value={searchQuery} onChange={setSearchQuery} inputRef={searchInputRef} />
                  <FilterButton onClick={() => setFilterSheetOpen(true)} activeCount={activeFilterCount} />
                </div>
                <DatePills
                  active={dateFilter}
                  onChange={setDateFilter}
                  customDate={customDate}
                  onCustomDate={setCustomDate}
                  showCustom={false}
                />
                <div className="flex justify-end">
                  <SortSelector sortBy={sortBy} onChange={setSortBy} />
                </div>
              </div>

              {/* Results */}
              <div className="flex-1 overflow-y-auto px-4 pt-1 flex flex-col gap-3" style={{ paddingBottom: 24 + TAB_BAR_CLEARANCE }} aria-label="Résultats">
                {filteredEvents.map(event => (
                  <ResultCard key={event.id} {...event} onClick={onOpenEvent} geoGranted={geoGranted} />
                ))}
                {filteredEvents.length === 0 && (
                  <p className="text-center font-sans text-[14px] text-muted mt-8">Aucune activité trouvée</p>
                )}
              </div>
            </div>

            {/* "Carte" button — visible when list is open, above tab bar */}
            <div
              className="shrink-0 flex items-center justify-center pt-3 border-t border-black/[0.05]"
              style={{
                opacity: listOpen ? 1 : 0,
                pointerEvents: listOpen ? 'auto' : 'none',
                transition: 'opacity 0.2s ease',
                transitionDelay: listOpen ? '0.3s' : '0s',
                paddingBottom: 20 + TAB_BAR_CLEARANCE,
              }}
            >
              <button
                onClick={() => { setListOpen(false); setSelectedId(null); }}
                className="flex items-center gap-2 bg-primary text-white rounded-full px-5 h-11 font-sans font-bold text-[14px] active:opacity-75 transition-opacity focus-visible:outline-none"
                aria-label="Voir la carte"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M1 3.5L5.5 2L10.5 4L15 2.5V12.5L10.5 14L5.5 12L1 13.5V3.5Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M5.5 2V12M10.5 4V14" stroke="white" strokeWidth="1.5" />
                </svg>
                Carte
              </button>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-[1002] pointer-events-auto">
          <AppFooter activeTab="Carte" onTabChange={onTabChange} />
        </div>
      </div>

      {filterSheetOpen && <FilterSheet {...filterSheetProps} />}
    </>
  );
}
