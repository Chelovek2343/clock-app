const refreshButton = document.getElementById('refresh_button');
const more = document.getElementById('more');
const description = document.querySelector('.description');
const main = document.querySelector('.main');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const time = document.getElementById('time');
const country = document.getElementById('country');
const dayYear = document.getElementById('dayYear');
const dayWeek = document.getElementById('dayWeek');
const weekNumber = document.getElementById('weekNumber');
const icon = document.querySelector('.icon');
const textDate = document.getElementById('textDate');
const header = document.querySelector('.header');
const timeMain = document.querySelector('.time_main');

showTime();

async function getRandomQuotes() {
    const resp = await fetch('https://api.quotable.io/random');
    const data = await resp.json();

    quoteText.textContent = data.content;
    quoteAuthor.textContent = data.author;
}

refreshButton.addEventListener('click', () => {
    refreshButton.classList.add('rotate');

    setTimeout(() => {
        refreshButton.classList.remove('rotate');
    }, 1000);

    getRandomQuotes();
});

async function showTime() {
    const getCountry = await fetch(
        'https://api.freegeoip.app/json/?apikey=badbfed0-840d-11ec-bccd-9fb72d031ad2'
    );

    const data = await getCountry.json();

    country.textContent = `${data.city}, ${data.country_name}`;

    getTime();
}

async function getTime() {
    const location = document.getElementById('location');

    const responsive = await fetch('http://worldtimeapi.org/api/ip');
    const timeData = await responsive.json();

    const currentTime = timeData.datetime;

    time.innerHTML = `${currentTime.slice(
        11,
        16
    )} <span>${timeData.utc_offset.slice(0, 3)}</span>`;

    location.textContent = timeData.timezone;
    dayYear.textContent = timeData.day_of_year;
    dayWeek.textContent = timeData.day_of_week;
    weekNumber.textContent = timeData.week_number;

    if (time >= '5' && time <= '11') {
        main.style.backgroundImage = 'url(../assets/img/morning.jpg)';
        textDate.textContent = `Good Morning. It's currently`;
        icon.innerHTML = `<?xml version="1.0" ?><svg fill="none" height="24" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" x2="12" y1="2" y2="9"/><line x1="4.22" x2="5.64" y1="10.22" y2="11.64"/><line x1="1" x2="3" y1="18" y2="18"/><line x1="21" x2="23" y1="18" y2="18"/><line x1="18.36" x2="19.78" y1="11.64" y2="10.22"/><line x1="23" x2="1" y1="22" y2="22"/><polyline points="8 6 12 2 16 6"/></svg>`;
    } else if (time >= '12' && time <= '17') {
        main.style.backgroundImage = 'url(../assets/img/afternoon.jpg)';
        textDate.textContent = `Good Afternoon. It's currently`;
        icon.innerHTML = `<i class="fas fa-sun"></i>`;
    } else {
        main.style.backgroundImage = 'url(../assets/img/night.jpg)';
        textDate.textContent = `Good Evening. It's currently`;
        icon.innerHTML = `<i class="fas fa-moon"></i>`;
    }
}

setInterval(getTime, 1000);

more.addEventListener('click', () => {
    timeMain.classList.toggle('active');
    description.classList.toggle('active');
    header.classList.toggle('hide');

    if (description.classList.contains('active')) {
        more.innerHTML = `Less <i class="fas fa-chevron-up"></i>`;
    } else {
        more.innerHTML = `More <i class="fas fa-chevron-down"></i>`;
    }
});
