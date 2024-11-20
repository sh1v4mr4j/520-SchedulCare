import mapService from "../../services/map-view/map-view-service";

const MapView = ({ width = 600, height = 450, mapMode, mapParams }) => {
  const { createMapEmbedUrl } = mapService();

  return (
    <div>
      <iframe
        width={width}
        height={height}
        style={{ border: 0 }}
        src={createMapEmbedUrl(mapMode, mapParams)}
        allowFullScreen
      />
    </div>
  );
};

export default MapView;
