import {
auth
}
from "./firebase-config.js";

import {

createUserWithEmailAndPassword,

signInWithEmailAndPassword,

signOut,

onAuthStateChanged

}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const email =
document.getElementById("email");

const password =
document.getElementById("password");

const status =
document.getElementById("authStatus");

document
.getElementById("registerBtn")
.addEventListener(
"click",
async()=>{

try{

await
createUserWithEmailAndPassword(
auth,
email.value,
password.value
);

}
catch(err){

alert(err.message);

}

}
);

document
.getElementById("loginBtn")
.addEventListener(
"click",
async()=>{

try{

await
signInWithEmailAndPassword(
auth,
email.value,
password.value
);

}
catch(err){

alert(err.message);

}

}
);

document
.getElementById("logoutBtn")
.addEventListener(
"click",
()=>{

signOut(auth);

}
);

onAuthStateChanged(
auth,
(user)=>{

if(user){

status.innerHTML =
"Logged in as " +
user.email;

}
else{

status.innerHTML =
"Not logged in";

}

}
);
