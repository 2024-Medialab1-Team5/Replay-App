import { GLView } from "expo-gl";
import { StyleSheet, View } from 'react-native';
import { Renderer, TextureLoader } from "expo-three";
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  AmbientLight,
  BoxBufferGeometry,
  Mesh,
  PointLight,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  SpotLight,
} from "three";
import { Asset } from "expo-asset";

let playing = true;

let model: THREE.Group;

export default function App() {
  useEffect(() => {
  return () => clearTimeout(timeout);
  }, []);

  const onContextCreate = async (gl) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const sceneColor = 0xaaaaaa;
  };

  return (
    <GLView
      style={{ flex: 1 }}
      onContextCreate={async (gl: ExpoWebGLRenderingContext) => {
        const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

        const renderer = new Renderer({ gl });
        renderer.setSize(width, height);

        const camera = new PerspectiveCamera(120, width / height, 0.01, 1000);
        camera.position.z = 5;
        camera.position.y = 1.5;
        const asset = Asset.fromModule(
          require("./assets/female.glb")
        );
        await asset.downloadAsync();
        const scene = new Scene();

        const ambientLight = new AmbientLight(0x101010);
        scene.add(ambientLight);

        const pointLight = new PointLight(0xffffff, 2, 1000, 1);
        pointLight.position.set(0, 200, 200);
        scene.add(pointLight);

        const spotLight = new SpotLight(0xffffff, 0.5);
        spotLight.position.set(0, 500, 100);
        spotLight.lookAt(scene.position);
        scene.add(spotLight);

        const loader = new GLTFLoader();
        loader.load(
          asset.uri || "",
          (gltf) => {
            model = gltf.scene;
            scene.add(model);
          },
          (xhr) => {
            console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
          },
          (error) => {
            console.error("An error happened", error);
          }
        );

        function update() {
          if (model)
          model.rotation.y += 0.004;
        }

        const render = () => {
          timeout = requestAnimationFrame(render);
          update();
          renderer.render(scene, camera);
          gl.endFrameEXP();
        };
        render();
      }}
    />
  );
}