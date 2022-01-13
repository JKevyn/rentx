import React, { useRef } from 'react'
import { FlatList, ViewToken } from 'react-native';

import {
    Container,
    ImageIndexes,
    ImageIndex,
    CarImageWrapper,
    CarImage,
} from './styles';

interface Props {
    imagesUrl: string[];
}

interface ChangeImageProps {
    viewableItems: ViewToken[];
    changed: ViewToken[];
};

export function ImageSlider({ imagesUrl }: Props) {
    const [imageIndex, setImageIndex] = React.useState(0);
    const indexChange = useRef((info: ChangeImageProps) => {
        const index = info.viewableItems[0].index!;
        setImageIndex(index);
    })

    return (
        <Container>
            <ImageIndexes>
                {imagesUrl.map((_, index) => (
                    <ImageIndex
                        key={String(index)}
                        active={index === imageIndex} 
                    />
                ))
                }
            </ImageIndexes>

            <FlatList
                data={imagesUrl}
                keyExtractor={key => key}
                horizontal
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={indexChange.current}
                renderItem={({ item }) => (
                    <CarImageWrapper>
                        <CarImage
                            source={{ uri: item }}
                            resizeMode="contain"
                        />
                    </CarImageWrapper>
                )}
            />
        </Container>
    );
}