// Utility function to parse and retrieve data from localStorage
const retrieveEntries = () => {
    try {
        const entries = localStorage.getItem("user-entries");
        return entries ? JSON.parse(entries) : [];
    } catch (error) {
        console.error("Error parsing entries from localStorage:", error);
        return [];
    }
};

// Display entries on the table
const displayEntries = () => {
    const entries = retrieveEntries();
    const tableEntries = entries.map((entry) => `
        <tr>
            <td class="border px-4 py-2">${entry.name}</td>
            <td class="border px-4 py-2">${entry.email}</td>
            <td class="border px-4 py-2">${entry.password}</td>
            <td class="border px-4 py-2">${entry.dob}</td>
            <td class="border px-4 py-2">${entry.acceptedTermsAndConditions ? 'true' : 'false'}</td>
        </tr>
    `).join("");

    document.getElementById("user-entries").innerHTML = tableEntries;
};

// Validate Date of Birth for age range (18-55 years)
const validateDob = (dob) => {
    const dobDate = new Date(dob);
    const age = (Date.now() - dobDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

    if (age < 18 || age > 55) {
        alert("Please enter a date of birth for users between 18 and 55 years old.");
        return false;
    }
    return true;
};

// Save form data and update the table
const saveUserForm = (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTermsAndConditions = document.getElementById("acceptTerms").checked;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!validateDob(dob)) {
        return;
    }

    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTermsAndConditions,
    };

    const userEntries = retrieveEntries();
    userEntries.push(entry);

    try {
        localStorage.setItem("user-entries", JSON.stringify(userEntries));
        displayEntries();
    } catch (error) {
        console.error("Error saving entries to localStorage:", error);
    }

    // Reset form fields after submission
    event.target.reset();
};

// Attach form submit event handler
document.getElementById("user-form").addEventListener("submit", saveUserForm);

// Display entries on page load
displayEntries();
