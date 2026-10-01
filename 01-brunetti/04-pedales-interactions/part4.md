# Chapitre 04 - Le pedalboard et ses interactions avec le Brunetti

## Partie 4 - Modulation

## Navigation

[Index du chapitre 4](index.md)  
[Partie 3 - Les égaliseurs](part3.md)  
[Partie 5 - Delay et réverbération](part5.md)

---

## Sommaire

1. [Introduction](#1-introduction)
2. [Situer le tremolo parmi les modulations](#2-situer-le-tremolo-parmi-les-modulations)
3. [Le EHX Nano Pulsar](#3-le-ehx-nano-pulsar)
4. [Comprendre Rate, Depth et Volume](#4-comprendre-rate-depth-et-volume)
5. [Shape : la forme du mouvement](#5-shape--la-forme-du-mouvement)
6. [Le Warp mode](#6-le-warp-mode)
7. [Utiliser le Nano Pulsar comme texture](#7-utiliser-le-nano-pulsar-comme-texture)
8. [Placement et interaction avec les saturations](#8-placement-et-interaction-avec-les-saturations)
9. [Interaction avec les canaux du Brunetti](#9-interaction-avec-les-canaux-du-brunetti)
10. [Les autres familles de modulation](#10-les-autres-familles-de-modulation)
11. [Méthode expérimentale](#11-méthode-expérimentale)
12. [À retenir](#12-à-retenir)
13. [Sources techniques](#13-sources-techniques)

---

## 1. Introduction

La modulation introduit du mouvement dans un son.

Dans le pedalboard ToneLab, cette fonction est actuellement assurée par le **Electro-Harmonix Nano Pulsar**.

Il s'agit d'un tremolo dont le principe consiste à faire varier périodiquement le niveau du signal. Mais le Nano Pulsar va plus loin qu'une simple pulsation régulière : la forme de la modulation peut être profondément modifiée grâce au sélecteur et au potentiomètre Shape, et les réglages élevés de Depth donnent accès à un comportement particulier appelé Warp.

Dans la chaîne de référence, le Nano Pulsar intervient après les saturations et les égaliseurs :

```text
Guitare
   |
   v
Wah / Volume
   |
   v
Graphic G
   |
   v
The Pelt
   |
   v
Tube Screamer Silver Mod
   |
   v
MXR M-109
   |
   v
EHX Nano Pulsar
   |
   v
Effets temporels / ambiance
   |
   v
Brunetti
```

Cette position signifie que le Nano Pulsar module principalement **un son déjà construit** plutôt que d'envoyer une modulation de niveau dans les étages de fuzz et d'overdrive.

L'objectif de ToneLab est de comprendre comment exploiter cette pédale comme **élément de texture et de mouvement**, et pas uniquement comme un tremolo périodique classique.

---

## 2. Situer le tremolo parmi les modulations

Le terme modulation regroupe plusieurs familles d'effets qui ne modifient pas toutes la même propriété du signal.

Une représentation volontairement simplifiée peut être utilisée :

```text
MODULATION
    |
    +--> amplitude / niveau
    |       |
    |       +--> Tremolo
    |
    +--> hauteur / retard modulé
    |       |
    |       +--> Chorus
    |       +--> Vibrato
    |       +--> Flanger
    |
    +--> phase / filtrage mobile
            |
            +--> Phaser
            +--> Vibe / effets apparentés
```

Le Nano Pulsar appartient principalement à la première famille : il crée un mouvement en faisant varier le niveau du signal dans le temps.

ToneLab ne possède actuellement pas de phaser dédié. Cette distinction sera utile lorsque des références musicales utilisent un mouvement spectral que le Nano Pulsar ne cherche pas à reproduire.

---

## 3. Le EHX Nano Pulsar

### 3.1. Fonction générale

Electro-Harmonix décrit le Nano Pulsar comme un tremolo à forme variable. En utilisation mono, qui correspond au contexte ToneLab actuel, il permet de contrôler finement la forme de la modulation de volume.

La pédale comporte principalement :

- **VOL** ;
- **RATE** ;
- **DEPTH** ;
- **SHAPE** ;
- un sélecteur de forme **Triangle / Square** ;
- un footswitch.

Le Nano Pulsar possède également des possibilités stéréo et de panning. Elles ne sont pas développées dans cette partie puisque ToneLab l'utilise actuellement en mono.

### 3.2. Le bypass

Electro-Harmonix documente le Nano Pulsar comme utilisant un **buffered bypass**.

Cette caractéristique fait partie du comportement électrique de la pédale lorsqu'elle est intégrée à la chaîne et doit être conservée dans les informations de référence du rig.

---

## 4. Comprendre Rate, Depth et Volume

### 4.1. Rate : vitesse du mouvement

Rate règle la vitesse de la modulation.

Conceptuellement :

```text
Rate faible
    |
    v
mouvement lent

Rate élevé
    |
    v
mouvement rapide
```

Mais la perception de Rate dépend fortement de Shape et Depth. Une modulation lente et progressive ne donne pas la même sensation qu'une modulation lente utilisant une transition très abrupte.

ToneLab doit donc éviter de documenter Rate isolément comme s'il définissait à lui seul le caractère rythmique.

### 4.2. Depth : quantité de modulation

Depth contrôle la profondeur de l'effet.

Avec une profondeur limitée, le niveau du signal varie moins fortement. Lorsque Depth augmente, le contraste entre les différentes phases de la modulation devient plus marqué.

```text
Depth faible
     |
     v
mouvement discret

Depth important
     |
     v
mouvement plus marqué
```

Mais sur le Nano Pulsar, Depth possède une particularité supplémentaire : ses réglages élevés donnent accès au **Warp mode**, étudié plus loin.

### 4.3. Volume : compensation ou boost volontaire

VOL ajuste le niveau général de sortie lorsque l'effet est actif.

Electro-Harmonix indique que ce contrôle peut fournir jusqu'à **12 dB de boost**, selon les réglages des autres commandes.

Cela ouvre deux usages différents :

```text
USAGE A
VOL
 |
 +--> compenser une baisse de volume perçue
```

ou :

```text
USAGE B
VOL
 |
 +--> créer volontairement un niveau de sortie plus élevé
```

Cette distinction est importante dans ToneLab.

Si l'objectif est de comparer deux formes de tremolo, VOL peut être ajusté pour limiter le biais lié au niveau perçu.

Si l'objectif est au contraire d'étudier la réaction du Brunetti à un niveau plus élevé, le boost devient alors une variable volontaire de l'expérience.

---

## 5. Shape : la forme du mouvement

Shape est l'une des fonctions les plus importantes du Nano Pulsar.

Le sélecteur choisit deux grandes familles :

```text
TRIANGLE
ou
SQUARE
```

Le potentiomètre Shape transforme ensuite la forme de la modulation à l'intérieur de la famille sélectionnée.

### 5.1. Mode Triangle

Dans le mode Triangle, Electro-Harmonix décrit une modulation de volume progressive.

En faisant tourner Shape du minimum vers le maximum, la forme évolue ainsi :

```text
Shape minimum
     |
     v
Dent-de-scie montante
     |
     v
Shape au centre
     |
     v
Triangle
     |
     v
Shape maximum
     |
     v
Dent-de-scie descendante
```

Ce changement est important musicalement car il modifie **la manière dont le son monte et descend**, et pas seulement la vitesse du cycle.

#### Dent-de-scie montante

La forme privilégie une évolution asymétrique dans une direction.

L'expérience ToneLab doit écouter séparément :

- la manière dont le son réapparaît ;
- la manière dont il retombe ;
- la sensation rythmique créée par cette asymétrie.

#### Triangle

Au centre, la montée et la descente produisent un comportement plus symétrique.

Cette zone constitue une bonne référence pour distinguer l'effet de Rate et Depth avant d'explorer des formes plus asymétriques.

#### Dent-de-scie descendante

À l'autre extrémité, l'asymétrie est inversée.

L'intérêt n'est pas simplement de disposer d'une autre couleur de tremolo : la direction de la variation peut changer la perception de l'attaque et du mouvement d'un riff ou d'une nappe.

### 5.2. Mode Square

En mode Square, la modulation devient beaucoup plus abrupte.

Le manuel décrit un comportement de type **on/off** et indique que Shape agit alors sur la **largeur d'impulsion**.

```text
Shape minimum
     |
     v
impulsion étroite

        ...

Shape maximum
     |
     v
impulsion large
```

La largeur d'impulsion détermine la proportion du cycle pendant laquelle le signal reste dans une phase plutôt qu'une autre.

Cela permet d'aller d'un tremolo carré relativement équilibré vers des textures rythmiques nettement plus asymétriques.

### 5.3. Shape est une variable musicale

Il est donc réducteur de considérer Shape comme un simple réglage de tonalité de l'effet.

Shape change **la géométrie temporelle du mouvement**.

Cette particularité explique pourquoi le Nano Pulsar peut être utilisé comme outil de texture.

---

## 6. Le Warp mode

### 6.1. Une particularité du réglage Depth

Electro-Harmonix indique que les réglages élevés de Depth font entrer le Nano Pulsar dans un comportement appelé **Warp mode**.

Dans cette zone, la modulation du volume devient asymétrique et permet d'obtenir des effets rythmiques particuliers.

Le point important pour ToneLab est donc :

> Depth ne règle pas seulement « plus ou moins de tremolo ».

En poussant suffisamment ce paramètre, on entre dans une zone de comportement différente.

### 6.2. Conséquence expérimentale

Il faudra donc distinguer au minimum :

```text
Depth faible
    |
    v
modulation conventionnelle légère
```

```text
Depth moyen
    |
    v
modulation nettement perceptible
```

```text
Depth élevé
    |
    v
zone Warp
    |
    v
mouvement asymétrique / rythmique
```

La frontière exacte devra être observée sur la pédale plutôt que fixée arbitrairement dans la documentation.

### 6.3. Warp et Shape

Warp devient particulièrement intéressant lorsqu'il est combiné aux différentes formes de Shape.

Plutôt que de chercher immédiatement un « meilleur réglage », ToneLab devra observer comment les interactions suivantes modifient la sensation :

```text
Depth élevé
     +
Triangle / Sawtooth
```

et :

```text
Depth élevé
     +
Square / largeur d'impulsion
```

---

## 7. Utiliser le Nano Pulsar comme texture

### 7.1. Au-delà du tremolo classique

Un tremolo traditionnel peut être utilisé comme une pulsation régulière immédiatement perceptible.

Le Nano Pulsar permet aussi une approche plus subtile : créer un mouvement qui participe au caractère du son sans devenir nécessairement l'élément principal.

```text
Tremolo comme effet
        |
        v
pulsation clairement identifiable
```

contre :

```text
Tremolo comme texture
        |
        v
mouvement intégré au son
```

### 7.2. Texture lente

Une première piste d'expérience est un Rate lent avec une profondeur modérée et une forme progressive.

L'objectif n'est pas de prescrire un réglage, mais de tester si le mouvement peut :

- apporter de la respiration à un son tenu ;
- éviter un caractère trop statique ;
- enrichir une ambiance avec delay ou réverbération.

### 7.3. Texture asymétrique

Une forme sawtooth peut créer une sensation différente d'un triangle régulier parce que montée et descente ne se comportent plus de manière symétrique.

Cette asymétrie peut être particulièrement intéressante sur :

- accords tenus ;
- drones ;
- riffs espacés ;
- passages psychédéliques.

### 7.4. Texture rythmique

Square, une Depth importante et un réglage de largeur d'impulsion peuvent créer un mouvement beaucoup plus rythmique.

Dans ce cas, la modulation devient presque un élément de composition.

ToneLab devra alors observer si Rate s'accorde réellement au tempo et au placement rythmique du morceau.

---

## 8. Placement et interaction avec les saturations

### 8.1. Position actuelle

Dans le pedalboard ToneLab :

```text
The Pelt
   |
   v
Tube Screamer
   |
   v
MXR M-109
   |
   v
Nano Pulsar
```

Le Nano Pulsar module donc un signal déjà saturé et égalisé.

### 8.2. Conséquence de cette position

Cette architecture peut être résumée ainsi :

```text
Construire la texture harmonique
        |
        v
The Pelt / Tube Screamer
        |
        v
Sculpter
        |
        v
MXR
        |
        v
Donner du mouvement
        |
        v
Nano Pulsar
```

Le tremolo ne modifie donc pas, dans la configuration actuelle, le niveau envoyé à l'entrée de The Pelt ou de la Tube Screamer.

### 8.3. Une expérience d'ordre possible

Une expérience alternative pourrait consister à placer le tremolo avant les saturations afin d'étudier comment un niveau déjà modulé influence leur comportement.

Cette configuration n'est pas la référence ToneLab. Elle constitue seulement une expérience éventuelle si une question précise le justifie.

---

## 9. Interaction avec les canaux du Brunetti

### 9.1. Clean

Clean constitue un contexte naturel pour entendre clairement les formes de modulation du Nano Pulsar.

Les expériences peuvent notamment comparer :

- Triangle ;
- sawtooth montant ;
- sawtooth descendant ;
- Square ;
- largeurs d'impulsion différentes ;
- zone Warp.

### 9.2. Crunch

Sur Crunch, la modulation du niveau agit sur un signal plus dense avant qu'il entre dans le préamplificateur.

Il faudra observer si les différences de Shape restent aussi lisibles et comment la pulsation s'intègre au caractère du canal.

### 9.3. XLead

Avec XLead, l'intérêt pourrait être moins de créer un tremolo « joli » que d'introduire une texture ou un mouvement rythmique à l'intérieur d'un son lourd.

Les critères deviennent notamment :

- conservation de la lisibilité ;
- cohérence du Rate avec le riff ;
- articulation des coupures ;
- quantité de Depth nécessaire ;
- intérêt musical réel du mouvement.

### 9.4. VOL et réaction du préamplificateur

Le Nano Pulsar reste placé avant l'entrée du Brunetti.

Son contrôle VOL peut donc modifier le niveau présenté au préamplificateur lorsque l'effet est actif.

Cette possibilité devra être distinguée de la simple compensation d'une baisse de volume perçue.

---

## 10. Les autres familles de modulation

ToneLab ne possède actuellement pas d'autre pédale de modulation dédiée que le Nano Pulsar.

Il est néanmoins utile de situer brièvement les principales familles afin de comprendre ce que le tremolo ne fait pas.

### 10.1. Phaser

Le phaser crée un mouvement spectral lié à des déphasages et aux annulations/renforcements qui en résultent.

Il ne doit pas être assimilé à un tremolo : le Nano Pulsar module principalement le niveau alors qu'un phaser crée un déplacement spectral caractéristique.

ToneLab ne possède actuellement pas de phaser. Cette famille pourra être étudiée davantage si une référence musicale ou une expérimentation future le justifie.

### 10.2. Chorus, vibrato et flanger

Ces familles produisent d'autres types de mouvement, généralement liés à des variations temporelles et/ou de hauteur du signal traité.

Elles ne sont présentées ici que pour donner un contexte au Nano Pulsar. ToneLab n'a pas vocation, dans cette partie, à documenter en détail des pédales absentes du rig.

### 10.3. Stéréo du Nano Pulsar

Le Nano Pulsar offre aussi une utilisation stéréo permettant des effets de panning.

Cette fonctionnalité est volontairement laissée hors du périmètre actuel : le rig ToneLab exploite le Nano Pulsar en mono.

---

## 11. Méthode expérimentale

### 11.1. Construire une référence simple

Commencer avec un son connu du Brunetti, sans autre changement de configuration.

Puis activer le Nano Pulsar avec un réglage volontairement simple :

```text
Triangle
Shape au centre
Depth modéré
Rate modéré
VOL compensé à l'écoute
```

Ce réglage n'est pas un preset ToneLab. Il constitue un point de départ méthodologique.

### 11.2. Étudier Rate

Conserver Shape, Depth et VOL identiques.

Faire varier uniquement Rate.

Observer :

- pulsation ;
- relation avec le tempo ;
- lisibilité du riff ;
- impression de mouvement.

### 11.3. Étudier Depth

Revenir à la référence puis faire varier uniquement Depth.

Identifier notamment :

- modulation discrète ;
- modulation prononcée ;
- apparition du comportement Warp.

### 11.4. Étudier Shape en mode Triangle

Comparer :

```text
Sawtooth montant
       |
       v
Triangle
       |
       v
Sawtooth descendant
```

Conserver Rate et Depth aussi proches que possible entre les essais.

### 11.5. Étudier Shape en mode Square

Comparer différentes largeurs d'impulsion.

Observer :

- durée relative des phases ;
- caractère plus ou moins haché ;
- intégration avec le rythme du morceau.

### 11.6. Étudier VOL séparément

Comparer :

1. niveau compensé ;
2. léger boost volontaire.

Cela permet de distinguer l'effet du tremolo lui-même de l'effet d'un niveau plus élevé envoyé au Brunetti.

### 11.7. Tester avec les saturations

Comparer au minimum :

```text
Clean + Nano Pulsar
```

```text
The Pelt + Nano Pulsar
```

```text
Tube Screamer + Nano Pulsar
```

```text
The Pelt + TS + Nano Pulsar
```

L'objectif est d'identifier si le mouvement reste lisible et musical lorsque la densité harmonique augmente.

### 11.8. Données à conserver dans ToneLab Profiles

Une expérience de modulation peut documenter :

```text
Guitare :
Micro :
Accordage :

Pédales actives avant Nano Pulsar :

Nano Pulsar :
VOL :
RATE :
DEPTH :
Mode : TRIANGLE / SQUARE
SHAPE :
Warp observé : OUI / NON

Canal Brunetti :
Gain :
Bass :
Mid :
Edge :
Master :
Bright / Focus :

Effets temporels actifs :
Baffle :
Niveau de test :

Observation :
Interprétation :
Décision :
```

Les réglages enregistrés dans ToneLab Profiles serviront ensuite à identifier les configurations réellement reproductibles.

---

## 12. À retenir

Le Nano Pulsar n'est pas uniquement un tremolo à vitesse variable.

Ses paramètres permettent d'agir sur plusieurs dimensions :

```text
RATE
  |
  +--> vitesse du mouvement

DEPTH
  |
  +--> profondeur
  +--> accès à la zone Warp à réglage élevé

VOL
  |
  +--> niveau de sortie
  +--> compensation ou boost

TRIANGLE / SQUARE
  |
  +--> grande famille de forme

SHAPE
  |
  +--> sawtooth montant
  +--> triangle
  +--> sawtooth descendant
  +--> largeur d'impulsion en mode Square
```

Dans ToneLab, son intérêt principal est de donner du **mouvement et de la texture à un signal déjà construit par les saturations et les égaliseurs**.

La stéréo n'est pas étudiée pour le moment, car l'utilisation actuelle est mono.

Les autres familles de modulation, notamment le phaser, permettent d'obtenir d'autres formes de mouvement mais ne font pas actuellement partie du rig ToneLab.

---

## 13. Sources techniques

- Electro-Harmonix, **Nano Pulsar Owner's Manual** : fonctionnement mono comme tremolo, commandes VOL / RATE / DEPTH / SHAPE, modes Triangle et Square, transformations de Shape, largeur d'impulsion en mode Square, Warp mode aux réglages élevés de Depth et boost allant jusqu'à 12 dB via VOL.
- Electro-Harmonix, **Nano Pulsar product page** : buffered bypass, modes Triangle / Square et formes de modulation disponibles.

---

## Navigation

[Index du chapitre 4](index.md)  
[Partie 3 - Les égaliseurs](part3.md)  
[Partie 5 - Delay et réverbération](part5.md)
