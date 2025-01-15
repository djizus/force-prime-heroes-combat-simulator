// ==UserScript==
// @name         Force Prime Heroes Combat Simulator
// @version      2.0
// @description  Fight projections for Force Prime Heroes
// @license      MIT
// @namespace    https://github.com/djizus
// @author       djizus
// @icon         https://forceprime.io/favicon.ico
// @match        https://forceprime.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    const UNITS_DATA = [
        // Recruitable Units
        {
            unit: "Centaur",
            id: 268,
            type: "Melee",
            attack: 3,
            hp: 12,
            power: 6,
            image: 'https://fp-heroes.gitbook.io/~gitbook/image?url=https%3A%2F%2F934968641-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FddK5n8mDIAsaa4AGx8yd%252Fuploads%252F3F1tv6IdfVuTIJQvab01%252Fa_centaur_cr.png%3Falt%3Dmedia%26token%3D46908737-a9da-45dd-b93f-8645df668488&width=300&dpr=4&quality=100&sign=eab3b18f&sv=2'
        },
        {
            unit: "Dwarf",
            id: 273,
            type: "Ranged",
            attack: 5,
            hp: 20,
            power: 10,
            image: 'https://fp-heroes.gitbook.io/~gitbook/image?url=https%3A%2F%2F934968641-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FddK5n8mDIAsaa4AGx8yd%252Fuploads%252FyRZ2FsAI5nk6QJ1JMY0z%252Fa_dwarf_cr.png%3Falt%3Dmedia%26token%3D7e488750-359c-4085-84f0-a52cc5298d96&width=300&dpr=1&quality=100&sign=db01bb00&sv=2'
        },
        {
            unit: "Crusader",
            id: 269,
            type: "Melee",
            attack: 4,
            hp: 36,
            power: 12,
            image: 'https://fp-heroes.gitbook.io/~gitbook/image?url=https%3A%2F%2F934968641-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FddK5n8mDIAsaa4AGx8yd%252Fuploads%252F0GFxza74x0ZznMQEx10d%252Fa_crusader_cr.png%3Falt%3Dmedia%26token%3D71357946-ff4a-492d-a579-d1278b59094a&width=300&dpr=1&quality=100&sign=47c6256e&sv=2'
        },
        {
            unit: "Monk",
            id: 270,
            type: "Ranged",
            attack: 12,
            hp: 27,
            power: 18,
            image: 'https://fp-heroes.gitbook.io/~gitbook/image?url=https%3A%2F%2F934968641-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FddK5n8mDIAsaa4AGx8yd%252Fuploads%252FEnu4nAr8lCtbjrLiXEEL%252Fa_monk_cr.png%3Falt%3Dmedia%26token%3Daef742fe-f80c-4211-85f3-cfcaa2e0d787&width=300&dpr=1&quality=100&sign=43c449a0&sv=2'
        },
        {
            unit: "Angel",
            id: 271,
            type: "Melee",
            attack: 15,
            hp: 60,
            power: 30,
            image: 'https://fp-heroes.gitbook.io/~gitbook/image?url=https%3A%2F%2F934968641-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FddK5n8mDIAsaa4AGx8yd%252Fuploads%252FTFKDbtgBU85MzDSk18eF%252Fa_angel_cr.png%3Falt%3Dmedia%26token%3D9bfc77d1-bf5f-45e5-918d-cf4aef20eb24&width=300&dpr=4&quality=100&sign=3edd77a1&sv=2'
        },
        // Enemy Units
        {
            unit: "Young Ent",
            id: 6,
            type: "Melee",
            attack: 2,
            hp: 8,
            power: 4,
            image: 'https://fp-heroes.gitbook.io/~gitbook/image?url=https%3A%2F%2F934968641-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FddK5n8mDIAsaa4AGx8yd%252Fuploads%252FopOmvQQFLTuCu6H2W3QG%252Fe_ent_small.png%3Falt%3Dmedia%26token%3D11f9bdd0-0c88-49e9-9a0d-bfd3ebd3cc3c&width=300&dpr=1&quality=100&sign=ac3e7fc9&sv=2'
        },
        {
            unit: "Skeleton Mage",
            id: 7,
            type: "Ranged",
            attack: 2,
            hp: 8,
            power: 4,
            image: 'https://fp-heroes.gitbook.io/~gitbook/image?url=https%3A%2F%2F934968641-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FddK5n8mDIAsaa4AGx8yd%252Fuploads%252F457tJhTWCyKkAGX85FEW%252Fe_skeleton_mage.png%3Falt%3Dmedia%26token%3Df8a12486-fc04-4cc3-9779-cb5743608ac3&width=300&dpr=1&quality=100&sign=830fd0db&sv=2'
        },
        {
            unit: "Fire Elemental",
            id: 8,
            type: "Melee",
            attack: 3,
            hp: 12,
            power: 6,
            image: 'https://fp-heroes.gitbook.io/~gitbook/image?url=https%3A%2F%2F934968641-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FddK5n8mDIAsaa4AGx8yd%252Fuploads%252FGyiI5vzj22IRe1WlkDuR%252Fe_fire_elemental.png%3Falt%3Dmedia%26token%3D0238fc21-41be-4c32-b2fa-ff7640161cf8&width=300&dpr=1&quality=100&sign=47bbace9&sv=2'
        },
        {
            unit: "Zombie",
            id: 9,
            type: "Melee",
            attack: 5,
            hp: 20,
            power: 10,
            image: 'https://fp-heroes.gitbook.io/~gitbook/image?url=https%3A%2F%2F934968641-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FddK5n8mDIAsaa4AGx8yd%252Fuploads%252FSMgIsCY6xe48jCDMzYeE%252Fe_zombie.png%3Falt%3Dmedia%26token%3D01d6e362-24ee-47cf-810f-cfbddf6027ac&width=300&dpr=1&quality=100&sign=52680acf&sv=2'
        },
        {
            unit: "Ent",
            id: 10,
            type: "Melee",
            attack: 4,
            hp: 25,
            power: 10,
            image: 'https://fp-heroes.gitbook.io/~gitbook/image?url=https%3A%2F%2F934968641-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FddK5n8mDIAsaa4AGx8yd%252Fuploads%252FyX6RojTPFMExXFTFvNJ8%252Fe_ent.png%3Falt%3Dmedia%26token%3D9f0acdc0-d4a1-4570-8e42-9504014bc4f8&width=300&dpr=1&quality=100&sign=fc135fd0&sv=2'
        },
        {
            unit: "Genie",
            id: 11,
            type: "Ranged",
            attack: 5,
            hp: 20,
            power: 10,
            image: 'https://fp-heroes.gitbook.io/~gitbook/image?url=https%3A%2F%2F934968641-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FddK5n8mDIAsaa4AGx8yd%252Fuploads%252FNRdaKK5EQIVLXbofcj9E%252Fe_genie.png%3Falt%3Dmedia%26token%3D79c99884-461f-47f8-8c4a-d68d6c1d02a1&width=300&dpr=1&quality=100&sign=d7020660&sv=2'
        },
        {
            unit: "Vampire",
            id: 12,
            type: "Melee",
            attack: 6,
            hp: 24,
            power: 12,
            image: 'https://fp-heroes.gitbook.io/~gitbook/image?url=https%3A%2F%2F934968641-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FddK5n8mDIAsaa4AGx8yd%252Fuploads%252FgD9jGYCiK4d9IS4uIQgX%252Fe_vampire.png%3Falt%3Dmedia%26token%3Dbe4bdcec-f71c-422b-a16a-ab1266ae4a7c&width=300&dpr=1&quality=100&sign=a2887bb9&sv=2'
        },
        {
            unit: "Cyclops",
            id: 13,
            type: "Ranged",
            attack: 10,
            hp: 40,
            power: 20,
            image: 'https://fp-heroes.gitbook.io/~gitbook/image?url=https%3A%2F%2F934968641-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FddK5n8mDIAsaa4AGx8yd%252Fuploads%252FyeUudyHKbuqEmYFuZscd%252Fe_cuclopus.png%3Falt%3Dmedia%26token%3D4b9b4563-d7a0-4d2c-b3c4-9008254f4a7b&width=300&dpr=1&quality=100&sign=cb134d82&sv=2'
        },
        {
            unit: "Minotaur",
            id: 14,
            type: "Melee",
            attack: 12,
            hp: 48,
            power: 24,
            image: 'https://fp-heroes.gitbook.io/~gitbook/image?url=https%3A%2F%2F934968641-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FddK5n8mDIAsaa4AGx8yd%252Fuploads%252FfMawMxGhpntWqJDKRlkS%252Fe_minotaur.png%3Falt%3Dmedia%26token%3D4f9d7af7-fe13-4bb0-8b14-d4cfe58cd254&width=300&dpr=1&quality=100&sign=dc96d758&sv=2'
        },
        {
            unit: "Necromancer",
            id: 15,
            type: "Melee",
            attack: 16,
            hp: 36,
            power: 24,
            image: 'https://fp-heroes.gitbook.io/~gitbook/image?url=https%3A%2F%2F934968641-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FddK5n8mDIAsaa4AGx8yd%252Fuploads%252F2rzRduu3bwZ62S7MnDKG%252Fe_necromancer.png%3Falt%3Dmedia%26token%3D3491d397-0ad3-44b3-8d6d-8b2821e7b449&width=300&dpr=1&quality=100&sign=d83a0fe1&sv=2'
        },
        {
            unit: "Fire Witch",
            id: 16,
            type: "Ranged",
            attack: 16,
            hp: 36,
            power: 24,
            image: 'https://fp-heroes.gitbook.io/~gitbook/image?url=https%3A%2F%2F934968641-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FddK5n8mDIAsaa4AGx8yd%252Fuploads%252FmneqlhCFnOwKVfjvY4yv%252Fe_fire_witch.png%3Falt%3Dmedia%26token%3D71ac96b4-d349-469a-84d5-a63d0502ac76&width=300&dpr=1&quality=100&sign=a401496f&sv=2'
        },
        {
            unit: "Fairy Dragon",
            id: 17,
            type: "Melee",
            attack: 20,
            hp: 80,
            power: 40,
            image: 'https://fp-heroes.gitbook.io/~gitbook/image?url=https%3A%2F%2F934968641-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FddK5n8mDIAsaa4AGx8yd%252Fuploads%252F2uiHRKi7msZYIcGON7e5%252Fe_fairy_dragon.png%3Falt%3Dmedia%26token%3Da5d4aede-0092-4839-8b49-e8f89a8612dd&width=300&dpr=1&quality=100&sign=bc79a059&sv=2'
        },
        {
            unit: "Titan",
            id: 18,
            type: "Ranged",
            attack: 20,
            hp: 80,
            power: 40,
            image: 'https://fp-heroes.gitbook.io/~gitbook/image?url=https%3A%2F%2F934968641-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FddK5n8mDIAsaa4AGx8yd%252Fuploads%252FU8KgdndrItXg8fHc2Z72%252Fe_titan.png%3Falt%3Dmedia%26token%3Dd04c7419-2e43-4b71-8dd3-56b3e9a38fd1&width=300&dpr=1&quality=100&sign=e0bfaa59&sv=2'
        },
        {
            unit: "Death",
            id: 19,
            type: "Melee",
            attack: 25,
            hp: 100,
            power: 50,
            image: 'https://fp-heroes.gitbook.io/~gitbook/image?url=https%3A%2F%2F934968641-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FddK5n8mDIAsaa4AGx8yd%252Fuploads%252F6DCUTNgLEOcMJ5eIvODw%252Fe_death.png%3Falt%3Dmedia%26token%3D36b5cad5-4d09-4cd6-a85a-249d9c0bca38&width=300&dpr=1&quality=100&sign=bae67d24&sv=2'
        },
        {
            unit: "Devil",
            id: 20,
            type: "Melee",
            attack: 50,
            hp: 200,
            power: 100,
            image: 'https://fp-heroes.gitbook.io/~gitbook/image?url=https%3A%2F%2F934968641-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FddK5n8mDIAsaa4AGx8yd%252Fuploads%252FNCe5Xx767UvpEfYPN3qG%252Fe_devil.png%3Falt%3Dmedia%26token%3D1c920ded-3968-4d37-9a7f-3676ff282d74&width=300&dpr=1&quality=100&sign=9250a5e1&sv=2'
        },
        {
            unit: "Bone Dragon",
            id: 21,
            type: "Melee",
            attack: 250,
            hp: 1000,
            power: 500,
            image: 'https://fp-heroes.gitbook.io/~gitbook/image?url=https%3A%2F%2F934968641-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FddK5n8mDIAsaa4AGx8yd%252Fuploads%252Fr3NwXYBYIfbWfCddJ2lB%252Fe_bone_dragon.png%3Falt%3Dmedia%26token%3D710e4f16-fefa-466c-b821-9720f9408b40&width=300&dpr=1&quality=100&sign=5c502264&sv=2'
        }
    ];

    async function getCurrentGameData() {
        try {
            console.log("Starting getCurrentGameData...");
            
            // Find the iframe
            let iframe = document.getElementById("game_iframe_bg");
            if (!iframe) {
                console.error("Iframe not found!");
                throw new Error("Game iframe not found");
            }
            console.log("Found iframe:", iframe);

            // Get and parse iframe src
            let src = iframe.getAttribute('src');
            if (!src) {
                console.error("Iframe src is empty!");
                throw new Error("Iframe src not found");
            }
            console.log("Iframe src:", src);

            // Parse URL parameters
            const urlParams = new URLSearchParams(src);
            const account = urlParams.get('account');
            const world_id = urlParams.get('world_id');
            console.log("Parsed parameters:", { account, world_id });

            if (!account || !world_id) {
                console.error("Missing required parameters:", { account, world_id });
                throw new Error("Required parameters not found");
            }

            // Get game ID
            console.log("Fetching game ID...");
            const gameResponse = await fetch(`https://forceprime.io/v2/dojo/player_game?player_id=${account}&world_id=${world_id}`, {
                method: "GET",
                headers: {
                    "priority": "u=1, i",
                }
            });
            const gameData = await gameResponse.json();
            console.log("Game data response:", gameData);
            const gameId = gameData["game_id"];
            console.log("Game ID:", gameId);

            // Get hero stats
            console.log("Fetching hero stats...");
            const heroStatsResponse = await fetch(`https://forceprime.io/v2/dojo/player_stats?game_id=${gameId}&world_id=${world_id}`, {
                method: "GET",
                headers: {
                    "priority": "u=1, i",
                }
            });
            const heroStats = await heroStatsResponse.json();
            console.log("Hero stats response:", heroStats);

            // Get roster data
            console.log("Fetching roster data...");
            const rosterDataResponse = await fetch(`https://forceprime.io/v2/dojo/player_units?game_id=${gameId}&world_id=${world_id}`, {
                method: "GET",
                headers: {
                    "priority": "u=1, i",
                }
            });
            const rosterData = await rosterDataResponse.json();
            console.log("Roster data response:", rosterData);

            // Update the UI with the retrieved data
            updateUIWithGameData(heroStats, rosterData);
        } catch (error) {
            console.error("Error in getCurrentGameData:", error);
            console.error("Stack trace:", error.stack);
        }
    }

    function calculateCurrentStatus() {
        console.log("Calculating current status...");
        
        // Get hero stats
        const heroAttack = parseFloat(document.getElementById('heroAttack').value) || 0;
        const heroDefense = parseFloat(document.getElementById('heroDefense').value) || 0;
        
        let totalPower = 0;
        let rangedAttack = 0;

        // Process each unit
        ['centaur', 'dwarf', 'crusader', 'monk', 'angel'].forEach(unitName => {
            const unitCount = parseInt(document.getElementById(`${unitName}Count`).value) || 0;
            if (unitCount > 0) {
                const unitData = UNITS_DATA.find(u => u.unit.toLowerCase() === unitName);
                if (unitData) {
                    // Calculate boosted stats
                    const boostedAttack = unitData.attack * unitCount * (1 + (heroAttack * 8 / 100));
                    const boostedHp = unitData.hp * unitCount * (1 + (heroDefense / 10));
                    
                    // Calculate unit stack power
                    const unitStackPower = Math.floor(Math.sqrt(boostedAttack * boostedHp));
                    totalPower += unitStackPower;

                    // Add to ranged attack if unit is ranged
                    if (unitData.type === "Ranged") {
                        rangedAttack += Math.floor(unitData.attack * unitCount * (1 + (heroAttack * 8 / 100)));
                    }

                    console.log(`${unitData.unit} stack:`, {
                        count: unitCount,
                        baseAttack: unitData.attack,
                        baseHp: unitData.hp,
                        boostedAttack: Math.floor(boostedAttack),
                        boostedHp: Math.floor(boostedHp),
                        stackPower: unitStackPower
                    });
                }
            }
        });

        // Update display
        const currentPowerSpan = document.getElementById('currentPower');
        const currentAttackSpan = document.getElementById('currentAttack');
        
        if (currentPowerSpan) currentPowerSpan.textContent = totalPower;
        if (currentAttackSpan) currentAttackSpan.textContent = rangedAttack;

        console.log("Final calculations:", {
            totalPower,
            rangedAttack
        });
    }

    function updateUIWithGameData(heroStats, rosterData) {
        console.log("Starting UI update with data:", { heroStats, rosterData });

        // Update hero stats
        const heroAttackInput = document.getElementById('heroAttack');
        const heroDefenseInput = document.getElementById('heroDefense');
        
        if (heroStats.success && heroStats.stats) {
            console.log("Updating hero stats:", heroStats.stats);
            heroAttackInput.value = heroStats.stats.attack || 0;
            heroDefenseInput.value = heroStats.stats.defence || 0;
        }

        // Update roster counts
        if (rosterData.success && rosterData.units) {
            console.log("Updating roster with units:", rosterData.units);
            
            // Reset all unit counts
            ['centaurCount', 'dwarfCount', 'crusaderCount', 'monkCount', 'angelCount'].forEach(inputId => {
                const input = document.getElementById(inputId);
                if (input) {
                    input.value = '0';
                    console.log(`Reset ${inputId} to 0`);
                }
            });

            // Update unit counts from response
            for (let i = 1; i <= 5; i++) {
                const unitId = rosterData.units[`unit_${i}_id`];
                const unitCount = rosterData.units[`unit_${i}_count`];
                console.log(`Processing unit ${i}:`, { unitId, unitCount });
                
                if (unitId && unitCount) {
                    const unitData = UNITS_DATA.find(u => u.id === unitId);
                    if (unitData) {
                        const input = document.getElementById(`${unitData.unit.toLowerCase()}Count`);
                        if (input) {
                            input.value = unitCount;
                            console.log(`Updated ${unitData.unit} count to ${unitCount}`);
                        }
                    }
                }
            }
            
            // Calculate current status after updating all values
            calculateCurrentStatus();
        }
    }

    const styles = `
    /* Container styles */
    .combat-simulator-wrapper {
        position: fixed;
        left: calc(100% - 270px);
        top: 120px;
        background-color: var(--fp-block-background);
        border-radius: 15px;
        color: #ffffffa6;
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        padding: 1rem;
        z-index: 9999;
        width: 240px;
        user-select: none;
    }

    /* Header styles */
    .simulator-header {
        cursor: move;
        padding: 8px;
        margin: -1rem -1rem 1rem -1rem;
        background: var(--fp-main-color);
        border-radius: 15px 15px 0 0;
        color: #000;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
    }

    /* Button styles */
    .simulator-button {
        padding: 6px 12px;
        font-size: 0.9em;
        width: auto;
        min-width: 120px;
        background-color: #ffd700;
        border: 1px solid #b39700;
        color: #000;
        cursor: pointer;
    }

    .simulator-button:hover {
        background-color: #ffed4a;
    }

    /* Input and Select styles */
    .simulator-input,
    select.simulator-input {
        background: #ffffff1a;
        border: none;
        border-radius: 10px;
        color: #fff;
        font-size: 12px;
        margin-bottom: 4px;
        outline: none;
        padding: 4px 8px;
        text-align: left;
        width: 80px;
        height: 24px;
        box-sizing: border-box;
    }

    select.simulator-input {
        width: 100%;
        text-align: left;
        text-align-last: left;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        cursor: pointer;
        background-color: #ffffff1a;
    }

    select.simulator-input option {
        background-color: #1a1a1a;
        color: #fff;
        padding: 8px;
    }

    /* Grid layouts */
    .unit-grid,
    .enemy-inputs {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 8px;
        align-items: center;
        margin-bottom: 4px;
    }

    /* Section styles */
    .simulator-section {
        margin-bottom: 16px;
    }

    .simulator-section-title {
        font-size: 16px;
        color: var(--fp-main-color);
        margin-bottom: 8px;
    }

    /* Current Status styles */
    .current-status {
        display: grid;
        grid-template-columns: auto 1fr auto 1fr;
        gap: 8px;
        align-items: center;
        margin-bottom: 8px;
    }

    .current-status div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--fp-main-color);
        font-size: 12px;
    }

    /* Unit label styles */
    .unit-label,
    .current-status-label {
        color: #fff;
        font-size: 12px;
    }

    /* Enemy section adjustments */
    .enemy-inputs {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 8px;
        margin-bottom: 8px;
    }

    .enemy-inputs .simulator-input {
        height: 32px;
    }

    .enemy-inputs .unit-select {
        min-width: 120px;
    }

    /* Unit icon styles */
    .unit-icon {
        width: 24px;
        height: 24px;
        vertical-align: middle;
        margin-right: 4px;
        object-fit: contain;
    }

    .unit-label {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    /* Style select options with images */
    select.simulator-input option {
        background-color: #1a1a1a;
        color: #fff;
        padding: 8px 8px 8px 32px;
        background-repeat: no-repeat;
        background-position: 4px center;
        background-size: 24px;
    }

    /* Panel and grid styles */
    .combat-simulator-wrapper {
        width: 240px;  /* Reduced from default width */
    }

    .unit-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 8px;
        align-items: start;
    }

    .unit-column {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
    }

    .unit-icon {
        width: 32px;
        height: 32px;
        object-fit: contain;
    }

    .simulator-input {
        width: 100%;
        min-width: 0;
    }

    /* Select styles */
    .simulator-input.unit-select {
        padding-left: 32px;
        background-repeat: no-repeat;
        background-position: 4px center;
        background-size: 24px;
    }

    /* Style select options */
    .simulator-input.unit-select option {
        background-color: #1a1a1a;
        color: #fff;
        padding-left: 32px;
        background-repeat: no-repeat;
        background-position: 4px center;
        background-size: 24px;
    }

    /* Hero Power grid */
    .hero-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        margin-bottom: 16px;
    }

    .hero-input-group {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .hero-grid .simulator-input {
        width: 100%;
        min-width: 80px;
        height: 32px;
    }

    /* Roster grid */
    .unit-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        margin-bottom: 8px;
    }

    .unit-grid.second-row {
        grid-template-columns: repeat(3, 1fr);
        width: 100%;
        margin: 0;
    }

    .unit-grid.second-row .unit-column:first-child {
        grid-column: 1;
    }

    .unit-grid.second-row .unit-column:last-child {
        grid-column: 2;
    }

    .unit-column {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }

    .unit-column .simulator-input {
        width: 100%;
        min-width: 60px;
        height: 32px;
    }
`;

    // Add styles to document
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Create improved simulator HTML
    function createSimulatorHTML() {
        // Get only recruitable units (first 5 units)
        const recruitableUnits = UNITS_DATA.slice(0, 5);

        // Update the roster section HTML generation
        const rosterHTML = `
            <div class="unit-grid">
                ${recruitableUnits.slice(0, 3).map(unit => `
                    <div class="unit-column">
                        <img src="${unit.image}" alt="${unit.unit}" class="unit-icon">
                        <input type="number" class="simulator-input" id="${unit.unit.toLowerCase()}Count" value="0" min="0">
                    </div>
                `).join('')}
            </div>
            <div class="unit-grid second-row">
                ${recruitableUnits.slice(3, 5).map(unit => `
                    <div class="unit-column">
                        <img src="${unit.image}" alt="${unit.unit}" class="unit-icon">
                        <input type="number" class="simulator-input" id="${unit.unit.toLowerCase()}Count" value="0" min="0">
                    </div>
                `).join('')}
            </div>`;

        // Update the enemy select options
        const enemyOptionsHTML = UNITS_DATA.map(unit => 
            `<option value="${unit.unit}" data-icon="${unit.image}" 
             data-attack="${unit.attack}" data-hp="${unit.hp}" data-power="${unit.power}">${unit.unit}</option>`
        ).join('');

        return `
            <header class="simulator-header">
                <h3>Combat Simulator</h3>
                <button type="button" class="minimize-btn" aria-label="Toggle panel">−</button>
            </header>
            <main class="simulator-content">
                <section class="simulator-section">
                    <h4 class="simulator-section-title">Current Status</h4>
                    <div class="current-status">
                        <label class="current-status-label">Power:</label>
                        <span id="currentPower">0</span>
                        <label class="current-status-label">Attack:</label>
                        <span id="currentAttack">0</span>
                    </div>
                    <button type="button" class="simulator-button" id="getCurrentData">Get Current Data</button>
                </section>

                <section class="simulator-section">
                    <h4 class="simulator-section-title">Hero Power</h4>
                    <div class="hero-grid">
                        <div class="hero-input-group">
                            <label for="heroAttack" class="unit-label">Attack:</label>
                            <input type="number" class="simulator-input" id="heroAttack" value="0" min="0">
                        </div>
                        <div class="hero-input-group">
                            <label for="heroDefense" class="unit-label">Defense:</label>
                            <input type="number" class="simulator-input" id="heroDefense" value="0" min="0">
                        </div>
                    </div>
                </section>

                <section class="simulator-section">
                    <h4 class="simulator-section-title">Roster</h4>
                    ${rosterHTML}
                </section>

                <section class="simulator-section">
                    <h4 class="simulator-section-title">Enemy</h4>
                    <div class="enemy-section">
                        <div class="enemy-inputs">
                            <select class="simulator-input unit-select" id="enemyUnit">
                                ${enemyOptionsHTML}
                            </select>
                            <input type="number" class="simulator-input" id="enemyPower" placeholder="Power" min="0">
                        </div>
                        <button type="button" class="simulator-button" id="calculateFight">Calculate Fight</button>
                    </div>
                </section>

                <section class="simulator-results" id="results" aria-live="polite"></section>
            </main>
        `;
    }

    // Create and add the simulator to the page
    function initializeSimulator() {
        const wrapper = document.createElement('div');
        wrapper.className = 'combat-simulator-wrapper';
        wrapper.innerHTML = createSimulatorHTML();
        
        // Set initial styles before appending
        wrapper.style.position = 'fixed';
        wrapper.style.zIndex = '9999';
        
        // Default position if none saved
        wrapper.style.right = '20px';
        wrapper.style.top = '20px';
        
        // Restore position if saved
        const savedPosition = localStorage.getItem('simulatorPosition');
        if (savedPosition) {
            const { x, y } = JSON.parse(savedPosition);
            wrapper.style.left = `${x}px`;
            wrapper.style.top = `${y}px`;
            // Remove right positioning when restoring saved position
            wrapper.style.right = '';
        }
        
        // Now append to document
        document.body.appendChild(wrapper);
        
        // Handle minimized state
        const content = wrapper.querySelector('.simulator-content');
        const minimizeBtn = wrapper.querySelector('.minimize-btn');
        const savedMinimized = localStorage.getItem('simulatorMinimized');
        
        if (savedMinimized === 'true') {
            content.style.display = 'none';
            minimizeBtn.textContent = '+';
        } else {
            content.style.display = 'block';
            minimizeBtn.textContent = '−';
        }
        
        // Make draggable
        makeDraggable(wrapper);
        
        // Add minimize functionality
        minimizeBtn.addEventListener('click', () => {
            if (content.style.display === 'none') {
                content.style.display = 'block';
                minimizeBtn.textContent = '−';
                localStorage.setItem('simulatorMinimized', 'false');
            } else {
                content.style.display = 'none';
                minimizeBtn.textContent = '+';
                localStorage.setItem('simulatorMinimized', 'true');
            }
        });

        // Handle window resizing
        window.addEventListener('resize', () => {
            // Ensure panel stays within viewport bounds when window is resized
            const maxX = window.innerWidth - wrapper.offsetWidth;
            const maxY = window.innerHeight - wrapper.offsetHeight;
            
            const currentLeft = parseInt(wrapper.style.left) || wrapper.offsetLeft;
            const currentTop = parseInt(wrapper.style.top) || wrapper.offsetTop;

            if (currentLeft > maxX) wrapper.style.left = maxX + 'px';
            if (currentTop > maxY) wrapper.style.top = maxY + 'px';
        });

        // Handle enemy unit select
        const enemySelect = wrapper.querySelector('#enemyUnit');
        
        function updateSelectImage() {
            const selectedOption = enemySelect.options[enemySelect.selectedIndex];
            const iconUrl = selectedOption.getAttribute('data-icon');
            enemySelect.style.backgroundImage = `url(${iconUrl})`;
        }

        enemySelect.addEventListener('change', updateSelectImage);
        updateSelectImage(); // Initialize with first option

        // Add Get Current Data button handler
        const getCurrentDataBtn = wrapper.querySelector('#getCurrentData');
        if (getCurrentDataBtn) {
            getCurrentDataBtn.addEventListener('click', getCurrentGameData);
        }

        // Add input event listeners for auto-calculation
        const inputs = wrapper.querySelectorAll('.simulator-input');
        inputs.forEach(input => {
            input.addEventListener('input', calculateCurrentStatus);
        });
    }

    // Improved draggable functionality
    function makeDraggable(element) {
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        element.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        function dragStart(e) {
            // Ignore if clicking input or button
            if (e.target.tagName.toLowerCase() === 'input' || 
                e.target.tagName.toLowerCase() === 'button' ||
                e.target.tagName.toLowerCase() === 'select') {
                return;
            }

            e.preventDefault();
            
            // Get current position from the style properties
            const rect = element.getBoundingClientRect();
            xOffset = rect.left;
            yOffset = rect.top;
            
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            isDragging = true;
        }

        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                
                // Create an invisible overlay while dragging
                let overlay = document.getElementById('drag-overlay');
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.id = 'drag-overlay';
                    overlay.style.position = 'fixed';
                    overlay.style.top = '0';
                    overlay.style.left = '0';
                    overlay.style.width = '100%';
                    overlay.style.height = '100%';
                    overlay.style.zIndex = '9998';
                    document.body.appendChild(overlay);
                }
                
                // Calculate new position
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;

                // Keep panel within viewport bounds
                const rect = element.getBoundingClientRect();
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                // Restrict horizontal movement to viewport width
                if (currentX < 0) currentX = 0;
                if (currentX > viewportWidth - rect.width) currentX = viewportWidth - rect.width;
                
                // Restrict vertical movement to viewport height
                if (currentY < 0) currentY = 0;
                if (currentY > viewportHeight - rect.height) currentY = viewportHeight - rect.height;

                xOffset = currentX;
                yOffset = currentY;

                setTranslate(currentX, currentY, element);
            }
        }

        function setTranslate(xPos, yPos, el) {
            el.style.left = `${xPos}px`;
            el.style.top = `${yPos}px`;
        }

        function dragEnd() {
            isDragging = false;
            
            const overlay = document.getElementById('drag-overlay');
            if (overlay) {
                overlay.remove();
            }
            
            initialX = currentX;
            initialY = currentY;

            // Save position to localStorage
            localStorage.setItem('simulatorPosition', JSON.stringify({
                x: currentX,
                y: currentY
            }));
        }
    }

    // Initialize the simulator when the page is ready
    if (document.readyState === 'complete') {
        initializeSimulator();
    } else {
        window.addEventListener('load', initializeSimulator);
    }
})();