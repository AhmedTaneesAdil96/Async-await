const postContainer = document.getElementById('posts-container')
const loading = document.getElementById('loader')
const filter = document.getElementById('filter');

let limit = 6;
let page = 1;

async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    const data = await res.json();
    return data;
}

///show post in DOM

async function showPosts() {
    const posts = await getPosts();
    posts.forEach(element => {
        const postsEL = document.createElement('div');
        postsEL.classList.add('post')
        postsEL.innerHTML = `<div class='number'>${element.id}</div>
         <div class="post-info><h1 class="post-title">${element.title}</h1></div>
         <div class="post-body">${element.body}</div>
    
         `
        postContainer.appendChild(postsEL);
    });



}

showPosts();


window.addEventListener('scroll', () => {

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }

})



function showLoading() {
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show');

        setTimeout(() => {
            page++;
            showPosts();
        }, 1000);
    }, 1000);
}


filter.addEventListener('input', filterFunc);

function filterFunc(e) {
    const userInput = e.target.value.toUpperCase();
    const postData = document.querySelectorAll('.post')



    postData.forEach(postt => {
        const postId = postt.querySelector('.post-title').innerHTML;
        if (title.indexOf(userInput) > -1) {
            postt.style.display = "flex"
        } else {
            postt.style.display = ''
        }
    })
}