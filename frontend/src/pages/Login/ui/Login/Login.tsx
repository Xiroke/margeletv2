import { memo, } from 'react';
import type { FC } from 'react';

import { clsx } from 'clsx';

import cls from './Login.module.scss';

interface LoginProps {
    className?: string,
};

/** Докстринг */
export const Login: FC <LoginProps> = memo((
    props: LoginProps
) => {
    const {
        className,
    } = props;

    return (
        <div className={clsx(cls.Login, className)}>
            test
        </div>
    );
});
