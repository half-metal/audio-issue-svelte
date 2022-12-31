<script>
    // @ts-nocheck
    
        // These values are bound to properties of the video
        let time = 0;
        let duration;
        let paused = true;
        let url = 'https://download.pariyatti.org/free/_moIbLs95/Dana_The_Practice_of_Giving_single.mp3'
        //let url = 'http://localhost:5173/fileAudio?fileName=combust.mp3&fileFolderPath=audio'
        //let url = 'http://localhost:5173/fileAudio?fileName=clip.mp3&fileFolderPath=audio'
        //const blobUrl = URL.createObjectURL();
        let showControls = true;
        let showControlsTimeout;
        let audioFile
        import {IconHeart, IconPlay, IconPause, IconBackward, IconForward, IconAudio} from '$lib/assets/player/AudioPlayerIcons.js';
        import AudioFile from '$lib/components/AudioFile.svelte';
    
    
        // Used to track time of last mouse down event
        let lastMouseDown;
    
        function handleMove(e) {
            // Make the controls visible, but fade out after
            // 2.5 seconds of inactivity
            clearTimeout(showControlsTimeout);
            showControlsTimeout = setTimeout(() => showControls = false, 2500);
            showControls = true;
    
            if (!duration) return; // video not loaded yet
            if (e.type !== 'touchmove' && !(e.buttons & 1)) return; // mouse not down
    
            const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
            //console.log('audioFile.canplay()',audioFile.canplay());
            //audioFile.canplay()
            const { left, right } = this.getBoundingClientRect();
            time = duration * (clientX - left) / (right - left);
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
        console.log();
    </script>
    
    <h1>Caminandes: Llamigos</h1>
    <p>From <a href="https://studio.blender.org/films">Blender Studio</a>. CC-BY</p>
    
    <div>
        <audio
            src={url}
            type="audio/mpeg"
            bind:duration
            bind:paused
            bind:this={audioFile}
            bind:currentTime={time}
    
            >
            <!-- <track kind="captions"> -->
            </audio>
            
    
        <div class="controls" style="opacity: {duration && showControls ? 1 : 0}">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <progress value="{(time / duration) || 0}"
            on:touchmove|preventDefault={handleMove}
            on:mousemove={handleMove}
            on:mousedown={handleMousedown}
            on:mouseup={handleMouseup}
            />
    
            <!-- <input type="range" 
            value="{(time / duration) || 0}"
            class="range range-primary" 
            on:touchmove|preventDefault={handleMove}
            on:mousemove={handleMove}
            on:mousedown={handleMousedown}
            on:mouseup={handleMouseup}
            
            
            /> -->
    
            <div class="info">
                <span class="time">{format(time)}</span>
                <span>click anywhere to {paused ? 'play' : 'pause'} / drag to seek</span>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="bg-secondary w-screen"
                on:click={() => audioFile.play()}
                on:touchmove={handleMove}
                on:mousemove={handleMove}
                on:mousedown={handleMousedown}
                on:mouseup={handleMouseup}
                >
                    {@html IconPlay}
                </div>
                <span class="time">{format(duration)}</span>
            </div>
        </div>
    </div>
    
    <style>
        div {
            position: relative;
        }
    
        .controls {
            position: absolute;
            top: 0;
            width: 100%;
            transition: opacity 1s;
        }
    
        .info {
            display: flex;
            width: 100%;
            justify-content: space-between;
        }
    
        span {
            padding: 0.2em 0.5em;
            color: white;
            text-shadow: 0 0 8px black;
            font-size: 1.4em;
            opacity: 0.7;
        }
    
        .time {
            width: 3em;
        }
    
        .time:last-child { text-align: right }
    
        progress {
            display: block;
            width: 100%;
            height: 10px;
            -webkit-appearance: none;
            appearance: none;
        }
    
        progress::-webkit-progress-bar {
            background-color: rgba(0,0,0,0.2);
        }
    
        progress::-webkit-progress-value {
            background-color: rgba(255,255,255,0.6);
        }
    
 
    </style>