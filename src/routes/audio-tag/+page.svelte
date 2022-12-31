
<script>
// @ts-nocheck
/**
 * @route
 * URL from any site typically runs fine,
 * but URL returned in response by Svelte plays, 
 * but unable to determine duration of file or seek when not fully download
*/

    import {IconHeart, IconPlay, IconPause, IconBackward, IconForward, IconAudio} from '$lib/assets/player/AudioPlayerIcons.js';
    //let url = 'https://download.pariyatti.org/free/_moIbLs95/Dana_The_Practice_of_Giving_single.mp3'
    let url = 'http://localhost:5173/fileAudio?fileName=enchanted-svelte.mp3&fileFolderPath=audio'

    //let url = 'http://localhost:5173/fileAudio?fileName=clip.mp3&fileFolderPath=audio'
   // let url = 'http://localhost:5173/fileAudio?fileName=clip.mp3&fileFolderPath=audio'
    let audioFile
    let time = 0
    let duration
    let showControls = true;
	let showControlsTimeout;
    let paused = true;

const playButton = async() => {
    console.log('button clicked');
    audioFile.play()
    console.log('audioFile.currentTime after play',audioFile.currentTime);
    console.log('time after play',time);

}
const setTimeButton = () => {
    console.log('button clicked');
    audioFile.currentTime = 120
    console.log('time after setting',time);

}


///////////////
	// Used to track time of last mouse down event
	let lastMouseDown;

	function handleMove(e) {
		// Make the controls visible, but fade out after
		// 2.5 seconds of inactivity

		clearTimeout(showControlsTimeout);
		showControlsTimeout = setTimeout(() => showControls = false, 2500);
		showControls = true;

		if (!duration) return; // video not loaded yet
		if (audioFile.type !== 'touchmove' && !(audioFile.buttons & 1)) return; // mouse not down

		const clientX = audioFile.type === 'touchmove' ? audioFile.touches[0].clientX : audioFile.clientX;
        //consolaudioFile.log('audioFile.canplay()',audioFile.canplay());
        //audioFile.canplay()
		const { left, right } = this.getBoundingClientRect();
		time = duration * (clientX - left) / (right - left);
        console.log('time in handleMove', time)
        audioFile.currentTime = time

        //audioFile.fastSeek(time)
	}

	// we can't rely on the built-in click event, because it fires
	// after a drag — we have to listen for clicks ourselves
	function handleMousedown(e) {
		lastMouseDown = new Date();
	}

	function handleMouseup(e) {
		if (new Date() - lastMouseDown < 400) {
			if (paused) audioFile.play();
			else audioFile.pause();
		}
	}

	function format(seconds) {
		if (isNaN(seconds)) return '...';

		const minutes = Math.floor(seconds / 60);
		seconds = Math.floor(seconds % 60);
		if (seconds < 10) seconds = '0' + seconds;

		return `${minutes}:${seconds}`;
	}
</script>

<audio src={url}
bind:paused
bind:duration
bind:currentTime={time}
bind:this={audioFile}>
</audio>

<div class="controls" style="opacity: {duration && showControls ? 1 : 0}">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <progress value="{(time / duration) || 0}"
    on:touchmove|preventDefault={handleMove}
    on:mousemove={handleMove}
    on:mousedown={handleMousedown}
    on:mouseup={handleMouseup}
    />
   </div>
   <div class="info">
    <span class="time">{format(time)}</span>
    <span>click anywhere to {paused ? 'play' : 'pause'} / drag to seek</span>
    <span class="time">{format(duration)}</span>
</div>

<div>
    <button on:click={playButton}>
        Play Button
    </button>
    <button on:click={setTimeButton}>
        Set Time
    </button>
</div>
{time}
<br>

{duration}

<!-- {#if audioFile.duration}
    {audioFile.duration}
{/if} -->


<style>
    	progress {
		display: block;
		width: 100%;
		height: 10px;
		-webkit-appearance: none;
		appearance: none;
	}

	progress::-webkit-progress-bar {
		background-color: yellow
	}

	progress::-webkit-progress-value {
		background-color: green
	}
</style>