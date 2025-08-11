// State management
let currentStep = 0;
let selection = {
    fleshTone: null,
    expression: null,
    accessories: [],
    hair: null,
    hairColor: null
};

let hairStyles = [];

function loadHairDataFromJSON(callback) {
    fetch('hair-data.json')
        .then(response => response.json())
        .then(data => {
            hairStyles = data
                .filter(item => item["Hair Type"] === "Black-coded") // optional filter
                .map(item => ({
                    name: item.description || "Unnamed Style",
                    partNumber: item.item_number,
                    brickLinkUrl: item.item_link,
                    available: true, // or apply logic based on Is_Natural_Color, etc.
                    images: [`images/${item.item_number}.jpg`], // fallback path
                    colors: [item.Name] // using LEGO color name (e.g., "White")
                }));

            console.log("Parsed Hair Styles:", hairStyles);

            if (callback) callback();
        })
        .catch(error => {
            console.error("Failed to load hair-data.json", error);
        });
}


// Initialize the app
function init() {
    generateFleshToneOptions();
    updateProgress();
    loadHairDataFromJSON(() => {
        console.log("Hair styles loaded from JSON:", hairStyles);
        // You can now safely call generateHairOptions() later when needed
    });
}


function generateFleshToneOptions() {
    const grid = document.getElementById('fleshToneGrid');
    grid.innerHTML = '';

    fleshTones.forEach(tone => {
        const stats = getAvailabilityStats(tone.name); // Get the counts
        const badgeColor = stats.available > 0 ? 'status-available' : 'status-missing';
        const statusText = stats.available > 0
            ? `${stats.available}/${stats.total} Available` // Shows "3/6 Available"
            : 'None Available'; // Or this if zero

        const item = document.createElement('div');
        item.className = 'selection-item';

        // Update the image paths in generateFleshToneOptions()
        const imageSrc = tone.name === "Vitiligo Pattern"
            ? "images/vitiligo-pattern.jpg"
            : `images/${tone.name.toLowerCase().replace(/ /g, '-')}.jpg`;

        item.innerHTML = `
                    <div class="image-frame" style="background-image: url(${imageSrc})" alt="${tone.name}"></div>
                    <div><strong>${tone.name}</strong></div>
                    <div style="font-size: 0.8rem; color: #666;">${tone.description}</div>
                    <div class="availability-status ${badgeColor}">
                        ${statusText}
                    </div>
                `;

        if (stats.available > 0)
        {
            item.addEventListener('click', () => selectFleshTone(tone, item));
        } else
        {
            item.classList.add('unavailable');
            item.addEventListener('click', () => displayErrorMessage(tone.name));
        }

        item.addEventListener('mouseenter', (e) => showFleshToneTooltip(e, tone));
        item.addEventListener('mouseleave', hideTooltip);

        grid.appendChild(item);
    });
}

function selectFleshTone(tone, itemElement) {
    document.querySelectorAll('#fleshToneGrid .selection-item').forEach(item => {
        item.classList.remove('selected');
    });

    itemElement.classList.add('selected');
    selection.fleshTone = tone;

    // Store the selected flesh tone
    localStorage.setItem('selectedFleshTone', tone.name);

    setTimeout(() => {
        currentStep = 1;
        showExpressionSection();
        updateProgress();
        updatePreview();
    }, 500);
}

function showExpressionSection() {
    document.getElementById('expressionSection').style.display = 'block';
    generateExpressionOptions();

    document.getElementById('expressionSection').scrollIntoView({
        behavior: 'smooth'
    });
}

function generateExpressionOptions() {
    const grid = document.getElementById('expressionGrid');
    grid.innerHTML = '';

    Object.keys(availabilityData.expressions).forEach(expressionName => {
        const selectedFleshTone = selection.fleshTone?.name;
        const expressionData = availabilityData.expressions[expressionName][selectedFleshTone];
        const isAvailable = expressionData?.available;
        const brickLinkUrl = expressionData?.url || null;
        const partNumber = expressionData?.partNumber || null;

        const item = document.createElement('div');
        item.className = `selection-item ${isAvailable ? '' : 'unavailable'}`;

        // Update the expression image paths
        const headImage = `images/${selectedFleshTone.toLowerCase().replace(/ /g, '-')}-${expressionName.toLowerCase().replace(/ /g, '-')}.jpg`;

        item.innerHTML = `
                    <div class="image-frame" style="background-image: url(${isAvailable ? headImage : 'images/placeholder.jpg'})" alt="${expressionName}"></div>
                    <div><strong>${expressionName}</strong></div>
                    <div style="font-size: 0.8rem; color: #666;">${isAvailable ? 'Available' : 'Not Available'}</div>
                    ${isAvailable && brickLinkUrl ? `<a href="${brickLinkUrl}" target="_blank" class="btn btn-primary">🔗 View on BrickLink</a>` : ''}
                    ${isAvailable && partNumber ? `<p style="font-size: 0.8rem; color: #666;">Part ID: ${partNumber}</p>` : ''}
                `;

        if (isAvailable)
        {
            item.addEventListener('click', () => selectExpression(expressionName, item));
        } else
        {
            item.addEventListener('click', () => displayUnavailabilityModal(expressionName, selectedFleshTone));
        }

        grid.appendChild(item);
    });

    // Add "Continue to Hair Selection" button
    if (!document.getElementById('continue-hair-btn'))
    {
        const continueBtn = document.createElement('button');
        continueBtn.id = 'continue-hair-btn';
        continueBtn.className = 'btn btn-primary';
        continueBtn.textContent = 'Continue to Hair Selection';
        continueBtn.style.marginTop = '20px';
        continueBtn.addEventListener('click', () => {
            currentStep = 3;
            showHairSection();
            updateProgress();
        });

        grid.parentElement.appendChild(continueBtn);
    }
}

function selectExpression(expression, itemElement) {
    document.querySelectorAll('#expressionGrid .selection-item').forEach(item => {
        item.classList.remove('selected');
    });

    itemElement.classList.add('selected');
    selection.expression = expression;

    const selectedFleshTone = selection.fleshTone?.name.toLowerCase().replace(/ /g, '-');
    const isAvailable = expression.images[selectedFleshTone];

    if (!isAvailable)
    {
        displayUnavailabilityModal(expression.name, selection.fleshTone.name);
        return;
    }

    setTimeout(() => {
        currentStep = 2;
        showAccessoriesSection();
        updateProgress();
        updatePreview();
    }, 500);
}

function showAccessoriesSection() {
    document.getElementById('accessoriesSection').style.display = 'block';
    generateAccessoryOptions();

    document.getElementById('accessoriesSection').scrollIntoView({
        behavior: 'smooth'
    });
}

function generateAccessoryOptions() {
    const toggle = document.getElementById('accessoryToggle');
    toggle.innerHTML = '';

    accessories.forEach(accessory => {
        const item = document.createElement('div');
        item.className = 'accessory-item';

        if (!accessory.available)
        {
            item.style.opacity = '0.6';
        }

        item.innerHTML = `
                    <div class="accessory-checkbox">${selection.accessories.includes(accessory) ? '✓' : ''}</div>
                    <span style="font-size: 1.5rem;">${accessory.icon}</span>
                    <div>
                        <strong>${accessory.name}</strong>
                        <div style="font-size: 0.8rem; color: #666;">${accessory.description}</div>
                        <div class="availability-status ${accessory.available ? 'status-available' : 'status-missing'}">
                            ${accessory.available ? '✅ Available' : '❌ Missing'}
                        </div>
                        ${accessory.partNumber ? `<div class="part-number">${accessory.partNumber}</div>` : ''}
                    </div>
                `;

        if (accessory.available)
        {
            item.addEventListener('click', () => toggleAccessory(accessory, item));
        } else
        {
            item.addEventListener('click', () => suggestSpecificPart(accessory.name));
        }

        toggle.appendChild(item);
    });

    // Add "Continue to Hair Selection" button
    if (!document.getElementById('continue-hair-btn'))
    {
        const continueBtn = document.createElement('button');
        continueBtn.id = 'continue-hair-btn';
        continueBtn.className = 'btn btn-primary';
        continueBtn.textContent = 'Continue to Hair Selection';
        continueBtn.style.marginTop = '20px';
        continueBtn.addEventListener('click', () => {
            currentStep = 3;
            showHairSection();
            updateProgress();
        });

        toggle.parentElement.appendChild(continueBtn);
    }
}

function toggleAccessory(accessory, itemElement) {
    const index = selection.accessories.findIndex(acc => acc.name === accessory.name);

    if (index > -1)
    {
        // Remove accessory from selection
        selection.accessories.splice(index, 1);
        itemElement.classList.remove('selected');
        itemElement.querySelector('.accessory-checkbox').textContent = ''; // Clear checkbox text
    } else
    {
        // Add accessory to selection
        selection.accessories.push(accessory);
        itemElement.classList.add('selected');
        itemElement.querySelector('.accessory-checkbox').textContent = '✓'; // Mark checkbox as selected
    }

    // Update preview or any other UI elements if necessary
    updatePreview();
}

function showHairSection() {
    document.getElementById('hairSection').style.display = 'block';
    generateHairOptions();

    document.getElementById('hairSection').scrollIntoView({
        behavior: 'smooth'
    });
}

function generateHairOptions() {
    const carousel = document.getElementById('hairCarousel');
    carousel.innerHTML = '';

    hairStyles.forEach(style => {
        const card = document.createElement('div');
        card.className = 'option-card';

        const colorsHtml = style.colors.map(color => `
                    <div class="color-swatch" style="background: ${color};" onclick="previewHairColor('${color}', '${style.name}')"></div>
                `).join('');

        card.innerHTML = `
                    <div class="option-image" style="position: relative;">
                        ${style.images.map(image => `<img src="${image}" alt="${style.name}" style="width: 100%; height: auto; border-radius: 10px;">`).join('')}
                        <div class="color-palette" style="position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%); display: flex; gap: 5px;">
                            ${colorsHtml}
                        </div>
                    </div>
                    <div class="option-name">${style.name}</div>
                    <div class="option-description">${style.description}</div>
                    <div class="part-number">${style.partNumber}</div>
                    ${style.brickLinkUrl ? `<a href="${style.brickLinkUrl}" target="_blank" class="btn btn-primary">🔗 View on BrickLink</a>` : ''}
                `;

        card.addEventListener('click', () => selectHairStyle(style, card));
        carousel.appendChild(card);
    });

    // Add warning button
    if (!document.getElementById('warning-btn'))
    {
        const warningBtn = document.createElement('button');
        warningBtn.id = 'warning-btn';
        warningBtn.className = 'btn btn-suggest';
        warningBtn.textContent = '⚠️ Advocate for More Options';
        warningBtn.style.marginTop = '20px';
        warningBtn.addEventListener('click', displayHairWarning);

        carousel.parentElement.appendChild(warningBtn);
    }
}

function previewHairColor(color, styleName) {
    const previewHair = document.getElementById('previewHair');
    previewHair.style.backgroundColor = color;
    previewHair.innerHTML = styleName;
}

function selectHairStyle(style, cardElement) {
    document.querySelectorAll('#hairCarousel .option-card').forEach(card => {
        card.classList.remove('selected');
    });

    cardElement.classList.add('selected');
    selection.hair = style;

    setTimeout(() => {
        currentStep = 4;
        showCharacterPreview();
        updateProgress();
        updatePreview();
    }, 500);
}

function showCharacterPreview() {
    document.getElementById('characterPreview').style.display = 'block';
    document.getElementById('finalActions').style.display = 'block';

    document.getElementById('characterPreview').scrollIntoView({
        behavior: 'smooth'
    });
}

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const totalSteps = 4;
    const stepPercentage = (currentStep / totalSteps) * 100;

    progressFill.style.width = `${stepPercentage}%`;
    document.getElementById('progressText').innerText = `Step ${currentStep + 1} of ${totalSteps}`;
}

function updatePreview() {
    const previewHair = document.getElementById('previewHair');
    const previewHead = document.getElementById('previewHead');
    const previewAccessories = document.getElementById('previewAccessories');
    const characterInfo = document.getElementById('characterInfo');

    // Update hair preview
    if (selection.hair)
    {
        const hairImage = selection.hair.images[0]; // Use the first image for the hairstyle
        const hairBrickLinkUrl = selection.hair.brickLinkUrl;
        const hairPartNumber = selection.hair.partNumber;

        previewHair.innerHTML = `
                    <img src="${hairImage}" alt="${selection.hair.name}" style="width: 150px; height: auto; border-radius: 10px;">
                    ${hairBrickLinkUrl ? `<a href="${hairBrickLinkUrl}" target="_blank" class="btn btn-primary" style="margin-top: 10px;">🔗 View Hair on BrickLink</a>` : ''}
                    ${hairPartNumber ? `<p style="font-size: 0.8rem; color: #666;">Part ID: ${hairPartNumber}</p>` : ''}
                `;
    } else
    {
        previewHair.innerHTML = '[Hair]';
    }

    // Update face preview
    if (selection.expression)
    {
        const selectedFleshTone = selection.fleshTone?.name.toLowerCase().replace(/ /g, '-');
        const headImage = `images/${selectedFleshTone}-${selection.expression.name.toLowerCase().replace(/ /g, '-')}.jpg`;
        const expressionBrickLinkUrl = selection.expression.brickLinkUrls?.[selectedFleshTone];
        const expressionPartNumber = selection.expression.partNumber;

        previewHead.innerHTML = `
                    <img src="${headImage}" alt="${selection.expression.name}" style="width: 150px; height: auto; border-radius: 10px;">
                    ${expressionBrickLinkUrl ? `<a href="${expressionBrickLinkUrl}" target="_blank" class="btn btn-primary" style="margin-top: 10px;">🔗 View Headprint on BrickLink</a>` : ''}
                    ${expressionPartNumber ? `<p style="font-size: 0.8rem; color: #666;">Part ID: ${expressionPartNumber}</p>` : ''}
                `;
    } else
    {
        previewHead.innerHTML = '[Face]';
    }

    // Update accessories preview
    previewAccessories.innerHTML = '';
    selection.accessories.forEach(accessory => {
        const accessoryImg = document.createElement('img');
        // Update the accessory image paths
        accessoryImg.src = `images/${accessory.name.toLowerCase().replace(/ /g, '-')}.jpg`;
        accessoryImg.alt = accessory.name;
        accessoryImg.style.width = '50px';
        accessoryImg.style.height = '50px';
        accessoryImg.style.margin = '5px';
        previewAccessories.appendChild(accessoryImg);
    });

    // Update character info
    characterInfo.innerHTML = `
                <div><strong>Flesh Tone:</strong> ${selection.fleshTone ? selection.fleshTone.name : 'None'}</div>
                <div><strong>Expression:</strong> ${selection.expression ? selection.expression.name : 'None'}</div>
                <div><strong>Accessories:</strong> ${selection.accessories.length > 0 ? selection.accessories.map(acc => acc.name).join(', ') : 'None'}</div>
                <div><strong>Hair Style:</strong> ${selection.hair ? selection.hair.name : 'None'}</div>
            `;
}

function saveCharacter() {
    // Implement save character logic (e.g., save to database or local storage)
    alert('Character saved!');
}

function shareCharacter() {
    // Implement share character logic (e.g., generate shareable link or image)
    alert('Share feature coming soon!');
}

function suggestPart() {
    // Implement suggest part logic (e.g., open suggestion form or link to LEGO feedback)
    alert('Suggest a part feature coming soon!');
}

function startOver() {
    currentStep = 0;
    selection = {
        fleshTone: null,
        expression: null,
        accessories: [],
        hair: null,
        hairColor: null
    };

    document.getElementById('fleshToneSection').style.display = 'block';
    document.getElementById('expressionSection').style.display = 'none';
    document.getElementById('accessoriesSection').style.display = 'none';
    document.getElementById('hairSection').style.display = 'none';
    document.getElementById('characterPreview').style.display = 'none';
    document.getElementById('finalActions').style.display = 'none';

    generateFleshToneOptions();
    updateProgress();
}

function showFleshToneTooltip(e, tone) {
    const stats = getAvailabilityStats(tone.name);
    const tooltip = document.getElementById('tooltip');
    tooltip.innerHTML = `
                <strong>${tone.name}</strong>
                <div style="margin-top: 5px;">${tone.description}</div>
                <div style="margin-top: 10px; font-size: 0.8rem; color: #ccc;">
                    ${tone.cultural}
                </div>
                <div style="margin-top: 10px; font-size: 0.8rem; color: #48bb78;">
                    ${stats.available} expressions available out of ${stats.total} total
                </div>
            `;
    tooltip.style.left = `${e.pageX + 10}px`;
    tooltip.style.top = `${e.pageY + 10}px`;
    tooltip.classList.add('show');
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.remove('show');
}

function redirectToLEGOContact(partName) {
    const message = `Hello LEGO Team,\n\nI noticed that the part "${partName}" is currently unavailable in your inventory. As a fan of LEGO, I believe this part would be a valuable addition to promote diversity and representation.\n\nThank you for considering this request!\n\nBest regards,\nKatie W.`;

    alert(`Copy the following message:\n\n${message}\n\nThen paste it into the LEGO contact form at:\nhttps://www.lego.com/en-us/service/contact-us/topics`);

    // Redirect the user to the LEGO contact page
    window.open("https://www.lego.com/en-us/service/contact-us/topics", "_blank");
}

function displayErrorMessage(fleshToneName) {
    const stats = getAvailabilityStats(fleshToneName);
    const title = `🚨 Missing Expressions for ${fleshToneName}`;
    const message = `Unfortunately, headprints from 2022-2024 do not include expressions for the <strong>${fleshToneName}</strong> flesh tone.`;
    const graphImage = 'images/graph.jpg';
    const buttonText = '✉️ Suggest to LEGO';
    const buttonAction = `redirectToLEGOContact('${fleshToneName}')`;

    displayUnavailabilityMessage(title, message, graphImage, buttonText, buttonAction);
}

function displayUnavailabilityModal(expressionName, fleshToneName) {
    const title = `🚨 Missing Representation`;
    const message = `Unfortunately, the <strong>${expressionName}</strong> expression is not available for the <strong>${fleshToneName}</strong> flesh tone.`;
    const graphImage = 'images/graph.jpg';
    const buttonText = '✉️ Suggest to LEGO';
    const buttonAction = `redirectToLEGOContact('${expressionName}')`;

    displayUnavailabilityMessage(title, message, graphImage, buttonText, buttonAction);
}

function getAvailabilityStats(fleshToneName) {
    const stats = { available: 0, unavailable: 0, total: 0 };

    Object.keys(availabilityData.expressions).forEach(expressionName => {
        const expressionData = availabilityData.expressions[expressionName][fleshToneName];
        stats.total++; // Count every expression type
        if (expressionData?.available)
        {
            stats.available++; // Count only available ones
        } else
        {
            stats.unavailable++;
        }
    });

    return stats; // Returns something like {available: 3, unavailable: 3, total: 6}
}

function displayUnavailabilityMessage(title, message, graphImage, buttonText, buttonAction) {
    const errorSection = document.createElement('div');
    errorSection.className = 'error-message';
    errorSection.innerHTML = `
                <h3>${title}</h3>
                <p>${message}</p>
                <p>Help us advocate for more inclusive LEGO parts by clicking below:</p>
                <button class="btn btn-suggest" onclick="${buttonAction}">
                    ${buttonText}
                </button>
                <div style="margin-top: 20px;">
                    <img src="${graphImage}" alt="Representation Graph" style="border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
                </div>
                <div style="margin-top: 20px; text-align: left; font-size: 0.9rem; color: #333;">
                    <h4>Instructions:</h4>
                    <ol style="padding-left: 20px;">
                        <li>Click on the blue button above to open the LEGO contact page.</li>
                        <li>Select <strong>"I need help with something else"</strong>.</li>
                        <li>Then choose <strong>"My topic isn't listed"</strong>.</li>
                        <li>Copy the following message and paste it into the contact form:</li>
                    </ol>
                    <pre style="background: #f8f9fa; padding: 10px; border-radius: 5px; border: 1px solid #ccc; font-family: monospace; white-space: pre-wrap;">
Hello LEGO Team,

I noticed that the part "${title}" is currently unavailable in your inventory. As a fan of LEGO, I believe this part would be a valuable addition to promote diversity and representation.

Thank you for considering this request!

                    </pre>
                </div>
            `;

    // const section = document.getElementById('fleshToneSection') || document.getElementById('expressionSection');
    // section.innerHTML = '';

    document.body.appendChild(errorSection);
}

function displayHairWarning() {
    const title = `🚨 Limited Options for Natural Hairstyles`;
    const message = `Unfortunately, there is a lack of options for Black women to have natural hairstyles and a limited variety of hair colors in LEGO's inventory.`;
    const graphImage = 'images/graph.jpg';
    const buttonText = '✉️ Suggest to LEGO';
    const buttonAction = `redirectToLEGOContact('Natural Hairstyles and Hair Colors')`;

    displayUnavailabilityMessage(title, message, graphImage, buttonText, buttonAction);
}

// Add these functions

function nextStep() {
    const selectedHair = localStorage.getItem('selectedHair');
    if (selectedHair) {
        document.getElementById('hairSection').style.display = 'none';
        document.getElementById('characterPreview').style.display = 'block';
        document.getElementById('finalActions').style.display = 'block';
        updateCharacterPreview();
    }
}

function previousStep() {
    document.getElementById('hairSection').style.display = 'none';
    document.getElementById('expressionSection').style.display = 'block';
}

function updateCharacterPreview() {
    const characterInfo = document.getElementById('characterInfo');
    const selectedHair = JSON.parse(localStorage.getItem('selectedHair') || '{}');
    const selectedFleshTone = localStorage.getItem('selectedFleshTone') || 'None';
    const selectedExpression = localStorage.getItem('selectedExpression') || 'None';

    characterInfo.innerHTML = `
        <h3>Your LEGO Character</h3>
        <div class="character-details">
            <p><strong>Hair Style:</strong> ${selectedHair.description || 'None'} (Part #${selectedHair.item_number || 'N/A'})</p>
            <p><strong>Hair Color:</strong> ${selectedHair.Name || 'None'}</p>
            <p><strong>Flesh Tone:</strong> ${selectedFleshTone}</p>
            <p><strong>Expression:</strong> ${selectedExpression}</p>
        </div>
    `;

    // Update visual preview
    const previewHair = document.getElementById('previewHair');
    const previewHead = document.getElementById('previewHead');

    if (selectedHair.item_number) {
        previewHair.innerHTML = `
            <img src="images/${selectedHair.item_number}.png" 
                 alt="${selectedHair.description}">
        `;
    }

    if (selectedFleshTone !== 'None') {
        previewHead.style.backgroundColor = getFleshToneColor(selectedFleshTone);
    }
}

// Finalize character selection
function finalizeCharacter() {
    const selections = {
        fleshTone: selectedFleshTone,
        expression: selectedExpression, 
        hairStyle: selectedHairStyle,
        accessories: selectedAccessories
    };
    updateFinalPreview(selections);
}

// Initialize the app on page load
window.onload = init;