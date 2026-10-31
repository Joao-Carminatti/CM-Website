const campo =
  "border-line text-ink bg-paper h-12 w-full rounded-md border px-3 text-base";

/** Busca rápida: formulário GET puro (zero JS). Leva ao catálogo com filtros na URL. */
export function HeroSearch({ locais }: { locais: string[] }) {
  return (
    <form
      action="/imoveis"
      method="get"
      aria-label="Busca rápida de imóveis"
      className="bg-paper text-ink relative mt-14 grid gap-4 rounded-lg p-5 shadow-[var(--shadow-lift)] sm:grid-cols-2 lg:grid-cols-[1fr_1.3fr_1fr_0.8fr_auto] lg:items-end"
    >
      <div>
        <label htmlFor="busca-tipo" className="mb-1.5 block text-sm font-medium">
          Tipo
        </label>
        <select id="busca-tipo" name="tipo" className={campo} defaultValue="">
          <option value="">Todos</option>
          <option value="apartamento">Apartamento</option>
          <option value="casa">Casa</option>
          <option value="cobertura">Cobertura</option>
          <option value="terreno">Terreno</option>
          <option value="comercial">Comercial</option>
        </select>
      </div>
      <div>
        <label htmlFor="busca-local" className="mb-1.5 block text-sm font-medium">
          Cidade ou bairro
        </label>
        <input
          id="busca-local"
          name="local"
          list="busca-locais"
          autoComplete="off"
          placeholder="Digite o local"
          className={campo}
        />
        <datalist id="busca-locais">
          {locais.map((l) => (
            <option key={l} value={l} />
          ))}
        </datalist>
      </div>
      <div>
        <label htmlFor="busca-preco" className="mb-1.5 block text-sm font-medium">
          Valor máximo
        </label>
        <select id="busca-preco" name="precoMax" className={campo} defaultValue="">
          <option value="">Qualquer valor</option>
          <option value="300000">Até R$ 300 mil</option>
          <option value="500000">Até R$ 500 mil</option>
          <option value="800000">Até R$ 800 mil</option>
          <option value="1200000">Até R$ 1,2 milhão</option>
          <option value="2000000">Até R$ 2 milhões</option>
        </select>
      </div>
      <div>
        <label htmlFor="busca-quartos" className="mb-1.5 block text-sm font-medium">
          Quartos
        </label>
        <select id="busca-quartos" name="quartos" className={campo} defaultValue="">
          <option value="">Qualquer</option>
          <option value="1">1 ou mais</option>
          <option value="2">2 ou mais</option>
          <option value="3">3 ou mais</option>
          <option value="4">4 ou mais</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-ink text-paper hover:bg-ink-soft h-12 rounded-md px-7 font-semibold transition-colors sm:col-span-2 lg:col-span-1"
      >
        Buscar imóveis
      </button>
    </form>
  );
}
