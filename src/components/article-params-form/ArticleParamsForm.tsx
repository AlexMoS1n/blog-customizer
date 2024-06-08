import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';

type TArticleParamsFormProps = {
	setSettings: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setSettings }: TArticleParamsFormProps) => {
	//Состояние для открытия/закрытия формы
	const [isOpen, setIsOpen] = useState<boolean>(false);

	//Настройки, которые указывает пользователь в процессе заполнения формы
	const [userSettings, setUserSettings] =
		useState<ArticleStateType>(defaultArticleState);

	//Функция для применения настроек, указанных пользователем в форме
	function submitForm(event: FormEvent) {
		event.preventDefault();
		setSettings(userSettings);
	}

	//Функция для сброса настроек к дефолтным
	function resetForm(event: FormEvent) {
		event.preventDefault();
		setUserSettings(defaultArticleState);
		setSettings(defaultArticleState);
	}

	//Универсальная функция для записи опции поля формы в пользовательские настройки
	function saveOption(option: keyof ArticleStateType) {
		return (selected: OptionType): void => {
			setUserSettings({ ...userSettings, [option]: selected });
		};
	}

	//Найдем общий контейнер компонента
	const refContainer = useRef<HTMLDivElement | null>(null);

	//Функция для закрытия формы настроек по нажатию клавишей мыши вне этой формы, если она открыта
	function handleMouseClick(event: MouseEvent) {
		if (refContainer.current && (event.target as Node)) {
			if (!refContainer.current.contains(event.target as Node) && isOpen) {
				setIsOpen(false);
			}
		}
	}

	//Привяжем к window через слушаетель событий функцию handleMouseClick после рендера компонента и отвяжем после размонтирования компонента
	useEffect(() => {
		window.addEventListener('mousedown', handleMouseClick);
		return () => {
			window.removeEventListener('mousedown', handleMouseClick);
		};
	}, [isOpen]);

	return (
		<div ref={refContainer} className={styles.wrapperForm}>
			<ArrowButton
				isOpen={isOpen}
				handleClickArrow={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={submitForm} onReset={resetForm}>
					<Text
						size={31}
						weight={800}
						fontStyle={'normal'}
						uppercase={true}
						align={'left'}
						family='open-sans'>
						Задайте параметры
					</Text>
					<Select
						selected={userSettings.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={saveOption('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={userSettings.fontSizeOption}
						onChange={saveOption('fontSizeOption')}
						title='рАЗМЕР шрифта'
					/>
					<Select
						selected={userSettings.fontColor}
						options={fontColors}
						onChange={saveOption('fontColor')}
						title={'Цвет шрифта'}
					/>
					<Separator />
					<Select
						selected={userSettings.backgroundColor}
						options={backgroundColors}
						onChange={saveOption('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						selected={userSettings.contentWidth}
						options={contentWidthArr}
						onChange={saveOption('contentWidth')}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
