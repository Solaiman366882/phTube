console.log('js connected');

const handleCategory = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const categories = data.data;
    displayCategory(categories)
    console.log(categories);
}

const displayCategory = (categories) =>{
    const categoryContainer = document.getElementById('tab-container');
    // categoryContainer.innerHTML = '';
    categories.forEach(category => {
        const categoryName = category.category;
        const tab = document.createElement('a');
        tab.innerText = `${categoryName}`;
        tab.classList = 'tab btn';
        tab.setAttribute("onclick",`handleCategoryCard('${category.category_id}')`)
        categoryContainer.appendChild(tab);
    });
}

const handleCategoryCard = async (category_id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`);
    const data = await res.json();
    const categoryData = data.data;
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
    
        if(categoryData.length <= 0){
            cardContainer.classList = '';
            cardContainer.innerHTML = `
               <img src="./assets/images/Icon.png" class="mt-32 mb-8 mx-auto" alt="">
               <h1 class="sorry mb-24">Oops!! Sorry, There is no <br> content here</h1>
            `;
        }else{
            cardContainer.classList = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-24';
            categoryData.forEach(info =>{
                const card = document.createElement('div');
                card.classList = 'card';
                card.innerHTML = `
                    <div class="card-img"><img src="${info.thumbnail}" alt=""></div>
                    <div class="card-body">
                        <div class="profile-img">
                            <img src="${info?.authors[0]?.profile_picture}" alt="">
                        </div>
                        <div class="card-details">
                            <h2>${info?.title}</h2>
                            <div class="author-info flex items-center gap-3">
                                <p>${info?.authors[0].profile_name}</p>
                                <div>${info?.authors[0].verified ? '<img src="./assets/images/varified.png" alt="">':''}</div>
                            </div>
                            <p>${info?.others?.views}  views</p>
                        </div>
                    </div>
            `;
            cardContainer.appendChild(card);
            });
        // cardContainer.appendChild(card);
        }
        // console.log(card);


    console.log(categoryData.length);
    console.log(data);
    console.log(categoryData);
}


handleCategory();
handleCategoryCard('1000');

document.getElementById('blog-btn').addEventListener('click',function(){
    window.location.href = 'blog.html'
});
const handleSort = () =>{
    const cardContainer = document.getElementById('card-container');
    console.log(cardContainer);
}

handleSort()

const time = 7240;

const hour = time/3600;
const second = time%3600;
console.log(parseInt(hour),second);