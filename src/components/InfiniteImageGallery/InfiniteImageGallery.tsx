import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./InfiniteImageGallery.scss";

type InfiniteImageGalleryProps = {
  items: any[];
  tresHold?: number;
};

export const InfiniteImageGallery = ({
  items = [],
  tresHold = 40
}: InfiniteImageGalleryProps) => {
  const [thresHoldCounter, setThresHoldCounter] = useState(40);
  const [hasMore, setHasMore] = useState(true);
  const [shownItems, setShownItems] = useState<any[]>([]);

  useEffect(() => {
    if (items.length) {
      setShownItems([...items.slice(0, tresHold)]);
    }
  }, [items]);

  const getNextImages = () => {
    if (items.length < shownItems.length + thresHoldCounter) {
      setHasMore(false);
    }

    const nextThresHoldCounter = thresHoldCounter + tresHold;
    let nextBatch = items.slice(0, nextThresHoldCounter);
    setThresHoldCounter(nextThresHoldCounter);
    setShownItems(nextBatch);
  };

  return (
    <InfiniteScroll
      dataLength={shownItems.length}
      next={getNextImages}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>You have seen all images!</b>
        </p>
      }
    >
      <>
        {shownItems.map((item, index) => {
          return (
            <img
              className="image-list-item"
              key={`${index}${item.split("/")[5]}`}
              alt="dog"
              src={item}
            />
          );
        })}
      </>
    </InfiniteScroll>
  );
};
