import cn from 'classnames';

import { InputProps, InputSize } from '@components/Input/types';

import { phoneFormatter } from '@utils/phoneFormatter';

import styles from './styles.scss';

const classSizes: Record<InputSize, string> = {
  lg: styles.Input__lg,
  md: styles.Input__md,
  sm: styles.Input__sm,
};

export function Input({
  value,
  placeholder,
  onChange,
  notification,
  required,
  theme = 'white',
  inputSize = 'md',
  label,
  name,
  onBlur,
  regExp,
  isPhone,
}: InputProps) {
  function onChangeInput(e) {
    let newValue = e.target.value;
    if (regExp) {
      newValue = e.target.value.replace(regExp, '');
      if (isPhone && newValue) {
        newValue = phoneFormatter(newValue);
      }
      onChange({ name, value: newValue });
    } else {
      onChange({ name, value: e.target.value });
    }
  }

  function onBlurInput(e) {
    if (onBlur) {
      onBlur(name);
    }
  }

  return (
    <label
      className={cn(styles.Input, classSizes[inputSize], {
        [styles.Input_black]: theme === 'white',
        [styles.Input_notEmpty]: !!value,
      })}
    >
      {label && <p className={styles.Input__label}>{label}</p>}
      <input
        className={styles.Input__field}
        type="text"
        value={value || ''}
        placeholder={placeholder}
        onChange={onChangeInput}
        onBlur={onBlurInput}
      />
      <div className={styles.Input__bg} />
      {notification && <p className={styles.Input__notification}>{notification}</p>}
      {required && <span className={styles.Input__required} />}
    </label>
  );
}
