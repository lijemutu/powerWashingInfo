var concentrations = {
    "4 part of SH per 1 part of Water": 0.8,
    "3 part of SH per 2 part of Water": 0.6,
    "1 part of SH per 1 part of Water": 0.5,
    "2 part of SH per 3 part of Water": 0.4,
    "1 part of SH per 2 part of Water": 0.33,
    "1 part of SH per 3 part of Water": 0.25,
    "1 part of SH per 4 part of Water": 0.20,
    "1 part of SH per 5 part of Water": 0.166,
    "1 part of SH per 6 part of Water": 0.14,
    "1 part of SH per 7 part of Water": 0.12,
    "1 part of SH per 8 part of Water": 0.11,
    "1 part of SH per 9 part of Water": 0.10,
    "1 part of SH per 10 part of Water": 0.09,
}
document.getElementById('shSelection').addEventListener('change', function () {
    const selectedValue = parseFloat(this.value);
    const rows = document.querySelectorAll('#shTable tbody tr');

    rows.forEach(row => {
        const concentrationCell = row.querySelector('th:nth-child(2)').textContent.trim();
        const ratioCell = row.querySelector('th:nth-child(3)');

        if (selectedValue) {
            const min = parseFloat(concentrationCell.match(/Min: (\d+)%/)[1]);
            const max = parseFloat(concentrationCell.match(/Max: (\d+)%/)[1]);

            const minRatio = getClosestConcentration(min / selectedValue)
            const maxRatio = getClosestConcentration(max / selectedValue)

            ratioCell.textContent = `Min Ratio: ${minRatio}; Max Ratio: ${maxRatio}`;
        } else {
            ratioCell.textContent = '';
        }
    });
});

document.getElementById('gpmInput').addEventListener('input', function () {
    const selectedValue = parseInt(this.value);
    const gpmTag = document.getElementById("gpmValue")
    if (isNaN(selectedValue)) {
        gpmTag.textContent = "";
        return;
    }
    const roundedGPM = selectedValue * 4;

    gpmTag.textContent = roundedGPM + " in.";

});


function getClosestConcentration(number) {
    if (number >= 1) {
        return "Use without dillute";
    }
    if (number >= 5) {
        return "1 part of SH per " + (parseFloat(number) - 1) + " part of Water";
    }

    let closestText = '';
    let closestDifference = Infinity;

    for (let [text, value] of Object.entries(concentrations)) {
        let difference = Math.abs(number - value);
        if (difference < closestDifference) {
            closestDifference = difference;
            closestText = text;
        }
    }

    return closestText;
}