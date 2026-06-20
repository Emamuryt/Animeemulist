const animeGrid =
document.getElementById("animeGrid");

const searchInput =
document.getElementById("searchInput");

let currentPage = 1;
let currentSearch = "";

async function fetchAnime(){

const query = `
query($page:Int,$search:String){

Page(
page:$page,
perPage:50
){

media(
type:ANIME,
search:$search,
sort:POPULARITY_DESC
){

id

title{
english
romaji
}

averageScore

coverImage{
extraLarge
}

}

}

}
`;

const response =
await fetch(
"https://graphql.anilist.co",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
query,
variables:{
page:currentPage,
search:currentSearch || null
}
})
}
);

const data =
await response.json();

displayAnime(
data.data.Page.media
);

}

function displayAnime(animes){

animes.forEach(anime=>{

const card =
document.createElement("div");

card.className = "card";

card.innerHTML = `

<img src="${anime.coverImage.extraLarge}">

<div class="card-info">

<h3>
${anime.title.english ||
anime.title.romaji}
</h3>

<p>
⭐ ${anime.averageScore || "N/A"}
</p>

</div>

`;

card.addEventListener(
"click",
()=>{

window.location =
`details.html?id=${anime.id}`;

}
);

animeGrid.appendChild(card);

});

}

searchInput.addEventListener(
"input",
()=>{

animeGrid.innerHTML = "";

currentPage = 1;

currentSearch =
searchInput.value;

fetchAnime();

}
);

document
.getElementById("loadMoreBtn")
.addEventListener(
"click",
()=>{

currentPage++;

fetchAnime();

}
);

fetchAnime();
