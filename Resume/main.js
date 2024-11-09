var _a;
// Add event listener for form submission
(_a = document.getElementById('resume-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', generateResume);
// Function to generate the resume based on user input
function generateResume(event) {
    event.preventDefault(); // Prevent form submission and page reload
    // Collect form data
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    var certification = document.getElementById('certification').value;
    // Handle image upload
    var imageInput = document.getElementById('profile-image');
    var imageFile = (imageInput === null || imageInput === void 0 ? void 0 : imageInput.files) ? imageInput.files[0] : null;
    // If an image file is present, read it and pass it to the displayResume function
    if (imageFile) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            var imageUrl = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            displayResume(name, email, phone, education, experience, skills, certification, imageUrl);
        };
        reader.onerror = function () {
            console.error('Error reading the image file.');
            // Call displayResume even if there was an error with the image
            displayResume(name, email, phone, education, experience, skills, certification, null);
        };
        reader.readAsDataURL(imageFile);
    }
    else {
        // If no image, display the resume without an image
        displayResume(name, email, phone, education, experience, skills, certification, null);
    }
}
// Function to display the generated resume
function displayResume(name, email, phone, education, experience, skills, certification, imageUrl) {
    var resumeDisplay = document.getElementById('resume-display');
    if (!resumeDisplay) {
        console.error('Resume display element is missing.');
        return;
    }
    // Create resume HTML content
    var resumeHTML = "\n        <div class=\"resume-header\">\n            ".concat(imageUrl ? "<img src=\"".concat(imageUrl, "\" alt=\"").concat(name, "'s profile\" class=\"resume-img\">") : '', "\n            <h2>").concat(name, "</h2>\n            <p><strong>Email:</strong> ").concat(email, "</p>\n            <p><strong>Phone:</strong> ").concat(phone, "</p>\n        </div>\n        <div class=\"resume-section\">\n            <h3>Education</h3>\n            <p>").concat(education, "</p>\n        </div>\n        <div class=\"resume-section\">\n            <h3>Work Experience</h3>\n            <p>").concat(experience, "</p>\n        </div>\n        <div class=\"resume-section\">\n            <h3>Skills</h3>\n            <p>").concat(skills, "</p>\n        </div>\n        ").concat(certification ? "\n        <div class=\"resume-section\">\n            <h3>Certifications</h3>\n            <p>".concat(certification, "</p>\n        </div>\n        ") : '', "\n    ");
    // Insert the resume HTML content into the display area
    resumeDisplay.innerHTML = resumeHTML;
}
