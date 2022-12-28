const ImageMagnifier = ({
  src,
  magnifierHeight = 100,
  magnifieWidth = 100,
  zoomLevel = 1.5,
  sizes: { imgHeight, imgWidth },
  coordinates: { x, y },
}: {
  src: string;
  sizes: { imgWidth: number; imgHeight: number };
  coordinates: { x: number; y: number };
  magnifierHeight?: number;
  magnifieWidth?: number;
  zoomLevel?: number;
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        height: `${magnifierHeight}px`,
        width: `${magnifieWidth}px`,
        top: `${y  - magnifierHeight / 2 + 270}px`,
        left: `${x  - magnifieWidth / 2 + 120}px`,
        borderRadius: '6px',
        opacity: '1',
        border: '1px solid lightgray',
        backgroundColor: 'white',
        backgroundImage: `url('${src}')`,
        backgroundRepeat: 'no-repeat',

        backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,

        backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
        backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
      }}
    />
  );
};

export default ImageMagnifier;
