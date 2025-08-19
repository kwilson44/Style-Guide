class HairSelector {
    constructor() {
        this.selectedStyle = null;
        this.selectedColor = 'all';
        this.initializeHairStyles();
    }

    async initializeHairStyles() {
        try {
            const response = await fetch('black_coded_hair_pieces.json');
            this.hairData = await response.json();
            this.createHairCategories();
            this.setupEventListeners();
        } catch (error) {
            console.error('Failed to load hair data:', error);
        }
    }

    createHairCategories() {
        const categories = {
            braided: {
                title: 'Braided Styles',
                image: 'images/braided_button.jpg',
                description: 'Braids, twists, and cornrows'
            },
            coiled: {
                title: 'Coiled/Afro',
                image: 'images/coiled_button.jpg',
                description: 'Afros, coils, and natural curls'
            },
            locs: {
                title: 'Locs',
                image: 'images/locs_button.jpg',
                description: 'Dreadlocks and locs styles'
            },
            updo: {
                title: 'Updos & Buns',
                image: 'images/updo_button.jpg',
                description: 'Top knots and formal styles'
            }
        };

        const styleGrid = document.querySelector('.style-grid');
        if (!styleGrid) return;

        styleGrid.innerHTML = Object.entries(categories)
            .map(([key, cat]) => `
                <button class="style-btn" data-style="${key}">
                    <img src="${cat.image}" alt="${cat.title}" class="style-icon">
                    <h3>${cat.title}</h3>
                    <p>${cat.description}</p>
                </button>
            `).join('');
    }

    setupEventListeners() {
        // Category selection
        document.querySelectorAll('.style-btn').forEach(btn => {
            btn.addEventListener('click', () => this.selectCategory(btn));
        });

        // Color filter
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', () => this.filterByColor(btn));
        });
    }

    selectCategory(button) {
        // Update visual selection
        document.querySelectorAll('.style-btn').forEach(btn => 
            btn.classList.remove('active'));
        button.classList.add('active');

        // Show results section
        document.getElementById('hairResults').style.display = 'block';

        // Filter and display hair pieces
        this.selectedStyle = button.dataset.style;
        this.displayHairPieces();
    }

    filterByColor(button) {
        document.querySelectorAll('.color-btn').forEach(btn => 
            btn.classList.remove('active'));
        button.classList.add('active');
        
        this.selectedColor = button.dataset.color;
        this.displayHairPieces();
    }

    displayHairPieces() {
        const grid = document.getElementById('hairGrid');
        const filteredHair = this.hairData.filter(hair => {
            const styleMatch = this.matchesStyle(hair);
            const colorMatch = this.matchesColor(hair);
            return styleMatch && colorMatch;
        });

        grid.innerHTML = filteredHair.map(hair => `
            <div class="hair-card" data-id="${hair.item_number}">
                <div class="hair-image">
                    <img src="images/${hair.item_number}.png" 
                         alt="${hair.description}"
                         onerror="this.src='images/placeholder.png'">
                </div>
                <div class="hair-info">
                    <h4>${hair.description}</h4>
                    <p class="part-number">Part #${hair.item_number}</p>
                    <p class="color-name">${hair.Name}</p>
                    <a href="${hair.item_link}" target="_blank" class="btn btn-primary btn-small">
                        View on BrickLink
                    </a>
                </div>
            </div>
        `).join('');

        // Add click handlers
        document.querySelectorAll('.hair-card').forEach(card => {
            card.addEventListener('click', () => this.selectHair(card));
        });
    }

    matchesStyle(hair) {
        if (!this.selectedStyle) return true;
        const desc = hair.description.toLowerCase();
        switch(this.selectedStyle) {
            case 'braided':
                return desc.includes('braid') || desc.includes('twist');
            case 'coiled':
                return desc.includes('coil') || desc.includes('afro') || desc.includes('curl') || desc.includes('bubble');
            case 'locs':
                return desc.includes('dread') || desc.includes('loc');
            case 'updo':
                return desc.includes('bun') || desc.includes('knot') || desc.includes('updo');
            default:
                return true;
        }
    }

    matchesColor(hair) {
        switch(this.selectedColor) {
            case 'natural':
                return hair.Is_Natural_Color;
            case 'fantasy':
                return hair.Is_Fantasy_Color;
            default:
                return true;
        }
    }

    selectHair(card) {
        // Remove previous selection
        document.querySelectorAll('.hair-card').forEach(c => 
            c.classList.remove('selected'));
        
        // Add selection to clicked card
        card.classList.add('selected');

        // Get hair data
        const hairId = card.dataset.id;
        const selectedHair = this.hairData.find(h => h.item_number === hairId);

        // Store selection
        localStorage.setItem('selectedHair', JSON.stringify(selectedHair));

        // Enable continue button
        document.getElementById('nextHairStep').disabled = false;

        // Update preview
        this.updatePreview(selectedHair);
    }

    updatePreview(hair) {
        const preview = document.getElementById('previewHair');
        if (preview && hair) {
            preview.innerHTML = `
                <div class="preview-hair-piece">
                    <img src="images/${hair.item_number}.png" 
                         alt="${hair.description}"
                         style="width: 100%; height: auto;">
                    <div class="preview-info">
                        <p>${hair.description}</p>
                        <p class="part-number">Part #${hair.item_number}</p>
                        <p class="color-name">${hair.Name}</p>
                        <a href="${hair.item_link}" target="_blank" class="btn btn-primary btn-small">
                            View on BrickLink
                        </a>
                    </div>
                </div>
            `;
        }
    }
}

function updateFinalPreview(selections) {
    const previewContainer = document.getElementById('characterPreview');
    const selectedHair = JSON.parse(localStorage.getItem('selectedHair') || '{}');
    const selectedExpression = localStorage.getItem('selectedExpression');

    previewContainer.innerHTML = `
        <div class="final-preview">
            <div class="preview-images">
                <div class="head-container">
                    <img src="images/${selectedHair.item_number}.png" 
                         alt="${selectedHair.description}"
                         class="preview-hair-final">
                    <div class="expression-container">
                        <img src="images/${selections.fleshTone.toLowerCase()}-${selectedExpression.toLowerCase()}.png" 
                             alt="Selected expression" 
                             class="preview-expression">
                    </div>
                </div>
            </div>
            <div class="character-info">
                <h3>Your LEGO Character</h3>
                <ul>
                    <li>Flesh Tone: ${selections.fleshTone}</li>
                    <li>Expression: ${selectedExpression}</li>
                    <li>Hairstyle: ${selectedHair.description}</li>
                    ${selections.accessories ? `<li>Accessories: ${selections.accessories.join(', ')}</li>` : ''}
                </ul>
            </div>
        </div>
    `;
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    window.hairStyleSelector = new HairSelector();
});
