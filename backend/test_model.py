import joblib
import pandas as pd

m = joblib.load('models/best_crop_yield_model.pkl')

print("=" * 50)
print("TEST 1: Same crop, only Fertilizer changes")
print("=" * 50)
base = {
    'Crop': 'Rice', 'Region': 'Region_A', 'Soil_Type': 'Loam',
    'Soil_pH': 6.5, 'Rainfall_mm': 800, 'Temperature_C': 28,
    'Humidity_pct': 70, 'Irrigation': 'Flood',
    'Pesticides_Used_kg': 5, 'Planting_Density': 200, 'Previous_Crop': 'Wheat'
}
for fert in [50, 100, 150, 200, 300]:
    row = {**base, 'Fertilizer_Used_kg': fert}
    pred = m.predict(pd.DataFrame([row]))[0]
    print(f"  Fertilizer={fert:>3}kg  =>  {round(pred, 2)} tons/ha")

print()
print("=" * 50)
print("TEST 2: Same crop, only Rainfall changes")
print("=" * 50)
for rain in [100, 300, 600, 900, 1200]:
    row = {**base, 'Fertilizer_Used_kg': 120, 'Rainfall_mm': rain}
    pred = m.predict(pd.DataFrame([row]))[0]
    print(f"  Rainfall={rain:>4}mm  =>  {round(pred, 2)} tons/ha")

print()
print("=" * 50)
print("TEST 3: Different crops, same conditions")
print("=" * 50)
for crop in ['Rice', 'Wheat', 'Maize', 'Barley']:
    row = {**base, 'Crop': crop, 'Fertilizer_Used_kg': 120}
    pred = m.predict(pd.DataFrame([row]))[0]
    print(f"  Crop={crop:<8}  =>  {round(pred, 2)} tons/ha")

print()
print("=" * 50)
print("TEST 4: Different soil types")
print("=" * 50)
for soil in ['Clay', 'Loam', 'Sandy']:
    row = {**base, 'Soil_Type': soil, 'Fertilizer_Used_kg': 120}
    pred = m.predict(pd.DataFrame([row]))[0]
    print(f"  Soil={soil:<8}  =>  {round(pred, 2)} tons/ha")

print()
print("=" * 50)
print("TEST 5: Different irrigation methods")
print("=" * 50)
for irr in ['Drip', 'Flood', 'Sprinkler', None]:
    row = {**base, 'Irrigation': irr, 'Fertilizer_Used_kg': 120}
    pred = m.predict(pd.DataFrame([row]))[0]
    print(f"  Irrigation={str(irr):<10}  =>  {round(pred, 2)} tons/ha")
