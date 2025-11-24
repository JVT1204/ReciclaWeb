import { NextResponse } from 'next/server';

export function GET() {
  const frases = [
    {
      id: 1,
      frase: 'Cada atitude conta: recicle hoje para viver melhor amanhã.',
      autor: 'Consciência Ambiental',
    },
    {
      id: 2,
      frase: 'Separar o lixo é um pequeno gesto com um grande impacto no planeta.',
      autor: 'Educação Ambiental',
    },
    {
      id: 3,
      frase: 'Reciclar é transformar o que seria lixo em novas possibilidades.',
      autor: 'Sustentabilidade Já',
    },
    {
      id: 4,
      frase: 'O futuro é sustentável se as nossas escolhas também forem.',
      autor: 'Consciência Verde',
    },
    {
      id: 5,
      frase: 'Cuidar do meio ambiente é cuidar da nossa própria casa.',
      autor: 'Campanha Ambiental',
    },
  ];

  return NextResponse.json({ frases });
}