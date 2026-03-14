const SMALL_STARS = 220;
const MEDIUM_STARS = 90;
const LARGE_STARS = 26;
const CROSS_STARS = 12;
const HERO_STARS = 3;

function createCircleStars(count, minSize, maxSize, minOpacity, maxOpacity, minDuration, maxDuration, type = "circle") {
  return Array.from({ length: count }, (_, index) => ({
    id: `${type}-${index}`,
    type,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * (maxSize - minSize) + minSize}px`,
    opacity: (Math.random() * (maxOpacity - minOpacity) + minOpacity).toFixed(2),
    duration: `${Math.random() * (maxDuration - minDuration) + minDuration}s`,
    delay: `${Math.random() * 8}s`,
  }));
}

const smallStars = createCircleStars(220, 1.2, 2.2, 0.4, 0.72, 4, 8, "circle");
const mediumStars = createCircleStars(90, 2.2, 3.8, 0.5, 0.82, 5, 9, "circle");
const largeStars = createCircleStars(26, 3.8, 5.6, 0.62, 0.92, 6, 10, "circle");
const crossStars = createCircleStars(12, 10, 18, 0.7, 1, 5, 9, "cross");
const heroStars = createCircleStars(3, 22, 30, 0.9, 1, 6, 10, "hero");

const stars = [...smallStars, ...mediumStars, ...largeStars, ...crossStars, ...heroStars];

export default function StarField() {
  return (
    <div className="star-field" aria-hidden="true">
      {stars.map((star) => {
        if (star.type === "cross") {
          return (
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
          );
        }

        if (star.type === "hero") {
          return (
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
          );
        }

        return (
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
        );
      })}

      <div className="star-glow star-glow-1" />
      <div className="star-glow star-glow-2" />
      <div className="star-glow star-glow-3" />
      <div className="star-glow star-glow-4" />

      <span className="shooting-star" aria-hidden="true" />
    </div>
  );
}