import './ui.css';

document.addEventListener('DOMContentLoaded', () => {
  const testButton = document.getElementById('generate');
  if (testButton) {
    testButton.onclick = () => {
      parent.postMessage(
        { pluginMessage: { type: 'create-page', version: '버전 페이지입니다' } },
        '*'
      );
    };
  } else {
    console.error("Element with id 'test' not found.");
  }
});
