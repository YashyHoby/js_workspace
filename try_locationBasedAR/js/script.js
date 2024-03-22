const scene = document.querySelector('a-scene');

// ユーザーの現在地を取得
navigator.geolocation.getCurrentPosition((position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // 3Dモデルをユーザーの位置に配置
  const model = document.createElement('a-entity');
  model.setAttribute('gltf-model', 'model.gltf');
  model.setAttribute('position', `${latitude} ${longitude} 0`);
  model.setAttribute('scale', '1 1 1');
  model.setAttribute('rotation', '0 0 0');

  scene.appendChild(model);
});
