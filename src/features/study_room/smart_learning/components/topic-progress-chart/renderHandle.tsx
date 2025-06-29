import { COLORS, RADIAN } from "./constants";

/**
 * Renders a custom handle as a line for a chart component, typically used to indicate
 * the current progress or position on a circular progress chart.
 *
 * @param props - The properties for rendering the handle, including:
 *   @param props.cx - The x-coordinate of the chart's center.
 *   @param props.cy - The y-coordinate of the chart's center.
 *   @param props.innerRadius - The inner radius of the chart arc.
 *   @param props.outerRadius - The outer radius of the chart arc.
 *   @param props.endAngle - The ending angle (in degrees) of the arc where the handle should be placed.
 *   @param props.index - The index of the handle (only renders for index 0).
 * @returns A SVG `<line>` element representing the handle if `index` is 0, otherwise `null`.
 */
const renderHandle = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, endAngle, index } = props;
  if (index !== 0) return null;

  const rad = -RADIAN * endAngle;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const middleRadius = (outerRadius + innerRadius) / 2;
  const centerX = cx + middleRadius * cos;
  const centerY = cy + middleRadius * sin;

  const handleLength = 60;
  const halfLength = handleLength / 2;

  const startX = centerX - cos * halfLength;
  const startY = centerY - sin * halfLength;
  const endX = centerX + cos * halfLength;
  const endY = centerY + sin * halfLength;

  return (
    <line
      x1={startX}
      y1={startY}
      x2={endX}
      y2={endY}
      stroke={COLORS[0]}
      strokeWidth={2}
      strokeLinecap="round"
    />
  );
};

export default renderHandle;
