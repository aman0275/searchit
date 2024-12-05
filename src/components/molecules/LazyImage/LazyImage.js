import React, { useState, useEffect } from 'react';
import './LazyImage.css';

const LazyImage = ({ src, alt, placeholder }) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState();

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (imageRef && imageSrc === placeholder) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
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
    }
    return () => {
      didCancel = true;
      if (observer && imageRef) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageSrc, placeholder, imageRef]);

  return (
    <div className="lazy-image-container" ref={setImageRef}>
      <img
        src={imageSrc}
        alt={alt}
        className={`lazy-image ${imageSrc === placeholder ? 'loading' : 'loaded'}`}
      />
    </div>
  );
};

export default LazyImage; 