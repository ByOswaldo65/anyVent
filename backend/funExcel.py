import sys
import pandas as pd
import json

def convert_to_json(file_path, sheet_name, tipo):
    expected_headers = ["Nombre", "Proveedor", "Cantidad", "Precio Unitario", "Total"]
    usecols = "D:H"
    if(tipo == 'comida'):
        expected_headers = ["Nombre", "Tipo", "Fecha venta", "Cantidad", "Precio Unitario", "Total"]
        usecols = "D:I"

    # Leer el archivo excel y verificar los encabezados
    df_headers = pd.read_excel(file_path, sheet_name=sheet_name, header=6, nrows=1, usecols=usecols)

    if list(df_headers.columns) == expected_headers:
        df = pd.read_excel(file_path, sheet_name=sheet_name, header=6, usecols=usecols)

        df_cleaned = df.dropna().copy()

        # Si el archivo es de comida, formatear la columna 'Fecha venta'
        if 'Comida' in file_path:
            df_cleaned.loc[:, 'Fecha venta'] = df_cleaned['Fecha venta'].dt.strftime('%d-%m-%Y')

        json_result = df_cleaned.to_json(orient='records', indent=4)
        return json_result

    else:
        print("El archivo Excel no cumple con los encabezados esperados.")
        return None

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Uso: python funExcel.py ruta_archivo_excel nombre_hoja")
        sys.exit(1)
    
    file_path = sys.argv[1]
    sheet_name = sys.argv[2]
    tipo = sys.argv[3]

    json_data = convert_to_json(file_path, sheet_name, tipo)
    if json_data:
        print(json_data)        
