import SearchCard from "@/components/search/SearchCard";
import { SearchParams } from "@/types/common";
import {
  GeocodingResponse,
  PlaceResult,
  PlaceSearchResponse,
} from "@/types/googleMapApi";

/** 地名や施設名から緯度経度取得する（ジオコーディングする） */
const getLatLng = async (address: string) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch geocoding data. Status: ${res.status}`);
    }
    const data: GeocodingResponse = await res.json();

    if (data.results.length === 0) {
      throw new Error("No results found for the provided address.");
    }

    const latLng = {
      lat: data.results[0].geometry.location.lat,
      lng: data.results[0].geometry.location.lng,
    };
    return latLng;
  } catch (error) {
    return;
  }
};

/** 指定条件から場所を検索する */
const searchPlaces = async (
  lat: number,
  lng: number,
  searchParams: SearchParams
) => {
  const fetchPlaces = async (token?: string) => {
    const url = new URL(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    );
    url.searchParams.append("key", process.env.GOOGLE_MAPS_API_KEY as string);
    url.searchParams.append("location", `${lat},${lng}`);
    url.searchParams.append("radius", searchParams.distance.toString());
    url.searchParams.append("language", "ja");
    if (searchParams.keyword) {
      url.searchParams.append("keyword", searchParams.keyword);
    }
    if (searchParams.genre) {
      url.searchParams.append("type", searchParams.genre);
    }
    if (searchParams.isOpen) {
      url.searchParams.append("opennow", "true");
    }

    if (token) {
      url.searchParams.append("pagetoken", token);
    }
    const res = await fetch(url);
    const data: PlaceSearchResponse = await res.json();
    return data;
  };

  try {
    const allPlaces: PlaceResult[] = [];
    const data1 = await fetchPlaces();
    // 最初の20件を追加
    allPlaces.push(...data1.results);
    if (data1.next_page_token) {
      // 2回目のリクエスト
      const data2 = await fetchPlaces(data1.next_page_token);
      allPlaces.push(...data2.results);
      if (data2.next_page_token) {
        // 3回目のリクエスト
        const data3 = await fetchPlaces(data2.next_page_token);
        allPlaces.push(...data3.results);
      }
    }

    return allPlaces.map((place) => ({
      isOpen: place.opening_hours?.open_now,
      photo: place.photos,
      placeId: place.place_id,
      placeName: place.name,
      placeTypes: place.types,
      rating: place.rating,
      ratingsTotal: place.user_ratings_total,
    }));
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in searchPlaces:", error.message);
    } else {
      console.error("Unknown error in searchPlaces");
    }
    throw error;
  }
};

const SearchPage = async ({
  params,
  searchParams,
}: {
  params: { distance: number; place: string };
  searchParams: { genre?: string; isOpen?: boolean; keyword?: string };
}) => {
  const formattedSearchParams: SearchParams = {
    distance: params.distance,
    genre: searchParams.genre ? decodeURIComponent(searchParams.genre) : "",
    isOpen: searchParams.isOpen ? true : false,
    keyword: searchParams.keyword
      ? decodeURIComponent(searchParams.keyword)
      : "",
    place: decodeURIComponent(params.place),
  };

  /** 緯度経度 { lat:緯度 lng:経度 } */
  const latLng = await getLatLng(formattedSearchParams.place);

  if (!latLng) {
    return (
      <div className="text-center">
        <p>
          <span className="mr-2 font-bold">{formattedSearchParams.place}</span>
          に一致する場所が見つかりませんでした。
        </p>
      </div>
    );
  }

  /** 取得した場所 */
  const places = await searchPlaces(
    latLng.lat,
    latLng.lng,
    formattedSearchParams
  );

  /** レビュー数（ratingsTotal）でソートしたplaces */
  const sortedPlaces = places.sort((a, b) => {
    if (a.ratingsTotal === undefined) {
      return 1;
    }
    if (b.ratingsTotal === undefined) {
      return -1;
    }
    return b.ratingsTotal - a.ratingsTotal;
  });

  return (
    <div className="flex flex-col gap-y-4">
      <p>検索件数 {sortedPlaces.length}件</p>
      <p>
        <span className="mr-0.5 text-lg font-bold">
          {formattedSearchParams.place}
        </span>
        での検索結果
      </p>
      {sortedPlaces.map((place) => {
        return (
          <SearchCard
            key={place.placeId}
            photo={place.photo ? place.photo[0] : undefined}
            place={place.placeName}
            placeTypes={place.placeTypes}
            rating={place.rating ? place.rating : 0}
            ratingTotal={place.ratingsTotal ? place.ratingsTotal : 0}
          />
        );
      })}
    </div>
  );
};
export default SearchPage;
