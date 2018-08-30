
//Dropdown Menus
$(".dropdown").hover(
  function () {
    $(this).addClass('open');
  },
  function () {
    $(this).removeClass('open');
  }
);



//Search

var openSearch = $('.open-search'),
  SearchForm = $('.full-search'),
  closeSearch = $('.close-search');

openSearch.on('click', function (event) {
  event.preventDefault();
  if (!SearchForm.hasClass('active')) {
    SearchForm.fadeIn(300, function () {
      SearchForm.addClass('active');
    });
  }
});

closeSearch.on('click', function (event) {
  event.preventDefault();

  SearchForm.fadeOut(300, function () {
    SearchForm.removeClass('active');
    $(this).find('input').val('');
  });
});


//WOW Scroll Spy
var wow = new WOW({
  //disabled for mobile
  mobile: false
});
wow.init();


//Owl Carousel
$('#clients-scroller').owlCarousel({
  items: 4,
  itemsTablet: 3,
  margin: 90,
  stagePadding: 90,
  smartSpeed: 450,
  itemsDesktop: [1199, 4],
  itemsDesktopSmall: [980, 3],
  itemsTablet: [768, 3],
  itemsTablet: [767, 2],
  itemsTabletSmall: [480, 2],
  itemsMobile: [479, 1],
});

//Color Client
$('#color-client-scroller').owlCarousel({
  items: 4,
  itemsTablet: 3,
  margin: 90,
  stagePadding: 90,
  smartSpeed: 450,
  itemsDesktop: [1199, 4],
  itemsDesktopSmall: [980, 3],
  itemsTablet: [768, 3],
  itemsTablet: [767, 2],
  itemsTabletSmall: [480, 2],
  itemsMobile: [479, 1],
});

//Owl Carousel
$('#testimonial-item').owlCarousel({
  autoPlay: 5000,
  items: 3,
  itemsTablet: 3,
  margin: 90,
  stagePadding: 90,
  smartSpeed: 450,
  itemsDesktop: [1199, 4],
  itemsDesktopSmall: [980, 3],
  itemsTablet: [768, 3],
  itemsTablet: [767, 2],
  itemsTabletSmall: [480, 2],
  itemsMobile: [479, 1],
});

//Dark Testimonial Carousel
$('#testimonial-dark').owlCarousel({
  autoPlay: 5000,
  items: 3,
  itemsTablet: 3,
  margin: 90,
  stagePadding: 90,
  smartSpeed: 450,
  itemsDesktop: [1199, 4],
  itemsDesktopSmall: [980, 3],
  itemsTablet: [768, 3],
  itemsTablet: [767, 2],
  itemsTabletSmall: [480, 2],
  itemsMobile: [479, 1],
});

// Single Testimonial
$('#single-testimonial-item').owlCarousel({
  singleItem: true,
  autoPlay: 5000,
  items: 1,
  itemsTablet: 1,
  margin: 90,
  stagePadding: 90,
  smartSpeed: 450,
  itemsDesktop: [1199, 4],
  itemsDesktopSmall: [980, 3],
  itemsTablet: [768, 3],
  itemsTablet: [767, 2],
  itemsTabletSmall: [480, 2],
  itemsMobile: [479, 1],
  stopOnHover: true,
});

// Image Carousel
$("#image-carousel").owlCarousel({
  autoPlay: 3000, //Set AutoPlay to 3 seconds
  items: 4,
  itemsDesktop: [1170, 3],
  itemsDesktopSmall: [1170, 3]

});

// Slider Carousel
$("#carousel-image-slider").owlCarousel({
  navigation: false, // Show next and prev buttons
  slideSpeed: 300,
  paginationSpeed: 400,
  singleItem: true,
  pagination: false,
  autoPlay: 3000,
});


//About owl carousel Slider
$(document).ready(function () {
  /*=== About us ====*/
  $('#carousel-about-us').owlCarousel({
    navigation: true, // Show next and prev buttons
    navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    slideSpeed: 800,
    paginationSpeed: 400,
    autoPlay: true,
    singleItem: true,
    pagination: false,
    items: 1,
    itemsCustom: false,
    itemsDesktop: [1199, 4],
    itemsDesktopSmall: [980, 3],
    itemsTablet: [768, 2],
    itemsTabletSmall: false,
    itemsMobile: [479, 1],
  });

});

//MixitUp
$(function () {
  $('#portfolio-list').mixItUp();
});

// Testimonial
$('testimonial-carousel').carousel();
$('a[data-slide="prev"]').click(function () {
  $('#testimonial-carousel').carousel('prev');
});

$('a[data-slide="next"]').click(function () {
  $('#testimonial-carousel').carousel('next');
});

//CounterUp
jQuery(document).ready(function ($) {
  $('.counter').counterUp({
    delay: 1,
    time: 800
  });
});

// Progress Bar
$('.skill-shortcode').appear(function () {
  $('.progress').each(function () {
    $('.progress-bar').css('width', function () {
      return ($(this).attr('data-percentage') + '%')
    });
  });
}, {
    accY: -100
  });


// Back Top Link
var offset = 200;
var duration = 500;
$(window).scroll(function () {
  if ($(this).scrollTop() > offset) {
    $('.back-to-top').fadeIn(400);
  } else {
    $('.back-to-top').fadeOut(400);
  }
});
$('.back-to-top').click(function (event) {
  event.preventDefault();
  $('html, body').animate({
    scrollTop: 0
  }, 600);
  return false;
});


$(function () {
  // Get the form.
  var form = $('#ajax-contact');

  // Get the messages div.
  var formMessages = $('#form-messages');

  // Set up an event listener for the contact form.
  $(form).submit(function (event) {
    // Stop the browser from submitting the form.
    event.preventDefault();
    var formData = $(form).serialize();
    // Submit the form using AJAX.
    $.ajax({
      type: 'POST',
      url: $(form).attr('action'),
      data: formData
    })
      .done(function (response) {
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass('alert alert-danger');
        $(formMessages).addClass('alert alert-success');

        // Set the message text.
        $(formMessages).text(response);

        // Clear the form.
        $('#nombre').val('');
        $('#asunto').val('');
        $('#email').val('');
        $('#mensaje').val('');
      })
      .fail(function (data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass('alert alert-success');
        $(formMessages).addClass('alert alert-danger');

        // Set the message text.
        if (data.responseText !== '') {
          $(formMessages).text(data.responseText);
        } else {
          $(formMessages).text('Ha ocurrido un error y tu mensaje no pudo ser enviado.');
        }
      });

  });
});

$(function () {
  // Get the form.
  var form = $('#ajax-form-work');

  // Get the messages div.
  var formMessages = $('#form-messages-work');

  // Set up an event listener for the contact form.
  $(form).submit(function (event) {
    // Stop the browser from submitting the form.
    event.preventDefault();
    //fd.append('file', $('#file')[0].files[0]);
    if (this[3]['files'][0].size > 5000000) {
      $(formMessages).removeClass('alert alert-success');
      $(formMessages).removeClass('alert alert-warning');
      $(formMessages).addClass('alert alert-danger');
      $(formMessages).text('El tamaño del archivo no puede ser mayor a 5MB.');
      return;
    }

    $(formMessages).removeClass('alert alert-danger');
    $(formMessages).removeClass('alert alert-success');

    $(formMessages).addClass('alert alert-warning');
    $(formMessages).text("Espere mientras se sube el archivo...");

    $.ajax({
      type: 'POST',
      url: 'assets/php/mail_trabaja.php',
      data: new FormData($('#ajax-form-work')[0]),
      processData: false,
      contentType: false,
      cache: false
    })
      .done(function (response) {
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass('alert alert-danger');
        $(formMessages).removeClass('alert alert-warning');
        $(formMessages).addClass('alert alert-success');

        // Set the message text.
        $(formMessages).text(response);

        // Clear the form.
        $('#email').val('');
        $('#nombre').val('');
        $('#file').val('');
        $('#mensaje').val('');
      })
      .fail(function (data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass('alert alert-success');
        $(formMessages).removeClass('alert alert-warning');
        $(formMessages).addClass('alert alert-danger');

        // Set the message text.
        if (data.responseText !== '') {
          $(formMessages).text(data.responseText);
        } else {
          $(formMessages).text('Ha ocurrido un error y tu mensaje no pudo ser enviado.');
        }
      });

  });
});

$(function () {
  // Get the form.
  var form = $('#ajax-contact-cotiz');

  // Get the messages div.
  var formMessages = $('#form-messages-cotiz');

  // Set up an event listener for the contact form.
  $(form).submit(function (event) {
    // Stop the browser from submitting the form.
    event.preventDefault();
    var formData = $(form).serialize();
    // Submit the form using AJAX.
    $.ajax({
      type: 'POST',
      url: $(form).attr('action'),
      data: formData
    })
      .done(function (response) {
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass('alert alert-danger');
        $(formMessages).addClass('alert alert-success');

        // Set the message text.
        $(formMessages).text(response);

        // Clear the form.
        $('#nombre').val('');
        $('#afiliacion').val('');
        $('#direccion').val('');
        $('#comuna').val('');
        $('#telefono').val('');
        $('#email').val('');
        $('#mensaje').val('');
      })
      .fail(function (data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass('alert alert-success');
        $(formMessages).addClass('alert alert-danger');

        // Set the message text.
        if (data.responseText !== '') {
          $(formMessages).text(data.responseText);
        } else {
          $(formMessages).text('Ha ocurrido un error y tu mensaje no pudo ser enviado.');
        }
      });

  });
});
