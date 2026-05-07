<script>
  import { ROWS, COLS } from '../lib/gameLogic.js';

  let { board, validPositions, lastPlaced, selectedConfig, winLine, mode, onCellClick } = $props();

  function isValid(row, col) {
    return validPositions.some(p => p.row === row && p.col === col);
  }

  function isLastPlaced(row, col) {
    if (!lastPlaced) return false;
    return lastPlaced.some(([r, c]) => r === row && c === col);
  }

  function isWinCell(row, col) {
    if (!winLine || winLine.length === 0) return false;
    return winLine.some(([r, c]) => r === row && c === col);
  }

  function getWinIndex(row, col) {
    if (!winLine) return -1;
    return winLine.findIndex(([r, c]) => r === row && c === col);
  }

  function getCellBorder(cell, row, col) {
    if (isWinCell(row, col)) return 'none';
    if (isLastPlaced(row, col) && !winLine) return '3px solid #fbbf24';
    if (!cell && isValid(row, col)) return '2px dashed #6b7280';
    if (cell) return cell.color === 'orange' ? '2px solid #f97316' : '2px solid #0ea5e9';
    return '2px solid #374151';
  }

  function getCellBg(cell, row, col) {
    if (!cell) return '#1f2937';
    return cell.color === 'orange' ? '#ea580c' : '#0284c7';
  }
</script>

<div
  class="grid gap-[2px] p-1 rounded-sm"
  style="grid-template-columns: repeat({COLS}, 1fr); grid-template-rows: repeat({ROWS}, 1fr); background: #4b5563; height: 90dvh; aspect-ratio: 8/6;"
>
  {#each Array(ROWS) as _, row}
    {#each Array(COLS) as _, col}
      {@const cell = board[row][col]}
      {@const valid = isValid(row, col)}
      {@const won = isWinCell(row, col)}
      {@const winIdx = getWinIndex(row, col)}
      <button
        class="rounded-sm flex items-center justify-center font-black text-xl sm:text-3xl md:text-4xl relative {valid ? 'cursor-pointer hover:scale-105' : 'cursor-default'} {won ? 'win-cell z-10' : ''} {isLastPlaced(row, col) && !winLine ? 'scale-105' : ''}"
        style="background: {getCellBg(cell, row, col)}; border: {getCellBorder(cell, row, col)}; {won ? `--delay: ${winIdx * 400}ms; --orig-bg: ${getCellBg(cell, row, col)};` : ''}"
        onclick={() => valid && onCellClick(row, col)}
        disabled={!valid}
      >
        {#if cell}
          {#if mode !== 'colors'}
            <span class="text-white" style="font-family: 'Fredoka', sans-serif;">{cell.symbol}</span>
          {/if}
        {:else if valid}
          <div class="w-2 h-2 rounded-full bg-gray-500"></div>
        {/if}
      </button>
    {/each}
  {/each}
</div>

<style>
  .win-cell {
    overflow: hidden;
    animation: darken 0.8s ease-out forwards, pop-in 0.4s ease-out forwards;
    animation-delay: var(--delay), calc(var(--delay) + 0.6s);
    animation-fill-mode: both;
  }

  .win-cell::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    background: conic-gradient(#00ffff, #ff00ff, #00ffff);
    animation: spin 1.5s linear infinite, fade-in 0.8s ease-out forwards;
    animation-delay: 0ms, var(--delay);
    animation-fill-mode: both;
    opacity: 0;
  }

  .win-cell::after {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 2px;
    background: #1a1a2e;
    z-index: 1;
    animation: fade-in 0.8s ease-out forwards;
    animation-delay: var(--delay);
    animation-fill-mode: both;
    opacity: 0;
  }

  .win-cell span {
    position: relative;
    z-index: 2;
  }

  @keyframes darken {
    0% { background-color: var(--orig-bg); }
    100% { background-color: #1a1a2e; }
  }

  @keyframes pop-in {
    0% { transform: scale(1); }
    100% { transform: scale(1.12); }
  }

  @keyframes fade-in {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>
