import { useState } from 'react';
import styled from 'styled-components';
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const BigImage = styled.img`
  max-width: 100%;
  height: 300px;
`;

const BigImageWrapper = styled.div`
  text-align: center;
`;

const ImagesWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const ImageButton = styled.div<any>`
  border: 2px solid #ccc;
  border-radius: 5px;
  height: 40px;
  padding: 3px;
  margin-top: 10px;
  cursor: pointer;
  ${(props) =>
    props.active
      ? `
    border-color: #ccc;
  `
      : `
      border-color: transparent;
      opacity: .5;
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
