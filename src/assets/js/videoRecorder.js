const recorderContainer = document.getElementById("jsRecorderContainer");
const recorderBtn = document.getElementById("jsRecorderBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;
const handleVideoData = () => {
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
};

const stopRecording = () => {
  videoRecorder.stop();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  recorderBtn.innerHTML = "Start recording";
  recorderBtn.removeEventListener("click", stopRecording);
  recorderBtn.addEventListener("click", getVideo);
};
const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  recorderBtn.removeEventListener("click", getVideo);
  recorderBtn.addEventListener("click", stopRecording);
};
const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 1280, height: 720 },
      audio: true,
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    recorderBtn.innerHTML = "Stop recording";
    streamObject = stream;
    startRecording();
  } catch (error) {
    recorderBtn.innerHTML = "Can't record";
  } finally {
    recorderBtn.removeEventListener("click", getVideo);
  }
};

const init = () => {
  recorderBtn.addEventListener("click", getVideo);
};

if (recorderContainer) {
  init();
}
