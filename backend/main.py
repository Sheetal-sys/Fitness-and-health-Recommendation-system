from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import joblib
import random
import datetime

from database import create_table, get_connection

app = FastAPI()

# CORS — allow frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create DB table
create_table()

# Load ML model
model = joblib.load("model.pkl")

# =========================
# DATASETS
# =========================

diet_data = {
    "Weight Loss": ["Oats", "Green Salad", "Fruits", "Boiled Vegetables", "Soup"],
    "Weight Gain": ["Eggs", "Chicken", "Rice", "Milk", "Peanut Butter"],
    "Maintenance": ["Balanced diet", "Vegetables", "Fruits", "Whole grains"]
}

exercise_data = {
    "Weight Loss": ["Running", "Cycling", "Jump Rope", "HIIT"],
    "Weight Gain": ["Weight Lifting", "Squats", "Deadlifts", "Bench Press"],
    "Maintenance": ["Yoga", "Walking", "Light jogging"]
}

health_diet_rules = {
    "diabetes": "Low sugar, controlled carbs",
    "bp": "Low salt diet",
    "thyroid": "Iodine balanced diet"
}


@app.get("/")
def home():
    return {"message": "Fitness AI System Running 🚀"}


@app.post("/recommend")
def recommend(data: dict):
    try:
        # =========================
        # INPUTS
        # =========================
        user_id = str(data.get("user_id", "guest"))

        weight = float(data["weight"])
        height = float(data["height"])
        age = float(data["age"])
        gender = data["gender"]
        activity = data["activity_level"]
        heart_rate = float(data["heart_rate"])
        body_temp = float(data["body_temp"])

        health = data.get("health_condition", "none")

        # =========================
        # ENCODING
        # =========================
        gender_map = {"male": 1, "female": 0}
        gender_num = gender_map.get(gender.lower(), 1)

        activity_map = {"low": 10, "moderate": 20, "high": 30}
        activity_num = activity_map.get(activity.lower(), 20)

        # =========================
        # BMI
        # =========================
        height_m = height / 100
        bmi = weight / (height_m ** 2)

        if bmi < 18.5:
            category = "Underweight"
            goal = "Weight Gain"
        elif bmi < 25:
            category = "Normal"
            goal = "Maintenance"
        elif bmi < 30:
            category = "Overweight"
            goal = "Weight Loss"
        else:
            category = "Obese"
            goal = "Weight Loss"

        # =========================
        # BMR
        # =========================
        if gender.lower() == "male":
            bmr = 10 * weight + 6.25 * height - 5 * age + 5
        else:
            bmr = 10 * weight + 6.25 * height - 5 * age - 161

        # =========================
        # DAILY CALORIES
        # =========================
        activity_factor_map = {
            "low": 1.2,
            "moderate": 1.55,
            "high": 1.9
        }
        activity_factor = activity_factor_map.get(activity.lower(), 1.55)
        daily_calories = bmr * activity_factor

        # =========================
        # ML WORKOUT CALORIES
        # =========================
        prediction = model.predict([[
            gender_num,
            age,
            height,
            weight,
            activity_num,
            heart_rate,
            body_temp
        ]])

        workout_calories = max(50, float(prediction[0]))

        # =========================
        # EXERCISE CATEGORY
        # =========================
        if workout_calories < 100:
            exercise_category = "Light"
        elif workout_calories < 200:
            exercise_category = "Moderate"
        else:
            exercise_category = "Intense"

        # =========================
        # TOTAL BURN & FINAL INTAKE
        # =========================
        total_burn = daily_calories + workout_calories

        if goal == "Weight Loss":
            recommended_calories = total_burn - 300
        elif goal == "Weight Gain":
            recommended_calories = total_burn + 300
        else:
            recommended_calories = total_burn

        # =========================
        # PERSONALIZATION ENGINE
        # =========================
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
        SELECT weight FROM users
        WHERE user_id = ?
        ORDER BY id DESC LIMIT 1
        """, (user_id,))

        last_record = cursor.fetchone()
        personalization_note = "Welcome! Your personalized plan has been generated."

        if last_record:
            last_weight = last_record[0]
            if weight < last_weight:
                personalization_note = f"Great progress! You lost {round(last_weight - weight, 1)} kg since last time 👍"
            elif weight > last_weight:
                personalization_note = f"Weight increased by {round(weight - last_weight, 1)} kg. Adjusting plan ⚠️"
                recommended_calories -= 200
            else:
                personalization_note = "Weight unchanged. Slight caloric adjustment applied 🔄"
                recommended_calories -= 100

        # =========================
        # DIET & EXERCISE
        # =========================
        diet_list = diet_data[goal]
        if health in health_diet_rules:
            diet_list = diet_list + [health_diet_rules[health]]
        diet_recommendation = random.sample(diet_list, min(3, len(diet_list)))

        exercise_list = exercise_data[goal]
        exercise_recommendation = random.sample(exercise_list, min(3, len(exercise_list)))

        # =========================
        # SAVE TO DATABASE
        # =========================
        cursor.execute("""
        INSERT INTO users (user_id, age, weight, height, bmi, goal, calories)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            user_id,
            int(age),
            weight,
            height,
            round(bmi, 2),
            goal,
            int(recommended_calories)
        ))

        conn.commit()
        conn.close()

        # =========================
        # RESPONSE
        # =========================
        return {
            "bmi": round(bmi, 2),
            "category": category,
            "goal": goal,
            "personalization": personalization_note,
            "exercise_category": exercise_category,
            "bmr": int(bmr),
            "daily_calories": int(daily_calories),
            "workout_calories": int(workout_calories),
            "total_burn": int(total_burn),
            "recommended_intake": int(recommended_calories),
            "diet": diet_recommendation,
            "exercise": exercise_recommendation
        }

    except KeyError as e:
        raise HTTPException(status_code=422, detail=f"Missing required field: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/history")
def get_history(user_id: str = Query(...)):
    """
    Fetch historical records for a user.
    The DB stores user_id as TEXT (cast on insert), so we match by string.
    The DB has a `date` TIMESTAMP column — use it directly.
    """
    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
        SELECT id, user_id, age, weight, height, bmi, goal, calories, date
        FROM users
        WHERE user_id = ?
        ORDER BY id ASC
        """, (str(user_id),))

        records = cursor.fetchall()
        conn.close()

        history = []
        for row in records:
            # row[8] is the date column — use it; fall back to generated timestamp
            try:
                ts = datetime.datetime.fromisoformat(str(row[8])).isoformat()
            except Exception:
                ts = datetime.datetime.now().isoformat()

            history.append({
                "id": row[0],
                "user_id": str(row[1]),
                "age": row[2],
                "weight": row[3],
                "height": row[4],
                "bmi": row[5],
                "goal": row[6],
                "calories": row[7],
                "timestamp": ts
            })

        return {"history": history, "count": len(history)}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))