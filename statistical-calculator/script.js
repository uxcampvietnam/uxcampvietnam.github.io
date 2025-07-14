// Hàm chung -------------------------

function parseInput(text) {
    return text
        .split(/[\s,;]+/)
        .map(Number)
        .filter(n => !isNaN(n));
}

function parseNumbers(textareaId) {
    return document.getElementById(textareaId)
        .value
        .split(/[\s,;]+/)
        .filter(v => v.trim() !== '')
        .map(Number)
        .filter(Number.isFinite);
}

// Chi Squared Test -----------------------------------------

function createTable() {
    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);
    const container = document.getElementById("tableContainer");

    let html = "<table border='0' cellspacing='0' cellpadding='0'><thead><tr><th></th>";
    for (let j = 0; j < cols; j++) {
        html += `<th><input type='text' id='colTitle-${j}' placeholder='Cột ${j + 1}'></th>`;
    }
    html += "</tr></thead><tbody>";

    for (let i = 0; i < rows; i++) {
        html += "<tr>";
        html += `<th><input type='text' id='rowTitle-${i}' placeholder='Hàng ${i + 1}'></th>`;
        for (let j = 0; j < cols; j++) {
            html += `<td><input type='number' id='cell-${i}-${j}' min='0' value='0'></td>`;
        }
        html += "</tr>";
    }
    html += "</tbody></table>";
    container.innerHTML = html;
}

function calculateChiSquared() {
    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);
    const data = [];

    for (let i = 0; i < rows; i++) {
        data[i] = [];
        for (let j = 0; j < cols; j++) {
            const val = parseFloat(document.getElementById(`cell-${i}-${j}`).value);
            data[i][j] = isNaN(val) ? 0 : val;
        }
    }

    const rowSums = data.map(row => row.reduce((a, b) => a + b, 0));
    const colSums = Array(cols).fill(0);
    let total = 0;
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            colSums[j] += data[i][j];
        }
        total += colSums[j];
    }

    let chi2 = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const expected = (rowSums[i] * colSums[j]) / total;
            if (expected > 0) {
                chi2 += Math.pow(data[i][j] - expected, 2) / expected;
            }
        }
    }

    const df = (rows - 1) * (cols - 1);
    const pValue = 1 - jStat.chisquare.cdf(chi2, df);
    const alpha = parseFloat(document.querySelector('input[name="alpha-selection"]:checked').value);
    const decision = pValue < alpha
        ? 'Reject H₀'
        : 'Fail to reject H₀';

    var result = {
        row1: { col1: "Chi-squared:", col2: chi2.toFixed(8) },
        row6: { col1: "df:", col2: df },
        row7: { col1: "α:", col2: alpha },
        row9: { col1: "p-value:", col2: pValue.toFixed(4) },
        row10: { col1: "Kết luận:", col2: decision, },
    };

    objectToTableHTML("Kết quả Chi-squared Test", result, "result", (pValue < alpha));

}

// Kruskal Wallis -------------------------------------------

function calculateKruskalWallis() {
    const groupBlocks = document.querySelectorAll(".kruskal-wallis-group-block");
    const alpha = parseFloat(document.querySelector('input[name="alpha-selection"]:checked').value);

    let groupData = [];
    let groupLabels = [];

    // Parse and clean data
    for (let block of groupBlocks) {
        const label = block.querySelector(".group-label").value || `Nhóm ${groupData.length + 1}`;
        const rawData = block.querySelector("textarea").value;
        const values = rawData
            .split(/[\n,; \t]+/)
            .map(v => parseFloat(v.trim()))
            .filter(v => !isNaN(v));

        if (values.length === 0) continue;

        groupData.push(values);
        groupLabels.push(label);
    }

    if (groupData.length < 2) {
        var result = {
            row1: { col1: "Cần ít nhất 2 nhóm để thực hiện kiểm định Kruskal-Wallis." },
        };
        objectToTableHTML("Lỗi", result, "result", "error");
        return;
    }

    // Combine all data for ranking
    let allData = [];
    groupData.forEach((arr, groupIdx) => {
        arr.forEach(value => {
            allData.push({ value, group: groupIdx });
        });
    });

    // Sort and rank data
    allData.sort((a, b) => a.value - b.value);
    for (let i = 0; i < allData.length;) {
        let j = i;
        while (j < allData.length && allData[j].value === allData[i].value) j++;
        const avgRank = (i + j + 1) / 2;
        for (let k = i; k < j; k++) {
            allData[k].rank = avgRank;
        }
        i = j;
    }

    // Tính tổng hạng từng nhóm
    let rankSums = new Array(groupData.length).fill(0);
    let groupNs = new Array(groupData.length).fill(0);

    allData.forEach(({ rank, group }) => {
        rankSums[group] += rank;
        groupNs[group]++;
    });

    const N = allData.length;
    const k = groupData.length;

    let H = (12 / (N * (N + 1))) *
        rankSums.reduce((sum, Rj, j) => sum + (Rj * Rj) / groupNs[j], 0)
        - 3 * (N + 1);

    const df = k - 1;
    const pValue = 1 - jStat.chisquare.cdf(H, df);

    // Kết luận
    const rejectH0 = pValue < alpha;

    var decision = rejectH0 ?
        "Reject H₀" :
        "Fail to reject H₀";

    var resultKruskalWallis = {};

    groupData.forEach((group, i) => {
        var groupObject = { [i]: { col1: groupLabels[i], col2: group.length + " quan sát" } };
        Object.assign(resultKruskalWallis, groupObject);
    });

    resultKruskalWallis.rowA = { col1: "H:", col2: H.toFixed(4) };
    resultKruskalWallis.rowB = { col1: "df:", col2: df };
    resultKruskalWallis.rowC = { col1: "p-value:", col2: pValue.toFixed(4) };
    resultKruskalWallis.rowD = { col1: "Kết luận:", col2: decision };


    console.log(resultKruskalWallis);

    objectToTableHTML("Kết quả Kruskal-Wallis Test", resultKruskalWallis, "result", (pValue < alpha));

}

function addKruskalWallisGroup() {
    const groupsDiv = document.getElementById('groups');
    const num = groupsDiv.children.length + 1;
    const block = document.createElement('div');
    block.className = 'kruskal-wallis-group-block';
    block.innerHTML = `
        <input type="text" placeholder="Tên nhóm" value="Nhóm ${num}" class="group-label single-input" />
        <textarea placeholder="Dữ liệu (cách nhau bằng dấu phẩ, chấm phảy, cách, xuống dòng)"></textarea>`;
    groupsDiv.appendChild(block);
}

function removeKruskalWallisGroup() {
    const groupsDiv = document.getElementById('groups');
    if (groupsDiv.children.length > 2) {
        groupsDiv.removeChild(groupsDiv.lastElementChild);
    }
}

//One-Sample-T-Test ---------------------------

function performOneSampleTTest() {

    // Lấy dữ liệu từ textArea
    const data = parseNumbers('sampleData');
    const n = data.length;

    // Lấy alpha và loại kiểm định
    const alpha = parseFloat(document.querySelector('input[name="alpha-selection"]:checked').value);
    const testType = document.querySelector('input[name="testType-selection"]:checked').value;


    // Kiểm tra dữ liệu
    if (n < 2) {
        var result = {
            row1: { col1: "Cần ít nhất 2 giá trị số hợp lệ." },
        };
        objectToTableHTML("Lỗi", result, "result", "error");
        return;
    }

    const mu0 = parseFloat(document.getElementById('mu0').value);
    if (!Number.isFinite(mu0)) {
        var result = {
            row1: { col1: "Vui lòng nhập giá trị μ₀ hợp lệ." },
        };
        objectToTableHTML("Lỗi", result, "result", "error");
        return;
    }

    // Thông số mô tả
    const mean = jStat.mean(data);
    const sd = jStat.stdev(data, true);   // sample SD (n-1)
    const se = sd / Math.sqrt(n);
    const tStat = (mean - mu0) / se;
    const df = n - 1;

    // p-value tuỳ loại kiểm định
    let pValue;
    const cdfVal = jStat.studentt.cdf(tStat, df);

    switch (testType) {
        case 'two-tailed':
            pValue = (2 * Math.min(cdfVal, 1 - cdfVal)).toFixed(8);
            break;
        case 'greater':      // H₁: μ > μ₀
            pValue = (1 - cdfVal).toFixed(8);
            break;
        case 'less':         // H₁: μ < μ₀
            pValue = (cdfVal).toFixed(8);
            break;
    }

    // Khoảng tin cậy 95 % cho μ (x̄ ± t_{0.975,df}·SE)
    const tCrit95 = jStat.studentt.inv(0.975, df);
    const ciLow = mean - tCrit95 * se;
    const ciHigh = mean + tCrit95 * se;

    // Kết luận
    const decision = pValue <= alpha ? 'Reject H₀' : 'Fail to reject H₀';


    var result = {
        row1: { col1: "Số lượng mẫu (n):", col2: n },
        row2: { col1: "Trung bình mẫu (x̄):", col2: mean.toFixed(4) },
        row3: { col1: "Độ lệch chuẩn (s):", col2: sd.toFixed(4) },
        row4: { col1: "Giá trị t-statistic:", col2: tStat.toFixed(4) },
        row5: { col1: "Bậc tự do (df):", col2: df },
        row6: { col1: "α:", col2: alpha },
        row7: { col1: "p-value:", col2: pValue },
        row8: { col1: "CI 95% cho μ:", col2: "(" + ciLow.toFixed(4) + " ; " + ciHigh.toFixed(4) + ")" },
        row9: { col1: "Kết luận:", col2: decision },
    };

    objectToTableHTML("Kết quả One-Sample t-Test", result, "result", (pValue <= alpha));
};

// Paired Sample T Test -------------------------------

function mean(arr) {
    return arr.reduce((s, v) => s + v, 0) / arr.length;
}
function variance(arr, m) {
    return arr.reduce((s, v) => s + Math.pow(v - m, 2), 0) / (arr.length - 1);
}
function pearson(x, y, mx, my) {
    let num = 0, denomX = 0, denomY = 0;
    for (let i = 0; i < x.length; i++) {
        const dx = x[i] - mx;
        const dy = y[i] - my;
        num += dx * dy;
        denomX += dx * dx;
        denomY += dy * dy;
    }
    return num / Math.sqrt(denomX * denomY);
}

function calculatePairedTTest() {
    const x = parseNumbers('group1');

    const y = parseNumbers('group2');

    if (x.length === 0 || y.length === 0) {
        var result = {
            row1: { col1: "Cần nhập dữ liệu cho cả hai nhóm" },
        };
        objectToTableHTML("Lỗi", result, "result", "error");
        return;
    }
    if (x.length !== y.length) {
        var result = {
            row1: { col1: "Hai nhóm phải có cùng số lượng quan sát." },
        };
        objectToTableHTML("Lỗi", result, "result", "error");
        return;
    }

    const alpha = parseFloat(document.querySelector('input[name="alpha-selection"]:checked').value);
    const testType = document.querySelector('input[name="testType-selection"]:checked').value;

    const n = x.length;
    const meanX = mean(x);
    const meanY = mean(y);
    const varX = variance(x, meanX);
    const varY = variance(y, meanY);
    const r = pearson(x, y, meanX, meanY);

    const d = x.map((xi, i) => xi - y[i]);
    const dBar = mean(d);
    const sdDiff = Math.sqrt(variance(d, dBar));
    const df = n - 1;
    const tStat = dBar / (sdDiff / Math.sqrt(n));

    let pValue;
    if (testType === 'greater') {
        pValue = (1 - jStat.studentt.cdf(tStat, df)).toFixed(8);
    } else if (testType === 'less') {
        pValue = (jStat.studentt.cdf(tStat, df)).toFixed(8);
    } else { // two-tailed
        pValue = (2 * (1 - jStat.studentt.cdf(Math.abs(tStat), df))).toFixed(8);
    }

    const fix = n => Number(n).toPrecision(8);
    const decision = pValue <= alpha ? 'Reject H₀' : 'Fail to reject H₀';


    var g1Name = document.getElementById('group1Name').value || 'Variable 1';
    var g2Name = document.getElementById('group2Name').value || 'Variable 2';

    var result = {
        row1: { col1: "", col2: g1Name, col3: g2Name },
        row3: { col1: "Mean:", col2: fix(meanX), col3: fix(meanY) },
        row4: { col1: "Variance:", col2: fix(varX), col3: fix(varY) },
        row2: { col1: "n:", col2: n, col3: n },
        row6: { col1: "Pearson Correlation:", col2: fix(r) },
        row6: { col1: "df:", col2: df.toFixed(0) },
        row5: { col1: "t-statistic:", col2: tStat },
        row7: { col1: "α:", col2: alpha },
        row8: { col1: "Loại kiểm định:", col2: testType },
        row9: { col1: "p-value:", col2: pValue },
        row10: { col1: "Kết luận:", col2: decision, },
    };

    objectToTableHTML("Kết quả Paired Sample t-Test", result, "result", (pValue <= alpha));
}

// Two Sample T Test -------------------------

function calculateTwoSampleTTest() {

    const g1Name = document.getElementById('group1Name').value || 'Group 1';
    const g2Name = document.getElementById('group2Name').value || 'Group 2';

    const x = parseNumbers('group1Data');
    const y = parseNumbers('group2Data');

    if (x.length < 2 || y.length < 2) {
        var result = {
            row1: { col1: "Mỗi nhóm cần ít nhất 2 giá trị hợp lệ." },
        };
        objectToTableHTML("Lỗi", result, "result", "error");
        return;
    }

    /* descriptive stats */
    const n1 = x.length, n2 = y.length;
    const m1 = jStat.mean(x), m2 = jStat.mean(y);
    const v1 = jStat.variance(x, true);   // sample variance
    const v2 = jStat.variance(y, true);

    /* Welch’s t */
    const se = Math.sqrt(v1 / n1 + v2 / n2);
    const t = (m1 - m2) / se;

    /* Welch–Satterthwaite df */
    const df = Math.pow(v1 / n1 + v2 / n2, 2) /
        (Math.pow(v1 / n1, 2) / (n1 - 1) + Math.pow(v2 / n2, 2) / (n2 - 1));

    /* α & test type */
    const alpha = parseFloat(document.querySelector('input[name="alpha-selection"]:checked').value);
    const testType = document.querySelector('input[name="testType-selection"]:checked').value;

    /* p-value */
    const cdf = jStat.studentt.cdf(t, df);
    let pValue;
    switch (testType) {
        case 'two-tailed':
            pValue = (2 * Math.min(cdf, 1 - cdf)).toFixed(8);
            break;
        case 'greater':      // H₁: μ₁ > μ₂
            pValue = (1 - cdf).toFixed(8);
            break;
        case 'less':         // H₁: μ₁ < μ₂
            pValue = (cdf).toFixed(8);
            break;
    }

    const decision = pValue <= alpha ? 'Reject H₀' : 'Fail to reject H₀';

    var result = {
        row1: { col1: "", col2: g1Name, col3: g2Name },
        row2: { col1: "n:", col2: n1, col3: n2 },
        row3: { col1: "Mean:", col2: m1.toFixed(8), col3: m2.toFixed(8) },
        row4: { col1: "Variance:", col2: v1.toFixed(8), col3: v2.toFixed(8) },
        row5: { col1: "t-statistic:", col2: t.toFixed(8) },
        row6: { col1: "df:", col2: df.toFixed(0) },
        row7: { col1: "α:", col2: alpha },
        row8: { col1: "Loại kiểm định:", col2: testType },
        row9: { col1: "p-value:", col2: pValue },
        row10: { col1: "Kết luận:", col2: decision, },
    };

    console.log(result);

    objectToTableHTML("Kết quả Two-Sample t-Test", result, "result", (pValue <= alpha) );


};

// Sample size Calculator -----------------------------------

function calculateSampleSize() {
    const N = parseInt(document.getElementById('population').value);
    const z = parseFloat(document.querySelector('input[name="confidence-level-selection"]:checked').value);
    const e = parseFloat(document.getElementById('margin').value) / 100;
    const p = 0.5; // most conservative estimate

    // Sample size without finite population correction
    const numerator = Math.pow(z, 2) * p * (1 - p) / Math.pow(e, 2);
    // With finite population correction
    const denominator = 1 + numerator / N;
    sampleSize = Math.ceil(numerator / denominator);


    var result = {
        row1: { col1: sampleSize }
    };

    objectToTableHTML("Required sample size", result, "result", true);

    // document.getElementById("result").innerHTML = ` Required sample size: <strong>${sampleSize}</strong>`;
}


// Calculate Z Test for 2 Portions ---------------------------------------

let chart;

function performZTest() {
    const x1 = parseInt(document.getElementById('x1').value);
    const n1 = parseInt(document.getElementById('n1').value);
    const x2 = parseInt(document.getElementById('x2').value);
    const n2 = parseInt(document.getElementById('n2').value);
    const alpha = parseFloat(document.querySelector('input[name="alpha-selection"]:checked').value);
    const testType = document.querySelector('input[name="testType-selection"]:checked').value;

    const p1 = x1 / n1;
    const p2 = x2 / n2;
    const p_pool = (x1 + x2) / (n1 + n2);
    const se = Math.sqrt(p_pool * (1 - p_pool) * (1 / n1 + 1 / n2));
    const z = (p1 - p2) / se;

    let pValue;
    if (testType === 'two-tailed') {
        pValue = (2 * (1 - normalCDF(Math.abs(z)))).toFixed(8);
    } else if (testType === 'less') {
        pValue = normalCDF(z).toFixed(8);
    } else if (testType === 'greater') {
        pValue = (1 - normalCDF(z)).toFixed(8);
    }

    // Confidence Interval (95%)
    const se_diff = Math.sqrt((p1 * (1 - p1)) / n1 + (p2 * (1 - p2)) / n2);
    const z_crit = 1.96;
    const ci_low = (p1 - p2) - z_crit * se_diff;
    const ci_high = (p1 - p2) + z_crit * se_diff;

    var decision = pValue <= alpha ?
        "Reject H₀" :
        "Fail to reject H₀";

    var result = {
        row1: { col1: "Tỷ lệ nhóm 1 (p1)", col2: p1.toFixed(4) },
        row2: { col1: "Tỷ lệ nhóm 2 (p2):", col2: p2.toFixed(4) },
        row3: { col1: "z:", col2: z.toFixed(4) },
        row4: { col1: "CI 95% cho (p1 - p2):", col2: "[ " + ci_low.toFixed(4) + " ; " + ci_high.toFixed(4) + " ]" },
        row5: { col1: "alpha:", col2: alpha },
        row6: { col1: "Loại kiểm định:", col2: testType, },
        row7: { col1: "p-value:", col2: pValue, },
        row8: { col1: "Kết luận:", col2: decision, }
    };

    objectToTableHTML("Kết quả Z-Test for Two Proportions", result, "result", (pValue <= alpha));
    renderChart(p1, p2);
}

function normalCDF(z) {
    return (1.0 + erf(z / Math.SQRT2)) / 2.0;
}

function erf(x) {
    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);
    const a1 = 0.254829592, a2 = -0.284496736;
    const a3 = 1.421413741, a4 = -1.453152027;
    const a5 = 1.061405429, p = 0.3275911;
    const t = 1 / (1 + p * x);
    const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
}

function renderChart(p1, p2) {
    const ctx = document.getElementById('barChart').getContext('2d');
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Group 1', 'Group 2'],
            datasets: [{
                label: 'Tỷ lệ thành công',
                data: [p1, p2],
                backgroundColor: ['#4CAF50', '#2196F3']
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true, max: 1 }
            }
        }
    });
}


function objectToTableHTML(tableName, dataObj, resultId, rejectH0) {
    // Lấy danh sách các key object con
    const entries = Object.values(dataObj);

    if (entries.length === 0) return "<table><tbody><tr><td>No data</td></tr></tbody></table>";

    // Dùng object con đầu tiên để lấy các cột (keys)
    const headers = Object.keys(entries[0]);

    // Bắt đầu tạo HTML
    let html = "<h5><i>" + tableName + "</i></h5>" + "<table border='0' cellpadding='0' cellspacing='0'>";

    // Tạo các hàng dữ liệu
    html += "<tbody>";
    entries.forEach(entry => {
        html += "<tr>";
        headers.forEach(header => {
            html += `<td>${entry[header] || ""}</td>`;
        });
        html += "</tr>";
    });
    html += "</tbody></table>";
    html += "<div class='decoration'></div>";

    document.getElementById(resultId).innerHTML = html;

    if (rejectH0 != null) {
        if (rejectH0 == true) {
            document.getElementById(resultId).classList.add("reject");
            document.getElementById(resultId).classList.remove("fail-to-reject");
            document.getElementById(resultId).classList.remove("result-error");

        }
        else if (rejectH0 == false) {
            document.getElementById(resultId).classList.add("fail-to-reject");
            document.getElementById(resultId).classList.remove("reject");
            document.getElementById(resultId).classList.remove("result-error");


        }
        else if (rejectH0 == "error") {
            document.getElementById(resultId).classList.add("result-error");
            document.getElementById(resultId).classList.remove("reject");
            document.getElementById(resultId).classList.remove("fail-to-reject");
        }
    }
}