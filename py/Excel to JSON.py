import pandas as pd
import os
print("Working directory:", os.getcwd())
# Load your Excel file (change filename.xlsx to your actual file path)
df = pd.read_excel('InfoTableData.xlsx')

# Optional: Clean column names (strip spaces, lower-case, replace invalid characters)
# df.columns = df.columns.str.strip().str.lower().str.replace('info_id', 'id')
df.columns = df.columns.str.strip().str.replace('info_id', 'id')

# Convert to JSON
df.to_json('infotable.json', orient='records', indent=2)

print("Excel successfully converted to JSON!")