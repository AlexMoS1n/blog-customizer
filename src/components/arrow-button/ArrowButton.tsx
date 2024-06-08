import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';
import styles from './ArrowButton.module.scss';

/** Тип для пропсов компонента ArrowButton  */
export type TArrowButton = {
	isMenuOpen: boolean;
	handleClickArrow: () => void;
};

export const ArrowButton = ({ isMenuOpen, handleClickArrow }: TArrowButton) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, isMenuOpen && styles.container_open)}
			onClick={handleClickArrow}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, isMenuOpen && styles.arrow_open)}
			/>
		</div>
	);
};
