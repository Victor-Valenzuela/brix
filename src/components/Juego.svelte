<script>
  import { createBoard, placeBrick, checkWin, getBrickConfigs, getValidPositions, canPlace } from '../lib/gameLogic.js';
  import { sfxSelect, sfxPlace, sfxWin, sfxDraw } from '../lib/sfx.js';
  import Tablero from './Tablero.svelte';
  import SelectorLadrillo from './SelectorLadrillo.svelte';

  let { mode, players, onRestart } = $props();

  let board = $state(createBoard());
  let currentPlayer = $state(1);
  let selectedConfig = $state(null);
  let validPositions = $state([]);
  let lastPlaced = $state(null);
  let winLine = $state(null);
  let gameOver = $state(false);
  let result = $state(null);

  const allConfigs = getBrickConfigs();

  // En modo colores, solo 4 configs (no importa el símbolo, solo el color)
  const configs = mode === 'colors'
    ? allConfigs.filter(c => c.id === 'h1' || c.id === 'h3' || c.id === 'v1' || c.id === 'v3')
    : allConfigs;

  function selectConfig(config) {
    if (gameOver) return;
    selectedConfig = config;
    validPositions = getValidPositions(board, config.orientation);
    sfxSelect();
  }

  function handleCellClick(row, col) {
    if (gameOver) return;
    if (!selectedConfig) return;
    if (!canPlace(board, row, col, selectedConfig.orientation)) return;

    board = placeBrick(board, row, col, selectedConfig);
    sfxPlace();

    if (selectedConfig.orientation === 'h') {
      lastPlaced = [[row, col], [row, col + 1]];
    } else {
      lastPlaced = [[row, col], [row - 1, col]];
    }

    const check = checkWin(board, currentPlayer, mode);
    if (check) {
      gameOver = true;
      winLine = check.line || [];
      result = check;
      selectedConfig = null;
      validPositions = [];
      if (check.type === 'draw') {
        sfxDraw();
      } else {
        sfxWin();
      }
      return;
    }

    currentPlayer = currentPlayer === 1 ? 2 : 1;
    selectedConfig = null;
    validPositions = [];
  }

  function getWinMessage() {
    if (!result) return '';
    if (result.type === 'draw') return 'Empate';
    if (result.type === 'symbol') return `4 "${result.value}" en línea`;
    if (result.type === 'color') return `4 ${result.value === 'orange' ? 'naranja' : 'azul'} en línea`;
    return '';
  }

  function getPlayerLabel() {
    if (!result || result.type === 'draw') return '';
    const name = players[result.player - 1];
    if (mode === 'symbols') return `${name} (${result.player === 1 ? 'X' : 'O'})`;
    if (mode === 'colors') return `${name} (${result.player === 1 ? 'Naranja' : 'Azul'})`;
    if (mode === 'advanced') return `${name} (${result.player === 1 ? 'Símbolos' : 'Colores'})`;
    return name;
  }
</script>

<div class="flex flex-row items-center justify-center h-[100dvh] gap-6 px-3 py-2 overflow-hidden">
  <Tablero {board} {validPositions} {lastPlaced} {selectedConfig} {winLine} {mode} onCellClick={handleCellClick} />

  <div class="flex flex-col items-center justify-center gap-3 pl-[3vw]">
    {#if gameOver}
      <div class="text-center flex flex-col gap-3">
        {#if result.type === 'draw'}
          <p class="text-2xl font-black uppercase text-gray-400">Empate</p>
          <p class="text-xs text-gray-500">El muro está completo</p>
        {:else}
          <p class="text-2xl font-black uppercase {result.player === 1 ? 'text-orange-500' : 'text-blue-500'}">
            ¡Victoria!
          </p>
          <p class="text-sm text-gray-300">{getPlayerLabel()}</p>
          <p class="text-xs text-gray-400">{getWinMessage()}</p>
        {/if}

        <button
          onclick={onRestart}
          class="mt-2 px-5 py-2 bg-gray-600 hover:bg-gray-500 text-white font-bold text-sm uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
        >
          🏠 Volver a inicio
        </button>
      </div>
    {:else}
      <div class="text-center">
        <p class="text-xs uppercase tracking-wider">
          Turno de
          <span class="font-bold {currentPlayer === 1 ? 'text-orange-500' : 'text-blue-500'}">
            {players[currentPlayer - 1]}
          </span>
        </p>
        {#if !selectedConfig}
          <p class="text-[10px] text-gray-400">Elige un ladrillo</p>
        {:else}
          <p class="text-[10px] text-gray-400">Elige dónde colocarlo</p>
        {/if}
      </div>

      <SelectorLadrillo {configs} {selectedConfig} {mode} onSelect={selectConfig} />

      <button
        onclick={onRestart}
        class="mt-3 px-4 py-2 bg-gray-700 hover:bg-red-600 text-gray-300 hover:text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer border border-gray-600 hover:border-red-500"
      >
        🏠 Volver a inicio
      </button>
    {/if}
  </div>
</div>
