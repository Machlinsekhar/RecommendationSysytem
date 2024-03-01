import React, { useState, useEffect } from 'react';

const Image = ({ place, filename }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`http://localhost:5000/uploads/${place}/${filename}`);
        console.log(response)
        if (response.ok) {
          const blob = await response.blob();
          console.log(blob)
          setImageUrl(URL.createObjectURL(blob));
        } else {
          console.error('Failed to fetch image');
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();

    return () => URL.revokeObjectURL(imageUrl);
  }, [place, filename]);

  return (
    <div>
      {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
    </div>
  );
};

export default Image;
