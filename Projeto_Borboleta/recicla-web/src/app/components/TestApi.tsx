'use client';

import { useState } from 'react';

type Frase = {
  id: number;
  frase: string;
  autor: string;
};

export default function TestApi() {
  const [frases, setFrases] = useState<Frase[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  async function testarApi() {
    try {
      setErro(null);
      const resp = await fetch('/api/frases');
      if (!resp.ok) {
        throw new Error('Erro na resposta da API');
      }
      const data = await resp.json();
      setFrases(data.frases || []);
    } catch (e: any) {
      setErro(e.message || 'Erro ao chamar a API');
    }
  }

  return (
    <section className="api-frases-container">
      <h3 className="api-frases-titulo">Debug da API de Frases</h3>

      <button className="button" onClick={testarApi}>
        📡 Testar API
      </button>

      {erro && <p className="api-frases-erro">Erro: {erro}</p>}

      {frases.length > 0 && (
        <ul className="api-frases-lista">
          {frases.map((f) => (
            <li className="api-frases-item" key={f.id}>
              <span className="api-frases-texto">{f.frase}</span>
              <span className="api-frases-autor">— {f.autor}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
