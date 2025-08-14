import { memo, } from 'react';
import type { FC } from 'react';

import { clsx } from 'clsx';

import cls from './Input.module.scss';

interface InputProps {
    className?: string,
};

/** Докстринг */
export const Input: FC <InputProps> = memo((
    props: InputProps
) => {
    const {
        className,
    } = props;

    return (
        <div className={clsx(cls.input, className)}>
            test
        </div>
    );
});
