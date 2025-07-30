import { useEffect, useRef } from "react";

interface BinaryChar {
  x: number;
  phase: number;
  speed: number;
  type: "infra" | "literacy" | "future";
  baseY: number;
}

const BinaryWaveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const charsRef = useRef<BinaryChar[]>([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const targetHeight = 150;
    canvas.width = canvas.clientWidth;
    canvas.height = targetHeight;
    canvas.style.height = `${targetHeight}px`;

    let width = canvas.width;
    let height = canvas.height;

    const fontSize = 16;
    const waveLength = 200;
    const density = 3.5;
    const waveCount = Math.floor(width / fontSize);

    const chars: BinaryChar[] = [];
    for (let i = 0; i < waveCount * density; i++) {
      const type = i % 3 === 0 ? "infra" : i % 3 === 1 ? "literacy" : "future";
      const baseY =
        height / 2 + (type === "infra" ? -20 : type === "literacy" ? 20 : 0);
      chars.push({
        x: Math.random() * width,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.4,
        type,
        baseY,
      });
    }
    charsRef.current = chars;

    let frame = 0;
    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const char of charsRef.current) {
        const waveOffset = Math.sin(
          (char.x / waveLength + char.phase + frame * 0.01) *
            (char.type === "infra" ? 1 : char.type === "literacy" ? 0.85 : 0.65)
        );
        const amplitude =
          char.type === "infra" ? 30 : char.type === "literacy" ? 50 : 40;
        let waveY = waveOffset * amplitude + char.baseY;

        const dx = char.x - mouse.current.x;
        const dy = waveY - mouse.current.y;
        const distSq = dx * dx + dy * dy;

        let offsetX = 0;
        let offsetY = 0;

        if (distSq < 10000) {
          const dist = Math.sqrt(distSq);
          const force = (100 - dist) / 100;
          const angle = Math.atan2(dy, dx);
          offsetX = Math.cos(angle) * force * 8;
          offsetY = Math.sin(angle) * force * 8;
        }

        const finalX = char.x + offsetX;
        const finalY = waveY + offsetY;

        ctx.fillStyle =
          char.type === "infra"
            ? "#0f62fe"
            : char.type === "literacy"
            ? "rgba(15,98,254,0.35)"
            : "rgba(15,98,254,0.15)";

        ctx.fillText(Math.random() > 0.5 ? "0" : "1", finalX, finalY);

        char.x +=
          char.speed *
          (char.type === "infra"
            ? 1
            : char.type === "literacy"
            ? 0.5
            : 0.3);
        if (char.x > width + 20) char.x = -20;
      }

      frame++;
      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    const resizeObserver = new ResizeObserver(() => {
      width = canvas.clientWidth;
      canvas.width = width;
      canvas.height = targetHeight;

      for (const char of charsRef.current) {
        char.baseY =
          height / 2 +
          (char.type === "infra" ? -20 : char.type === "literacy" ? 20 : 0);
      }
    });
    resizeObserver.observe(canvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[150px]"
      style={{
        backgroundColor: "transparent",
        border: "none",
        outline: "none",
        display: "block"
      }}
    />
  );
};

export default BinaryWaveBackground;