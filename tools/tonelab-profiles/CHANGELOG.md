# Changelog

Historique des évolutions notables de ToneLab Profiles. Versionnement simple par session de travail (pas de règle stricte MAJOR/MINOR/PATCH) — un numéro de version marque une étape de travail cohérente, pas nécessairement une compatibilité API au sens strict.

## [1.0.0] — Première version stable
Catalogues pilotés (pédales + amplis), gestion complète en local, considérée stable et fonctionnelle par l'utilisateur.

### Catalogue de pédales
- Modèles configurables (knob/slider/switch), bornes min/max/pas (y compris négatives), positions d'un switch, réordonnancement par glisser-déposer.
- Ajout à un test depuis le catalogue, enregistrement d'une pédale de test comme nouveau modèle.
- Resynchronisation automatique des pédales liées lors d'une modification de modèle ; réparation d'un lien cassé ("🔗").

### Catalogue d'amplis
- Modèles configurables avec leurs propres canaux (ex. Clean/Boost/XLead) et réglages.
- Un réglage peut être restreint à un ou plusieurs canaux (ex. "Bright" uniquement en Clean).
- Remplacement de l'ampli d'un test depuis le catalogue ("⇄"), resynchronisation automatique lors d'une modification de modèle.

### Ergonomie
- Sections de test repliables (Identification, Configuration, Ampli, Pédales d'effets, Notes).
- Sous-écran de configuration unifié (min/max/pas ou positions, + canaux) en popup centrée, compacte.
- Entête mobile avec identification du test (artiste/morceau/statut) à côté d'un bouton retour raccourci.
- Date du test mise à jour automatiquement à chaque changement de réglage ; boutons "remettre à 0" par section.

### Export / Import
- Export Markdown d'un profil, export JSON (tests + listes + catalogues), import JSON avec migration automatique des anciens formats.
- Génération du code source des catalogues et listes par défaut (.ts).

## [0.2.0] et antérieur
Version initiale non versionnée en détail (voir historique Git) — interface responsive de base, listes déroulantes fixes, pédales figées (Tube Screamer, MXR 6 Band EQ, Mooer Graphic G), sauvegarde locale, export Markdown/JSON.
