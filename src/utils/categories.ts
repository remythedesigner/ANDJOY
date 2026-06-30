export const CATEGORIES = [
  { id: 'Ateliers & initiations', emoji: '🎨', color: '#f4f4f8' },
  { id: 'Spectacles', emoji: '🎭', color: '#eef1ff' },
  { id: 'Musique', emoji: '🎵', color: '#fff0f5' },
  { id: 'Expositions', emoji: '🖼️', color: '#fff8ee' },
  { id: 'Bien-être', emoji: '🧘', color: '#edfff5' },
  { id: 'Sport', emoji: '⚽', color: '#eefff4' },
  { id: 'Jeux', emoji: '🎲', color: '#f5f0ff' },
  { id: 'Plein air', emoji: '🌿', color: '#f0fff5' },
  { id: 'Kids friendly', emoji: '👶', color: '#fff7ee' },
];

export function getCategoryEmoji(id: string): string {
  return CATEGORIES.find(c => c.id === id)?.emoji ?? '';
}
