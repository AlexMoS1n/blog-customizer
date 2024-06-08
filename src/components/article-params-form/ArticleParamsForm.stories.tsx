import type { Meta, StoryObj } from '@storybook/react';
import { FormEvent, useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { ArticleParamsForm } from './ArticleParamsForm';
import { ArrowButton } from '../arrow-button/ArrowButton';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Button } from '../button/Button';
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

const meta: Meta<typeof ArticleParamsForm> = {
	component: ArticleParamsForm,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArticleParamsForm>;

const ArticleParamsFormModel = () => {
	const [userSettings, setUserSettings] =
		useState<ArticleStateType>(defaultArticleState);
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
	function saveOption(option: keyof ArticleStateType) {
		return (selected: OptionType): void => {
			setUserSettings({ ...userSettings, [option]: selected });
		};
	}
	const refContainer = useRef<HTMLDivElement | null>(null);
	function handleMouseClick(event: MouseEvent) {
		if (refContainer.current && (event.target as Node)) {
			if (!refContainer.current.contains(event.target as Node) && isMenuOpen) {
				setIsMenuOpen(false);
			}
		}
	}

	useEffect(() => {
		window.addEventListener('mousedown', handleMouseClick);
		return () => {
			window.removeEventListener('mousedown', handleMouseClick);
		};
	}, [isMenuOpen]);

	return (
		<div ref={refContainer} className={styles.wrapperForm}>
			<ArrowButton
				isMenuOpen={isMenuOpen}
				handleClickArrow={() => setIsMenuOpen(!isMenuOpen)}
			/>
			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={(event: FormEvent) => {
						event.preventDefault();
						console.log('Пользовательские настройки применены');
					}}
					onReset={(event: FormEvent) => {
						event.preventDefault();
						console.log('Настройки сброщены до дефолтных');
					}}>
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

export const ArticleParamsFormStory: Story = {
	render: () => <ArticleParamsFormModel />,
};
