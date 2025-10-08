import type { CSSProperties } from 'react';
import { memo, useMemo } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  Position,
  getBezierPath,
  type EdgeProps,
} from '@xyflow/react';
import { cn } from '@/utils/cn';

function useBezierPath(props: EdgeProps) {
  const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = props;

  return useMemo(
    () =>
      getBezierPath({
        sourceX: sourceX ?? 0,
        sourceY: sourceY ?? 0,
        targetX: targetX ?? 0,
        targetY: targetY ?? 0,
        sourcePosition: sourcePosition ?? Position.Right,
        targetPosition: targetPosition ?? Position.Left,
      }),
    [sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition],
  );
}

type EdgeStyle = CSSProperties & {
  '--ai-edge-path'?: string;
};

function TemporaryEdge(props: EdgeProps) {
  const { className, style, ...rest } = props;
  const [path] = useBezierPath(rest);

  return (
    <BaseEdge
      path={path}
      className={cn('ai-edge ai-edge--temporary', className)}
      style={{
        stroke: 'var(--ai-edge-temporary-stroke)',
        strokeWidth: 2,
        strokeDasharray: '8 8',
        ...style,
      }}
      {...rest}
    />
  );
}

function AnimatedEdge(props: EdgeProps) {
  const { className, style, ...rest } = props;
  const [path] = useBezierPath(rest);

  const indicatorStyle = useMemo(
    () =>
      ({
        '--ai-edge-path': `path('${path}')`,
      }) as EdgeStyle,
    [path],
  );

  return (
    <>
      <BaseEdge
        path={path}
        className={cn('ai-edge ai-edge--animated', className)}
        style={{
          stroke: 'var(--ai-edge-animated-stroke)',
          strokeWidth: 2.4,
          ...style,
        }}
        {...rest}
      />
      <EdgeLabelRenderer>
        <div className="ai-edge__indicator-layer" style={{ pointerEvents: 'none' }}>
          <span className="ai-edge__indicator" style={indicatorStyle} />
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export const Edge = {
  Temporary: memo(TemporaryEdge),
  Animated: memo(AnimatedEdge),
};

