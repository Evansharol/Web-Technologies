const vaultingCheckbox = document.getElementById('vaulting');
const vaultingDetails = document.getElementById('vaultingDetails');
vaultingCheckbox.addEventListener('change', () => {
  vaultingDetails.classList.toggle('hidden', !vaultingCheckbox.checked);
});

const message = document.getElementById('message');
const charCount = document.getElementById('charCount');
message.addEventListener('input', () => {
  const remaining = 500 - message.value.length;
  charCount.textContent = `Characters left: ${remaining}`;
});

const recommendYes = document.getElementById('recommendYes');
const recommendNo = document.getElementById('recommendNo');
const budgetContainer = document.getElementById('budgetRangeContainer');
const budgetRange = document.getElementById('budgetRange');
const budgetValue = document.getElementById('budgetValue');
const confirmBudgetBtn = document.getElementById('confirmBudget');
const budgetConfirmMsg = document.getElementById('budgetConfirmMsg');

function toggleBudgetRange() {
  budgetContainer.classList.toggle('hidden', !recommendYes.checked);
  budgetConfirmMsg.textContent = '';
  budgetConfirmMsg.classList.add('hidden');
}

recommendYes.addEventListener('change', toggleBudgetRange);
recommendNo.addEventListener('change', toggleBudgetRange);

budgetRange.addEventListener('input', () => {
  budgetValue.textContent = `$${parseInt(budgetRange.value).toLocaleString()}`;
  budgetConfirmMsg.textContent = '';
  budgetConfirmMsg.classList.add('hidden');
});

confirmBudgetBtn.addEventListener('click', () => {
  budgetConfirmMsg.textContent = `✅ Budget confirmed: $${parseInt(budgetRange.value).toLocaleString()}`;
  budgetConfirmMsg.classList.remove('hidden');
});

const form = document.getElementById('watchForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let isValid = true;

  form.querySelectorAll('.input-field, [type="radio"], select').forEach(input => {
    input.classList.remove('error');
    const errorMessage = input.nextElementSibling?.classList?.contains('error-message') ? input.nextElementSibling : null;
    if (errorMessage) errorMessage.style.display = 'none';
  });

  ['fullName', 'email', 'phone', 'dob', 'address', 'brand', 'model', 'message'].forEach(id => {
    const input = document.getElementById(id);
    if (!input.value.trim()) {
      input.classList.add('error');
      input.nextElementSibling.style.display = 'block';
      isValid = false;
    } else if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      input.classList.add('error');
      input.nextElementSibling.style.display = 'block';
      isValid = false;
    } else if (id === 'phone' && !/^\+?\d{10,15}$/.test(input.value.replace(/\s/g, ''))) {
      input.classList.add('error');
      input.nextElementSibling.style.display = 'block';
      isValid = false;
    }
  });

  const dob = new Date(document.getElementById('dob').value);
  const today = new Date();
  if (dob >= today) {
    document.getElementById('dob').classList.add('error');
    document.getElementById('dob').nextElementSibling.style.display = 'block';
    isValid = false;
  }

  const password = document.getElementById('password');
  const passwordConfirm = document.getElementById('passwordConfirm');
  if (!password.value.trim()) {
    password.classList.add('error');
    password.nextElementSibling.style.display = 'block';
    isValid = false;
  }
  if (password.value !== passwordConfirm.value) {
    passwordConfirm.classList.add('error');
    passwordConfirm.nextElementSibling.style.display = 'block';
    isValid = false;
  }

  ['contactMethod', 'watchStyle'].forEach(name => {
    const radios = document.querySelectorAll(`input[name="${name}"]:checked`);
    if (radios.length === 0) {
      const radioGroup = document.querySelector(`input[name="${name}"]`).parentElement.parentElement;
      radioGroup.nextElementSibling.style.display = 'block';
      isValid = false;
    }
  });

  const condition = document.getElementById('condition');
  if (!condition.value) {
    condition.classList.add('error');
    condition.nextElementSibling.style.display = 'block';
    isValid = false;
  }

  if (isValid) {
    alert('Form submitted successfully!');
    form.reset();
    vaultingDetails.classList.add('hidden');
    budgetContainer.classList.add('hidden');
    budgetConfirmMsg.classList.add('hidden');
  }
});