import Clock from './Clock';

export default function StaticClock({ type, rotation }) {
  const { hourRotation, minuteRotation, secondRotation } = rotation;

  if (type == null) return null;

  return (
    <Clock
      type={type}
      rotation={{ hourRotation, minuteRotation, secondRotation }}
    />
  );
}
