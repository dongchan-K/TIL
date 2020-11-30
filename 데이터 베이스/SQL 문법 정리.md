# SQL Query문

## SELECT FROM 

**데이터를 검색**

- 전체 컬럼 데이터 조회
```SQL
SELECT *
FROM world.country 
```

- code, name 데이터 조회
```SQL
SELECT code, name
FROM world.country
```

- 데이터 베이스 선택 : FROM 절에 world.을 사용할 필요가 없다
```SQL
USE world;

SELECT *
FROM country
```

- alias(as) : 컬럼의 이름을 변경
```SQL
SELECT code as country_code, name as country_name
FROM country
```

- 데이터 베이스, 테이블, 컬럼 리스트 확인
```SQL
SHOW DATABASES;

SHOW TABLES;

DESC city;
```

## WHERE

**특정 조건을 주어 데이터를 검색**

- 비교연산
```SQL
# 인구가 1억이 넘는 국가를 출력
SELECT * 
FROM country
WHERE Population >= 100000000
```

- 논리 연산 : AND, OR
```SQL
# 인구가 7000만에서 1억인 국가를 출력
SELECT *
FROM country
WHERE Population >= 70000000 AND Population <= 100000000

# 아시아와 아프리카 대륙의 국가 데이터를 출력
SELECT * 
FROM country
WHERE Continent = "Asia" OR Continent = "Africa"
```

- 범위 연산 : BETWEEN A AND B 
```SQL
# 인구가 7000만에서 1억인 국가를 출력
SELECT *
FROM country
WHERE Population BETWEEN 70000000 AND 100000000
```

- 특정 조건을 포함 : IN, NOT IN
```SQL
# 아시아와 아프리카 대륙의 국가 데이터를 출력
SELECT * 
FROM country
WHERE Continent IN ("Asia", "Africa")

# 아시아와 아프리카 대륙의 국가가 아닌 데이터를 출력
SELECT *
FROM country
WHERE Continent NOT IN ("Asia", "Africa")

# 아시아와 아프리카 대륙의 국가가 아닌 데이터를 출력 (논리연산 사용)
SELECT * 
FROM country
WHERE Continent != "Asia" AND Continent != "Africa"
```

- 특정 문자열이 포함된 데이터 출력 : LIKE
```SQL
# 정부형태에 Republic이 포함된 데이터 출력
SELECT *
FROM country
WHERE GovernmentForm LIKE "%Republic%"
# --> "%Republic%" : Republic을 포함하는 모든 데이터 출력
# --> "%Republic" : Republic으로 끝나는 모든 데이터 출력
# --> "Republic%" : Republic으로 시작하는 모든 데이터 출력
```

## ORDER BY

**특정 컬럼의 값으로 데이터 정렬**

DEFAULT 는 오름차순(ASC) -> 생략 가능

```SQL
# 오름차순 인구순으로 국가의 리스트를 출력
SELECT * 
FROM country
ORDER BY population ASC

# 내림차순 인구순으로 국가의 리스트를 출력
SELECT *
FROM country
ORDER BY population DESC

# 국가 코드를 알파벳 순을 정렬하고 같은 국가 코드를 가지면 인구순으로 내림차순으로 정렬
SELECT *
FROM city
ORDER BY CountryCode ASC, Population DESC
```

## LIMIT

**조회하는 데이터의 수를 제한**

LIMIT x, y : x는 상위 x개 제한, y는 y개 데이터 출력

```SQL
# 인구가 많은 상위 5개 국가 데이터를 출력
SELECT *
FROM country
ORDER BY population DESC
LIMIT 5

# 인구가 많은 상위 6위 ~ 8위인 3개 국가 데이터를 출력
SELECT * 
FROM country
ORDER BY population DESC
LIMIT 5, 3
```

## GROUP BY HAVING

**여러개의 동일한 데이터를 가지는 특정 컬럼을 병합**

**COUNT, MAX, MIN, AVG, VAR_SAMP, STDDEV 그룹함수 존재**

- COUNT
```SQL
# city 테이블의 CountryCode를 묶고 각 코드마다 몇개의 데이터가 있는지 확인
SELECT CountryCode, COUNT(CountryCode)
FROM city
GROUP BY CountryCode

# countrylanguage 테이블에서 전체 언어가 몇개 있는지 구하시오
# DISTINCT : 중복 제거
SELECT COUNT(DISTINCT(Language)) as language_count
FROM countrylanguage
```

- MAX
```SQL
# 대륙별 인구수와 GNP 최대 값을 조회
SELECT continent, MAX(Population) as Population, MAX(GNP) as GNP
FROM country
GROUP BY continent
```

- MIN
```SQL
# 대륙별 인구수와 GNP 최소 값을 조회 (GNP와 인구수가 0이 아닌 데이터 중에서)
SELECT continent, MIN(Population) as Population, MIN(GNP) as GNP
FROM country
WHERE GNP != 0 AND Population != 0
GROUP BY continent
```

- SUM
```SQL
# 대륙별 총 인구수와 총 GNP
SELECT continent, SUM(Population) as Population, SUM(GNP) as GNP
FROM country
WHERE GNP != 0 AND Population != 0
GROUP BY continent
```

- AVG
```SQL
# 대륙별 평균 인구수와 평균 GNP 결과를 인구수로 내림차순 정렬
SELECT continent, AVG(Population) as Population, AVG(GNP) as GNP
FROM country
WHERE GNP != 0 AND Population != 0
GROUP BY continent
ORDER BY Population DESC
```

- HAVING : GROUP BY에서 반환되는 결과에 조건을 지정
```SQL
# 대륙별 평균 인구수, 평균 GNP, 1인당 GNP한 결과 중 1인당 GNP가 0.01 이상인 데이터를 조회하고 1인당 GNP를 내림차순으로 정렬
SELECT continent, AVG(Population) as Population, AVG(GNP) as GNP, AVG(GNP) / AVG(Population) * 1000 as AVG
FROM country
WHERE GNP != 0 AND Population != 0
GROUP BY continent
HAVING AVG > 0.01
ORDER BY AVG DESC

# --> WHERE : 필터링을 하고 쿼리 실행
# --> HAVING : 쿼리를 실행하고 필터링
```

- WITH ROLLUP : 그룹별 합계를 출력
```SQL
# 고객과 스탭별 매출과 고객별 매출의 총합을 출력
SELECT customer_id, staff_id, SUM(amount) as amount 
FROM payment
GROUP BY customer_id, staff_id
WITH ROLLUP
```

## CREATE USE ALTER DROP

- CREATE
```SQL
# 데이터 베이스 생성
CREATE DATABASE <database_name>;

# 테이블 생성
CREATE TABLE <table_name> (
  column_name_1 column_data_type_1 column_constraint_1,
  column_name_2 column_data_type_2 column_constraint_2,
  ...
)
```

- USE
```SQL
# test 데이터 베이스 선택
USE test;

# 현재 데이터 베이스 확인
SELECT DATABASE()
```

- ALTER
```SQL
# 사용중인 데이터베이스의 인코딩 방식 확인
SHOW VARIABLES LIKE "character_set_database"

# test 데이터 베이스의 문자열 인코딩을 utf8로 변경
ALTER DATABASE world CHARACTER SET = utf8

# user2 테이블에 TEXT 데이터 타입을 갖는 tmp 컬럼을 추가 (ADD)
ALTER TABLE user2 ADD tmp TEXT

# user2 테이블의 tmp 컬럼을 INT 데이터 타입으로 수정 (MODIFY)
ALTER TABLE user2 MODIFY COLUMN tmp INT

# user2 테이블의 tmp 컬럼을 삭제 (DROP)
ALTER TABLE user2 DROP tmp
```

- DROP
```SQL
# tmp 데이터 베이스 삭제
DROP DATABASE tmp;
```

## Constraint : 제약 조건

**데이터 베이스의 테이블을 생성할때 각 컬럼의 제약조건을 설정**

- NOT NULL : NULL 값(비어있는 값)을 저장할 수 없다
- UNIQUE : 같은 값을 저장할 수 없다
- PRIMARY KEY : NOT NULL 과 UNIQUE 제약조건을 동시에 만족해야 한다. 즉, 컬럼에 비어 있는 값과 동일한 값을 저장할 수 없으며 하나의 테이블에 하나의 컬럼만 조건을 설정할 수 있다
- FOREIGN KEY : 다른 테이블과 연결되는 값이 저장된다
- DEFAULT : 데이터를 저장할때 해당 컬럼에 별도의 저장값이 없으면 DEFAULT로 설정된 값이 저장된다
- AUTO_INCREMENT : 주로 테이블의 PRIMARY KEY 데이터를 저장할 때 자동으로 숫자를 1씩 증가시켜 주는 기능으로 사용

## INSERT

**테이블에 데이터 삽입**

```SQL
INSERT INTO <table_name>(<column_name_1>, <column_name_2>, ...)
VALUES(<value_1>, <value_2>, ...)
```

```SQL
# user1 테이블에 user_id, name, email, age, rdate를 입력
INSERT INTO user1(user_id, name, email, age, rdate)
VALUES(1, "jin", "pdj@gmail.com", 30, now()),
(2, "peter", "perter@naver.com", 33, "2017-02-25");

# city_2 테이블 생성
CREATE TABLE city_2 (
  NAME VARCHAR(50),
  CountryCode CHAR(3),
  Distric VARCHAR(50),
  Population INT
)
# select 절에서 나온 결과를 Insert
INSERT INTO city_2
SELECT Name, CountryCode, District, Population
FROM city
WHERE Population > 8000000;
```

## UPDATE SET

**데이터 갱신**

select-where로 변경할 데이터를 확인하고 update 해야 실수를 줄일 수 있고 limit도 함께 사용하는것이 좋다

```SQL
UPDATE <table_name>
SET <column_name_1> = <value_1>, <column_name_2> = <value_2>,
WHERE <condition>
```

```SQL
# jin 이름을 가지고 있는 사람의 나이를 20, 이메일을 pdj@naver.com 으로 변경
UPDATE user1
SET age=20, email="pdj@naver.com"
WHERE name="jin"
```

## DELETE, DROP, TRUNCATE

**조건을 설정하여 데이터를 삭제**

```SQL
DELETE FROM <table_name>
WHERE <condition>
```

```SQL
# 2016-01-01 이전 데이터 삭제 (DML)
DELETE FROM user1
WHERE rdate < "2016-01-01"

# 테이블 구조를 남기고 모든 데이터를 삭제 (DLL)
TRUNCATE FROM user1

# 테이블 전체를 모두 삭제 (DLL)
DROP FROM user1
```













