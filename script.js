const video = document.querySelector("#video");
const PlayPauseBtn = document.querySelector(".play-pause-btn");
const RewindBtn = document.querySelector(".rewind-btn");
const ForwardBtn = document.querySelector(".forward-btn");
const IncreaseVolume = document.querySelector(".increase-vol");
const volumeBar = document.querySelector("#volume-range");
const videoBar = document.querySelector("#video-bar");
const duration_Time = document.querySelector("#duration-time");
const current_Time = document.querySelector("#current-time");
const fullScreen = document.querySelector(".full-screen");
const speedBtn = document.getElementById("speed-btn");
const speedMenu = document.getElementById("speed-menu");
const volumeCount = document.querySelector(".volume-count");

PlayPauseBtn.addEventListener("click", () => {
	video.paused ? video.play() : video.pause();
	PlayPauseBtn.innerHTML = video.paused
		? `<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width="24"
								height="24"
								fill="rgba(255,252,252,1)">
								<path
									d="M8 18.3915V5.60846L18.2264 12L8 18.3915ZM6 3.80421V20.1957C6 20.9812 6.86395 21.46 7.53 21.0437L20.6432 12.848C21.2699 12.4563 21.2699 11.5436 20.6432 11.152L7.53 2.95621C6.86395 2.53993 6 3.01878 6 3.80421Z"></path>
							</svg>`
		: `<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="24"
							height="24"
							fill="rgba(246,246,246,1)">
							<path d="M6 3H8V21H6V3ZM16 3H18V21H16V3Z"></path>
						</svg>`;
});

volumeBar.addEventListener("input", (e) => {
	video.volume = e.target.value;
	volumeCount.innerHTML = Math.round(e.target.value * 100) + "%";
	volumeCount.style.display = "block";
	setTimeout(() => {
		volumeCount.style.display = "none";
	}, 1000);
});
video.addEventListener("timeupdate", () => {
	videoBar.value = (video.currentTime / video.duration) * 100;

	currentTimeMinute = Math.floor(video.currentTime / 60);
	currentTimeSecond = Math.floor(video.currentTime % 60);

	current_Time.innerHTML = `${
		currentTimeMinute < 10 ? 0 : ""
	}${currentTimeMinute} : ${
		currentTimeSecond < 10 ? 0 : ""
	}${currentTimeSecond}`;

	if (video.currentTime === video.duration) {
		video.currentTime = 0;
		PlayPauseBtn.innerHTML = `<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width="24"
								height="24"
								fill="rgba(255,252,252,1)">
								<path
									d="M8 18.3915V5.60846L18.2264 12L8 18.3915ZM6 3.80421V20.1957C6 20.9812 6.86395 21.46 7.53 21.0437L20.6432 12.848C21.2699 12.4563 21.2699 11.5436 20.6432 11.152L7.53 2.95621C6.86395 2.53993 6 3.01878 6 3.80421Z"></path>
							</svg>`;
	}
});

videoBar.addEventListener("input", (e) => {
	video.currentTime = (e.target.value * Math.floor(video.duration)) / 100;
});

video.addEventListener("loadedmetadata", () => {
	durationMinute = Math.floor(video.duration / 60);
	durationSecond = Math.floor(video.duration % 60);

	duration_Time.innerHTML = `${
		durationMinute < 10 ? 0 : ""
	}${durationMinute} : ${durationSecond < 10 ? 0 : ""}${durationSecond}`;
});

fullScreen.addEventListener("click", () => {
	video.webkitRequestFullscreen();
});

RewindBtn.addEventListener("click", () => {
	rewindTime = video.currentTime - 10;
	video.currentTime = rewindTime;
});
ForwardBtn.addEventListener("click", () => {
	rewindTime = video.currentTime + 10;
	video.currentTime = rewindTime;
});

// Toggle speed menu visibility
speedBtn.addEventListener("click", () => {
	speedMenu.classList.toggle("show");
});

// Set video speed when a speed option is clicked
speedMenu.addEventListener("click", (event) => {
	if (event.target.tagName === "LI") {
		const selectedSpeed = event.target.getAttribute("data-speed");
		video.playbackRate = parseFloat(selectedSpeed);

		// Update button text to reflect selected speed
		speedBtn.textContent = event.target.textContent;

		// Hide the speed menu
		speedMenu.classList.remove("show");
	}
});
