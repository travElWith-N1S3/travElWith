import pandas as pd
import os

# CSV 파일 읽어오기 (인코딩을 추정하여 시도해보기)
input_filename = 'input.csv'

# 인코딩 형식을 추정하여 시도
encoding_list = ['utf-8', 'latin1', 'iso-8859-1', 'cp949']

for encoding in encoding_list:
    try:
        df = pd.read_csv(input_filename, encoding=encoding)
        print(f"Successfully read the file with encoding: {encoding}")
        df.to_csv(input_filename, index=False)
        break
    except UnicodeDecodeError as e:
        print(f"Failed to read with encoding: {encoding}, error: {e}")
else:
    raise ValueError("Failed to read the file with all attempted encodings.")

# 각 칼럼명 확인
# print("Columns:", df.columns)

# '소재지주소' 칼럼 생성: '소재지도로명주소'가 null이면 '소재지지번주소' 값을 사용
df['소재지주소'] = df['소재지도로명주소'].combine_first(df['소재지지번주소'])

# '소재지도로명주소'와 '소재지지번주소' 칼럼 삭제
df = df.drop(columns=['소재지도로명주소', '소재지지번주소'])

# 새로운 파일명 생성
base, ext = os.path.splitext(input_filename)
output_filename = f"{base}_postprocessing{ext}"

# 새로운 CSV 파일로 저장
df.to_csv(output_filename, index=False)