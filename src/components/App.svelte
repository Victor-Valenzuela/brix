<script>
  import PantallaInicio from './PantallaInicio.svelte';
  import PantallaSetup from './PantallaSetup.svelte';
  import Juego from './Juego.svelte';

  let screen = $state('inicio');
  let gameMode = $state(null);
  let players = $state(['Jugador 1', 'Jugador 2']);

  function selectMode(mode) {
    gameMode = mode;
    screen = 'setup';
  }

  function startGame(config) {
    players = config.players;
    screen = 'juego';
  }

  function restart() {
    screen = 'inicio';
    gameMode = null;
    players = ['Jugador 1', 'Jugador 2'];
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
  <Juego mode={gameMode} {players} onRestart={restart} />
{/if}
