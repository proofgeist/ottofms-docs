export default function Vimeo(props: { id: string }) {
  const { id } = props;
  return (
    <div style={{ marginTop: "24px" }}>
      <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
        <iframe
          src={`https://player.vimeo.com/video/${id}?h=b8586bf005&amp;badge=0&amp;autopause=0&amp;quality_selector=1&amp;player_id=0&amp;app_id=58479`}
          allow="autoplay; fullscreen; picture-in-picture"
          title="OttoFMS"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        ></iframe>
      </div>
      <script src="https://player.vimeo.com/api/player.js"></script>
    </div>
  );
}
