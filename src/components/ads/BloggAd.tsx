import Ad from "./Ad";

type Props = {
  index: number;
};

function BloggAd({ index }: Props) {
  return (
    <Ad
      key={index}
      index={index}
      client="ca-pub-1555847445754750"
      slot="6638719098"
      format="auto"
    />
  );
}

export default BloggAd;
