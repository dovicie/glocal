import { PlaceDetailsResponseData } from "@googlemaps/google-maps-services-js";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { Anchor, Avatar, Badge, Group, Image, Text, Title } from "@mantine/core";
import { IconClockFilled, IconMapPinFilled, IconPhoneFilled, IconStarFilled, IconWorld } from "@tabler/icons-react";

const fetchDetail = async (placeId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/placeDetails/${placeId}`);
    const data: PlaceDetailsResponseData = await res.json();
    const result = data.result;
    return result;
  } catch (error) {
    return;
  }
};

type SearchCardModalProps = {
  placeId: string;
};

const images = [
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png",
];

const SearchCardModal = async ({ placeId }: SearchCardModalProps) => {
  const detail = await fetchDetail(placeId);
  if (detail === undefined) {
    return (
      <div className="flex flex-col gap-y-4">
        <Title order={3} size="h4">
          Sorry
        </Title>
        <Text>データの取得に失敗しました。もう一度お試しください。</Text>
        <Text>
          もし問題が解決しない場合は、お手数ですが管理者 (
          <Anchor href="https://twitter.com/dovicie" target="_blank">
            <span className="font-bold">@dovicie</span>
          </Anchor>
          ) までお問い合わせいただけると幸いです。
        </Text>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-3">
      <Carousel withIndicators loop>
        {images.map((url) => (
          <Carousel.Slide key={url}>
            <Image src={url} alt="" />
          </Carousel.Slide>
        ))}
      </Carousel>
      <div>
        <Group>
          <span className="text-sm font-bold">
            <span className="mr-1 text-lg text-pink-600">{detail.user_ratings_total || 0}</span>件
          </span>
          <span className="flex items-center gap-x-0.5 text-xs">
            <IconStarFilled size={12} className="fill-amber-400" />
            {detail.rating || 0}
          </span>
        </Group>
        <Title order={3} size="h4" lineClamp={2}>
          {detail.name || ""}
        </Title>
      </div>
      <ul className="m-0 flex list-none flex-col gap-y-2 p-0">
        {detail.opening_hours && (
          <li className="flex items-center gap-x-3">
            <IconClockFilled size={20} className="fill-primary" />
            {detail.opening_hours.open_now ? (
              <Badge variant="light" color="teal" size="md">
                営業中
              </Badge>
            ) : (
              <Badge variant="light" color="red" size="md">
                営業時間外
              </Badge>
            )}
          </li>
        )}
        {detail.url && (
          <li className="flex items-center gap-x-3">
            <IconMapPinFilled size={20} className="fill-primary" />
            <Anchor
              href={detail.url}
              target="_blank"
              rel="noopener noreferrer"
              c="black"
              underline="always"
              className="flex-1"
            >
              Google Mapで見る
            </Anchor>
          </li>
        )}
        {detail.website && (
          <li className="flex items-center gap-x-3">
            <IconWorld size={20} className="text-primary" />
            <Anchor
              href={detail.website}
              lineClamp={1}
              target="_blank"
              rel="noopener noreferrer"
              c="black"
              underline="always"
              className="flex-1 whitespace-nowrap"
            >
              {detail.website}
            </Anchor>
          </li>
        )}
        {detail.formatted_phone_number && (
          <li className="flex items-center gap-x-3">
            <IconPhoneFilled size={20} className="fill-primary" />
            <Anchor href={`tel:${detail.formatted_phone_number}`} c="black" underline="always" className="flex-1">
              {detail.formatted_phone_number}
            </Anchor>
          </li>
        )}
      </ul>
      {detail.reviews && (
        <ul className="m-0 flex list-none flex-col gap-y-2 p-0 text-xs font-light">
          {detail.reviews.map((review, index) => {
            return (
              <li key={index}>
                <SearchCardDetailReviews
                  comment={review.text}
                  reviewerIconPath={review.profile_photo_url}
                  reviewerName={review.author_name}
                  star={review.rating}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchCardModal;

const SearchCardDetailReviews = ({
  comment,
  reviewerIconPath,
  reviewerName,
  star,
}: {
  comment: string;
  reviewerIconPath: string;
  reviewerName: string;
  star: number;
}) => {
  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex items-center gap-x-2">
        <Avatar src={reviewerIconPath} alt="" size="sm" />
        <span>{reviewerName}</span>
      </div>
      <div className="flex gap-x-2">
        <span>1週間前</span>
        <span className="flex items-center">
          <IconStarFilled size={12} className="fill-amber-400" />
          {star}
        </span>
      </div>
      <Text size="sm">{comment}</Text>
    </div>
  );
};
