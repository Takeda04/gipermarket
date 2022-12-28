import React, { useRef, useState } from 'react';

interface ZoomProps {
  height: number;
  width: number | string;
  transitionTime: number;
  img: string;
  zoomScale: number;
  transform?:boolean;
  // img height large
}

const Zoom: React.FC<ZoomProps> = ({
  height,
  img,
  transitionTime,
  width,
  zoomScale,
}) => {
  const [state, setState] = useState<{
    zoom: boolean;
    mouseX: number | null;
    mouseY: number | null;
    transform:boolean;
  }>({
    zoom: false,
    mouseX: null,
    mouseY: null,
    transform:false
  });
  const imageRef = useRef<HTMLDivElement>(null);
  const outerDivStyle = {
    height: `${height}px`,
    width: typeof width === "number" ? `${width}px` : width,
    overflow: 'hidden',
  };

  const innerDivStyle = {
    height: `${height}px`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    // padding:'20px',
    transition: `transform ${transitionTime}s ease-out`,
    backgroundImage: `url('${img}')`,
  };

  const handleMouseOver = () => {
    setState((oldState) => ({ ...oldState, zoom: true ,transform:true}));
  };

  const handleMouseOut = () => {
    setState((oldState) => ({ ...oldState, zoom: false ,transform:false}));
  };

  const handleMouseMovement = (e: React.MouseEvent<HTMLDivElement>) => {
    // @ts-expect-error
    let { left: offsetLeft, top: offsetTop } =
      imageRef.current?.getBoundingClientRect();

    // @ts-expect-error
    let { height, width } = imageRef.current?.style;

    const x = ((e.pageX - offsetLeft) / parseInt(width, 10)) * 100;
    const y = ((e.pageY - offsetTop) / parseInt(height, 10)) * 100;

    setState((oldState) => ({
      ...oldState,
      mouseX: x,
      mouseY: y,
    }));
  };

  const { mouseX, mouseY, zoom } = state;

  const transform = {
    transformOrigin: `${mouseX}% ${mouseY}%`,
  };

  return (
    <div
      style={outerDivStyle}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onMouseMove={handleMouseMovement}
      ref={imageRef}
    >
      <div
        style={{
          ...transform,
          ...innerDivStyle,
          transform: zoom ? `scale(${zoomScale}) translate(0,15%)` : 'scale(1.0)',
          willChange: 'transform',
        }}
      />
    </div>
  );
};

export default Zoom;
