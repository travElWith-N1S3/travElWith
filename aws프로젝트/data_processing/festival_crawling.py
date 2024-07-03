import requests
from bs4 import BeautifulSoup
import csv
from concurrent.futures import ThreadPoolExecutor, as_completed

def get_page_data(session, url):
    try:
        response = session.get(url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        li_elements = soup.select('ul.mediaWrap.color01 > li')
        data = []
        
        for li in li_elements:
            title_element = li.select_one('p.title')
            ny_element = li.select_one('div.ny')
            detail_info = li.select_one('ul.detail_info')
            
            title = title_element.text.strip() if title_element else ''
            ny_content = ny_element.text.strip() if ny_element else ''
            
            period = ''
            location = ''
            if detail_info:
                period_element = detail_info.find('li', string=lambda text: '기간' in text if text else False)
                location_element = detail_info.find('li', string=lambda text: '장소' in text if text else False)
                
                period = period_element.text.replace(' ', '').replace('기간:2024.', '') if period_element else ''
                location = location_element.text.replace('장소: ', '') if location_element else ''
            
            data.append({
                '축제명': title,
                '개최기간': period,
                '개최지역': location,
                '설명': ny_content
            })
        
        return data
    except requests.RequestException as e:
        print(f"Error fetching URL {url}: {e}")
        return []
    except Exception as e:
        print(f"Unexpected error processing URL {url}: {e}")
        return []

def main():
    base_url = "https://www.mcst.go.kr/kor/s_culture/festival/festivalList.jsp?pMenuCD=&pCurrentPage={}&pSearchType=01&pSearchWord=&pSeq=&pSido=&pOrder=01down&pPeriod=&fromDt=&toDt="
    all_data = []
    max_pages = 13 # 페이지 설정

    with requests.Session() as session:
        with ThreadPoolExecutor(max_workers=5) as executor:
            futures = [executor.submit(get_page_data, session, base_url.format(page)) for page in range(1, max_pages + 1)]
            
            for future in as_completed(futures):
                all_data.extend(future.result())

    # CSV 파일로 저장
    csv_filename = 'festival_crawl_results.csv'
    fields = ['축제명', '개최기간', '개최지역', '설명']
    try:
        with open(csv_filename, 'w', newline='', encoding='utf-8-sig') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=fields)
            writer.writeheader()
            writer.writerows(all_data)
        print(f"총 {len(all_data)}개의 항목을 '{csv_filename}' 파일로 저장했습니다.")
    except IOError as e:
        print(f"CSV 파일 저장 중 오류 발생: {e}")

if __name__ == "__main__":
    main()
