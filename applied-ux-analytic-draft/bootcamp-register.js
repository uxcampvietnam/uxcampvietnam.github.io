document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submit-btn');

    // Option selection logic
    document.querySelectorAll('.option-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const input = item.querySelector('input');
            const parent = item.closest('.question-block');
            const isMulti = input.type === 'checkbox';
            const maxSelect = parent.dataset.maxSelect ? parseInt(parent.dataset.maxSelect) : null;

            if (!isMulti) {
                // Single select
                const name = input.name;
                parent.querySelectorAll(`input[name="${name}"]`).forEach(i => {
                    i.checked = false;
                    i.closest('.option-item')?.classList.remove('selected');
                });
                item.classList.add('selected');
                input.checked = true;
            } else {
                // Multi select
                if (!input.checked) {
                    if (maxSelect) {
                        const selectedCount = parent.querySelectorAll('.option-item.selected').length;
                        if (selectedCount >= maxSelect) {
                            alert(`you can select at most ${maxSelect} options.`);
                            return;
                        }
                    }
                    item.classList.add('selected');
                    input.checked = true;
                } else {
                    item.classList.remove('selected');
                    input.checked = false;
                }
            }

            saveToLocal();
        });
    });

    // Scale logic
    document.querySelectorAll('.scale-item').forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.closest('.scale-container');
            parent.querySelectorAll('.scale-item').forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
            const input = item.querySelector('input');
            input.checked = true;

            saveToLocal();
        });
    });

    // Matrix Logic
    document.querySelectorAll('.matrix-option').forEach(cell => {
        cell.addEventListener('click', () => {
            const row = cell.closest('tr');
            const input = cell.querySelector('input');

            row.querySelectorAll('.matrix-option').forEach(c => c.classList.remove('selected'));
            cell.classList.add('selected');
            input.checked = true;

            saveToLocal();
        });
    });

    // Functions
    function saveToLocal() {
        const formData = new FormData(document.getElementById('survey-form'));
        const data = {};
        formData.forEach((value, key) => {
            if (key.endsWith('[]')) {
                if (!data[key]) data[key] = [];
                data[key].push(value);
            } else {
                data[key] = value;
            }
        });
        localStorage.setItem('survey_data', JSON.stringify(data));
    }

    function loadFromLocal() {
        const savedData = localStorage.getItem('survey_data');
        if (savedData) {
            const data = JSON.parse(savedData);
            const form = document.getElementById('survey-form');

            Object.keys(data).forEach(key => {
                const value = data[key];
                const elements = form.querySelectorAll(`[name="${key}"]`);

                elements.forEach(el => {
                    if (el.type === 'radio' || el.type === 'checkbox') {
                        if (Array.isArray(value)) {
                            el.checked = value.includes(el.value);
                        } else {
                            el.checked = el.value === value;
                        }

                        // Add selected class
                        if (el.checked) {
                            const optionItem = el.closest('.option-item');
                            if (optionItem) {
                                optionItem.classList.add('selected');
                            }

                            const scaleItem = el.closest('.scale-item');
                            if (scaleItem) {
                                scaleItem.classList.add('selected');
                            }

                            const matrixOption = el.closest('.matrix-option');
                            if (matrixOption) matrixOption.classList.add('selected');
                        }
                    } else {
                        el.value = value;
                    }
                });
            });
        }
    }

    loadFromLocal();

    const form = document.getElementById('survey-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        submitBtn.innerText = "transmitting...";
        submitBtn.disabled = true;

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            if (key.endsWith('[]')) {
                if (!data[key]) data[key] = [];
                data[key].push(value);
            } else {
                data[key] = value;
            }
        });

        console.log("Form Data:", data);

        fetch("https://script.google.com/macros/s/AKfycbyz_nDpXETChpg0JVZQa7G4BVcfF7mrymvBLBibMREDw-tFfhcEdjoJ9CuBRmUaDJy7cw/exec", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
            mode: "no-cors"
        })
            .then(() => {
                localStorage.removeItem('survey_data');
                window.location.href = "../form-submitted.html";
            })
            .catch(error => {
                console.error("Error:", error);
                alert("transmission error.");
                submitBtn.innerText = "Finalize & Submit";
                submitBtn.disabled = false;
            });
    });
});
