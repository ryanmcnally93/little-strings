function sendMail(contactForm) {
  emailjs
    .send(
      "service_aev1ha8",
      "project-two",
      {
        from_name: contactForm.name.value,
        from_email: contactForm.emailaddress.value,
        project_request: contactForm.message.value,
      },
      "ja2GRBd8JoosGkPLf"
    )
    .then(
      function (response) {
        console.log("SUCCESS", response);
        // Displays the green success message
        document.getElementById("email-sent").style.display = "block";
        // Empties the input boxes in case another message needs to be sent!
        document.getElementById("fullname").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
      },
      function (error) {
        console.log("FAILED", error);
        // Displays the red error message
        document.getElementById("email-not-sent").style.display = "block";
      }
    );
}

// This code keeps the user on the site, rather than going somewhere else
// Found on this site https://stackoverflow.com/questions/5733808/submit-form-and-stay-on-same-page
// Author apparently is Herman Schaaf and edited by Riley Lark
$(document).ready(function () {
  var $form = $("form");
  $form.submit(function () {
    $.post(
      $(this).attr("action"),
      $(this).serialize(),
      function (response) {
        document.getElementById("email-sent").style.display = "block";
      },
      "json"
    );
    return false;
  });
});
