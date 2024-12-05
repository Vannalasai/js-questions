document.querySelector('.menu-toggle').addEventListener('click', () => {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.left = sidebar.style.left === '0px' ? '-200px' : '0px';
});

document.querySelector('body').classList.toggle('dark-mode');
