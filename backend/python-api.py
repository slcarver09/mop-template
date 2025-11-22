from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from your React frontend

# Load CSVs once at startup
pops_df = pd.read_csv('../csvs/pops.csv')
nodes_df = pd.read_csv('../csvs/nodes_table.csv')  # Adjust path if needed

@app.route('/api/pop-address')
def get_pop_address():
    pop_code = request.args.get('code')
    row = pops_df[pops_df['Code'] == pop_code]
    if not row.empty:
        row = row.iloc[0]
        return jsonify({
            'street': row['Street'],
            'cityStateZip': f"{row['City']}, {row['State']} {row['Zip']}"
        })
    return jsonify({'error': 'POP code not found'}), 404

@app.route('/api/pop-codes')
def get_pop_codes():
    return jsonify(list(pops_df['Code'].dropna().unique()))

@app.route('/api/device-info')
def get_device_info():
    device_name = request.args.get('name')
    row = nodes_df[nodes_df['Name'] == device_name]
    if not row.empty:
        row = row.iloc[0]
        return jsonify({
            'model': str(row.get('Model', '')),
            'serialNumber': str(row.get('Serial Number', '')),
            'rackLocation': str(row.get('Rack', '')),
            'rackUnit': str(row.get('RU', ''))
        })
    return jsonify({'error': 'Device not found'}), 404

@app.route('/api/node-names')
def get_node_names():
    return jsonify(list(nodes_df['Name'].dropna().unique()))

@app.route('/api/node-names-by-pop')
def get_node_names_by_pop():
    pop_code = request.args.get('pop')
    filtered = nodes_df[nodes_df['POP Code'] == pop_code]  # Adjust column name if needed
    return jsonify(list(filtered['Name'].dropna().unique()))

if __name__ == '__main__':
    app.run(debug=True)