
# Objetivo:
Usando la API pública de Pokémon https://pokeapi.co/ , desarrolla una aplicación web en React que permita listar y explorar la información de los Pokémon.

Requerimientos funcionales:
Mostrar un listado paginado de Pokémon (/api/v2/pokemon-species).
Al hacer clic en un Pokémon, mostrar:
Información básica (nombre, color, hábitat, etc.).
Su cadena de evolución (/evolution-chain/).
Permitir navegar en la cadena de evolución (por ejemplo, ver el siguiente y el anterior en la evolución).
Incluir paginación en el listado principal.

Requerimientos técnicos:
Usar React con hooks o functional components.
Manejo de estado: libre elección (React Context, Redux, Zustand, etc.).
Manejo de errores y estados de carga (loading, error).
Buen diseño de componentes y reutilización.
Estilos: libre elección (CSS, styled-components, Chakra UI, Ant, Material).
Opcional: pruebas unitarias con Jest o Testing Library.

Entrega:
Código en un repositorio de GitHub/GitLab.
Incluir instrucciones de instalación y ejecución en un README.md.
Los commits deben mostrar un flujo lógico de trabajo (no todo en un solo commit).

# Requerimientos
Tener instalado Node 20 o superior.

# Instalación
- Clonar el repositorio: 
```bash
git clone https://github.com/davidmc1996/poke-app.git
```
- Acceder a la carpeta del proyecto
```bash
cd poke-app
```

- Ejecutar el comando, para instalar las dependencias
```bash
npm install
```

- Ejecutar el comando, para ejecutar la aplicación
```bash
npm run dev
```

- Ejecutar el comando, para las pruebas unitarias
```bash
npm run test
```
