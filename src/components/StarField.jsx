const SMALL_STARS = 360;
const MEDIUM_STARS = 170;
const LARGE_STARS = 60;
const CROSS_STARS = 18;
const HERO_STARS = 6;

function createStars(
  count,
  minSize,
  maxSize,
  minOpacity,
  maxOpacity,
  minDuration,
  maxDuration,
  type = "circle"
) {
  return Array.from({ length: count }, (_, index) => ({
    id: `${type}-${index}`,
    type,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * (maxSize - minSize) + minSize}px`,
    opacity: (
      Math.random() * (maxOpacity - minOpacity) + minOpacity
    ).toFixed(2),
    duration: `${Math.random() * (maxDuration - minDuration) + minDuration}s`,
    delay: `${Math.random() * 8}s`,
  }));
}

const stars = [
  ...createStars(SMALL_STARS, 1.1, 2.1, 0.45, 0.78, 4, 8, "circle"),
  ...createStars(MEDIUM_STARS, 2.2, 3.6, 0.55, 0.88, 5, 9, "circle"),
  ...createStars(LARGE_STARS, 3.8, 5.6, 0.72, 1, 6, 10, "circle"),
  ...createStars(CROSS_STARS, 10, 16, 0.85, 1, 6, 10, "cross"),
  ...createStars(HERO_STARS, 16, 24, 0.92, 1, 6, 10, "hero"),
];

export default function StarField() {
  return (
    <div className="star-field" aria-hidden="true">
      <div className="moon-wrap">
        <div className="moon" />
        <div className="moon-glow" />
      </div>

      <div className="star-layer star-layer-back">
        {stars
          .filter((star) => star.type === "circle")
          .map((star) => (
            <span
              key={star.id}
              className="star"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                "--opacity": star.opacity,
                "--duration": star.duration,
                "--delay": star.delay,
              }}
            />
          ))}
      </div>

      <div className="star-layer star-layer-front">
        {stars
          .filter((star) => star.type === "cross")
          .map((star) => (
            <span
              key={star.id}
              className="star-cross"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                "--opacity": star.opacity,
                "--duration": star.duration,
                "--delay": star.delay,
              }}
            />
          ))}

        {stars
          .filter((star) => star.type === "hero")
          .map((star) => (
            <span
              key={star.id}
              className="star-hero"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                "--opacity": star.opacity,
                "--duration": star.duration,
                "--delay": star.delay,
              }}
            />
          ))}
      </div>

      <div className="star-glow star-glow-1" />
      <div className="star-glow star-glow-2" />
      <div className="star-glow star-glow-3" />
      <div className="star-glow star-glow-4" />

      <span className="shooting-star" aria-hidden="true" />
    </div>
  );
}