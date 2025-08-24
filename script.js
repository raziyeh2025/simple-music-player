const audio = document.getElementById("music1");
const btnPlay = document.getElementById("play");
const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");
const progress = document.getElementById("progress-bar");
const spanCurrentTime = document.getElementById("current-time");
const spanDuration = document.getElementById("duration");
const ul = document.getElementById("ul-list");
const btnRepeat = document.getElementById("span-repeat");
const btnFile = document.getElementById("span-file");
var isPlaying = false;
var isRepeat = true;
btnRepeat.addEventListener("click", () => {
  isRepeat = !isRepeat;
  if (!isRepeat) btnRepeat.textContent = "⇄";
  else btnRepeat.textContent = "↳↰";
});
var songs = [
  {
    title: "Heaven",
    artist: "Bryan Adams",
    src: "music/Bryan Adams - Heaven.mp3",
    duration: "04:04",
  },
  {
    title: "Every thing I do",
    artist: "Bryan Adams",
    src: "music/Bryan Adams - Everything I Do I Do It For You.mp3",
    duration: "06:33",
  },
  {
    title: "Please forgive me",
    artist: "Bryan Adams",
    src: "music/Bryan Adams - Please Forgive Me.mp3",
    duration: "05:53",
  },
];

var song_indx = 0;
var currentLi = [];

songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.innerHTML = `♬<span >${song.title}</span>
          <span>${song.artist}</span>
        <span>${song.duration}</span>`;
  li.classList.add("track");
  li.addEventListener("click", () => {
    audio.src = songs[index].src;
    song_indx = index;
    audio.play();
    isPlaying = true;
    btnPlay.textContent = "⏸";
    currentLi.forEach((element) => {
      element.style.background = null;
      element.classList.remove("playing");
    });

    currentLi[song_indx].classList.add("playing");
  });
  ul.appendChild(li);
});
audio.src = songs[song_indx].src;
currentLi = document.querySelectorAll(".track");

btnPlay.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    btnPlay.textContent = " ▶";
  } else {
    audio.play();
    currentLi[song_indx].classList.add("playing");
    btnPlay.textContent = "⏸";
  }
  isPlaying = !isPlaying;
});
btnNext.addEventListener("click", () => {
  song_indx++;
  if (song_indx == songs.length) song_indx = 0;
  audio.src = songs[song_indx].src;
  if (isPlaying) 
    audio.play();
    currentLi.forEach((element) => {
      element.style.background = null;
      element.classList.remove("playing");
    });
    currentLi[song_indx].classList.add("playing");
  
});
btnPrev.addEventListener("click", () => {
  song_indx--;
  if (song_indx == -1) 
    song_indx = songs.length - 1;

  audio.src = songs[song_indx].src;
  if (isPlaying) 
    audio.play();
    currentLi.forEach((element) => {
      element.style.background = null;
      element.classList.remove("playing");
    });
    currentLi[song_indx].classList.add("playing");
  
});
const formatter = new Intl.NumberFormat("en-US", {
  minimumIntegerDigits: 2,
  useGrouping: false, // Set to false to prevent comma separators for larger numbers
});
setInterval(() => {
  try {
    progress.value = (audio.currentTime * 100) / audio.duration;
    var time = Math.trunc(audio.duration);
    spanDuration.textContent =
      formatter.format(Math.trunc(time / 60)) +
      ":" +
      formatter.format(time % 60);
    spanCurrentTime.textContent =
      formatter.format(Math.trunc(audio.currentTime / 60)) +
      ":" +
      formatter.format(Math.trunc(audio.currentTime % 60));
  } catch (error) {}
}, 100);
audio.addEventListener("ended", () => {
  if (song_indx == songs.length - 1 && !isRepeat) return;
  btnNext.click();
});
progress.addEventListener("click", (e) => {
  var percent = e.offsetX / progress.clientWidth;
  audio.currentTime = percent * audio.duration;
});
