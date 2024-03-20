const button1 = document.querySelector('.btn'); //! доступ к кнопке
button1.addEventListener('click', (event) => {
  event.preventDefault(); // чтоб страница не обновлялась

  //! Колонка 1
  const container = document.querySelector('.container'); // доступ к таблице
  const allColumn1 = document.querySelectorAll('.column1');
  const newColumn1 = document.createElement('div');
  const newColumn1Full = document.createElement('div');
  newColumn1.className = 'column1';
  newColumn1Full.className = 'full1';
  newColumn1.style.cssText = `
  border-radius:   0  0  0 8px;
  `;
  newColumn1Full.style.cssText = `
  display: none;
  position: fixed;
  background-color: white;
  border: 1px solid black;
  font-size: 25px;
  min-height: 30px;
  border-radius: 8px;
  font-family: "Caveat", cursive;
  `;
  for (let i = 0; i < allColumn1.length; i += 1) {
    allColumn1[allColumn1.length - 1].style.cssText = `
    border-radius:  0 0px 0 0 ;`;
    allColumn1[0].style.cssText = `
    border-radius:  8px 0  0 0 ;`;
  }
  container.appendChild(newColumn1); // создали первую колонку
  container.appendChild(newColumn1Full);

  //! Класс Word
  const newWord = document.createElement('div');
  newWord.className = 'word';
  newColumn1.appendChild(newWord);

  //! Числа
  const newNumber = document.createElement('div');
  newNumber.className = 'number';
  newWord.appendChild(newNumber);
  const allNumber = document.querySelectorAll('.number');
  newNumber.innerText = `${allNumber.length}.`; // нумерация

  //! Ввод текста при нажатии на кнопку "Перевести" .btn1
  const newCyrillic = document.createElement('div');
  const addText = document.querySelector('.search').value;
  newCyrillic.className = 'cyrillic';
  newWord.appendChild(newCyrillic);
  newCyrillic.innerText = addText; // добавляем текст в новую строку колонки
  newColumn1Full.innerText = addText;
  document.querySelector('.search').value = ''; // очищаем поле ввода текста

  //! Колонка 2
  const allColumn2 = document.querySelectorAll('.column2');
  const newColumn2 = document.createElement('div');
  const newColumn2Full = document.createElement('div');
  newColumn2.className = 'column2';
  newColumn2Full.className = 'full2';
  newColumn2.style.cssText = `
  border-radius:  0 0 8px 0; 
  `; // при добавлении текста меняем углы первой строки
  newColumn2Full.style.cssText = `
  display: none;
  position: fixed;
  background-color: white;
  border: 1px solid black;
  font-size: 25px;
  min-height: 30px;
  border-radius: 8px;
  font-family: "Caveat", cursive;
  `;
  for (let i = 0; i < allColumn2.length; i += 1) {
    allColumn2[allColumn2.length - 1].style.cssText = `
    border-radius:  0 0px 0 0 ;`; // средние строки без скругления
    allColumn2[0].style.cssText = `
    border-radius:  0 8px 0 0 ;`; // в колонках скругляем углы при добавлении текста
  }
  container.appendChild(newColumn2);
  container.appendChild(newColumn2Full);

  const newTranslit = document.createElement('div');
  newTranslit.className = 'translit';
  newTranslit.innerText = addText; // добавляем текст в новую строку колонки с поисковой строки
  newColumn2.appendChild(newTranslit);

  //! Кнопка Удалить строку
  const Uninstall = document.querySelector('.uninstall');
  const newUninstall = Uninstall.cloneNode(true);
  newColumn2.appendChild(newUninstall); // клонируем класс uninstall с иконкой

  newUninstall.addEventListener('click', () => {
    event.preventDefault(); // чтоб страница не обновлялась
    newColumn1.remove(newColumn1);
    newColumn2.remove(newColumn2); // кнопка построчного удаления
    newColumn2Full.remove(newColumn2Full);

    //! Обновляем нумерацию
    const allNumber = document.querySelectorAll('.number');
    const updateNumbers = () => {
      for (let i = 0; i < allNumber.length; i += 1) {
        allNumber[i].innerText = `${i + 1}.`;
      }
    };
    updateNumbers();
  });

  //! !! Функция Translit
  function transliter(word) {
    let result = '';
    const converter = {
      а: 'a',
      б: 'b',
      в: 'v',
      г: 'g',
      д: 'd',
      е: 'e',
      ё: 'e',
      ж: 'zh',
      з: 'z',
      и: 'i',
      й: 'y',
      к: 'k',
      л: 'l',
      м: 'm',
      н: 'n',
      о: 'o',
      п: 'p',
      р: 'r',
      с: 's',
      т: 't',
      у: 'u',
      ф: 'f',
      х: 'h',
      ц: 'c',
      ч: 'ch',
      ш: 'sh',
      щ: 'sch',
      ь: '',
      ы: 'y',
      ъ: '',
      э: 'e',
      ю: 'yu',
      я: 'ia',

      А: 'A',
      Б: 'B',
      В: 'V',
      Г: 'G',
      Д: 'D',
      Е: 'E',
      Ё: 'E',
      Ж: 'Zh',
      З: 'Z',
      И: 'I',
      Й: 'Y',
      К: 'K',
      Л: 'L',
      М: 'M',
      Н: 'N',
      О: 'O',
      П: 'P',
      Р: 'R',
      С: 'S',
      Т: 'T',
      У: 'U',
      Ф: 'F',
      Х: 'H',
      Ц: 'C',
      Ч: 'Ch',
      Ш: 'Sh',
      Щ: 'Sch',
      Ь: '',
      Ы: 'Y',
      Ъ: '',
      Э: 'E',
      Ю: 'Yu',
      Я: 'ia',
    };
    for (let i = 0; i < word.length; i += 1) {
      if (converter[word[i]] === undefined) {
        result += word[i];
      } else {
        result += converter[word[i]];
      }
    }
    return result;
  }
  newTranslit.innerText = transliter(addText);
  newColumn2Full.innerText = newTranslit.innerText;

  //! Подсказки
  if (newTranslit.innerText.length > 12) {
    newColumn1.addEventListener('mouseover', () => {
      tooltipToggle(newColumn1Full, 'block');
    });
    newColumn2.addEventListener('mouseover', () => {
      tooltipToggle(newColumn2Full, 'block');
    });

    newColumn1.addEventListener('mouseleave', () => {
      tooltipToggle(newColumn1Full, 'none');
    });
    newColumn2.addEventListener('mouseleave', () => {
      tooltipToggle(newColumn2Full, 'none');
    });

    function tooltipToggle(elem, status) {
      elem.style.display = status;
    }

    // addEventListener('unload', (event) => {});
    newColumn1.addEventListener('mousemove', (event) => {
      const wordWidth = event.target.offsetWidth;
      const tooltipWidth = newColumn1Full.offsetWidth;
      const tooltipHeight = newColumn1Full.offsetHeight;
      const tooltipTop = event.clientY - tooltipHeight - 10;
      const tooltipLeft = event.clientX - tooltipWidth / 2 + wordWidth / 2;
      newColumn1Full.style.top = `${tooltipTop}px`;
      newColumn1Full.style.left = `${tooltipLeft}px`;
    });
    newColumn2.addEventListener('mousemove', (event) => {
      const wordWidth = event.target.offsetWidth;
      const tooltipWidth = newColumn2Full.offsetWidth;
      const tooltipHeight = newColumn2Full.offsetHeight;
      const tooltipTop = event.clientY - tooltipHeight - 10;
      const tooltipLeft = event.clientX - tooltipWidth / 2 + wordWidth / 2;
      newColumn2Full.style.top = `${tooltipTop}px`;
      newColumn2Full.style.left = `${tooltipLeft}px`;
    });
  }

  //!  Обрезка слов в колонке
  function cutWord(str) {
    let result = '';
    if (str.length > 12) {
      result = `${str.slice(0, 12)}...`;
    } else {
      result = str;
    }
    return result;
  }
  newCyrillic.innerText = cutWord(addText);
  newTranslit.innerText = cutWord(newTranslit.innerText);
});

//! Кнопка Очистить всё
const button2 = document.querySelector('.btn2');
button2.addEventListener('click', () => {
  event.preventDefault();
  const container = document.querySelector('.container'); // доступ к таблице
  while (container.children.length > 2) {
    container.removeChild(container.lastChild); // очистить всё, кроме 2-х элементов
  }
  const allColumn1 = document.querySelectorAll('.column1');
  const allColumn2 = document.querySelectorAll('.column2');
  allColumn2[0].style.cssText = `
    border-radius:  0 8px 8px 0;`; // в колонках скругляем углы при очистке
  allColumn1[0].style.cssText = `
    border-radius:  8px 0 0 8px;`; // в колонках скругляем углы при очистке
});
