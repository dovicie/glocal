import SearchCardDetail from "@/components/search/SearchCardDetail";
import { Card, Group, Image, Title } from "@mantine/core";
import { IconStarFilled } from "@tabler/icons-react";
import NextImage from "next/image";

type SearchCardProps = {
  photo?: {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  };
  place: string;
  placeId: string;
  placeTypes: string[];
  rating: number;
  ratingTotal: number;
};

/** photoReferenceから検索結果の写真を取得する */
const getPhotoUrl = (photoReference?: string) => {
  if (photoReference === undefined) {
    return null;
  }
  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=560&photoreference=${photoReference}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  return url;
};

const SearchCard = ({
  photo,
  place,
  rating,
  ratingTotal,
  placeId,
}: SearchCardProps) => {
  return (
    <Card padding="xs" withBorder className="flex flex-col gap-y-3">
      <div className="relative aspect-video">
        <Image
          component={NextImage}
          fill
          sizes="(max-width: 768px) 100vw"
          src={getPhotoUrl(photo?.photo_reference)}
          alt=""
          fallbackSrc="/no-image.jpg"
          radius="sm"
        />
      </div>

      <div>
        <Group>
          <span className="font-bold">
            <span className="mr-1 text-xl text-pink-600">{ratingTotal}</span>件
          </span>
          <span className="flex items-center gap-x-0.5 text-xs">
            <IconStarFilled size={12} className="fill-amber-400" />
            {rating}
          </span>
        </Group>
        <Title order={2}>{place}</Title>
      </div>

      <SearchCardDetail placeId={placeId} />
    </Card>
  );
};
export default SearchCard;
