document.getElementById('log-out').addEventListener('click', function (e) {
    e.preventDefault();
    localStorage.removeItem('jwt');
    localStorage.removeItem('id');
    localStorage.removeItem('au');
    localStorage.removeItem('searchId');
    localStorage.removeItem('searchNationalId');
    window.location.href = 'index.html';
})
