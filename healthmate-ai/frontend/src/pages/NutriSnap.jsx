import { useState } from "react";
import axios from "axios";

export default function NutriSnap() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const analyze = async () => {
    const form = new FormData();
    form.append("image", image);

    const res = await axios.post(
  "http://localhost:8000/analyze",
  form,
  { headers: { "Content-Type": "multipart/form-data" } }
);


    setResult(res.data);
  };

  return (
    <div style={{ padding: 40, color: "white" }}>
      <h1>🥗 NutriSnap</h1>

      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <button onClick={analyze}>Analyze Meal</button>

      {result && (
        <div>
          <p>Calories: {result.calories}</p>
          <p>Protein: {result.protein}g</p>
          <p>Carbs: {result.carbs}g</p>
          <p>Fats: {result.fats}g</p>
        </div>
      )}
    </div>
  );
}
