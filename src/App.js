import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';

function App() {
  return (
    <div className="max-w-[1500px] mx-auto">
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
