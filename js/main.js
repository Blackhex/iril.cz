function reiki() {
  $('link[data-id="theme"]')
    .attr({
      href: 'css/reiki.css'
    });
  $('nav li')
    .removeClass('active')
  $('#nav-reiki')
    .addClass('active')
}

function tarot() {
  $('link[data-id="theme"]')
    .attr({
      href: 'css/tarot.css'
    });
  $('nav li')
    .removeClass('active')
  $('#nav-tarot')
    .addClass('active')
}

function angels() {
  $('link[data-id="theme"]')
    .attr({
      href: 'css/angels.css'
    });
  $('nav li')
    .removeClass('active')
  $('#nav-angels')
    .addClass('active')
}

$(document).ready(function () {
  if (window.location.hash === '#reiki') {
    reiki();
  } else if (window.location.hash === '#tarot') {
    tarot();
  } else if (window.location.hash === '#angels') {
    angels();
  } else if (window.location.pathname.endsWith("brno.html")) {
    window.selectedPlace = "brno";
  }
});