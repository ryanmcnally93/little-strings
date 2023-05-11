var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active-accordion");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      $(panel).slideUp();
    } else {
      $(panel).slideDown();
    }
  });
}

/* This code was written by www.w3schools.com
The JQuery parts were written by me, to make the accordions slide open rather than flash */