import { WIDGET_TEXT } from '@/lib/constants';
import Summary from '@/sections/dashboard/summary';
import WebsiteVisitsChart from '@/sections/dashboard/website-visits';
import { CardHeader } from '@mui/material';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import OffersSentChart from '../offers-sent';

export default function DashboardView() {
  return (
    <Grid sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Summary />
      <Grid container spacing={2}>
        <Grid size={6}>
          <Card>
            <CardHeader title={WIDGET_TEXT.VISIT_STAT} sx={{ paddingBottom: 3 }} />
            <WebsiteVisitsChart />
          </Card>
        </Grid>
        <Grid size={6}>
          <Card>
            <CardHeader title={WIDGET_TEXT.OFFER_STAT} sx={{ paddingBottom: 3 }} />
            <OffersSentChart />
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
