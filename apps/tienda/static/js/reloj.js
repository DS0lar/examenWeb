const time = document.getElementById('tiempo');

const interval = setInterval(() => {
    const local = new Date();
    time.innerHTML = local.toLocaleTimeString();
});
