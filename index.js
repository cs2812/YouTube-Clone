// https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=kgf%202&key=[YOUR_API_KEY] HTTP/1.1

const videocontainer=document.querySelector(".video-container")


const api ="AIzaSyARr_v1YqzL-Mfm3ODPd39WJ6OSfMNgbSI";

let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 20,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    // console.log("data",data)

    data.items.forEach(ele => {
        getChannelIcon(ele);
    })
})
.catch(err => console.log(err));


const searchvideo=()=>{

    const q = document.getElementById("query").value;

    fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${q}%202&key=${api}`)
    .then(res=>res.json())
    .then(data=>{
        // console.log("search:",data)
        data.items.forEach(ele => {
        videocontainer.innerHTML=null;

            getChannelIcon(ele);
        })
    })
}

const getChannelIcon=(ele)=>{
console.log("ele",ele)
    fetch(channel_http+ new URLSearchParams({
        key: api,
        part:'snippet',
        id:ele.snippet.channelId
    }))
    .then(res=>res.json())
    .then(data=>{
        ele.channelThumbnail=data.items[0].snippet.thumbnails.default.url;
        makecard(ele)
    })
}



const makecard=(data)=>{
    console.log("make",data)
    let div1=document.createElement("div")
    div1.setAttribute("class","video")
    div1.addEventListener("click",function(){
        sendEle(data)
        window.location.href="video.html";
    })

    let img=document.createElement("img")
    img.src=data.snippet.thumbnails.high.url;
    img.setAttribute("class","thumbnail")

    let div2=document.createElement("div")
    div2.setAttribute("class","content")

    let img2=document.createElement("img")
    img2.src=data.channelThumbnail;
    img2.setAttribute("class","channel-icon")

    let div3=document.createElement("div")
    
    let h3=document.createElement("h3")
    h3.innerText=data.snippet.title
    h3.setAttribute("class","title")

    let p=document.createElement("p")
    p.innerText=data.snippet.channelTitle;
    p.setAttribute("class","channel-name")

    div3.append(h3,p)
    div2.append(img2,div3)
    div1.append(img,div2)

    videocontainer.append(div1)

    // videocontainer.innerHTML+=`
    
    // <div class="video"  >
    //     <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
    //     <div2 class="content">
    //         <img src="${data.channelThumbnail}" class="channel-icon" alt="">
    //         <div3>
    //             <h3 class="title">${data.snippet.title}</h3>
    //             <p class="channel-name">${data.snippet.channelTitle}</p>
    //         </div>
    //     </div>
    // </div>

    // `;
    // document.querySelector(".video").addEventListener("click",function(){
    //     sendEle(data)
    // window.location.href="video.html";

        // console.log("chetna")
    // })

}

let sendEle=(data)=>{
    if(data.id.kind){
        let arr=[]
        let obj={
            id:data.id.videoId,
            title:data.snippet.title
        }
        arr.push(obj)


        localStorage.setItem("video",JSON.stringify(arr))
    // window.location.href="video.html";

    }else{
        let arr=[]
        let obj={
            id:data.id,
            title:data.snippet.title
        }
        arr.push(obj)
        localStorage.setItem("video",JSON.stringify(arr))
    // window.location.href="video.html";
    
    }
}


// let id;

// let debounce=()=>{

//     if(id){clearTimeout(id)}
//     id=setTimeout(()=>{
//         search()

//     },1000)
// }









// const searchvideo = async() => {

// try{
// const q = document.getElementById("query").value;

// const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${q}%202&key=${api}`)

// const data= await res.json();

// console.log(data.items)
 
// // append(data.items);

// }
// catch (err){
//     console.log(err)
// }
// }



// const append =(videos)=>{
//     let show_video = document.getElementById("show_video");

//     show_video.innerHTML=null;
//     videos.forEach(({id:{videoId}, snippet:{title}})=>{

//         let div = document.createElement("div");

//         let iframe = document.createElement("iframe")
//         iframe.src =`https://www.youtube.com/embed/${videoId}`

//         iframe.width="100%"
//         iframe.height="100%"
//         iframe.allow ="fullscreen";

//         let name = document.createElement("h5")

//         name.innerText = title;

//         div.append(iframe,name,)
       
//         let data = {
//             title,
//             videoId,
//         };
       
//         div.onclick=()=>{
//             show
//         }

//         show_video.append(div);
//     })
// }

// const showvideo = (x)=>{
//     window.location.href = "video.html"
//     localStorage.setItem
//}