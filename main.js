// Obsluha výběru vlastního úhlu
document.getElementById('angle').addEventListener('change', function() {
    const customAngleInput = document.getElementById('customAngle');
    if (this.value === 'custom') {
        customAngleInput.style.display = 'block';
        customAngleInput.required = true;
    } else {
        customAngleInput.style.display = 'none';
        customAngleInput.required = false;
    }
});

// Hlavní kalkulační logika
const form = document.getElementById('calculatorForm');
const resultsDiv = document.getElementById('results');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    calculateValues();
});

function calculateValues() {
    // Získání hodnot z formuláře
    const distanceFromWall = parseFloat(document.getElementById('distanceFromWall').value);
    const boardThickness = parseFloat(document.getElementById('boardThickness').value);
    const millingDiameter = parseFloat(document.getElementById('millingDiameter').value);
    
    // Získání úhlu
    let selectedAngle;
    const angleSelect = document.getElementById('angle').value;
    if (angleSelect === 'custom') {
        selectedAngle = parseFloat(document.getElementById('customAngle').value);
        if (!selectedAngle || selectedAngle <= 0 || selectedAngle > 360) {
            alert('Zadejte platný vlastní úhel (1-360°)');
            return;
        }
    } else {
        selectedAngle = parseFloat(angleSelect);
    }

    // Převod úhlu na radiány pro výpočet
    const angleInRadians = (selectedAngle * Math.PI) / 180;

    // Výpočty podle vaší logiky s úhlem
    const outerRadius = distanceFromWall * 2;
    const outerCircumference = Math.round((outerRadius * angleInRadians));
    
    const innerRadius = outerRadius - (2 * boardThickness);
    const innerCircumference = Math.round((innerRadius * angleInRadians));
    
    const circumferenceDifference = outerCircumference - innerCircumference;
    const groovesCount = Math.round(circumferenceDifference / millingDiameter);
    const segmentsCount = groovesCount + 1;
    const grooveSpacing = outerCircumference / segmentsCount;

    // Zobrazení výsledků
    document.getElementById('selectedAngle').textContent = selectedAngle + '°';
    document.getElementById('outerRadius').textContent = outerRadius.toFixed(1) + ' mm';
    document.getElementById('innerRadius').textContent = innerRadius.toFixed(1) + ' mm';
    document.getElementById('outerCircumference').textContent = outerCircumference + ' mm';
    document.getElementById('innerCircumference').textContent = innerCircumference + ' mm';
    document.getElementById('circumferenceDifference').textContent = circumferenceDifference + ' mm';
    document.getElementById('groovesCount').textContent = groovesCount + ' ks';
    document.getElementById('segmentsCount').textContent = segmentsCount + ' ks';
    document.getElementById('grooveSpacing').textContent = grooveSpacing.toFixed(2) + ' mm';

    // Zobrazení výsledků
    resultsDiv.classList.add('show');

    // Generování diagramu
    generateDiagram(outerRadius, innerRadius, groovesCount, grooveSpacing, selectedAngle);
}

function generateDiagram(outerRadius, innerRadius, groovesCount, grooveSpacing, angle) {
    const svg = document.getElementById('diagramSvg');
    svg.innerHTML = '';

    const lineLength = 250;
    const startX = 25;
    const lineY = 100;
    const grooveHeight = 15;

    const segmentsCount = groovesCount + 1;
    const segmentWidth = lineLength / segmentsCount;

    let svgContent = `
        <line x1="${startX}" y1="${lineY}" x2="${startX + lineLength}" y2="${lineY}" 
              stroke="#2196F3" stroke-width="4"/>
        
        <line x1="${startX}" y1="${lineY - 10}" x2="${startX}" y2="${lineY + 10}" 
              stroke="#FF5722" stroke-width="3"/>
        <line x1="${startX + lineLength}" y1="${lineY - 10}" x2="${startX + lineLength}" y2="${lineY + 10}" 
              stroke="#FF5722" stroke-width="3"/>
        
        <text x="${startX}" y="${lineY - 15}" text-anchor="middle" font-size="10" fill="#FF5722">Okraj</text>
        <text x="${startX + lineLength}" y="${lineY - 15}" text-anchor="middle" font-size="10" fill="#FF5722">Okraj</text>
    `;

    for (let i = 1; i <= groovesCount; i++) {
        const grooveX = startX + (i * segmentWidth);
        svgContent += `
            <line x1="${grooveX}" y1="${lineY - grooveHeight/2}" x2="${grooveX}" y2="${lineY + grooveHeight/2}" 
                  stroke="#4CAF50" stroke-width="2"/>
            <text x="${grooveX}" y="${lineY + 25}" text-anchor="middle" font-size="8" fill="#4CAF50">${i}</text>
        `;
    }

    for (let i = 1; i <= segmentsCount; i++) {
        const segmentCenterX = startX + ((i - 0.5) * segmentWidth);
        svgContent += `
            <text x="${segmentCenterX}" y="${lineY - 25}" text-anchor="middle" font-size="10" fill="#666" font-weight="bold">P${i}</text>
        `;
    }

    svgContent += '<line x1="' + startX + '" y1="' + (lineY + 50) + '" x2="' + (startX + lineLength) + '" y2="' + (lineY + 50) + '" stroke="#999" stroke-width="1"/>';
    svgContent += '<text x="' + (startX + lineLength/2) + '" y="' + (lineY + 45) + '" text-anchor="middle" font-size="11" fill="#333">Délka oblouku při ' + angle + '°</text>';
    svgContent += '<text x="25" y="30" font-size="12" fill="#333" font-weight="bold">Schéma frézování:</text>';
    svgContent += '<text x="25" y="45" font-size="10" fill="#2196F3">━ Sádrokartonová deska</text>';
    svgContent += '<text x="25" y="58" font-size="10" fill="#4CAF50">| Drážky (' + groovesCount + ' ks)</text>';
    svgContent += '<text x="180" y="45" font-size="10" fill="#666">P1-P' + segmentsCount + ' Políčka (' + segmentsCount + ' ks)</text>';
    svgContent += '<text x="180" y="58" font-size="10" fill="#FF5722">| Okraje desky</text>';
    svgContent += '<text x="' + (startX + lineLength/2) + '" y="180" text-anchor="middle" font-size="12" fill="#333" font-weight="bold">Rozestup drážek: ' + grooveSpacing.toFixed(2) + ' mm</text>';

    svg.innerHTML = svgContent;
}

// Načtení při startu
window.addEventListener('load', () => {
    // Inicializace aplikace
    console.log('Kalkulačka sádrokartonu načtena');
});