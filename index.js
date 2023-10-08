
const left = document.getElementById('left'); 
const right = document.getElementById('right');
const listWrapper = document.querySelector('.list_wrapper')
const overflow = document.querySelector('.overflow')


function create() {

    const filmWrapper = document.createElement("div")
        filmWrapper.setAttribute("class", "film_wrapper")

        const posterWrapper = document.createElement("div")
        posterWrapper.setAttribute("class", "poster_wrapper")
        filmWrapper.appendChild(posterWrapper)

            const poster = document.createElement("img")
            poster.setAttribute("class", "poster")
            poster.setAttribute("src", "")
            poster.setAttribute("alt", "poster")
            posterWrapper.appendChild(poster)

        const title = document.createElement("div")
        title.setAttribute("class", "title")
        filmWrapper.appendChild(title)

            const filmTitle = document.createElement("h2")
            filmTitle.setAttribute("class", "film_title")
            title.appendChild(filmTitle)

            const yearWrapper = document.createElement("div")
            yearWrapper.setAttribute("class", "year_wrapper")
            title.appendChild(yearWrapper)

                const year = document.createElement("h2")
                year.setAttribute("class", "year")
                yearWrapper.appendChild(year)

listWrapper.appendChild(filmWrapper)
}




let position = 0


function sliderLeft () {
    
    if (position === 0) {
        position +=0
        listWrapper.style.transform = "translateX(" + position + "px)";
    }else {
        position += 290;
        listWrapper.style.transform = "translateX(" + position + "px)";
    }
    
}

function sliderRight () {
   let listWrapperWidth = listWrapper.scrollWidth
   let overflowWidth = overflow.offsetWidth
   let difference = listWrapperWidth-overflowWidth
   if (position>-difference) {
        position -= 290;
        listWrapper.style.transform = "translateX(" + position + "px)";
   }else {
    position -= 0;
        listWrapper.style.transform = "translateX(" + position + "px)";
   }
   return listWrapperWidth
}


left.addEventListener('click', event => {
    sliderLeft ()
    console.log(sliderLeft())
});

right.addEventListener('click', event => {
    sliderRight ()
    console.log(sliderRight())
});






const input = document.querySelector('.search')
const searchBtn = document.querySelector('.search_btn')

async function getData() {
    let inputValue = encodeURIComponent(input.value)
    const myUrl =`https://www.omdbapi.com/?s=${inputValue}&apikey=841a117d&page=1`
    try {
        const res = await fetch(myUrl);
        if (!res.ok) {
            throw new Error(`Ошибка ${res.status}`);
        }
        const data = await res.json();
        console.log(data)
        return data
    } catch (err) {
        console.error(err);
    }

}

/*FindTheMovie*/

const filmsArr=[]

async function clearFilmsArr () {
    if (filmsArr.length>0) {
        filmsArr.splice(0, filmsArr.length)
    }
}

async function showData() {
    const list = await getData();
    if (list.Response === "True") {
        for ( let movie of list.Search) {
            filmsArr.push(movie)
        }
    }else if (list.Response === "False") {
        alert("The movie hasn't found")
    }
}




async function showMovies () {
    const poster = document.querySelectorAll('.poster')
    const title = document.querySelectorAll('.film_title')
    const year = document.querySelectorAll('.year')
    for (let i =0; i<filmsArr.length; i++) {
        if (filmsArr.length>0) {
            poster[i].src = filmsArr[i].Poster
            title[i].textContent = filmsArr[i].Title
            year[i].textContent = filmsArr[i].Year
        }else {
            alert('1')
        }
    }
}

input.addEventListener('keydown', async event=> {
    if (event.key === 'Enter') {
        create()
        event.preventDefault()
        await clearFilmsArr ()
        await showData()
        await showMovies ()
    }
 })


 window.addEventListener('load', function() {
    input.focus()
 })

searchBtn.addEventListener('click', async event => {
    create()
    await clearFilmsArr ()
    await showData()
    await showMovies ()
    console.log(filmsArr)
 })

 /*/FindTheMovie*/

/*Home_page_movies*/

 async function getMoviesForHomePage() {
    const url = 'https://www.omdbapi.com/?s=spring&apikey=841a117d&page=1'
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Ошибка ${res.status}`);
        }
        const data = await res.json();
        console.log(data)
        return data
    } catch (err) {
        console.error(err);
    }

}

 async function movieOnPage () {
    
    const moviesOnPage = []
    const list = await getMoviesForHomePage()
    for(let movie of list.Search) {
        moviesOnPage.push(movie)
        create()
    }

    const poster = document.querySelectorAll('.poster')
    const title = document.querySelectorAll('.film_title')
    const year = document.querySelectorAll('.year')

    for(let i =0; i<moviesOnPage.length; i++) {
        
        poster[i].src = moviesOnPage[i].Poster
        title[i].textContent = moviesOnPage[i].Title
        year[i].textContent = moviesOnPage[i].Year
    }
}
movieOnPage ()
create()

/*slider*/




/*/slider*/




/*/Home_page_movies*/