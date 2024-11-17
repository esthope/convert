baseUrl : Définit la racine pour les chemins relatifs des modules. Cela permet d’utiliser des alias pour simplifier les imports, comme import Template from 'component/Template'; au lieu de import Template from '../component/Template';.

target : Définit la version ECMAScript cible pour la compilation. Ici, es5 garantit une compatibilité maximale avec les anciens navigateurs. Si tu cibles des environnements modernes, tu pourrais utiliser esnext.

lib : Liste les bibliothèques qui sont disponibles lors de la compilation. Par exemple, dom permet d'utiliser le DOM (Document Object Model) dans le code TypeScript. esnext permet d'utiliser les dernières fonctionnalités ECMAScript.

outDir : Le dossier de sortie où les fichiers JavaScript générés seront placés. Cela n’est utile que si tu n’as pas noEmit activé.

allowJs : Permet à TypeScript de compiler des fichiers .js en plus des fichiers .ts et .tsx. Cela peut être utile si tu migres progressivement un projet JavaScript vers TypeScript.

skipLibCheck : Ignore les erreurs de type dans les fichiers de déclaration des bibliothèques externes. Cela accélère la compilation, mais peut entraîner des erreurs non détectées dans les types de bibliothèques tierces.

esModuleInterop : Permet d'importer des modules CommonJS avec la syntaxe import ... from ... de manière plus fluide, même si ces modules n'ont pas de véritable export par défaut.

allowSyntheticDefaultImports : Permet d'utiliser des imports par défaut dans les modules CommonJS, même si ces modules n'ont pas de default export.

strict : Active un ensemble de vérifications strictes de types, ce qui rend ton code plus sûr et réduit les erreurs potentielles.

forceConsistentCasingInFileNames : S'assure que les noms de fichiers sont respectés avec la même casse. Cela évite des problèmes lorsqu'un projet est déplacé entre des systèmes d'exploitation sensibles à la casse (comme Linux) et ceux qui ne le sont pas (comme Windows).

module : Définit le format de module à générer. esnext permet d’utiliser les modules ECMAScript modernes, ce qui est généralement compatible avec les navigateurs modernes ou les outils comme Webpack.

moduleResolution : Définit comment TypeScript résout les modules. node est la méthode la plus courante pour les projets basés sur Node.js et permet à TypeScript de se comporter comme Node.js lors de la recherche de modules.

resolveJsonModule : Permet d'importer des fichiers JSON comme s'ils étaient des modules JavaScript.

isolatedModules : Permet de s’assurer que chaque fichier est traité indépendamment, ce qui est utile si tu utilises des outils comme Babel ou Webpack avec TypeScript.

noEmit : Si true, TypeScript ne génère pas de fichiers JavaScript. Cela peut être utile si tu veux seulement effectuer une vérification des types sans compiler le code.

jsx : Définit comment TypeScript doit traiter les fichiers JSX. "react-jsx" est l'option la plus récente (React 17+), et elle permet de compiler JSX sans nécessiter l'importation explicite de React dans chaque fichier JSX.

paths : Permet de créer des alias pour les chemins d'importation, ce qui rend les imports plus propres et plus faciles à maintenir, surtout dans de grands projets.

```json
{
  "compilerOptions": {
    // Chemin de base pour résoudre les modules relatifs. "src" signifie que tous les chemins relatifs sont résolus depuis le dossier "src".
    "baseUrl": "src",

    // Version ECMAScript cible pour la compilation. "es5" garantit la compatibilité avec les anciens navigateurs.
    "target": "es5", 

    // Déclare les bibliothèques JavaScript et DOM disponibles. "esnext" permet de cibler la dernière version ECMAScript.
    "lib": [
      "dom", // Support du DOM (Document Object Model)
      "dom.iterable", // Support des objets itérables du DOM
      "esnext" // Dernières fonctionnalités ECMAScript disponibles
    ],

    // Le répertoire où les fichiers compilés seront placés (si l'option "noEmit" est désactivée).
    "outDir": "dist",

    // Permet à TypeScript de traiter les fichiers JavaScript. Si tu veux que TypeScript gère aussi des fichiers .js.
    "allowJs": true,

    // Ignore les erreurs dans les fichiers de bibliothèques externes pour accélérer la compilation.
    "skipLibCheck": true,

    // Permet d'importer des modules CommonJS ou ESModules avec une syntaxe compatible avec Node.js.
    "esModuleInterop": true,

    // Permet l'importation par défaut des modules CommonJS dans TypeScript sans avoir à utiliser `import * as`.
    "allowSyntheticDefaultImports": true,

    // Active le mode strict, avec une série de vérifications strictes sur les types.
    "strict": true,

    // Garantit que le nom des fichiers est respecté (par exemple, `myComponent.ts` et `mycomponent.ts` seraient considérés comme différents).
    "forceConsistentCasingInFileNames": true,

    // Empêche les erreurs de chute (fallthrough) dans les switch statements.
    "noFallthroughCasesInSwitch": true,

    // Spécifie le module que TypeScript doit générer. "esnext" signifie des modules de type ES (import/export).
    "module": "esnext", // Peut aussi être "commonjs" pour Node.js

    // Contrôle la manière dont les modules sont résolus. "node" indique une résolution de module de style Node.js.
    "moduleResolution": "node",

    // Permet l'importation de fichiers JSON comme modules TypeScript.
    "resolveJsonModule": true,

    // Garantit que les fichiers sont traités individuellement, même si le projet est grand.
    "isolatedModules": true,

    // Si activé à "true", TypeScript ne générera pas de fichiers de sortie. Utile si tu veux juste vérifier le code sans générer de fichiers.
    "noEmit": true,

    // Cette option permet d'activer le support du JSX dans les fichiers .tsx. Avec "react-jsx", il utilise le nouveau transformateur JSX introduit dans React 17.
    "jsx": "react-jsx", // Peut être "react" pour des versions antérieures de React (avant React 17)

    // Configuration des alias de module pour faciliter l'importation de fichiers.
    "paths": {
      "component/*": ["./component/*"],  // Alias pour le dossier "src/component"
      "constant/*": ["./constant/*"],    // Alias pour le dossier "src/constant"
      "service/*": ["./network/service/*"], // Alias pour le dossier "src/network/service"
      "screen/*": ["./screen/*"],        // Alias pour le dossier "src/screen"
      "util/*": ["./util/*"]             // Alias pour le dossier "src/util"
    }
  },

  // Inclut tous les fichiers TypeScript et JSX dans le dossier "src" et ses sous-dossiers.
  "include": [
    "src/**/*"
  ]
}
```