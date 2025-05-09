import {
  __commonJS
} from "./chunk-G3PMV62Z.js";

// node_modules/vanta/dist/vanta.waves.min.js
var require_vanta_waves_min = __commonJS({
  "node_modules/vanta/dist/vanta.waves.min.js"(exports, module) {
    !function(t, e) {
      "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports._vantaEffect = e() : t._vantaEffect = e();
    }("undefined" != typeof self ? self : exports, () => (() => {
      "use strict";
      var t = { d: (e2, i2) => {
        for (var s2 in i2) t.o(i2, s2) && !t.o(e2, s2) && Object.defineProperty(e2, s2, { enumerable: true, get: i2[s2] });
      }, o: (t2, e2) => Object.prototype.hasOwnProperty.call(t2, e2), r: (t2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
      } }, e = {};
      function i(t2, e2) {
        return null == t2 && (t2 = 0), null == e2 && (e2 = 1), Math.floor(t2 + Math.random() * (e2 - t2 + 1));
      }
      t.r(e), t.d(e, { default: () => c }), Number.prototype.clamp = function(t2, e2) {
        return Math.min(Math.max(this, t2), e2);
      };
      function s(t2) {
        for (; t2.children && t2.children.length > 0; ) s(t2.children[0]), t2.remove(t2.children[0]);
        t2.geometry && t2.geometry.dispose(), t2.material && (Object.keys(t2.material).forEach((e2) => {
          t2.material[e2] && null !== t2.material[e2] && "function" == typeof t2.material[e2].dispose && t2.material[e2].dispose();
        }), t2.material.dispose());
      }
      const o = "object" == typeof window;
      let n = o && window.THREE || {};
      o && !window.VANTA && (window.VANTA = {});
      const r = o && window.VANTA || {};
      r.register = (t2, e2) => r[t2] = (t3) => new e2(t3), r.version = "0.5.24";
      const h = function() {
        return Array.prototype.unshift.call(arguments, "[VANTA]"), console.error.apply(this, arguments);
      };
      r.VantaBase = class {
        constructor(t2 = {}) {
          if (!o) return false;
          r.current = this, this.windowMouseMoveWrapper = this.windowMouseMoveWrapper.bind(this), this.windowTouchWrapper = this.windowTouchWrapper.bind(this), this.windowGyroWrapper = this.windowGyroWrapper.bind(this), this.resize = this.resize.bind(this), this.animationLoop = this.animationLoop.bind(this), this.restart = this.restart.bind(this);
          const e2 = "function" == typeof this.getDefaultOptions ? this.getDefaultOptions() : this.defaultOptions;
          if (this.options = Object.assign({ mouseControls: true, touchControls: true, gyroControls: false, minHeight: 200, minWidth: 200, scale: 1, scaleMobile: 1 }, e2), (t2 instanceof HTMLElement || "string" == typeof t2) && (t2 = { el: t2 }), Object.assign(this.options, t2), this.options.THREE && (n = this.options.THREE), this.el = this.options.el, null == this.el) h('Instance needs "el" param!');
          else if (!(this.options.el instanceof HTMLElement)) {
            const t3 = this.el;
            if (this.el = (i2 = t3, document.querySelector(i2)), !this.el) return void h("Cannot find element", t3);
          }
          var i2, s2;
          this.prepareEl(), this.initThree(), this.setSize();
          try {
            this.init();
          } catch (t3) {
            return h("Init error", t3), this.renderer && this.renderer.domElement && this.el.removeChild(this.renderer.domElement), void (this.options.backgroundColor && (console.log("[VANTA] Falling back to backgroundColor"), this.el.style.background = (s2 = this.options.backgroundColor, "number" == typeof s2 ? "#" + ("00000" + s2.toString(16)).slice(-6) : s2)));
          }
          this.initMouse(), this.resize(), this.animationLoop();
          const a2 = window.addEventListener;
          a2("resize", this.resize), window.requestAnimationFrame(this.resize), this.options.mouseControls && (a2("scroll", this.windowMouseMoveWrapper), a2("mousemove", this.windowMouseMoveWrapper)), this.options.touchControls && (a2("touchstart", this.windowTouchWrapper), a2("touchmove", this.windowTouchWrapper)), this.options.gyroControls && a2("deviceorientation", this.windowGyroWrapper);
        }
        setOptions(t2 = {}) {
          Object.assign(this.options, t2), this.triggerMouseMove();
        }
        prepareEl() {
          let t2, e2;
          if ("undefined" != typeof Node && Node.TEXT_NODE) for (t2 = 0; t2 < this.el.childNodes.length; t2++) {
            const e3 = this.el.childNodes[t2];
            if (e3.nodeType === Node.TEXT_NODE) {
              const t3 = document.createElement("span");
              t3.textContent = e3.textContent, e3.parentElement.insertBefore(t3, e3), e3.remove();
            }
          }
          for (t2 = 0; t2 < this.el.children.length; t2++) e2 = this.el.children[t2], "static" === getComputedStyle(e2).position && (e2.style.position = "relative"), "auto" === getComputedStyle(e2).zIndex && (e2.style.zIndex = 1);
          "static" === getComputedStyle(this.el).position && (this.el.style.position = "relative");
        }
        applyCanvasStyles(t2, e2 = {}) {
          Object.assign(t2.style, { position: "absolute", zIndex: 0, top: 0, left: 0, background: "" }), Object.assign(t2.style, e2), t2.classList.add("vanta-canvas");
        }
        initThree() {
          n.WebGLRenderer ? (this.renderer = new n.WebGLRenderer({ alpha: true, antialias: true }), this.el.appendChild(this.renderer.domElement), this.applyCanvasStyles(this.renderer.domElement), isNaN(this.options.backgroundAlpha) && (this.options.backgroundAlpha = 1), this.scene = new n.Scene()) : console.warn("[VANTA] No THREE defined on window");
        }
        getCanvasElement() {
          return this.renderer ? this.renderer.domElement : this.p5renderer ? this.p5renderer.canvas : void 0;
        }
        getCanvasRect() {
          const t2 = this.getCanvasElement();
          return !!t2 && t2.getBoundingClientRect();
        }
        windowMouseMoveWrapper(t2) {
          const e2 = this.getCanvasRect();
          if (!e2) return false;
          const i2 = t2.clientX - e2.left, s2 = t2.clientY - e2.top;
          i2 >= 0 && s2 >= 0 && i2 <= e2.width && s2 <= e2.height && (this.mouseX = i2, this.mouseY = s2, this.options.mouseEase || this.triggerMouseMove(i2, s2));
        }
        windowTouchWrapper(t2) {
          const e2 = this.getCanvasRect();
          if (!e2) return false;
          if (1 === t2.touches.length) {
            const i2 = t2.touches[0].clientX - e2.left, s2 = t2.touches[0].clientY - e2.top;
            i2 >= 0 && s2 >= 0 && i2 <= e2.width && s2 <= e2.height && (this.mouseX = i2, this.mouseY = s2, this.options.mouseEase || this.triggerMouseMove(i2, s2));
          }
        }
        windowGyroWrapper(t2) {
          const e2 = this.getCanvasRect();
          if (!e2) return false;
          const i2 = Math.round(2 * t2.alpha) - e2.left, s2 = Math.round(2 * t2.beta) - e2.top;
          i2 >= 0 && s2 >= 0 && i2 <= e2.width && s2 <= e2.height && (this.mouseX = i2, this.mouseY = s2, this.options.mouseEase || this.triggerMouseMove(i2, s2));
        }
        triggerMouseMove(t2, e2) {
          void 0 === t2 && void 0 === e2 && (this.options.mouseEase ? (t2 = this.mouseEaseX, e2 = this.mouseEaseY) : (t2 = this.mouseX, e2 = this.mouseY)), this.uniforms && (this.uniforms.iMouse.value.x = t2 / this.scale, this.uniforms.iMouse.value.y = e2 / this.scale);
          const i2 = t2 / this.width, s2 = e2 / this.height;
          "function" == typeof this.onMouseMove && this.onMouseMove(i2, s2);
        }
        setSize() {
          this.scale || (this.scale = 1), "undefined" != typeof navigator && (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 600) && this.options.scaleMobile ? this.scale = this.options.scaleMobile : this.options.scale && (this.scale = this.options.scale), this.width = Math.max(this.el.offsetWidth, this.options.minWidth), this.height = Math.max(this.el.offsetHeight, this.options.minHeight);
        }
        initMouse() {
          (!this.mouseX && !this.mouseY || this.mouseX === this.options.minWidth / 2 && this.mouseY === this.options.minHeight / 2) && (this.mouseX = this.width / 2, this.mouseY = this.height / 2, this.triggerMouseMove(this.mouseX, this.mouseY));
        }
        resize() {
          this.setSize(), this.camera && (this.camera.aspect = this.width / this.height, "function" == typeof this.camera.updateProjectionMatrix && this.camera.updateProjectionMatrix()), this.renderer && (this.renderer.setSize(this.width, this.height), this.renderer.setPixelRatio(window.devicePixelRatio / this.scale)), "function" == typeof this.onResize && this.onResize();
        }
        isOnScreen() {
          const t2 = this.el.offsetHeight, e2 = this.el.getBoundingClientRect(), i2 = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop, s2 = e2.top + i2;
          return s2 - window.innerHeight <= i2 && i2 <= s2 + t2;
        }
        animationLoop() {
          this.t || (this.t = 0), this.t2 || (this.t2 = 0);
          const t2 = performance.now();
          if (this.prevNow) {
            let e2 = (t2 - this.prevNow) / (1e3 / 60);
            e2 = Math.max(0.2, Math.min(e2, 5)), this.t += e2, this.t2 += (this.options.speed || 1) * e2, this.uniforms && (this.uniforms.iTime.value = 0.016667 * this.t2);
          }
          return this.prevNow = t2, this.options.mouseEase && (this.mouseEaseX = this.mouseEaseX || this.mouseX || 0, this.mouseEaseY = this.mouseEaseY || this.mouseY || 0, Math.abs(this.mouseEaseX - this.mouseX) + Math.abs(this.mouseEaseY - this.mouseY) > 0.1 && (this.mouseEaseX += 0.05 * (this.mouseX - this.mouseEaseX), this.mouseEaseY += 0.05 * (this.mouseY - this.mouseEaseY), this.triggerMouseMove(this.mouseEaseX, this.mouseEaseY))), (this.isOnScreen() || this.options.forceAnimate) && ("function" == typeof this.onUpdate && this.onUpdate(), this.scene && this.camera && (this.renderer.render(this.scene, this.camera), this.renderer.setClearColor(this.options.backgroundColor, this.options.backgroundAlpha)), this.fps && this.fps.update && this.fps.update(), "function" == typeof this.afterRender && this.afterRender()), this.req = window.requestAnimationFrame(this.animationLoop);
        }
        restart() {
          if (this.scene) for (; this.scene.children.length; ) this.scene.remove(this.scene.children[0]);
          "function" == typeof this.onRestart && this.onRestart(), this.init();
        }
        init() {
          "function" == typeof this.onInit && this.onInit();
        }
        destroy() {
          "function" == typeof this.onDestroy && this.onDestroy();
          const t2 = window.removeEventListener;
          t2("touchstart", this.windowTouchWrapper), t2("touchmove", this.windowTouchWrapper), t2("scroll", this.windowMouseMoveWrapper), t2("mousemove", this.windowMouseMoveWrapper), t2("deviceorientation", this.windowGyroWrapper), t2("resize", this.resize), window.cancelAnimationFrame(this.req);
          const e2 = this.scene;
          e2 && e2.children && s(e2), this.renderer && (this.renderer.domElement && this.el.removeChild(this.renderer.domElement), this.renderer = null, this.scene = null), r.current === this && (r.current = null);
        }
      };
      const a = r.VantaBase;
      let p = "object" == typeof window && window.THREE;
      class l extends a {
        static initClass() {
          this.prototype.ww = 100, this.prototype.hh = 80, this.prototype.waveNoise = 4;
        }
        constructor(t2) {
          p = t2.THREE || p, super(t2);
        }
        getMaterial() {
          const t2 = { color: this.options.color, shininess: this.options.shininess, flatShading: true, side: p.DoubleSide };
          return new p.MeshPhongMaterial(t2);
        }
        onInit() {
          let t2, e2;
          const s2 = this.getMaterial(), o2 = new p.BufferGeometry();
          this.gg = [];
          const n2 = [];
          for (t2 = 0; t2 <= this.ww; t2++) for (this.gg[t2] = [], e2 = 0; e2 <= this.hh; e2++) {
            const i2 = n2.length, s3 = new p.Vector3(18 * (t2 - 0.5 * this.ww), (null == (r2 = 0) && (r2 = 0), null == (h2 = this.waveNoise) && (h2 = 1), r2 + Math.random() * (h2 - r2) - 10), 18 * (0.5 * this.hh - e2));
            n2.push(s3), this.gg[t2][e2] = i2;
          }
          var r2, h2;
          o2.setFromPoints(n2);
          const a2 = [];
          for (t2 = 1; t2 <= this.ww; t2++) for (e2 = 1; e2 <= this.hh; e2++) {
            let s3, o3;
            const n3 = this.gg[t2][e2], r3 = this.gg[t2][e2 - 1], h3 = this.gg[t2 - 1][e2], p2 = this.gg[t2 - 1][e2 - 1];
            i(0, 1) ? (s3 = [p2, r3, h3], o3 = [r3, h3, n3]) : (s3 = [p2, r3, n3], o3 = [p2, h3, n3]), a2.push(...s3, ...o3);
          }
          o2.setIndex(a2), this.plane = new p.Mesh(o2, s2), this.scene.add(this.plane);
          const l2 = new p.AmbientLight(16777215, 0.9);
          this.scene.add(l2);
          const c2 = new p.PointLight(16777215, 0.9);
          c2.position.set(-100, 250, -100), this.scene.add(c2), this.camera = new p.PerspectiveCamera(35, this.width / this.height, 50, 1e4), this.cameraPosition = new p.Vector3(240, 200, 390), this.cameraTarget = new p.Vector3(140, -30, 190), this.camera.position.copy(this.cameraPosition), this.scene.add(this.camera);
        }
        onUpdate() {
          let t2;
          this.plane.material.color.set(this.options.color), this.plane.material.shininess = this.options.shininess, this.camera.ox = this.cameraPosition.x / this.options.zoom, this.camera.oy = this.cameraPosition.y / this.options.zoom, this.camera.oz = this.cameraPosition.z / this.options.zoom, null != this.controls && this.controls.update();
          const e2 = this.camera;
          Math.abs(e2.tx - e2.position.x) > 0.01 && (t2 = e2.tx - e2.position.x, e2.position.x += 0.02 * t2), Math.abs(e2.ty - e2.position.y) > 0.01 && (t2 = e2.ty - e2.position.y, e2.position.y += 0.02 * t2), Math.abs(e2.tz - e2.position.z) > 0.01 && (t2 = e2.tz - e2.position.z, e2.position.z += 0.02 * t2), e2.lookAt(this.cameraTarget), this.oy = this.oy || {};
          for (let t3 = 0; t3 < this.plane.geometry.attributes.position.array.length; t3 += 3) {
            const e3 = { x: this.plane.geometry.attributes.position.array[t3], y: this.plane.geometry.attributes.position.array[t3 + 1], z: this.plane.geometry.attributes.position.array[t3 + 2], oy: this.oy[t3] };
            if (e3.oy) {
              const i2 = this.options.waveSpeed, s2 = Math.sqrt(i2) * Math.cos(-e3.x - 0.7 * e3.z), o2 = Math.sin(i2 * this.t * 0.02 - i2 * e3.x * 0.025 + i2 * e3.z * 0.015 + s2), n2 = Math.pow(o2 + 1, 2) / 4;
              e3.y = e3.oy + n2 * this.options.waveHeight, this.plane.geometry.attributes.position.array[t3 + 1] = e3.y;
            } else this.oy[t3] = e3.y;
          }
          this.plane.geometry.attributes.position.setUsage(p.DynamicDrawUsage), this.plane.geometry.computeVertexNormals(), this.plane.geometry.attributes.position.needsUpdate = true, this.wireframe && (this.wireframe.geometry.fromGeometry(this.plane.geometry), this.wireframe.geometry.computeFaceNormals());
        }
        onMouseMove(t2, e2) {
          const i2 = this.camera;
          return i2.oy || (i2.oy = i2.position.y, i2.ox = i2.position.x, i2.oz = i2.position.z), i2.tx = i2.ox + 100 * (t2 - 0.5) / this.options.zoom, i2.ty = i2.oy + -100 * (e2 - 0.5) / this.options.zoom, i2.tz = i2.oz + -50 * (t2 - 0.5) / this.options.zoom;
        }
      }
      l.prototype.defaultOptions = { color: 21896, shininess: 30, waveHeight: 15, waveSpeed: 1, zoom: 1 }, l.initClass();
      const c = r.register("WAVES", l);
      return e;
    })());
  }
});

export {
  require_vanta_waves_min
};
//# sourceMappingURL=chunk-SJ77OPRW.js.map
