document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("contactForm").addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevent default form submission

      const form = event.target;
      const formData = new FormData(form);

      try {
          const response = await fetch("https://formspree.io/f/mvgzryyo", {
              method: "POST",
              body: formData,
              headers: { "Accept": "application/json" }
          });

          if (response.ok) {
              showCustomMessage("Message Sent!", "success"); // Show success notification
              form.reset(); // Reset the form
          } else {
              throw new Error("Failed to send message. Please try again later.");
          }
      } catch (error) {
          showCustomMessage(error.message, "error"); // Show error notification
      }
  });
});

// Function to copy email to clipboard
function copyToClipboard(email) { 
  navigator.clipboard.writeText(email)
      .then(() => {
          showCustomMessage("Email successfully copied to clipboard!", "success"); // Notify success
      })
      .catch((error) => {
          console.error("Failed to copy email: ", error); // Log error
          showCustomMessage("Failed to copy email. Please try again.", "error"); // Notify failure
      });
}

// Custom Notification Function
function showCustomMessage(message, type) {
  // Create a notification container if it doesn't exist
  let notificationContainer = document.querySelector(".notification-container");
  if (!notificationContainer) {
      notificationContainer = document.createElement("div");
      notificationContainer.className = "notification-container";
      document.body.appendChild(notificationContainer);
  }

  // Create the notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Add the notification to the container
  notificationContainer.appendChild(notification);

  // Remove the notification after 3 seconds
  setTimeout(() => {
      notification.remove();
  }, 3000);
}
