function reiki() {
  $('link[data-id="theme"]')
    .attr({
      href: 'css/reiki.css'
    });
  $('nav li')
    .removeClass('active')
  $('#reiki')
    .addClass('active')
}

function tarot() {
  $('link[data-id="theme"]')
    .attr({
      href: 'css/tarot.css'
    });
  $('nav li')
    .removeClass('active')
  $('#tarot')
    .addClass('active')
}

function angels() {
  $('nav li')
    .removeClass('active')
  $('#angels')
    .addClass('active')
}
