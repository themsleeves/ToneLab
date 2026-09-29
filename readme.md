# ToneLab

> *Comprendre avant de regler.*

ToneLab est un projet personnel de recherche sonore consacre a la comprehension, a l'experimentation et a la reproduction des sons produits par un rig de guitare reel.

Il ne cherche pas a constituer une collection de reglages "magiques". Son objectif est de comprendre **pourquoi une configuration fonctionne**, comment les differents elements du rig interagissent et comment reproduire volontairement un resultat sonore.

Le projet repose sur deux composantes complementaires :

- une **documentation Markdown**, qui rassemble les connaissances, analyses, methodes et configurations retenues ;
- une **application web experimentale**, qui permet de documenter des tests realises avec des reglages precis et d'exporter les resultats de ces experimentations.

Les resultats interessants et reproductibles peuvent ensuite contribuer a la construction des **profils ToneLab**.

---

## Documentation

La documentation structuree du projet est accessible depuis l'index principal :

➡️ [**Acceder a l'index de la documentation ToneLab**](index.md)

Elle est actuellement organisee autour des chapitres suivants :

1. **Architecture du Brunetti**
2. **Pourquoi le Brunetti...**
3. **Construction des profils sonores**
4. **Les pedales et leur interaction avec le Brunetti**
5. **Experimentations**
6. **References musicales**

Cette organisation doit permettre de separer les connaissances generales, l'analyse du materiel, les interactions entre les differents elements du rig et les resultats issus des experimentations.

---

## Pourquoi ToneLab existe-t-il ?

Il existe de nombreuses videos presentant des reglages d'amplificateurs et de pedalboards, des forums remplis de retours d'experience et des documentations constructeurs decrivant le fonctionnement des appareils.

Ces ressources sont utiles, mais elles repondent moins souvent a une question essentielle :

> **Pourquoi ce reglage ou cette combinaison produit-il ce resultat avec ce rig ?**

ToneLab est ne de cette interrogation.

Le projet cherche a aller au-dela de la simple memorisation de positions de potentiometres. Il s'agit de comprendre suffisamment le comportement du rig pour pouvoir construire un son volontairement, l'experimenter, le comparer et le reproduire.

---

## Les trois piliers de ToneLab

ToneLab peut etre represente comme trois activites complementaires :

```text
                    TONELAB
                       |
          +------------+------------+
          |            |            |
          v            v            v
     COMPRENDRE   EXPERIMENTER   CAPITALISER
          |            |            |
          v            v            v
   Documentation   Application     Profils
     Markdown          web         ToneLab
```

### Comprendre

La documentation cherche a expliquer le comportement du materiel et les interactions entre les differents elements du rig.

Il ne suffit pas, par exemple, de constater qu'une combinaison semble plus precise ou plus massive. Il faut essayer d'identifier :

- ce qui a change dans la chaine ;
- quel element semble responsable de cette evolution ;
- dans quelles conditions le phenomene apparait ;
- si le resultat peut etre reproduit.

### Experimenter

L'application web constitue l'outil de travail experimental de ToneLab.

Elle permet de documenter des tests correspondant a des configurations et des reglages precis, puis d'exporter ces tests afin de conserver une trace exploitable des experimentations.

La logique generale est la suivante :

```text
Configuration du rig
        |
        v
Reglages du test
        |
        v
Experimentation
        |
        v
Observation
        |
        v
Documentation du test
        |
        v
Export
```

L'application n'a donc pas vocation a remplacer la documentation. Elle permet de conserver le detail des essais dont les conclusions pourront ensuite alimenter la connaissance ToneLab.

### Capitaliser

Tous les essais ne meritent pas de devenir des profils sonores.

Un resultat devient particulierement interessant lorsqu'il peut etre :

- explique ;
- reproduit ;
- retrouve rapidement ;
- utilise dans un contexte musical reel.

La progression recherchee est donc :

```text
Hypothese
   |
   v
Experimentation
   |
   v
Observation
   |
   v
Resultat reproductible
   |
   v
Configuration retenue
   |
   v
Profil ToneLab
```

---

## Le rig de reference

ToneLab travaille sur un ensemble materiel clairement identifie afin d'eviter de presenter comme universelles des conclusions qui dependent d'une configuration particuliere.

### Amplificateur

- Brunetti XL R-EVO II 60 W

Les trois canaux Clean, Crunch et XLead sont etudies comme des personnalites distinctes et comme des plateformes susceptibles de reagir differemment au pedalboard.

### Guitares principales

- Gibson Les Paul Classic DC avec micros Classic '57 / '57+ ;
- Gretsch John Gourley Broadkaster avec micros Full'Tron USA.

L'objectif n'est pas de rendre les deux guitares identiques, mais de comprendre et d'exploiter leurs identites respectives.

### Pedalboard

Le pedalboard comprend notamment :

- George Dennis Wah / Volume ;
- Amuzik Mini Tuner ;
- Mooer Graphic G ;
- Fender The Pelt ;
- Tube Screamer modifiee par Analogman avec la Silver Mod ;
- MXR 6 Band EQ ;
- EHX Nano Pulsar ;
- Amuzik Delay ;
- Amuzik Reverb ;
- Mooer A7 Ambiance ;
- TC Electronic Hall of Fame Mini.

Le projet etudie non seulement chaque element, mais surtout **son emplacement et son interaction avec les autres elements du rig**.

### Baffles

Les baffles font partie integrante du contexte d'une experimentation. Le baffle utilise doit donc etre identifie lorsqu'il influence la validite ou la reproductibilite d'un resultat.

---

## La methode ToneLab

La methode repose sur une distinction essentielle entre ce qui est documente, ce qui est observe et ce qui est interprete.

### Faits verifies

Une caracteristique technique doit etre verifiee a partir d'une source suffisamment fiable avant d'etre utilisee comme fait.

La priorite est donnee notamment :

1. aux manuels et documentations constructeur ;
2. aux informations techniques publiees par les fabricants ;
3. aux sources specialisees suffisamment fiables lorsque la documentation officielle ne suffit pas.

Il faut en particulier eviter d'inventer ou de deduire sans verification :

- une frequence d'EQ ;
- une fonction de commande ;
- une consommation electrique ;
- une caracteristique propre a une version differente du materiel utilise.

### Retours d'experience

Les forums, discussions et temoignages d'utilisateurs peuvent etre precieux pour identifier des comportements observes dans des conditions reelles.

Ils restent cependant des retours d'experience et ne doivent pas etre transformes automatiquement en specifications techniques.

### Observations ToneLab

Une observation correspond a ce qui est constate pendant un essai.

Par exemple :

> La Pelt semble gagner en presence lorsque la Tube Screamer est activee.

Cette observation ne constitue pas encore une explication technique.

### Hypotheses

L'hypothese cherche a expliquer une observation.

Elle doit rester identifiable comme telle tant qu'elle n'est pas suffisamment etayee ou confirmee experimentalement.

### Validation experimentale

La validation consiste a chercher si un resultat peut etre reproduit dans des conditions identifiees.

Une experience doit autant que possible conserver le contexte :

- guitare ;
- micro selectionne ;
- accordage ;
- pedales actives ;
- reglages ;
- ordre de la chaine ;
- canal et reglages du Brunetti ;
- baffle ;
- niveau de comparaison lorsque celui-ci est significatif.

---

## Une variable a la fois

Pour comprendre l'influence d'un parametre, ToneLab cherche autant que possible a limiter le nombre de variables modifiees simultanement.

```text
Configuration de reference
          |
          v
Modifier un parametre
          |
          v
Ecouter / observer
          |
          v
Comparer
          |
          v
Conserver ou revenir
```

Cette methode ne pretende pas reproduire un protocole de laboratoire scientifique complet. Elle vise surtout a reduire les interpretations trompeuses et a rendre les essais plus utiles.

---

## Documentation et application : deux roles differents

La documentation et l'application web sont complementaires.

```text
APPLICATION WEB
     |
     +--> tests detailles
     +--> reglages
     +--> configurations
     +--> observations
     +--> exports
     |
     v
RESULTATS INTERESSANTS
     |
     v
DOCUMENTATION MARKDOWN
     |
     +--> connaissances acquises
     +--> principes compris
     +--> methodes
     +--> configurations retenues
     |
     v
PROFILS TONELAB
     |
     +--> sons reproductibles
```

La documentation Markdown ne doit donc pas devenir un journal contenant chaque tentative effectuee.

Inversement, l'application experimentale n'a pas vocation a remplacer les explications et les connaissances consolidees dans la documentation.

---

## Ce que ToneLab n'est pas

ToneLab n'est pas :

- une collection de presets trouves sur Internet ;
- une liste de positions de potentiometres sans explication ;
- une tentative de definir le "meilleur" son ;
- une succession d'avis presentes comme des faits ;
- une recherche visant a faire sonner toutes les guitares de la meme maniere ;
- une accumulation de corrections appliquees sans objectif identifie.

Une configuration interessante doit pouvoir etre replacee dans son contexte.

Une conclusion doit pouvoir etre expliquee.

Une hypothese doit pouvoir etre testee.

Un profil doit pouvoir etre reproduit.

---

## Philosophie du projet

ToneLab repose sur une idee simple :

> **Comprendre avant de regler.**

Comprendre le comportement d'un ampli, d'une guitare ou d'une pedale permet d'aller plus loin que l'apprentissage de quelques reglages fixes.

Mais le projet ajoute une seconde idee tout aussi importante :

> **Experimenter avant de conclure.**

Un reglage trouve sur Internet, une impression d'ecoute ou une explication theorique peuvent constituer de bons points de depart. Ils ne remplacent pas l'experience realisee avec le rig reel.

ToneLab cherche ainsi a construire progressivement un lien entre :

```text
Connaissance
     +
Experimentation
     +
Ecoute
     +
Contexte musical
     |
     v
Son compris et reproductible
```

L'objectif final n'est pas de supprimer l'intuition ou la creativite du guitariste.

Il est au contraire de mieux comprendre les outils disponibles afin de pouvoir les utiliser volontairement lorsque la musique le demande.

---

## Acceder a ToneLab

➡️ [**Ouvrir l'index principal de la documentation**](index.md)
