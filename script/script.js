var acc = document.getElementsByClassName("accordion");

let isDragging = false;
let draggingInitialX = 0;
let draggingOffsetX = 0;
let clickableFeedback = true;
// let velocity = 0;
let lastX = 0;
let lastTime = 0;
let momentumID;


var i;
for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("accordion-active");
    });
}

// =============================================
// MIXPANEL EVENT TRACKING - HOMEPAGE
// =============================================

var bootcamp_list, feedback_list, syllabus_01;

function getAssetPrefix() {
    return document.querySelector('.uxcamp-homepage') ? 'asset/' : '../asset/';
}

function renderCourseBootcampItem(item, registerUrl, assetPrefix) {
    is_applied_ux_analytic = item.bootcamp == "Applied UX Analytic";

    return `<span class="bootcamp-item-homepage ${is_applied_ux_analytic ? "mono-caption" : "paragraph"}"> 
    ${item.start_date.length !== 0 ? item.start_date : " "},
    ${item.offline == 1 ? "Offline, " + item.location : "Online"},
    ${item.pricing}
    </span>`;
}

function updateCourseStatus(statusEl, items) {
    if (!statusEl) return;
    const hasOpen = items.some(item => item.is_open == 1);
    statusEl.textContent = hasOpen ? 'Đang mở đăng ký' : 'Upcoming';
    statusEl.classList.add(hasOpen ? 'course-status-open' : 'course-status-upcoming');
}


// dữ liệu bootcamp từ google sheet
fetch("https://script.google.com/macros/s/AKfycbxPCuSjC8CPnc_jIuow8ZuVvi0e9Zhb82XWQqXdKR6e1pXvTUtCATu95jnd0QouBwyD/exec")
    .then(res => res.json())
    .then(data => {


        // lấy dữ liệu bootcamp_list
        {
            bootcamp_list = data.bootcamp_list.filter(item => item.listing == 1 && item.is_open == 1);
            const assetPrefix = getAssetPrefix();

            // Course cards on homepage
            document.querySelectorAll('.course-bootcamp-list[data-course="flagship"]').forEach(el => {
                const items = bootcamp_list;
                updateCourseStatus(document.getElementById('flagship-course-status'), items);
                if (!items.length) {
                    el.innerHTML = '<p class="paragraph italic">Sắp tới chưa có lịch đâu mommm.</p>';
                    return;
                }
                el.innerHTML = `
                <div class="course-cohort-list">${items.map(item =>
                    renderCourseBootcampItem(item, 'bootcamp-register.html', assetPrefix)
                ).join('')}</div>`;
            });

            if (data.applied_ux_analytic) {
                const analyticBootcamps = data.applied_ux_analytic.filter(item => item.listing == 1 && item.is_open == 1);
                document.querySelectorAll('.course-bootcamp-list[data-course="applied-ux-analytic"]').forEach(el => {
                    updateCourseStatus(document.getElementById('analytic-course-status'), analyticBootcamps);
                    if (!analyticBootcamps.length) {
                        el.innerHTML = '<p class="paragraph italic">Chưa có cohort nào được công bố.</p>';
                        return;
                    }
                    el.innerHTML = `
                    <div class="course-cohort-list">${analyticBootcamps.map(item =>
                        renderCourseBootcampItem(item, 'applied-ux-analytic/bootcamp-register.html', assetPrefix)
                    ).join('')}</div>`;
                });

                if (analyticBootcamps && analyticBootcamps.length > 0) {
                    const aua = analyticBootcamps[0];
                    document.querySelectorAll('.compare-aua-start-date').forEach(el => {
                        el.textContent = aua.start_date !== '-' ? aua.start_date : aua.bootcamp_name;
                    });
                    document.querySelectorAll('.compare-aua-pricing').forEach(el => {
                        el.textContent = aua.pricing;
                    });
                    document.querySelectorAll('.compare-aua-format').forEach(el => {
                        el.textContent = aua.offline == 1 ? "Offline, " + aua.location : "Online";
                    });
                }
            }

            if (bootcamp_list && bootcamp_list.length > 0) {
                const flagship = bootcamp_list[0];
                document.querySelectorAll('.compare-flagship-start-date').forEach(el => {
                    el.textContent = flagship.start_date !== '-' ? flagship.start_date : flagship.bootcamp_name;
                });
                document.querySelectorAll('.compare-flagship-pricing').forEach(el => {
                    el.textContent = flagship.pricing;
                });
                document.querySelectorAll('.compare-flagship-format').forEach(el => {
                    el.textContent = flagship.offline == 1 ? "Offline, " + flagship.location : "Online";
                });
            }

            // showing bootcamp list
            const bootcamp_list_Els = document.querySelectorAll(".bootcamp-list:not(.course-bootcamp-list)");
            if (bootcamp_list_Els !== null) {
                for (let i = 0; i < bootcamp_list_Els.length; i++) {
                    let bootcamp_innerHTML = `<div> </div>
                <div class="horizontal-scroll row flex-row flex-nowrap">`;
                    for (let j = 0; j < bootcamp_list.length; j++) {
                        const item = bootcamp_list[j];

                        bootcamp_innerHTML += `
                <div ${item.is_open == 1 ? "onmousemove='openBootcampMouseOver(this, event)' onmouseout='openBootcampMouseOut(this, event)'" : ""} 
                    class="bootcamp-item ${item.is_open == 1 ? "is_open" : "is_closed"}">
                    <img class="bootcamp-thumbnail" src="${getAssetPrefix()}image/bootcamp-img/${item.thumbnail}">
                    <div class="bootcamp-item-content">
                    <h6 class="bootcamp-cohort-name">${item.bootcamp_name}</h6>
                    <span class="paragraph bootcamp-online-offline">${item.offline == 1 ? "Offline, " + item.location : "Online"}</span>
                    <span class="paragraph bootcamp-start-date">${item.start_date}</span>
                    <span class="paragraph bootcamp-pricing">${item.pricing} ${item.offline == 1 ? "(*)" : ""}</span>                    
                    <span class="paragraph bootcamp-is-open">${item.is_open == 1 ? "Đang mở đăng ký" : "Fully booked"}</span>
                    </div>
                    <a href="bootcamp-register.html?bootcamp_id=${item.bootcamp_id}" class="sign-up-now paragraph">
                    ${item.is_open == 1
                                ? `Đặt chỗ ngay <img src='asset/icon/arrow-right.svg' onload='SVGInject(this)'>`
                                : `<i>Form đã đóng</i>`
                            }
                    </a>
                    <img class="opening-bootcamp-highlight" src="asset/icon/opening-bootcamp-highlight.svg">
                </div>`;

                    }
                    bootcamp_innerHTML += `</div>
                <div style = "padding: 12px 16px 0px 16px;
                color: var(--main-colors-foreground-f700);"
                class = "paragraph italic col-12">
                (*) Đối với các bootcamp offline: Phí tham dự chưa bao gồm chi phí di chuyển, ăn ở cho graduation retreat. Địa điểm tổ chức graduation retreat sẽ được thống nhất với người tham dự 1 tháng trước ngày tổ chức bảo vệ cuối khóa.</div>`;
                    bootcamp_list_Els[i].innerHTML += bootcamp_innerHTML;
                }
            }

            const signUp_bootcamp_list_Els = document.getElementById("signUp_bootcamp_list");
            if (signUp_bootcamp_list_Els !== null) {

                // Lấy giá trị của 'bootcamp_id'
                const queryString = window.location.search;
                const params = new URLSearchParams(queryString);
                const selectedBootcamp = params.get('bootcamp_id');

                console.log("user selected bootcamp: ", selectedBootcamp);
                var signUp_bootcamp_innerHTML = `<span class="col-12 h6 input-row-title">Bạn đăng ký bootcamp *</span>
`;
                for (let j = 0; j < bootcamp_list.length; j++) {
                    const item = bootcamp_list[j];
                    if (item.is_open == 1) {

                        signUp_bootcamp_innerHTML += `
                    <div class = 'col-12 col-md-12 col-lg-6'>
                    <span class = "sign-up-bootcamp-item">
                        <label for="bootcamp_${item.bootcamp_id}">
                            <input required type="radio" name="bootcamp_name" value="${item.bootcamp_name}" id="bootcamp_${item.bootcamp_id}" ${item.bootcamp_id == selectedBootcamp ? "checked" : ""} />
                            <img class="bootcamp-thumbnail" src="${getAssetPrefix()}image/bootcamp-img/${item.thumbnail}">
                            <div class="bootcamp-item-content">
                                <h6 class="bootcamp-cohort-name">${item.bootcamp_name}</h6>
                                <span class="paragraph bootcamp-online-offline">${item.offline == 1 ? "Offline, " + item.location : "Online"}</span>
                                <span class="paragraph bootcamp-is-open">${item.is_open == 1 ? "Đang mở đăng ký" : "Fully booked"}</span>
                                <span class="paragraph bootcamp-start-date">${item.start_date}</span>
                            </div>
                        </label>
                    </span>
                    </div>`;
                    };
                }
                signUp_bootcamp_innerHTML += ``
                signUp_bootcamp_list_Els.innerHTML += signUp_bootcamp_innerHTML;
            }
        }

        // lấy dữ liệu feedback

        feedback_list = data.feedback.filter(item => item.listing == 1);
        const feedback_list_Els = document.querySelectorAll(".feedback-list");

        for (let i = 0; i < feedback_list_Els.length; i++) {
            let feedback_list_innerHTML = `<div class="feedback-container col-12">`;

            for (let j = 0; j < feedback_list.length; j++) {
                const item = feedback_list[j];

                feedback_list_innerHTML += `
          <div onclick="showFeedback(${item.feedback_id})"
               onmousemove="showFeedbackImg(this, event)"
               onmouseout="hideFeedbackImg(this, event)"
               data-feedback-id="${item.feedback_id}"
               data-feedback-participant-name="${item.name}"
               data-feedback-participant-title="${item.title}"
               class="feedback-item col-6 col-lg-4">
            <img class="feedback-thumbnail" src="${getAssetPrefix()}image/participant/${item.img}">
            <div class="feedback-item-content">
              <span class="participant-name"><i>${item.name}</i></span>
              <div class="caption">
                <span class="italic caption participant-title">${item.title}</span>
                ${item.company !== '-' ? `<span class="italic caption participant-company">${item.company}</span>` : ''}
              </div>
            </div>
          </div>`;
            }

            feedback_list_innerHTML += `</div>`;
            feedback_list_Els[i].innerHTML += feedback_list_innerHTML;
        }

    });



function parseCSVToObjects(csvText, filterColumn, filterValue) {
    const rows = [];
    let insideQuotes = false;
    let currentCell = '';
    let currentRow = [];

    for (let i = 0; i < csvText.length; i++) {
        const char = csvText[i];
        const nextChar = csvText[i + 1];

        if (char === '"' && insideQuotes && nextChar === '"') {
            currentCell += '"';
            i++;
        } else if (char === '"') {
            insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
            currentRow.push(currentCell);
            currentCell = '';
        } else if ((char === '\n' || char === '\r') && !insideQuotes) {
            if (char === '\r' && nextChar === '\n') i++;
            currentRow.push(currentCell);
            rows.push(currentRow);
            currentRow = [];
            currentCell = '';
        } else {
            currentCell += char;
        }
    }

    // Thêm dòng cuối
    if (currentCell !== '' || currentRow.length > 0) {
        currentRow.push(currentCell);
        rows.push(currentRow);
    }

    const headers = rows[0].map(h => h.trim());
    const filterIndex = headers.indexOf(filterColumn);
    const result = [];

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (!row || row.length === 0) continue;

        if (row[filterIndex] === filterValue) {
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = row[index] || '';
            });
            result.push(obj);
        }
    }

    return result;
}

function getFeedbackById(feedbackId) {
    return feedback_list.find(feedback => feedback.feedback_id == String(feedbackId)) || null;
}

// animate opening bootcamp

function openBootcampMouseOver(el, event) {
    const maxDistance = 5;
    const rect = el.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    // relativeX & Y in percentage of width and height.
    const relativeX = 2 * (mouseX - centerX) / rect.width;
    const relativeY = 2 * (mouseY - centerY) / rect.height;

    // console.log(relativeY);
    el.style.top = relativeY * maxDistance + "px";
    el.style.left = relativeX * maxDistance + "px";
    el.style.transition = "top 0s, left 0s";

    el.getElementsByClassName('opening-bootcamp-highlight')[0].style.opacity = 1;
    el.getElementsByClassName('opening-bootcamp-highlight')[0].style.left = mouseX - rect.left - 90 + "px";
    el.getElementsByClassName('opening-bootcamp-highlight')[0].style.top = mouseY - rect.top - 90 + "px";
}

function openBootcampMouseOut(el, event) {
    // console.log("mouse out");
    el.style.top = 0 + "px";
    el.style.left = 0 + "px";
    el.style.transition = "top 5s ease-out, left 0.5s ease-out";
    el.getElementsByClassName('opening-bootcamp-highlight')[0].style.opacity = 0;
}

// full width for feedback học viên.


var syllabusMouse = document.getElementById('syllabusMouse');

function toggleContent(element, mouseID) {


    // console.log(element.classList);
    // console.log(element.dataset.elementName);

    if (element.classList.contains("hide-content")) {
        // true == expand collection
        mixpanel.track('change_accordion_visibility', {
            "accordion_name": element.dataset.elementName,
            "collapse": false,
        });

    }
    else {
        mixpanel.track('change_accordion_visibility', {
            "accordion_name": element.dataset.elementName,
            "collapse": true,
        });
    }

    element.classList.toggle("hide-content");
    document.getElementById(mouseID).classList.toggle("hide-content");
    document.getElementById(mouseID).classList.toggle("show-content");

    setTimeout(function () {
        ScrollTrigger.refresh();
    }, 1100);
}

function toggleMouseOver(element, event, mouseID) {
    var mouse = document.getElementById(mouseID);
    var bbox_rect = element.getBoundingClientRect();
    mouse.style.width = "180px";
    mouse.style.height = "80px";
    mouse.style.opacity = "1";

    var mouseX = event.clientX;
    var mouseY = event.clientY;

    mouse.style.left = mouseX - bbox_rect.left - mouse.getBoundingClientRect().width / 2 + "px";
    mouse.style.top = mouseY - bbox_rect.top - mouse.getBoundingClientRect().height / 2 + "px";
}

function toggleMouseOut(mouseID) {
    var mouse = document.getElementById(mouseID);

    mouse.style.width = "1px";
    mouse.style.height = "1px";
    mouse.style.opacity = "0";
}

function showFeedbackImg(element, event) {

    if (!deviceHasMouse()) { return };

    var feedbackImg = element.getElementsByClassName('feedback-thumbnail')[0];
    const mouseX = event.clientX - element.getBoundingClientRect().left;
    const mouseY = event.clientY - element.getBoundingClientRect().top;

    feedbackImg.style.left = mouseX - feedbackImg.getBoundingClientRect().width / 2 + "px";
    feedbackImg.style.top = mouseY - feedbackImg.getBoundingClientRect().height / 2 + "px";

    feedbackImg.style.height = "100px";
    feedbackImg.style.width = "auto";
    feedbackImg.style.opacity = "1";
}

function hideFeedbackImg(element, event) {
    var feedbackImg = element.getElementsByClassName('feedback-thumbnail')[0];

    feedbackImg.style.height = "1px";
    feedbackImg.style.width = "1px";
    feedbackImg.style.opacity = "0";
}

var feedbackContentEl = document.getElementById('feedback-content');
var closeFeedbackIcon = document.getElementById('close-feedback');

function closeFeedback() {
    feedbackDetailContainer.classList.remove('show-feedback');
}

function showFeedback(feedbackId) {

    if (clickableFeedback == null || clickableFeedback == false) { return };

    // console.log('clicked feedback');
    var feedback = getFeedbackById(feedbackId);
    var feedbackDetailContainer = document.getElementById('feedbackDetailContainer');
    feedbackDetailContainer.classList.add('show-feedback');

    feedbackContentEl.innerHTML = ``;
    feedbackContentEl.innerHTML +=
        `<div class ="feedback-header caption">
            <div class = "feedback-header-content">
                <span><i>
                    ${feedback.bootcamp} <br> ${feedback.bootcamp_name}
                </i></span>
                </div>
        <img src = '${getAssetPrefix()}image/participant/${feedback.img}'>
    </div>`
    feedbackContentEl.innerHTML += `<br><div class = "paragraph"> ${feedback.feedback.replace(/\n/g, '<br>')} </div>`;

    feedbackContentEl.innerHTML += `<br>
        <div class="feedback-item-content">
            <span class="h2 participant-name"><i>${feedback.name} </i></span>
            <div class = "caption">
                <span class="caption participant-title">${feedback.title}</span>
                ${feedback.company != '-' ? '<span class="caption participant-company"> <i>' + feedback.company + '</i></span>' : ''}
            </div>
        </div>
`;


    // console.log(feedback.name);
    mixpanel.track('view_feedback', {
        participant_name: feedback.name,
        participant_title: feedback.title,
        participant_company: feedback.company,
        bootcamp_name: feedback.bootcamp_name,
        feedback_id: feedback.feedback_id,
    });

}

window.onload = function () {
    //   console.log('test window.onload');
    if (document.querySelectorAll('#interactiveImage')[0] != null && document.getElementById('bootcamp-goal')) {
        gsap.to('#interactiveImage', {
            scrollTrigger: {
                trigger: '#bootcamp-goal',
                start: 'bottom bottom-=200',
                end: 'bottom center',
                toggleActions: 'play none play reverse', //onEnter, onLeave, onEnterBack, and onLeaveBack -> sẽ nhận 1 trong các giá trị sau: "play", "pause", "resume", "reset", "restart", "complete", "reverse", and "none".
                // markers: true,
                // scrub: true,
            },
            opacity: 0,
            duration: 1.2,
            ease: 'power2.out',
        });
    }

    if (document.querySelectorAll('#flyingContainer')[0] != null) {
        ScrollTrigger.create({
            trigger: "#flyingContainer",
            start: "top-=100 bottom",
            end: "bottom+=100 top",
            // markers: true,
            onEnter: () => startAnimation1(),
            onEnterBack: () => startAnimation1(),
            onLeave: () => stopAnimation1(),
            onLeaveBack: () => stopAnimation1()
        });
    }

    if (document.querySelectorAll('#flyingContainer2')[0] != null) {
        ScrollTrigger.create({
            trigger: "#flyingContainer2",
            start: "top-=100 bottom",
            end: "bottom+=100 top",
            // markers: true,
            onEnter: () => startAnimation2(),
            onEnterBack: () => startAnimation2(),
            onLeave: () => stopAnimation2(),
            onLeaveBack: () => stopAnimation2(),
        });
    }


    // Corporate Training ================

    var slidingImg = document.getElementById('sliding-img-container');

    if (slidingImg != null) {
        const corporateTrainingTitle = new SplitType('.title, .sub-title', {
            types: 'words, chars'
        });
        var totalImg = 45;
        var slidingImgInnerHTML = ``;
        for (var i = 1; i <= totalImg; i++) {
            slidingImgInnerHTML += `<img class="sliding-img" src = "asset/image/corporate-training/${i}.webp">`;
        }

        slidingImg.innerHTML = slidingImgInnerHTML;

        var slidingTimeline = gsap.timeline({
            repeat: 0,
            onComplete: () => { ScrollTrigger.refresh() }
        });

        slidingTimeline
            .from(corporateTrainingTitle.chars, {
                opacity: 0,
                y: 20,
                stagger: 0.01,
                duration: 1,
                ease: "elastic.out(1.5,0.9)",
            },)
            .from('#sliding-img-container', {
                height: '0px',
                duration: 2,
                ease: "elastic.out(1.5,0.9)",
            }, '<')
            .from('.corporate-training>.bootcamp-title-full', {
                gap: '0px',
                duration: 2,
                ease: "elastic.out(1.5,0.9)",
            }, '<')

            .from('.sliding-img', {
                right: 2000,

                stagger: {
                    each: 0.05,
                    from: "end" // Animates from the last element to the first
                },
                duration: 2,
                ease: "power4.inOut",
            }, '<')
            .from('.sliding-img', {
                scale: 0,
                opacity: 0,
                stagger: {
                    each: 0.05,
                    from: "end" // Animates from the last element to the first
                },
                duration: 0.4,
                ease: "power3.inOut",
            }, '<')
            ;
    }

};


// DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {

    //   console.log('test DOMContentLoaded');

    const title = new SplitType('.title, .sub-title', {
        types: 'words, chars'
    });

    if (document.querySelectorAll('.interactive-image-container')[0] != null) {
        var timeline = gsap.timeline({
            repeat: 0,
            onComplete: () => { ScrollTrigger.refresh() }
        });
        timeline
            .to('.interactive-image-container', {
                height: () => {
                    var height = window.innerHeight - document.querySelectorAll('.bootcamp-title-full')[0].getBoundingClientRect().height - 56;
                    return height + "px";
                },
                duration: 0.8,
                ease: 'Power2.easeOut',
            }, '1.5')
            .from(title.chars, {
                opacity: 0,
                y: 40,
                stagger: 0.015,
                duration: 0.8,
                ease: 'power2.out',
            }, '-=0.6');
    }

    if (document.querySelectorAll('.feedback-item-content > *')[0] != null) {
        const feedback = new SplitType('.feedback-item-content > *', {
            types: 'words, chars'
        });

        gsap.from(feedback.chars, {
            scrollTrigger: {
                trigger: '.feedback-list',
                start: 'top 90%',
                end: 'bottom center',
                toggleActions: 'play none play reverse', //onEnter, onLeave, onEnterBack, and onLeaveBack -> sẽ nhận 1 trong các giá trị sau: "play", "pause", "resume", "reset", "restart", "complete", "reverse", and "none".
                // markers: true,
                // scrub: true,
            },
            opacity: 0,
            y: 20,
            stagger: 0.005,
            duration: 0.3,
            ease: 'power2.out',
            onStart: () => {
                document.getElementById('feedback-list').parentNode.style.height = document.getElementById('feedback-list').getBoundingClientRect().height;
            },
        });
    }

});



// track case-study click

document.querySelectorAll(".case-study-container").forEach(link => {
    link.addEventListener("click", function () {
        mixpanel.track("view_case_study", {
            "case_study_name": link.dataset.caseStudy,
            "link_url": link.href,
            "section": "case_study",
        });
    });
});


// =============================================
// NEWLY ADDED EVENTS - HOMEPAGE (index.html)
// =============================================

document.addEventListener("DOMContentLoaded", function () {

    const isHomepage = !!document.querySelector('.uxcamp-homepage');
    if (!isHomepage) return;

    // -- helpers --
    function getDeviceType() {
        const w = window.innerWidth;
        if (w < 768) return 'mobile';
        if (w < 1200) return 'tablet';
        return 'desktop';
    }

    // newly added event - 2026-05-19
    // ── 1. hero_cta_click ──
    document.querySelectorAll('#hero .hero-cta-row a').forEach(cta => {
        cta.addEventListener('click', function (e) {
            const label = this.textContent.trim().replace(/\s+/g, ' ');
            mixpanel.track('hero_cta_click', {
                cta_text: label,
                cta_url: this.getAttribute('href'),
                cta_type: this.classList.contains('cta-large') ? 'primary' : 'secondary',
                device_type: getDeviceType(),
            });
        });
    });

    // newly added event - 2026-05-19
    // ── 2. course_card_cta_click ──
    document.querySelectorAll('#courses .course-card .cta-large').forEach(cta => {
        cta.addEventListener('click', function (e) {
            const card = this.closest('.course-card');
            const courseName = card ? card.querySelector('h3').textContent.trim() : '';
            mixpanel.track('course_card_cta_click', {
                course_name: courseName,
                cta_text: this.textContent.trim().replace(/\s+/g, ' '),
                cta_url: this.getAttribute('href'),
                device_type: getDeviceType(),
            });
        });
    });

    // newly added event - 2026-05-19
    // ── 3. cohort_link_click  (dynamically rendered, use delegation) ──
    document.querySelectorAll('.course-bootcamp-list').forEach(container => {
        container.addEventListener('click', function (e) {
            const link = e.target.closest('.bootcamp-item-homepage');
            if (!link) return;
            const courseName = container.dataset.course; // "flagship" | "applied-ux-analytic"
            mixpanel.track('cohort_link_click', {
                course_type: courseName,
                cohort_name: link.querySelector('.bootcamp-cohort-name') ? link.querySelector('.bootcamp-cohort-name').textContent.trim() : '',
                cohort_format: link.querySelector('.bootcamp-online-offline') ? link.querySelector('.bootcamp-online-offline').textContent.trim() : '',
                cohort_start_date: link.querySelector('.bootcamp-start-date') ? link.querySelector('.bootcamp-start-date').textContent.trim() : '',
                cohort_pricing: link.querySelector('.bootcamp-pricing') ? link.querySelector('.bootcamp-pricing').textContent.trim() : '',
                cohort_url: link.getAttribute('href'),
                is_open: link.classList.contains('is_open'),
                device_type: getDeviceType(),
            });
        });
    });

    // newly added event - 2026-05-19
    // ── 4. faq_accordion_toggle ──
    document.querySelectorAll('#faq .accordion-title').forEach(btn => {
        btn.addEventListener('click', function () {
            const accordion = this.closest('.accordion');
            const isExpanding = !accordion.classList.contains('accordion-active');
            const questionText = this.querySelector('span') ? this.querySelector('span').textContent.trim() : '';
            mixpanel.track('faq_accordion_toggle', {
                question_text: questionText,
                action: isExpanding ? 'expand' : 'collapse',
                section: 'faq',
                device_type: getDeviceType(),
            });
        });
    });

    // newly added event - 2026-05-19
    // ── 5. final_cta_click ──
    document.querySelectorAll('#final-cta .final-cta-row a').forEach(cta => {
        cta.addEventListener('click', function () {
            mixpanel.track('final_cta_click', {
                cta_text: this.textContent.trim().replace(/\s+/g, ' '),
                cta_url: this.getAttribute('href'),
                cta_type: this.classList.contains('cta-large') ? 'primary' : 'secondary',
                section: 'final_cta',
                device_type: getDeviceType(),
            });
        });
    });

    // newly added event - 2026-05-19
    // ── 6. footer_link_click ──
    document.querySelectorAll('#footer .footer-row a:not(.social-links a)').forEach(link => {
        link.addEventListener('click', function () {
            const category = this.closest('.footer-row').querySelector('span');
            mixpanel.track('footer_link_click', {
                link_text: this.textContent.trim(),
                link_url: this.getAttribute('href'),
                link_category: category ? category.textContent.trim() : '',
                is_external: this.getAttribute('target') === '_blank',
                device_type: getDeviceType(),
            });
        });
    });

    // newly added event - 2026-05-19
    // ── 7. social_link_click ──
    document.querySelectorAll('#footer .social-links a').forEach(link => {
        link.addEventListener('click', function () {
            mixpanel.track('social_link_click', {
                platform: this.getAttribute('title') || '',
                link_url: this.getAttribute('href'),
                section: 'footer',
                device_type: getDeviceType(),
            });
        });
    });

    // newly added event - 2026-05-19
    // ── 8. close_feedback_modal ──
    var closeFeedbackBtn = document.getElementById('close-feedback');
    if (closeFeedbackBtn) {
        closeFeedbackBtn.addEventListener('click', function () {
            mixpanel.track('close_feedback_modal', {
                section: 'testimonials',
                device_type: getDeviceType(),
            });
        });
    }

    // newly added event - 2026-05-19
    // ── 9. section_viewed (scroll-based visibility via IntersectionObserver) ──
    const trackedSections = new Set();
    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !trackedSections.has(entry.target.id)) {
                trackedSections.add(entry.target.id);
                mixpanel.track('section_viewed', {
                    section_id: entry.target.id,
                    section_title: (entry.target.querySelector('h2') || entry.target.querySelector('h1') || {}).textContent || entry.target.id,
                    device_type: getDeviceType(),
                    viewport_width: window.innerWidth,
                    viewport_height: window.innerHeight,
                });
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('section[id], footer[id]').forEach(function (section) {
        sectionObserver.observe(section);
    });

    // newly added event - 2026-05-19
    // ── 10. canvas_interaction (user interacts with course card animations) ──
    document.querySelectorAll('.course-card-canvas').forEach(function (canvas) {
        var interacted = false;
        var article = canvas.closest('.course-card');
        var courseName = article ? (article.querySelector('h3') ? article.querySelector('h3').textContent.trim() : '') : '';
        var canvasType = canvas.classList.contains('course-card-fluid-container') ? 'fluid_simulation' : 'matter_js';

        canvas.addEventListener('pointerdown', function () {
            if (interacted) return;
            interacted = true;
            mixpanel.track('canvas_interaction', {
                course_name: courseName,
                canvas_type: canvasType,
                interaction_type: 'pointer_down',
                device_type: getDeviceType(),
            });
        });
    });

});



// animation 1 & animation 2



var mouseX = 0, mouseY = 0;
function getMousePositionOnScreen(e) {
    mouseX = e.x;
    mouseY = e.y;
}

function smoothGrowth(x) {
    const k = 0.2; // độ dốc, càng lớn càng dốc ở giữa
    const f = x => 1 / (1 + Math.exp(-k * (x - 0.5)));
    const min = f(0);
    const max = f(1);
    return (f(x) - min) / (max - min);
}


function deviceHasMouse() {
    return matchMedia('(pointer:fine)').matches == true ? true : false;
}


window.onwheel = function (event) {
    // event.preventDefault();
    ScrollTrigger.refresh();
};

window.onmousewheel = function (event) {
    // event.preventDefault();
    ScrollTrigger.refresh();
};