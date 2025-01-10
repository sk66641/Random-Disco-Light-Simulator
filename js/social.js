document.addEventListener("DOMContentLoaded", function() {
    // Get the modal
    var accountNotAvailableModal = document.getElementById("accountNotAvailableModal");
  
    // Get the <span> element that closes the modal
    var closeAccountNotAvailableModal = document.getElementById("closeAccountNotAvailableModal");
  
    // Get all social media links
    var socialLinks = document.querySelectorAll(".socialIcons a");
  
    if (!accountNotAvailableModal || !closeAccountNotAvailableModal || socialLinks.length === 0) {
      console.error("Required elements are missing");
      return;
    }
  
    // When the user clicks on <span> (x), close the modal
    closeAccountNotAvailableModal.onclick = function() {
      accountNotAvailableModal.style.display = "none";
    }
  
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == accountNotAvailableModal) {
        accountNotAvailableModal.style.display = "none";
      }
    }
  
    // When the user clicks on a social media link, show the modal
    socialLinks.forEach(function(link) {
      if (link.title!="github" && link.title!="linkedin") {
        link.onclick = function(event) {
          event.preventDefault();
          accountNotAvailableModal.style.display = "block";
        }
      }
    });
  });
  
