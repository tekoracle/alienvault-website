var app = window.app || {};

app.init = function() {
  app.initScrollTo();
  app.initSlider();
  app.initReveal();
  app.initTabs();
  app.initMobile();
  app.initArrows();
  app.initFAQ();
  app.resellerMapInit();
  app.initSubNav();
  app.initToggleShow();
  // app.initGeometricBackground();
};

app.initScrollTo = function() {
  $(document).on('click', '.scrollto', function(e) {
    e.preventDefault();
    var target = $(e.target).attr('href');
    var position = $(target).offset();
    $('html, body').stop().animate({ scrollTop: position.top }, 500);
  });
};

app.initSlider = function() {
  var sliders = document.querySelectorAll('.simple-slider');
  if (sliders.length > 0) {
    simpleslider.getSlider();
  }
};

app.initReveal = function() {
  new WOW().init({
    offset: 0,
    live: true,
  });
};

app.initTabs = function() {
  var tabs = $('.tabs');
  $.each(tabs, function() {
    var activeTab = $(this).find('.tab.active');
    $(activeTab.data('target')).addClass('active');
  });
  $(document).on('click', '.tab', app.handleTabClick);
};

app.handleTabClick = function(e) {
  var tabs = $(this).parents('.tabs'),
      contents = $(tabs.data('target')),
      targetTab = $(this).closest('.tab');
  tabs.find('.tab').removeClass('active');
  contents.find('.tab-content.active').removeClass('active');
  targetTab.addClass('active');
  $(targetTab.data('target')).addClass('active');
};

app.initMobile = function() {
  $(document).on('click', '.mobile-icon', app.toggleMobileMenu);
};

app.toggleMobileMenu = function() {
  var menuIcon = $('.menu-icon'),
      xIcon = $('x-icon');
  if (menuIcon.hasClass('hide')) {
    $('body').removeClass('lock');
    $('.menu-icon').removeClass('hide');
    $('.x-icon').addClass('hide');
    // Temporary fix for iOS devices to hide the menu:
    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
      $('.mobile-container').addClass('hide');
    } else {
      $('.mobile-container').addClass('animated slideOutDown').data('animation', 'slideOutDown').data('after', 'hide');
    }
  } else {
    $('.menu-icon').addClass('hide');
    $('.x-icon').removeClass('hide');
    $('.mobile-container').removeClass('hide').addClass('animated slideInUp').data('animation', 'slideInUp');
    $('body').addClass('lock');
  }
};

app.initArrows = function() {
  $(document).on('click', '.arrow-right', function(e) {
    var currentStep = $('.step.active');
    if (currentStep.next('.step').length > 0) {
      currentStep.removeClass('active').addClass('hide').next('.step').removeClass('hide').addClass('active');
      app.checkActiveArrows();
    }
  });
  $(document).on('click', '.arrow-left', function(e) {
    var currentStep = $('.step.active');
    if (currentStep.prev('.step').length > 0) {
      currentStep.removeClass('active').addClass('hide').prev('.step').removeClass('hide').addClass('active');
      app.checkActiveArrows();
    }
  });
  app.checkActiveArrows();
};

app.checkActiveArrows = function() {
  var currentStep = $('.step.active');
  if (currentStep.next('.step').length === 0) {
    $('.arrow-right').css('stroke', '#E5E5E5');
  } else {
    $('.arrow-right').css('stroke', '');
  }
  if (currentStep.prev('.step').length === 0) {
    $('.arrow-left').css('stroke', '#E5E5E5');
  } else {
    $('.arrow-left').css('stroke', '');
  }
};

app.initFAQ = function() {
  $(document).on('click', '.questionTitle', app.handleQuestionClick);
  $(document).on('click', '.question-plus, .question-minus', function(e) {
    $(e.target).parents('.question').find('.questionTitle').click();
  });
};

app.handleQuestionClick = function(e) {
  var id = $(e.target).data('target'),
      target = $('#' + id);
  if (target.hasClass('hide')) {
    target.removeClass('hide');
    target.parents('.question').find('.question-plus').addClass('hide');
    target.parents('.question').find('.question-minus').removeClass('hide');
  } else {
    target.addClass('hide');
    target.parents('.question').find('.question-plus').removeClass('hide');
    target.parents('.question').find('.question-minus').addClass('hide');
  }
};

app.resellerMapInit = function() {
  var container = $('#resellers-map');
  if (container.length > 0) {
    var map = new Datamap({
      element: container[0]
    });
  }
};

app.initSubNav = function() {
  var subNav = $('.subnav-container'),
      nav = $('.nav-container'),
      navHeight = $('.nav-container').height();
  if (subNav.length > 0) {
    $(window).scroll(function() {
      if ($(this).scrollTop() > navHeight) {
        subNav.addClass('sticky');
        nav.addClass('sticky');
      } else {
        subNav.removeClass('sticky');
        nav.removeClass('sticky');
      }
    });
  }
};

app.initToggleShow = function() {
  $(document).on('click', '.toggle-trigger', function(e) {
    e.preventDefault();
    var target = $($(this).attr('href'));
    if (target.hasClass('no-show')) {
      target.removeClass('no-show');
    } else {
      target.addClass('no-show');
    }
  });
};

app.initGeometricBackground = function() {
  var topSection = $('.gray-gradient.topFlat:not(.keep-gray)'),
      graySections = $('.gray-gradient:not(.topFlat), .gray-gradient.keep-gray'),
      blueSection, blueImg, i, target, grayPattern;

  if (topSection.length > 0) {
    bluePattern = Trianglify({
      variance: "1",
      cell_size: 80,
      width: topSection.width(),
      height: topSection.outerHeight(),
      // x_colors: ["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c"]
      x_colors: ["#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6"]
    });
    blueImg = $('<img>').addClass('poly').attr('src', bluePattern.png());
    topSection.attr('style', 'background-image: url(' + bluePattern.png() + ');');
  }

  for (i = 0; i < graySections.length; i++) {
    target = graySections.eq(i);
    grayPattern = Trianglify({
      variance: "1",
      cell_size: 90,
      width: target.width(),
      height: target.outerHeight(),
      x_colors: ["#d9d9d9","#f0f0f0","#f5f5f5","#ffffff","#f5f5f5","#f0f0f0","#d9d9d9"]
    });
    target.attr('style', 'background-image: url(' + grayPattern.png() + ');');
  }
};

$(document).on('animationend', function(e) {
  var target = $(e.target);
  target.removeClass('animated').removeClass(target.data('animation'));
  target.removeData('animation');
  if (target.data('after')) {
    target.addClass(target.data('after'));
    target.removeData('after');
  }
});

$(document).ready(app.init);
