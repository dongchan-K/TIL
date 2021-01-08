# DOM

**DOM(Document Object Model)은 HTML 문서의 계층적 구조와 정보를 표현하며 이를 제어할 수 있는 API, 즉 프로퍼티와 메서드를 제공하는 트리 자료구조이다**

## 1. 노드

### 1-1. HTML 요소와 노드 객체

HTML 요소는 렌더링 엔진에 의해 파싱되어 DOM을 구성하는 요소 노드 객체로 변환된다

HTML 문서는 HTML 요소들의 집합으로 이루어지며, HTML 요소의 콘텐츠 영역(시작 태그와 종료 태그 사이)에는 텍스트뿐만 아니라 다른 HTML 요소도 포함할 수 있다

**HTML 요소 간에는 중첩 관계에 의해 계층적인 부자(parent-child)관계가 형성된다**

**HTML 요소 간의 부자 관계를 반영하여 HTML 요소를 객체화한 모든 노드 객체들을 트리 자료구조로 구성한다. 이를 DOM 또는 DOM 트리라고 한다**

이때 parent node는 반드시 element node 이다. text node, attribute node는 항상 leaf node이기 때문

attribute node는 요소 노드에 의해서만 존재 의미가 있다

### 1-2. 노드 객체의 타입

- **문서 노드**

**DOM의 최상위 노드인 root node는 문서 노드(document node)** 로서 document 객체를 가리키며 전역 객체 window의 document 프로퍼티에 바인딩되어 있다

**따라서 DOM을 참조하기 위해서는 반드시 window.document 또는 document로 진입해야 한다**

자바스크립트는 전역 객체 window의 document 프로퍼티에 바인딩되어 있는 하나의 document 객체를 바라보기 때문에 HTML 문서당 document 객체는 유일하다

- **요소 노드**

요소 노드(element node)는 부자 관계를 통해 문서의 구조를 표현한다

- **어트리뷰트 노드**

어트리뷰트 노드(attribute node)는 어트리뷰트가 지정된 요소 노드와 형제(sibling) 관계를 갖는다

어트리뷰트를 참조하거나 변경하려면 먼저 형제 노드인 요소 노드에 접근해야 한다

- **텍스트 노드**

텍스트 노드(text node)는 문서의 정보를 표현한다고 할 수 있다

텍스트 노드에 접근하기 위해서는 먼저 부모 노드인 요소 노드에 접근해야 한다

- 위 4개 노드 타입뿐 아니라 총 12개의 노드 타입이 존재한다

### 1-3. 노드 객체의 상속 구조

DOM은 API를 통해 노드 객체는 자신의 부모, 형제, 자식을 탐색할 수 있으며 자신의 어트리뷰트와 텍스트를 조작할 수도 있다

DOM을 구성하는 노드 객체는 ECMAScript 사양에 정의된 표준 빌트인 객체가 아니라 브라우저 환경에서 추가적으로 제공하는 호스트 객체다

노드 객체도 자바스크립트 객체이므로 프로토타입에 의한 상속 구조를 갖는다

배열이 객체인 동시에 배열인 것처럼 input 요소 노드 객체도 다음과 같이 다양한 특성을 갖는 객체이며 상속을 통해 제공받는다

**즉 DOM은 HTML 문서의 계층적 구조와 정보를 표현하는 것은 물론 노드 객체의 종류, 즉 노드 타입에 따라 필요한 기능을 프로퍼티와 메서드의 집합인 DOM API(Application Programming Interface)로 제공한다. 이 DOM API를 통해 HTML의 구조나 내용 또는 스타일 등을 동적으로 조작할 수 있다**

## 2. 요소 노드 취득

### 2-1. id를 이용한 요소 노드 취득

`Document.prototype.getElementById` 메서드는 인수로 전달한 id 어트리뷰트 값을 갖는 하나의 요소 노드를 탐색하여 반환한다

id 값은 class 어트리뷰트와 다르게 공백 문자로 구분하여 여러 개의 값을 가질 수 없다

중복된 id값을 갖는 요소가 여러개 존재한다면 첫번째 요소 노드만 반환하고 id값이 존재하지 않는 경우 null을 반환한다

HTML 요소에 id 어트리뷰트를 부여하면 id 값과 동일한 이름의 전역 변수가 암묵적으로 선언되고 해당 노드 객체가 할당되는 부수 효과가 있다

단, id 값과 동일한 이름의 전역 변수가 이미 선언되어 있다면 노드 객체가 재할당되지 않는다

### 2-2. 태그 이름을 이용한 요소 노드 취득

`Document.prototype/Element.prototype.getElementsByTagName` 메서드는 인수로 전달한 태그 이름을 갖는 모든 요소 노드들을 탐색하여 DOM 컬렉션 객체인 HTMLCollection 객체를 반환한다

HTMLCollection 객체는 유사 배열 객체이면서 이터러블이다

Document.prototype.getElementsByTagName 메서드는 DOM 전체에서 요소 노드를 탐색하여 반환한다

Element.prototype.getElementsByTagName 메서드는 특정 요소 노드를 통해 호출하며 자손 노드 중에서 요소 노드를 탐색하여 반환한다

### 2-3. class를 이용한 요소 노드 취득

`Document.prototype/Element.prototype.getElementsByClassName` 메서드는 인수로 전달한 class 어트리뷰트 값을 갖는 모든 요소 노드들을 탐색하여 HTMLCollection 객체를 반환한다

Document.prototype.getElementsByClassName 메서드는 DOM 전체에서 요소 노드를 탐색하여 반환하고

Element.prototype.getElementsByClassName 메서드는 특정 요소 노드를 통해 호출하며 자손 노드 중에서 요소 노드를 탐색하여 반환한다

### 2-4. CSS 선택자를 이용한 요소 노드 취득

`Document.prototype/Element.prototype.querySelector` 메서드는 인수로 전달한 CSS 선택자를 만족시키는 하나의 요소 노드를 탐색하여 NodeList 객체를 반환한다

NodeList 객체는 유사 배열 객체이면서 이터러블이다

### 2-5. 특정 요소 노드를 취득할 수 있는지 확인

`Element.prototype.matches` 메서드는 인수로 전달한 CSS 선택자를 통해 특정 요소 노드를 취득할 수 있는지 확인하여 불리언 값을 반환한다

### 2-6. HTMLCollection 과 NodeList

DOM 컬렉션 객체인 HTMLCollection 과 NodeList 는 DOM API가 여러개의 결과값을 반환하기 위한 객체다

HTMLCollection 객체는 노드 객체의 상태 변화를 실시간으로 반영하는 살아있는 객체다

NodeList 객체는 일반적으로 non-live 객체이지만 childNodes 프로퍼티가 반환하는 NodeList 객체는 살아있는 객체로 동작한다

**getElementById를 제외한 getElement 계열 메서드들은 사용을 지양하자**

**따라서 노드 객체의 상태 변경과 상관없이 안전하게 DOM 컬렉션을 사용하려면 스프레드 문법이나 Array.from 메서드를 통해 배열로 변환하여 사용하는 것이 좋다**

## 3. 노드 탐색

노드 탐색 프로퍼티는 모두 getter만 존재하는 읽기 전용 접근자 프로퍼티이다

### 3-1. 공백 텍스트 노드

HTML 요소 사이의 스페이스, 탭, 줄바꿈 등의 공백 문자는 공백 텍스트 노드를 생성한다

### 3-2. 자식 노드 탐색

자식 노드 탐색을 위해서는 다음과 같은 노드 탐색 프로퍼티를 사용한다

### 3-3. 자식 노드 존재 확인

`Node.prototype.hasChildNodes` 메서드를 사용해 자식 노드가 존재하면 true, 존재하지 않으면 false를 반환한다. 단, 텍스트 노드를 포함하여 확인한다

### 3-4. 요소 노드의 텍스트 노드 탐색

텍스트 노드는 `Node.prototype.firstChild` 프로퍼티로 접근할 수 있고 이때 반환되는 노드는 텍스트 노드이거나 요소 노드다

### 3-5. 부모 노드 탐색

`Node.prototype.parentNode` 프로퍼티를 사용해 부모 노드를 탐색할 수 있다

### 3-6. 형제 노드 탐색

부모 노드가 같은 형제 노드를 탐색하려면 노드 탐색 프로퍼티를 사용한다

어트리뷰트 노드는 요소 노드의 형제 노드이지만 부모 노드가 같은 형제 노드가 아니기 때문에 반환되지 않는다

## 4. 노드 정보 취득

노드 객체에 대한 정보를 취득하려면 노드 정보 프로퍼티를 사용한다

## 5. 요소 노드의 텍스트 조작

요소 노드의 텍스트 조작 프로퍼티는 setter와 getter 모두 존재하는 접근자 프로퍼티다

### 5-1. nodeValue

`Node.prototype.nodeValue` 프로퍼티를 참조하면 텍스트 노드의 텍스트를 반환하고 텍스트 노드가 아닌 노드의 경우 null을 반환한다

텍스트 노드의 nodeValue 프로퍼티에 값을 할당하면 텍스트를 변경할 수 있다

### 5-2. textContent

`Node.prototype.textContent` 프로퍼티를 참조하면 요소 노드의 콘텐츠 영역 내의(자손 요소 포함) HTML 마크업을 무시한 텍스트만을 모두 반환한다

요소 노드의 textContent 프로퍼티에 문자열을 할당하면 요소 노드의 모든 자식 노드가 제거되고 할당한 문자열이 텍스트로 추가된다

## 6. DOM 조작

**DOM 조작은 새로운 노드를 생성하여 DOM에 추가하거나 기존 노드를 삭제 또는 교체하는 것을 말하는데 이는 리플로우와 리페인트가 발생하는 원인이 되므로 성능에 영향을 주기 때문에 DOM 조작은 성능 최적화를 위해 주의해서 다뤄야 한다**

### 6-1. innerHTML

`Element.prototype.innerHTML` 프로퍼티는 setter와 getter 모두 존재하는 접근자 프로퍼티이다

요소 노드의 innerHTML 프로퍼티를 참조하면 요소 노드의 콘텐츠 영역 내에 포함된 모든 HTML 마크업을 문자열로 반환한다

요소 노드의 innerHTML 프로퍼티에 문자열을 할당하면 모든 자식 노드가 제거되고 할당한 문자열에 포함된 HTML 마크업이 파싱되어 요소 노드의 자식 노드로 DOM에 반영된다

innerHTML 프로퍼티는 이미 존재하는 노드도 처음부터 다시 그린다는 단점이 있다

innerHTML 프로퍼티는 새로운 요소를 삽입할 때 위치를 지정할 수 없다는 단점도 있다

innerHTML 프로퍼티를 사용할때는 크로스 사이트 스크립팅 공격에 취약하니 사용시 주의하자

-> HTML 마크업을 새니티제이션(살균) 하여 잠재적 위험을 제거하는 새니티제이션 라이브러리를 적극 활용하자

-> 코드를 직접 작성할때는 상관없지만 외부에서 가져와서 사용할 경우 꼭 주의할것!!

### 6-2. 노드 생성과 추가

- `Document.prototype.creatElement('tagName')` 메서드는 요소 노드를 생성하여 반환한다

태그 이름을 나타내는 문자열을 인수로 전달한다

DOM에 추가하는 별도의 처리가 필요하다

- `Document.prototype.creatTextNode('text') 메서드는 텍스트 노드를 생성하여 반환한다

텍스트 노드로 사용할 문자열을 인수로 전달한다

요소 노드의 자식 노드로 추가하는 별도의 처리가 필요하다

- `Node.prototype.appendChild(childNode)` 메서드는 인수로 전달한 노드를 appendChild 메서드를 호출한 노드의 마지막 자식 노드로 추가한다

노드를 DOM에 추가할때마다 DOM이 변경되면서 리플로우와 리페인트가 발생한다

추가할 위치를 지정할 수 없다는 단점이 있다

- `Document.prototype.creatDocumentFragment` 메스드를 통해 빈 DocumentFragment 노드를 생성함으로서 복수의 노드 생성과 추가가 가능하다

DocumentFragment 노드는 DOM에 추가 시 자신은 제거되고 자식 노드만 DOM에 추가된다

### 6-3. 노드 복사

`Node.prototype.cloneNode([deep: true | false])` 메서드는 노드의 사본을 생성하여 반환한다

인수로 true를 전달하면 깊은복사를 하고 false 또는 인수를 생략하면 얕은 복사를 한다

### 6-4. 노드 교체

`Node.prototype.repalceChild(newChild, oldChild)` 메서드는 자신을 호출한 노드의 자식 노드를 다른 노드로 교체한다

첫 번째 매개변수에는 새로운 노드를 전달하고 두 번째 매개변수에는 교체될 노드를 인수로 전달한다

### 6-5. 노드 삭제

`Node.prototype.removeChild(child)` 메서드는 child 매개변수에 인수로 전달한 노드를 DOM에서 삭제한다

## 7. 어트리뷰트

### 7-1. 어트리뷰트 노드와 attributes 프로퍼티

HTML 요소는 여러 개의 어트리뷰트를 가질 수 있다

어트리뷰트 노드는 NamedNodeMap 객체에 담겨서 요소 노드의 attributes 프로퍼티에 저장된다

모든 어트리뷰트 노드는 요소 노드의 Element.prototype.attributes 프로퍼티로 취득할 수 있다

attributes 프로퍼티는 getter만 존재하는 읽기 전용 접근자 프로퍼티이며 참조가 담긴 NameNodeMap 객체를 반환한다

### 7-2. HTML 어트리뷰트 조작

HTML 어트리뷰트 값을 참조하려면 `Element.prototype.getAttribute(attributeName)` 메서드를 사용

HTML 어트리뷰트 값을 변경하려면 `Element.prototype.setAttribute(attributeName, attributeValue)` 메서드를 사용

특정 HTML 어트리뷰트가 존재하는지 확인하려면 `Element.prototype.hasAttribute(attributeName)` 메서드를 사용

특정 HTML 어트리뷰트를 삭제하려면 `Element.prototype.removeAttribute(attribueteName)` 메서드를 사용한다

### 7-3. HTML 어트리뷰트 VS DOM 프로퍼티

요소 노드 객체에는 HTML 어트리뷰트에 대응하는 DOM 프로퍼티가 존재한다

이 DOM 프로퍼티들은 HTML 어트리뷰트의 값을 초기값으로 가지고 있다

- **HTML 어트리뷰트는 초기값으로서 기본적으로 정적이다**

- **프로퍼티는 상태로서 기본적으로 동적이다**

**요소 노드는 2개의 상태, 즉 초기 상태와 최신 상태를 관리해야 하며 요소 노드의 초기 상태는 어트리뷰트 노드가 관리하며, 요소 노드의 최신 상태는 DOM 프로퍼티가 관리한다**

DOM 프로퍼티는 setter와 getter 모두 존재하는 접근자 프로퍼티다

### 7-4. HTML 어트리뷰트와 DOM 프로퍼티의 대응 관계

- id 어트리뷰트와 id 프로퍼티는 1:1 대응하며, 동일한 값으로 연동한다
- input 요소의 value 어트리뷰트는 value 프로퍼티와 1:1 대응하지만 value 어트리뷰트는 초기 상태를, value 프로퍼티는 최신 상태를 갖는다
- class 어트리뷰트는 className, classList 프로퍼티와 대응한다
- for 어트리뷰트는 htmlFor 프로퍼티와 1:1 대응한다

## 8. 스타일

### 8-1. 인라인 스타일 조작

`HTMLElement.prototype.style` 프로퍼티는 setter와 getter 모두 존재하는 접근자 프로퍼티로서 요소 노드의 **인라인 스타일** 을 취득하거나 추가 또는 변경한다

style 프로퍼티를 참조하면 CSSStyleDeclaration 타입의 객체를 반환하고 이 객체는 다양한 CSS 프로퍼티에 대응하는 프로퍼티를 가지고 있다

CSS 프로퍼티는 케밥 케이스(kebab-case)를 따른다. 이에 대응하는 CSSStyleDeclaration 객체의 프로퍼티는 카멜 케이스를 따른다

예를들면, `background-color`에 대응하는 프로퍼티는 `backgroundColor` 이다

그대로 사용하려면 대괄호 표기법을 사용해야 한다

### 8-2. 클래스 조작

- `Element.prototype.className` 프로퍼티는 setter와 getter 모두 존재하는 접근자 프로퍼티로서 HTML 요소의 class 어트리뷰트 값을 취득하거나 변경한다

요소 노드의 className 프로퍼티를 참조하면 class 어트리뷰트 값을 문자열로 반환하고 요소 노드의 className 프로퍼티에 문자열을 할당하면 class 어트리뷰트 값을 변경한다

className 프로퍼티는 문자열을 반환하므로 공백으로 구분된 여러 개의 클래스를 반환하는 경우 다루기 불편하다 (공백을 구분해야 하기 때문)

- `Element.prototype.classList` 프로퍼티는 class 어트리뷰트의 정보를 담은 DOMTokenList 객체를 반환한다

className 보다 편리하게 사용할 수 있다

출처 : https://poiemaweb.com/
