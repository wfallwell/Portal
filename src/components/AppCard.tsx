import type { ReactNode } from 'react';
import MuiCard from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import type { CardProps, CardHeaderProps, CardContentProps } from '@mui/material';

export interface AppCardProps extends Omit<CardProps, 'title'> {
  /** Card title (uses CardHeader) */
  title?: ReactNode;
  /** Subtitle below title */
  subtitle?: ReactNode;
  /** Action(s) on the right of the header */
  action?: CardHeaderProps['action'];
  /** Main content. Use CardContent padding via theme. */
  children?: ReactNode;
  /** Props passed to CardContent */
  contentProps?: CardContentProps;
}

/**
 * Design-system card. Surface = theme background.paper, subtle border and shadow.
 * Header: title, optional subtitle, optional action. Content uses theme padding.
 */
export function AppCard({
  title,
  subtitle,
  action,
  children,
  contentProps,
  ...cardProps
}: AppCardProps) {
  const hasHeader = title != null || subtitle != null || action != null;
  return (
    <MuiCard {...cardProps}>
      {hasHeader && (
        <CardHeader
          title={title}
          subheader={subtitle}
          action={action}
          titleTypographyProps={{ variant: 'h6' }}
          subheaderTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
        />
      )}
      {children != null && (
        <CardContent {...contentProps}>{children}</CardContent>
      )}
    </MuiCard>
  );
}
