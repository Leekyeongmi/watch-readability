import Clock from './Clock';

export default function StaticClock({ type, rotation, rank }) {
  const { hourRotation, minuteRotation, secondRotation } = rotation;

  if (type == null) return null;

  return (
    <Clock
      type={type}
      rank={rank}
      rotation={{ hourRotation, minuteRotation, secondRotation }}
    />
  );
}
