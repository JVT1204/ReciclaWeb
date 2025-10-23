import { TrashCategory } from '../types';

export const trashCategories: TrashCategory[] = [
  {
    id: 'plastico',
    icon: '🥤',
    title: 'PLÁSTICO',
    description: 'Garrafas PET, embalagens de produtos de limpeza, sacolas plásticas, potes de iogurte',
    color: '#F44336',
    tip: 'Lave as embalagens antes de descartar para evitar contaminação!'
  },
  {
    id: 'papel',
    icon: '📄',
    title: 'PAPEL',
    description: 'Jornais, revistas, caixas de papelão, envelopes, papel de escritório',
    color: '#2196F3',
    tip: 'Remova grampos e clipes antes de descartar o papel!'
  },
  {
    id: 'vidro',
    icon: '🍶',
    title: 'VIDRO',
    description: 'Garrafas de vidro, potes de conserva, frascos de perfume, copos quebrados',
    color: '#4CAF50',
    tip: 'Separe tampas e rótulos antes de descartar o vidro!'
  },
  {
    id: 'metal',
    icon: '🥫',
    title: 'METAL',
    description: 'Latas de alumínio, latas de conserva, tampas de garrafa, objetos de ferro',
    color: '#FF9800',
    tip: 'Amasse as latas para economizar espaço na coleta!'
  },
  {
    id: 'organico',
    icon: '🍌',
    title: 'ORGÂNICO',
    description: 'Restos de comida, cascas de frutas e legumes, borra de café, cascas de ovos',
    color: '#795548',
    tip: 'Use restos orgânicos para fazer compostagem em casa!'
  }
];
