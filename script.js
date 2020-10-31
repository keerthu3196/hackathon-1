const fetchData = (url) => {
    return new Promise((res, rej) =>{
    fetch(url).then((res)=>res.json()).then((data)=> res(data)).catch((e)=>rej(e));});};

const searchUser = document.getElementById('searchUser');

const userInfoDiv = document.getElementById('userCardInfo');

searchUser.addEventListener('click',(e)=>{
    let UserInputValue = document.getElementById('githubUser');
    fetchData("https://api.github.com/users/"+UserInputValue.value).then((posts)=>{
    console.log(posts);
    userInfoDiv.innerHTML = "";
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

    infoDiv.append(userName,userLogin,userBio,divRepo,profile);

    userInfoDiv.append(avatar,infoDiv)


})})
