const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        try {
            return JSON.parse(entries);
        } catch (error) {
            console.error("Error parsing entries from localStorage:", error);
            return [];
        }
    }
    return [];
};

const displayEntries = () => {
    const entries = retrieveEntries();
    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class="border px-4 py-2">${entry.name}</td>`;
        const emailCell = `<td class="border px-4 py-2">${entry.email}</td>`;
        const passwordCell = `<td class="border px-4 py-2">${entry.password}</td>`;
        const dobCell = `<td class="border px-4 py-2">${entry.dob}</td>`;
        const acceptTermsCell = `<td class="border px-4 py-2">${entry.acceptedTermsAndConditions ? 'True' : 'False'}</td>`;

        const row = `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const tableBody = document.getElementById("user-entries");
    tableBody.innerHTML = tableEntries;
};

const validateDob = (dob) => {
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
        age--;
    }
    if (age < 18 || age > 55) {
        alert("Please enter a date of birth for users between 18 and 55 years old.");
        return false;
    }
    return true;
};

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
        acceptedTermsAndConditions
    };

    let userEntries = retrieveEntries();
    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();

    // Clear the form fields
    document.getElementById("user-form").reset();
};

document.getElementById("user-form").addEventListener("submit", saveUserForm);

// Display entries on page load
displayEntries();
