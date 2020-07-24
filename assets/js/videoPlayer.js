const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const videoPlayBtn = document.getElementById("jsVideoPlayBtn");
const videoVolumeBtn = document.getElementById("jsVideoVolumeBtn");
const fullScreenBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volume = document.getElementById("jsVolume");

const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, {
    method: "POST",
  });
};

const handleVolumeBtn = () => {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    videoVolumeBtn.innerHTML = "<i class='fas fa-volume-up'></i>";
    volume.value = videoPlayer.volume;
  } else {
    videoPlayer.muted = true;
    videoVolumeBtn.innerHTML = "<i class='fas fa-volume-mute'></i>";
    volume.value = 0;
  }
};
function handlePlayBtn() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    videoPlayBtn.innerHTML = "<i class='fas fa-pause'></i>";
  } else {
    videoPlayer.pause();
    videoPlayBtn.innerHTML = "<i class='fas fa-play'></i>";
  }
}
const handleVideoPlay = () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
    videoPlayBtn.innerHTML = "<i class='fas fa-pause'></i>";
  } else {
    videoPlayer.pause();
    videoPlayBtn.innerHTML = "<i class='fas fa-play'></i>";
  }
};

const exitFullScreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScreenBtn.addEventListener("click", goFullScreen);
};
const goFullScreen = () => {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
  fullScreenBtn.innerHTML = "<i class='fas fa-compress'></i>";
  fullScreenBtn.removeEventListener("click", goFullScreen);
  fullScreenBtn.addEventListener("click", exitFullScreen);
};
const formatDate = (seconds) => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
}

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
}
const handleEnded = () => {
  registerView();
  videoPlayer.currentTime = 0;
  videoPlayBtn.innerHTML = "<i class='fas fa-play'></i>";
};
const handleVolume = (event) => {
  const {
    target: { value },
  } = event;
  videoPlayer.volume = value;
  if (value >= 0.6) {
    videoVolumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.2) {
    videoVolumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else {
    videoVolumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  }
};
function init() {
  videoPlayer.addEventListener("click", handleVideoPlay);
  videoPlayBtn.addEventListener("click", handlePlayBtn);
  videoVolumeBtn.addEventListener("click", handleVolumeBtn);
  fullScreenBtn.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volume.addEventListener("input", handleVolume);
}
if (videoContainer) {
  init();
}
