$(".dropdown input")
  .keydown(function (event) {
    return (String.fromCharCode(event.charCode).length == 0) &&
      (event.charCode != 8) && (event.charCode != 46)
  })

$(".dropdown .dropdown-item")
  .click(function (event) {
    $(this)
      .closest(".dropdown")
      .find("[data-toggle='dropdown']")
      .val($(this).text())
      // Fixes input label position after the value is set programatically.
      .siblings('label, i')
      .addClass('active');
  });
  