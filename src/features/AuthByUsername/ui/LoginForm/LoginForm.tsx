import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = (props: LoginFormProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation();

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Input
                className={cls.input}
                placeholder={t('Введите имя')}
                type="text"
                autofocus
            />
            <Input
                className={cls.input}
                placeholder={t('Введите пароль')}
                type="text"
            />
            <Button
                className={cls.loginBtn}
            >
                {t('Войти')}
            </Button>
        </div>
    );
};
