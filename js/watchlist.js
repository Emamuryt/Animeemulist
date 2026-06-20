import {
auth,
db
}
from "./firebase-config.js";

import {

collection,

getDocs

}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const grid =
document.getElementById(
"watchlistGrid"
);

async function loadWatchlist(){

const user =
auth.currentUser;

if(!user){

grid.innerHTML =
"<h2>Please Login</h2>";

return;

}

const snapshot =
await getDocs(
collection(
db,
"users",
user.uid,
"watchlist"
)
);

snapshot.forEach(doc=>{

const anime =
doc.data();

grid.innerHTML += `

<div class="card">

<img src="${anime.image}">

<div class="card-info">

<h3>
${anime.title}
</h3>

</div>

</div>

`;

});

}

loadWatchlist();
