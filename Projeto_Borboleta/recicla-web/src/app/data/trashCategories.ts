import { TrashType, GameItem } from '../types';

export const lixoTypes: TrashType[] = [
  {
    id: 'plastico',
    icon: '🥤',
    title: 'PLÁSTICO - LIXEIRA VERMELHA',
    color: '#F44336',
    description: 'Garrafas PET, embalagens de produtos de limpeza, sacolas plásticas, potes de iogurte, tampas de refrigerante, brinquedos quebrados.',
    tip: '💡 Dica: Lave as embalagens antes de descartar para evitar contaminação!'
  },
  {
    id: 'papel',
    icon: '📄',
    title: 'PAPEL - LIXEIRA AZUL',
    color: '#2196F3',
    description: 'Jornais, revistas, caixas de papelão, envelopes, papel de escritório, livros velhos, embalagens de papel.',
    tip: '💡 Dica: Remova grampos e clipes antes de descartar o papel!'
  },
  {
    id: 'vidro',
    icon: '🍶',
    title: 'VIDRO - LIXEIRA VERDE',
    color: '#4CAF50',
    description: 'Garrafas de vidro, potes de conserva, frascos de perfume, copos quebrados, vidros de janela.',
    tip: '💡 Dica: Separe tampas e rótulos antes de descartar o vidro!'
  },
  {
    id: 'metal',
    icon: '🥫',
    title: 'METAL - LIXEIRA AMARELA',
    color: '#FF9800',
    description: 'Latas de alumínio, latas de conserva, tampas de garrafa, objetos de ferro, panelas velhas.',
    tip: '💡 Dica: Amasse as latas para economizar espaço na coleta!'
  },
  {
    id: 'organico',
    icon: '🍌',
    title: 'ORGÂNICO - LIXEIRA MARROM',
    color: '#795548',
    description: 'Restos de comida, cascas de frutas e legumes, borra de café, cascas de ovos, folhas secas.',
    tip: '💡 Dica: Use restos orgânicos para fazer compostagem em casa!'
  }
];

export const gameData: GameItem[] = [
  { item: '🍌', type: 'organico', name: 'Banana' },
  { item: '📄', type: 'papel', name: 'Papel' },
  { item: '🍶', type: 'vidro', name: 'Garrafa de vidro' },
  { item: '🥫', type: 'metal', name: 'Lata de conserva' },
  { item: '🍎', type: 'organico', name: 'Maçã' },
  { item: '📦', type: 'papel', name: 'Caixa de papelão' },
  { item: '🥤', type: 'plastico', name: 'Copo plástico' },
  { item: '🍺', type: 'vidro', name: 'Caneca de cerveja' },
  { item: '🔧', type: 'metal', name: 'Ferramenta de ferro' },
  { item: '🍠', type: 'organico', name: 'Batata' },
  { item: '🛍️', type: 'plastico', name: 'Sacola plástica' },
  { item: '📝', type: 'papel', name: 'Bloco de notas' },
  { item: '🍯', type: 'vidro', name: 'Pote de mel' },
  { item: '🛠️', type: 'metal', name: 'Chave de fenda' },
  { item: '🥬', type: 'organico', name: 'Folha de alface' },
  { item: '🧴', type: 'plastico', name: 'Frasco de sabonete líquido' },
  { item: '📬', type: 'papel', name: 'Envelope' },
  { item: '🍾', type: 'vidro', name: 'Garrafa de vinho' },
  { item: '🔩', type: 'metal', name: 'Parafuso' }
];

export const MAX_GAME_SCORE = 10;