# Test technique - Mai 2021

```
Créer une interface graphique s'inspirant du projet Weather-CLI disponible dans votre portfolio. 

Contraintes techniques imposées pour le test:

- Utiliser Typescript.
- Lorsqu'une ville est validée l'url est également transformée, de telle sorte qu'il soit possible de partager la page et son contenu sans avoir à faire une nouvelle recherche.
- L'application n'a pas besoin de faire de nouveau appel à l'API lorsqu'on recherche une ville précédemment recherchée. On évitera au maximum de solliciter l'API.
- Héberger le projet sur Netlify.
```

# Mes choix techniques & explications

- J'ai décidé de stocker les recherches effectuées par un utilisateur en cookie. L'application stocke le résultat et, pour chaque nouvelle recherche, vient parcourir les cookies en quête d'un résultat similaire à la nouvelle recherche. __L'api Open Weather actualise ses données toutes les 10min__, j'ai donc fixé un 'taux de rafraichissement' à 10min. _(Les cookies expirent à date de la recherche + 10min)_.

- J'ai également réalisé une version alternative de l'application stockant les résultats en db _(dans ce cas une db serverless: Atlas/MongoDB)_. Celle-ci permet également de limiter les calls api mais avec une stratégie différente: ce n'est plus le client qui stocke ses propres résultats mais une db qui stocke les résultats de tous les utilisateurs. 

- Etant obligé d'utiliser Netlify mais également de devoir 'cacher' la clé API permettant à l'application de fonctionner, j'ai d'abord opté pour l'utilisation de React et des Netlify functions. J'ai finalement opté pour Next.js, pour me conformer aux bonnes pratiques de la JAMstack 'moderne' (SEO, sécurité, performances, ...).

# Informations

## Technologies utilisées:
- Next.js (https://nextjs.org/)
- Typescript (https://www.typescriptlang.org/)

## API:
- Open Weather (https://openweathermap.org/api)

