# MySQL

## MySQL 이란?

**가장 널리 사용되고 있는 관계형 데이터베이스 관리 시스템이다**

- 오픈소스이며 다중 사용자와 다중 스레드를 지원한다

- 다양한 운영체제에 다양한 프로그래밍 언어를 지원한다

- 작고 강력하며 가격이 저렴하다

- 아래와 같은 형태를 가진다

![mySQL](https://user-images.githubusercontent.com/67866773/100301421-714ac180-2fdb-11eb-96bd-74e2f1447551.PNG)

## 데이터베이스란?

- 데이터베이스(DB: database)는 데이터를 통합하여 관리하는 데이터의 집합이다

- 중복된 데이터를 없애고 자료를 구조화하여 효율적인 처리를 할 수 있도록 관리된다

- DBMS: Database Management System

- 데이터베이스는 응용 프로그램과는 다른 별도의 미들웨어(DBMS)에 의해 관리된다

- RDBMS: Relational Database Management System -> 데이터의 테이블 사이에 키값으로 관계를 가지고 있는 데이터 베이스
(Oracle, Mysql, Postgresql ...)

- NoSQL -> 데이터 테이블 사이의 관계가 없이 데이터를 저장하는 데이터 베이스(Mongodb, Hbase, Cassandra...)

**데이터 베이스의 특징**

- 사용자의 질의에 대하여 즉각적인 처리와 응답이 이뤄진다

- 생성, 수정, 삭제를 통해 항상 최신의 데이터를 유지한다

- 사용자들이 원하는 데이터를 동시에 공유할 수 있다

- 사용자가 원하는 데이터를 주소가 아닌 내용에 따라 참조할 수 있다

- 응용프로그램과 데이터베이스는 독립되어 있기 때문에, 데이터의 논리적 구조와 응용프로그램은 별개로 동작된다

## 데이터 베이스 모델링
**데이터 베이스 모델링은 데이터 베이스에서의 테이블 구조를 미리 계획해서 작성하는 작업이다. RDBMS는 테이블간에 유기적으로 연결되어 있기 때문에 모델링을 잘하는것이 중요하다. 기본적으로 개념적 모델링, 논리적 모델링, 물리적 모델링 절차로 설계된다

- 개념적 모델링 : 업무분석해서 핵심 데이터의 집합을 정의하는 과정
![개념적 모델링](https://user-images.githubusercontent.com/67866773/100329673-585d0300-3011-11eb-9550-c033e9b24fde.PNG)

- 논리적 모델링 : 개념적 모델링을 상세화 하는 과정
![논리적 모델링](https://user-images.githubusercontent.com/67866773/100329681-598e3000-3011-11eb-81c2-01326b02fa9b.PNG)

- 물리적 모델링 : 논리적 모델링을 DBMS에 추가하기 위해 구체화 되는과정
![물리적 모델링](https://user-images.githubusercontent.com/67866773/100329686-5abf5d00-3011-11eb-95f1-308b45b6ae53.PNG)

## SQL 문의 종류 

**1. DML**
- Data manipulation Language
- 데이터 조작어
- 데이터 검색, 삽입, 수정, 삭제등에 사용
- SELECT, INSERT, UPDATE, DELETE
- 트랜젝션이 발생하는 SQL문

**2. DDL**
- Data Definition Language
- 데이터 정의어
- 데이터 베이스, 테이블, 뷰, 인덱스등의 데이터 베이스 개체를 생성, 삭제, 변경에 사용
- CREATE, DROP, ALTER, TRUNCATE
- 실행 즉시 DB에 적용

**3. DCL**
- Data Control Language
- 데이터 제어어
- 사용자의 권한을 부여하거나 빼앗을때 사용
-GRUNT, REVORKE, DENY

**트랜잭션 : 여러 개의 Task를 하나로 묶어 수행하는 행위를 말하며 트랜잭션이 실행중일 때는 다른 트랜잭션이 생성되지 않음**



