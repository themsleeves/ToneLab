# ToneLab Profiles

Version 1.0.0 — application mobile-first pour documenter les essais de profils sonores (amplis + pédales), entièrement pilotée par catalogue.

## Fonctionnalités

### Tests
- interface responsive smartphone/tablette/ordinateur, sections repliables (Identification, Configuration, Ampli, Pédales d'effets, Notes) ;
- entête mobile compacte : bouton retour "←" + identification du test (artiste, morceau, statut) à côté, séparée visuellement ;
- listes déroulantes éditables pour artistes, guitares, accordages, micros, statuts et cabinets (« Gérer les listes ») ;
- date du test mise à jour automatiquement dès qu'un réglage change (ampli, pédales, notes…) — inchangée si on modifie seulement l'artiste/le morceau/le statut ;
- duplication, renommage et suppression d'un test ;
- recherche et filtrage par statut dans la liste des tests.

### Catalogue de pédales
- pédales entièrement pilotées par un catalogue (aucune création ad-hoc sur un test) : Ibanez Tube Screamer, MXR M109S Six Band EQ, Mooer Graphic G, Fender The Pelt Fuzz par défaut ;
- gestion du catalogue depuis « Paramètres » : création/suppression de modèles, réglages knob/slider/switch configurables (nom, bornes min/max/pas y compris valeurs négatives, positions d'un interrupteur) ;
- ajout d'une pédale à un test depuis le catalogue, glisser-déposer pour réordonner (souris et tactile) ;
- enregistrement d'une pédale de test comme nouveau modèle de catalogue ("☆ Modèle") ;
- resynchronisation automatique de toutes les pédales liées dès qu'un modèle du catalogue est modifié ;
- réparation d'un lien catalogue cassé ou manquant via un bouton dédié ("🔗").

### Catalogue d'amplis
- amplis eux aussi pilotés par un catalogue (Brunetti XL R-EVO II fourni par défaut), un seul ampli actif par test ;
- gestion du catalogue d'amplis depuis « Paramètres » : modèles avec leurs propres canaux (ex. Clean/Boost/XLead) et réglages, y compris un réglage restreint à un canal donné (ex. "Bright" uniquement en Clean) ;
- remplacement de l'ampli d'un test depuis le catalogue (icône "⇄", liste en superposition) ;
- resynchronisation automatique de tous les tests liés dès qu'un modèle d'ampli est modifié.

### Réglages
- knobs/sliders alignés (libellé + curseur sur la même ligne, largeur calculée sur le libellé le plus long) ;
- bouton "⏮" pour remettre à zéro tous les réglages d'une section (ampli ou pédale) en un clic.

### Export / Import
- export Markdown d'un profil, export JSON de l'ensemble des tests + listes + catalogues (pédales et amplis) ;
- import JSON avec migration automatique des anciens formats de données ;
- génération du code source `.ts` des catalogues et listes par défaut, pour mettre à jour la base de référence du dépôt.

### Stockage
- sauvegarde locale dans le navigateur (`localStorage`), aucune donnée envoyée à un serveur.

## Installation
```bash
npm install
npm run dev
```

## Production
```bash
npm run build
```

