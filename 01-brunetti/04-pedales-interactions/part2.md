# Chapitre 04 - Le pedalboard et ses interactions avec le Brunetti

## Partie 2 - Les pedales de dynamique et de saturation

## Navigation

[Index du chapitre 4](index.md)  
[Partie 1 - Philosophie du pedalboard](part1.md)  
[Partie 3 - Les égaliseurs](part3.md)

---

## Sommaire

1. [Introduction](#1-introduction)
2. [Comprendre la dynamique et la saturation](#2-comprendre-la-dynamique-et-la-saturation)
3. [Le Fender The Pelt](#3-le-fender-the-pelt)
4. [La Tube Screamer Analogman Silver Mod](#4-la-tube-screamer-analogman-silver-mod)
5. [Comparaison des deux approches](#5-comparaison-des-deux-approches)
6. [Interaction avec le préamplificateur du Brunetti](#6-interaction-avec-le-préamplificateur-du-brunetti)
7. [Influence du niveau et de l'impédance](#7-influence-du-niveau-et-de-limpédance)
8. [Conséquences sur le spectre fréquentiel](#8-conséquences-sur-le-spectre-fréquentiel)
9. [Méthode d'analyse expérimentale](#9-méthode-danalyse-expérimentale)
10. [À retenir](#10-à-retenir)

---

## 1. Introduction

Les pédales de saturation constituent une catégorie particulière dans un pedalboard, car elles peuvent modifier simultanément plusieurs propriétés du signal.

Elles peuvent notamment agir sur :

- l'amplitude ;
- la dynamique ;
- le contenu harmonique ;
- l'équilibre fréquentiel ;
- la réponse aux transitoires ;
- le niveau envoyé à l'amplificateur.

Dans notre configuration, deux approches complémentaires sont représentées :

- le Fender The Pelt, pédale de fuzz destinée à produire une saturation importante et un caractère propre ;
- le Maxon Tube Screamer modifié par Analogman, qui peut servir à modifier le signal avant son entrée dans le Brunetti.

Ces deux pédales ne doivent pas être considérées uniquement comme deux sources de saturation. Leur intérêt réside aussi dans leurs comportements électroniques différents et dans leurs interactions avec le préamplificateur.

Cette partie étudie les principes techniques qui permettent de comprendre ces différences.

Les réglages destinés à construire les profils sonores restent documentés dans le chapitre 3. Ici, l'objectif est de comprendre les mécanismes qui expliquent les résultats observés.

---

## 2. Comprendre la dynamique et la saturation

### 2.1. Le signal électrique de la guitare

Une guitare électrique équipée de micros magnétiques produit un signal alternatif dont l'amplitude et la forme évoluent avec le mouvement des cordes.

Le signal n'est pas une sinusoïde parfaite.

Il contient déjà plusieurs composantes fréquentielles, dont les fondamentales et les harmoniques.

Son amplitude varie dans le temps, notamment en fonction :

- de la force d'attaque ;
- de la position du médiator ;
- de la corde jouée ;
- du micro sélectionné ;
- du type de micro ;
- de la fréquence des notes ;
- du jeu du musicien.

Une pédale de saturation reçoit donc un signal complexe, variable et dépendant de l'instrument.

### 2.2. La notion de gain

Le gain correspond à l'amplification du signal.

Dans un système linéaire idéal, multiplier l'amplitude d'un signal ne modifie pas sa forme.

Si le signal d'entrée est noté x(t), un amplificateur linéaire idéal peut être représenté par :

y(t) = G × x(t)

où :

- x(t) représente le signal d'entrée ;
- y(t) représente le signal de sortie ;
- G représente le gain.

Lorsque le gain augmente, l'amplitude de sortie augmente proportionnellement, tant que le circuit reste dans sa zone de fonctionnement linéaire.

En pratique, les circuits disposent d'une tension d'alimentation et d'une plage de fonctionnement limitée.

Lorsque le signal devient trop important, certaines parties du circuit ne peuvent plus suivre proportionnellement la variation d'entrée.

C'est notamment dans cette situation que la saturation apparaît.

### 2.3. L'écrêtage

L'écrêtage est une forme de non-linéarité.

Lorsque l'amplitude du signal dépasse les limites de fonctionnement d'un étage, les crêtes peuvent être comprimées ou limitées.

La forme du signal change alors.

Cette déformation génère de nouvelles composantes harmoniques.

Un écrêtage relativement symétrique peut favoriser certaines harmoniques impaires, tandis qu'une déformation asymétrique peut introduire davantage de composantes paires.

Il s'agit toutefois de tendances théoriques : le contenu harmonique réel dépend de la forme exacte de la non-linéarité, du circuit et du signal appliqué.

### 2.4. Compression et dynamique

La compression désigne une réduction de l'écart entre les variations d'amplitude du signal.

Une saturation peut produire une compression progressive : les fortes attaques augmentent moins en sortie que les faibles variations d'entrée.

Cela peut modifier la sensation de jeu.

On peut notamment observer :

- une différence moins importante entre attaque faible et attaque forte ;
- un sustain apparent plus important ;
- une sensation de densité accrue ;
- une modification de la réponse aux palm-mutes ;
- une évolution de la lisibilité des accords.

Il faut distinguer la compression produite par la pédale de celle qui peut apparaître ensuite dans le préamplificateur ou l'étage de puissance du Brunetti.

Dans une chaîne complète, plusieurs étages non linéaires peuvent contribuer au résultat final.

---

## 3. Le Fender The Pelt

### 3.1. Fonction générale

Le Fender The Pelt est une pédale de fuzz.

Son rôle est de produire une saturation importante et une texture harmonique caractéristique.

Contrairement à une pédale utilisée principalement comme boost, la fuzz intervient directement dans la transformation non linéaire du signal.

Elle peut donc devenir une source majeure du caractère sonore, indépendamment du canal choisi sur l'amplificateur.

Dans notre configuration, elle est placée avant la Tube Screamer.

Cette position permet notamment d'étudier la manière dont une saturation déjà produite est ensuite modifiée par une autre pédale.

### 3.2. Commandes disponibles

Le Fender The Pelt dispose des commandes suivantes :

| Commande | Fonction générale |
|---|---|
| Level | Niveau de sortie de la pédale |
| Tone | Équilibre tonal |
| Bloom | Contrôle associé à l'évolution du caractère de la fuzz |
| Fuzz | Quantité de saturation |
| Mid | Commutateur de comportement dans les médiums |
| Thick | Commutateur de densité ou de caractère tonal |

La fonction générale de ces commandes peut être décrite, mais leur comportement électrique exact ne doit pas être déduit uniquement de leur nom.

Pour documenter précisément le circuit, il faudrait disposer du schéma électronique ou d'une documentation technique suffisamment détaillée.

Il faut notamment éviter d'attribuer une fréquence de coupure précise ou une topologie de filtre à une commande sans confirmation.

### 3.3. Le contrôle Fuzz

Le contrôle Fuzz agit sur l'intensité de la saturation.

Sur une fuzz, cette commande peut modifier le gain de certains étages et donc la manière dont le signal atteint les zones non linéaires du circuit.

Selon l'architecture retenue, elle peut également influencer le comportement dynamique et la forme du signal écrêté.

Il faut distinguer :

- le gain électrique interne ;
- l'intensité de la saturation ;
- le niveau de sortie ;
- la perception de densité.

Ces grandeurs sont liées, mais elles ne sont pas interchangeables.

Une augmentation du Fuzz ne garantit pas une augmentation proportionnelle du niveau sonore.

### 3.4. Le contrôle Level

Le Level détermine le niveau de sortie de la pédale.

Il permet d'ajuster le signal transmis à l'étage suivant.

Dans notre chaîne, cet étage est la Tube Screamer.

Le niveau de sortie du The Pelt peut donc influencer le comportement de la Tube Screamer, en particulier si celle-ci est utilisée avec un gain interne significatif.

Il peut également modifier la manière dont la pédale suivante réagit aux attaques et aux variations du signal.

Le Level doit ainsi être étudié indépendamment du contrôle Fuzz.

Deux réglages peuvent produire une saturation comparable mais des niveaux de sortie différents.

### 3.5. Le contrôle Tone

Le contrôle Tone permet de modifier l'équilibre tonal de la fuzz.

Il agit sur la répartition des fréquences présentes dans le signal de sortie.

L'effet perçu dépend notamment :

- du contenu harmonique généré par la saturation ;
- du signal d'origine ;
- de la position du contrôle ;
- de la réponse fréquentielle de la pédale suivante ;
- de la réponse du préamplificateur ;
- du haut-parleur utilisé.

Il est important de distinguer la modification du spectre avant saturation de celle qui intervient après saturation.

Si un filtre agit avant un étage non linéaire, il peut modifier la manière dont les différentes fréquences participent à la saturation.

S'il agit après cet étage, il modifie surtout le spectre déjà déformé.

Sans schéma confirmé, il ne faut pas conclure à la position exacte de chaque filtre interne du The Pelt.

### 3.6. Le contrôle Bloom

Bloom fait partie des commandes caractéristiques du The Pelt.

Son rôle doit être étudié en relation avec le comportement général de la fuzz, notamment la sensation de densité et l'évolution du son.

Il serait toutefois prématuré d'affirmer qu'il contrôle un paramètre électronique précis sans documentation du circuit.

Pour notre étude, il sera donc considéré comme une variable expérimentale indépendante.

On cherchera à déterminer son influence sur :

- l'attaque ;
- le sustain ;
- la densité harmonique ;
- la stabilité du son ;
- la réponse aux notes graves ;
- la perception de compression.

Ces observations devront être comparées à niveau de sortie équivalent afin de limiter les biais d'écoute.

### 3.7. Les commutateurs Mid et Thick

Les commutateurs Mid et Thick permettent de modifier le caractère de la fuzz.

Ils constituent deux variables discrètes, à étudier séparément des potentiomètres.

Leur intérêt expérimental est important : un commutateur peut modifier le comportement du circuit de manière plus structurante qu'un petit déplacement de potentiomètre.

Pour comprendre leur effet, il faudra comparer chaque position en conservant les autres réglages identiques.

Les observations devront notamment porter sur :

- la répartition des médiums ;
- le poids des bas-médiums ;
- la présence des aigus ;
- la perception de l'attaque ;
- la lisibilité des accords ;
- la réponse dans le grave.

Il faudra éviter de conclure qu'un commutateur agit exclusivement sur une seule bande de fréquences sans mesure ou schéma à l'appui.

---

## 4. La Tube Screamer Analogman Silver Mod

### 4.1. Fonction générale

La Tube Screamer est une pédale d'overdrive conçue autour d'un circuit d'amplification et d'une transformation non linéaire du signal.

Dans notre configuration, elle est modifiée par Analogman avec la Silver Mod.

Elle est utilisée principalement pour modifier le signal transmis au Brunetti, mais elle peut également participer directement à la saturation.

Son comportement dépend du niveau d'entrée, du réglage du Drive, du Tone et du Level, ainsi que de la charge électrique présentée par l'étage suivant.

### 4.2. Architecture fonctionnelle générale

Une Tube Screamer classique peut être décrite à l'aide de plusieurs fonctions électroniques :

1. adaptation du signal d'entrée ;
2. amplification ;
3. création de saturation ;
4. filtrage fréquentiel ;
5. réglage du niveau de sortie.

Cette description est fonctionnelle.

Elle ne constitue pas un schéma exact de la version Analogman Silver Mod utilisée ici.

Les modifications précises de composants et leurs conséquences quantitatives devront être documentées à partir d'une source technique spécifique à cette version.

### 4.3. Le contrôle Drive

Le Drive agit sur la quantité de saturation produite par la pédale.

Son effet dépend de la structure du circuit et du niveau du signal d'entrée.

Lorsque le Drive est faible, la pédale peut être utilisée principalement pour modifier le signal envoyé au Brunetti.

Lorsque le Drive augmente, la contribution de la saturation interne devient plus importante.

La distinction entre boost et overdrive dépend donc du comportement réel de l'ensemble :

- niveau d'entrée ;
- gain interne ;
- seuil et forme de la non-linéarité ;
- filtrage ;
- niveau de sortie.

Le Drive ne représente pas directement une quantité de distorsion exprimée en pourcentage.

Il s'agit d'une commande qui modifie le fonctionnement du circuit.

### 4.4. Le contrôle Tone

Le Tone modifie l'équilibre spectral de la pédale.

Il faut le comprendre comme une commande de coloration fréquentielle, et non comme un simple réglage d'aigus indépendant du reste du circuit.

Le spectre final dépend de la réponse de la pédale et du contenu harmonique présent à son entrée.

Lorsque le signal est déjà saturé par le The Pelt, le Tone de la Tube Screamer intervient sur un signal qui contient déjà de nombreuses harmoniques.

La perception du réglage peut donc différer de celle obtenue avec une guitare branchée directement dans la Tube Screamer.

### 4.5. Le contrôle Level

Le Level règle le niveau de sortie.

Il détermine en grande partie l'amplitude du signal transmis à l'étage suivant.

Dans notre configuration, la Tube Screamer est placée avant l'entrée du Brunetti.

Le niveau transmis peut donc influencer le comportement du préamplificateur.

Il ne faut pas confondre le Level de la pédale avec le Gain du Brunetti.

Le premier modifie le niveau électrique en entrée de l'ampli ; le second modifie le fonctionnement du préamplificateur.

Le résultat dépend de leur combinaison.

### 4.6. Particularités de la Silver Mod

La Silver Mod doit être traitée comme une version spécifique de la Tube Screamer.

Il ne faut pas supposer que toutes les caractéristiques de la version standard s'appliquent intégralement à cette modification.

Pour établir une description technique fiable, il faudra identifier :

- les composants modifiés ;
- les valeurs d'origine et les valeurs de remplacement ;
- les étages concernés ;
- les changements de filtrage éventuels ;
- les changements de gain éventuels ;
- les conséquences mesurables sur le signal.

En l'absence de ces informations, les observations auditives pourront être documentées, mais elles ne devront pas être présentées comme la preuve d'une modification électronique précise.

---

## 5. Comparaison des deux approches

Le The Pelt et la Tube Screamer peuvent tous deux produire de la saturation, mais ils occupent des rôles différents dans notre chaîne.

| Critère | Fender The Pelt | Tube Screamer Silver Mod |
|---|---|---|
| Fonction principale | Fuzz | Overdrive et modification du signal |
| Saturation interne | Importante selon le réglage | Variable selon le Drive et le niveau d'entrée |
| Commande de niveau | Level | Level |
| Commande de saturation | Fuzz | Drive |
| Contrôle tonal | Tone, Mid et Thick | Tone |
| Commande complémentaire | Bloom | Aucune commande équivalente identifiée ici |
| Position dans la chaîne | Avant la Tube Screamer | Après le The Pelt |
| Interaction étudiée | Production de saturation | Transformation du signal déjà saturé ou du signal de guitare |

La différence fondamentale à étudier n'est pas simplement la quantité de saturation.

Il faut examiner la manière dont chaque circuit transforme le signal et la manière dont les deux circuits réagissent lorsqu'ils sont associés.

### 5.1. Saturation successive

Lorsque deux pédales de saturation sont placées en série, la première fournit à la seconde un signal déjà modifié.

La seconde ne reçoit donc plus le signal original de la guitare.

Elle reçoit un signal dont :

- l'amplitude a été transformée ;
- la dynamique peut être réduite ;
- le contenu harmonique a été enrichi ;
- le spectre fréquentiel peut avoir changé ;
- les transitoires peuvent avoir été modifiés.

La saturation successive peut donc produire un résultat très différent de celui obtenu avec chaque pédale seule.

### 5.2. Effet de l'ordre

Dans un système linéaire idéal, deux filtres linéaires peuvent parfois être permutés sans modifier leur réponse globale, sous certaines conditions.

En revanche, les pédales de saturation sont des systèmes non linéaires.

L'ordre des étages devient alors particulièrement important.

En général :

- une fuzz suivie d'un overdrive transforme un signal déjà saturé ;
- un overdrive suivi d'une fuzz présente à la fuzz un signal déjà amplifié et filtré ;
- les deux ordres peuvent produire des spectres et des réponses dynamiques différents.

Cette différence constitue un axe majeur de l'étude du pedalboard.

---

## 6. Interaction avec le préamplificateur du Brunetti

### 6.1. Le préamplificateur comme étage de traitement

Le Brunetti reçoit le signal provenant du pedalboard.

Son préamplificateur amplifie et transforme ce signal selon le canal sélectionné et les réglages appliqués.

Le résultat dépend notamment :

- du niveau d'entrée ;
- du Gain ;
- de l'égalisation ;
- du canal ;
- des caractéristiques internes du préamplificateur.

Lorsqu'une pédale de saturation est activée avant l'ampli, le signal transmis peut déjà être fortement transformé.

Le préamplificateur reçoit alors un signal différent de celui produit directement par la guitare.

### 6.2. Accumulation des non-linéarités

Si une pédale et le préamplificateur fonctionnent tous deux dans une zone non linéaire, leurs effets s'additionnent au sens où chaque étage transforme le signal déjà modifié par le précédent.

Le résultat n'est pas nécessairement une simple augmentation de saturation.

Il peut également entraîner :

- une réduction supplémentaire de la dynamique ;
- une évolution du contenu harmonique ;
- une modification des transitoires ;
- une variation de la lisibilité des notes ;
- une modification de la sensation de réponse sous les doigts.

La perception dépend du signal, du niveau, des réglages et du système de diffusion.

### 6.3. Différences entre les canaux

Les canaux Clean, Crunch et XLead ne doivent pas être considérés comme trois entrées identiques.

Leur comportement dépend de leur architecture et de leurs réglages respectifs.

Une même pédale peut donc produire des résultats différents selon le canal utilisé.

Il faudra notamment distinguer :

- une pédale qui produit elle-même l'essentiel de la saturation ;
- une pédale qui pousse un préamplificateur déjà proche de la saturation ;
- une pédale qui modifie surtout le spectre et l'attaque du signal ;
- une combinaison dans laquelle plusieurs étages contribuent simultanément au résultat.

L'objectif n'est pas de supposer à l'avance quelle combinaison sera la plus intéressante, mais d'identifier les différences réelles entre les configurations.

---

## 7. Influence du niveau et de l'impédance

### 7.1. Niveau électrique et niveau perçu

Le niveau électrique correspond à l'amplitude du signal.

Le niveau sonore perçu dépend ensuite de nombreux facteurs, notamment du système d'amplification et du haut-parleur.

Deux configurations peuvent présenter des amplitudes électriques différentes sans que leur différence de volume perçue soit directement proportionnelle.

Pour comparer des pédales, il est donc utile de distinguer :

- le niveau électrique en sortie ;
- le niveau sonore perçu ;
- la quantité de saturation ;
- la dynamique ;
- la réponse fréquentielle.

Une comparaison d'écoute doit idéalement être réalisée à niveau sonore comparable.

Sinon, une configuration légèrement plus forte peut être perçue comme plus présente ou plus détaillée, même si la différence provient surtout du niveau.

### 7.2. Impédance d'entrée et de sortie

L'impédance est une propriété électrique qui influence le transfert du signal entre deux appareils.

Une pédale possède notamment :

- une impédance d'entrée ;
- une impédance de sortie.

L'interaction entre l'impédance de sortie d'un appareil et l'impédance d'entrée du suivant peut modifier le niveau transmis et, dans certains cas, la réponse fréquentielle.

Cette interaction est particulièrement importante avec les micros passifs de guitare, dont le comportement dépend aussi de la charge électrique.

L'ordre des pédales peut donc avoir des conséquences qui ne sont pas uniquement liées à leur fonction audio.

### 7.3. Les câbles et les capacités parasites

Un câble possède une capacité électrique répartie entre ses conducteurs.

Avec une source présentant une impédance significative, cette capacité peut contribuer à modifier la réponse fréquentielle.

La longueur des câbles et leur capacité peuvent donc influencer le signal, notamment lorsque la guitare est reliée à une entrée à haute impédance.

Dans notre chaîne, les buffers et les circuits d'entrée des pédales peuvent modifier cette interaction.

Pour mesurer précisément ce phénomène, il faudrait connaître les caractéristiques électriques des pédales et des câbles utilisés.

---

## 8. Conséquences sur le spectre fréquentiel

### 8.1. Le spectre du signal

Un signal complexe peut être analysé comme une combinaison de composantes fréquentielles.

Le spectre représente la répartition de l'énergie du signal en fonction de la fréquence.

Une pédale peut modifier ce spectre de plusieurs manières :

- amplification de certaines zones ;
- atténuation de certaines zones ;
- génération d'harmoniques ;
- modification de la dynamique selon la fréquence ;
- transformation des transitoires.

Une pédale de saturation peut donc modifier simultanément le spectre par filtrage et par génération de nouvelles composantes.

### 8.2. Fréquences fondamentales et harmoniques

Une note jouée sur la guitare contient généralement une fondamentale et plusieurs harmoniques.

La saturation peut générer des composantes supplémentaires et modifier l'amplitude relative des harmoniques existantes.

La perception du timbre dépend notamment de cette répartition.

Il faut donc éviter de décrire une fuzz uniquement comme un appareil qui augmente les aigus ou les médiums.

Son caractère dépend aussi de la manière dont elle transforme le signal dans le domaine temporel.

### 8.3. Les notes graves et la saturation

Les notes graves présentent une difficulté particulière lorsqu'elles sont fortement saturées.

Le signal peut contenir une énergie importante dans le grave et des harmoniques nombreuses.

La saturation peut rendre le son plus dense, mais aussi réduire la séparation perceptive entre certaines composantes.

Dans notre accordage en Drop C#, il sera intéressant d'observer :

- la stabilité des notes graves ;
- la définition des attaques ;
- la séparation des cordes ;
- la lisibilité des accords ;
- la sensation de compression ;
- l'évolution du grave lorsque plusieurs pédales sont activées.

Il faudra distinguer les effets du circuit de saturation de ceux de l'égalisation, du canal du Brunetti et du cabinet.

---

## 9. Méthode d'analyse expérimentale

### 9.1. Principe

L'analyse doit permettre d'identifier les contributions respectives des pédales.

Pour cela, les comparaisons doivent conserver autant que possible les mêmes conditions de jeu et de matériel.

Les variables à documenter sont notamment :

- guitare ;
- micro sélectionné ;
- accordage ;
- volume et tonalité de la guitare ;
- canal du Brunetti ;
- réglages de l'ampli ;
- pédales activées ;
- réglages de chaque pédale ;
- ordre des pédales ;
- niveau sonore de comparaison ;
- cabinet utilisé.

### 9.2. Comparaison du The Pelt seul

Le premier essai consiste à comparer le Brunetti seul avec le Brunetti précédé du The Pelt.

Il faut conserver les mêmes réglages d'ampli et le même passage musical.

On peut ensuite observer :

- l'évolution de la saturation ;
- le contenu harmonique ;
- l'attaque ;
- le sustain ;
- la compression ressentie ;
- la définition des notes graves.

Le niveau sonore doit être pris en compte pour éviter de confondre augmentation de volume et modification du timbre.

### 9.3. Comparaison de la Tube Screamer seule

Le deuxième essai consiste à comparer le Brunetti seul avec le Brunetti précédé de la Tube Screamer.

Il faut ensuite distinguer deux situations :

- la pédale utilisée principalement pour modifier le niveau transmis ;
- la pédale utilisée avec une contribution plus importante de sa saturation interne.

Les observations devront porter sur le niveau, la dynamique, le spectre et la réponse du préamplificateur.

### 9.4. Comparaison des deux pédales ensemble

Le troisième essai consiste à activer les deux pédales dans leur ordre de référence :

```text
Guitare
   |
   v
The Pelt
   |
   v
Tube Screamer
   |
   v
Brunetti
```

Cette configuration permettra d'observer comment la Tube Screamer réagit au signal déjà transformé par la fuzz.

Il faudra comparer :

1. The Pelt seule ;
2. Tube Screamer seule ;
3. The Pelt puis Tube Screamer ;
4. éventuellement Tube Screamer puis The Pelt, si l'on souhaite étudier l'influence de l'ordre.

Les différences pourront être analysées à l'écoute et, si possible, à l'aide d'enregistrements comparables.

### 9.5. Mesures possibles

Avec un enregistrement direct ou une interface audio, plusieurs observations sont envisageables :

| Mesure ou analyse | Ce qu'elle permet d'étudier |
|---|---|
| Forme d'onde | Écrêtage et évolution temporelle |
| Niveau crête | Amplitude maximale |
| Niveau RMS | Niveau moyen énergétique |
| Spectre fréquentiel | Répartition des composantes |
| Analyse harmonique | Évolution des harmoniques |
| Comparaison temporelle | Attaque et décroissance |
| Comparaison à niveau égal | Différences de timbre moins biaisées par le volume |

Ces analyses ne remplacent pas l'écoute.

Elles permettent cependant de mieux distinguer certaines transformations électriques des impressions subjectives.

### 9.6. Limites de l'analyse

Les mesures doivent être interprétées avec prudence.

Un spectre ne permet pas, à lui seul, de décrire la sensation de jeu ou la qualité musicale d'un son.

De même, une forme d'onde visuellement plus écrêtée ne suffit pas à déterminer si une configuration sera plus lisible ou plus expressive.

L'analyse doit donc associer :

- mesures ;
- écoute ;
- contexte musical ;
- répétabilité ;
- observations du musicien.

---

## 10. À retenir

Le Fender The Pelt et la Tube Screamer Analogman Silver Mod sont deux circuits de saturation qui peuvent jouer des rôles différents dans le pedalboard.

Le The Pelt constitue une source de fuzz et de transformation harmonique importante.

La Tube Screamer peut modifier le signal transmis au Brunetti et contribuer elle-même à la saturation.

Lorsque les deux pédales sont utilisées successivement, leur interaction dépend notamment du niveau, du spectre et de la dynamique du signal produit par la première.

L'ordre des pédales est donc une variable essentielle.

La compréhension technique de ces interactions repose sur plusieurs notions :

- gain ;
- non-linéarité ;
- écrêtage ;
- compression ;
- filtrage ;
- spectre harmonique ;
- niveau électrique ;
- impédance ;
- réponse temporelle.

Il faudra enfin distinguer les caractéristiques électroniques documentées des observations réalisées avec notre propre matériel.

Les résultats des essais pourront ensuite être utilisés pour enrichir les profils ToneLab, sans confondre les explications générales de fonctionnement avec les réglages validés dans une configuration précise.

---

## Navigation

[Index du chapitre 4](index.md)  
[Partie 1 - Philosophie du pedalboard](part1.md)  
[Partie 3 - Les égaliseurs](part3.md)
