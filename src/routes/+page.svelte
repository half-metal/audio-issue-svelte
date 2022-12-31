
<script>
    // @ts-nocheck
    
        import {IconHeart, IconPlay, IconPause, IconBackward, IconForward, IconAudio} from '$lib/assets/player/AudioPlayerIcons.js';
        let url = 'https://download.pariyatti.org/free/_moIbLs95/Dana_The_Practice_of_Giving_single.mp3'
        let audioFile
        let time


    
    const playButton = async() => {
        console.log('button clicked');
        await audioFile.play()
        console.log('audioFile.currentTime after play',audioFile.currentTime);
        console.log('time after play',time);
    
    }
    const setTimeButton = () => {
        console.log('button clicked');
        audioFile.currentTime = 30
        console.log('time after setting',time);
    
    }
    </script>
    
    <audio src={url}
    
    bind:currentTime={time}
    bind:this={audioFile}>
    </audio>
    <div>
        <button on:click={playButton}>
            Play Button
        </button>
        <button on:click={setTimeButton}>
            Set Time
        </button>
    </div>
    
    