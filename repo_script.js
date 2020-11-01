const login=()=>{
    return new Promise((res, rej) =>{
    fetch("https://api.github.com/user",{headers:{authorization:"token ca5951bde95c48a34ac9ebdb4ab9f1db5e45324f"}}).then((res)=>
    res.json()).then((data)=> res(data)).catch((e)=>rej(e));});};
const searchUser = document.getElementById('searchRepo');
const userInfoDiv = document.getElementById('repoCardInfo');
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

    let infoDiv = document.createElement('div');
    infoDiv.classList.add('cardBody');

    let userName = document.createElement('h1');
    userName.innerHTML = posts.full_name;

    let userBio = document.createElement('p');
    userBio.innerHTML = posts.description;

    let divRepo = document.createElement('div');
    divRepo.classList.add('cardRow','itemsSpaceBetween')

    let divRepoItems = document.createElement('div');
    divRepoItems.classList.add('cardItemInfo');
    let repoHeader = document.createElement('h4');
    repoHeader.innerHTML = 'Last Updated'
    divRepoItems.appendChild(repoHeader);
    let repoBody = document.createElement('p');
    repoBody.innerHTML = posts.updated_at;
    divRepoItems.appendChild(repoBody);

    let divFollowersItems = document.createElement('div');
    divFollowersItems.classList.add('cardItemInfo');
    let followersHeader = document.createElement('h4');
    followersHeader.innerHTML = 'Watchers';
    divFollowersItems.appendChild(followersHeader);
    let followersBody = document.createElement('p');
    followersBody.innerHTML = posts.watchers;
    divFollowersItems.appendChild(followersBody);

    divRepo.appendChild(divRepoItems);
    divRepo.appendChild(divFollowersItems);

    let profile = document.createElement('a');
    profile.target = "_blank";
    profile.href = posts.html_url;
    profile.classList.add('btn','btnBlue');
    profile.innerHTML = "Visit Repo";

    infoDiv.append(userName,userBio,divRepo,profile);

    let div = document.createElement('div');
    div.append(infoDiv);
    return div;
    //userInfoDiv.append(avatar,infoDiv)
}
searchUser.addEventListener('click',(e)=>{
    let UserInputValue = document.getElementById('githubRepo');
//    login().then((site)=>{console.log(site);fetchData(site.url).then((profile)=>
//        {console.log(profile.html_url);
//            //window.open(profile.html_url,'_self')
//        })})

fetchData("https://api.github.com/search/repositories?q="+UserInputValue.value,
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
