// scene.js
import SceneBase from './SceneBase.js';
import Scene1 from './Scene1.js';
import Scene2 from './Scene2.js';

let currentScene;

function init(selectedScene) {
    // Initialize the scene based on the selected option
    if (selectedScene === 'scene1') {
        currentScene = new Scene1();
    } else if (selectedScene === 'scene2') {
        currentScene = new Scene2();
    } else {
        console.error('Invalid scene selection');
    }
}

function start() {
    if (!currentScene) return;
    // Start the animation for the current scene
    currentScene.start();
}

function destroy() {
    // Stop the animation for the current scene and destroy it
    if (!currentScene) return;
    currentScene.destroy();
}

export { init, start, destroy };
