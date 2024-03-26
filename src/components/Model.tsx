import * as React from "react"
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { StyleSheet, View, PanResponder } from 'react-native';
import { Renderer } from "expo-three";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { THREE } from 'expo-three';

import {
  AmbientLight,
  PointLight,
  PerspectiveCamera,
  Scene,
} from "three";
import { Asset } from "expo-asset";

let timeout: number;

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
          camera.position.y = 0;

          const asset = Asset.fromModule(
            require("../../assets/female.glb")
          );

          await asset.downloadAsync();
          const scene = new Scene();

          const ambientLight = new AmbientLight(0x888888);
          scene.add(ambientLight);

          const pointLight = new PointLight(0xffffff, 2, 1000, 1);
          pointLight.position.set(0, 200, 200);
          scene.add(pointLight);

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