document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submit-btn');
    const form = document.getElementById('survey-form');

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
            // Clear invalid highlight
            parent.classList.remove('question-invalid');
            //newly added event
            trackFieldChange(input.name, input.type === 'checkbox' ? input.checked : input.value);
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
            // Clear invalid highlight
            parent.closest('.question-block')?.classList.remove('question-invalid');
            //newly added event
            trackFieldChange(input.name, input.value);
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
            // Clear invalid highlight
            row.classList.remove('question-invalid');
            cell.closest('.question-block')?.classList.remove('question-invalid');
            //newly added event
            trackFieldChange(input.name, input.value);
        });
    });

    // Text / Textarea Input Logic
    //newly added event
    form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input[type="number"], textarea').forEach(input => {
        input.addEventListener('change', () => {
            saveToLocal();
            input.closest('.question-block')?.classList.remove('question-invalid');
            trackFieldChange(input.name, input.value);
        });
    });

    const SECTION_QUESTIONS = {
        general: {
            title: "I. THÔNG TIN CHUNG",
            eventKey: "form_general_section_completion",
            fields: ["full_name", "year_of_birth", "email", "phone", "social_link", "years_of_experience"]
        },
        environment: {
            title: "II. MÔI TRƯỜNG LÀM VIỆC",
            eventKey: "form_environment_section_completion",
            fields: ["company_website", "current_position", "business_models[]", "domains[]", "product_types[]"]
        },
        characteristics: {
            title: "III. ĐẶC THÙ CÔNG VIỆC",
            eventKey: "form_characteristics_section_completion",
            fields: [
                "phase_product_goal", "phase_customer_journey", "phase_key_metrics",
                "phase_event_tracking_plan", "phase_tracking_implementation", "phase_data_validation", "phase_analytics_setup",
                "phase_cohort_segment_analysis", "phase_trend_analysis", "phase_adoption_analysis",
                "phase_cr_analysis", "phase_retention_analysis", "phase_heatmap_recording", "phase_build_dashboard",
                "phase_user_interview", "phase_focus_group", "phase_correlation_analysis", "phase_root_cause_analysis",
                "phase_case_study", "phase_expert_opinion", "phase_secondary_research", "phase_internal_workshop",
                "phase_thematic_analysis", "phase_solution_proposal"
            ]
        },
        problem: {
            title: "IV. ĐÁNH GIÁ VẤN ĐỀ",
            eventKey: "form_problem_section_completion",
            fields: [
                "pain_track_needed_data", "pain_track_hard_to_analyze", "pain_track_bloat", "pain_data_trust", "pain_track_naming_standard", "pain_track_post_improvement_effect",
                "pain_dm_stats_thinking", "pain_dm_data_source", "pain_dm_behavior_explanation", "pain_dm_incomplete_data", "pain_dm_metric_tradeoff",
                "pain_user_behavior_business_impact", "pain_impact_actionable_insight", "pain_dm_priority", "pain_data_qual_quant_conflict",
                "pain_stakeholder_access", "pain_stakeholder_culture", "pain_stakeholder_buyin", "pain_stakeholder_framework",
                "lacking_skills_detail"
            ]
        },
        expectations: {
            title: "V. KỲ VỌNG & RÀO CẢN THAM GIA BOOTCAMP",
            eventKey: "form_expectations_section_completion",
            fields: [
                "exp_tf_framework_mindset", "exp_tf_mindset_challenge", "exp_tf_product_thinking", "exp_tf_ambiguous_decision",
                "exp_upb_user_behavior_analytics", "exp_upb_data_signal", "exp_upb_diagnose_issues", "exp_upb_metric_tradeoff",
                "exp_mt_metrics_measurement", "exp_mt_tracking_process", "exp_mt_validate_hypothesis", "exp_mt_ux_business_impact",
                "exp_idm_data_decision", "exp_idm_prioritize_issues", "exp_idm_data_conflict", "exp_idm_actionable_insight",
                "exp_cs_defend_insight", "exp_cs_presentation_storytelling",
                "exp_lea_real_case_study", "exp_lea_mentor_feedback", "exp_lea_work_application",
                "other_expectations", "concerns[]"
            ]
        },
        registration: {
            title: "VI. ĐĂNG KÝ THAM GIA",
            eventKey: "form_registration_section_completion",
            fields: ["bootcamp_name"]
        }
    };

    function calculateSectionProgress(data) {
        const progress = {};
        Object.entries(SECTION_QUESTIONS).forEach(([secKey, sec]) => {
            let filledCount = 0;
            sec.fields.forEach(field => {
                const val = data[field];
                if (val !== undefined && val !== null) {
                    if (Array.isArray(val)) {
                        if (val.length > 0) filledCount++;
                    } else if (typeof val === 'string') {
                        if (val.trim() !== "") filledCount++;
                    } else {
                        filledCount++;
                    }
                }
            });
            progress[secKey] = {
                eventKey: sec.eventKey,
                filled: filledCount,
                total: sec.fields.length
            };
        });
        return progress;
    }

    // Functions
    function saveToLocal() {
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
        localStorage.setItem('survey_data', JSON.stringify(data));
        
        // Update console state for progress tracking
        updateConsoleProgress(data);
    }

    function updateConsoleProgress(data) {
        // Calculate section progress
        const sectionsProgress = calculateSectionProgress(data);

        // Required progress
        const requiredFields = Array.from(form.querySelectorAll('[required]')).map(el => el.name);
        const uniqueRequired = [...new Set(requiredFields)];
        const filledRequired = uniqueRequired.filter(name => {
            const val = data[name];
            return val !== undefined && val !== "" && (Array.isArray(val) ? val.length > 0 : true);
        });
        
        const progress = Math.round((filledRequired.length / uniqueRequired.length) * 100);
        
        try {
            const consoleStateRaw = localStorage.getItem('uxConsole_v1');
            if (consoleStateRaw) {
                const state = JSON.parse(consoleStateRaw);
                state.formProgress = progress;
                
                if (!state.sectionProgress) {
                    state.sectionProgress = {
                        general: 0,
                        environment: 0,
                        characteristics: 0,
                        problem: 0,
                        expectations: 0,
                        registration: 0
                    };
                }
                
                // Track progress changes per section and push events to log
                Object.entries(sectionsProgress).forEach(([secKey, secData]) => {
                    const prevFilled = state.sectionProgress[secKey] || 0;
                    if (secData.filled !== prevFilled) {
                        state.sectionProgress[secKey] = secData.filled;
                        
                        const label = `${secData.eventKey}: ${secData.filled}/${secData.total}`;
                        const time = new Date().toTimeString().slice(0, 8);
                        if (!state.eventLog) state.eventLog = [];
                        state.eventLog.push({ time, label, isAlert: false });
                        if (state.eventLog.length > 50) state.eventLog.shift();
                    }
                });

                localStorage.setItem('uxConsole_v1', JSON.stringify(state));
            }
        } catch (e) {
            console.error("Failed to update console progress", e);
        }
    }

    function trackFieldChange(fieldName, value) {
        //newly added event
        if (typeof mixpanel !== 'undefined') {
            mixpanel.track('form_field_filled', {
                'field_name': fieldName,
                'value': value,
                'page': 'bootcamp-register'
            });
        }
        console.log(`[Mixpanel] Track: form_field_filled | ${fieldName}: ${value}`);
    }

    function loadFromLocal() {
        const savedData = localStorage.getItem('survey_data');
        if (savedData) {
            const data = JSON.parse(savedData);

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

    function initializeInitialProgress() {
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
        
        const sectionsProgress = calculateSectionProgress(data);
        try {
            const consoleStateRaw = localStorage.getItem('uxConsole_v1');
            if (consoleStateRaw) {
                const state = JSON.parse(consoleStateRaw);
                if (!state.sectionProgress) {
                    state.sectionProgress = {};
                }
                Object.entries(sectionsProgress).forEach(([secKey, secData]) => {
                    state.sectionProgress[secKey] = secData.filled;
                });
                
                // Ensure start_form is tracked
                if (!state.funnelDone.start_form) {
                    state.funnelDone.start_form = true;
                    const time = new Date().toTimeString().slice(0, 8);
                    if (!state.eventLog) state.eventLog = [];
                    state.eventLog.push({ time, label: 'start_form', isAlert: false });
                    if (state.eventLog.length > 50) state.eventLog.shift();
                }
                
                localStorage.setItem('uxConsole_v1', JSON.stringify(state));
            }
        } catch (e) {}
    }

    loadFromLocal();
    initializeInitialProgress();

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

        // --- Custom Validation ---
        const requiredFields = Array.from(form.querySelectorAll('[required]'));
        let firstInvalid = null;

        // Clear previous highlights
        form.querySelectorAll('.question-invalid').forEach(el => el.classList.remove('question-invalid'));

        for (const input of requiredFields) {
            let isInvalid = false;
            if (input.type === 'radio' || input.type === 'checkbox') {
                const group = form.querySelectorAll(`input[name="${input.name}"]:checked`);
                if (group.length === 0) isInvalid = true;
            } else {
                if (!input.value.trim()) isInvalid = true;
            }

            if (isInvalid) {
                if (!firstInvalid) firstInvalid = input;
                // Highlight the question container
                const container = input.closest('.question-block') || input.closest('tr') || input.parentElement;
                container.classList.add('question-invalid');
            }
        }

        if (firstInvalid) {
            submitBtn.innerText = "Finalize & Submit";
            submitBtn.disabled = false;

            const target = firstInvalid.closest('.question-block') || firstInvalid.closest('tr') || firstInvalid.parentElement;
            
            // Scroll to the first invalid field
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Add a little shake effect if GSAP is available
            if (typeof gsap !== 'undefined') {
                gsap.to(target, { x: 10, repeat: 5, yoyo: true, duration: 0.05 });
            }

            return; // Stop submission
        }
        // -------------------------

        fetch("https://script.google.com/macros/s/AKfycbyz_nDpXETChpg0JVZQa7G4BVcfF7mrymvBLBibMREDw-tFfhcEdjoJ9CuBRmUaDJy7cw/exec", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
            mode: "no-cors"
        })
            .then(() => {
                //newly added event
                if (typeof mixpanel !== 'undefined') {
                    const consoleStateRaw = localStorage.getItem('uxConsole_v1');
                    let consoleProps = {};
                    if (consoleStateRaw) {
                        try {
                            const consoleState = JSON.parse(consoleStateRaw);
                            const firstVisit = new Date(consoleState.firstVisit);
                            const now = new Date();
                            const daysSinceFirstVisit = Math.floor((now - firstVisit) / (1000 * 60 * 60 * 24));
                            
                            consoleProps = {
                                'total_page_view_to_register': consoleState.totalPageViews,
                                'first_page_view': consoleState.firstVisit,
                                'day_since_first_page_view': daysSinceFirstVisit,
                                'register_click_count': consoleState.registerClicks
                            };
                            
                            // Add duration for each section from index.html
                            if (consoleState.sectionTime) {
                                Object.entries(consoleState.sectionTime).forEach(([section, seconds]) => {
                                    consoleProps[`time_spent_${section}`] = Math.round(seconds);
                                });
                            }
                        } catch (e) {
                            console.error("Failed to parse console state for tracking", e);
                        }
                    }

                    mixpanel.track('form_submit_success', {
                        'form_type': data.form_type || 'applied_ux_analytic',
                        'email': data.email,
                        ...consoleProps
                    });
                }

                // Save answers to localhost so console.js can read this data
                //newly added event
                localStorage.setItem('bootcamp_submitted_data', JSON.stringify({
                    timestamp: new Date().toISOString(),
                    data: data
                }));

                // Update console state
                try {
                    const consoleStateRaw = localStorage.getItem('uxConsole_v1');
                    if (consoleStateRaw) {
                        const state = JSON.parse(consoleStateRaw);
                        state.funnelDone.submit_form = true;
                        state.formProgress = 100;
                        localStorage.setItem('uxConsole_v1', JSON.stringify(state));
                    }
                } catch (e) {}

                localStorage.removeItem('survey_data');
                window.location.href = "../form-submitted.html";
            })
            .catch(error => {
                console.error("Error:", error);
                alert("transmission error.");
                submitBtn.innerText = "Finalize & Submit";
                submitBtn.disabled = false;

                //newly added event
                if (typeof mixpanel !== 'undefined') {
                    mixpanel.track('form_submit_error', {
                        'error': error.message
                    });
                }
            });
    });
});
