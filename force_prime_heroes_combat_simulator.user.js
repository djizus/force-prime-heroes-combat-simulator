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

    const UNIT_IMAGES = {
        Centaur: 'https://fp-heroes.gitbook.io/~gitbook/image?url=https%3A%2F%2F934968641-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FddK5n8mDIAsaa4AGx8yd%252Fuploads%252F3F1tv6IdfVuTIJQvab01%252Fa_centaur_cr.png%3Falt%3Dmedia%26token%3D46908737-a9da-45dd-b93f-8645df668488&width=300&dpr=4&quality=100&sign=eab3b18f&sv=2',
        Dwarf: 'https://fp-heroes.gitbook.io/~gitbook/image?url=https%3A%2F%2F934968641-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FddK5n8mDIAsaa4AGx8yd%252Fuploads%252FyRZ2FsAI5nk6QJ1JMY0z%252Fa_dwarf_cr.png%3Falt%3Dmedia%26token%3D7e488750-359c-4085-84f0-a52cc5298d96&width=300&dpr=1&quality=100&sign=db01bb00&sv=2',
        Crusader: 'https://fp-heroes.gitbook.io/~gitbook/image?url=https%3A%2F%2F934968641-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FddK5n8mDIAsaa4AGx8yd%252Fuploads%252F0GFxza74x0ZznMQEx10d%252Fa_crusader_cr.png%3Falt%3Dmedia%26token%3D71357946-ff4a-492d-a579-d1278b59094a&width=300&dpr=1&quality=100&sign=47c6256e&sv=2',
        Monk: 'https://fp-heroes.gitbook.io/~gitbook/image?url=https%3A%2F%2F934968641-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FddK5n8mDIAsaa4AGx8yd%252Fuploads%252FEnu4nAr8lCtbjrLiXEEL%252Fa_monk_cr.png%3Falt%3Dmedia%26token%3Daef742fe-f80c-4211-85f3-cfcaa2e0d787&width=300&dpr=1&quality=100&sign=43c449a0&sv=2',
        Angel: 'https://fp-heroes.gitbook.io/~gitbook/image?url=https%3A%2F%2F934968641-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FddK5n8mDIAsaa4AGx8yd%252Fuploads%252FTFKDbtgBU85MzDSk18eF%252Fa_angel_cr.png%3Falt%3Dmedia%26token%3D9bfc77d1-bf5f-45e5-918d-cf4aef20eb24&width=300&dpr=4&quality=100&sign=3edd77a1&sv=2'
    };

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
        margin-bottom: 12px;
    }

    .simulator-section-title {
        margin: 0 0 8px 0;
        font-size: 1em;
        font-weight: bold;
        color: #ffd700;
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

    .fight-results {
        padding: 8px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        margin-top: 8px;
    }
    
    .fight-results div {
        margin: 4px 0;
    }

    .simulator-results .unit-column {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        padding: 8px;
    }
    
    .simulator-results .unit-column span {
        font-size: 1.2em;
        font-weight: bold;
    }
`;

    // Add styles to document
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Create improved simulator HTML
    function createSimulatorHTML() {
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
                    <div class="unit-grid">
                        <div class="unit-column">
                            <img src="${UNIT_IMAGES.Centaur}" alt="Centaur" class="unit-icon">
                            <input type="number" class="simulator-input" id="centaurCount" value="0" min="0">
                        </div>
                        <div class="unit-column">
                            <img src="${UNIT_IMAGES.Dwarf}" alt="Dwarf" class="unit-icon">
                            <input type="number" class="simulator-input" id="dwarfCount" value="0" min="0">
                        </div>
                        <div class="unit-column">
                            <img src="${UNIT_IMAGES.Crusader}" alt="Crusader" class="unit-icon">
                            <input type="number" class="simulator-input" id="crusaderCount" value="0" min="0">
                        </div>
                    </div>
                    <div class="unit-grid second-row">
                        <div class="unit-column">
                            <img src="${UNIT_IMAGES.Monk}" alt="Monk" class="unit-icon">
                            <input type="number" class="simulator-input" id="monkCount" value="0" min="0">
                        </div>
                        <div class="unit-column">
                            <img src="${UNIT_IMAGES.Angel}" alt="Angel" class="unit-icon">
                            <input type="number" class="simulator-input" id="angelCount" value="0" min="0">
                        </div>
                    </div>
                </section>

                <section class="simulator-section">
                    <h4 class="simulator-section-title">Enemy</h4>
                    <div class="enemy-section">
                        <div class="enemy-inputs">
                            <select class="simulator-input unit-select" id="enemyUnit">
                                <option value="Centaur" data-icon="${UNIT_IMAGES.Centaur}">Centaur</option>
                                <option value="Dwarf" data-icon="${UNIT_IMAGES.Dwarf}">Dwarf</option>
                                <option value="Crusader" data-icon="${UNIT_IMAGES.Crusader}">Crusader</option>
                                <option value="Monk" data-icon="${UNIT_IMAGES.Monk}">Monk</option>
                                <option value="Angel" data-icon="${UNIT_IMAGES.Angel}">Angel</option>
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

    // Handle current data updates
    function updateCurrentData() {
        // Set current status
        document.getElementById('currentPower').textContent = '1';
        document.getElementById('currentAttack').textContent = '1';
        
        // Set hero power
        document.getElementById('heroAttack').value = '1';
        document.getElementById('heroDefense').value = '1';
        
        // Set roster units
        const rosterUnits = ['centaur', 'dwarf', 'crusader', 'monk', 'angel'];
        rosterUnits.forEach(unit => {
            document.getElementById(`${unit}Count`).value = '1';
        });
    }

    function displayFightCalculation() {
        const resultsSection = document.getElementById('results');
        const rosterUnits = ['centaur', 'dwarf', 'crusader', 'monk', 'angel'];
        
        let rosterText = `
            <h4 class="simulator-section-title">Fight Results</h4>
            <div class="unit-grid">
                <div class="unit-column">
                    <img src="${UNIT_IMAGES.Centaur}" alt="Centaur" class="unit-icon">
                    <span>${document.getElementById('centaurCount').value}</span>
                </div>
                <div class="unit-column">
                    <img src="${UNIT_IMAGES.Dwarf}" alt="Dwarf" class="unit-icon">
                    <span>${document.getElementById('dwarfCount').value}</span>
                </div>
                <div class="unit-column">
                    <img src="${UNIT_IMAGES.Crusader}" alt="Crusader" class="unit-icon">
                    <span>${document.getElementById('crusaderCount').value}</span>
                </div>
            </div>
            <div class="unit-grid second-row">
                <div class="unit-column">
                    <img src="${UNIT_IMAGES.Monk}" alt="Monk" class="unit-icon">
                    <span>${document.getElementById('monkCount').value}</span>
                </div>
                <div class="unit-column">
                    <img src="${UNIT_IMAGES.Angel}" alt="Angel" class="unit-icon">
                    <span>${document.getElementById('angelCount').value}</span>
                </div>
            </div>`;
        
        resultsSection.innerHTML = rosterText;
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

        // Handle Get Current Data button
        const getCurrentDataBtn = wrapper.querySelector('#getCurrentData');
        getCurrentDataBtn.addEventListener('click', updateCurrentData);

        // Handle Calculate Fight button
        const calculateFightBtn = wrapper.querySelector('#calculateFight');
        calculateFightBtn.addEventListener('click', displayFightCalculation);
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
