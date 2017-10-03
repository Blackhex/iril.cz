
function change_theme() {
  if ($('link[data-id="theme"]').attr("href") == 'css/landing_light.css') {
    dark();
  } else {
    light();
  }
}

function light() {
  $('link[data-id="theme"]')
    .attr({
      href: 'css/landing_light.css'
    });
}

function dark() {
  $('link[data-id="theme"]')
    .attr({
      href: 'css/landing_dark.css'
    });
}

if (window.location.hash === '#light') {
  light();
} else if (window.location.hash === '#dark') {
  dark();
}