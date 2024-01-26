const Panorama = {
  scene: new THREE.Scene(),
  /**
   * 刷新图片
   * @param imgPath
   */
  updateMesh: function (imgPath) {
    // 这里每次都会重置参数，不想重置就把下面注释掉
    this.resetParams();
    const mesh = this.scene.getObjectByName("pano");
    // 刷新
    const material = mesh.material;
    material.map = null;
    const texture = new THREE.TextureLoader().load(imgPath);
    material.map = texture;
  },
  /**
   * 初始化
   * @param container dom元素
   * @param imgPath 图像路径
   * @param compassAngle 照片朝向，0-360角度 正北方为0，顺时针为正
   */
  init: function (container, imgPath, compassAngle) {
    const _t = this;
    const scene = this.scene;
    // 透视投影相机
    // fov, aspect, near, far
    const camera = new THREE.PerspectiveCamera(
      95,
      container.offsetWidth / container.offsetHeight,
      1,
      1100
    );

    const texture = new THREE.TextureLoader().load(imgPath);
    // 基本材质 不响应光源
    const material = new THREE.MeshBasicMaterial({ map: texture });
    // 球体
    // radius半径, segmentsWidth经度上的切片数, segmentsHeight纬度上的切片数
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale(-1, 1, 1);

    // 网格
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = "pano";
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    // 设定渲染器宽高
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    container.style.touchAction = "none";

    container.addEventListener("pointerdown", onPointerDown);

    container.addEventListener("wheel", onDocumentMouseWheel);

    container.addEventListener("resize", onWindowResize);

    function onWindowResize() {
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(container.offsetWidth, container.offsetHeight);
    }

    function onPointerDown(event) {
      if (event.isPrimary === false) return;

      _t.isUserInteracting = true;

      _t.onPointerDownMouseX = event.clientX;
      _t.onPointerDownMouseY = event.clientY;

      _t.onPointerDownLon = _t.lon;
      _t.onPointerDownLat = _t.lat;

      container.addEventListener("pointermove", onPointerMove);
      container.addEventListener("pointerup", onPointerUp);
    }

    function onPointerMove(event) {
      if (event.isPrimary === false) return;
      _t.lon =
        (_t.onPointerDownMouseX - event.clientX) * 0.1 + _t.onPointerDownLon;
      _t.lat =
        (_t.onPointerDownMouseY - event.clientY) * 0.1 + _t.onPointerDownLat;
    }

    function onPointerUp(event) {
      if (event.isPrimary === false) return;

      _t.isUserInteracting = false;

      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
    }

    function onDocumentMouseWheel(event) {
      const fov = camera.fov + event.deltaY * 0.05;

      camera.fov = THREE.MathUtils.clamp(fov, 10, 75);

      camera.updateProjectionMatrix();
    }

    function animate() {
      requestAnimationFrame(animate);
      update();
    }

    function update() {
      _t.lat = Math.max(-85, Math.min(85, _t.lat));
      _t.phi = THREE.MathUtils.degToRad(compassAngle - _t.lat);
      _t.theta = THREE.MathUtils.degToRad(_t.lon);

      const x = 500 * Math.sin(_t.phi) * Math.cos(_t.theta);
      const y = 500 * Math.cos(_t.phi);
      const z = 500 * Math.sin(_t.phi) * Math.sin(_t.theta);

      camera.lookAt(x, y, z);

      renderer.render(scene, camera);
    }

    animate();
  },
  resetParams: function () {
    this.isUserInteracting = false;
    this.onPointerDownMouseX = 0;
    this.onPointerDownMouseY = 0;
    this.lon = 0;
    this.onPointerDownLon = 0;
    this.lat = 0;
    this.onPointerDownLat = 0;
    this.phi = 0;
    this.theta = 0;
  },
  isUserInteracting: false,
  onPointerDownMouseX: 0,
  onPointerDownMouseY: 0,
  lon: 0,
  onPointerDownLon: 0,
  lat: 0,
  onPointerDownLat: 0,
  phi: 0,
  theta: 0,
};
