import { WIDGET_TEXT } from '@/lib/constants';
import Summary from '@/sections/dashboard/summary-widgets';
import WebsiteVisitsChart from '@/sections/dashboard/website-visits-widget';
import { Box, CardHeader } from '@mui/material';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import DashboardHeader from '../header';
import OfferListWidget from '../offer-list-widget';
// import OfferListWidget from '../offer-list-widget';
import OffersSentChart from '../offers-sent-widget';

export default function DashboardView() {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <DashboardHeader />
        <Summary />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardHeader title={WIDGET_TEXT.VISIT_STAT} sx={{ paddingBottom: 3 }} />
              <WebsiteVisitsChart />
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardHeader title={WIDGET_TEXT.OFFER_STAT} sx={{ paddingBottom: 3 }} />
              <OffersSentChart />
            </Card>
          </Grid>
        </Grid>
        <Grid size={12}>
          <Card>
            <CardHeader title={WIDGET_TEXT.OFFER_LIST} sx={{ paddingBottom: 3 }} />
            <OfferListWidget />
          </Card>
        </Grid>
      </Box>
    </>
  );
}
