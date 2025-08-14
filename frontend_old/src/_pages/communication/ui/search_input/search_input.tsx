import { ChangeEvent, HTMLAttributes, useState } from "react";

import InputText from "@/shared/ui/inputs/input_text";
import styles from "./search_input.module.scss";
import { useAppDispatch } from "@/shared/lib/hooks";
import { setSearchQuery } from "@/entities/group/model/slice";

export interface SearchInputProps extends HTMLAttributes<HTMLDivElement> {}

export const SearchInput = ({}: SearchInputProps) => {
  const dispatch = useAppDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <InputText
      name="search"
      placeholder="Поиск..."
      classNameInput={styles.search_input}
      onChange={onChange}
    />
  );
};

export default SearchInput;
