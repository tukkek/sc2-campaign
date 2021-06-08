# Starcraft II campaign

For instructions on how to play, read the in-app sidebar. [Click here to check out the latest version](https://tukkek.github.io/starcraft2-campaign/)!

## Features

* Built-in rules for campaign credits and goals, making each campaign much more than a series of battles
* Supports 343 official Legacy of the Void maps by Blizzard, organized into 12 map categories
* 7 base planet types, each based on different map categories
* Generates open-ended campaigns with an average of 40 tiles each
* Each battle has an unique team setup, taking into consideration the current state of the campaign map
* Generates any amount of campaigns, instantly, from your browser

Current planets and variations:

* paradise planet (lush, water): 81 maps on pool
* gas planet (orbital): 41 maps on pool
* factory planet (industrial, urban): 75 maps on pool
* tectonic planet (rocky): 64 maps on pool
* ice planet (cold): 36 maps on pool
  * ice shrine planet (cold, temple): 62 maps on pool
  * corrupt ice planet (cold, dark, toxic): 82 maps on pool
* desert planet (desert): 37 maps on pool
  * desert shrine planet (desert, temple): 64 maps on pool
  * corrupt desert planet (desert, dark, toxic): 83 maps on pool
* scorching planet (inferno): 28 maps on pool
  * scorching shrine planet (inferno, temple): 56 maps on pool
  * corrupt scorching planet (inferno, dark, toxic): 74 maps on pool
  
## Goal cards

Since the customization options for custom melee matches are limited in Starcraft II, the most common progression approach of unlocking and enhancing units and tech isn't possible. Instead, a deck of goal cards is built into the campaign rules, allowing players to buy and complete gameplay goals in return for extra credit. More importantly, players can develop and invest in a set of permanent long-term campaign goals.

While this is an interesting system in itself for gaining more credits during a campaign, its ultimate goal is to nudge players into different (and possibly even unconventional) playstyles during each campaign - encouraging players to develop new strategies and manage their goal cards carefully to make the most out of them. It is almost impossible to end-up with an ideal set of cards so experimentation and gradual tuning is highly incentivized - while at the same time being a completely optional system that can be ignored.

If a player focuses their campaign on a single race, many of the goals will turn out to be impossible to complete - however, if they are unwilling to play a different race in order to claim those goals, the cards can still be sold for half the price of a new one, making it easy ot "fish" for more appropriate cards.
 
## Campaign generation

The layout of the campaign map is generated randomly, with a 50% chance of each tile representing a battle or not. On a small number of maps, these tiles may not connect all the way through from bottom to top - on those cases either generate a new campaign by reloading or consider distant tiles to be connected as needed. 

Race placement is simple but effective in generating maps that make some common-sense at an eye-glance. An expansion-simulation generation phase works by turns, until every open tile is occupied. During each turn:

1. Races may be seeded on a random empty spot on the planet. This may range from zero to all three races being seeded.
2. For each occupied tile, already-placed races have a small chance of expanding their territory to all adjacent neighboring tiles (possibly capturing territories from other races in the process).

Each campaign is centered around a given planet type, in the hopes of delivering a thematically-strong and cohesive experience - from highly technological urban planets to lush tropical planets and even gas planets where only orbital stations are featured!

Particular care was put into maximizing the breadth of possiible gameplay scenarions while minimizing any immersion-breaking aspects, as much as possible. Each planet type has a curated, large pool of maps which should almost always ensure that every tile represents an unique in-game battle map, without repeats. (Given some constraints and circumstances, battle maps may end up repeating but these should be relatively rare).

If a base planet type doesn't have enough battle maps to cover the average campaign map without repeats, variations are used to increase the map pool. Those variations may apply to multiple base planet types and have been equally curated in an attempt to produce a large amount of gameplay scenarios for a unique, thematically-coherent experience every time a new campaign is generated.

To increase gameplay- and thematic-variety within a campaign, planets have 10% of their map pools comprised of maps foreign to their native themes. While it makes sense for planets to have varied micro-biomes, this can result in a very small chance of mismatches happening (like an ice-based map being next to a volcano map) but thankfully the odds are fairly low as the foreign maps themselves are relatively rare, making it easy to apply a degree of suspension of disbelief then. (Orbital maps and planets are exempt from this step, as adding high-orbit maps to a land-based campaign and vice-versa makes little sense in this context).
