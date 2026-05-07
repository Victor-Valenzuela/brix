<script>
  let { configs, selectedConfig, mode, onSelect } = $props();

  function getCellStyle(cell) {
    const bg = cell.color === 'orange' ? '#ea580c' : '#0284c7';
    return `background: ${bg}`;
  }

  function isSelected(config) {
    return selectedConfig && selectedConfig.id === config.id;
  }

  const horizontals = $derived(configs.filter(c => c.orientation === 'h'));
  const verticals = $derived(configs.filter(c => c.orientation === 'v'));
</script>

<div class="flex flex-col gap-3">
  <!-- Horizontales -->
  <div class="grid grid-cols-2 gap-2 justify-items-center">
    {#each horizontals as config}
      <button
        class="flex flex-row gap-0.5 p-2 rounded-sm transition-all cursor-pointer justify-self-center {isSelected(config) ? 'ring-2 ring-yellow-400 scale-105 bg-gray-600' : 'bg-gray-700 hover:bg-gray-600'}"
        onclick={() => onSelect(config)}
      >
        {#each config.cells as cell}
          <div
            class="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-sm flex items-center justify-center text-base sm:text-lg md:text-xl font-black text-white"
            style="{getCellStyle(cell)}; font-family: 'Fredoka', sans-serif;"
          >
            {mode !== 'colors' ? cell.symbol : ''}
          </div>
        {/each}
      </button>
    {/each}
  </div>

  <!-- Verticales -->
  <div class="grid grid-cols-4 gap-2">
    {#each verticals as config}
      <button
        class="flex flex-col-reverse gap-0.5 p-2 rounded-sm transition-all cursor-pointer {isSelected(config) ? 'ring-2 ring-yellow-400 scale-105 bg-gray-600' : 'bg-gray-700 hover:bg-gray-600'}"
        onclick={() => onSelect(config)}
      >
        {#each config.cells as cell}
          <div
            class="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-sm flex items-center justify-center text-base sm:text-lg md:text-xl font-black text-white"
            style="{getCellStyle(cell)}; font-family: 'Fredoka', sans-serif;"
          >
            {mode !== 'colors' ? cell.symbol : ''}
          </div>
        {/each}
      </button>
    {/each}
  </div>
</div>
