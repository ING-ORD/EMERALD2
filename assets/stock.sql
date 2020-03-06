-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Мар 02 2020 г., 17:09
-- Версия сервера: 5.6.41-log
-- Версия PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `stock`
--

-- --------------------------------------------------------

--
-- Структура таблицы `active`
--

CREATE TABLE `active` (
  `id` int(11) NOT NULL,
  `item` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `active`
--

INSERT INTO `active` (`id`, `item`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `buys`
--

CREATE TABLE `buys` (
  `id` int(11) NOT NULL,
  `id_client` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `cells`
--

CREATE TABLE `cells` (
  `id` int(11) NOT NULL,
  `product` int(11) NOT NULL,
  `busy` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `cells`
--

INSERT INTO `cells` (`id`, `product`, `busy`) VALUES
(1, 1, 0),
(2, 1, 0),
(3, 1, 0),
(4, 2, 0),
(5, 2, 0),
(6, 2, 0),
(7, 0, 0),
(8, 0, 0),
(9, 0, 0),
(10, 3, 0),
(11, 3, 0),
(12, 3, 0),
(13, 4, 0),
(14, 4, 0),
(15, 4, 0),
(16, 0, 0),
(17, 0, 0),
(18, 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `destination` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `clients`
--

INSERT INTO `clients` (`id`, `name`, `destination`) VALUES
(1, 'Центральный', 'Минская 45'),
(2, 'Восточный', 'Водоканал'),
(3, 'Ленинский', 'КЦПТ'),
(4, 'Калининский', 'ТГУ');

-- --------------------------------------------------------

--
-- Структура таблицы `drivers`
--

CREATE TABLE `drivers` (
  `id` int(11) NOT NULL,
  `vk` int(11) NOT NULL,
  `name` text NOT NULL,
  `type` int(11) DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `drivers`
--

INSERT INTO `drivers` (`id`, `vk`, `name`, `type`, `capacity`, `status`) VALUES
(1, 157405893, 'Игнат', 0, 3, 1),
(2, 184936981, 'Снежана', 1, 2, 0),
(3, 286697042, 'Даша', 1, 2, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `list_products`
--

CREATE TABLE `list_products` (
  `id` int(11) NOT NULL,
  `buy` int(11) NOT NULL,
  `product` int(11) NOT NULL,
  `count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `list_products`
--

INSERT INTO `list_products` (`id`, `buy`, `product`, `count`) VALUES
(9, 1, 1, 1),
(10, 1, 2, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `plan`
--

CREATE TABLE `plan` (
  `id` int(11) NOT NULL,
  `item` int(11) NOT NULL,
  `line` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `destination` int(11) NOT NULL COMMENT 'id_destination в зависимости от type перевозки , либо id client ,либо id provider',
  `product` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `driver` int(11) DEFAULT NULL,
  `completed` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `plan`
--

INSERT INTO `plan` (`id`, `item`, `line`, `type`, `destination`, `product`, `count`, `driver`, `completed`) VALUES
(28, 1, 0, 0, 1, 2, 1, 1, 1),
(29, 1, 1, 1, 1, 2, 1, 2, 1),
(30, 1, 2, 0, 1, 1, 1, 1, 1),
(31, 1, 3, 1, 3, 1, 1, 3, 1),
(32, 1, 4, 0, 1, 3, 1, 1, 1),
(33, 1, 5, 1, 4, 3, 1, 2, 1),
(34, 1, 6, 0, 1, 1, 1, 1, 0),
(35, 1, 7, 0, 1, 1, 1, 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `url_img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `name`, `url_img`) VALUES
(1, 'Цемент', 'https://bud-ukraine.com.ua/wp-content/uploads/06-06-cement-bulk-500-1000x1000.png'),
(2, 'Вода', 'https://st12.stpulscen.ru/images/product/147/482/243_big.jpg'),
(3, 'Соль', 'https://retohercules.com/images/salt-2.png'),
(4, 'Плитка тротуарная', 'https://russ-kirpich.ru/media/173/17367.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `providers`
--

CREATE TABLE `providers` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `destination` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `providers`
--

INSERT INTO `providers` (`id`, `name`, `destination`) VALUES
(1, 'ООО ВОДА', 'Кирова'),
(2, 'ООО ЦЕМЕНТ', 'Червяк');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `active`
--
ALTER TABLE `active`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `buys`
--
ALTER TABLE `buys`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `cells`
--
ALTER TABLE `cells`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `list_products`
--
ALTER TABLE `list_products`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `providers`
--
ALTER TABLE `providers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `active`
--
ALTER TABLE `active`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `buys`
--
ALTER TABLE `buys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `cells`
--
ALTER TABLE `cells`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT для таблицы `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `drivers`
--
ALTER TABLE `drivers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `list_products`
--
ALTER TABLE `list_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `plan`
--
ALTER TABLE `plan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `providers`
--
ALTER TABLE `providers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
