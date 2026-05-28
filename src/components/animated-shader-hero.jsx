import React, { useRef, useEffect } from "react";

/* ================================
   SHADER BACKGROUND HOOK
================================ */
const useShaderBackground = () => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef();
  const rendererRef = useRef(null);
  const pointersRef = useRef(null);

  class WebGLRenderer {
    constructor(canvas, scale) {
      this.canvas = canvas;
      this.scale = scale;
      this.gl = canvas.getContext("webgl2");
      this.program = null;
      this.vs = null;
      this.fs = null;
      this.buffer = null;
      this.mouseMove = [0, 0];
      this.mouseCoords = [0, 0];
      this.pointerCoords = [0, 0];
      this.nbrOfPointers = 0;

      this.vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

      this.vertices = [-1, 1, -1, -1, 1, 1, 1, -1];
      this.shaderSource = defaultShaderSource;

      this.gl.viewport(
        0,
        0,
        canvas.width * scale,
        canvas.height * scale
      );
    }

    updateShader(source) {
      this.reset();
      this.shaderSource = source;
      this.setup();
      this.init();
    }

    updateMove(v) {
      this.mouseMove = v;
    }

    updateMouse(v) {
      this.mouseCoords = v;
    }

    updatePointerCoords(v) {
      this.pointerCoords = v;
    }

    updatePointerCount(n) {
      this.nbrOfPointers = n;
    }

    updateScale(scale) {
      this.scale = scale;
      this.gl.viewport(
        0,
        0,
        this.canvas.width * scale,
        this.canvas.height * scale
      );
    }

    compile(shader, source) {
      const gl = this.gl;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
    }

    setup() {
      const gl = this.gl;
      this.vs = gl.createShader(gl.VERTEX_SHADER);
      this.fs = gl.createShader(gl.FRAGMENT_SHADER);
      this.compile(this.vs, this.vertexSrc);
      this.compile(this.fs, this.shaderSource);

      this.program = gl.createProgram();
      gl.attachShader(this.program, this.vs);
      gl.attachShader(this.program, this.fs);
      gl.linkProgram(this.program);
    }

    init() {
      const gl = this.gl;
      const program = this.program;

      this.buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(this.vertices),
        gl.STATIC_DRAW
      );

      const position = gl.getAttribLocation(program, "position");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      program.resolution = gl.getUniformLocation(program, "resolution");
      program.time = gl.getUniformLocation(program, "time");
      program.move = gl.getUniformLocation(program, "move");
      program.touch = gl.getUniformLocation(program, "touch");
      program.pointerCount = gl.getUniformLocation(
        program,
        "pointerCount"
      );
      program.pointers = gl.getUniformLocation(program, "pointers");
    }

    render(now = 0) {
      const gl = this.gl;
      const program = this.program;
      if (!program) return;

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);

      gl.uniform2f(program.resolution, this.canvas.width, this.canvas.height);
      gl.uniform1f(program.time, now * 0.001);
      gl.uniform2f(program.move, ...this.mouseMove);
      gl.uniform2f(program.touch, ...this.mouseCoords);
      gl.uniform1i(program.pointerCount, this.nbrOfPointers);
      gl.uniform2fv(program.pointers, this.pointerCoords);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    reset() {
      const gl = this.gl;
      if (this.program) {
        gl.deleteProgram(this.program);
      }
    }
  }

  class PointerHandler {
    constructor(element, scale) {
      this.scale = scale;
      this.pointers = new Map();
      this.moves = [0, 0];
      this.lastCoords = [0, 0];

      const map = (x, y) => [
        x * this.scale,
        element.height - y * this.scale,
      ];

      element.addEventListener("pointerdown", (e) => {
        this.pointers.set(e.pointerId, map(e.clientX, e.clientY));
      });

      element.addEventListener("pointermove", (e) => {
        if (!this.pointers.size) return;
        this.pointers.set(e.pointerId, map(e.clientX, e.clientY));
        this.moves = [
          this.moves[0] + e.movementX,
          this.moves[1] + e.movementY,
        ];
      });

      element.addEventListener("pointerup", (e) => {
        this.pointers.delete(e.pointerId);
      });
    }

    get count() {
      return this.pointers.size;
    }

    get coords() {
      return this.pointers.size
        ? Array.from(this.pointers.values()).flat()
        : [0, 0];
    }

    get first() {
      return this.coords.slice(0, 2);
    }

    get move() {
      return this.moves;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.max(1, window.devicePixelRatio * 0.5);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    rendererRef.current = new WebGLRenderer(canvas, dpr);
    pointersRef.current = new PointerHandler(canvas, dpr);

    rendererRef.current.setup();
    rendererRef.current.init();

    const loop = (t) => {
      rendererRef.current.updateMouse(pointersRef.current.first);
      rendererRef.current.updatePointerCoords(pointersRef.current.coords);
      rendererRef.current.updatePointerCount(pointersRef.current.count);
      rendererRef.current.updateMove(pointersRef.current.move);
      rendererRef.current.render(t);
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    loop(0);

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, []);

  return canvasRef;
};

/* ================================
   HERO COMPONENT
================================ */
const Hero = ({
  trustBadge,
  headline = { line1: "", line2: "" },
  subtitle = "",
  buttons,
  className = "",
}) => {
  const canvasRef = useShaderBackground();

  return (
    <div className={`relative h-screen w-full overflow-hidden bg-black ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white text-center px-6">
        
        {/* TRUST BADGE */}
        {trustBadge?.text && (
          <div className="mb-6 px-6 py-2 rounded-full border border-orange-300/30 bg-orange-500/10 backdrop-blur">
            {trustBadge.text}
          </div>
        )}

        {/* HEADLINES */}
        {headline.line1 && (
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-300 to-yellow-400 bg-clip-text text-transparent">
            {headline.line1}
          </h1>
        )}

        {headline.line2 && (
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-300 to-orange-500 bg-clip-text text-transparent">
            {headline.line2}
          </h1>
        )}

        {/* SUBTITLE */}
        {subtitle && (
          <p className="max-w-3xl mt-6 text-lg text-orange-100">
            {subtitle}
          </p>
        )}

        {/* BUTTONS */}
        {buttons && (
          <div className="flex gap-4 mt-10">
            {buttons.primary && (
              <button
                onClick={buttons.primary.onClick}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold hover:scale-105 transition"
              >
                {buttons.primary.text}
              </button>
            )}

            {buttons.secondary && (
              <button
                onClick={buttons.secondary.onClick}
                className="px-8 py-4 rounded-full border border-orange-300 text-orange-100 hover:bg-orange-500/20 transition"
              >
                {buttons.secondary.text}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


export default Hero;

/* ================================
   SHADER SOURCE
================================ */
const defaultShaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
void main(){
  vec2 uv = gl_FragCoord.xy / resolution;
  float c = 0.5 + 0.5*sin(time + uv.x*6.0);
  O = vec4(c*0.9, c*0.6, 0.2, 1.0);
}`;
