import { type FC } from 'react';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';

export const ThemeToggle: FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const handleClick = (): void => {
    toggleColorScheme();
  };

  return (
    <ActionIcon
      variant="default"
      size="md"
      onClick={handleClick}
      title={isDark ? 'Светлая тема' : 'Тёмная тема'}
      aria-label={isDark ? 'Светлая тема' : 'Тёмная тема'}
    >
      {isDark ? '☀' : '☾'}
    </ActionIcon>
  );
};
