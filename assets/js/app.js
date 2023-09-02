console.log('js connected');

const handleCategory = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const categories = data.data;
    displayCategory(categories)
}
// this function is only for show tabs
const displayCategory = (categories) =>{
    const categoryContainer = document.getElementById('tab-container');
    categories.forEach(category => {
        const categoryName = category.category;
        const tab = document.createElement('a');
        tab.innerText = `${categoryName}`;
        tab.classList = 'tab btn';
        tab.setAttribute("onclick",`handleCategoryCard('${category.category_id}')`)
        categoryContainer.appendChild(tab);
    });
}
// a function for convert category data to card in html
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
                // categoryData.setAttribute =('data-view',`${info?.others?.views}`)
                const time =info?.others.posted_date;
                const hour = parseInt(time/3600);
                const second = time % 3600;
                const minute = parseInt(second/60);
                card.classList = 'card';
                card.innerHTML = `
                    <div class="card-img relative">
                        <img src="${info.thumbnail}" alt="">
                        <div class="time">${info?.others.posted_date ? `<div class="px-5 py-3 text-white">${hour}hr ${minute}min ago</div>`:''}</div>
                    </div>
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
                            <p class="views">${info?.others?.views}  views</p>
                        </div>
                    </div>
            `;
            cardContainer.appendChild(card);
            });
            const tabList = document.querySelectorAll('#tab-container .tab');
                console.log(tabList);

                tabList.forEach(list => {
                    console.log(list);
                    list.addEventListener('click',function(){
                        
                        this.classList.add('active');
                        this.previousElementSibling.classList.remove('active')
                        this.nextElementSibling.classList.remove('active')
                    })
                    
                } )
        }
}


handleCategory();
handleCategoryCard('1000');

document.getElementById('blog-btn').addEventListener('click',function(){
    window.location.href = 'blog.html'
});
const handleSort = () =>{
    console.log('sorted');
    const cardList = document.querySelectorAll('#card-container .card .card-body .card-details .views');
    let viewArray = []
    for(view of cardList){
        const viewData = view.innerText;
        viewArray.push(viewData)
        console.log(viewData);
    }
    const sortedViewArray = viewArray.sort().reverse();
    console.log(cardList);
    displaySortedView(sortedViewArray);
}

const displaySortedView = (viewList) =>{
   for(list of viewList){
    console.log(list.parentNode);
   }
}

