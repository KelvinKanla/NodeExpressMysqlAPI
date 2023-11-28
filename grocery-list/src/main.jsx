import { createRoot } from 'react-dom/client';

const element = (
    <div>
    <h1>My first react element</h1>
    <p>I just learned to create a react node and I don't know what it's used for :|</p>
    </div>
)

const root = createRoot(document.getElementById('root'));

root.render(element)*