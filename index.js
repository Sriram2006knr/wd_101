
let userForm = document.getElementById("user-form");
const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  return entries ? JSON.parse(entries) : [];
};
let userEntries = retrieveEntries();
const displayEntries = () => {
  const entries = retrieveEntries();

  const tableEntries = entries .map((entry) => {
      const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
      const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
      const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
      const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
      const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptedTermsAndconditions ? 'Yes':'No'}</td>`;
     return `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
 }).join("\n");
  const table = `<table class="table-auto w-full">
        <tr>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Password</th>
          <th class="px-4 py-2">Dob</th>
          <th class="px-4 py-2">Accepted Terms?</th>
        </tr>${tableEntries}
    </table>`;

document.getElementById("user-entries").innerHTML = table;

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

  function validateDob(dob) {
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }
    if (age < 18 || age > 55) {
      alert("Please enter a date of birth between 18 and 55 years old.");
      return false;
    }
    return true;
  }
  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTermsAndConditions,
  };
  userEntries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
};

userForm.addEventListener("submit", saveUserForm);
displayEntries();
