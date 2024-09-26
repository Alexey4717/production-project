import { classNames } from 'shared/lib/classNames/classNames';
import './Loader.scss';

interface LoaderProps {
  className?: string;
}

// Скопировано с источника https://loading.io/css/
export const Loader = ({ className }: LoaderProps) => (
    <div className={classNames('lds-ring', {}, [className])}>
        <div />
        <div />
        <div />
        <div />
    </div>
);
