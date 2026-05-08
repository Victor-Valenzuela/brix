<script>
  let { onStart, hasSavedGame = false, onContinue = null } = $props();
</script>

<div class="flex flex-col items-center justify-center min-h-[100dvh] gap-6 p-4">
  <div class="text-center">
    <h1 class="text-5xl sm:text-7xl tracking-tight uppercase brix-title">
      <span class="brix-logo" data-text="BRIX">
        <span class="text-orange-500">BR</span><span class="text-blue-500">IX</span>
      </span>

    </h1>
    <p class="text-gray-400 mt-1 text-sm tracking-widest uppercase">Construye o destruye</p>
    <div class="text-gray-500 text-xs max-w-xs text-center">
      Alinea piezas 4 para ganar!
    </div>
  </div>

  <div class="flex flex-col gap-3 w-full max-w-xs">
    <button
      onclick={() => onStart('symbols')}
      class="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold text-sm uppercase tracking-wider rounded-sm transition-colors cursor-pointer border-l-4 border-orange-500"
    >
      <span class="block">Conectar símbolos</span>
      <span class="block text-[10px] text-gray-400 font-normal normal-case mt-0.5">Un jugador con X, otro con O</span>
    </button>

    <button
      onclick={() => onStart('colors')}
      class="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold text-sm uppercase tracking-wider rounded-sm transition-colors cursor-pointer border-l-4 border-blue-500"
    >
      <span class="block">Conectar colores</span>
      <span class="block text-[10px] text-gray-400 font-normal normal-case mt-0.5">Un jugador con naranja, otro con azul</span>
    </button>

    <button
      onclick={() => onStart('advanced')}
      class="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold text-sm uppercase tracking-wider rounded-sm transition-colors cursor-pointer border-l-4 border-yellow-500"
    >
      <span class="block">Símbolos vs Colores</span>
      <span class="block text-[10px] text-gray-400 font-normal normal-case mt-0.5">Un jugador con símbolos, otro con colores</span>
    </button>
  </div>

  {#if hasSavedGame}
    <button
      onclick={onContinue}
      class="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold text-sm uppercase tracking-wider rounded-sm transition-colors cursor-pointer border-l-4 border-green-500 w-full max-w-xs"
    >
      <span class="block">▶ Continuar partida</span>
    </button>
  {/if}
</div>
