const animeGrid =
document.getElementById("animeGrid");

async function loadTrending(){

const query = `
query {
Page(page:1, perPage:24){
media(
type:ANIME,
sort:TRENDING_DESC
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

const response = await fetch(
"https://graphql.anilist.co",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({query})
}
);

const data =
await response.json();

showAnime(
data.data.Page.media
);

}

function showAnime(animes){

animeGrid.innerHTML="";

animes.forEach(anime=>{

animeGrid.innerHTML += `
<div class="card">

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

</div>
`;

});

}

loadTrending();
