let users = [
    {
      id: 1,
      firstName: 'Jane',
      lastName: 'Doe',
      age: 28,
      department: 'IT',
    },
    {
      id: 2,
      firstName: 'John',
      lastName: 'Doe',
      age: 26,
      department: 'HR',
    },
    {
      id: 3,
      firstName: 'Jane',
      lastName: 'Doe',
      age: 24,
      department: 'Marketing',
    },
    {
      id: 4,
      firstName: 'John',
      lastName: 'Heh',
      age: 32,
      department: 'IT',
    },
  ];
  
  // в update логика такая:
  // ты получаешь объект пользователя и массив всех пользователей
  
  // проходишься по всем пользователям (именно по всем) т е длинна массива будет такая же (это важно)
  // внутри прохода проверяешь если id пользователя равен id пользотеля которого ты хочешь обновить
  // меняешь данные, если нет - возвращаешь просто данные
  const updatedUser = {
    id: 2,
    firstName: "Ilya",
    lastName: 'NL',
    age: 26,
    department: 'Cs',
  }

const addsers = (users, newUser) => {
    const existingUser = users.find(user => user.id === newUser.id);
    if (existingUser) {
        console.error('User already exists');
        return users;
    }
    return [...users, newUser];
  };
  
  const newUser = {
    id: 123
  };
  
  const all = addsers(users, newUser);
  // console.log(all);
  
  
  // Функция принимает в себя данные и фильтры:
  // Ниже примеры фильтров:
  // { filters: { firstName: 'John' }, sort: { firstName: 'ASC' }} // фильтр по имени и сортировка по возрастанию
  // { filters: { age: 15 }, sort: { firstName: 'DESC' } } // фильтр по возрасту и сортировка по убыванию
  // { filters: {}, sort: { age: 'ASC' } } // сортировка по возрастанию без фильтров
  // { filters: { department: 'IT' } } // фильтр без сортировки
  
  // Возвращает отфильтрованные и отсортированные данные
  const filters = {
     filters: { firstName: 'Jane' }, 
     sorters: { age: 'ASC' }
  }
  const getUsers = (users, filters) => {
    let resultData = [];
    if (Object.keys(filters.filters).length) { // Object.keys(filters.filters) = ['firstName']
      const filterKey = Object.keys(filters.filters)[0];
      const filterValue = filters.filters[filterKey];
      resultData = users.filter((user) => user[filterKey] === filterValue);
    }
    if (Object.keys(filters.sorters).length) { // сортировка по не известному полю, пример находиться в index.js sortArray 467 string
      
      resultData.sort((a, b) => { // нужно понять по какому полю сортировать и по какому типо ASC это по убыванию DESC это по возрастанию поле получаю через Object.keys а ASC/DESC через if
        const sortKey = Object.keys(filters.sorters)[0];
        const sortValue = filters.sorters[sortKey];
        if (sortValue === 'ASC') {
          return a[sortKey] - b[sortKey];
        } else if (sortValue === 'DESC') {
          return b[sortKey] - a[sortKey];
        }
      });
    }
        return resultData;
  };
  console.log(getUsers(users, filters));

  //  1, найти пользователя в массиве всех пользователей по id 
  // 2, изменить все данные пользователя на userData кроме id
  // 3, вернуть нового пользователя
  const editUser = (id, userData) => {
    const existingUser = users.find(user => user.id === id);
    if (!existingUser) {
      return console.error('user not found');
    }
    return {
      id: id,
      ...userData // копирование свойств обьекта через spread оператор
    }
  }

  
  




  
  // Функция принимает в себя данные и нового пользователя и данные которые уже существуют
  // Возвращает новый массив с добавленным пользователем
  // Проверка: Если пользователь с таким id уже существует, то возвращаем тот же массив и пишем в консоль ошибку (console.error) console.error('User already exists')
  // Все поля должны быть заполнены как в примере данных в массиве users
  // newUser = объект с данными нового пользователя
  // const addUsers = (users, newUser) => {
  //   // Решение тут
  // }
  
  // Функция принимает в себя данные и id пользователя которого нужно удалить
  // Возвращает новый массив без удаленного пользователя
  // Проверка: Если пользователь с таким id не существует, то возвращаем тот же массив и пишем в консоль ошибку (console.error)
  // const deleteUser = (users, id) => {
  //   const index = users.findIndex(user => user.id === id);
  //   if (index === -1) {
  //     console.error('Ошибка! Удалить не существующего пользователя не возможно.');
  //     return users;
  //   }
  //   return users.filter(user => user.id !== id);
  // };
  
  // const deletedUsers = deleteUser(users, 9);
  // console.log('удалены все кроме', deletedUsers);
  
  
  
  // Функция принимает в себя данные и модель пользователя которого нужно обновить и данные которые нужно обновить (модель обязательно должна содержать id)
  // Возвращает новый массив с обновленным пользователем
  // Проверка: Если пользователь с таким id не существует, то возвращаем тот же массив и пишем в консоль ошибку (console.error)
  // updatedUser = объект с данными пользователя и существующим id
  
  
  
  // Бонусное задание
  // Отрисовать данные в html и добавить кнопки для управления этими функциями
  // const renderData = (users) => {
  //   const table = document.getElementById('table');
  //   return users.map(user => {
  //       const tr = document.createElement('tr');
  //       tr.innerHTML = `
  //           <td>${user.id}</td>
  //       `;
  //       table.appendChild(tr);
  //   })
  // }
  
  // renderData(users)
  //
  // const updateUser = (users, updatedUser) => {
  //   return users.map(user => {
  //       if(user.id === updatedUser.id) {
  //         return {...updatedUser };
  //       }
  //       return user;
  //   })
  // };
  
  // console.log(updateUser(users, updatedUser));