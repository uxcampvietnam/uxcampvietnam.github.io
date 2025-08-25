var acc = document.getElementsByClassName("accordion");

let isDragging = false;
let draggingInitialX = 0;
let draggingOffsetX = 0;
let clickableFeedback = true;
let velocity = 0;
let lastX = 0;
let lastTime = 0;
let momentumID;


var i;
for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("accordion-active");
    });
}

var bootcamp_list, feedback_list, syllabus_01;


fetch('script/feedback.csv')
    .then(response => response.text())
    .then(csvText => {
        feedback_list = parseCSVToObjects(csvText, 'listing', '1');
        const feedback_list_Els = document.querySelectorAll(".feedback-list");

        for (let i = 0; i < feedback_list_Els.length; i++) {
            let feedback_list_innerHTML = `<div class="feedback-horizontal-scroll">`;

            for (let j = 0; j < feedback_list.length; j++) {
                const item = feedback_list[j];

                feedback_list_innerHTML += `
          <div onclick="showFeedback(${item.feedback_id})"
               onmousemove="showFeedbackImg(this, event)"
               onmouseout="hideFeedbackImg(this, event)"
               data-feedback-id="${item.feedback_id}"
               data-feedback-participant-name="${item.name}"
               data-feedback-participant-title="${item.title}"
               class="feedback-item">
            <img class="feedback-thumbnail" src="../asset/image/participant/${item.img}">
            <div class="feedback-item-content">
              <span class="h2 participant-name"><i>${item.name}</i></span>
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
    })
    .catch(error => {
        console.error("Lỗi khi tải feedback CSV:", error);
    });


fetch('script/bootcamp_list.csv')
    .then(response => response.text())
    .then(csvText => {
        bootcamp_list = parseCSVToObjects(csvText, 'listing', '1');

        // showing bootcamp list
        const bootcamp_list_Els = document.querySelectorAll(".bootcamp-list");
        if (bootcamp_list_Els !== null) {
            for (let i = 0; i < bootcamp_list_Els.length; i++) {
                let bootcamp_innerHTML = `<div> </div>
                <div class="horizontal-scroll row flex-row flex-nowrap">`;
                for (let j = 0; j < bootcamp_list.length; j++) {
                    const item = bootcamp_list[j];

                    bootcamp_innerHTML += `
                <div ${item.is_open == 1 ? "onmousemove='openBootcampMouseOver(this, event)' onmouseout='openBootcampMouseOut(this, event)'" : ""} 
                    class="bootcamp-item ${item.is_open == 1 ? "is_open" : "is_closed"}">
                    <img class="bootcamp-thumbnail" src="../asset/image/bootcamp-img/${item.thumbnail}">
                    <div class="bootcamp-item-content">
                    <h3 class="bootcamp-cohort-name">${item.bootcamp_name}</h3>
                    <span class="paragraph bootcamp-online-offline">${item.offline == 1 ? "Offline, " + item.location : "Online"}</span>
                    <span class="paragraph bootcamp-start-date">${item.start_date}</span>
                    <span class="paragraph bootcamp-pricing">${item.pricing} ${item.offline == 1 ? "(*)" : ""}</span>                    
                    <span class="paragraph bootcamp-is-open">${item.is_open == 1 ? "Đang mở đăng ký" : "Form đăng ký đã đóng"}</span>
                    </div>
                    <a href="bootcamp-register.html?bootcamp_id=${item.bootcamp_id}" class="sign-up-now paragraph">
                    ${item.is_open == 1
                            ? `Đặt chỗ ngay <img src='asset/icon/arrow-right.svg' onload='SVGInject(this)'>`
                            : `<i>Ôi, mất lượt ờiii!</i>`
                        }
                    </a>
                    <img class="opening-bootcamp-highlight" src="asset/icon/opening-bootcamp-highlight.svg">
                </div>`;

                }
                bootcamp_innerHTML += `</div>
                <div style = "padding: 0px 16px;
                color: var(--main-colors-foreground-f700);"
                class = "paragraph italic col-12">
                (*) Đối với các bootcamp offline: Phí tham dự chưa bao gồm chi phí di chuyển, ăn ở cho graduation retreat. Địa điểm tổ chức graduation retreat sẽ được thống nhất với người tham dự 1 tháng trước ngày tổ chức bảo vệ cuối khóa.</div>`;
                bootcamp_list_Els[i].innerHTML += bootcamp_innerHTML;
            }
        }


        const signUp_bootcamp_list_Els = document.getElementById("signUp_bootcamp_list");
        if (signUp_bootcamp_list_Els !== null) {


            // Lấy toàn bộ query string từ URL
            const queryString = window.location.search;
            // Tạo object URLSearchParams từ query string
            const params = new URLSearchParams(queryString);
            // Lấy giá trị của 'bootcamp_id'
            const selectedBootcamp = params.get('bootcamp_id');

            var signUp_bootcamp_innerHTML = `<span class="col-12 h5 input-row-title">Bạn đăng ký bootcamp *</span>
`;
            for (let j = 0; j < bootcamp_list.length; j++) {
                const item = bootcamp_list[j];
                if (item.is_open == 1) {

                    signUp_bootcamp_innerHTML += `
                    <div class = 'col-12 col-md-12 col-lg-6'>
                    <span class = "sign-up-bootcamp-item">
                        <label for="bootcamp_${item.bootcamp_id}">
                            <input required type="radio" name="bootcamp_name" value="${item.bootcamp_name}" id="bootcamp_${item.bootcamp_id}" ${item.bootcamp_id === selectedBootcamp ? "checked" : ""} />
                            <img class="bootcamp-thumbnail" src="../asset/image/bootcamp-img/${item.thumbnail}">
                            <div class="bootcamp-item-content">
                                <h3 class="bootcamp-cohort-name">${item.bootcamp_name}</h3>
                                <span class="paragraph bootcamp-online-offline">${item.offline == 1 ? "Offline, " + item.location : "Online"}</span>
                                <span class="paragraph bootcamp-is-open">${item.is_open == 1 ? "Đang mở đăng ký" : "Form đăng ký đã đóng"}</span>
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


    })
    .catch(error => {
        console.error("Lỗi khi tải CSV:", error);
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
    element.classList.toggle("hide-content");
    document.getElementById(mouseID).classList.toggle("hide-content");
    document.getElementById(mouseID).classList.toggle("show-content");
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
        <img src = '../asset/image/participant/${feedback.img}'>
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
`
}

window.onload = function () {


    gsap.to('#interactiveImage', {
        scrollTrigger: {
            trigger: '.designing-digital-product-per-stage-and-metric',
            start: 'top top',
            end: 'center bottom',
            toggleActions: 'play none play reverse', //onEnter, onLeave, onEnterBack, and onLeaveBack -> sẽ nhận 1 trong các giá trị sau: "play", "pause", "resume", "reset", "restart", "complete", "reverse", and "none".
            // markers: true,
            scrub: true,
        },
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
    });

    if (document.querySelectorAll('#flyingContainer')[0] != null) {
        ScrollTrigger.create({
            trigger: "#flyingContainer",
            start: "top bottom",
            end: "bottom top",
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
            start: "top bottom",
            end: "bottom top",
            // markers: true,
            onEnter: () => startAnimation2(),
            onEnterBack: () => startAnimation2(),
            onLeave: () => stopAnimation2(),
            onLeaveBack: () => stopAnimation2(),
        });
    }


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


    // Corporate Training ================


    var slidingImg = document.getElementById('sliding-img-container');

    if (slidingImg != null) {
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
            .from(title.chars, {
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


    const draggableDiv = document.getElementById('feedback-list');

    // Đặt chiều cao parent-div
    if (draggableDiv) {
        draggableDiv.parentNode.style.height = draggableDiv.getBoundingClientRect().height + 'px';

        // Chuột
        draggableDiv.addEventListener('mousedown', e => startDrag(e.clientX));
        draggableDiv.addEventListener('mousemove', e => duringDrag(e.clientX));
        draggableDiv.addEventListener('mouseup', endDrag);

        // // Cảm ứng
        // draggableDiv.addEventListener('touchstart', e => {
        //     const touch = e.touches[0];
        //     startDrag(touch.clientX);
        // }, { passive: true });

        // draggableDiv.addEventListener('touchmove', e => {
        //     const touch = e.touches[0];
        //     duringDrag(touch.clientX);
        // }, { passive: true });

        // draggableDiv.addEventListener('touchend', endDrag);
    }


    function startDrag(x) {
        cancelAnimationFrame(momentumID);
        isDragging = true;
        draggingInitialX = x;
        draggingOffsetX = draggableDiv.offsetLeft;
        draggableDiv.style.cursor = 'grabbing';
        lastX = x;
        lastTime = Date.now();
    }

    function duringDrag(x) {
        if (!isDragging) return;
        clickableFeedback = false;

        const dx = x - draggingInitialX;
        draggableDiv.style.left = (draggingOffsetX + dx) + 'px';

        // Tính vận tốc (px/ms)
        const now = Date.now();
        velocity = (x - lastX) / (now - lastTime);
        lastX = x;
        lastTime = now;
    }

    function endDrag() {
        isDragging = false;
        setTimeout(() => { clickableFeedback = true; }, 200);
        draggableDiv.style.cursor = 'grab';

        momentumScroll();
        isDragging = false;
        setTimeout(() => { clickableFeedback = true; }, 200);
        draggableDiv.style.cursor = 'grab';
    }

    function momentumScroll() {
        // Nếu vận tốc nhỏ thì dừng

        if (Math.abs(velocity) < 0.01) {
            if (draggableDiv.getElementsByClassName('feedback-horizontal-scroll')[0].getBoundingClientRect().right < draggableDiv.parentElement.getBoundingClientRect().right) {
                // console.log('cuộn quá nhiều');
                gsap.to(draggableDiv, {
                    left: - draggableDiv.getElementsByClassName('feedback-horizontal-scroll')[0].getBoundingClientRect().width + draggableDiv.parentElement.getBoundingClientRect().width ,
                    duration: 1,
                    ease: "elastic.out(1.9,0.9)",
                });

                return;
            }
            else if (draggableDiv.getBoundingClientRect().left > draggableDiv.parentElement.getBoundingClientRect().left) {
                // console.log('quay về đầu');
                gsap.to(draggableDiv, {
                    left: '0',
                    duration: 1,
                    ease: "elastic.out(1.9,0.9)",
                });
            }

            return;
        };

        draggingOffsetX = draggableDiv.offsetLeft + velocity * 16; // 16ms/frame
        draggableDiv.style.left = draggingOffsetX + 'px';

        velocity *= 0.95; // ma sát
        momentumID = requestAnimationFrame(momentumScroll);

    }
};


let lastWidth = document.body.getBoundingClientRect().width;
let resizeTimeout;

const observer = new ResizeObserver(entries => {
    const newWidth = entries[0].contentRect.width;

    if (Math.abs(newWidth - lastWidth) > 20) {
        // Reset timer mỗi lần width thay đổi
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (container !== null) {
                if (window.innerWidth < 500) {
                    InfiniteLoadingWidth = window.innerWidth * 0.6;
                    InfiniteLoadingHeight = 150;
                }
                // if desktop size
                else {
                    InfiniteLoadingWidth = window.innerWidth * 0.8 / 2;
                    InfiniteLoadingHeight = container.getBoundingClientRect().height / 2 - 40; // vertical radius (y-axis)
                }
                centerX = container.getBoundingClientRect().width / 2;
                centerY = container.getBoundingClientRect().height / 2;
            }
            location.reload();
        }, 200); // 200ms sau khi ngừng thay đổi
        lastWidth = newWidth;
    }
});

observer.observe(document.body);
