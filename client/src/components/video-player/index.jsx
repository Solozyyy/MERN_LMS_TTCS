
import { Maximize, Minimize, Pause, Play, RotateCcw, RotateCw, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";

function VideoPlayer({ width = "100%", height = "100%", url }) {

    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [muted, setMuted] = useState(false);
    const [played, setPlayed] = useState(0);
    const [seeking, setSeeking] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showControls, setShowControrls] = useState(true);

    const playerRef = useRef(null);
    const playerContainerRef = useRef(null);
    const controlIsTimeoutRef = useRef(null);

    function handlePlayAndPause() {
        setPlaying(!playing);
    }

    function handleProgress(state) {
        if (!seeking) {
            setPlayed(state.played);
        }
    }

    function handleRewind() {
        playerRef?.current?.seekTo(playerRef?.current?.getCurrentTime() - 5);
    }

    function handleForward() {
        playerRef?.current?.seekTo(playerRef?.current?.getCurrentTime() + 5);
    }

    function handleToggleMute() {
        setMuted(!muted);
    }

    function handleSeekChange(newValue) {
        setPlayed(newValue[0]);
        setSeeking(true);
    }

    function handleSeekMouseUp() {
        setSeeking(false);
        playerRref.current?.seekTo(played)
    }

    function handleVolumeChange(newValue) {
        setVolume(newValue[0]);
    }

    function pad(string) {
        return ("0" + string).slice(-2);
    }

    function formatTime(seconds) {
        const date = new Date(seconds * 1000);
        const hh = date.getUTCHours();
        const mm = date.getUTCMinutes();
        const ss = pad(date.getUTCSeconds());

        if (hh) {
            return `${hh}:${pad(mm)}:${ss}`;
        }

        return `${mm}:${ss}`;
    }

    const handleFullScreen = useCallback(() => {
        if (!isFullScreen) {
            if (playerContainerRef?.current.requestFullscreen) {
                playerContainerRef?.current?.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }, [isFullScreen]);

    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handleFullScreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullScreenChange);
        };
    });

    function handleMouseMove() {
        setShowControrls(true);
        clearTimeout(controlIsTimeoutRef.current);
        controlIsTimeoutRef.current = setTimeout(() => setShowControrls(false), 3000);
    }

    return (
        <div ref={playerContainerRef}
            className={`relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ease-in-out
                ${isFullScreen ? "w-screen h-screen" : ""}
                `}

            style={{ width, height }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setShowControrls(false)}
        >

            <ReactPlayer
                ref={playerRef}
                className="absoslute top-0 left-0"
                width="100%"
                height="100%"
                url={url}
                playing={playing}
                volume={volume}
                muted={muted}
                onProgress={handleProgress}
                controls={false}
            />
            {
                showControls && <div className={`absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 p-4 transition-opacity duration-300 
                    ${showControls ? "opacity-100" : "opacity-0"}`
                }>
                    <Slider
                        value={[played * 100]}
                        max={100}
                        step={0.1}
                        onValueChange={(value) => handleSeekChange([value[0] / 100])}
                        onValueCommit={handleSeekMouseUp}
                        className="w-full mb-4"
                    />
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handlePlayAndPause}
                                className="text-white bg-transparent hover:text-white hover:bg-gray-700"
                            >
                                {
                                    playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />
                                }
                            </Button>
                            <Button onClick={handleRewind}
                                variant="ghost"
                                size="icon"
                                className="text-white bg-transparent hover:text-white hover:bg-gray-700"
                            >
                                <RotateCcw className="h-6 w-6" />
                            </Button>
                            <Button onClick={handleForward}
                                variant="ghost"
                                size="icon"
                                className="text-white bg-transparent hover:text-white hover:bg-gray-700"
                            >
                                <RotateCw className="h-6 w-6" />
                            </Button>
                            <Button onClick={handleToggleMute}
                                variant="ghost"
                                size="icon"
                                className="text-white bg-transparent hover:text-white hover:bg-gray-700"
                            >
                                {
                                    muted ?
                                        (<VolumeX className="h-6 w-6" />)
                                        :
                                        (<Volume2 className="h-6 w-6" />)
                                }
                            </Button>
                            <Slider
                                value={[volume * 100]}
                                max={100}
                                step={1}
                                onValueChange={(value) => handleVolumeChange([value[0] / 100])}
                                className="w-24 "
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="text-white">
                                {formatTime(played * (playerRef?.current?.getDuration() || 0))}
                                / {" "}
                                {formatTime(playerRef?.current?.getDuration() || 0)}
                            </div>
                            <Button onClick={handleFullScreen}
                                variant="ghost"
                                size="icon"
                                className="text-white bg-transparent hover:text-white hover:bg-gray-700"
                            >
                                {
                                    isFullScreen ? <Minimize className="h-6 w-6" /> : <Maximize className="h-6 w-6" />
                                }
                            </Button>
                        </div>
                    </div>
                </div>
            }
        </div>

    );
}

export default VideoPlayer;