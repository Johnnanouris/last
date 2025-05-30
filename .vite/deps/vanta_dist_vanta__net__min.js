import {
  __commonJS
} from "./chunk-G3PMV62Z.js";

// node_modules/vanta/dist/vanta.net.min.js
var require_vanta_net_min = __commonJS({
  "node_modules/vanta/dist/vanta.net.min.js"(exports, module) {
    !function(t, e) {
      "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports._vantaEffect = e() : t._vantaEffect = e();
    }("undefined" != typeof self ? self : exports, () => (() => {
      "use strict";
      var t = { d: (e2, i2) => {
        for (var s2 in i2) t.o(i2, s2) && !t.o(e2, s2) && Object.defineProperty(e2, s2, { enumerable: true, get: i2[s2] });
      }, o: (t2, e2) => Object.prototype.hasOwnProperty.call(t2, e2), r: (t2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
      } }, e = {};
      function i() {
        return "undefined" != typeof navigator ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 600 : null;
      }
      function s(t2, e2) {
        return null == t2 && (t2 = 0), null == e2 && (e2 = 1), Math.floor(t2 + Math.random() * (e2 - t2 + 1));
      }
      t.r(e), t.d(e, { default: () => u }), Number.prototype.clamp = function(t2, e2) {
        return Math.min(Math.max(this, t2), e2);
      };
      const o = (t2) => 0.299 * t2.r + 0.587 * t2.g + 0.114 * t2.b;
      function n(t2) {
        for (; t2.children && t2.children.length > 0; ) n(t2.children[0]), t2.remove(t2.children[0]);
        t2.geometry && t2.geometry.dispose(), t2.material && (Object.keys(t2.material).forEach((e2) => {
          t2.material[e2] && null !== t2.material[e2] && "function" == typeof t2.material[e2].dispose && t2.material[e2].dispose();
        }), t2.material.dispose());
      }
      const r = "object" == typeof window;
      let h = r && window.THREE || {};
      r && !window.VANTA && (window.VANTA = {});
      const a = r && window.VANTA || {};
      a.register = (t2, e2) => a[t2] = (t3) => new e2(t3), a.version = "0.5.24";
      const l = function() {
        return Array.prototype.unshift.call(arguments, "[VANTA]"), console.error.apply(this, arguments);
      };
      a.VantaBase = class {
        constructor(t2 = {}) {
          if (!r) return false;
          a.current = this, this.windowMouseMoveWrapper = this.windowMouseMoveWrapper.bind(this), this.windowTouchWrapper = this.windowTouchWrapper.bind(this), this.windowGyroWrapper = this.windowGyroWrapper.bind(this), this.resize = this.resize.bind(this), this.animationLoop = this.animationLoop.bind(this), this.restart = this.restart.bind(this);
          const e2 = "function" == typeof this.getDefaultOptions ? this.getDefaultOptions() : this.defaultOptions;
          if (this.options = Object.assign({ mouseControls: true, touchControls: true, gyroControls: false, minHeight: 200, minWidth: 200, scale: 1, scaleMobile: 1 }, e2), (t2 instanceof HTMLElement || "string" == typeof t2) && (t2 = { el: t2 }), Object.assign(this.options, t2), this.options.THREE && (h = this.options.THREE), this.el = this.options.el, null == this.el) l('Instance needs "el" param!');
          else if (!(this.options.el instanceof HTMLElement)) {
            const t3 = this.el;
            if (this.el = (i2 = t3, document.querySelector(i2)), !this.el) return void l("Cannot find element", t3);
          }
          var i2, s2;
          this.prepareEl(), this.initThree(), this.setSize();
          try {
            this.init();
          } catch (t3) {
            return l("Init error", t3), this.renderer && this.renderer.domElement && this.el.removeChild(this.renderer.domElement), void (this.options.backgroundColor && (console.log("[VANTA] Falling back to backgroundColor"), this.el.style.background = (s2 = this.options.backgroundColor, "number" == typeof s2 ? "#" + ("00000" + s2.toString(16)).slice(-6) : s2)));
          }
          this.initMouse(), this.resize(), this.animationLoop();
          const o2 = window.addEventListener;
          o2("resize", this.resize), window.requestAnimationFrame(this.resize), this.options.mouseControls && (o2("scroll", this.windowMouseMoveWrapper), o2("mousemove", this.windowMouseMoveWrapper)), this.options.touchControls && (o2("touchstart", this.windowTouchWrapper), o2("touchmove", this.windowTouchWrapper)), this.options.gyroControls && o2("deviceorientation", this.windowGyroWrapper);
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
          h.WebGLRenderer ? (this.renderer = new h.WebGLRenderer({ alpha: true, antialias: true }), this.el.appendChild(this.renderer.domElement), this.applyCanvasStyles(this.renderer.domElement), isNaN(this.options.backgroundAlpha) && (this.options.backgroundAlpha = 1), this.scene = new h.Scene()) : console.warn("[VANTA] No THREE defined on window");
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
          this.scale || (this.scale = 1), i() && this.options.scaleMobile ? this.scale = this.options.scaleMobile : this.options.scale && (this.scale = this.options.scale), this.width = Math.max(this.el.offsetWidth, this.options.minWidth), this.height = Math.max(this.el.offsetHeight, this.options.minHeight);
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
          e2 && e2.children && n(e2), this.renderer && (this.renderer.domElement && this.el.removeChild(this.renderer.domElement), this.renderer = null, this.scene = null), a.current === this && (a.current = null);
        }
      };
      const c = a.VantaBase;
      let p = "object" == typeof window && window.THREE;
      class d extends c {
        static initClass() {
          this.prototype.defaultOptions = { color: 16727937, backgroundColor: 2299196, points: 10, maxDistance: 20, spacing: 15, showDots: true };
        }
        constructor(t2) {
          p = t2.THREE || p, super(t2);
        }
        genPoint(t2, e2, i2) {
          let s2;
          if (this.points || (this.points = []), this.options.showDots) {
            const t3 = new p.SphereGeometry(0.25, 12, 12), e3 = new p.MeshLambertMaterial({ color: this.options.color });
            s2 = new p.Mesh(t3, e3);
          } else s2 = new p.Object3D();
          var o2, n2;
          return this.cont.add(s2), s2.ox = t2, s2.oy = e2, s2.oz = i2, s2.position.set(t2, e2, i2), s2.r = (null == (o2 = -2) && (o2 = 0), null == (n2 = 2) && (n2 = 1), o2 + Math.random() * (n2 - o2)), this.points.push(s2);
        }
        onInit() {
          this.cont = new p.Group(), this.cont.position.set(0, 0, 0), this.scene.add(this.cont);
          let t2 = this.options.points, { spacing: e2 } = this.options;
          i() && (t2 = ~~(0.75 * t2), e2 = ~~(0.65 * e2));
          const n2 = t2 * t2 * 2;
          this.linePositions = new Float32Array(n2 * n2 * 3), this.lineColors = new Float32Array(n2 * n2 * 3);
          const r2 = o(new p.Color(this.options.color)), h2 = o(new p.Color(this.options.backgroundColor));
          this.blending = r2 > h2 ? "additive" : "subtractive";
          const a2 = new p.BufferGeometry();
          a2.setAttribute("position", new p.BufferAttribute(this.linePositions, 3).setUsage(p.DynamicDrawUsage)), a2.setAttribute("color", new p.BufferAttribute(this.lineColors, 3).setUsage(p.DynamicDrawUsage)), a2.computeBoundingSphere(), a2.setDrawRange(0, 0);
          const l2 = new p.LineBasicMaterial({ vertexColors: p.VertexColors, blending: "additive" === this.blending ? p.AdditiveBlending : null, transparent: true });
          this.linesMesh = new p.LineSegments(a2, l2), this.cont.add(this.linesMesh);
          for (let i2 = 0; i2 <= t2; i2++) for (let o2 = 0; o2 <= t2; o2++) {
            const n3 = s(-3, 3), r3 = (i2 - t2 / 2) * e2 + s(-5, 5);
            let h3 = (o2 - t2 / 2) * e2 + s(-5, 5);
            i2 % 2 && (h3 += 0.5 * e2), this.genPoint(r3, n3 - s(5, 15), h3), this.genPoint(r3 + s(-5, 5), n3 + s(5, 15), h3 + s(-5, 5));
          }
          this.camera = new p.PerspectiveCamera(25, this.width / this.height, 0.01, 1e4), this.camera.position.set(50, 100, 150), this.scene.add(this.camera);
          const c2 = new p.AmbientLight(16777215, 0.75);
          return this.scene.add(c2), this.spot = new p.SpotLight(16777215, 1), this.spot.position.set(0, 200, 0), this.spot.distance = 400, this.spot.target = this.cont, this.scene.add(this.spot);
        }
        onDestroy() {
          this.scene && this.scene.remove(this.linesMesh), this.spot = this.points = this.linesMesh = this.lineColors = this.linePositions = null;
        }
        setOptions(t2) {
          super.setOptions(t2), t2.color && this.points.forEach((e2) => {
            e2.material.color = new p.Color(t2.color);
          });
        }
        onUpdate() {
          let t2;
          const e2 = this.camera;
          Math.abs(e2.tx - e2.position.x) > 0.01 && (t2 = e2.tx - e2.position.x, e2.position.x += 0.02 * t2), Math.abs(e2.ty - e2.position.y) > 0.01 && (t2 = e2.ty - e2.position.y, e2.position.y += 0.02 * t2), e2.lookAt(new p.Vector3(0, 0, 0));
          let i2 = 0, s2 = 0, o2 = 0;
          const n2 = new p.Color(this.options.backgroundColor), r2 = new p.Color(this.options.color), h2 = r2.clone().sub(n2);
          this.rayCaster && this.rayCaster.setFromCamera(new p.Vector2(this.rcMouseX, this.rcMouseY), this.camera);
          for (let t3 = 0; t3 < this.points.length; t3++) {
            let e3, a2;
            const l2 = this.points[t3];
            a2 = this.rayCaster ? this.rayCaster.ray.distanceToPoint(l2.position) : 1e3;
            const c2 = a2.clamp(5, 15);
            if (l2.scale.x = l2.scale.y = l2.scale.z = (0.25 * (15 - c2)).clamp(1, 100), 0 !== l2.r) {
              let t4 = Math.atan2(l2.position.z, l2.position.x);
              e3 = Math.sqrt(l2.position.z * l2.position.z + l2.position.x * l2.position.x), t4 += 25e-5 * l2.r, l2.position.x = e3 * Math.cos(t4), l2.position.z = e3 * Math.sin(t4);
            }
            for (let a3 = t3; a3 < this.points.length; a3++) {
              const t4 = this.points[a3], c3 = l2.position.x - t4.position.x, d2 = l2.position.y - t4.position.y, u2 = l2.position.z - t4.position.z;
              if (e3 = Math.sqrt(c3 * c3 + d2 * d2 + u2 * u2), e3 < this.options.maxDistance) {
                let a4;
                const c4 = (2 * (1 - e3 / this.options.maxDistance)).clamp(0, 1);
                a4 = "additive" === this.blending ? new p.Color(0).lerp(h2, c4) : n2.clone().lerp(r2, c4), this.linePositions[i2++] = l2.position.x, this.linePositions[i2++] = l2.position.y, this.linePositions[i2++] = l2.position.z, this.linePositions[i2++] = t4.position.x, this.linePositions[i2++] = t4.position.y, this.linePositions[i2++] = t4.position.z, this.lineColors[s2++] = a4.r, this.lineColors[s2++] = a4.g, this.lineColors[s2++] = a4.b, this.lineColors[s2++] = a4.r, this.lineColors[s2++] = a4.g, this.lineColors[s2++] = a4.b, o2++;
              }
            }
          }
          return this.linesMesh.geometry.setDrawRange(0, 2 * o2), this.linesMesh.geometry.attributes.position.needsUpdate = true, this.linesMesh.geometry.attributes.color.needsUpdate = true, 1e-3 * this.t;
        }
        onMouseMove(t2, e2) {
          const i2 = this.camera;
          i2.oy || (i2.oy = i2.position.y, i2.ox = i2.position.x, i2.oz = i2.position.z);
          const s2 = Math.atan2(i2.oz, i2.ox), o2 = Math.sqrt(i2.oz * i2.oz + i2.ox * i2.ox), n2 = s2 + 2 * (t2 - 0.5) * (this.options.mouseCoeffX || 1);
          i2.tz = o2 * Math.sin(n2), i2.tx = o2 * Math.cos(n2), i2.ty = i2.oy + 50 * (e2 - 0.5) * (this.options.mouseCoeffY || 1), this.rayCaster, this.rcMouseX = 2 * t2 - 1, this.rcMouseY = 2 * -t2 + 1;
        }
        onRestart() {
          this.scene && this.scene.remove(this.linesMesh), this.points = [];
        }
      }
      d.initClass();
      const u = a.register("NET", d);
      return e;
    })());
  }
});
export default require_vanta_net_min();
//# sourceMappingURL=vanta_dist_vanta__net__min.js.map
