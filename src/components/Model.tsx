import * as React from "react"
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { StyleSheet, View, PanResponder } from 'react-native';
import { Renderer } from "expo-three";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { BVHLoader } from "three/examples/jsm/loaders/BVHLoader";
import { THREE } from 'expo-three';

import {
  AmbientLight,
  PointLight,
  PerspectiveCamera,
  Scene,
} from "three";
import { Asset } from "expo-asset";

let timeout: number;
let mixer;
let mesh;
let model: THREE.Group;
let camera: PerspectiveCamera;

export default function Model() {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
       
        const { moveX, moveY, dx, dy } = gestureState;
        const deltaX = dx / 100; 
        const deltaY = dy / 100;
        
        if (camera && model) {
          const matrixX = new THREE.Matrix4();
          matrixX.makeRotationX(-deltaY * 0.04)

          const matrixY = new THREE.Matrix4();
          matrixY.makeRotationY(-deltaX * 0.08)

          camera.position.applyMatrix4(matrixY);
          camera.position.applyMatrix4(matrixX);
          
          camera.lookAt(model.position);
        
        }
      },
    })
  ).current;


  useEffect(() => {
    return () => clearTimeout(timeout);
  }, []);

  const onContextCreate = async (gl) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
  };

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      <GLView
        style={{ flex: 1 }}
        onContextCreate={async (gl: ExpoWebGLRenderingContext) => {
          const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

          const renderer = new Renderer({ gl });
          renderer.setSize(width, height);

          camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
          camera.position.z = 5;
          camera.position.y = 1.5;

          const asset = Asset.fromModule(
            require("../../assets/Char_Base_riggedAnimation.glb",)
          );

          await asset.downloadAsync();
          const scene = new Scene();

          const ambientLight = new AmbientLight(0x101010);
          scene.add(ambientLight);

          const loader = new GLTFLoader();
          
          loader.load(
            asset.uri || "",
            (gltf) => {
              model = gltf.scene;
              scene.add(model);
              mesh = new THREE.SkinnedMesh( model );
              mixer = new THREE.AnimationMixer(model);
              const clips = gltf.animations;
              const clip = THREE.AnimationClip.findByName(clips, "ArmatureAction.001");
              const action = mixer.clipAction(clip);
              action.play();
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
            if (mixer)
            mixer.update( clock.getDelta() );
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