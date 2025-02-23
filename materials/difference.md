# Отличия от С и С++

## Процесс компиляции / интерпретации

В первую очередь JavaScript — это интерпретируемый язык. Это означает, что код преобразуется в байт-код, который выполняется виртуальной машиной в веб-браузере или в другой среде. Поэтому он очень универсален — программа на JavaScript может запускаться практически в любой системе, и это одна из причин, почему он используется при создании кроссплатформенных и браузерных приложений. Но нужно понимать, что JavaScript был разработан главным образом для того, чтобы дать разработчикам возможность разрабатывать программы, которые будут эффективно работать в браузере.

C++ — это компилируемый язык. Это означает, что при запуске его кода компилятор компилирует код непосредственно в машинные коды без какого-либо посредника (виртуальной машины) вообще. Он уже не такой универсальный — коды в основном специфичны для платформы или системы, для которой он был разработан. Вот почему он часто используется для написания основных компонентов операционной системы и для создания приложений с высокой производительностью, например игры.

## Сборка мусора

В JS есть сборка мусора. Это означает, что когда ваша программа выделяет память, эта память автоматически освобождается, когда она больше не используется. В C++ используется ручное управление памятью, а это означает, что программисту приходится освобождать память явно. Эта ситуация значительно улучшилась со времен C++11, стандарт которого предоставляет «умные» указатели.

## Типизация

Javascript — динамичный и слабо типизированный язык программирования. Для объявления переменных в JavaScript не нужно указывать тип данных переменной, можно использовать ключевые слова `var` (ES5) или `let` (ES6), или `const`. В C++ ситуация совершенно иная, поскольку вы должны убедиться, что используете правильный тип данных при объявлении любой переменной. В C++ вы, как правило, отвечаете практически за все управление памятью (выделение и освобождение памяти), используя ключевые слова `new / malloc` и `delete / free` для выделения и освобождения памяти соответственно.

## ООП

JavaScript и C/C++ имеют разные подходы к объектно-ориентированному програмиированию.

- JavaScript использует прототипную модель объектов, где каждый объект имеет прототип, от которого он наследует свойства и методы. По сути, нет явного понятия классов; объекты создаются путем наследования от других объектов или создания новых объектов с прототипами. В JavaScript объекты являются динамическими, и свойства могут добавляться или изменяться во время выполнения,а прототипы и замыкания используются д ля создания моделей данных и шаблонов проектирования.

- C/C++ используют классическую модель ООП с явными классами и иерархиями наследования. Классы определяют шаблоны объектов, описывая их свойства и методы. В C/C++ структуры и классы являются статическими, и их свойства определяются на этапе компиляции.
Используются классические объектно-ориентированные парадигмы, такие как наследование, инкапсуляция, и полиморфизм. Программирование основано на объектах и методах классов.
