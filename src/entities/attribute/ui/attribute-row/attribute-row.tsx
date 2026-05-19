import { type FC, type ReactNode } from 'react';
import { Badge, Group, Paper, Stack, Text } from '@mantine/core';
import type { IAttribute } from '../../types';
import { formatRange, formatValue, UNKNOWN_ATTR_NAME } from '../../utils';

interface IAttributeRowProps {
  attr: IAttribute;
  isChanged: boolean;
  actions: ReactNode;
  noteContent: ReactNode;
}

export const AttributeRow: FC<IAttributeRowProps> = ({
  attr,
  isChanged,
  actions,
  noteContent,
}) => {
  const isNamed = attr.name && attr.name !== UNKNOWN_ATTR_NAME;
  const rangeText = formatRange(attr.range);

  return (
    <Paper
      withBorder
      p="sm"
      style={{
        backgroundColor: isChanged
          ? 'color-mix(in srgb, var(--mantine-color-blue-9) 15%, transparent)'
          : undefined,
        transition: 'background-color 300ms ease',
      }}
    >
      <Stack
        gap={4}
        h="100%"
      >
        <Group
          gap="xs"
          align="baseline"
        >
          <Text
            fw={600}
            ff="monospace"
            size="sm"
          >
            code {attr.codeKey}
          </Text>
          <Badge
            size="xs"
            variant="light"
            color={isNamed ? 'blue' : 'gray'}
          >
            {attr.name}
          </Badge>
        </Group>
        <Text size="sm">{formatValue(attr)}</Text>
        {rangeText && (
          <Text
            size="xs"
            c="dimmed"
          >
            {rangeText}
          </Text>
        )}
        {noteContent}
        {actions}
      </Stack>
    </Paper>
  );
};
