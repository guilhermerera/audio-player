//HTML ELEMENTS
let audio = document.getElementById("audio")
let skipback = document.getElementById("skipback")
let play = document.getElementById("play")
let skipforward = document.getElementById("skipforward")
let repeat = document.getElementById("repeat")
let mute = document.getElementById("mute")
let volumeslider = document.getElementById("volumeslider")
let volumecontainer = document.getElementById("volumecontainer")
let musicslider = document.getElementById("musicslider")
let stampCT = document.getElementById("stampCT")
let stampDT = document.getElementById("stampDT")
let musicList = document.getElementById("musicList")
let musicTitle = document.getElementById("musicTitle")

//STANDARD FUNCTIONS
onload = function () {
    loadPlayList()
    setInterval(autoNextCheck, 500)
    repeat.style.opacity = 0.3
}

//PLAY-PAUSE
let playPause = function () {
    let src = play.getAttribute("src")
    if (src == "./assets/icons/play.svg") {
        audio.play()
        play.setAttribute("src", "./assets/icons/pause.svg")
    } else {
        audio.pause()
        play.setAttribute("src", "./assets/icons/play.svg")
    }
}

play.addEventListener("click", playPause)

//MUTE-UNMUTE
mute.addEventListener("click", function () {
    let src = mute.getAttribute("src")
    if (src == "./assets/icons/volume-2.svg") {
        audio.muted = true
        mute.setAttribute("src", "./assets/icons/volume-x.svg")
        volumeslider.value = 0
    } else {
        audio.muted = false
        mute.setAttribute("src", "./assets/icons/volume-2.svg")
        volumeslider.value = audio.volume
    }
})

//VOLUME SLIDER
//Volume Slider FadeIn/Out
volumecontainer.addEventListener("mouseover", function () {
    volumeslider.style.opacity = 1
})

volumecontainer.addEventListener("mouseout", function () {
    volumeslider.style.opacity = 0
})

//Volume Slider Action
volumeslider.addEventListener("input", function () {
    let vol = volumeslider.value
    audio.volume = vol
    if (vol == 0) {
        mute.setAttribute("src", "./assets/icons/volume-x.svg")
    } else {
        audio.muted = false
        mute.setAttribute("src", "./assets/icons/volume-2.svg")
    }
})

//Music Slider & Time Stamp Auto Update
audio.addEventListener("timeupdate", function () {
    musicslider.value = audio.currentTime
    let minCT = ~~((audio.currentTime % 3600) / 60)
    let secsCT = ~~audio.currentTime % 60
    stampCT.innerHTML = minCT + ":" + (secsCT < 10 ? "0" + secsCT : secsCT)
    musicslider.max = audio.duration
    let minDT = ~~((audio.duration % 3600) / 60)
    let secsDT = ~~audio.duration % 60
    stampDT.innerHTML = minDT + ":" + (secsDT < 10 ? "0" + secsDT : secsDT)
})

//Music Slider Function
musicslider.addEventListener("input", function () {
    audio.currentTime = musicslider.value
})

//MUSICLIST
let playList = {
    music: ["Aviated - Nana Kwabena", "CPT - Drew Banga", "Hanging Out - Bruno E.",
        "Madam Wahala Beat - Nana Kwabena", "Schizo - Anno Domini Beats"
    ],
    path: ["./assets/musics/Aviated-NanaKwabena.mp3", "./assets/musics/CPT-DrewBanga.mp3", "./assets/musics/HangingOut-BrunoE..mp3",
        "./assets/musics/MadamWahalaBeat-NanaKwabena.mp3", "./assets/musics/Schizo-AnnoDominiBeats.mp3"
    ]
}

//Print MusicList InScreen
let loadPlayList = function () {
    musicList.setAttribute("size", playList.music.length)
    for (let i = 0; i < playList.music.length; i++) {
        musicList.innerHTML += '<option class="text" value="' + i + '">' + playList.music[i] + '</option>'
    }
}

//MusicList Add to Audio
musicList.addEventListener("input", function () {
    let i = musicList.value
    audio.setAttribute("src", playList.path[i])
    play.setAttribute("src", "./assets/icons/play.svg")
    musicslider.value = audio.currentTime
    musicTitle.innerHTML = playList.music[i]
})

//MUSIC LIST NAVIGATION
//SkipFoward
let nextSong = function () {
    let i = musicList.value
    if (i < playList.music.length - 1) {
        audio.pause()
        i++
        musicList.value = i
        musicTitle.innerHTML = playList.music[i]
        audio.setAttribute("src", playList.path[i])
        audio.play()
        play.setAttribute("src", "./assets/icons/pause.svg")
    } else {
        audio.pause()
        i = 0
        musicList.value = i
        musicTitle.innerHTML = playList.music[i]
        audio.setAttribute("src", playList.path[i])
        audio.play()
        play.setAttribute("src", "./assets/icons/pause.svg")
    }
}
skipforward.addEventListener("click", nextSong)

//SkipBack
let backSong = function () {
    let i = musicList.value
    if (i > 0) {
        audio.pause()
        musicslider.value = audio.currentTimeloop
        i--
        musicList.value = i
        musicTitle.innerHTML = playList.music[i]
        audio.setAttribute("src", playList.path[i])
        audio.play()
        play.setAttribute("src", "./assets/icons/pause.svg")
    } else {
        audio.pause()
        musicslider.value = audio.currentTime
        i = playList.music.length - 1
        musicList.value = i
        musicTitle.innerHTML = playList.music[i]
        audio.setAttribute("src", playList.path[i])
        audio.play()
        play.setAttribute("src", "./assets/icons/pause.svg")
    }
}
skipback.addEventListener("click", backSong)

//AutoNext
let autoNext = function () {
    if (audio.currentTime == audio.duration) {
        nextSong()
    }
}

//Check if repeat is on/off
let autoNextCheck = function () {
    if (audio.loop != true) {
        autoNext()
    }
}

//Repeat/AutoNext Trigger
repeat.addEventListener("click", function () {
    if (repeat.style.opacity == 0.3) {
        repeat.style.opacity = 1
        audio.loop = true
    } else {
        repeat.style.opacity = 0.3
        audio.loop = false
    }
})