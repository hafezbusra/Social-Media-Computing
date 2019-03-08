$(document).ready(function () {
    //to close sidebar in mobile view
    $(function () {
        $('#nav-icon4').click();
    });

    $('#nav-icon4').click(function () {
        $(this).toggleClass('open');
    });

    //social media
    $("#wordcloud0sm").click(function () {
        $('html,body').animate({
            scrollTop: $(".wordcloud0").offset().top
        },
            'slow');
            
        if (matchMedia('only screen and (max-width: 480px)').matches) {
            toggleActive();
        }
        
    });

    $("#mentionoverall").click(function () {
        $('html,body').animate({
            scrollTop: $(".mention").offset().top
        },
            'slow');

        if (matchMedia('only screen and (max-width: 480px)').matches) {
            toggleActive();
        }
    });

    $("#stackedbar").click(function () {
        $('html,body').animate({
            scrollTop: $(".stackedbar").offset().top
        },
            'slow');

        if (matchMedia('only screen and (max-width: 480px)').matches) {
            toggleActive();
        }

    });

    //twitter
    $("#wordcloud1sm").click(function () {
        $('html,body').animate({
            scrollTop: $(".wordcloud1").offset().top
        },
            'slow');

        if (matchMedia('only screen and (max-width: 480px)').matches) {
            toggleActive();
        }

    });

    $("#mentiontweet").click(function () {
        $('html,body').animate({
            scrollTop: $(".mentiontweet").offset().top
        },
            'slow');
        if (matchMedia('only screen and (max-width: 480px)').matches) {
            toggleActive();
        }

    });

    $("#multiaxestweet").click(function () {
        $('html,body').animate({
            scrollTop: $(".multiaxestweet").offset().top
        },
            'slow');

        if (matchMedia('only screen and (max-width: 480px)').matches) {
            toggleActive();
        }

    });

    $("#livegraphtweet").click(function () {
        $('html,body').animate({
            scrollTop: $(".livegraphtweet").offset().top
        },
            'slow');
        
        if (matchMedia('only screen and (max-width: 480px)').matches) {
            toggleActive();
        }

    });

    $("#livetweet").click(function () {
        $('html,body').animate({
            scrollTop: $(".livetweet").offset().top
        },
            'slow');
        
        if (matchMedia('only screen and (max-width: 480px)').matches) {
            toggleActive();
        }

    });

    //facebook

    $("#wordcloud2sm").click(function () {
        $('html,body').animate({
            scrollTop: $(".wordcloud2").offset().top
        },
            'slow');
        
        if (matchMedia('only screen and (max-width: 480px)').matches) {
            toggleActive();
        }

    });

    $("#mentionfb").click(function () {
        $('html,body').animate({
            scrollTop: $(".mentionfb").offset().top
        },
            'slow');

        if (matchMedia('only screen and (max-width: 480px)').matches) {
            toggleActive();
        }
        
    });

    $("#multiaxesfb").click(function () {
        $('html,body').animate({
            scrollTop: $(".multiaxesfb").offset().top
        },
            'slow');

        if (matchMedia('only screen and (max-width: 480px)').matches) {
            toggleActive();
        }

    });

    $("#piechartfb").click(function () {
        $('html,body').animate({
            scrollTop: $(".piechartfb").offset().top
        },
            'slow');

        if (matchMedia('only screen and (max-width: 480px)').matches) {
            toggleActive();
        }

    });

    $("#barCompareFb").click(function () {
        $('html,body').animate({
            scrollTop: $(".barCompareFb").offset().top
        },
            'slow');

        if (matchMedia('only screen and (max-width: 480px)').matches) {
            toggleActive();
        }

    });

    $("#livefb").click(function () {
        $('html,body').animate({
            scrollTop: $(".livefb").offset().top
        },
            'slow');

        if (matchMedia('only screen and (max-width: 480px)').matches) {
            toggleActive();
        }

    });

    //loading screen
    setTimeout(function () { $('.loadingscreen').slideUp(500); }, 5000);
});

function toggleActive() {
    $("nav#sidebar").toggleClass("active");
    $("div#sidelay").toggleClass("active");
    $("button#sidetog").toggleClass("activ");
    $("div#maincontent").toggleClass("active");
    $("div#webtitle").toggleClass("active");
    $("div#cprt").toggleClass("active");
}

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

$(function () {
    $("a.nav-link").on("click", function (e) {
        $("a.nav-link").removeClass("active").blur();
        $(this).addClass("active");

    });

    $("button.navbar-toggler, div#sidelay").on("click", function () {
        toggleActive();
    });
});
