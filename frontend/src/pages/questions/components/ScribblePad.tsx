import { useRef, useState, useEffect } from "react";

import { KonvaEventObject } from "konva/lib/Node";
import { Layer, Line, Stage } from "react-konva";

type Tool = "pen" | "eraser";

type Stroke = {
  tool: Tool;
  points: number[];
  penColor: string;
  strokeWidth: number;
};

type ScribblePadProps = {
  enabled?: boolean,
  backgroundColor?: string;
  height?: number;
  penColor?: string;
  strokeWidth?: number;
  tool?: Tool;
  width?: number;
};

export const ScribblePad = ({
  backgroundColor = "#fff",
  height = window.innerHeight,
  penColor = "#000",
  strokeWidth = 5,
  tool = "pen",
  width = window.innerWidth,
  enabled = true,
}: ScribblePadProps) => {
  const [strokes, setStrokes] = useState<Stroke[]>([]);

  const isDrawing = useRef(false);

  useEffect(() => {
    addEventListener("mouseup", handleMouseUp);
    return () => removeEventListener("mouseup", handleMouseUp);
  })

  const handleMouseDown = (event: KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();

    if (!stage) {
      return;
    }

    const position = stage.getPointerPosition();

    if (!position) {
      return;
    }

    isDrawing.current = enabled;

    setStrokes([
      ...strokes,
      {
        points: [position.x, position.y],
        tool,
        penColor,
        strokeWidth
      },
    ]);
  };

  const handleMouseMove = (event: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) {
      return;
    }

    const stage = event.target.getStage();

    if (!stage) {
      return;
    }

    const position = stage.getPointerPosition();

    if (!position) {
      return;
    }

    const lastStroke = strokes[strokes.length - 1];

    lastStroke.points = [...lastStroke.points, position.x, position.y];

    setStrokes([...strokes.slice(0, strokes.length - 1), lastStroke]);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <Stage
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      height={height}
      style={{ backgroundColor }}
      width={width}
    >
      <Layer>
        {strokes.map(({ tool, points, penColor, strokeWidth }, index) => (
          <Line
            globalCompositeOperation={tool === "eraser" ? "destination-out" : "source-over"}
            key={index}
            lineCap="round"
            lineJoin="round"
            points={points}
            stroke={penColor}
            strokeWidth={strokeWidth}
            tension={0.5}
          />
        ))}
      </Layer>
    </Stage>
  );
};
