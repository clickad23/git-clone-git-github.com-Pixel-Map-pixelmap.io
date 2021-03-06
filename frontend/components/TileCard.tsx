import React, { useEffect, useState } from "react";
import Link from "next/link";
import portal from "../public/assets/images/portal.gif";
import {
  shortenIfHex,
  formatPrice,
  openseaLink,
  cleanUrl,
} from "../utils/misc";
import TileImage from "./TileImage";
import Image from "next/image";
import { PixelMapTile } from "@pixelmap/common/types/PixelMapTile";
import { fetchSingleTile } from "../utils/api";
import { PixelMapImage } from "@pixelmap/common/types/PixelMapImage";

interface TileCardProps {
  tile: PixelMapTile;
  large?: boolean;
}

export default function TileCard({ tile, large }: TileCardProps) {
  const ownerName = tile.ens ? tile.ens : shortenIfHex(tile.owner, 12);
  const [tileExtended, setTile] = useState<PixelMapTile>();
  const [fetching, setFetching] = useState(false);
  const [tileImage, setTileImage] = useState(tile.image);
  useEffect(() => {
    setFetching(true);

    fetchSingleTile(tile.id.toString()).then((_tile) => {
      setTile(_tile);
      setFetching(false);
    });
  }, [, tile.id.toString()]);

  return (
    <>
      <div
        className={`relative flex p-4 space-x-4 ${
          large ? "md:p-8 md:space-x-8" : ""
        }`}
      >
        <div>
          <div className="bg-gray-100">
            <TileImage
              className={`${
                large
                  ? "h-20 w-20 md:h-40 md:w-40"
                  : "h-16 w-16 md:h-20 md:w-20"
              }`}
              image={tileImage}
            />
          </div>
        </div>
        <div className={`flex-grow-1 space-y-1 ${large ? "md:space-y-3" : ""}`}>
          <h3
            className={`text-gray-900 font-bold ${
              large ? "md:text-3xl" : "text-xl"
            } mb-1 relative`}
          >
            <span>PixelMap #{tile.id}</span>
          </h3>

          <p className={"text-sm text-gray-700"}>
            Owner: <Link href={`/owner/${tile.owner}`}>{ownerName}</Link>
          </p>

          <div className="truncate">
            <a
              href={cleanUrl(tile.url)}
              className={`text-blue-600 break-all truncate text-sm whitespace-normal ${
                large ? "md:text-base" : ""
              }`}
              target="_blank"
              rel="noreferrer"
            >
              {tile.url}
            </a>
          </div>
        </div>
      </div>
      <div className={"px-4 text-sm text-gray-700 items-center flex py-1"}>
        {tileExtended &&
          !fetching &&
          tileExtended.historical_images.length > 0 && (
            <>
              <p>Previous Images:</p>
              {tileExtended.historical_images.map(
                (image: PixelMapImage, idx: number) => (
                  <Image
                    onMouseEnter={() => {
                      setTileImage(image.image);
                    }}
                    key={idx}
                    src={image.image_url}
                    height={16}
                    width={16}
                  />
                )
              )}
            </>
          )}
      </div>
      <div className={`px-4 py-3 bg-gray-50 ${large ? "md:px-8 md:py-4" : ""}`}>
        <div className="flex justify-between items-center">
          <Link href={`/house/${encodeURIComponent(tile.id)}`}>
            <div className="nes-btn is-primary flex items-center justify-between md:px-5.5 py-1 md:py-1">
              <Image
                className="w-full h-auto"
                width={30}
                height={30}
                src={portal}
                alt="Portal"
              />
              <div className="font-bold md:px-3">{"Enter Tile"}</div>
            </div>
          </Link>
          <div>
            {tile.wrapped && (
              <a
                className="nes-btn is-primary font-bold"
                target="_blank"
                href={openseaLink(tile.id)}
                rel="noreferrer"
              >
                {tile.openseaPrice != 0
                  ? "Buy for " + formatPrice(tile)
                  : "View on OpenSea"}
              </a>
            )}

            {!tile.wrapped && (
              <button className="flex items-center justify-center">
                <div>
                  <p className="mr-2 text-green-600">Not Wrapped</p>
                  <p className="text-sm text-gray-500">(Use Etherscan)</p>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
