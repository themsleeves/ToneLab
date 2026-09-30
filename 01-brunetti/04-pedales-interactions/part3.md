# Chapitre 04 - Le pedalboard et ses interactions avec le Brunetti

## Partie 3 - Les égaliseurs

## Navigation

[Index du chapitre 4](index.md)  
[Partie 2 - Pédales de dynamique et de saturation](part2.md)  
[Partie 4 - Modulation](part4.md)

---

## Sommaire

1. [Introduction](#1-introduction)
2. [Comprendre ce que fait un égaliseur graphique](#2-comprendre-ce-que-fait-un-égaliseur-graphique)
3. [Le Mooer Graphic G](#3-le-mooer-graphic-g)
4. [Le MXR M-109 Six Band EQ](#4-le-mxr-m-109-six-band-eq)
5. [Pourquoi deux égaliseurs](#5-pourquoi-deux-égaliseurs)
6. [Le Graphic G comme pré-EQ](#6-le-graphic-g-comme-pré-eq)
7. [Le MXR comme post-EQ des saturations](#7-le-mxr-comme-post-eq-des-saturations)
8. [Interaction avec The Pelt et la Tube Screamer](#8-interaction-avec-the-pelt-et-la-tube-screamer)
9. [Interaction avec le Brunetti](#9-interaction-avec-le-brunetti)
10. [Gibson, Gretsch et Drop C#](#10-gibson-gretsch-et-drop-c)
11. [Méthode expérimentale](#11-méthode-expérimentale)
12. [À retenir](#12-à-retenir)
13. [Sources techniques](#13-sources-techniques)

---

## 1. Introduction

Les deux égaliseurs du pedalboard ToneLab ne sont pas présents pour effectuer deux fois la même correction.

Ils interviennent à deux endroits différents de la chaîne :

```text
Guitare
   |
   v
Mooer Graphic G
   |
   v
Fender The Pelt
   |
   v
Tube Screamer Analogman Silver Mod
   |
   v
MXR M-109 Six Band EQ
   |
   v
Brunetti XL R-EVO II
```

Le Graphic G est placé **avant** les principales saturations. Le MXR est placé **après** The Pelt et la Tube Screamer, mais reste en façade du Brunetti.

La question centrale de cette partie est donc double :

> Que change une égalisation appliquée avant une saturation ?

et :

> Que change une égalisation appliquée au signal déjà saturé avant son entrée dans le Brunetti ?

Pour répondre correctement, il faut d'abord documenter précisément les deux machines, puis seulement étudier leur rôle musical dans le rig.

---

## 2. Comprendre ce que fait un égaliseur graphique

### 2.1. Une bande agit autour d'une fréquence déterminée

Un égaliseur graphique regroupe plusieurs filtres dont chacun agit autour d'une fréquence définie par le constructeur.

Le curseur ne représente donc pas un instrument ni une qualité subjective comme « chaleur », « boue » ou « présence ». Il représente avant tout une **zone fréquentielle sur laquelle une correction est appliquée**.

ToneLab évitera ainsi les équivalences trop simplistes du type :

```text
400 Hz = boue
800 Hz = nasal
3.2 kHz = agressif
```

Ces termes peuvent décrire une observation dans un contexte donné, mais ils ne sont pas des propriétés universelles des fréquences.

### 2.2. Boost et cut

Un curseur placé au centre correspond à la position de référence à 0 dB.

```text
        BOOST
          ^
          |
0 dB  ----+----  référence
          |
          v
         CUT
```

Sur le Graphic G comme sur le MXR M-109, chaque bande offre une plage annoncée de ±18 dB.

Une correction aussi importante est disponible techniquement, mais ToneLab n'a aucune raison de l'utiliser systématiquement. Pour comprendre un comportement, de petites variations sont souvent plus faciles à interpréter.

### 2.3. Niveau global et égalisation ne sont pas la même chose

Le Graphic G possède un **Level général**. Le MXR M-109 n'en possède pas.

```text
MOOER GRAPHIC G
      |
      +--> cinq bandes fréquentielles
      |
      +--> Level général

MXR M-109
      |
      +--> six bandes fréquentielles
      |
      +--> pas de Level général dédié
```

Avec le Graphic G, il est donc possible de distinguer plus facilement :

- la modification du spectre ;
- la modification du niveau global envoyé à la pédale suivante.

### 2.4. Pré-EQ et post-EQ

```text
PRE-EQ
   |
   v
Saturation
```

agit sur **ce qui va être saturé**.

```text
Saturation
    |
    v
POST-EQ
```

agit sur **un signal dont le contenu harmonique et la dynamique ont déjà été transformés**.

Il s'agit de la distinction fondamentale de cette partie.

---

## 3. Le Mooer Graphic G

### 3.1. Architecture et commandes

Le Mooer Graphic G est un égaliseur graphique cinq bandes disposant d'un réglage général de niveau.

Ses commandes sont :

- cinq sliders d'égalisation ;
- un potentiomètre **Level** ;
- un footswitch true bypass.

Les cinq centres de fréquence sont :

```text
100 Hz   250 Hz   630 Hz   1.6 kHz   4 kHz
```

Chaque bande dispose d'une plage de ±18 dB.

### 3.2. Level : agir sur le niveau envoyé à The Pelt

Le manuel indique que **Level ajuste le niveau de sortie** de la pédale.

Dans notre chaîne :

```text
Graphic G
 [Level]
    |
    v
The Pelt
```

Level peut donc modifier le niveau présenté à l'entrée de The Pelt indépendamment de la forme générale de l'EQ.

Cela ouvre deux expériences distinctes :

```text
EXPERIENCE A
EQ modifiée
Level compensé
```

pour comparer principalement le changement spectral, et :

```text
EXPERIENCE B
EQ identique
Level modifié
```

pour observer l'influence du niveau envoyé à la fuzz.

### 3.3. 100 Hz

Le premier slider est centré sur **100 Hz**.

Dans ToneLab, cette bande est particulièrement intéressante pour les expériences concernant le bas du spectre et le Drop C#.

La démarche peut être :

```text
100 Hz à 0
    |
    v
référence

100 Hz légèrement réduit
    |
    v
comparaison

100 Hz légèrement augmenté
    |
    v
comparaison
```

Observer ensuite : masse, comportement des graves, attaque et lisibilité.

### 3.4. 250 Hz

La deuxième bande est centrée sur **250 Hz**.

Elle fournit une variable différente de 100 Hz pour explorer le registre grave / médium inférieur du signal envoyé aux saturations.

Les critères d'écoute peuvent inclure :

- densité ;
- séparation des notes ;
- équilibre entre masse et définition ;
- réaction de The Pelt lorsque Thick est activé ou désactivé.

### 3.5. 630 Hz

La troisième bande est centrée sur **630 Hz**.

Elle permet d'agir dans une autre zone médium avant la fuzz.

Cette bande peut notamment être utilisée pour étudier la relation entre :

```text
Graphic G 630 Hz
       |
       v
The Pelt Mid
       |
       v
Tube Screamer Silver Mod
```

Ces trois fonctions ne sont pas équivalentes. Elles interviennent à des endroits différents et doivent être comparées expérimentalement.

### 3.6. 1,6 kHz

La quatrième bande est centrée sur **1,6 kHz**.

Elle peut être utilisée comme variable lorsqu'on étudie la définition du jeu et la manière dont le signal attaque les saturations.

Une modification avant la fuzz ne doit pas être confondue avec la même fréquence corrigée après celle-ci par le MXR.

### 3.7. 4 kHz

La dernière bande du Graphic G est centrée sur **4 kHz**.

Elle permet d'expérimenter le contenu supérieur envoyé à The Pelt avant que celle-ci ne génère son propre contenu harmonique.

L'effet réel doit être évalué avec le rig plutôt que résumé par un adjectif prédéfini.

### 3.8. True bypass et caractéristiques électriques

Le Graphic G est documenté comme **true bypass**.

Les caractéristiques publiées indiquent :

```text
Impédance d'entrée : 470 kOhm
Impédance de sortie : 1 kOhm
Alimentation         : 9 V DC centre négatif
Consommation         : 7 mA
```

Ces données caractérisent la machine. Elles ne suffisent pas, à elles seules, à prédire une différence audible dans notre chaîne.

### 3.9. Fonction ToneLab

```text
Guitare
   |
   v
GRAPHIC G
   |
   +--> façonner le spectre avant saturation
   |
   +--> ajuster le niveau global via Level
   |
   v
The Pelt
```

Son rôle est donc plus large qu'une simple correction finale du son.

---

## 4. Le MXR M-109 Six Band EQ

### 4.1. Identifier précisément la version ToneLab

Le modèle utilisé dans ToneLab est le **MXR M-109 noir à LEDs rouges**.

Il ne doit pas être confondu avec le **M109S gris à LEDs bleues**, qui constitue une révision matérielle différente.

Le M-109 documenté ici possède :

- un boîtier noir ;
- des LEDs rouges sur les sliders ;
- six bandes d'égalisation ;
- un bypass **Hardwire** ;
- une consommation annoncée de **3 mA**.

Le M109S plus récent conserve les six fréquences et la plage ±18 dB, mais Dunlop le décrit comme une version améliorée utilisant un circuit de réduction de bruit, un true bypass, des LEDs plus lumineuses et un boîtier aluminium plus léger.

ToneLab doit donc toujours utiliser les spécifications du **M-109**, et non celles du M109S.

### 4.2. Architecture et commandes

Le M-109 possède six sliders et un footswitch.

Ses fréquences sont :

```text
100 Hz   200 Hz   400 Hz   800 Hz   1.6 kHz   3.2 kHz
```

Chaque slider permet un cut ou un boost allant jusqu'à ±18 dB.

Il ne possède pas de potentiomètre général de Level.

### 4.3. 100 Hz

La première bande est centrée sur **100 Hz**.

C'est une fréquence directement commune aux deux EQ :

```text
Graphic G : 100 Hz
     |
     v
AVANT saturation

MXR M-109 : 100 Hz
     |
     v
APRES Pelt + TS
```

Même fréquence centrale, mais fonction différente dans la chaîne.

### 4.4. 200 Hz

La deuxième bande est centrée sur **200 Hz**.

Elle peut servir à explorer la densité du registre inférieur après la fuzz et la Tube Screamer.

On pourra notamment observer si une modification à cet endroit produit un résultat différent d'un travail réalisé à 250 Hz sur le Graphic G avant saturation.

### 4.5. 400 Hz

La troisième bande est centrée sur **400 Hz**.

ToneLab l'utilisera comme variable expérimentale sans lui attribuer automatiquement une qualité sonore négative ou positive.

```text
400 Hz : 0
400 Hz : léger cut
400 Hz : léger boost
```

Puis comparer densité, lisibilité et intégration dans le contexte musical.

### 4.6. 800 Hz

La quatrième bande est centrée sur **800 Hz**.

Elle constitue une zone médium différente de celle disponible sur le Graphic G à 630 Hz.

Elle permettra notamment d'observer les réactions dans une chaîne déjà saturée et d'étudier l'évolution du caractère et de la lisibilité.

### 4.7. 1,6 kHz

La cinquième bande est centrée sur **1,6 kHz**.

Il s'agit de la seconde fréquence exactement commune aux deux égaliseurs.

```text
Graphic G 1.6 kHz
      |
      v
avant saturation

MXR M-109 1.6 kHz
      |
      v
après les saturations
```

Cette fréquence constitue donc un excellent point de comparaison pour étudier le rôle du placement.

### 4.8. 3,2 kHz

La dernière bande est centrée sur **3,2 kHz**.

Elle permet de modifier une zone supérieure du signal déjà transformé par The Pelt et la Tube Screamer.

On observera notamment l'évolution de la définition des attaques et toute agressivité éventuelle, sans supposer que ces effets apparaîtront systématiquement.

### 4.9. Caractéristiques électriques du M-109 noir

Le manuel du M-109 indique :

```text
Impédance d'entrée  : 470 kOhm
Impédance de sortie : 5 kOhm
Niveau d'entrée max : 0 dBV
Niveau de sortie max: 0 dBV
Noise floor         : -95 dBV (pondéré A)
Bypass              : Hardwire
Consommation        : 3 mA
Alimentation        : 9 V DC
```

Ces valeurs sont celles à utiliser pour le matériel ToneLab.

En particulier, les valeurs nettement différentes publiées pour le M109S ne doivent pas être reportées sur le M-109 noir.

### 4.10. Hardwire n'est pas documenté ici comme True Bypass

Le manuel du M-109 utilise explicitement le terme **Hardwire** pour décrire son bypass.

ToneLab conservera donc cette formulation.

Il ne faut pas remplacer automatiquement « Hardwire » par « True Bypass » sans source propre au M-109 qui établisse cette équivalence.

### 4.11. Pas de Level général

Le M-109 n'a pas de commande dédiée équivalente au Level du Graphic G.

Cela ne signifie pas que les positions des bandes sont sans effet sur le niveau résultant.

La distinction fonctionnelle est plutôt :

```text
Graphic G
   |
   +--> cinq bandes
   +--> Level général explicite

MXR M-109
   |
   +--> six bandes
   +--> pas de Level général dédié
```

### 4.12. Fonction ToneLab

```text
The Pelt
   |
   v
Tube Screamer
   |
   v
MXR M-109
   |
   +--> façonner le signal déjà saturé
   |
   v
Brunetti
```

Le M-109 est donc principalement un **post-EQ par rapport aux saturations**, même s'il reste placé avant le préamplificateur du Brunetti.

---

## 5. Pourquoi deux égaliseurs

Les deux pédales diffèrent à la fois par leurs bandes, leurs commandes et leur position.

```text
MOOER GRAPHIC G              MXR M-109

100 Hz        <----------->  100 Hz
250 Hz        <----------->  200 Hz
630 Hz        <----------->  400 / 800 Hz
1.6 kHz       <----------->  1.6 kHz
4 kHz         <----------->  3.2 kHz

Level général               pas de Level dédié
True bypass                 bypass : Hardwire

AVANT saturation            APRES Pelt + TS
```

L'intérêt principal n'est donc pas de disposer de onze curseurs.

Il est de pouvoir intervenir à **deux moments différents de la construction du signal**.

---

## 6. Le Graphic G comme pré-EQ

### 6.1. Préparer ce qui entre dans The Pelt

```text
Guitare
   |
   v
Graphic G
   |
   v
signal préparé
   |
   v
The Pelt
```

Une bande boostée avant la fuzz signifie qu'une quantité plus importante de cette zone est présentée au circuit suivant.

C'est différent d'un boost appliqué au résultat de la fuzz.

### 6.2. Séparer spectre et niveau

Grâce au Level, une expérience peut chercher à compenser le niveau global lorsqu'une courbe est modifiée.

Cela permet d'éviter, autant que possible, de confondre changement de timbre et changement de niveau d'entrée de The Pelt.

À l'inverse, Level peut volontairement devenir la variable étudiée lorsqu'on souhaite observer la réaction de la fuzz à un signal plus ou moins fort.

---

## 7. Le MXR comme post-EQ des saturations

```text
The Pelt
   |
   v
Tube Screamer
   |
   v
signal saturé
   |
   v
MXR M-109
   |
   v
Brunetti
```

Le MXR agit sur un signal dont :

- la dynamique a pu être comprimée ;
- des harmoniques ont été générées ;
- l'équilibre fréquentiel a déjà été modifié ;
- les transitoires ont été transformées.

Il peut donc sculpter le résultat, mais ne peut pas annuler le processus de saturation déjà réalisé.

---

## 8. Interaction avec The Pelt et la Tube Screamer

### 8.1. Graphic G et The Pelt

Le Graphic G précède directement The Pelt.

Il doit donc être étudié en relation avec :

- Fuzz ;
- Tone ;
- Bloom ;
- Mid ;
- Thick ;
- Level de The Pelt.

Par exemple, une modification du grave avant The Pelt peut être comparée à l'action de Thick, sans supposer que les deux fonctions sont équivalentes.

### 8.2. M-109 après Pelt + TS

Le MXR reçoit le résultat combiné des deux saturations.

Une observation comme « le son manque de présence » peut donc mener à plusieurs expériences :

```text
Pelt Mid
    |
    ou
    v
Tube Screamer Tone / Level
    |
    ou
    v
MXR M-109
```

ToneLab doit essayer d'identifier **où apparaît le problème** avant de choisir l'outil de correction.

### 8.3. Fréquences communes comme expérience

100 Hz et 1,6 kHz sont présents sur les deux EQ.

```text
TEST A
Graphic G 1.6 kHz modifié
MXR 1.6 kHz à 0
```

puis :

```text
TEST B
Graphic G 1.6 kHz à 0
MXR 1.6 kHz modifié
```

L'objectif n'est pas de démontrer une égalité mathématique, mais d'entendre comment le **placement** change le résultat.

---

## 9. Interaction avec le Brunetti

### 9.1. Le MXR reste en façade

```text
Graphic G
   |
   v
Saturations
   |
   v
MXR M-109
   |
   v
PREAMPLIFICATEUR BRUNETTI
```

Le préamplificateur reçoit donc le signal égalisé et peut à son tour le transformer.

### 9.2. Clean

Clean constitue un contexte utile pour comparer les EQ avec une contribution moindre de la saturation du préamplificateur.

Il permet d'isoler plus facilement :

- le comportement propre des deux guitares ;
- le résultat des saturations ;
- le pré-EQ ;
- le post-EQ.

### 9.3. Crunch

Sur Crunch, l'égalisation en façade conditionne le signal envoyé à un canal qui possède déjà son propre caractère et son propre comportement de gain.

Une courbe efficace sur Clean doit donc être revalidée sur Crunch.

### 9.4. XLead

Avec XLead, l'enjeu est particulièrement important pour les sons modernes et lourds recherchés dans ToneLab.

L'objectif est d'étudier le compromis entre :

```text
Masse
  +
Définition
  +
Attaque
  +
Lisibilité
```

### 9.5. MXR dans la boucle : expérience à valider sur le M-109

Le constructeur du M109S actuel documente explicitement son utilisation possible dans une boucle d'effets. Cette indication ne sera pas transférée automatiquement au M-109 noir comme caractéristique constructeur de notre modèle.

Une expérience du M-109 dans la boucle du Brunetti reste néanmoins envisageable comme **expérience ToneLab**, sous réserve de la traiter comme telle :

```text
CONFIGURATION DE REFERENCE

MXR M-109
   |
   v
Entrée Brunetti
```

contre :

```text
EXPERIENCE TONELAB

Préampli Brunetti
       |
       v
Boucle FX -> MXR M-109
```

---

## 10. Gibson, Gretsch et Drop C#

### 10.1. Préserver deux identités

Les égaliseurs ne doivent pas servir automatiquement à uniformiser :

```text
Gibson Les Paul Classic DC
          |
          +--> identité propre

Gretsch John Gourley Broadkaster
          |
          +--> identité propre
```

Une correction n'est justifiée que par un objectif identifié.

### 10.2. Drop C#

Le Drop C# rend l'étude du bas du spectre particulièrement intéressante.

Mais la méthode ToneLab reste :

> observer d'abord, corriger ensuite.

Il faut éviter des règles comme « accordage bas = couper systématiquement 100 Hz ».

L'expérience doit déterminer si le problème vient :

- du signal de la guitare ;
- du pré-EQ ;
- de Thick sur The Pelt ;
- des saturations ;
- du post-EQ ;
- du canal du Brunetti ;
- du contexte de diffusion.

---

## 11. Méthode expérimentale

### 11.1. Référence

Commencer avec les deux EQ à plat :

```text
Graphic G : 5 bandes à 0
MXR M-109 : 6 bandes à 0
```

Pour le Graphic G, documenter également le Level.

### 11.2. Une bande à la fois

```text
Référence
    |
    v
modifier UNE bande
    |
    v
écouter
    |
    v
comparer
    |
    v
revenir à la référence
```

### 11.3. Pré-EQ seul

```text
Graphic G : une bande modifiée
MXR M-109 : plat
```

Noter fréquence, amplitude de correction, Level, pédales actives, canal, guitare, micro et observation.

### 11.4. Post-EQ seul

```text
Graphic G : plat
MXR M-109 : une bande modifiée
```

Comparer dans les mêmes conditions.

### 11.5. Comparer les fréquences communes

Les expériences à 100 Hz et 1,6 kHz permettent de comparer directement deux positions différentes de la chaîne.

### 11.6. Construire ensuite une courbe

```text
Comprendre une bande
       |
       v
Comprendre la suivante
       |
       v
Associer deux corrections
       |
       v
Comparer
       |
       v
Construire progressivement une courbe
```

### 11.7. Documenter dans ToneLab Profiles

```text
Guitare :
Micro :
Accordage :

Graphic G :
100 Hz :
250 Hz :
630 Hz :
1.6 kHz :
4 kHz :
Level :

The Pelt :
réglages :

Tube Screamer :
réglages :

MXR M-109 :
100 Hz :
200 Hz :
400 Hz :
800 Hz :
1.6 kHz :
3.2 kHz :

Canal Brunetti :
Gain :
Bass :
Mid :
Edge :
Master :
Bright / Focus :

Baffle :
Niveau de test :

Observation :
Interprétation :
Décision :
```

La documentation Markdown conserve ensuite les principes et résultats reproductibles plutôt que chaque tentative intermédiaire.

---

## 12. À retenir

Le Graphic G et le MXR M-109 ne sont pas deux exemplaires interchangeables d'une même fonction.

```text
Guitare
   |
   v
MOOER GRAPHIC G
5 bandes + Level
   |
   v
PREPARER
le spectre et le niveau
   |
   v
THE PELT
   |
   v
TUBE SCREAMER
   |
   v
MXR M-109
6 bandes / LEDs rouges
   |
   v
SCULPTER
le signal déjà saturé
   |
   v
BRUNETTI
```

Le Graphic G agit principalement comme **pré-EQ** et possède un Level permettant d'agir explicitement sur son niveau de sortie.

Le MXR M-109 noir utilisé dans ToneLab agit comme **post-EQ par rapport aux saturations**, tout en restant placé avant le préamplificateur du Brunetti. Ses spécifications de référence sont celles du M-109 à LEDs rouges, pas celles du M109S gris actuel.

ToneLab ne cherche donc pas une « bonne courbe » universelle. Il cherche à comprendre **quelle correction, à quel endroit de la chaîne, répond à quel problème sonore**.

---

## 13. Sources techniques

- Mooer Audio, **Graphic G** : cinq bandes centrées sur 100 Hz, 250 Hz, 630 Hz, 1,6 kHz et 4 kHz ; ±18 dB par bande ; Level général ; true bypass ; entrée 470 kOhm ; sortie 1 kOhm ; alimentation 9 V DC centre négatif.
- Manuel du **MXR M-109 Six Band Graphic EQ** : six bandes, ±18 dB ; LEDs rouges ; entrée 470 kOhm ; sortie 5 kOhm ; entrée max. 0 dBV ; sortie max. 0 dBV ; noise floor -95 dBV pondéré A ; bypass Hardwire ; consommation 3 mA ; alimentation 9 V DC.
- Dunlop, **M109S Six Band EQ** : utilisé uniquement pour documenter les différences avec la génération suivante, notamment circuit de réduction de bruit, true bypass, LEDs plus lumineuses et boîtier aluminium plus léger.

---

## Navigation

[Index du chapitre 4](index.md)  
[Partie 2 - Pédales de dynamique et de saturation](part2.md)  
[Partie 4 - Modulation](part4.md)
