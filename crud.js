let users = [
    {
      id: 1,
      firstName: 'Novelress',
      lastName: 'Doe',
      age: 28,
      address: 'street 1',
      color: 'blue'
    },
    {
      id: 2,
      firstName: 'John',
      lastName: 'Doe',
      age: 26,
      address: 'street 2',
      color: 'blue'
    },
    {
      id: 3,
      firstName: 'Jane',
      lastName: 'Doe',
      age: 24,
      address: 'street 3',
      color: 'blue'
    },
    {
      id: 4,
      firstName: 'John',
      lastName: 'Heh',
      age: 24,
      address: 'street 5',
      color: 'blue'
    },
    {
      id: 5,
      firstName: 'John',
      lastName: 'Heh',
      age: 30,
      address: 'street 6',
      color: 'blue'
    },
    {
      id: 6,
      firstName: 'John',
      lastName: 'LolKek',
      age: 38,
      address: 'street 7',
      color: 'blue'
    },
    {
      id: 7,
      firstName: 'Misha',
      lastName: 'Dar',
      age: 32,
      address: 'street 8',
      color: 'blue'
    },
    {
      id: 8,
      firstName: 'Misha',
      lastName: 'Dar',
      age: 32,
      address: 'street 8',
      color: 'blue'
    },
  ];
  




  const getUsers = (users, filters) => {
    let resultData = users;
    if (Object.keys(filters.filters).length) {
      const filterKey = Object.keys(filters.filters)[0];
      const filterValue = filters.filters[filterKey];
      resultData = users.filter((user) => user[filterKey] === filterValue);
    }
    if (Object.keys(filters.sorters).length) { 
      resultData.sort((a, b) => { 
        const sortKey = Object.keys(filters.sorters)[0];
        const sortValue = filters.sorters[sortKey];
        if(typeof a[sortKey] === 'number') {
          if (sortValue === 'ASC') {
            return a[sortKey] - b[sortKey];
          } else if (sortValue === 'DESC') {
            return b[sortKey] - a[sortKey];
          }
        } else {
          if (sortValue === 'ASC') {
            return a[sortKey].localeCompare(b[sortKey]);
          } else if (sortValue === 'DESC') {
            return b[sortKey].localeCompare(a[sortKey]);
          }
        }
      });
    }
        return {data: resultData, filters: filters };
  };

  const addUsers = (users, newUser) => {
      const existingUser = users.find(user => user.id === newUser.id);
      if (existingUser) {
          console.error('User already exists');
          return users;
      }
      return [...users, newUser];
  };

  const deleteUser = (users, id) => {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
      console.error('Error! Can not delete not existing user.');
      return users;
    }
    // return users.filter(user => user.id !== id);
    users.splice(index, 1);
    return users;
  };

  const editUser = (id, userData) => {
    const existingUser = users.find(user => user.id === id);
    if (!existingUser) {
      console.error('User not found');
      return null;
    }
  
    const updatedUser = { ...existingUser, ...userData };
    users = users.map(user => (user.id === id ? updatedUser : user)); // Обновляем массив users
  
    return updatedUser;
  };
  

  const renderData = (data) => {
    let currentFilters = {};
    const insertTableToDOM = () => {
      const table = document.createElement('div');
      table.classList.add('table');
      document.body.appendChild(table);
    }
  
    const getCamelizedTitlesArray = (obj) => {
      return Object.keys(obj).map(objKey => { //получаем все ключи обьектов массива
        const keys = objKey.split(/(?=[A-Z])/); //разделяем в местах где большая буква
        const camelizeWords = keys.map(key => key.charAt(0).toUpperCase() + key.slice(1)); // берем ключи и первую букву большую делаем
        return {name: camelizeWords.join(' '), id: objKey}; // соеденяем
      });
    }

    const createTitles = () => { // создание заголовков таблицы
      const titlesContainer = document.createElement('div'); // контейнер всех заголовков
      titlesContainer.classList.add('table__titles');
      const table = document.getElementsByClassName('table')[0]; 
      table.appendChild(titlesContainer);
  
      // создание заголовков и кнопок сортировки и фильтрации
      getCamelizedTitlesArray(data[0]).map(item => {
        createTitleColumn(item, titlesContainer);
      });
      createTitleTools(titlesContainer);
    }
  
    const createTitleTools = (container) => {
      const tableColumn = document.createElement('div'); //создаем заголовок
      tableColumn.classList.add('table__column');
      const columnText = document.createElement('span'); // создаем текст для ключей
      columnText.innerHTML = 'Tools';
      tableColumn.appendChild(columnText); // добавляем его внутрь колонки
      container.appendChild(tableColumn);
    }

    const createTitleColumn = (columnData, container) => {
      // создание структуры заголовка, включая текст и кнопки
      const tableColumn = document.createElement('div'); //создаем заголовок
      tableColumn.classList.add('table__column');
      const columnText = document.createElement('span'); // создаем текст для ключей
      columnText.innerHTML = columnData.name;
      tableColumn.appendChild(columnText); // добавляем его внутрь колонки
      
      const titleButtonsContainer = document.createElement('div'); // создаем div для кнопок сорта и фильтра
      titleButtonsContainer.classList.add('title-buttons');
  
      const onSorterClick = (type, id) => {
        const filters = {
            filters: {  }, 
            sorters: { [id]: type }
        }
        // Удаляем старую таблицу
        destructTable();
        currentFilters = {...filters};
        // Рендерим таблицу с новыми данными
        renderTable(getUsers(data, filters).data);
      }
      const onFilterClick = (filterKey, filterValue) => {
        const filters = {
          filters: {
            [filterKey]: filterValue,
          },
          sorters: {},
        };
      
        // Удаляем старую таблицу
        destructTable();
        currentFilters = {...filters};
        // Рендерим таблицу с новыми данными
        renderTable(getUsers(data, filters).data);
      };
      
      

      // создание кнопок сортировки и фильтрации
     createSorterButton(titleButtonsContainer,() => onSorterClick('DESC', columnData.id),'sortdesc',columnData.id,'DESC');
     createSorterButton(titleButtonsContainer,() => onSorterClick('ASC', columnData.id),'sortasc',columnData.id,'ASC');

      createFilterButton(titleButtonsContainer, (filterValue) => onFilterClick(columnData.id, filterValue), isActiveFilter(currentFilters, columnData.id) ? 'filters-active.svg' : 'filters.svg');
      
      tableColumn.appendChild(titleButtonsContainer); // добавляем внутрь заголовка
      container.appendChild(tableColumn); // добавляем заголовок внутрь контейнера
    }
  
    const isActiveFilter = (filters, id) => {
      if(Object.keys(filters).length && Object.keys(filters.filters).length) {
        return Boolean(filters.filters[id]);
      }
      return false;
    }

    
    
    const isActiveSorter = (sorters, id, type) => {
      if (sorters && Object.keys(sorters).length && sorters[id] === type) {
        return true;
      }
      return false;
    };
    
    
    const createSorterButton = (container, onClick, icon, id, type) => {
      const sorterButton = document.createElement('button');
      sorterButton.classList.add('button');
      
      const sorterIcon = document.createElement('img');
      sorterIcon.classList.add('button');
      sorterIcon.src = `./${isActiveSorter(currentFilters.sorters, id, type) ? `${icon}-active` : `${icon}`}.jpg`;
    
      sorterButton.appendChild(sorterIcon);
      
      sorterButton.onclick = () => {
        onClick(type, id);

      };
      
      container.appendChild(sorterButton);
    };
    
    const createFilterButton = (container, onClick, icon) => {
      const filterButton = document.createElement('button'); // создание кнопки сортировки
      filterButton.classList.add('button');
      
      const filterIcon = document.createElement('img'); // картинка
      filterIcon.classList.add('button');
      filterIcon.src = `./${icon}`;
      filterButton.appendChild(filterIcon);
      
      const inputFilter = document.createElement('input'); //создаем инпут для ввода текста
      inputFilter.type = 'text';
      inputFilter.placeholder = 'Введи фильтр'; // надпись к нему
      inputFilter.classList.add('filter-input'); 
      
      filterButton.onclick = () => {
        const header = filterButton.closest('.table__column'); // получаем элементы
        header.innerHTML = ''; // удаляем их
        
        header.appendChild(inputFilter);
        
        submitButton = document.createElement('button');
        submitButton.classList.add('button');

        submitButton.onclick = () => {
          const inputValue = inputFilter.value; // получаем текст который ввели
          const numberValue = Number(inputValue); // приводим его к числу для дальнейшей работы
          if (inputValue === '') {
            currentFilters = {};
            renderTable(data);
          }else if (!isNaN(numberValue)) { // если он число
            onClick(numberValue); // вызываем функцию фильтрации с числовым значением
          } else {
            onClick(inputValue); // вызываем функцию фильтрации с текстовым значением
          }
          
          const table = header.closest('.table'); // Получаем таблицу
  
          // Удаляем заголовки и строки данных
          const rows = table.querySelectorAll('.table__row, .table__titles'); // получаем фулл таблицу
          
          rows.forEach(row => {
            row.remove(); //удаляем
          });

          // пересоздаем заголовки
          createTitles();
          
          // пересоздаем
          data.map(item => {
            table.appendChild(createRow(item)); // перерисовываем строки данных
          });
        };
        
        const submitIcon = document.createElement('img');
        submitIcon.classList.add('button'); // такой класс потому что в нем там ширина высота и тд
        submitIcon.src = './check.svg';
        submitButton.appendChild(submitIcon);
        
        header.appendChild(submitButton);
      };
      
      container.appendChild(filterButton);
    };
    
    
  
    const createRow = (rowData) => { 
      const divRow = document.createElement('div'); // создаем ячейку под хранение значений всех ключей
      divRow.classList.add('table__row');
      Object.values(rowData).map(columnData => { //получаем все значения ключей
        createColumn(columnData, divRow); // отрисовываем
      });
      createDeleteColumn(divRow, users, rowData.id);
      return divRow; // возвращаем
    }
  
    const createColumn = (columnData, container) => {
      const tableColumn = document.createElement('div'); // создаем div для ячеек 
      tableColumn.classList.add('table__column');
      tableColumn.innerHTML = columnData;
      container.appendChild(tableColumn); // добавяем этот див внутрь
    }


    const onEditUser = (userId, userData) => {
      const updatedUser = editUser(userId, userData); // вызываем функцию editUser для обновления пользователя
            
      if (updatedUser !== null) { // проверяем, что пользователь успешно обновлен
        users = users.map(item => (item.id === userId) ? { ...userData } : item);
        destructTable();
        renderTable(users); 
        popUpOuter.remove();
      }
    };
    
    
        
    
    
    
    
    
    
    
    
    

    const createDeleteColumn = (container, users, userId) => {
      const tableColumn = document.createElement('div'); // создаем div для ячеек 
      tableColumn.classList.add('table__column');
      
      const deleteButton = document.createElement('button'); // создаем кнопку
      deleteButton.classList.add('delete-button'); // добавляем класс для стилизации
      deleteButton.innerHTML = 'Delete';
    
      deleteButton.onclick = function() {
        users = deleteUser(users, userId); // обновляем исходный массив после удаления
        destructTable();
        renderTable(users);
      };

      const editButton = document.createElement('button'); // создаем кнопку
      editButton.classList.add('edit-button');
      editButton.innerHTML = 'Edit';

      editButton.onclick = function() {
        const userToEdit = users.find(user => user.id === userId); // находим пользователя для редактирования
        createUserPopUp(() => formHandler(userData => onEditUser(userToEdit.id, userData)), false);
        
        const popUpInner = document.getElementById('popUpInner');
        const inputFields = popUpInner.querySelectorAll('input');
        
        Object.entries(userToEdit).forEach(([key, value], index) => {
          inputFields[index].value = value;
          
          // если ключ равен id делаем его только для чтения
          if (key === 'id') {
            inputFields[index].readOnly = true;
          }
        });
      };
      
      
      

      tableColumn.appendChild(editButton);
      tableColumn.appendChild(deleteButton);
      container.appendChild(tableColumn); // добавяем этот див внутрь
    }

    // добавление пользователя

    let addedIds = []; // Переменная для отслеживания добавленных id

    const createTableInput = (key, type, container) => {
      const input = document.createElement('input');
      const id = key + addedIds.length;
      addedIds.push(id);
      
      input.setAttribute('id', id);
      input.setAttribute('type', type);
      input.setAttribute('placeholder', getCamelizedTitle(key));

      container.appendChild(input);

      input.addEventListener('input', function() {
        input.style.borderColor = ''; // 2 вариант он тут больше подходит потому что с онкликом там чуть по другому обрабатываеться
      });

    }
    
    const createTableForm = (container, user) => {
      const form = document.createElement('form');
      container.appendChild(form);
    
      Object.entries(user).map(item => {
        const [key, value] = item;
    
        const type = typeof value === 'string' ? 'string' : 'number';
        createTableInput(key, type, form);
      });
    }
    
    const onAddUser = (userData) => {
      const popUpOuter = document.getElementById('popUpOuter');
      users = addUsers(users, userData);
      popUpOuter.remove();
      destructTable();
      renderTable(users);
    }

    const formHandler = (onSubmit, checkId) => {
      const popUpInner = document.getElementById('popUpInner');
      const inputFields = popUpInner.querySelectorAll('input');
      const idInput = inputFields[0];
    
      const newId = idInput.value;
      let fieldsAreValid = true;
    
      if (checkId && users.some(user => user.id == newId)) {
        idInput.style.borderColor = 'red';
        console.log('hello world')
        fieldsAreValid = false;
      } else {
        idInput.style.borderColor = '';
      }

      inputFields.forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = 'red';
          fieldsAreValid = false;
    
          const originalPlaceholder = input.getAttribute('placeholder');
          input.setAttribute('placeholder', 'Заполните поле');
          setTimeout(() => {
            input.setAttribute('placeholder', originalPlaceholder); 
          }, 2500);
        }
      });
    
      if (!fieldsAreValid) {
        return;
      }
    
      const newUser = {};
      inputFields.forEach(input => {
        newUser[input.id] = input.value;
      });
      onSubmit(newUser);
    }
    
    

    const createApplyButton = (popUpInner, onclick) => {
      const applyButton = document.createElement('button');
      applyButton.setAttribute('id', 'applyButton');
      applyButton.innerText = "Apply";
      popUpInner.appendChild(applyButton);
    
      applyButton.onclick = function() {
        onclick();
      }
    }
    
    
    
    

    const createUserPopUp = (onclick) => {
      const popUpOuter = document.createElement('div');
      popUpOuter.setAttribute('id', 'popUpOuter');
      document.body.appendChild(popUpOuter);
    
      const popUpInner = document.createElement('div');
      popUpInner.setAttribute('id', 'popUpInner');
      popUpOuter.appendChild(popUpInner);
    
      const firstUser = data[0];
      createTableForm(popUpInner, firstUser);
      createApplyButton(popUpInner, onclick); // добавляем кнопку "Apply"
    }
    
    const getCamelizedTitle = (key) => {
      const keys = key.split(/(?=[A-Z])/);
      const camelizeWords = keys.map(key => key.charAt(0).toUpperCase() + key.slice(1));
      return camelizeWords.join(' ');
    }
    
    const renderCreateButton = (onclick) => {
      const addButton = document.createElement('button');
      addButton.setAttribute('id', 'addButton');
      addButton.innerText = "Add User";
      document.body.appendChild(addButton);
    
      addButton.onclick = function() {
        createUserPopUp(onclick);
      }
    }
    
    

    // конец добавления пользователя


    const renderTable = (data) => {
      insertTableToDOM();
      createTitles();
      const table = document.getElementsByClassName('table')[0];

      data.map(item => {
        table.appendChild(createRow(item));
      });
    }

    const destructTable = () => {
      const table = document.getElementsByClassName('table')[0];
      table.innerHTML = '';
    }

    renderCreateButton(() => formHandler(onAddUser, true));

    renderTable(data);
  }
  
  renderData(users);