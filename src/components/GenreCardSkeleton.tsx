import {
    Card,
    CardBody,
    HStack,
    SkeletonCircle,
    SkeletonText,
} from "@chakra-ui/react";

const GenreCardSkeleton = () => {
    return (
        <Card>
            <CardBody padding="4px">
                <HStack>
                    <SkeletonCircle boxSize="32px" />
                    <SkeletonText skeletonHeight={2} noOfLines={1} flex={1} />
                </HStack>
            </CardBody>
        </Card>
    );
};

export default GenreCardSkeleton;
