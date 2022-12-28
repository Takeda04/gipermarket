import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import lod from 'assets/loder.gif';

interface LazyImageProps {
  src: string;
  alt?: string;
  onMouseEnter?: (e: React.MouseEvent<HTMLImageElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLImageElement>) => void;
  onMouseMove?: (e: React.MouseEvent<HTMLImageElement>) => void;
}

const placeHolder = lod.src;

const Image = styled.img`
  display: block;
  height: 100px;
  width: 100px;
  @keyframes loaded {
    0% {
      opacity: 0.1;
    }
    100% {
      opacity: 1;
    }
  }
  &.loaded:not(.has-error) {
    animation: loaded 300ms ease-in-out;
  }
  &.has-error {
    content: url(${placeHolder});
  }
`;

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
}) => {
  const [imageSrc, setImageSrc] = useState(placeHolder);
  const [imageRef, setImageRef] = useState<any>();

  const onLoad = (event: any) => {
    event.target.classList.add('loaded');
  };

  const onError = (event: any) => {
    event.target.classList.add('has-error');
  };

  useEffect(() => {
    let observer: any;
    let didCancel = false;

    if (imageRef && imageSrc !== src) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setImageSrc(src);
                observer.unobserve(imageRef);
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: '75%',
          }
        );
        observer.observe(imageRef);
      } else {
        setImageSrc(src);
      }
    }
    return () => {
      didCancel = true;
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageSrc, imageRef]);
  return (
    <Image
      ref={setImageRef}
      src={imageSrc}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      alt={alt}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

export default LazyImage;
