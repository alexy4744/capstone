import { useRef, useState } from "react";

import { KonvaEventObject } from "konva/lib/Node";
import { Layer, Line, Stage } from "react-konva";

type Tool = "pen" | "eraser";

type Stroke = {
  tool: Tool;
  points: number[];
};

type ScribblePadProps = {
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
}: ScribblePadProps) => {
  const [strokes, setStrokes] = useState<Stroke[]>([]);

  const isDrawing = useRef(false);

  const handleMouseDown = (event: KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();

    if (!stage) {
      return;
    }

    const position = stage.getPointerPosition();

    if (!position) {
      return;
    }

    isDrawing.current = true;

    setStrokes([
      ...strokes,
      {
        points: [position.x, position.y],
        tool,
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
        {strokes.map(({ tool, points }, index) => (
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
