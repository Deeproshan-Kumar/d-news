const API_KEY = `df26d035bbd344389ca2610265cf8d26`,
           API = `https://newsapi.org/v2/everything?q=`,
           searchBtn = document.querySelector("#search-news-btn"),
           loader = document.querySelector(".loader"),
           searchValue = document.querySelector("#search");

window.addEventListener("load", getNews("India"));

async function getNews(query) {
    document.querySelector("#search").value="";
    showLoader();
    let response = await fetch(`${API}${query}&apiKey=${API_KEY}`),
    data = await response.json();
    hideLoader();
    bindData(data.articles, data.totalResults, data.status);
}

// Data binding 
function bindData(articles, totalResults, status) {
    let news = document.querySelector(".news"),
    newsTemplate = document.querySelector("#news-card");
    news.innerHTML = "";
    if(totalResults > 0) {
    articles.forEach(article=>{
        let newsCard = newsTemplate && newsTemplate.content.cloneNode(true);
        fillDataInCard(newsCard, article);
        news.appendChild(newsCard);
    });
    } else {
        news.innerHTML = `<div class="error">No news found !</div>`;
    }
}

// Data filling 
function fillDataInCard(newsCard, article) {
    let card = newsCard.querySelector(".card"),
    thumbnail = card.querySelector(".img"),
    title = card.querySelector(".title"),
    permalink = card.querySelector(".permalink"),
    date = card.querySelector(".date");
    description = card.querySelector(".description");
    category = card.querySelector(".category");
    btn = card.querySelector(".btn");
    
    (article.urlToImage) ? thumbnail.src = article.urlToImage : thumbnail.src="https://via.placeholder.com/300x200";
    title.textContent = article.title;
    permalink.href=article.url;
    date.innerHTML = `Published at: <span>${new Date(article.publishedAt).toLocaleString("en-us", { timeZone: "Asia/Jakarta" })}</span>`;
    description.textContent = article.description.slice(0, 100);
    category.textContent = article.source.name;
    btn.href = article.url;
}

// Search functionality 
searchBtn.addEventListener("click", ()=>{
    let query = searchValue.value;
    if ( !query ) return;
    getNews(`"${query}"`);
});

// Dropdown filter
let filter = document.querySelector("#filter");
filter.addEventListener("change", function(){
   let value = filter.value;
   getNews(`"${value}"`);
});

// Search by category 
function getNewsByCategory(id) {
    let navigations = document.querySelector(".navigations"),
          hamburger = document.querySelector(".hamburger");
    navigations.classList.remove("open");
    hamburger.classList.remove("active");
    if ( !id ) return;
    getNews(`"${id}"`);
}

// Loader 
function showLoader() {
    if( !loader ) return;
    loader.style.display = "flex";
}

function hideLoader() {
    if( !loader ) return;
    loader.style.display = "none";
}

// Logo 
let logos = document.querySelectorAll(".logo");
logos.forEach(logo=>{
    logo.addEventListener("click", function(e){
        e.preventDefault();
        getNews("India");
    });
});

// Sticky Navbar
window.addEventListener("scroll", function(){
    let navbar = document.querySelector(".navbar");
    ( this.window.scrollY>navbar.offsetHeight ) ?  navbar.classList.add("sticky") : navbar.classList.remove("sticky");
});

// Progress bar 
window.addEventListener("scroll", function myFunction() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop,
          height = document.documentElement.scrollHeight - document.documentElement.clientHeight,
          scrolled = (winScroll / height) * 100;
    document.querySelector(".progress-bar").style.width = `${scrolled}%`;
});

// Responsive menu 
let hamburger = document.querySelector(".hamburger"),
menu = document.querySelector(".navigations");
hamburger.addEventListener("click", function(){
    this.classList.toggle("active");
    menu.classList.toggle("open");
});

// Botom to top
let trigger = document.querySelector('.trigger');
trigger && window.addEventListener('scroll', ()=> {
    trigger.classList.toggle('show', window.scrollY > 300);
});
