import { useState, useRef } from "react";
import { Container, VStack, Text, IconButton, HStack, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box } from "@chakra-ui/react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

const songs = [
  { title: "Song 1", src: "GPTENG:get_audio('song 1')" },
  { title: "Song 2", src: "GPTENG:get_audio('song 2')" },
  { title: "Song 3", src: "GPTENG:get_audio('song 3')" },
];

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(false);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    setIsPlaying(false);
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setProgress((currentTime / duration) * 100);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">{songs[currentSongIndex].title}</Text>
        <audio ref={audioRef} src={songs[currentSongIndex].src} onTimeUpdate={handleTimeUpdate} onEnded={handleNext} />
        <HStack spacing={4}>
          <IconButton aria-label="Previous" icon={<FaBackward />} onClick={handlePrev} />
          <IconButton aria-label="Play/Pause" icon={isPlaying ? <FaPause /> : <FaPlay />} onClick={togglePlayPause} />
          <IconButton aria-label="Next" icon={<FaForward />} onClick={handleNext} />
        </HStack>
        <Box width="100%">
          <Slider value={progress} onChange={(val) => (audioRef.current.currentTime = (val / 100) * audioRef.current.duration)}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
