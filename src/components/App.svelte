<script>
  import { loadGameState, clearGameState } from '../lib/storage.js';
  import PantallaInicio from './PantallaInicio.svelte';
  import PantallaSetup from './PantallaSetup.svelte';
  import Juego from './Juego.svelte';

  let screen = $state('inicio');
  let gameMode = $state(null);
  let players = $state(['Jugador 1', 'Jugador 2']);
  let isPortrait = $state(false);
  let hasSavedGame = $state(false);

  // Verificar si hay partida guardada
  const saved = loadGameState();
  if (saved) {
    hasSavedGame = true;
    gameMode = saved.mode;
    players = saved.players;
  }

  // Detectar orientación
  if (typeof window !== 'undefined') {
    const mq = window.matchMedia('(orientation: portrait) and (max-width: 1024px)');
    isPortrait = mq.matches;
    mq.addEventListener('change', (e) => { isPortrait = e.matches; });

    // Si sale de fullscreen durante partida, volver a inicio
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement && screen === 'juego') {
        screen = 'inicio';
      }
    });
  }

  function selectMode(mode) {
    gameMode = mode;
    screen = 'setup';
  }

  function continueGame() {
    screen = 'juego';
  }

  function newGame() {
    clearGameState();
    hasSavedGame = false;
    gameMode = null;
    screen = 'inicio';
  }

  function startGame(config) {
    players = config.players;
    screen = 'juego';
  }

  function restart() {
    clearGameState();
    hasSavedGame = false;
    screen = 'inicio';
    gameMode = null;
    players = ['Jugador 1', 'Jugador 2'];
    if (document.fullscreenElement) {
      document.exitFullscreen().then(() => {
        if (screen.orientation && screen.orientation.lock) {
          screen.orientation.lock('portrait').catch(() => {});
        }
      }).catch(() => {});
    }
  }

  function backToModes() {
    screen = 'inicio';
    gameMode = null;
  }

  function enterFullscreenAndPlay() {
    const isMobile = navigator.maxTouchPoints > 0 && window.innerWidth < 1024;
    if (isMobile && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().then(() => {
        if (screen.orientation && screen.orientation.lock) {
          screen.orientation.lock('landscape').catch(() => {});
        }
      }).catch(() => {});
    }
    screen = 'juego';
  }
</script>

{#if screen === 'inicio'}
  {#if hasSavedGame}
    <div class="flex flex-col items-center justify-center min-h-[100dvh] gap-5 p-4">
      <h1 class="text-4xl font-black tracking-tight uppercase">
        <span class="text-orange-500">BR</span><span class="text-blue-500">IX</span>
      </h1>
      <p class="text-sm text-gray-400">Hay una partida en curso</p>
      <button
        onclick={enterFullscreenAndPlay}
        class="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm uppercase tracking-wider rounded-sm transition-all cursor-pointer"
      >
        Continuar partida
      </button>
      <button
        onclick={newGame}
        class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs uppercase tracking-wider rounded-sm transition-all cursor-pointer border border-gray-600"
      >
        Nueva partida
      </button>
    </div>
  {:else}
    <PantallaInicio onStart={selectMode} />
  {/if}
{:else if screen === 'setup'}
  <PantallaSetup mode={gameMode} onStart={startGame} onBack={backToModes} />
{:else if screen === 'juego'}
  {#if isPortrait && !document.fullscreenElement}
    <div class="flex items-center justify-center min-h-[100dvh] bg-gray-900">
      <div class="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  {:else}
    <Juego mode={gameMode} {players} onRestart={restart} />
  {/if}
{/if}
