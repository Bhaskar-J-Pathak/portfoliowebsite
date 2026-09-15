"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./shockwavePreview.module.css";

export type PreviewSlide = {
  number: string;
  title: string;
  background: string;
  ink: string;
  accent: string;
  image: string;
};

type ShockwavePreviewProps = {
  activeIndex: number;
  slides: PreviewSlide[];
};

const vertexShader = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  uniform sampler2D u_from;
  uniform sampler2D u_to;
  uniform float u_progress;
  uniform float u_aspect;
  uniform float u_from_aspect;
  uniform float u_to_aspect;
  uniform vec2 u_pointer;
  uniform vec2 u_velocity;
  uniform float u_hover;
  uniform float u_time;
  varying vec2 v_uv;

  vec2 coverUv(vec2 uv, float imageAspect, float frameAspect) {
    float ratio = imageAspect / frameAspect;
    if (ratio > 1.0) {
      uv.x = (uv.x - 0.5) / ratio + 0.5;
    } else {
      uv.y = (uv.y - 0.5) * ratio + 0.5;
    }
    return uv;
  }

  void main() {
    vec2 pointerPoint = v_uv - u_pointer;
    pointerPoint.x *= u_aspect;
    vec2 motion = u_velocity;
    motion.x *= u_aspect;
    float motionSpeed = length(motion);
    vec2 motionDirection = motionSpeed > 0.0001
      ? motion / motionSpeed
      : vec2(1.0, 0.0);

    // Measure against a short capsule trailing behind the pointer. This makes
    // quick passes pull the refraction in their direction instead of drawing
    // a perfectly circular, cursor-centred ripple.
    float trailLength = mix(0.025, 0.27, smoothstep(0.0, 0.085, motionSpeed));
    vec2 trailDirection = -motionDirection;
    float trailPosition = clamp(dot(pointerPoint, trailDirection), 0.0, trailLength);
    vec2 nearestTrailPoint = pointerPoint - trailDirection * trailPosition;
    float trailDistance = length(nearestTrailPoint);
    vec2 trailNormal = normalize(nearestTrailPoint + vec2(0.0001));

    float organicNoise = sin(pointerPoint.x * 31.0 + pointerPoint.y * 17.0);
    organicNoise += sin(pointerPoint.x * 14.0 - pointerPoint.y * 37.0 + u_time * 0.65) * 0.58;
    organicNoise += sin(pointerPoint.x * 53.0 + pointerPoint.y * 9.0 - u_time * 0.42) * 0.25;
    float liquidDistance = trailDistance + organicNoise * 0.0095;
    float pointerMask = smoothstep(0.32, 0.015, liquidDistance);
    float softCore = smoothstep(0.22, 0.0, liquidDistance);
    float contours = sin(liquidDistance * 64.0 - u_time * 1.35);
    contours += sin(liquidDistance * 103.0 + organicNoise * 0.7) * 0.34;
    float liquidWave = contours * pointerMask * u_hover;

    vec2 liquidOffset = trailNormal * liquidWave * 0.027;
    liquidOffset += motionDirection * softCore * u_hover * min(0.034, motionSpeed * 0.42);
    liquidOffset += vec2(-trailNormal.y, trailNormal.x)
      * sin(organicNoise * 1.7 + liquidDistance * 29.0)
      * pointerMask * u_hover * 0.0065;
    liquidOffset.x /= u_aspect;

    vec2 point = v_uv - 0.5;
    point.x *= u_aspect;
    float distanceFromCenter = length(point);
    vec2 direction = normalize(point + vec2(0.0001));
    direction.x /= u_aspect;

    float radius = u_progress * 1.15;
    float angle = atan(point.y, point.x);
    float transitionLife = sin(u_progress * 3.14159265);
    float boundaryWobble = sin(angle * 6.0 + u_progress * 8.0) * 0.016;
    boundaryWobble += sin(angle * 11.0 - u_progress * 5.5) * 0.008;
    boundaryWobble += sin(point.x * 12.0 + point.y * 15.0 + u_progress * 7.0) * 0.006;
    float liquidRadius = radius + boundaryWobble * transitionLife;
    float delta = distanceFromCenter - liquidRadius;
    float ring = exp(-abs(delta) * 21.0);
    float wave = (sin(delta * 92.0) + sin(delta * 151.0) * 0.42) * ring;
    float echo = sin((delta + 0.07) * 76.0) * exp(-abs(delta + 0.07) * 31.0);
    float strength = (1.0 - smoothstep(0.72, 1.0, u_progress)) * 0.025;
    vec2 turbulence = vec2(
      sin(v_uv.y * 19.0 + u_progress * 8.0),
      cos(v_uv.x * 17.0 - u_progress * 6.0)
    ) * ring * transitionLife * 0.0055;

    vec2 fromUv = v_uv + liquidOffset + turbulence + direction * (wave + echo * 0.35) * strength;
    vec2 toUv = v_uv + liquidOffset - turbulence * 0.65 - direction * (wave + echo * 0.2) * strength * 0.72;
    float reveal = 1.0 - smoothstep(liquidRadius - 0.075, liquidRadius + 0.075, distanceFromCenter);

    vec2 fromTextureUv = coverUv(fromUv, u_from_aspect, u_aspect);
    vec2 toTextureUv = coverUv(toUv, u_to_aspect, u_aspect);
    vec4 fromColor = texture2D(u_from, fromTextureUv);
    vec4 toColor = texture2D(u_to, toTextureUv);
    vec4 color = mix(fromColor, toColor, reveal);
    float chroma = ring * strength * 0.32;
    color.r = mix(color.r, texture2D(u_to, coverUv(toUv + direction * chroma, u_to_aspect, u_aspect)).r, reveal);
    color.b = mix(color.b, texture2D(u_from, coverUv(fromUv - direction * chroma, u_from_aspect, u_aspect)).b, 1.0 - reveal);
    color.rgb += ring * 0.026;
    gl_FragColor = color;
  }
`;

const straightFrame = `polygon(
  0% 0%, 25% 0%, 50% 0%, 75% 0%, 100% 0%,
  100% 25%, 100% 50%, 100% 75%, 100% 100%,
  75% 100%, 50% 100%, 25% 100%, 0% 100%,
  0% 75%, 0% 50%, 0% 25%
)`;

const warpedFrameA = `polygon(
  .65% 1.35%, 25% .3%, 50% 1.55%, 75% .2%, 98.9% 1.15%,
  98.25% 25%, 99.4% 50%, 97.95% 75%, 98.75% 98.55%,
  75% 99.25%, 50% 97.8%, 25% 99.35%, 1.3% 98.35%,
  .4% 75%, 2.05% 50%, .3% 25%
)`;

const warpedFrameB = `polygon(
  1.45% .45%, 25% 1.95%, 50% .2%, 75% 1.55%, 98.35% .45%,
  99.4% 25%, 97.9% 50%, 99.5% 75%, 98.2% 99.25%,
  75% 97.95%, 50% 99.45%, 25% 98.05%, .4% 99.2%,
  1.8% 75%, .25% 50%, 1.65% 25%
)`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function makeArtwork(slide: PreviewSlide, index: number) {
  const artwork = document.createElement("canvas");
  artwork.width = 1400;
  artwork.height = 1050;
  const context = artwork.getContext("2d");
  if (!context) return artwork;

  context.fillStyle = slide.background;
  context.fillRect(0, 0, artwork.width, artwork.height);

  const glow = context.createRadialGradient(930, 360, 20, 930, 360, 620);
  glow.addColorStop(0, slide.accent);
  glow.addColorStop(1, "transparent");
  context.globalAlpha = 0.72;
  context.fillStyle = glow;
  context.fillRect(0, 0, artwork.width, artwork.height);
  context.globalAlpha = 1;

  context.strokeStyle = `${slide.ink}30`;
  context.lineWidth = 2;
  const spacing = 70 + index * 12;
  for (let x = -artwork.height; x < artwork.width + artwork.height; x += spacing) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x + artwork.height, artwork.height);
    context.stroke();
  }

  context.fillStyle = slide.ink;
  context.globalAlpha = 0.1;
  context.font = "500 760px 'Fustat Variable', sans-serif";
  context.textAlign = "right";
  context.textBaseline = "alphabetic";
  context.fillText(slide.number, 1420, 1010);
  context.globalAlpha = 1;

  context.font = "650 22px 'Fustat Variable', sans-serif";
  context.textAlign = "left";
  context.fillText(`PROJECT ${slide.number}`, 54, 72);
  context.textAlign = "right";
  context.fillText("BHASKAR PATHAK / SELECTED WORK", 1346, 72);
  return artwork;
}

export function ShockwavePreview({ activeIndex, slides }: ShockwavePreviewProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(activeIndex);
  const transitionTo = useRef<((index: number) => void) | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = canvas.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const gl = node.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" });
    if (!gl) return;

    const vertex = createShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    const textures = slides.map((slide, index) => {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, makeArtwork(slide, index));
      return texture;
    });

    const fromLocation = gl.getUniformLocation(program, "u_from");
    const toLocation = gl.getUniformLocation(program, "u_to");
    const progressLocation = gl.getUniformLocation(program, "u_progress");
    const aspectLocation = gl.getUniformLocation(program, "u_aspect");
    const fromAspectLocation = gl.getUniformLocation(program, "u_from_aspect");
    const toAspectLocation = gl.getUniformLocation(program, "u_to_aspect");
    const pointerLocation = gl.getUniformLocation(program, "u_pointer");
    const velocityLocation = gl.getUniformLocation(program, "u_velocity");
    const hoverLocation = gl.getUniformLocation(program, "u_hover");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    let displayed = activeRef.current;
    let animation = 0;
    let hoverAnimation = 0;
    let shapeAnimation: Animation | null = null;
    let transitioning = false;
    let queued: number | null = null;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let previousX = 0.5;
    let previousY = 0.5;
    let velocityX = 0;
    let velocityY = 0;
    let hoverStrength = 0;
    let loaded = 0;
    const textureAspects = slides.map(() => 16 / 9);

    const images = slides.map((slide, index) => {
      const image = new Image();
      image.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, textures[index]);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        textureAspects[index] = image.naturalWidth / Math.max(1, image.naturalHeight);
        loaded += 1;
        if (loaded === slides.length) {
          draw(displayed, displayed, 1);
          setReady(true);
        }
      };
      image.src = slide.image;
      return image;
    });

    const resize = () => {
      const rect = node.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      node.width = Math.max(1, Math.round(rect.width * ratio));
      node.height = Math.max(1, Math.round(rect.height * ratio));
      gl.viewport(0, 0, node.width, node.height);
    };

    const draw = (from: number, to: number, progress: number) => {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textures[from]);
      gl.uniform1i(fromLocation, 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, textures[to]);
      gl.uniform1i(toLocation, 1);
      gl.uniform1f(progressLocation, progress);
      gl.uniform1f(aspectLocation, node.width / Math.max(1, node.height));
      gl.uniform1f(fromAspectLocation, textureAspects[from]);
      gl.uniform1f(toAspectLocation, textureAspects[to]);
      gl.uniform2f(pointerLocation, pointerX, pointerY);
      gl.uniform2f(velocityLocation, velocityX, velocityY);
      gl.uniform1f(hoverLocation, hoverStrength);
      gl.uniform1f(timeLocation, performance.now() * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const runHover = () => {
      if (transitioning || hoverAnimation) return;
      const tick = () => {
        hoverStrength *= 0.985;
        velocityX *= 0.965;
        velocityY *= 0.965;
        draw(displayed, displayed, 1);
        if (hoverStrength > 0.002) {
          hoverAnimation = requestAnimationFrame(tick);
        } else {
          hoverAnimation = 0;
          hoverStrength = 0;
          draw(displayed, displayed, 1);
        }
      };
      hoverAnimation = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = node.getBoundingClientRect();
      pointerX = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      pointerY = 1 - Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
      const deltaX = pointerX - previousX;
      const deltaY = pointerY - previousY;
      const velocity = Math.hypot(deltaX, deltaY);
      velocityX = Math.max(-0.14, Math.min(0.14, velocityX * 0.28 + deltaX * 0.72));
      velocityY = Math.max(-0.14, Math.min(0.14, velocityY * 0.28 + deltaY * 0.72));
      previousX = pointerX;
      previousY = pointerY;
      hoverStrength = Math.min(1, Math.max(hoverStrength, 0.035 + velocity * 15));
      if (!transitioning) {
        cancelAnimationFrame(hoverAnimation);
        hoverAnimation = 0;
        draw(displayed, displayed, 1);
        runHover();
      }
    };

    const onPointerLeave = () => {
      hoverStrength = Math.max(hoverStrength, 0.06);
      runHover();
    };

    const startTransition = (next: number) => {
      cancelAnimationFrame(animation);
      const from = displayed;
      transitioning = true;
      shapeAnimation?.cancel();
      shapeAnimation = node.parentElement?.animate(
        [
          { clipPath: straightFrame, offset: 0 },
          { clipPath: warpedFrameA, offset: 0.34 },
          { clipPath: warpedFrameB, offset: 0.68 },
          { clipPath: straightFrame, offset: 1 },
        ],
        { duration: 880, easing: "cubic-bezier(.2, .72, .16, 1)" },
      ) ?? null;
      const started = performance.now();
      const tick = (now: number) => {
        const raw = Math.min(1, (now - started) / 880);
        const eased = 1 - Math.pow(1 - raw, 3);
        draw(from, next, eased);
        hoverStrength *= 0.94;
        if (raw < 1) {
          animation = requestAnimationFrame(tick);
        } else {
          displayed = next;
          transitioning = false;
          const pending = queued;
          queued = null;
          if (pending !== null && pending !== displayed) startTransition(pending);
          else runHover();
        }
      };
      animation = requestAnimationFrame(tick);
    };

    transitionTo.current = (next: number) => {
      if (next === displayed && !transitioning) return;
      if (transitioning) {
        queued = next;
        return;
      }
      startTransition(next);
    };

    resize();
    draw(displayed, displayed, 1);
    const observer = new ResizeObserver(() => {
      resize();
      draw(displayed, displayed, 1);
    });
    observer.observe(node);
    node.addEventListener("pointermove", onPointerMove, { passive: true });
    node.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animation);
      cancelAnimationFrame(hoverAnimation);
      shapeAnimation?.cancel();
      node.removeEventListener("pointermove", onPointerMove);
      node.removeEventListener("pointerleave", onPointerLeave);
      transitionTo.current = null;
      images.forEach((image) => {
        image.onload = null;
      });
      textures.forEach((texture) => gl.deleteTexture(texture));
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, [slides]);

  useEffect(() => {
    activeRef.current = activeIndex;
    transitionTo.current?.(activeIndex);
  }, [activeIndex]);

  const slide = slides[activeIndex];
  return (
    <div className={styles.preview} style={{ background: slide.background }}>
      <div
        className={styles.fallback}
        role="img"
        aria-label={`${slide.title} project preview`}
        style={{ backgroundColor: slide.background, backgroundImage: `url(${slide.image})` }}
      />
      <canvas className={`${styles.canvas} ${ready ? styles.ready : ""}`} ref={canvas} aria-hidden="true" />
    </div>
  );
}
