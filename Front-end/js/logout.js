document.getElementById('log-out').addEventListener('click', function (e) {
    e.preventDefault();
    localStorage.removeItem('jwt');
    window.location.href = 'index.html';
})