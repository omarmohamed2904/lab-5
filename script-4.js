const resultDiv = document.getElementById("result");

function register() {
  const user = {
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value,
    dateOfBirth: document.getElementById("dob").value
  };

  const errors = validateUser(user);

  user.password = "*".repeat(user.password.length);

  if (errors.length === 0) {
    showSuccess(user);
  } else {
    showFailure(errors, user);
  }
}

function validateUser(user) {
  const errors = [];

  if (user.firstName === "") errors.push("First Name is required.");
  if (user.lastName === "") errors.push("Last Name is required.");
  if (user.email === "") errors.push("Email Address is required.");
  if (user.password === "") errors.push("Password is required.");
  if (user.dateOfBirth === "") errors.push("Date of Birth is required.");

  if (user.password !== "" && !user.password.includes("!") && !user.password.includes("?")) {
    errors.push("Password must contain a special character (! or ?).");
  }

  return errors;
}

function userInfoHTML(user) {
  return `
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><strong>First Name:</strong> ${showValue(user.firstName)}</li>
      <li class="list-group-item"><strong>Last Name:</strong> ${showValue(user.lastName)}</li>
      <li class="list-group-item"><strong>Email:</strong> ${showValue(user.email)}</li>
      <li class="list-group-item"><strong>Password:</strong> ${showValue(user.password)}</li>
      <li class="list-group-item"><strong>Date of Birth:</strong> ${showValue(user.dateOfBirth)}</li>
    </ul>`;
}

function showValue(value) {
  if (value === "") return "<em class='text-muted'>(missing)</em>";
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function showSuccess(user) {
  resultDiv.innerHTML = `
    <div class="card border-success">
      <div class="card-header bg-success text-white">
        <h3 class="h5 mb-0">✅ Registration Successful!</h3>
      </div>
      <div class="card-body">
        <p>Welcome to ClearView Eye Care, ${showValue(user.firstName)}! Your patient account has been created. Here is your information:</p>
        ${userInfoHTML(user)}
      </div>
    </div>`;
}

function showFailure(errors, user) {
  let errorItems = "";
  for (let i = 0; i < errors.length; i++) {
    errorItems += `<li>${errors[i]}</li>`;
  }

  resultDiv.innerHTML = `
    <div class="card border-danger">
      <div class="card-header bg-danger text-white">
        <h3 class="h5 mb-0">❌ Registration Failed</h3>
      </div>
      <div class="card-body">
        <p>Please fix the following:</p>
        <ul class="text-danger">${errorItems}</ul>
        <p class="mb-2">Information you entered:</p>
        ${userInfoHTML(user)}
      </div>
    </div>`;
}
