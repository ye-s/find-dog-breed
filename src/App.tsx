import { UploadImage } from "./components/UploadImage/UploadImage";
import "./CommonStyles.scss";

export default function App() {
  return (
    <main className="App">
      <h1>Are you looking for a dog?</h1>
      <div className="how-to-steps">
        <p>Step 1: Pick Image of dog</p>
        <p>Step 2: Wait till analyzation model is loaded and shows dog breed</p>
        <p>
          Step 3: After dog breed is shown you can download images for same
          breed
        </p>
      </div>

      <UploadImage />
    </main>
  );
}
