# 🧱 Brix

Juego de estrategia para 2 jugadores. Construye una pared con ladrillos de doble cara y alinea 4 en línea para ganar.

## 🎮 Modos de juego

- **Conectar símbolos** — Un jugador con X, otro con O. Alinea 4 de tu símbolo.
- **Conectar colores** — Un jugador con naranja, otro con azul. Alinea 4 de tu color.
- **Símbolos vs Colores** — Un jugador busca símbolos, el otro colores.

## 🧩 Mecánica

- Cada ladrillo ocupa 2 celdas y tiene un símbolo + color en cada mitad
- Se puede colocar horizontal o vertical
- Debe tener soporte debajo (no puede flotar)
- Debe tocar al menos un ladrillo ya jugado (excepto la primera jugada)
- Gana quien alinee 4 en línea (horizontal, vertical o diagonal)
- Si ambos completan 4 en la misma jugada, gana quien puso la pieza

## 🚀 Stack

- **Astro** + **Svelte 5** + **Tailwind CSS v4**
- **PWA** instalable (landscape forzado en móviles)
- **Web Audio API** para efectos de sonido
- Sin backend, 100% local

## 🧞 Comandos

| Comando                 | Acción                                          |
| :---------------------- | :---------------------------------------------- |
| `npm run dev`           | Servidor local en `localhost:4321`              |
| `npm run dev -- --host` | Servidor accesible desde la red local (celular) |
| `npm run build`         | Build de producción en `./dist/`                |
| `npm run preview`       | Preview del build                               |

## 📱 Deploy a Firebase Hosting

1. Instala Firebase CLI:

```bash
npm install -g firebase-tools
```

2. Inicia sesión:

```bash
firebase login
```

3. Inicializa el proyecto (solo la primera vez):

```bash
firebase init hosting
```

- Directorio público: `dist`
- Single-page app: No
- Overwrite index.html: No

4. Build y deploy:

```bash
npm run build
firebase deploy --only hosting
```

## 📱 PWA

El juego es instalable como app en celulares y PC. Al instalarlo desde un navegador con HTTPS:

- Se abre siempre en horizontal (landscape forzado)
- Funciona offline
- Icono en la pantalla de inicio

### Fullscreen en Android

Para jugar sin la barra de estado (hora, wifi, batería), instala la app desde **Brave**. Chrome no soporta la Fullscreen API dentro de PWAs instaladas — es una limitación del navegador, no del código. Brave sí la implementa, por lo que al primer tap la app entra en pantalla completa.

| Navegador    | Instalación              | Fullscreen | Badge en icono      |
| ------------ | ------------------------ | ---------- | ------------------- |
| Chrome       | ✅                       | ❌         | No                  |
| Brave        | ✅                       | ✅         | Sí (badge de Brave) |
| Opera        | ❌ (solo acceso directo) | —          | —                   |
| Safari (iOS) | ✅                       | ❌         | No                  |

## 📁 Estructura

```
src/
├── components/
│   ├── App.svelte              # Router principal
│   ├── PantallaInicio.svelte   # Selector de modo
│   ├── PantallaSetup.svelte    # Nombres de jugadores
│   ├── Juego.svelte            # Orquestador del juego
│   ├── Tablero.svelte          # Grilla 8×6
│   └── SelectorLadrillo.svelte # Piezas disponibles
├── lib/
│   ├── gameLogic.js            # Lógica del juego
│   └── sfx.js                  # Efectos de sonido
├── styles/
│   └── global.css              # Estilos + fuentes
└── pages/
    └── index.astro             # Página principal
```

## 📄 Licencia

MIT
