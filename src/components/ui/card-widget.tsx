import { Icon } from '@iconify/react';
import { Card, CardContent, Grid2 as Grid, Typography } from '@mui/material';
import Image from 'next/image';

interface CardWidgetProps {
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
}

const CardWidget = ({ title, value, trend, isPositive }: CardWidgetProps) => {
  const src = isPositive ? '/assets/double-arrow-up.png' : '/assets/double-arrow-down.png';
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
      <CardContent sx={{ paddingTop: '20px', paddingBottom: '17px!important' }}>
        <Typography variant="subtitle2" sx={{ marginBottom: 1.25 }}>
          {title}
        </Typography>
        <Typography variant="h4">{value}</Typography>
        <Grid sx={{ display: 'flex', gap: '6px', marginTop: '3px' }}>
          <Image
            priority
            src={src}
            height={24}
            width={24}
            style={{ marginLeft: '-4px' }}
            alt="Trends Arrow"
          />
          <Typography variant="body2">{trend}</Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CardWidget;
