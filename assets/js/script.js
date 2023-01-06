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
const loc = document.getElementById('location');

showCountry();
getTime();

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

async function showCountry(){
    const getCountry = await fetch('https://worldtimeapi.org/api/ip');

    const data = await getCountry.json();

    console.log(data);

    country.textContent = data.timezone;

    loc.textContent = data.timezone;

    dayYear.textContent = data.day_of_year;
    dayWeek.textContent = data.day_of_week;
    weekNumber.textContent = data.week_number;
}

function getTime() {
    const getDate = new Date();
    const getHour = getDate.getHours();
    console.log(getHour)
    const getMin = getDate.getMinutes();
    const getTimeZone = -(getDate.getTimezoneOffset() / 60);

    time.innerHTML = `${getHour}:${getMin} <span>+${getTimeZone}</span>`;

    if (getHour <= '12') {
        main.style.backgroundImage =
            'url(https://images.unsplash.com/photo-1551104083-3b336cfd4dca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)';
        textDate.textContent = `Good Morning. It's currently`;
        icon.innerHTML = `<?xml version="1.0" ?><svg fill="none" height="24" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" x2="12" y1="2" y2="9"/><line x1="4.22" x2="5.64" y1="10.22" y2="11.64"/><line x1="1" x2="3" y1="18" y2="18"/><line x1="21" x2="23" y1="18" y2="18"/><line x1="18.36" x2="19.78" y1="11.64" y2="10.22"/><line x1="23" x2="1" y1="22" y2="22"/><polyline points="8 6 12 2 16 6"/></svg>`;
    } else if (getHour <= '18') {
        main.style.backgroundImage =
            'url(https://images.unsplash.com/photo-1530295314625-30d3b777ac7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80)';
        textDate.textContent = `Good Afternoon. It's currently`;
        icon.innerHTML = `<i class="fas fa-sun"></i>`;
    } else if (getHour >= '18') {
        main.style.backgroundImage =
            'url(https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1513&q=80)';
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
