# Brix — Reglas Completas

## Identidad visual

- **Estilo:** Industrial/construcción
- **Paleta:** Naranja vibrante + azul profundo sobre fondo gris cemento
- **Tipografía:** Bold, blocky, stencil industrial
- **Tono:** "Construye o destruye"

## Resumen

Juego de 2 jugadores. Construyes una pared colocando ladrillos. Cada ladrillo tiene X (naranja) en un lado y O (azul) en el otro. Gana el primero en alinear 4 de su símbolo o color.

## Setup

- Tablero: grilla de 4 columnas × 5 filas (20 espacios)
- Jugador 1: X naranja
- Jugador 2: O azul
- 24 ladrillos de doble cara (X naranja / O azul)

## Turno

1. El jugador activo elige una columna donde colocar un ladrillo
2. El ladrillo cae a la posición más baja disponible en esa columna (gravedad)
3. El jugador elige qué cara mostrar: su símbolo (X u O) queda visible arriba
4. PERO: la cara opuesta (el símbolo del rival) también queda registrada — si el rival gana con esa cara, cuenta

## Condición de victoria

Alinear 4 en línea (horizontal, vertical o diagonal) de:

- Tu símbolo (X o O), O
- Tu color (naranja o azul)

## Empate

Si se llenan todas las posiciones sin que nadie alinee 4, es empate.

## Detalle clave

Cada ladrillo que colocas tiene AMBOS símbolos. Al poner tu X naranja, el O azul del rival también está ahí (cara oculta). Esto significa que cada jugada puede beneficiar a tu oponente. La tensión está en colocar estratégicamente sin regalarle la victoria al otro.

## Pantallas

1. **Inicio** — Título + botón jugar
2. **Juego** — Tablero 4×5, indicador de turno, ladrillos colocados
3. **Fin** — Ganador + línea ganadora resaltada + botón reiniciar

## Pendientes de revisión

## Pendientes de revisión

### ✅ Completado

- Selector de modo de juego (3 modos: símbolos, colores, avanzado)
- Modo colores sin símbolos visibles y con solo 4 piezas
- Efectos visuales de victoria (borde neón rotatorio cyan/magenta, progresivo, zoom-in)
- Victoria integrada en la misma pantalla (sin cambio de vista)
- Pantalla de setup con nombres de jugadores
- Fuentes: Luckiest Guy (título), Poppins (UI), Comic Sans (piezas)
- Logo BRIX con borde blanco grueso y sombra
- Layout landscape para celulares + mensaje "gira tu dispositivo" en portrait
- Selector de piezas separado (horizontales arriba, verticales abajo)
- Botón volver al inicio durante partida

### Pendiente

- **Favicon:** Reemplazar SVGs placeholder con diseño final en PNG
- **Sonidos:** Efectos al colocar pieza, al ganar, al seleccionar
