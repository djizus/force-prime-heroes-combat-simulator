// ==UserScript==
// @name         Force Prime Heroes Combat Simulator
// @version      1.5
// @description  Fight projections for Force Prime Heroes
// @license      MIT
// @namespace    https://github.com/djizus
// @author       djizus
// @icon         https://forceprime.io/favicon.ico
// @match        https://forceprime.io/play?*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Initial roster data
    let roster = [
        {"Unit": "Centaur", "Number": 0, "ID": 98},
        {"Unit": "Dwarf", "Number": 0, "ID": 103},
        {"Unit": "Crusader", "Number": 0, "ID": 99},
        {"Unit": "Monk", "Number": 0, "ID": 110},
        {"Unit": "Angel", "Number": 0, "ID": 96}
    ];

	let heroPower = [
        {"Stat": "Attack", "Number": 0},
        {"Stat": "Defense", "Number": 0}
	];

    let unitData = [
        {"Unit": "Centaur", "Type": "Melee", "Atk": 3, "HP": 12, "Power": 6, "Cost": 150, "Weekly spawn": 16},
        {"Unit": "Dwarf", "Type": "Ranged", "Atk": 5, "HP": 20, "Power": 10, "Cost": 250, "Weekly spawn": 12},
        {"Unit": "Crusader", "Type": "Melee", "Atk": 4, "HP": 36, "Power": 12, "Cost": 350, "Weekly spawn": 12},
        {"Unit": "Monk", "Type": "Ranged", "Atk": 12, "HP": 27, "Power": 18, "Cost": 500, "Weekly spawn": 8},
        {"Unit": "Angel", "Type": "Melee", "Atk": 15, "HP": 60, "Power": 30, "Cost": 800, "Weekly spawn": 5},
        {"Unit": "Young Ent", "Type": "Melee", "Atk": 2, "HP": 8, "Power": 4},
        {"Unit": "Skeleton Mage", "Type": "Ranged", "Atk": 2, "HP": 8, "Power": 4},
        {"Unit": "Fire Elemental", "Type": "Melee", "Atk": 3, "HP": 12, "Power": 6},
        {"Unit": "Zombie", "Type": "Melee", "Atk": 5, "HP": 20, "Power": 10},
        {"Unit": "Ent", "Type": "Melee", "Atk": 4, "HP": 25, "Power": 10},
        {"Unit": "Genie", "Type": "Ranged", "Atk": 5, "HP": 20, "Power": 10},
        {"Unit": "Vampire", "Type": "Melee", "Atk": 6, "HP": 24, "Power": 12},
        {"Unit": "Cyclops", "Type": "Ranged", "Atk": 10, "HP": 40, "Power": 20},
        {"Unit": "Minotaur", "Type": "Melee", "Atk": 12, "HP": 48, "Power": 24},
        {"Unit": "Necromancer", "Type": "Melee", "Atk": 16, "HP": 36, "Power": 24},
        {"Unit": "Fire Witch", "Type": "Ranged", "Atk": 16, "HP": 36, "Power": 24},
        {"Unit": "Fairy Dragon", "Type": "Melee", "Atk": 20, "HP": 80, "Power": 40},
        {"Unit": "Titan", "Type": "Ranged", "Atk": 20, "HP": 80, "Power": 40},
        {"Unit": "Death", "Type": "Melee", "Atk": 25, "HP": 100, "Power": 50},
        {"Unit": "Devil", "Type": "Melee", "Atk": 50, "HP": 200, "Power": 100},
        {"Unit": "Bone Dragon", "Type": "Melee", "Atk": 250, "HP": 1000, "Power": 500}
    ];

    // Function to parse URL parameters
    function parseUrlParams(url) {
        let params = {};
        let queryString = url.split('?')[1];
        if (queryString) {
            queryString.split('&').forEach(item => {
                let pair = item.split('=');
                params[pair[0]] = decodeURIComponent(pair[1] || '');
            });
        }
        return params;
    }
	
    // Function to calculate roster atk
    function calculateRosterAtk(roster, heroPower, unitData) {
        let rosterAtk = 0;
        const heroAtk = heroPower.find(stat => stat.Stat === "Attack").Number;
        roster.forEach(unit => {
            const unitInfo = unitData.find(info => info.Unit === unit.Unit);
            if (unitInfo.Type === "Ranged") {
                rosterAtk += Math.floor(unitInfo.Atk * unit.Number * (1 + heroAtk * 8 / 100));
				console.log(rosterAtk);
            }
        });
        return rosterAtk;
    }

    // Function to calculate roster power
    function calculateRosterPower(roster, heroPower, unitData) {
        let rosterPower = 0;
        const heroAtk = heroPower.find(stat => stat.Stat === "Attack").Number;
        const heroDef = heroPower.find(stat => stat.Stat === "Defense").Number;
        roster.forEach(unit => {
            const unitInfo = unitData.find(info => info.Unit === unit.Unit);
            if (unitInfo) {				
                rosterPower += Math.floor(Math.sqrt(
                    unitInfo.Atk * unit.Number * (1 + heroAtk * 8 / 100) * unitInfo.HP * unit.Number * (1 + heroDef / 10)
                ));
            }
        });
        return rosterPower;
    }

    // Function to calculate fight
    function calculateFight(enemyUnit, enemyPower, roster, heroPower, unitData) {
        let damageDealt = 0;
        let splitStacksNumber = 0;
        const heroAtk = heroPower.find(stat => stat.Stat === "Attack").Number;
        const heroDef = heroPower.find(stat => stat.Stat === "Defense").Number;
        const enemy = unitData.find(unit => unit.Unit === unitData[enemyUnit].Unit);
        const enemyNumber = enemyPower / enemy.Power;

        roster.forEach(unit => {
            const unitInfo = unitData.find(info => info.Unit === unit.Unit);
            if (unitInfo && unit.Number > 0) {
                splitStacksNumber += 1;
                if (unitInfo.Type === "Ranged") {
                    damageDealt += unitInfo.Atk * unit.Number * (1 + heroAtk / 10);
                }
            }
        });

        let enemyLeft = Math.ceil((enemyNumber * enemy.HP - damageDealt) / enemy.HP);
        let enemyPowerLeft = enemyLeft * enemy.Power;
        let damageTaken = 0;

        if (enemy.Type === "Ranged") {
            damageTaken += enemyNumber * enemy.Atk;
            let damageTakenByStack = damageTaken / splitStacksNumber;
            roster.forEach(unit => {
                const unitInfo = unitData.find(info => info.Unit === unit.Unit);
                if (unitInfo && unit.Number > 0) {
                    let unitHp = unitInfo.HP * (1 + heroDef / 10);
                    unit.Number = Math.ceil((unit.Number * unitHp - damageTakenByStack) / unitHp);
                }
            });
        }

        let powerLeft = calculateRosterPower(roster, heroPower, unitData);

        if (enemyPowerLeft < 0) enemyPowerLeft = 0;
        let casualtiesPercentage = Math.floor((enemyPowerLeft / powerLeft) ** 2 * 100) / 100;

        roster.forEach(unit => {
            if (unit.Number > 0) {
                let casualtiesToApply = Math.floor(unit.Number * casualtiesPercentage);
                unit.Number -= casualtiesToApply;
                if (unit.Number < 0) unit.Number = 0;
            }
        });

        powerLeft = calculateRosterPower(roster, heroPower, unitData);

        let resultString = `<strong>Power Left:</strong> ${powerLeft}<br>`;
        resultString += '<strong>Units Left:</strong><br>';
        resultString += roster.map(unit => `${unit.Unit}: ${unit.Number}`).join('<br>');
        return resultString;
    }
    
	// Function to refresh roster power and attack stat
	function refreshCurrentPowerAtk(roster, heroPower, unitData) {
		let power = calculateRosterPower(roster, heroPower, unitData);
		let atk = calculateRosterAtk(roster, heroPower, unitData);
		let resultString = `<strong>Current Power:</strong> ${power}<br><strong>Current Attack:</strong> ${atk}<br>`;
		return resultString;
	}
	
	async function getCurrentData(container, roster, heroPower, unitData) {
		// Find the iframe element by its id or class
		let iframe = document.getElementById("game_iframe_bg");
		if (iframe) {
			// Get the src attribute value
			let src = iframe.getAttribute('src');
			// Parse the URL parameters
			let params = parseUrlParams(src);
			// Extract individual variables
			let private_key = params['private_key'];
			let public_key = params['public_key'];
			let account = params['account'];
			let access_token = params['access_token'];
			let sid = params['sid'];
			let uid = params['uid'];
			let world_id = params['world_id'];
			let server_url = params['server'];
			let torii = params['torii'];
			let contract = params['contract'];
			// Get game ID
			const gameResponse = await fetch(`https://forceprime.io/dojo/player_game?player_id=${account}&world_id=${world_id}`, {
				method: "GET",
				headers: {
					"priority": "u=1, i",
				}
			});
			const gameData = await gameResponse.json();
			const gameId = gameData["game_id"];
			// Get hero stats
			const heroStatsResponse = await fetch(`https://forceprime.io/dojo/player_stats?game_id=${gameId}&world_id=${world_id}`, {
				method: "GET",
				headers: {
					"priority": "u=1, i",
				}
			});
			const heroStats = await heroStatsResponse.json();
			// Update our data
			heroPower.find(stat => stat.Stat === "Attack").Number = heroStats.stats.attack;
			heroPower.find(stat => stat.Stat === "Defense").Number = heroStats.stats.defence;
			// Get roster data
			const rosterDataResponse = await fetch(`https://forceprime.io/dojo/player_units?game_id=${gameId}&world_id=${world_id}`, {
				method: "GET",
				headers: {
					"priority": "u=1, i",
				}
			});
			const rosterData = await rosterDataResponse.json();
			// Update our data
			roster.forEach(unit => {unit.Number = 0});
			if (rosterData.units.unit_1_id != 0) {
				roster.find(unit => unit.ID === rosterData.units.unit_1_id).Number = rosterData.units.unit_1_count;
			}
			if (rosterData.units.unit_2_id != 0) {
				roster.find(unit => unit.ID === rosterData.units.unit_2_id).Number = rosterData.units.unit_2_count;
			}
			if (rosterData.units.unit_3_id != 0) {
				roster.find(unit => unit.ID === rosterData.units.unit_3_id).Number = rosterData.units.unit_3_count;
			}
			if (rosterData.units.unit_4_id != 0) {
				roster.find(unit => unit.ID === rosterData.units.unit_4_id).Number = rosterData.units.unit_4_count;
			}
			if (rosterData.units.unit_5_id != 0) {
				roster.find(unit => unit.ID === rosterData.units.unit_5_id).Number = rosterData.units.unit_5_count;
			}
			document.getElementById("powerAtkDiv").innerHTML = refreshCurrentPowerAtk(roster, heroPower, unitData);
			document.getElementById("input_Attack").value = heroPower.find(stat => stat.Stat === "Attack").Number;
			document.getElementById("input_Defense").value = heroPower.find(stat => stat.Stat === "Defense").Number;
			
			document.getElementById("input_Centaur").value = roster.find(unit => unit.Unit === "Centaur").Number;
			document.getElementById("input_Dwarf").value = roster.find(unit => unit.Unit === "Dwarf").Number;
			document.getElementById("input_Crusader").value = roster.find(unit => unit.Unit === "Crusader").Number;
			document.getElementById("input_Monk").value = roster.find(unit => unit.Unit === "Monk").Number;
			document.getElementById("input_Angel").value = roster.find(unit => unit.Unit === "Angel").Number;
			return "OK";
		}
		return "KO";
	}

    // Create UI container
	const container = document.createElement('div');
	container.style.padding = '1%';
	container.style.backgroundColor = 'black';
	container.style.border = '1px solid white';
	container.style.position = 'fixed';
	container.style.top = '15%';
	container.style.right = '2%';
	container.style.width = '18%';
	container.style.height = '75%';
	container.style.overflowY = 'auto';
	container.style.zIndex = '1000';

    // Create hero data div
	const refreshDataText = document.createElement('div');
	refreshDataText.id = 'powerAtkDiv'
	refreshDataText.style.color = 'white';
	refreshDataText.style.marginTop = '1%';
	refreshDataText.innerHTML = '<strong>Current Power:</strong> 0<br><strong>Current Attack:</strong> 0<br>';
	
    // Create refresh data button
	const refreshDataButton = document.createElement('button');
	refreshDataButton.textContent = 'Get Current Data';

	refreshDataButton.addEventListener('click', () => {
		getCurrentData(container, roster, heroPower, unitData);
	});
	
    // Create player stats display
	const heroPowerDisplay = document.createElement('div');
	heroPowerDisplay.innerHTML = '<strong>Hero Power</strong><br>';
	heroPower.forEach(stat => {
		const statContainer = document.createElement('div');
		statContainer.style.display = 'flex';
		statContainer.style.alignItems = 'center';
		statContainer.style.justifyContent = 'space-between';
		statContainer.style.marginBottom = '1%';

		const statName = document.createElement('span');
		statName.textContent = `${stat.Stat} : `;
		statName.style.color = 'white';
		statName.style.flex = '1';
		statName.style.textAlign = 'left';

		const statNumberInput = document.createElement('input');
		statNumberInput.id = `input_${stat.Stat}`;
		statNumberInput.type = 'number';
		statNumberInput.value = stat.Number;
		statNumberInput.min = 0;
		statNumberInput.style.width = '50%';
		statNumberInput.style.backgroundColor = 'black';
		statNumberInput.style.color = 'white';
		statNumberInput.style.border = '1px solid white';
		statNumberInput.style.textAlign = 'right';

		statNumberInput.addEventListener('input', () => {
			stat.Number = parseInt(statNumberInput.value) || 0;
			refreshDataText.innerHTML = refreshCurrentPowerAtk(roster, heroPower, unitData);
		});

		statContainer.appendChild(statName);
		statContainer.appendChild(statNumberInput);
		heroPowerDisplay.appendChild(statContainer);
	});
    
	// Create player roster display
	const rosterDisplay = document.createElement('div');
	rosterDisplay.innerHTML = '<strong>Roster</strong><br>';
	roster.forEach(unit => {
		const unitContainer = document.createElement('div');
		unitContainer.style.display = 'flex';
		unitContainer.style.alignItems = 'center';
		unitContainer.style.justifyContent = 'space-between';
		unitContainer.style.marginBottom = '1%';

		const unitName = document.createElement('span');
		unitName.textContent = `${unit.Unit} : `;
		unitName.style.color = 'white';
		unitName.style.flex = '1';
		unitName.style.textAlign = 'left';

		const unitNumberInput = document.createElement('input');
		unitNumberInput.id = `input_${unit.Unit}`;
		unitNumberInput.type = 'number';
		unitNumberInput.value = unit.Number;
		unitNumberInput.min = 0;
		unitNumberInput.style.width = '50%';
		unitNumberInput.style.backgroundColor = 'black';
		unitNumberInput.style.color = 'white';
		unitNumberInput.style.border = '1px solid white';
		unitNumberInput.style.textAlign = 'right';

		unitNumberInput.addEventListener('input', () => {
			unit.Number = parseInt(unitNumberInput.value) || 0;
			refreshDataText.innerHTML = refreshCurrentPowerAtk(roster, heroPower, unitData);
		});

		unitContainer.appendChild(unitName);
		unitContainer.appendChild(unitNumberInput);
		rosterDisplay.appendChild(unitContainer);
	});

	// Create enemy display	
	const enemyContainer = document.createElement('div');
	enemyContainer.style.marginBottom = '10px';
	enemyContainer.innerHTML = '<strong>Enemy Pick</strong><br>';

	const enemySelectContainer = document.createElement('div');
	enemySelectContainer.style.display = 'flex';
	enemySelectContainer.style.alignItems = 'center';
	enemySelectContainer.style.justifyContent = 'space-between';
	enemySelectContainer.style.marginBottom = '1%';

	const enemySelect = document.createElement('select');
	enemySelect.style.flex = '1';
	enemySelect.style.marginRight = '4%';
	enemySelect.style.textAlign = 'left';
	unitData.forEach((enemy, index) => {
		const option = document.createElement('option');
		option.value = index;
		option.textContent = enemy.Unit;
		enemySelect.appendChild(option);
	});
	
	const enemyUnitNumberInput = document.createElement('input');
	enemyUnitNumberInput.id = 'enemyPower';
	enemyUnitNumberInput.type = 'number';
	enemyUnitNumberInput.value = 0;
	enemyUnitNumberInput.min = 0;
	enemyUnitNumberInput.style.width = '50%';
	enemyUnitNumberInput.style.backgroundColor = 'black';
	enemyUnitNumberInput.style.color = 'white';
	enemyUnitNumberInput.style.border = '1px solid white';
	enemyUnitNumberInput.style.textAlign = 'right';

	enemySelectContainer.appendChild(enemySelect);
	enemySelectContainer.appendChild(enemyUnitNumberInput);
	enemyContainer.appendChild(enemySelectContainer);

	const fightButton = document.createElement('button');
	fightButton.textContent = 'Calculate Fight';

	const combatResultText = document.createElement('div');
	combatResultText.style.color = 'white';
	combatResultText.style.marginTop = '1%';
	
	// Create fight button
	fightButton.addEventListener('click', () => {
		let enemyIndex = enemySelect.value;
		let enemyPower = enemyUnitNumberInput.value;
		let tmpRoster = JSON.parse(JSON.stringify(roster));
		combatResultText.innerHTML = calculateFight(enemyIndex, enemyPower, tmpRoster, heroPower, unitData);
	});

    // Load to the container
	container.appendChild(refreshDataText);
	container.appendChild(refreshDataButton);
	container.appendChild(heroPowerDisplay);
	container.appendChild(rosterDisplay);
	container.appendChild(enemyContainer);
	container.appendChild(fightButton);
	container.appendChild(combatResultText);
	
	// Add display to the page
	document.body.appendChild(container);


})();
