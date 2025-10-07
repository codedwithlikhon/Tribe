import { memo, useMemo } from 'react';

type ConnectionProps = {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  className?: string;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

function createPath({
  fromX,
  fromY,
  toX,
  toY,
}: ConnectionProps) {
  const deltaX = toX - fromX;
  const offset = clamp(Math.abs(deltaX) * 0.5, 40, 160);
  const controlOffset = deltaX >= 0 ? offset : -offset;

  const controlX1 = fromX + controlOffset;
  const controlX2 = toX - controlOffset;

  return `M ${fromX},${fromY} C ${controlX1},${fromY} ${controlX2},${toY} ${toX},${toY}`;
}

function ConnectionComponent({ fromX, fromY, toX, toY, className }: ConnectionProps) {
  const path = useMemo(
    () => createPath({ fromX, fromY, toX, toY }),
    [fromX, fromY, toX, toY],
  );

  const minX = Math.min(fromX, toX) - 32;
  const minY = Math.min(fromY, toY) - 32;
  const width = Math.abs(toX - fromX) + 64;
  const height = Math.abs(toY - fromY) + 64;

  const viewBox = `${minX} ${minY} ${width || 1} ${height || 1}`;

  return (
    <svg
      role="presentation"
      className={cn('ai-connection', className)}
      viewBox={viewBox}
      aria-hidden
    >
      <defs>
        <linearGradient id="ai-connection-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--ai-connection-gradient-start)" />
          <stop offset="100%" stopColor="var(--ai-connection-gradient-end)" />
        </linearGradient>
      </defs>
      <path className="ai-connection__path" d={path} />
      <circle className="ai-connection__indicator" cx={toX} cy={toY} r={6} />
    </svg>
  );
}

export const Connection = memo(ConnectionComponent);

