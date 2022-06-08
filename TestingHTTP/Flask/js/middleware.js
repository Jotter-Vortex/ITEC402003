$(document).ready(function () {
    var obj = document.getElementById("fix_mainNav");
    function isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      }
    if(isMobile()){
        obj.setAttribute("id", "mainNav");
    }
  });
  
  function submitemail() {
        // get values from FORM
        var name = $("#name").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var message = $("#message").val();
        var firstName = name; // For Success/Failure Message
        console.log(name);
        console.log(email);
        console.log(message);
        console.log(phone);
        // Check for white space in name for Success/Fail message
        if (firstName.indexOf(' ') >= 0) {
          firstName = name.split(' ').slice(0, -1).join(' ');
        }
        $this = $("#sendMessageButton");
        $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
        $.ajax({
          type: "POST",
          url: "/contact_email",
          data: {
            name: name,
            phone: phone,
            email: email,
            message: message
          },
          success: function(response) {
            if(response["result"]=="success"){
              // Success message
            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
              .append("</button>");
            $('#success > .alert-success')
              .append("<strong>Your message has been sent. </strong>");
            $('#success > .alert-success')
              .append('</div>');
            //clear all fields
            $('#contactForm').trigger("reset");
              //window.location.reload();
            }
            else{
              // Fail message
            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
              .append("</button>");
            $('#success > .alert-danger').append($("<strong>").text("Sorry.. " + firstName + ", it seems that changjin's mail server is not responding. Please try again later!"));
            $('#success > .alert-danger').append('</div>');
            //clear all fields
            $('#contactForm').trigger("reset");
          }
        }
    })
  }
  
  $("a[data-toggle=\"tab\"]").click(function(e) {
  e.preventDefault();
  $(this).tab("show");
  });
  
  /*When clicking on Full hide fail/success boxes */
  $('#name').focus(function() {
    $('#success').html('');
  });