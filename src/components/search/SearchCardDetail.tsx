"use client";

import SearchCardDetailReviews from "@/components/search/SearchCardDetailReviews";
import { Anchor, Badge, Button, Collapse, Divider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconMapPinFilled,
  IconClockFilled,
  IconWorld,
  IconPhoneFilled,
} from "@tabler/icons-react";

type SearchCardDetailProps = {
  mapUrl: string;
  phoneNumber: string;
  webSiteUrl: string;
};

const REVIEW = [
  {
    comment:
      "東京タワーは日本の代表的な観光名所であり、私も訪れた際には感動的な経験をしました。まず、タワーの高さと美しさに圧倒されました。展望台からのパノラマビューは絶景で、夜には都市のライトアップが素晴らしく、ロマンチックな雰囲気が漂います。特に、東京の夜景を楽しみたい方にはおすすめです。タワー内には歴史的な要素も多く、展示や案内が興味深いです。タワーの歴史を知りながら上昇すると、より一層価値を感じることができます。また、展示物には日本文化や都市の発展に関する情報もあり、教育的な要素もあります。",
    reviewerIconPath: "/user-icon.JPG",
    reviewerName: "かいけつゾロリ",
    star: 3.8,
  },
  {
    comment:
      "東京タワーは日本の代表的な観光名所であり、私も訪れた際には感動的な経験をしました。まず、タワーの高さと美しさに圧倒されました。展望台からのパノラマビューは絶景で、夜には都市のライトアップが素晴らしく、ロマンチックな雰囲気が漂います。特に、東京の夜景を楽しみたい方にはおすすめです。タワー内には歴史的な要素も多く、展示や案内が興味深いです。タワーの歴史を知りながら上昇すると、より一層価値を感じることができます。また、展示物には日本文化や都市の発展に関する情報もあり、教育的な要素もあります。",
    reviewerIconPath: "/user-icon.JPG",
    reviewerName: "クレヨンしんちゃん",
    star: 4.7,
  },
  {
    comment:
      "東京タワーは日本の代表的な観光名所であり、私も訪れた際には感動的な経験をしました。まず、タワーの高さと美しさに圧倒されました。展望台からのパノラマビューは絶景で、夜には都市のライトアップが素晴らしく、ロマンチックな雰囲気が漂います。特に、東京の夜景を楽しみたい方にはおすすめです。タワー内には歴史的な要素も多く、展示や案内が興味深いです。タワーの歴史を知りながら上昇すると、より一層価値を感じることができます。また、展示物には日本文化や都市の発展に関する情報もあり、教育的な要素もあります。",
    reviewerIconPath: "/user-icon.JPG",
    reviewerName: "それいけアンパンマン",
    star: 3.0,
  },
];

const SearchCardDetail = ({
  mapUrl,
  phoneNumber,
  webSiteUrl,
}: SearchCardDetailProps) => {
  const [opened, { open }] = useDisclosure(false);

  return (
    <div>
      {!opened && (
        <div className="text-center">
          <Button variant="transparent" onClick={open}>
            もっと見る
          </Button>
        </div>
      )}
      <Collapse in={opened}>
        <div className="flex flex-col gap-y-3">
          <Divider />
          <ul className="m-0 flex list-none flex-col gap-y-2 p-0">
            <li className="flex items-center gap-x-3">
              <IconClockFilled size={16} className="fill-primary" />
              <Badge variant="light" color="red">
                営業時間外
              </Badge>
            </li>
            <li className="flex items-center gap-x-3">
              <IconMapPinFilled size={16} className="fill-primary" />
              <Anchor
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                c="black"
                underline="always"
              >
                Google Mapで見る
              </Anchor>
            </li>
            <li className="flex items-center gap-x-3">
              <IconWorld size={16} className="text-primary" />
              <Anchor
                href={webSiteUrl}
                lineClamp={1}
                target="_blank"
                rel="noopener noreferrer"
                c="black"
                underline="always"
              >
                {webSiteUrl}
              </Anchor>
            </li>
            <li className="flex items-center gap-x-3">
              <IconPhoneFilled size={16} className="fill-primary" />
              <Anchor href={`tel:${phoneNumber}`} c="black" underline="always">
                {phoneNumber}
              </Anchor>
            </li>
          </ul>
          <Divider />
          <ul className="m-0 flex list-none flex-col gap-y-2 p-0 text-xs font-light">
            {REVIEW.map((review, index) => {
              return (
                <li key={index}>
                  <SearchCardDetailReviews
                    comment={review.comment}
                    reviewerIconPath={review.reviewerIconPath}
                    reviewerName={review.reviewerName}
                    star={review.star}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </Collapse>
    </div>
  );
};

export default SearchCardDetail;
