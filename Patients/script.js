const pacienteBtn = document.getElementById('pacienteBtn');

pacienteBtn.addEventListener('click', () => {
    const div = document.querySelector('.form_box')
    if (div.classList.contains('esconder')) {
        div.classList.remove('esconder')
    } else {
    div.classList.add('esconder')
    }
})