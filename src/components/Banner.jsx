import React, { useState } from 'react';
import styled from 'styled-components';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import CyberButton from './CyberButton';

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const StyledIframe = styled.iframe`
  position: absolute;
  top: -30%;
  left: -30%;
  width: 160%;
  height: 160%;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
`;

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background-image: linear-gradient(transparent, rgba(35, 81, 112, 0.8));
`;

const Banner = () => {
  const [mute, setMute] = useState(true);
  const videoRef = React.createRef();

  const toggleMute = () => {
    if (mute) {
      videoRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'unMute' }),
        '*'
      );
    } else {
      videoRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'mute' }),
        '*'
      );
    }
    setMute(!mute);
  };

  return (
    <BannerContainer>
      <StyledIframe
        ref={videoRef}
        src="https://www.youtube.com/embed/2CDMfmiXZss?autoplay=1&controls=0&mute=1&showinfo=0&rel=0&loop=1&modestbranding=1&playlist=2CDMfmiXZss&enablejsapi=1"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      />
      <VideoOverlay />
      <GradientOverlay />
      <ButtonContainer>
        <Button onClick={toggleMute}>
          {mute ? <VolumeOffIcon color='error' /> : <VolumeUpIcon color='error'/>}
        </Button>
        <CyberButton/>
      </ButtonContainer>
    </BannerContainer>
  );
};

export default Banner;
