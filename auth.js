// Authentication logic for login.html
// NOTE: This is a front-end demo. Do NOT store real credentials in client-side code.

const facultyCredentials = [
  { username: 'Dr.Sherif', password: 'Sherif@123', redirectURL: 'HP(dr.sherif).html' },
  { username: 'Dr.Hanan', password: 'Hanan@123', redirectURL: '' },
  { username: 'Dr.Norhane', password: 'Norhane@123', redirectURL: '' },
  { username: 'Dr.Asmaa Al-Sharif', password: 'AsmaaSH@123', redirectURL: '' },
  { username: 'Dr.Asmaa Abd-elmajid', password: 'AsmaaA@123', redirectURL: '' },
  { username: 'Dr.Samuel', password: 'Samuel@123', redirectURL: '' },
  { username: 'Dr.Reem', password: 'Reem@123', redirectURL: '' },
  { username: 'Dr.Farid', password: 'Farid@123', redirectURL: '' },
  { username: 'Dr.Khaled', password: 'Khaled@123', redirectURL: '' },
  { username: 'Dr.Merielle', password: 'Merielle@123', redirectURL: '' },
  { username: 'Dr.Manal', password: 'Manal@123', redirectURL: '' },
  { username: 'Dr.Ehab', password: 'Ehab@123', redirectURL: '' },
  { username: 'Dr.Maan', password: 'Maan@123', redirectURL: '' },
  { username: 'Dr.Mario', password: 'Mario@123', redirectURL: '' },
  { username: 'Dr.Mohamed', password: 'Mohamed@123', redirectURL: '' },
  { username: 'Dr.Gihane', password: 'Gihane@123', redirectURL: '' },
  { username: 'Dr.Soheir', password: 'Soheir@123', redirectURL: '' },
  { username: 'Dr.Donia', password: 'Donia@123', redirectURL: '' },
  { username: 'Dr.Hesham', password: 'Hesham@123', redirectURL: '' },
];

function validateFacultyCredentials(username, password) {
  const u = (username || '').trim();
  const p = String(password || '');

  return facultyCredentials.find((prof) => prof.username === u && prof.password === p) || null;
}

(() => {
  const form = document.getElementById('loginForm');
  const messageEl = document.getElementById('message');
  const usernameEl = document.getElementById('username');
  const passwordEl = document.getElementById('password');

  if (!form) return;

  const showMessage = (msg) => {
    if (messageEl) messageEl.textContent = msg;
    else alert(msg);
  };

  const clearMessage = () => {
    if (messageEl) messageEl.textContent = '';
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearMessage();

    const username = usernameEl ? usernameEl.value : '';
    const password = passwordEl ? passwordEl.value : '';

    const match = validateFacultyCredentials(username, password);
    if (!match) {
      showMessage('Invalid credentials. Please try again.');
      return;
    }

    // Smooth-ish redirect: small delay allows button active state to be perceived
    window.setTimeout(() => {
      window.location.href = match.redirectURL;
    }, 120);
  });
})();

