'use client';

import { useState } from 'react';

export default function TestApi() {
  const [frases, setFrases] = useState<any[]>([]);
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
    <div style={{ marginTop: '20px' }}>
      <button onClick={testarApi}>
        Testar API de Frases
      </button>

      {erro && <p>Erro: {erro}</p>}

      {frases.length > 0 && (
        <ul>
          {frases.map((f) => (
            <li key={f.id}>
              {f.frase} — <strong>{f.autor}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
