<script>
  let { mode, onStart, onBack } = $props();

  let player1 = $state('');
  let player2 = $state('');

  function start() {
    const p1 = player1.trim() || 'Jugador 1';
    const p2 = player2.trim() || 'Jugador 2';
    onStart({ players: [p1, p2] });
  }

  function swap() {
    const temp = player1;
    player1 = player2;
    player2 = temp;
  }

  const modeLabels = {
    symbols: 'Conectar símbolos',
    colors: 'Conectar colores',
    advanced: 'Símbolos vs Colores'
  };
</script>

<div class="flex flex-col items-center justify-center min-h-[100dvh] gap-5 p-4">
  <p class="text-sm text-gray-400 uppercase tracking-wider">{modeLabels[mode]}</p>
  <h2 class="text-2xl font-bold">¿Quién juega?</h2>

  <div class="flex flex-col gap-3 w-full max-w-xs">
    <div>
      <label class="text-xs text-orange-400 uppercase tracking-wider block mb-1">Jugador 1 (empieza)</label>
      <input
        type="text"
        bind:value={player1}
        placeholder="Nombre"
        maxlength="12"
        class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-sm text-white text-sm focus:outline-none focus:border-orange-500"
      />
    </div>
    <div>
      <label class="text-xs text-blue-400 uppercase tracking-wider block mb-1">Jugador 2</label>
      <input
        type="text"
        bind:value={player2}
        placeholder="Nombre"
        maxlength="12"
        class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-sm text-white text-sm focus:outline-none focus:border-blue-500"
      />
    </div>

    <button
      onclick={swap}
      class="self-center px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white text-xs font-semibold rounded-sm transition-all cursor-pointer border border-gray-600 hover:border-gray-400"
    >
      ⇅ Invertir orden
    </button>
  </div>

  <button
    onclick={start}
    class="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold text-sm uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
  >
    Empezar
  </button>

  <button
    onclick={onBack}
    class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer border border-gray-600 hover:border-gray-400"
  >
    ← Volver
  </button>
</div>
