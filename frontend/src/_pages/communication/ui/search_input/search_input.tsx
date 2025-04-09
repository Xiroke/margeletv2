import { HTMLAttributes } from 'react';

import InputText from '@/shared/ui/inputs/input_text';
import styles from './search_input.module.scss';

export interface SearchInputProps extends HTMLAttributes<HTMLDivElement> {}

export const SearchInput = ({}: SearchInputProps) => {
  return <InputText name="search" placeholder="Поиск..." classNameInput={styles.search_input} />;
};

export default SearchInput;
