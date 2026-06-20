const params =
new URLSearchParams(
window.location.search
);

const animeId =
params.get("id");

async function loadDetails(){

const query = `
query($id:Int){

Media(id:$id,type:ANIME){

title{
english
romaji
}

description

episodes

averageScore

genres

coverImage{
extraLarge
}

bannerImage

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
id:Number(animeId)
}
})
}
);

const data =
await response.json();

const anime =
data.data.Media;

document
.getElementById(
"detailsContainer"
).innerHTML = `

<div class="details-flex">

<img
class="details-cover"
src="${anime.coverImage.extraLarge}">

<div>

<h1>
${anime.title.english ||
anime.title.romaji}
</h1>

<br>

<p>
⭐ ${anime.averageScore}
</p>

<br>

<p>
Episodes:
${anime.episodes || "?"}
</p>

<br>

<p>
Genres:
${anime.genres.join(", ")}
</p>

</div>

</div>

<div class="description">

${anime.description}

</div>

`;

}

loadDetails();
