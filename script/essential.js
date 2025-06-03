// Read Menu CSV file =======================================================================
var image_list_from_csv, collection_list_from_csv;
$.ajax({
    url: "asset/image/gallery/image_list.csv",
    async: false,
    success: function (csvd) {
        image_list_from_csv = $.csv.toObjects(csvd).filter(function (el) {
            return el.file_name != "" &
            el.showing == 'yes'
        });
    },
    dataType: "text",
    complete: function () {
        // call a function on complete 
        // console.log(image_list_from_csv);
    }
});

$.ajax({
    url: "asset/image/gallery/collection_list.csv",
    async: false,
    success: function (csvd) {
        collection_list_from_csv = $.csv.toObjects(csvd);
    },
    dataType: "text",
    complete: function () {
        // call a function on complete 
        // console.log(collection_list_from_csv);
    }
});

// Define variables =========================================
var numberOfImage = 0;

var imageList = [];

var cursor;

for (var i = 0; i < collection_list_from_csv.length; i++) {

    var collection_arr = image_list_from_csv.filter(function (el) {
        return el.collection_id === collection_list_from_csv[i].collection_id;
    });

    // sort collection thumbnail to the top of an array
    const thumbnail_index = collection_arr.findIndex((element) => element.image_id ==  collection_list_from_csv[i].thumbnail_id);
    const temp = collection_arr[0];
    collection_arr[0] = collection_arr[thumbnail_index];
    collection_arr[thumbnail_index] = temp;

    // push image from csv to imageList
    collection_arr.forEach(function(element, index){
        imageList.push({
            image_id: element.image_id,
            file_name: element.file_name,
            location: element.location,
            path: collection_list_from_csv[i].file_folder + element.file_name,
            collection_id: collection_list_from_csv[i].collection_id,
            collection_name: collection_list_from_csv[i].collection_name,
            collection_thumb: false,
        });
        if (element.image_id === collection_list_from_csv[i].thumbnail_id){imageList[imageList.length-1].collection_thumb = true;}
        if (index == 1){
            imageList[imageList.length-1].collection_thumb = true;
        }
        numberOfImage++;
    });
    // numberOfImage = numberOfImage + parseInt(collection_list_from_csv[i].number_of_image);
}

// Load image in sequences ===========================================

var images = [numberOfImage];
var gotResponse = [numberOfImage];
var maxDisplayed = -1;
var loadedImage = [];

function checkImages(index) {
    // Check if previous images have been displayed
    if (maxDisplayed == index - 1) {
        for (i = index; i <= numberOfImage; i++) {
            // Check if we've received a response for this image
            if (gotResponse[i] !== true) {
                break;
            }
            maxDisplayed = i;
            if (images[i] != null) {
                // console.log('Adding image' + i);
                // document.body.appendChild(images[i]);
                loadedImage.push(images[i].src);
                // console.log('image '+ i + ' is already');
            }
        }
    }
}

function imageError(index) {
    // console.log('Error loading image ' + index);
    images[index] = null;
    gotResponse[index] = true;
    checkImages(index);
}

function imageLoaded(index, image) {
    // console.log('Loaded image ' + index);
    images[index] = image;
    gotResponse[index] = true;
    checkImages(index);
}

function sequenceLoadingImages() {
    $.each(imageList, function(index, value) {
        var image = new Image();
        image.onload = function () {
            imageLoaded(index, image);
        }
        image.onerror = function () {
            imageError(index);
        }
        image.src = value.path;
        image.style.width = '300px';
        image.style.height = '300px';
    });
}

sequenceLoadingImages();

// Playing Lottie =========================================
var logoAnimation = document.getElementById('logoAnimation');
var mobileMenuIcon = document.getElementById('mobileMenuIcon');
var starMovingContainer = document.getElementById('starMovingContainer')

var mobileMenuIconItem = bodymovin.loadAnimation({
  wrapper: mobileMenuIcon,
  animType: 'svg',
  loop: false,
  autoplay: false,
  animationData: mobileMenuIconJson,
});

var logoAnimationItem = bodymovin.loadAnimation({
  wrapper: logoAnimation,
  animType: 'svg',
  loop: false,
  autoplay: true,
  animationData: logoJson,
});

logoAnimationItem.addEventListener("complete", function(){
  console.log('U là trời, stalk cả vào đây cơ đấy :)');
});

var starMovingItem = bodymovin.loadAnimation({
    wrapper: starMovingContainer,
    animType: 'svg',
    loop: true,
    autoplay: true,
    animationData: starMovingJson,
  });

var menuClose = 1;
mobileMenuIcon.addEventListener('click', function() {toggleHeaderMenu("menu-clicked");} 
);

function toggleHeaderMenu(e){
    if(menuClose== 1){
        openHeaderMenu();
        if(e === "menu-clicked"){
            mixpanel.track('Open Menu on Mobile', {
            });
        }
        var header = document.getElementById('header');
        header.classList.remove('scolled-header', 'blur-background');
    }
    else{
        closeHeaderMenu();
        changeHeaderBlur();
        if(e === "menu-clicked"){
            mixpanel.track('Close Menu on Mobile', {
            });
        }
    }
    mobileMenuIconItem.setDirection(menuClose);
    mobileMenuIconItem.play();
    menuClose = -menuClose;

    if (e != "menu-clicked"){

        // track mixpanel
        navigateCollection(e);
    }
}

// Custom cursor ==================================================================================

document.addEventListener("DOMContentLoaded", function (event) {

    // add custom cursor div element into page
    var img = document.createElement("div");
    img.className = "custom-cursor";
    $('body')[0].appendChild(img);

    cursor = document.querySelector(".custom-cursor");
    var links = document.querySelectorAll("a, .clickable");
    var clickableElements = $('body *').toArray().filter(function (el) { return $(el).attr('onclick') });

    var initCursor = false;

    for (var i = 0; i < links.length; i++) {
        var selfLink = links[i];

        selfLink.addEventListener("mouseover", function () {
            cursor.classList.add("custom-cursor--link");
        });
        selfLink.addEventListener("mouseout", function () {
            cursor.classList.remove("custom-cursor--link");
        });
    }

    for (var i = 0; i < clickableElements.length; i++) {
        var selfLink = clickableElements[i];

        selfLink.addEventListener("mouseover", function () {
            cursor.classList.add("custom-cursor--link");
        });
        selfLink.addEventListener("mouseout", function () {
            cursor.classList.remove("custom-cursor--link");
        });
    }

    window.onmousemove = function (e) {
        var mouseX = e.clientX;
        var mouseY = e.clientY;

        if (!initCursor) {
            // cursor.style.opacity = 1;
            TweenLite.to(cursor, 0.3, {
                opacity: 1
            });
            initCursor = true;
        }

        TweenLite.to(cursor, 0, {
            top: mouseY + "px",
            left: mouseX + "px"
        });
    };

    window.onmouseout = function (e) {
        TweenLite.to(cursor, 0.3, {
            opacity: 0
        });
        initCursor = false;
    };
});


// initial functions =============================================================================================

function changeHeaderBlur() {
    var body = document.getElementsByTagName('body')[0];
    var position = body.getBoundingClientRect();
    var header = document.getElementById('header');
    var x = window.matchMedia("(min-width: 1120px)");
    // if (x.matches && position.top < -80) <--- only apply blur header when scroll for laptop
    if (position.top < -80) {
        header.classList.add('scolled-header', 'blur-background');
    } else {
        header.classList.remove('scolled-header', 'blur-background');
    }
}

function openHeaderMenu() {
    $('#mobile-menu').fadeIn();
    $('#mobile-menu').css('top', '0px');
    $('#page-title').fadeOut();
    document.getElementsByTagName('html')[0].style.overflowY = "hidden";

}

function closeHeaderMenu() {
    $('#mobile-menu').css('top', '-100%');
    $('#page-title').fadeIn();

    // $('#mobile-menu').fadeOut();
    // $('body').css("overflow", "auto");
    document.getElementsByTagName('html')[0].style.overflowY = "auto";

}

// Check if element is scrolled to the view port ===============================

window.addEventListener('scroll', function () {
    changeHeaderBlur();
});


// page transition ========================================
$(window).on("load", function () {
    $(".loader-wrapper").fadeOut("slow");
});


// Lazy loading image in the gallery ========================================
document.addEventListener("DOMContentLoaded", function () {
    var lazyloadImages = document.querySelectorAll(".lazy");
    var lazyloadThrottleTimeout;

    function lazyload() {
        if (lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(function () {
            var scrollTop = window.scrollY;
            lazyloadImages.forEach(function (img) {
                if (img.offsetTop < (window.innerHeight + scrollTop)) {
                    img.style.background = img.dataset.src;
                    img.style.backgroundSize = 'cover';
                    img.style.backgroundPosition = 'center';
                    img.classList.remove('lazy');
                }
            });
            if (lazyloadImages.length == 0) {
                document.removeEventListener("scroll", lazyload);
                window.removeEventListener("resize", lazyload);
                window.removeEventListener("orientationChange", lazyload);
            }
        }, 20);
    }
    lazyload();
    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
});




// Mixpanel ==============================

function navigateCollection(name){
	mixpanel.track('Navigate to Collection', {
		'Collection Name': name,
	});
}


function navigateSocial(event,screen,section){
    mixpanel.track(event, {
        'Screen Name': screen,
        "Section": section,
    })
}