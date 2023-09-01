// category data load from API 

const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    // console.log(data.data);

    const categoryDiv = document.getElementById('category-div');

    data.data.forEach(item => {
        // console.log(item)
        const div = document.createElement('div');
        div.innerHTML = `
        
        <button onclick='handleLoadData("${item.category_id}")' class="bg-base-200 p-2 rounded  hover:bg-red-400 hover:text-white">${item?.category}</button>
        
        `
        categoryDiv.appendChild(div);

    });
    handleLoadData('1000');
};

// blog page handle 
const clickBlogBtn = () => {
    window.location.href = 'blog.html';
}

let contentData = []; //global variable 


// content load and set from API 
const handleLoadData = async (id) =>{
    // console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json();
    // console.log(data.data)
    contentData = data.data;

    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '';

    if(contentData && contentData.length > 0){
       
        contentData?.forEach(video => {
            // console.log(video);
            // console.log(video.others.views)
            
            const seconds = `${video.others?.posted_date}`;
            // console.log(typeof seconds);


                // seconds converting hour and minutes
                const timeConverting = (seconds) => {
                    const hours = Math.floor(seconds / 3600);
                    const remainingSeconds = seconds % 3600;
                    const minutes = Math.floor(remainingSeconds / 60);
    
                return {
                    hours: hours,
                    minutes: minutes
                  };
                }
    
                const result = timeConverting(seconds);

            
            // dynamic content create 
            const div = document.createElement('div');
            div.classList = '';
            div.innerHTML = `
            <figure><img class='h-[200px] w-[500px]' src="${video?.thumbnail}" /></figure>
                <div class='flex justify-end -mt-10'>
                <button id='time-btn' class=' bg-stone-700 text-white p-1 rounded'>${result.hours} hrs ${result.minutes} min ago</button>
                </div>
                <div class='flex items-center'>
                    <div >
                        <img class="w-16 h-16 px-2 rounded-full" src="${video?.authors[0]?.profile_picture}"/>
                        
                    </div>
                    
                
                    <div class="card-body">
                        <h2 class="card-title">${video?.title}</h2>
                        <div class=''>
                            <p class='inline-block'>${video?.authors[0]?.profile_name}</p>
                            <img class='inline-block' src='${video.authors[0].verified? `./images/fi_10629607.svg` : '' }' />   
                        </div> 
                        <small>${video.others?.views}</small>
                    </div>
                </div>

            `
            dataContainer.appendChild(div); 

        });
    }
    else{
        const noFoundData = document.createElement('div');
        noFoundData.innerHTML = `
        <div class='flex items-center gap-5'> 
            <img src="./images/Icon.png"  />
            <h2 class='text-xl font-semibold'>Oops!! Sorry, There is no content here</h2>
        </div>
        
        `;
        dataContainer.appendChild(noFoundData);
    }
    
};

// sort by most views 
document.getElementById('btn-sort-by-view').addEventListener('click', () =>{
    
    contentData.sort((a, b) => parseFloat(b.others.views) - parseFloat(a.others.views));

    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '';

    if(contentData && contentData.length > 0){
       
        contentData?.forEach(video => {
            // console.log(video);
            // console.log(video.others.views)
            
            const seconds = `${video.others?.posted_date}`;
            // console.log(seconds);

                const timeConverting = (seconds) => {
                    const hours = Math.floor(seconds / 3600);
                    const remainingSeconds = seconds % 3600;
                    const minutes = Math.floor(remainingSeconds / 60);
    
                return {
                    hours: hours,
                    minutes: minutes
                  };
                }
    
                const result = timeConverting(seconds);


            const div = document.createElement('div');
            div.classList = '';
            div.innerHTML = `
            <figure><img class='h-[200px] w-[500px]' src="${video?.thumbnail}" /></figure>
                <div class='flex justify-end -mt-10'>
                <button class=' bg-stone-700 text-white p-1 rounded'>${result.hours} hrs ${result.minutes} min ago</button>
                </div>
                <div class='flex items-center'>
                    <div >
                        <img class="w-16 h-16 px-2 rounded-full" src="${video?.authors[0]?.profile_picture}"/>
                        
                    </div>
                    
                
                    <div class="card-body">
                        <h2 class="card-title">${video?.title}</h2>
                        <div class=''>
                            <p class='inline-block'>${video?.authors[0]?.profile_name}</p>
                            <img class='inline-block' src='${video.authors[0].verified? `./images/fi_10629607.svg` : '' }' />   
                        </div> 
                        <small>${video.others?.views}</small>
                    </div>
                </div>
                
            
            `
            dataContainer.appendChild(div);
            
           

        });
    }
    else{
        const noFoundData = document.createElement('div');
        noFoundData.innerHTML = `
        <div class='flex items-center gap-5'> 
            <img src="./images/Icon.png"  />
            <h2 class='text-xl font-semibold'>Oops!! Sorry, There is no content here</h2>
        </div>
        
        `;
        dataContainer.appendChild(noFoundData);
    }

});


loadData();