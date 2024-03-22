import { GLView } from "expo-gl";
import { StyleSheet, View } from 'react-native';
import { Renderer, TextureLoader } from "expo-three";
import { useEffect } from "react";
import {
  AmbientLight,
  BoxBufferGeometry,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
} from "three";
import { Title, Button } from 'react-native-paper';

let playing = true;

const Model = () => {
    useEffect(() => {
        // Clear the animation loop when the component unmounts
      return () => clearTimeout(timeout);
      }, []);
    
      const onContextCreate = async (gl) => {
        const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
        const sceneColor = 0xaaaaaa;
    
        // Create a WebGLRenderer without a DOM element
        const renderer = new Renderer({ gl });
        renderer.setSize(width, height);
        renderer.setClearColor(sceneColor);
    
        const camera = new PerspectiveCamera(70, width / height, 0.01, 1000);
        camera.position.set(2, 2, 2);
    
        const scene = new Scene();
    
        const ambientLight = new AmbientLight(0xeeeeee);
        scene.add(ambientLight);
    
        const cube = new IconMesh();
        scene.add(cube);
    
        camera.lookAt(cube.position);
    
        function update() {
          if (playing) {
            cube.rotation.y += 0.05;
            cube.rotation.x += 0.025;
          }
        }
    
        // Setup an animation loop
        const render = () => {
          timeout = requestAnimationFrame(render);
          update();
          renderer.render(scene, camera);
          gl.endFrameEXP();
        };
        render();
      };
    
      return (
        <div>
          <GLView style={{ width: 300, height: 300 }} onContextCreate={onContextCreate} />
          <Title>Replay app</Title>
          <Button mode="elevated" icon="play" onPress={() => { playing = true; }}>Play</Button>
          <Button mode="contained" icon="pause" onPress={() => { playing = false; }}>Pause</Button>
        </div>
      );
};

class IconMesh extends Mesh {
    constructor() {
      super(
        new BoxBufferGeometry(1.0, 1.0, 1.0),
        new MeshStandardMaterial({
          map: new TextureLoader().load(require("./assets/dani.png")),
        })
      );
    }
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        },
});

export default Model;