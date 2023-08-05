import { useState } from 'react';
import styled from 'styled-components';
const Image = styled.img`
  max-width: 100%;
  max-height: 60px;
`;

const BigImage = styled.img`
  max-width: 100%;
  height: 350px;
`;

const BigImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const ImagesWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;
`;

const ImageButton = styled.div<any>`
  border: 2px solid #ccc;
  border-radius: 5px;
  height: 60px;
  padding: 3px;
  margin-top: 10px;
  width: 60px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  ${(props) =>
    props.active
      ? `
    border-color: #ccc;
  `
      : `
      border-color: transparent;
      `}
`;

export default function ProductImages({ images }: { images: string[] }) {
  const [currrentImage, setCurrentImage] = useState<string>(images?.[0]);

  return (
    <>
      <BigImageWrapper>
        <BigImage
          alt={currrentImage}
          style={{ maxWidth: '100%' }}
          src={currrentImage}
        />
      </BigImageWrapper>
      <ImagesWrapper>
        {images.map((image) => (
          <ImageButton
            key={image}
            active={currrentImage === image}
            onClick={() => setCurrentImage(image)}
          >
            <Image src={image} />
          </ImageButton>
        ))}
      </ImagesWrapper>
    </>
  );
}
