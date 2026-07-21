let currentMaterial = 'copper'; 

let calcCurrentInput = '0';
let calcStoredExpression = '';
let isEquationFinished = false;

// 📊 PUE / GOST-ის ოფიციალური სტანდარტის მონაცემთა ბაზა (ფარული გაყვანილობა)
const cableSpecs = {
    copper: {
        "0.12": { amperage: { conduit: 1.5, air: 2.0, ground: 2.5 }, price_per_meter: 0.3 },
        "0.2":  { amperage: { conduit: 2.5, air: 3.5, ground: 4.0 }, price_per_meter: 0.4 },
        "0.35": { amperage: { conduit: 4.5, air: 6.0, ground: 7.0 }, price_per_meter: 0.5 },
        "0.5":  { amperage: { conduit: 6,   air: 9,   ground: 11 },  price_per_meter: 0.7 },
        "0.75": { amperage: { conduit: 10,  air: 12,  ground: 15 },  price_per_meter: 1.0 },
        "1.0":  { amperage: { conduit: 14,  air: 16,  ground: 19 },  price_per_meter: 1.3 },
        "1.5":  { amperage: { conduit: 15,  air: 19,  ground: 22 },  price_per_meter: 1.8 },
        "2.0":  { amperage: { conduit: 19,  air: 23,  ground: 26 },  price_per_meter: 2.1 },
        "2.5":  { amperage: { conduit: 21,  air: 27,  ground: 30 },  price_per_meter: 2.5 },
        "4.0":  { amperage: { conduit: 27,  air: 36,  ground: 40 },  price_per_meter: 3.8 },
        "6.0":  { amperage: { conduit: 34,  air: 46,  ground: 50 },  price_per_meter: 5.5 },
        "10.0": { amperage: { conduit: 50,  air: 63,  ground: 70 },  price_per_meter: 8.5 },
        "16.0": { amperage: { conduit: 80,  air: 85,  ground: 90 },  price_per_meter: 13.0 },
        "25.0": { amperage: { conduit: 100, air: 115, ground: 125 }, price_per_meter: 19.0 },
        "35.0": { amperage: { conduit: 135, air: 145, ground: 155 }, price_per_meter: 26.0 },
        "50.0": { amperage: { conduit: 175, air: 185, ground: 205 }, price_per_meter: 35.0 },
        "70.0": { amperage: { conduit: 215, air: 235, ground: 260 }, price_per_meter: 50.0 },
        "95.0": { amperage: { conduit: 260, air: 290, ground: 320 }, price_per_meter: 68.0 },
        "120.0":{ amperage: { conduit: 300, air: 335, ground: 370 }, price_per_meter: 85.0 },
        "150.0":{ amperage: { conduit: 330, air: 380, ground: 415 }, price_per_meter: 105.0 },
        "185.0":{ amperage: { conduit: 500, air: 435, ground: 475 }, price_per_meter: 130.0 },
        "240.0":{ amperage: { conduit: 600, air: 520, ground: 560 }, price_per_meter: 170.0 },
        "300.0":{ amperage: { conduit: 680, air: 600, ground: 645 }, price_per_meter: 210.0 },
        "400.0":{ amperage: { conduit: 800, air: 700, ground: 750 }, price_per_meter: 280.0 }
    },
    aluminum: {
        "0.12": { amperage: { conduit: 1.0, air: 1.5, ground: 2.0 }, price_per_meter: 0.15 },
        "0.2":  { amperage: { conduit: 1.8, air: 2.5, ground: 3.0 }, price_per_meter: 0.20 },
        "0.35": { amperage: { conduit: 3.0, air: 4.2, ground: 5.0 }, price_per_meter: 0.25 },
        "0.5":  { amperage: { conduit: 4.5, air: 6.5, ground: 7.5 }, price_per_meter: 0.35 },
        "0.75": { amperage: { conduit: 7.0, air: 9.0, ground: 10.5 }, price_per_meter: 0.50 },
        "1.0":  { amperage: { conduit: 10.0, air: 12.0, ground: 14.0 }, price_per_meter: 0.65 },
        "1.5":  { amperage: { conduit: 10.0, air: 14.0, ground: 16.0 }, price_per_meter: 0.80 },
        "2.0":  { amperage: { conduit: 14.0, air: 18.0, ground: 20.0 }, price_per_meter: 0.95 },
        "2.5":  { amperage: { conduit: 16.0, air: 21.0, ground: 23.0 }, price_per_meter: 1.10 },
        "4.0":  { amperage: { conduit: 21.0, air: 28.0, ground: 30.0 }, price_per_meter: 1.60 },
        "6.0":  { amperage: { conduit: 26.0, air: 36.0, ground: 38.0 }, price_per_meter: 2.20 },
        "10.0": { amperage: { conduit: 38.0, air: 50.0, ground: 55.0 }, price_per_meter: 3.50 },
        "16.0": { amperage: { conduit: 55.0, air: 60.0, ground: 65.0 }, price_per_meter: 5.00 },
        "25.0": { amperage: { conduit: 65.0, air: 85.0, ground: 95.0 }, price_per_meter: 7.50 },
        "35.0": { amperage: { conduit: 75.0, air: 105.0, ground: 115.0 }, price_per_meter: 10.00 },
        "50.0": { amperage: { conduit: 105.0, air: 135.0, ground: 150.0 }, price_per_meter: 14.00 },
        "70.0": { amperage: { conduit: 135.0, air: 170.0, ground: 205.0 }, price_per_meter: 19.00 },
        "95.0": { amperage: { conduit: 200.0, air: 210.0, ground: 230.0 }, price_per_meter: 26.00 },
        "120.0":{ amperage: { conduit: 230.0, air: 245.0, ground: 270.0 }, price_per_meter: 33.00 },
        "150.0":{ amperage: { conduit: 255.0, air: 280.0, ground: 305.0 }, price_per_meter: 40.00 },
        "185.0":{ amperage: { conduit: 350.0, air: 320.0, ground: 350.0 }, price_per_meter: 50.00 },
        "240.0":{ amperage: { conduit: 450.0, air: 380.0, ground: 415.0 }, price_per_meter: 65.00 },
        "300.0":{ amperage: { conduit: 500.0, air: 440.0, ground: 475.0 }, price_per_meter: 82.00 },
        "400.0":{ amperage: { conduit: 600.0, air: 700.0, ground: 750.0 }, price_per_meter: 110.00 }
    }
};

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    document.getElementById(tabId).classList.remove('hidden');
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.className = "tab-btn px-4 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-gray-200 transition cursor-pointer";
    });
    
    const activeBtn = document.getElementById('btn-' + tabId);
    activeBtn.className = "tab-btn px-4 py-2 rounded-md text-sm font-medium transition bg-amber-500 text-gray-900 font-semibold cursor-pointer";

    if (tabId === 'formulas-tab') {
        calcFormulaAmperage();
        calcFormulaWatts();
        calcFormulaVoltage();
        calcAdvancedDrop();
        calcLedPower();
    }
    if (tabId === 'panel-tab') {
        onPanelDeviceChange();
        calculateGofSize();
        calculateMotorSpecs();
    }
}

function setMaterial(material) {
    currentMaterial = material;
    const btnCu = document.getElementById('btn-cu');
    const btnAl = document.getElementById('btn-al');
    const badge = document.getElementById('material-badge');

    if (material === 'copper') {
        btnCu.className = "px-6 py-2 rounded-lg text-sm font-bold transition flex items-center space-x-2 bg-amber-500 text-gray-900 shadow-md cursor-pointer";
        btnAl.className = "px-6 py-2 rounded-lg text-sm font-bold transition flex items-center space-x-2 text-gray-400 hover:text-gray-200 cursor-pointer";
        badge.innerText = "სპილენძის ხაზი";
        badge.className = "text-xs px-2.5 py-1 rounded-full font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase tracking-wider";
    } else {
        btnAl.className = "px-6 py-2 rounded-lg text-sm font-bold transition flex items-center space-x-2 bg-slate-300 text-gray-900 shadow-md cursor-pointer";
        btnCu.className = "px-6 py-2 rounded-lg text-sm font-bold transition flex items-center space-x-2 text-gray-400 hover:text-gray-200 cursor-pointer";
        badge.innerText = "ალუმინის ხაზი";
        badge.className = "text-xs px-2.5 py-1 rounded-full font-bold bg-slate-400/10 text-slate-300 border border-slate-500/30 uppercase tracking-wider";
    }
    calculateLoad(); 
}

function calculateLoad() {
    const sizeStr = document.getElementById('wire-size').value;
    const sizeValue = parseFloat(sizeStr) || 2.5;
    const length = parseFloat(document.getElementById('wire-length').value) || 0;
    const voltage = parseFloat(document.getElementById('wire-voltage').value) || 220;
    const phase = document.getElementById('phase-type').value;
    const install = document.getElementById('install-type').value;

    let maxAmperage = 0;
    let price = 0;

    if (cableSpecs && cableSpecs[currentMaterial] && cableSpecs[currentMaterial][sizeStr]) {
        maxAmperage = cableSpecs[currentMaterial][sizeStr].amperage[install];
        price = cableSpecs[currentMaterial][sizeStr].price_per_meter;
    }

    maxAmperage = parseFloat(maxAmperage.toFixed(1));
    const recommendedAmperage = (maxAmperage * 0.90).toFixed(1);

    let maxPowerkW = 0;
    if (phase === '1' || phase === 'dc') {
        maxPowerkW = (maxAmperage * voltage) / 1000;
    } else {
        maxPowerkW = (maxAmperage * voltage * Math.sqrt(3)) / 1000;
    }

    const rho = (currentMaterial === 'copper') ? 0.0175 : 0.028;
    let voltageDrop = 0;

    if (phase === '1' || phase === 'dc') {
        voltageDrop = (2 * rho * length * maxAmperage) / sizeValue;
    } else {
        voltageDrop = (Math.sqrt(3) * rho * length * maxAmperage) / sizeValue;
    }

    const dropPercent = voltage > 0 ? (voltageDrop / voltage) * 100 : 0;

    document.getElementById('res-amperage').innerHTML = `${maxAmperage} A <span class="text-xs font-normal text-amber-300 block mt-0.5">(რეკომენდებული: ≤ ${recommendedAmperage} A)</span>`;
    document.getElementById('res-power').innerText = maxPowerkW.toFixed(2) + " kW";
    document.getElementById('res-price').innerText = price.toFixed(2) + " ₾ / მეტრი";
    document.getElementById('res-drop-volt').innerText = voltageDrop.toFixed(2) + " V";
    document.getElementById('res-drop-percent').innerText = `(${dropPercent.toFixed(2)}%)`;

    const statusEl = document.getElementById('res-drop-status');
    if (dropPercent <= 3) {
        statusEl.innerText = "✓ ვარდნა იდეალურ ნორმაშია (≤ 3%)";
        statusEl.className = "text-xs mt-1 font-medium text-emerald-400";
    } else if (dropPercent <= 5) {
        statusEl.innerText = "⚠ ვარდნა დასაშვებ ზღვარზეა (3% - 5%)";
        statusEl.className = "text-xs mt-1 font-medium text-amber-400";
    } else {
        statusEl.innerText = "❌ კრიტიკული ვარდნა (> 5%)! გაზარდეთ კვეთა!";
        statusEl.className = "text-xs mt-1 font-medium text-rose-400 animate-pulse";
    }

    // 🔴 წითელი გაფრთხილება 10%-იან რეზერვზე კალკულატორის ქვემოთ
    let maxLimitNote = document.getElementById('max-limit-note');
    if (!maxLimitNote) {
        maxLimitNote = document.createElement('div');
        maxLimitNote.id = 'max-limit-note';
        maxLimitNote.className = 'col-span-2 bg-rose-950/40 border border-rose-800/60 text-rose-400 text-xs p-3 rounded-xl mt-3 flex items-center gap-2 shadow-inner';
        const resContainer = document.getElementById('res-amperage').closest('.grid');
        if (resContainer && resContainer.parentNode) {
            resContainer.parentNode.appendChild(maxLimitNote);
        }
    }
    maxLimitNote.innerHTML = `<span>⚠️</span> <span><strong>ყურადღება:</strong> მითითებული დენი (<strong>${maxAmperage} A</strong>) წარმოადგენს კაბელის მაქსიმალურ დასაშვებ ზღვარს. ხანგრძლივი უსაფრთხოებისათვის რეკომენდებულია 10%-ით ნაკლები დატვირთვა (მაქს. <strong>${recommendedAmperage} A</strong>).</span>`;
}

function calcFormulaAmperage() {
    const power = parseFloat(document.getElementById('f-amp-power').value) || 0;
    const volt = parseFloat(document.getElementById('f-amp-volt').value) || 1;
    const phase = document.getElementById('f-amp-phase').value;
    let amperage = 0;
    if (phase === '1' || phase === 'dc') amperage = power / volt;
    else amperage = power / (volt * Math.sqrt(3));
    document.getElementById('f-amp-result').innerText = amperage.toFixed(2) + " A";
}

function calcFormulaWatts() {
    const amp = parseFloat(document.getElementById('f-watt-amp').value) || 0;
    const volt = parseFloat(document.getElementById('f-watt-volt').value) || 0;
    const phase = document.getElementById('f-watt-phase').value;
    let watts = 0;
    if (phase === '1' || phase === 'dc') watts = amp * volt;
    else watts = amp * volt * Math.sqrt(3);
    const kw = watts / 1000;
    document.getElementById('f-watt-result').innerText = `${watts.toFixed(0)} W (${kw.toFixed(2)} kW)`;
}

function calcFormulaVoltage() {
    const power = parseFloat(document.getElementById('f-volt-power').value) || 0;
    const amp = parseFloat(document.getElementById('f-volt-amp').value) || 1;
    const phase = document.getElementById('f-volt-phase').value;
    let volt = 0;
    if (phase === '3') volt = power / (amp * Math.sqrt(3));
    else volt = power / amp;
    document.getElementById('f-volt-result').innerText = volt.toFixed(2) + " V";
}

function calcAdvancedDrop() {
    const size = parseFloat(document.getElementById('vdrop-size').value) || 0.01;
    const len = parseFloat(document.getElementById('vdrop-len').value) || 0;
    const amp = parseFloat(document.getElementById('vdrop-amp').value) || 0;
    const mat = document.getElementById('vdrop-mat').value;
    const sys = document.getElementById('vdrop-sys').value;
    const rho = (mat === 'cu') ? 0.0175 : 0.028;
    let drop = 0;
    if (sys === '1' || sys === 'dc') drop = (2 * rho * len * amp) / size;
    else drop = (Math.sqrt(3) * rho * len * amp) / size;
    document.getElementById('vdrop-res-volt').innerText = drop.toFixed(2) + " V";
}

function convertDiaToSize() {
    const dia = parseFloat(document.getElementById('conv-dia').value) || 0;
    const size = (Math.PI * Math.pow(dia, 2)) / 4;
    document.getElementById('conv-res-size').innerText = size.toFixed(2) + " მმ²";
}

function convertSizeToDia() {
    const size = parseFloat(document.getElementById('conv-size').value) || 0;
    const dia = 2 * Math.sqrt(size / Math.PI);
    document.getElementById('conv-res-dia').innerText = dia.toFixed(2) + " Ø მმ";
}

function calcLedPower() {
    const len = parseFloat(document.getElementById('led-len').value) || 0;
    const wpm = parseFloat(document.getElementById('led-wpm').value) || 0;
    const pure = len * wpm;
    const total = pure * 1.20;
    document.getElementById('led-res-pure').innerText = pure.toFixed(1) + " W";
    document.getElementById('led-res-total').innerText = "≥ " + total.toFixed(1) + " W";
}

const avgDevicePowers = {
    washer: 2200,
    conditioner: 1800,
    boiler: 2500,
    oven: 3500,
    sockets: 2000,
    lighting: 600
};

function onPanelDeviceChange() {
    const dev = document.getElementById('panel-device').value;
    document.getElementById('panel-exact-power').value = avgDevicePowers[dev];
    calculatePanelSpecs();
}

function toggleExactPowerBlock() {
    const block = document.getElementById('exact-power-block');
    block.classList.toggle('hidden');
}

function calculatePanelSpecs() {
    const dev = document.getElementById('panel-device').value;
    const power = parseFloat(document.getElementById('panel-exact-power').value) || 0;
    const amp = power / 220;

    let wire = "3x2.5 მმ² (სპილენძი)";
    let breaker = "16A (C ტიპი)";
    let rcd = "საჭიროა (30mA გაჟონვაზე)";

    if (dev === 'lighting' && power < 2000) {
        wire = "3x1.5 მმ² (სპილენძი)";
        breaker = "10A (B ტიპი)";
        rcd = "არ არის სავალდებულო";
    } else if (amp > 16 && amp <= 25) {
        wire = "3x4.0 მმ² (სპილენძი)";
        breaker = "25A (C ტიპი)";
    } else if (amp > 25) {
        wire = "3x6.0 მმ² (სპილენძი)";
        breaker = "32A / 40A (C ტიპი)";
    }

    if (dev === 'washer' || dev === 'boiler') {
        rcd = "⚠️ აუცილებელია! (სველი ზონა - რეკომენდებულია 10mA)";
    }

    document.getElementById('p-res-wire').innerText = wire;
    document.getElementById('p-res-breaker').innerText = breaker;
    document.getElementById('p-res-rcd').innerText = rcd;
}

function calculateGofSize() {
    const count = parseInt(document.getElementById('gof-count').value) || 1;
    const dia = parseFloat(document.getElementById('gof-cable-dia').value) || 0;

    const totalCableArea = count * (Math.PI * Math.pow(dia, 2) / 4);
    const requiredInnerArea = totalCableArea / 0.4;
    const innerDia = 2 * Math.sqrt(requiredInnerArea / Math.PI);

    let gofSize = "Ø 16 მმ";
    if (innerDia > 10.7 && innerDia <= 14.1) gofSize = "Ø 20 მმ";
    else if (innerDia > 14.1 && innerDia <= 18.2) gofSize = "Ø 25 მმ";
    else if (innerDia > 18.2 && innerDia <= 24.3) gofSize = "Ø 32 მმ";
    else if (innerDia > 24.3) gofSize = "Ø 40 მმ+";

    document.getElementById('gof-result').innerText = gofSize;
}

function calculateMotorSpecs() {
    const kw = parseFloat(document.getElementById('motor-kw').value) || 0;
    const cos = parseFloat(document.getElementById('motor-cos').value) || 0.85;
    const connect = document.getElementById('motor-connect').value;

    let amp = 0;
    let relay = "";
    let capacitor = "არ სჭირდება";

    if (connect === '3') {
        amp = (kw * 1000) / (380 * Math.sqrt(3) * cos);
        relay = `${(amp * 1.1).toFixed(1)} - ${(amp * 1.25).toFixed(1)}A რეგულირებადი`;
    } else {
        amp = (kw * 1000) / (220 * cos);
        relay = `${(amp * 1.15).toFixed(1)}A ნომინალი`;
        capacitor = `⚙️ სამუშაო: ${(kw * 70).toFixed(0)} μF (მინ. 450V)`;
    }

    document.getElementById('m-res-amp').innerText = amp.toFixed(1) + " A";
    document.getElementById('m-res-relay').innerText = relay;
    document.getElementById('m-res-capacitor').innerText = capacitor;
}

function toggleMathCalc() {
    const sidebar = document.getElementById('math-calc-sidebar');
    sidebar.classList.toggle('translate-x-full');
}

function updateCalcDisplay() {
    document.getElementById('calc-display').innerText = calcCurrentInput;
    document.getElementById('calc-history').innerText = calcStoredExpression;
}

function inputNum(num) {
    if (isEquationFinished) { calcCurrentInput = num; isEquationFinished = false; }
    else { if (calcCurrentInput === '0') calcCurrentInput = num; else calcCurrentInput += num; }
    updateCalcDisplay();
}

function inputDecimal() {
    if (isEquationFinished) { calcCurrentInput = '0.'; isEquationFinished = false; updateCalcDisplay(); return; }
    if (!calcCurrentInput.includes('.')) calcCurrentInput += '.';
    updateCalcDisplay();
}

function inputOperator(op) {
    if (isEquationFinished) { calcStoredExpression = calcCurrentInput + ' ' + op + ' '; isEquationFinished = false; }
    else { calcStoredExpression += calcCurrentInput + ' ' + op + ' '; }
    calcCurrentInput = '0';
    updateCalcDisplay();
}

function clearCalc() { calcCurrentInput = '0'; calcStoredExpression = ''; isEquationFinished = false; updateCalcDisplay(); }

function backspaceCalc() {
    if (isEquationFinished) { clearCalc(); return; }
    if (calcCurrentInput.length > 1) calcCurrentInput = calcCurrentInput.slice(0, -1);
    else calcCurrentInput = '0';
    updateCalcDisplay();
}

function calculateResult() {
    if (calcStoredExpression === '') return;
    let fullExpression = calcStoredExpression + calcCurrentInput;
    try {
        let result = new Function(`return (${fullExpression})`)();
        if (result.toString().includes('.')) result = parseFloat(result.toFixed(4));
        calcStoredExpression = fullExpression + ' =';
        calcCurrentInput = result.toString();
        isEquationFinished = true;
    } catch (e) { calcCurrentInput = 'Error'; calcStoredExpression = ''; isEquationFinished = true; }
    updateCalcDisplay();
}

function openStandardsModal() {
    document.getElementById('standards-modal').classList.remove('hidden');
}

function closeStandardsModal() {
    document.getElementById('standards-modal').classList.add('hidden');
}

// 🚀 ინიციალიზაცია გვერდის ჩატვირთვისას
window.onload = calculateLoad;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker დარეგისტრირდა!', reg))
            .catch(err => console.log('Service Worker შეცდომა:', err));
    });
}
