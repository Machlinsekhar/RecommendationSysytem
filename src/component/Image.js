import React, { useState, useEffect } from 'react';

const Image = ({ place, filename, className }) => {
  const [imageUrl, setImageUrl] = useState(null);

  place = place.replace(/[^a-zA-Z0-9\s]/g, '');

  useEffect(() => {
    const fetchImage = async () => {
      let imageSrc = null;
      try {
        const response = await fetch(`http://localhost:5000/uploads/${place}/${filename}`);
        if (response.ok) {
          const blob = await response.blob();
          imageSrc = URL.createObjectURL(blob);
        } else {
          console.error('Failed to fetch image, using default.');
          imageSrc = `/default-restaurant.png`; // Default image URL
        }
      } catch (error) {
        console.error('Error fetching image:', error);
        imageSrc = `/default-restaurant.png`; // Default image URL
      }
      setImageUrl(imageSrc);
    };

    fetchImage();

    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [place, filename]);

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} className={className} alt="Uploaded or Default Image" />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default Image;
