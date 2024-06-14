import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // селектор компонента
  templateUrl: './app.component.html', // HTML шаблон компонента
  styleUrls: ['./app.component.css'] // CSS стили компонента
})
export class AppComponent {
  // списки задач
  todoList: any[] = [
    { id: 1, title: 'Задача 1', description: 'Описание задачи 1', tag: 'Тег 1', dueDate: '2024-05-10' },
    { id: 2, title: 'Задача 2', description: 'Описание задачи 2', tag: 'Тег 2', dueDate: '2024-05-11' },
    { id: 3, title: 'Задача 3', description: 'Описание задачи 3', tag: 'Тег 3', dueDate: '2024-05-12' }
  ];
  inProgressList: any[] = [
    { id: 4, title: 'Задача 4', description: 'Описание задачи 4', tag: 'Тег 4', dueDate: '2024-05-13' },
    { id: 5, title: 'Задача 5', description: 'Описание задачи 5', tag: 'Тег 5', dueDate: '2024-05-14' }
  ];
  completeList: any[] = [
    { id: 6, title: 'Задача 6', description: 'Описание задачи 6', tag: 'Тег 6', dueDate: '2024-05-15' },
    { id: 7, title: 'Задача 7', description: 'Описание задачи 7', tag: 'Тег 7', dueDate: '2024-05-16' }
  ];

  newTodo: any = {}; // новый элемент для todoList
  newInProgress: any = {}; // новый элемент для inProgressList
  newComplete: any = {}; // новый элемент для completeList
  showForm: string = ''; // для отображения формы
  editingTask: any = null; // редактируемая задача
  editingList: string = ''; // список для редактирования
  searchTerm: string = ''; // термин для поиска

  // переключение отображения формы
  toggleForm(section: string) {
    this.showForm = this.showForm === section ? '' : section;
  }

  // добавление задачи
  addTask(section: string) {
    switch (section) {
      case 'todo':
        this.todoList.push(this.newTodo);
        this.newTodo = {};
        break;
      case 'inProgress':
        this.inProgressList.push(this.newInProgress);
        this.newInProgress = {};
        break;
      case 'complete':
        this.completeList.push(this.newComplete);
        this.newComplete = {};
        break;
    }
    this.showForm = '';
  }

  // удаление задачи
  deleteTask(section: string, index: number) {
    switch (section) {
      case 'todo':
        this.todoList.splice(index, 1);
        break;
      case 'inProgress':
        this.inProgressList.splice(index, 1);
        break;
      case 'complete':
        this.completeList.splice(index, 1);
        break;
    }
  }

  // перемещение задачи
  moveTask(source: string, destination: string, index: number) {
    let taskToMove = null;
    switch (source) {
      case 'todo':
        taskToMove = this.todoList.splice(index, 1)[0];
        break;
      case 'inProgress':
        taskToMove = this.inProgressList.splice(index, 1)[0];
        break;
      case 'complete':
        taskToMove = this.completeList.splice(index, 1)[0];
        break;
    }
    taskToMove.id = this.getNextId(destination);
    switch (destination) {
      case 'todo':
        this.todoList.push(taskToMove);
        break;
      case 'inProgress':
        this.inProgressList.push(taskToMove);
        break;
      case 'complete':
        this.completeList.push(taskToMove);
        break;
    }
  }

  // получение следующего id для задачи
  getNextId(destination: string): number {
    let nextId = 1;
    switch (destination) {
      case 'todo':
        nextId = this.todoList.length + 1;
        break;
      case 'inProgress':
        nextId = this.inProgressList.length + 1;
        break;
      case 'complete':
        nextId = this.completeList.length + 1;
        break;
    }
    return nextId;
  }

  // редактирование задачи
  editTask(task: any, list: string) {
    this.editingTask = { ...task };
    this.editingList = list;
  }

  // сохранение изменений
  saveChanges() {
    let index = -1;
    switch (this.editingList) {
      case 'todo':
        index = this.todoList.findIndex(item => item.id === this.editingTask.id);
        if (index !== -1) {
          this.todoList[index] = { ...this.editingTask };
        }
        break;
      case 'inProgress':
        index = this.inProgressList.findIndex(item => item.id === this.editingTask.id);
        if (index !== -1) {
          this.inProgressList[index] = { ...this.editingTask };
        }
        break;
      case 'complete':
        index = this.completeList.findIndex(item => item.id === this.editingTask.id);
        if (index !== -1) {
          this.completeList[index] = { ...this.editingTask };
        }
        break;
    }
    this.editingTask = null;
    this.editingList = '';
  }

  // отмена редактирования
  cancelEdit() {
    this.editingTask = null;
    this.editingList = '';
  }

  // фильтрация задач по поисковому термину
  filterTasks(list: any[]): any[] {
    if (!this.searchTerm.trim()) {
      return list;
    }
    const searchTermLC = this.searchTerm.toLowerCase();
    return list.filter(item =>
      item.title.toLowerCase().includes(searchTermLC) ||
      item.description.toLowerCase().includes(searchTermLC) ||
      item.tag.toLowerCase().includes(searchTermLC)
    );
  }
}
