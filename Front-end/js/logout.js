document.getElementById('log-out').addEventListener('click', function (e) {
    e.preventDefault();
    localStorage.removeItem('jwt');
    localStorage.removeItem('id');
    window.location.href = 'index.html';
})