var acc = document.getElementsByClassName("accordion");
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
                <span class="caption participant-title">${item.title}</span>
                ${item.company !== '-' ? `<span class="caption participant-company"><i>${item.company}</i></span>` : ''}
              </div>
            </div>
          </div>`;
            }

            feedback_list_innerHTML += `<div class="margin-right-for-feedback"></div></div>`;
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

        for (let i = 0; i < bootcamp_list_Els.length; i++) {
            let bootcamp_innerHTML = `<div class="horizontal-scroll row flex-row flex-nowrap">`;

            for (let j = 0; j < bootcamp_list.length; j++) {
                const item = bootcamp_list[j];

                bootcamp_innerHTML += `
                <div ${item.is_open == 1 ? "onmousemove='openBootcampMouseOver(this, event)' onmouseout='openBootcampMouseOut(this, event)'" : ""} 
                    class="bootcamp-item ${item.is_open == 1 ? "is_open" : "is_closed"}">
                    <img class="bootcamp-thumbnail" src="../asset/image/bootcamp-img/${item.thumbnail}">
                    <div class="bootcamp-item-content">
                    <span class="h3 bootcamp-cohort-name">${item.bootcamp_name}</span>
                    <span class="paragraph bootcamp-online-offline">${item.offline == 1 ? "Offline, " + item.location : "Online, toàn quốc"}</span>
                    <span class="paragraph bootcamp-start-date">${item.start_date}</span>
                    <span class="paragraph bootcamp-pricing">${item.pricing}</span>
                    <span class="paragraph bootcamp-is-open">${item.is_open == 1 ? "Đang mở đăng ký" : "Form đăng ký đã đóng"}</span>
                    </div>
                    <button class="sign-up-now paragraph">
                    ${item.is_open == 1
                        ? `Đặt chỗ ngay <img src='asset/icon/arrow-right.svg' onload='SVGInject(this)'>`
                        : `<i>Ôi, mất lượt ờiii!</i>`
                    }
                    </button>
                    <img class="opening-bootcamp-highlight" src="asset/icon/opening-bootcamp-highlight.svg">
                </div>`;
            }

            bootcamp_innerHTML += `</div>`;
            bootcamp_list_Els[i].innerHTML += bootcamp_innerHTML;
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
document.querySelectorAll('.feedback-list')[0].style.width = window.innerWidth - document.querySelectorAll('.feedback-list')[0].getBoundingClientRect().left + "px";

window.addEventListener('resize', () => {
    document.querySelectorAll('.feedback-list')[0].style.width = window.innerWidth - document.querySelectorAll('.feedback-list')[0].getBoundingClientRect().left + "px";
});


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
    setTimeout(() => {
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
    }, 50);

};
