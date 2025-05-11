
async function getsongs() {
    let a = await fetch("http://127.0.0.1:3000/Spotify%20Clone/songs/")
    let response = await a.text();
    console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response
    let g = div.getElementsByTagName("a")
    let songs = []
    console.log(g);
    for (let i = 0; i < g.length; i++) {
        const element = g[i]
        if (element.href.endsWith("mp3")) {
            songs.push(element.href.split("/songs/")[1].replaceAll("%20", " "))
        }
    }
    return songs;

}

async function cardreturn(image, songname, songartist) {
    let a = document.querySelector(".singles")
    a.innerHTML += `
        <div class="songcard">
                <img src=${image} alt="">
                <div class="songname">${songname}</div>
                <div class="songartist">${songartist}</div>
                <svg class="playb" xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="#359733"></circle>
                <polygon points="40,30 40,70 70,50" fill="black"></polygon>
                    </svg>
                    </div>`
}

let cover = ["https://i.scdn.co/image/ab67616d0000b273373c63a4666fb7193febc167", "https://i.scdn.co/image/ab67616d0000b27316168e9d75e544b005bc0a0a", "https://a10.gaanacdn.com/gn_img/albums/P7m3GNKqxo/m3GP4wzGWq/size_m.jpg", "https://a10.gaanacdn.com/gn_img/albums/qaLKY23pO4/LKYAzdowKp/size_m.jpg", "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRmG1PxhbW5fN5LaQKeo6NDathQPbF4cuud_vI97-a8G4o41fdS", "https://i.scdn.co/image/ab67616d0000b2739164bafe9aaa168d93f4816a", "https://i.scdn.co/image/ab67616d0000b273a48964b5d9a3d6968ae3e0de"]

function showscreen(r, i) {
    document.querySelector(".coverimg").src = cover[i]
    document.querySelector(".currname").innerHTML = r.split("-")[0]
    document.querySelector(".currart").innerHTML = r.split("-")[1].replace(".mp3", "")
    document.querySelector(".currentsong").style.zIndex = "2";
}


let currentsong = new Audio()
const playmusic = (track) => {
    currentsong.src = "/Spotify%20Clone/songs/" + track
    currentsong.play();
    pauseplaybutton.src = "playbutt.svg"
}
async function main() {
    let songs = await getsongs()
    console.log(songs);
    for (let index = 0; index < songs.length; index++) {
        const element = songs[index];
        let songname = element.split("-")[0]
        let songartist = element.split("-")[1].replace(".mp3", "")
        await cardreturn(cover[index], songname, songartist)
    }
    let a = document.getElementsByClassName("songcard")
    Array.from(a).forEach(e => {
        let g = e.querySelector(".songname").innerHTML
        console.log(g)
        let svg = e.querySelector("svg")
        svg.addEventListener("click", () => {
            for (let i = 0; i < songs.length; i++) {
                const r = songs[i];
                if (r.includes(g)) {
                    showscreen(r, i)
                    playmusic(r)
                }
            }
        })
    })

    pauseplaybutton.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            pauseplaybutton.src = "playbutt.svg"
        }
        else {
            currentsong.pause()
            pauseplaybutton.src = "pause.svg"
        }
    })

    currentsong.addEventListener("timeupdate", () => {
        let a = currentsong.duration
        let b = currentsong.currentTime
        let amin = Math.floor(a / 60)
        let bmin = Math.floor(b / 60)
        let asec = Math.floor(a % 60)
        let bsec = Math.floor(b % 60)
        document.querySelector(".totdur").innerHTML = `${amin < 10 ? `0${amin}` : amin}:${asec < 10 ? `0${asec}` : asec} `
        document.querySelector(".currtime").innerHTML = `${bmin < 10 ? `0${bmin}` : bmin}:${bsec < 10 ? `0${bsec}` : bsec} `
        document.querySelector(".circle").style.left = (b / a) * 100 + `%`
    })

    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let a = (e.offsetX / e.target.getBoundingClientRect().width)
        document.querySelector(".circle").style.left = a * 100 + `%`
        currentsong.currentTime = currentsong.duration * a
    })

    prevbutton.addEventListener("click", () => {
        currentsong.currentTime = 0
        ondblclick = () => {
            let index = songs.indexOf(currentsong.src.split("/songs/")[1].replaceAll("%20", " "))
            if (index > 0) {
                playmusic(songs[index - 1])
                showscreen(songs[index - 1], index - 1)
            }
        }
    })

    nextbutton.addEventListener("click", () => {
        let index = songs.indexOf(currentsong.src.split("/songs/")[1].replaceAll("%20", " "))
        if (index+1 < songs.length) {
            playmusic(songs[index + 1])
            showscreen(songs[index + 1], index + 1)
        }
    })
}
main()
