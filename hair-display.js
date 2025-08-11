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
                icon: '🔄',
                description: 'Braids, twists, and cornrows'
            },
            coiled: {
                title: 'Coiled/Afro',
                icon: '🌀',
                description: 'Afros, coils, and natural curls'
            },
            locs: {
                title: 'Locs',
                icon: '〰️',
                description: 'Dreadlocks and locs styles'
            },
            updo: {
                title: 'Updos & Buns',
                icon: '⬆️',
                description: 'Top knots and formal styles'
            }
        };

        const styleGrid = document.querySelector('.style-grid');
        if (!styleGrid) return;

        styleGrid.innerHTML = Object.entries(categories)
            .map(([key, cat]) => `
                <button class="style-btn" data-style="${key}">
                    <span class="style-icon">${cat.icon}</span>
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
                    <img src="images/hair/${hair.item_number}.png" 
                         alt="${hair.description}"
                         onerror="this.src='images/hair/placeholder.png'">
                </div>
                <div class="hair-info">
                    <h4>${hair.description}</h4>
                    <p class="part-number">Part #${hair.item_number}</p>
                    <p class="color-name">${hair.Name}</p>
                </div>
            </div>
        `).join('');

        // Add click handlers to hair cards
        document.querySelectorAll('.hair-card').forEach(card => {
            card.addEventListener('click', () => this.selectHair(card));
        });
    }

    matchesStyle(hair) {
        if (!this.selectedStyle) return true;
        const desc = hair.description.toLowerCase();
        switch(this.selectedStyle) {
            case 'braided':
                return desc.includes('braid');
            case 'coiled':
                return desc.includes('coil') || desc.includes('afro') || desc.includes('curl');
            case 'locs':
                return desc.includes('dread') || desc.includes('loc');
            case 'updo':
                return desc.includes('bun') || desc.includes('knot');
            default:
                return true;
        }
    }

    matchesColor(hair) {
        switch(this.selectedColor) {
            case 'natural':
                return hair.Is_Natural_Color;
            case 'fantasy':
                return !hair.Is_Natural_Color;
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
                <img src="images/hair/${hair.item_number}.png" 
                     alt="${hair.description}">
            `;
        }
    }
}

function updateFinalPreview(selections) {
    const previewContainer = document.getElementById('characterPreview');
    previewContainer.innerHTML = `
        <div class="final-preview">
            <div class="preview-images">
                <img src="images/heads/${selections.fleshTone}/${selections.expression}.png" 
                     alt="Selected head" class="preview-head">
                <img src="images/hair/${selections.hairStyle}.png" 
                     alt="Selected hairstyle" class="preview-hair">
            </div>
            <div class="character-info">
                <h3>Your LEGO Character</h3>
                <ul>
                    <li>Flesh Tone: ${selections.fleshTone}</li>
                    <li>Expression: ${selections.expression}</li>
                    <li>Hairstyle: ${selections.hairStyle}</li>
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