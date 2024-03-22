import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// シーンの設定
const scene = new THREE.Scene();
const light = new THREE.AmbientLight(0xffffff, 3); //環境光
scene.add(light);
scene.background = new THREE.Color( 0x404040 ); //背景色

//カメラの設定
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

// レンダラーの設定
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// マテリアル作成 (必要に応じて置き換えてください)
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

// 時間測定，アニメーション管理用
const clock = new THREE.Clock();

// マウス，タッチ操作の有効化
const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

class ObjectLoder{
  path;
  obj;
  animations;
  animation;
  mixer;

  async init(path_){
    this.path = path_;
    await this.loadObj();
    return this;
  }

  async loadObj(){
    try{
      const loader = new GLTFLoader();
      const gltf = await loader.loadAsync(this.path);
      this.animations = gltf.animations;
      this.obj = gltf.scene;
      this.obj.scale.set(0.1, 0.1, 0.1); 
      this.obj.position.set(0, 0, 0); 
    }catch(error){
      console.error("モデルのロード中にエラーが発生しました:", error);
    }
  }

  setAnimation(num){
    try{
      if(this.animations[num]){
        this.mixer = new THREE.AnimationMixer(this.obj);
        this.animation = this.mixer.clipAction(this.animations[num]);
        this.animation.play();
      }
    }catch(error){
      console.error("アニメーションのロード中にエラーが発生しました:", error);
    }
  }

}

async function main(){
  const cat = await new ObjectLoder().init('glb/an_animated_cat.glb');
  cat.setAnimation(0);
  cat.obj.position.set(1,0,0);
  scene.add(cat.obj);

  const shiba = await new ObjectLoder().init('glb/shiba.glb');
  shiba.obj.scale.set(1.5,1.5,1.5);
  shiba.obj.position.set(-1.2,0.5,0);
  scene.add(shiba.obj);

  function animate() {
    renderer.render(scene, camera);
    cat.mixer.update(clock.getDelta());
    cat.obj.rotation.y+=0.02;
    shiba.obj.rotation.x+=0.02;
    requestAnimationFrame(animate);
  }
  
  animate();
}


if (WebGL.isWebGLAvailable()) {
  main();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById('container').appendChild(warning);
}