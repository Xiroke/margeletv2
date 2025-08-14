import { memo, } from 'react';
import type { FC } from 'react';

import { clsx } from 'clsx';

import cls from './<FTName | capitalize>.module.scss';

interface <FTName | capitalize>Props {
    className?: string,
};

/** Докстринг */
export const <FTName | capitalize >: FC <<FTName | capitalize>Props> = memo((
    props: <FTName | capitalize>Props
) => {
    const {
        className,
    } = props;

    return (
        <div className={clsx(cls.<FTName | snakecase>, className)}>
            test
        </div>
    );
});
