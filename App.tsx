import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { StyleSheet, View, PanResponder } from 'react-native';
import { Renderer } from "expo-three";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { BVHLoader } from "three/examples/jsm/loaders/BVHLoader";
import { THREE } from 'expo-three';

import {
  AmbientLight,
  PerspectiveCamera,
  Scene,
} from "three";
import { Asset } from "expo-asset";

let timeout: number;
let mixer;
// let mesh;
let model: THREE.Group;
let camera: PerspectiveCamera;

export default function App() {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
       
        const { moveX, moveY, dx, dy } = gestureState;
        const deltaX = dx / 100; 
        const deltaY = dy / 100;

      
        if (camera && model) {
          camera.position.x = model.position.x + Math.sin(deltaX) * 5;
          camera.position.z = model.position.z + Math.cos(deltaX) * 5;
          camera.position.y = model.position.y + deltaY * 2; 
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
            require("./assets/Char_Base_riggedAnimation.glb",)
            // require("./assets/pirouette.bvh")
          );

          // const asset2 = Asset.fromModule(
          //   // require("./assets/Char_Base_rigged.glb",)
          //   require("./assets/dataset-2_raise-up-both-hands_active_001.bvh")
          // );


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
              // mesh = new THREE.SkinnedMesh( model );
              mixer = new THREE.AnimationMixer(model);
              const clips = gltf.animations;
              const clip = THREE.AnimationClip.findByName(clips, "ArmatureAction.001");
              const action = mixer.clipAction(clip);
              action.play();
    //           clips.forEach(function(clip) {
    
    //               action = mixer.clipAction(model.animations[0]);
    // action.play();
    //           });
            },
            (xhr) => {
              console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
            },
            (error) => {
              console.error("An error happened", error);
            }
            
          );

    //       const loader2 = new BVHLoader();
    //       loader2.load(  asset2.uri || "",
    //              function (bvh) {

    //         const skeletonHelper = new THREE.SkeletonHelper( bvh.skeleton.bones[ 0 ] );
    // // 
    //         scene.add( bvh.skeleton.bones[ 0 ] );
    //         scene.add( skeletonHelper );

            
    //         const skeleton = new THREE.Skeleton( bvh.skeleton.bones[ 0 ] );

    //         // see example from THREE.Skeleton
    //         const rootBone = skeleton.bones[ 0 ];
    //         mesh.add( rootBone );

    //         // bind the skeleton to the mesh
    //         mesh.bind( skeleton );
    
    //         // play animation
    //         mixer = new THREE.AnimationMixer( bvh.skeleton.bones[ 0 ] );
    //         mixer.clipAction( bvh.clip ).play();
    
    //       } );


          const clock = new THREE.Clock();
          
          function update() {
            if (mixer)
            mixer.update( clock.getDelta() );
          }

          // function update() {
           
          // }

          // const clock = new THREE.Clock();
          // function animate() {
          //   mixer.update();
          //   renderer.render(scene, camera);
          // }

          // renderer.setAnimationLoop(animate);

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