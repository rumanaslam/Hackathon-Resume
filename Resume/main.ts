// Add event listener for form submission
document.getElementById('resume-form')?.addEventListener('submit', generateResume);

// Function to generate the resume based on user input
function generateResume(event: Event): void {
    event.preventDefault(); // Prevent form submission and page reload

    // Collect form data
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
    const certification = (document.getElementById('certification') as HTMLInputElement).value;

    // Handle image upload
    const imageInput = document.getElementById('profile-image') as HTMLInputElement;
    const imageFile = imageInput?.files ? imageInput.files[0] : null;

    // If an image file is present, read it and pass it to the displayResume function
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (e: ProgressEvent<FileReader>) {
            const imageUrl = e.target?.result as string;
            displayResume(name, email, phone, education, experience, skills, certification, imageUrl);
        };
        reader.onerror = function () {
            console.error('Error reading the image file.');
            // Call displayResume even if there was an error with the image
            displayResume(name, email, phone, education, experience, skills, certification, null);
        };
        reader.readAsDataURL(imageFile);
    } else {
        // If no image, display the resume without an image
        displayResume(name, email, phone, education, experience, skills, certification, null);
    }
}

// Function to display the generated resume
function displayResume(
    name: string,
    email: string,
    phone: string,
    education: string,
    experience: string,
    skills: string,
    certification: string,
    imageUrl: string | null
): void {
    const resumeDisplay = document.getElementById('resume-display');
    if (!resumeDisplay) {
        console.error('Resume display element is missing.');
        return;
    }

    // Create resume HTML content
    const resumeHTML = `
        <div class="resume-header">
            ${imageUrl ? `<img src="${imageUrl}" alt="${name}'s profile" class="resume-img">` : ''}
            <h2>${name}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
        </div>
        <div class="resume-section">
            <h3>Education</h3>
            <p>${education}</p>
        </div>
        <div class="resume-section">
            <h3>Work Experience</h3>
            <p>${experience}</p>
        </div>
        <div class="resume-section">
            <h3>Skills</h3>
            <p>${skills}</p>
        </div>
        ${certification ? `
        <div class="resume-section">
            <h3>Certifications</h3>
            <p>${certification}</p>
        </div>
        ` : ''}
    `;

    // Insert the resume HTML content into the display area
    resumeDisplay.innerHTML = resumeHTML;
}
