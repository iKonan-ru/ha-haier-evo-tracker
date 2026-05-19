# Haier Tracker

Трекер изменений атрибутов стиральной машины Haier через API кастомной интеграции [haier_evo](https://github.com/Kononenko-Daniil/haier_evo) для Home Assistant.

## Что делает

- Опрашивает `/api/haier_evo` с заданным интервалом
- Показывает все атрибуты устройства и их текущие значения
- Подсвечивает изменившиеся атрибуты и поднимает их наверх списка
- Ведёт журнал изменений за сессию
- Позволяет оставлять заметки к атрибутам с сохранением в `localStorage`
- Поддерживает экспорт/импорт заметок в JSON

## Запуск

```bash
npm install
npm run dev        # http://localhost:5173
```

По умолчанию запросы проксируются на `http://homeassistant.local:8123`. Переопределить:

```bash
VITE_HA_URL=http://192.168.1.100:8123 npm run dev
```

Хост также можно сменить прямо в интерфейсе без перезапуска — поле «Хост Home Assistant» + кнопка «Применить».

## Сборка

```bash
npm run build        # fix + tsc + vite build → dist/
npm run build:no-lint  # без линтера
npm run preview      # превью production-сборки (прокси на HA не работает)
```

## Команды разработчика

```bash
npm run lint         # ESLint
npm run fix          # prettier + eslint --fix
```

## Стек

| | |
|---|---|
| Vite 7 + React 19 + TypeScript | сборка и UI |
| Mantine 7 | компоненты, тема, хуки |
| Zustand 5 | глобальный стейт |
| ESLint 9 + Prettier 3 | линт и формат |

Архитектура — FSD (Feature-Sliced Design): `app → pages → widgets → features → entities → shared`.

## Использование

1. Запустить `npm run dev`
2. При необходимости сменить хост HA в поле «Хост Home Assistant» и нажать «Применить»
3. Выбрать устройство из выпадающего списка — поллинг запустится автоматически
4. Кнопка «Пауза / Старт» управляет опросом вручную
5. Интервал опроса: 500 мс — 10 с
