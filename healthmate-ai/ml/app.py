from fastapi import FastAPI, UploadFile, File
from ultralytics import YOLO
import json
import tempfile

app = FastAPI()

# Load pretrained YOLO model
model = YOLO("yolov8n.pt")

# Load food database
with open("food_db.json") as f:
    FOOD_DB = json.load(f)

@app.post("/analyze")
async def analyze_food(image: UploadFile = File(...)):
    # Save image temporarily
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        tmp.write(await image.read())
        image_path = tmp.name

    results = model(image_path)

    calories = protein = carbs = fats = 0
    foods = []

    for r in results:
        for box in r.boxes:
            label = model.names[int(box.cls)]
            if label in FOOD_DB:
                food = FOOD_DB[label]
                foods.append(label)
                calories += food["calories"]
                protein += food["protein"]
                carbs += food["carbs"]
                fats += food["fats"]

    return {
        "foods": list(set(foods)),
        "calories": calories,
        "protein": protein,
        "carbs": carbs,
        "fats": fats
    }
