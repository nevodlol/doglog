# DogLog

Ещё не очень готовая, но *уникальная в своём роде* система учёта служебных собак.

## Технологический стек

### Фронтенд

- **React** v19.2.0
- **Vite** v7.3.1
- **react-router-dom** v7.13.1
- **Ant Design** v6.3.1

### Бэкенд

- **FastAPI** 
- **Uvicorn**
- **SQLAlchemy**
- **PostgreSQL**

## Функции

На данный момент реализованы:

- Псевдоавторизация
- to be continued...

# Установка

Если совсем заняться нечем, можно попробовать установить это на компьютер. Вдруг заработает?

## Требования
- [Node.js](https://nodejs.org/en/download/current)
- npm (тоже по ссылке выше устанавливается)
- [Python](https://www.python.org/downloads)


## Windows

```powershell
# 1. Клонируйте репозиторий
git clone https://github.com/nevodlol/doglog.git
cd doglog

# 2. Установте зависимости
cd frontend
npm install
cd ../backend
python -m venv venv
venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install -r requirements.txt

# 3. Настройте переменные окружения
Copy-Item .env.example .env
# Подставьте свои значения в полученном файле .env

# 4. ЗАПУСК!!!
npm run dev:all
```

## Linux/Mac

```bash
# 1. Клонируйте репозиторий
git clone https://github.com/nevodlol/doglog.git
cd doglog

# 2. Установим зависимости
cd frontend
npm install
cd ../backend
python -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# 3. Настроим переменные окружения
cp .env.example .env
# Подставьте свои значения в полученном файле .env

# 4. ЗАПУСК!!!
cd ..
npm run dev:all
```

# Лицензия

абсолютно все права защищены и охраняются по законам тёмных двадцатых. 