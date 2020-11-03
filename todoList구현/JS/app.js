// State
let todos = [];
let newTodo = [];
let x = 'all';

// DOM
const $todos = document.querySelector('.todos');
const $inputTodo = document.querySelector('.input-todo');
const $completeAll = document.querySelector('.complete-all');
const $btn = document.querySelector('.btn');
const $nav = document.querySelector('.nav');
const $all = document.getElementById('all');
const $active = document.getElementById('active');
const $completed = document.getElementById('completed');

// render 이벤트 핸들러
const renderAll = () => {
  let newTodo = [...todos];
  if(x === 'active') {
    newTodo = todos.filter(todo => !todo.completed);
  }
  else if(x === 'completed') {
    newTodo = todos.filter(todo => todo.completed);
  }
 
  $btn.firstElementChild.textContent = 0;
  $btn.nextElementSibling.textContent = 0;
  
  $todos.innerHTML = newTodo.map(todo => { 
    !todo.completed 
    ? $btn.nextElementSibling.textContent = +$btn.nextElementSibling.textContent  + 1 
    : $btn.firstElementChild.textContent = +$btn.firstElementChild.textContent + 1
    
    return `<li id="${todo.id}" class="todo-item">
      <input id="ck-${todo.id}" class="checkbox" type="checkbox" ${todo.completed ? 'checked' : ''} />
      <label for="ck-${todo.id}">${todo.content}</label>
      <i class="remove-todo far fa-times-circle"></i>
    </li>`
  }).join('');
}

// fetchTodo 이벤트 핸들러
const fetchTodo = () => {
  return [
    {id: 1, content: 'HTML', completed: false},
    {id: 2, content: 'CSS', completed: true},
    {id: 3, content: 'Javascript', completed: false}
  ].sort((todo1, todo2) => todo2.id - todo1.id)
}

// addTodo 이벤트 핸들러
const addTodo = content => {
  const generateNextId = todos.reduce((curr, todo) => todo.id > curr ? todo.id : curr, 0) + 1;
  todos = [{id: generateNextId, content, completed: false}, ...todos];
}

// 로딩 이벤트
window.addEventListener('DOMContentLoaded', () => {
  todos = fetchTodo();
  renderAll('all');
})  

// 입력창 이벤트
$inputTodo.onkeyup = e => {
  if(e.key !== 'Enter' || !$inputTodo.value) return;
  addTodo($inputTodo.value);
  $inputTodo.value = '';
  renderAll();
}

// 개별 선택 이벤트
$todos.onchange = e => {
  todos = todos.map(todo => {+e.target.parentNode.id === todo.id ? todo.completed = e.target.checked : todo.completed
    return todo;
  }) 
  renderAll();
}

// 전체 선택 버튼 이벤트
$completeAll.onchange = e => {
  todos = todos.map(todo => {
    e.target.checked ? todo.completed = true : todo.completed = false;
    return todo;
  })
  renderAll();
}

// 리스트 개별 삭제 이벤트
$todos.onclick = e => {
  if(!e.target.classList.contains('remove-todo')) return;
  todos = todos.filter(todo => +e.target.parentNode.id !== todo.id)
  renderAll();
}

// nav active 변경 이벤트
$nav.onclick = e => {
  [...$nav.children].filter(navList => e.target === navList ? navList.classList.add('active') : navList.classList.remove('active'));
}

// clear completed 버튼 이벤트
$btn.onclick = e => {
  todos = todos.filter(todo => !todo.completed);
  renderAll();
}

// all 클릭 이벤트
$all.onclick = e => {
  x = 'all';
  renderAll();
}

// active 클릭 이벤트
$active.onclick = e => {
  x = 'active';
  renderAll();
}

// completed 클릭 이벤트
$completed.onclick = e => {
  x = 'completed';
  renderAll()
}