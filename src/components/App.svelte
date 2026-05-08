<script>
  import { loadGameState, clearGameState } from '../lib/storage.js';
  import PantallaInicio from './PantallaInicio.svelte';
  import PantallaSetup from './PantallaSetup.svelte';
  import Juego from './Juego.svelte';

  let screen = $state('inicio');
  let gameMode = $state(null);
  let players = $state(['Jugador 1', 'Jugador 2']);
  let isPortrait = $state(false);

  // Retomar partida si hay estado guardado
  const saved = loadGameState();
  if (saved) {
    gameMode = saved.mode;
    players = saved.players;
    screen = 'juego';
  }

  // Detectar orientación
  if (typeof window !== 'undefined') {
    const mq = window.matchMedia('(orientation: portrait) and (max-width: 1024px)');
    isPortrait = mq.matches;
    mq.addEventListener('change', (e) => { isPortrait = e.matches; });
  }

  function selectMode(mode) {
    gameMode = mode;
    screen = 'setup';
  }

  function startGame(config) {
    players = config.players;
    screen = 'juego';
  }

  function restart() {
    clearGameState();
    screen = 'inicio';
    gameMode = null;
    players = ['Jugador 1', 'Jugador 2'];
    // Salir de fullscreen y volver a portrait
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
</script>

{#if screen === 'inicio'}
  <PantallaInicio onStart={selectMode} />
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
