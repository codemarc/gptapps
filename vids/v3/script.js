document.getElementById('videoInput').addEventListener('change', function (e) {
  const file = e.target.files[0]
  const video = document.getElementById('videoPlayer')
  const url = URL.createObjectURL(file)
  video.src = url
})


document.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('videoPlayer')
  video.src = './MyPod-VEED.mp4'
  const fileInput = document.getElementById('videoInput')
  fileInput.style.display = 'none'

  video.play()
  video.pl

})