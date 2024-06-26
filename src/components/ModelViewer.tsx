import * as React from "react"
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { View, PanResponder } from 'react-native';
import { Renderer } from "expo-three";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { THREE } from 'expo-three';

import {
  AmbientLight,
  PointLight,
  PerspectiveCamera,
  Scene,
  AnimationAction,
  AnimationClip,
  AnimationMixer
} from "three";
import { Asset } from "expo-asset";

let timeout: number;
let mixer: AnimationMixer;
let model: THREE.Group;
let camera: PerspectiveCamera;
let clip: AnimationClip;
let action: AnimationAction;
let lastDelta = { x: 0, y: 0 };
const focusPosition = new THREE.Vector3(0, 0.7, 0);

export default function ModelViewer({ onClipLoaded, onTimeUpdated, paused, offset, setOffset }) {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {

        const { dx, dy } = gestureState;
        let { x, y } = lastDelta;
        lastDelta = { x: dx, y: dy };
        const deltaX = (x - dx) / 100;
        const deltaY = (y - dy) / 100;

        if (camera && model) {
          const matrixX = new THREE.Matrix4();
          matrixX.makeRotationX(deltaY * 0.6)

          const matrixY = new THREE.Matrix4();
          matrixY.makeRotationY(deltaX * 1.8)

          camera.position.applyMatrix4(matrixY);
          camera.position.applyMatrix4(matrixX);

          camera.lookAt(focusPosition);

        }
      },
      onPanResponderRelease: (_, __) => {
        lastDelta = { x: 0, y: 0 };
      }
    })
  ).current;


  useEffect(() => {
    return () => clearTimeout(timeout);
  }, []);

  if (action) {
    action.paused = paused;
    if (offset != 0) {
      action.time += offset;
      setOffset(0);
    }
  }

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      <GLView
        style={{ flex: 1 }}
        onContextCreate={async (gl: ExpoWebGLRenderingContext) => {
          const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

          const renderer = new Renderer({ gl });
          renderer.setSize(width, height);

          camera = new PerspectiveCamera(50, width / height, 0.1, 1000);
          camera.position.z = 3.5;
          camera.position.y = 1.5;

          const asset = Asset.fromModule(
            require("../../assets/Char_Base_animation_v2.glb",)
          );

          await asset.downloadAsync();
          const scene = new Scene();

          const ambientLight = new AmbientLight(0xaaaaaa);
          scene.add(ambientLight);

          const pointLight = new PointLight(0x999999, 2, 1000, 1);
          pointLight.position.set(0, 200, 200);
          scene.add(pointLight);

          const backLight = new PointLight(0x666666, 2, 1000, 1);
          backLight.position.set(100, -200, -200);
          scene.add(backLight);

          const loader = new GLTFLoader();

          loader.load(
            asset.uri || "",
            (gltf) => {
              model = gltf.scene;
              model.children[0].children[3].material = new THREE.MeshLambertMaterial({color: 0xaaaaaa});
              scene.add(model);
              camera.lookAt(focusPosition);
              mixer = new THREE.AnimationMixer(model);
              const clips = gltf.animations;
              clip = THREE.AnimationClip.findByName(clips, "ArmatureAction");
              action = mixer.clipAction(clip);
              console.log("paused")
              action.play();
              onClipLoaded(clip.duration);
            },
            (xhr) => {
              console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
            },
            (error) => {
              console.error("An error happened", error);
            }

          );

          const clock = new THREE.Clock();

          function update() {
            if (action) {
              onTimeUpdated(action.time);
            }
            if (mixer)
              mixer.update(clock.getDelta());
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
    </View>
  );
}