# Starcraft II campaign

For instructions on how to play, read the in-app sidebar. [Click here to check out the latest version](https://tukkek.github.io/starcraft2-campaign/)!

## Features

* Supports 343 official Legacy of the Void maps by Blizzard, organized into 12 map categories
* 7 base planet types, each based on different map categories
* Generates open-ended campaigns with an average of 40 tiles each
* Each battle has an unique team setup, taking into consideration the current state of the campaign map
* Generates any amount of campaigns, instantly, from your browser

Current planets and variations:

* Paradise planet (lush, water): 74 maps on pool
* Gas planet (orbital): 41 maps on pool
* Factory planet (industrial, urban): 69 maps on pool
* Rock planet (rocky): 59 maps on pool
* Ice planet (cold): 33 maps on pool
 * Ice shrine planet (cold, temple): 57 maps on pool
 * Corrupt ice planet (cold, dark, toxic): 75 maps on pool
* Desert planet (desert): 34 maps on pool
 * Desert shrine planet (desert, temple): 59 maps on pool
 * Corrupt desert planet (desert, dark, toxic): 76 maps on pool
* Scorching planet (inferno): 26 maps on pool
 * Scorching shrine planet (inferno, temple): 51 maps on pool
 * Corrupt scorching planet (inferno, dark, toxic): 68 maps on pool
 
## Campaign generation

The layout of the campaign map is generated randomly, with a 50% chance of each tile representing a battle or not. On a small number of maps, these tiles may not connect all the way through from bottom to top - on those cases either generate a new campaign by reloading or consider distant tiles to be connected as needed. 

Race placement is simple but effective in generating maps that make some common-sense at an eye-glance. An expansion-simulation generation phase works by turns, until every open tile is occupied. During each turn:

1. Races may be seeded on a random empty spot on the planet. This may range from zero to all three races being seeded.
2. For each occupied tile, already-placed races have a small chance of expanding their territory to all adjacent neighboring tiles (possibly capturing territories from other races in the process).

Each campaign is centered around a given planet type, in the hopes of delivering a thematically-strong and cohesive experience - from highly technological urban planets to lush tropical planets and even gas planets where only orbital stations are featured!

Particular care was put into maximizing the breadth of possiible gameplay scenarions while minimizing any immersion-breaking aspects, as much as possible. Each planet type has a curated, large pool of maps which should almost always ensure that every tile represents an unique in-game battle map, without repeats. (Given some constraints and circumstances, battle maps may end up repeating but these should be relatively rare).

If a base planet type doesn't have enough battle maps to cover the average campaign map without repeats, variations are used to increase the map pool. Those variations may apply to multiple base planet types and have been equally curated in an attempt to produce a large amount of gameplay scenarios in unique, thematically-coherent experience every time a new campaign is generated.
