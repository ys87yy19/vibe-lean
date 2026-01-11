const timeEl = document.getElementById('time');
const themeToggle = document.getElementById('themeToggle');
const navList = document.getElementById('navList');
const navDetail = document.getElementById('navDetail');
const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');
const providerButtons = document.querySelectorAll('.tag');

const providers = {
  google: 'https://www.google.com/search?q=',
  stackoverflow: 'https://stackoverflow.com/search?q=',
  github: 'https://github.com/search?q=',
};

let activeProvider = 'google';

const updateTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  timeEl.textContent = `${hours}:${minutes}`;
};

const applyTheme = (mode) => {
  document.body.setAttribute('data-theme', mode);
  localStorage.setItem('theme', mode);
  themeToggle.innerHTML = mode === 'dark' ? '<i class="ri-moon-line"></i>' : '<i class="ri-sun-line"></i>';
};

const initTheme = () => {
  const saved = localStorage.getItem('theme');
  applyTheme(saved || 'light');
};

providerButtons.forEach((button) => {
  button.addEventListener('click', () => {
    providerButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    activeProvider = button.dataset.provider;
    searchInput.focus();
  });
});

if (providerButtons[0]) {
  providerButtons[0].classList.add('active');
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;
  window.open(`${providers[activeProvider]}${encodeURIComponent(query)}`, '_blank');
});

navList.addEventListener('mouseover', (event) => {
  const item = event.target.closest('li');
  if (!item) return;
  navList.querySelectorAll('li').forEach((li) => li.classList.remove('active'));
  item.classList.add('active');
  navDetail.querySelector('.nav-title').textContent = item.dataset.title;
  navDetail.querySelector('p').textContent = item.dataset.desc;
  navDetail.querySelector('.nav-links').textContent = item.dataset.links.split(',').join(' · ');
});

const firstNavItem = navList.querySelector('li');
if (firstNavItem) {
  firstNavItem.classList.add('active');
}

window.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    searchInput.focus();
  }
});

themeToggle.addEventListener('click', () => {
  const current = document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

updateTime();
setInterval(updateTime, 1000 * 30);
initTheme();
