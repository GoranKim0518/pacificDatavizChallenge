import React, { useRef, useEffect, useCallback } from "react";

const WIDTH = 1536;
const HEIGHT = 1024;
const NUM_BITS = 200;

type Bit = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  value: "0" | "1";
  layer: "infra" | "literacy";
  opacity: number;
};

const generateBits = (): Bit[] => {
  const bits: Bit[] = [];
  for (let i = 0; i < NUM_BITS; i++) {
    const layer = i % 2 === 0 ? "infra" : "literacy";
    const speedX = layer === "infra" ? 0.3 + Math.random() * 0.3 : 0.2 + Math.random() * 0.2;
    const speedY = layer === "infra" ? Math.random() * 0.2 : Math.random() * 0.3;
    bits.push({
      x: Math.random() * WIDTH,
      y: Math.random() * HEIGHT,
      size: 14 + Math.random() * 6,
      speedX,
      speedY,
      value: Math.random() > 0.5 ? "1" : "0",
      layer,
      opacity: 0.3 + Math.random() * 0.4,
    });
  }
  return bits;
};

const BinaryWaveField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bitsRef = useRef<Bit[]>(generateBits());
  const mouseRef = useRef({ x: WIDTH / 2, y: HEIGHT / 2 });

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    bitsRef.current.forEach((bit) => {
      // 파형 효과
      const waveOffset = Math.sin((bit.x + bit.y) * 0.01 + Date.now() * 0.001) * 5;

      // 마우스에 따른 살짝 흔들림
      const dx = mouseRef.current.x - bit.x;
      const dy = mouseRef.current.y - bit.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repel = dist < 100 ? (100 - dist) / 100 : 0;

      const offsetX = dx * repel * 0.02;
      const offsetY = dy * repel * 0.02;

      ctx.font = `${bit.size}px IBM Plex Mono`;
      ctx.fillStyle =
        bit.layer === "infra"
          ? `rgba(15, 98, 254, ${bit.opacity})` // Carbon Blue 60
          : `rgba(120, 169, 255, ${bit.opacity})`; // Carbon Blue 40
      ctx.fillText(bit.value, bit.x + offsetX, bit.y + waveOffset + offsetY);
    });
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    bitsRef.current.forEach((bit) => {
      bit.x += bit.speedX;
      bit.y += bit.speedY;

      if (bit.x > WIDTH) bit.x = 0;
      if (bit.y > HEIGHT) bit.y = 0;
    });

    draw(ctx);
    requestAnimationFrame(animate);
  }, [draw]);

  useEffect(() => {
    animate();
  }, [animate]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  return (
    <canvas
      ref={canvasRef}
      width={WIDTH}
      height={HEIGHT}
      className="w-full h-auto rounded-2xl shadow-md"
      onMouseMove={handleMouseMove}
      style={{
        background: "linear-gradient(to bottom, #f4f4f4, #ffffff)",
        borderRadius: "1rem",
      }}
    />
  );
};

export default BinaryWaveField;