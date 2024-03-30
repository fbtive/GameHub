import { Image, ImageProps } from "@chakra-ui/react";
import meh from "../assets/meh.png";
import smile from "../assets/smile.png";
import wink from "../assets/wink.png";

interface Props {
    rating: number;
}

const Emoji = ({ rating }: Props) => {
    if (rating < 3) return null;

    const emojiMap: { [key: string]: ImageProps } = {
        3: { src: meh, alt: "meh" },
        4: { src: wink, alt: "good" },
        5: { src: smile, alt: "recommended" },
    };

    return <Image {...emojiMap[rating]} marginTop={1} boxSize="32px" />;
};

export default Emoji;
