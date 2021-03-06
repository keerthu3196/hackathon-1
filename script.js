//const fetchData = (url) => {
//    return new Promise((res, rej) =>{
//    fetch(url).then((res)=>res.json()).then((data)=> res(data)).catch((e)=>rej(e));});};
const login=()=>{
    return new Promise((res, rej) =>{
    fetch("https://api.github.com/user",{headers:{authorization:"token ca5951bde95c48a34ac9ebdb4ab9f1db5e45324f"}}).then((res)=>
    res.json()).then((data)=> res(data)).catch((e)=>rej(e));});};
const searchUser = document.getElementById('searchUser');
const userInfoDiv = document.getElementById('userCardInfo');
//
//searchUser.addEventListener('click',(e)=>{
//    login().then((site)=>{console.log(site);fetchData(site.url).then((profile)=>
//        {console.log(profile.html_url);
//            //window.open(profile.html_url,'_self')
//        })})
//    let UserInputValue = document.getElementById('githubUser');
//    fetch("https://api.github.com/search/users?q="+UserInputValue.value,
//    {header:{authorization:"token ca5951bde95c48a34ac9ebdb4ab9f1db5e45324f"}}).then((posts)=>{
//    console.log(posts).then((results)=>);
////    let avatar = document.createElement('img');
////    avatar.src = posts.avatar_url;
////    avatar.height = 300;
////
////    let infoDiv = document.createElement('div');
////    infoDiv.classList.add('cardBody');
////
////    let userName = document.createElement('h1');
////    userName.innerHTML = posts.name;
////
////    let userLogin = document.createElement('h2');
////    userLogin.innerHTML = posts.login;
////
////    let userBio = document.createElement('p');
////    userBio.innerHTML = posts.bio;
////
////    let divRepo = document.createElement('div');
////    divRepo.classList.add('cardRow','itemsSpaceBetween')
////
////    let divRepoItems = document.createElement('div');
////    divRepoItems.classList.add('cardItemInfo');
////    let repoHeader = document.createElement('h4');
////    repoHeader.innerHTML = 'Public Repos'
////    divRepoItems.appendChild(repoHeader);
////    let repoBody = document.createElement('p');
////    repoBody.innerHTML = posts.public_repos;
////    divRepoItems.appendChild(repoBody);
////
////    let divFollowersItems = document.createElement('div');
////    divFollowersItems.classList.add('cardItemInfo');
////    let followersHeader = document.createElement('h4');
////    followersHeader.innerHTML = 'Followers';
////    divFollowersItems.appendChild(followersHeader);
////    let followersBody = document.createElement('p');
////    followersBody.innerHTML = posts.followers;
////    divFollowersItems.appendChild(followersBody);
////
////    divRepo.appendChild(divRepoItems);
////    divRepo.appendChild(divFollowersItems);
////
////    let profile = document.createElement('a');
////    profile.target = "_blank";
////    profile.href = posts.html_url;
////    profile.classList.add('btn','btnBlue');
////    profile.innerHTML = "Visit Profile";
////
////    fetchData(posts.repos_url).then((repos)=>{
////        console.log(repos);})
////
////    infoDiv.append(userName,userLogin,userBio,divRepo,profile);
////
////    userInfoDiv.append(avatar,infoDiv)
//
//
//})})
const fetchData = (url) => {
return new Promise((res, rej) =>{
fetch(url).then((res)=>res.json()).then((data)=> res(data)).catch((e)=>rej(e));});};
let div_container = document.createElement("div");
div_container.setAttribute("class", "container");
document.body.append(div_container);

let div_row = document.createElement("div");
div_row.setAttribute("class", "row");

function addList(posts)
{
    let avatar = document.createElement('img');
    avatar.src = posts.avatar_url;
    avatar.height = 300;

    let infoDiv = document.createElement('div');
    infoDiv.classList.add('cardBody');

    let userName = document.createElement('h1');
    userName.innerHTML = posts.name;

    let userLogin = document.createElement('h2');
    userLogin.innerHTML = posts.login;

    let userBio = document.createElement('p');
    userBio.innerHTML = posts.bio;

    let divRepo = document.createElement('div');
    divRepo.classList.add('cardRow','itemsSpaceBetween')

    let divRepoItems = document.createElement('div');
    divRepoItems.classList.add('cardItemInfo');
    let repoHeader = document.createElement('h4');
    repoHeader.innerHTML = 'Public Repos'
    divRepoItems.appendChild(repoHeader);
    let repoBody = document.createElement('p');
    repoBody.innerHTML = posts.public_repos;
    divRepoItems.appendChild(repoBody);

    let divFollowersItems = document.createElement('div');
    divFollowersItems.classList.add('cardItemInfo');
    let followersHeader = document.createElement('h4');
    followersHeader.innerHTML = 'Followers';
    divFollowersItems.appendChild(followersHeader);
    let followersBody = document.createElement('p');
    followersBody.innerHTML = posts.followers;
    divFollowersItems.appendChild(followersBody);

    divRepo.appendChild(divRepoItems);
    divRepo.appendChild(divFollowersItems);

    let profile = document.createElement('a');
    profile.target = "_blank";
    profile.href = posts.html_url;
    profile.classList.add('btn','btnBlue');
    profile.innerHTML = "Visit Profile";

    fetchData(posts.repos_url).then((repos)=>{
        console.log(repos);})

    infoDiv.append(userName,userLogin,userBio,divRepo,profile);

    let div = document.createElement('div');
    div.append(avatar,infoDiv);
    return div;
    //userInfoDiv.append(avatar,infoDiv)
}
searchUser.addEventListener('click',(e)=>{
    let UserInputValue = document.getElementById('githubUser');
//    login().then((site)=>{console.log(site);fetchData(site.url).then((profile)=>
//        {console.log(profile.html_url);
//            //window.open(profile.html_url,'_self')
//        })})

fetchData("https://api.github.com/search/users?q="+UserInputValue.value,
    {header:{authorization:"token db8e6961099bbec564fa0ef4fd4a6efda98369cc"}}).then((posts)=>{
console.log(posts);
const fetchpost=(index)=>{
fetchData(posts['items'][index].url).then((post)=>{
console.log(post);
let column = document.createElement("div")
column.setAttribute("class", "col-lg-4 col-sm-12")
column.append(addList(post));
userInfoDiv.appendChild(column)
console.log(index);
if(index%3==0)
{
    div_container.appendChild(div_row);
}
if(index < posts.items.length){fetchpost(index+1);}})
.catch((e)=>console.error(e));};
fetchpost(0);
})});
