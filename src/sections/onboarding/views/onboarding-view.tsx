'use client';

import { useCreateOffer } from '@/hooks/api/useOffers';
import { useUsers } from '@/hooks/api/useUsers';
import { MESSAGES } from '@/lib/constants';
import { OfferFormData, offerSchema } from '@/lib/schemas/offerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Card from '@mui/material/Card';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const boxMinWidth = 720;
const commonSpacing = '24px';

export default function OnboardingForm() {
  const { data, isLoading } = useUsers();
  const createOfferMutation = useCreateOffer();
  const isPending = createOfferMutation.isPending;
  const users = data?.data || [];

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OfferFormData>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      plan_type: 'monthly',
      additions: ['refundable'],
      user_id: undefined,
      expired: dayjs().toDate(),
      price: undefined,
    },
  });

  const onSubmit = (data: OfferFormData) => {
    createOfferMutation.mutate(data, {
      onSuccess: () => {
        toast.success(MESSAGES.CREATE_OFFER_SUCCESS);
        reset();
      },
      onError: () => {
        toast.error(MESSAGES.CREATE_OFFER_FAIL);
      },
    });
  };

  return (
    <Box sx={{ maxWidth: boxMinWidth, marginLeft: 'auto', marginRight: 'auto' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <header style={{ padding: commonSpacing }}>
            <Typography variant="h5" gutterBottom>
              Create Offer
            </Typography>
            <Typography variant="body2">Send onboarding offer to new user</Typography>
          </header>
          <Divider />

          <Stack
            sx={{
              margin: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              p: 3,
            }}
          >
            {/* Plan Type */}
            <FormControl component="fieldset">
              <FormLabel>Plan Type</FormLabel>
              <Controller
                name="plan_type"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field} row>
                    <FormControlLabel
                      value="pay_as_you_go"
                      control={<Radio />}
                      label="Pay As You Go"
                    />
                    <FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
                    <FormControlLabel value="yearly" control={<Radio />} label="Yearly" />
                  </RadioGroup>
                )}
              />
            </FormControl>

            {/* Additions */}
            <FormControl component="fieldset">
              <FormLabel>Additions</FormLabel>
              <Controller
                name="additions"
                control={control}
                render={({ field }) => (
                  <>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value?.includes('refundable')}
                          onChange={(e) => {
                            const value = e.target.checked ? 'refundable' : null;
                            const newAdditions = value
                              ? [...(field.value || []), value]
                              : field.value?.filter((item) => item !== 'refundable');
                            field.onChange(newAdditions);
                          }}
                        />
                      }
                      label="Refundable"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value?.includes('on_demand')}
                          onChange={(e) => {
                            const value = e.target.checked ? 'on_demand' : null;
                            const newAdditions = value
                              ? [...(field.value || []), value]
                              : field.value?.filter((item) => item !== 'on_demand');
                            field.onChange(newAdditions);
                          }}
                        />
                      }
                      label="On demand"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value?.includes('negotiable')}
                          onChange={(e) => {
                            const value = e.target.checked ? 'negotiable' : null;
                            const newAdditions = value
                              ? [...(field.value || []), value]
                              : field.value?.filter((item) => item !== 'negotiable');
                            field.onChange(newAdditions);
                          }}
                        />
                      }
                      label="Negotiable"
                    />
                  </>
                )}
              />
              {errors.additions && (
                <FormHelperText error>{errors.additions.message}</FormHelperText>
              )}
            </FormControl>

            {/* User Selection */}
            <FormControl fullWidth>
              <FormLabel>User</FormLabel>
              <Controller
                name="user_id"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      {...field}
                      value={field.value ?? ''}
                      fullWidth
                      displayEmpty
                      error={!!errors.user_id}
                    >
                      <MenuItem value="" disabled>
                        Select a user
                      </MenuItem>
                      {users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.name}
                        </MenuItem>
                      ))}
                    </Select>
                  );
                }}
              />
              {errors.user_id && <FormHelperText error>{errors.user_id.message}</FormHelperText>}
            </FormControl>

            {/* Expiry Date */}
            <FormControl fullWidth>
              <FormLabel>Expired</FormLabel>
              <Controller
                name="expired"
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={dayjs(field.value)}
                      onChange={(newValue) => {
                        field.onChange(newValue?.toDate());
                      }}
                      format="DD MMM YYYY"
                      slots={{
                        textField: (params) => (
                          <TextField
                            {...params}
                            fullWidth
                            error={!!errors.expired}
                            helperText={errors.expired?.message}
                          />
                        ),
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </FormControl>

            {/* Price Input */}
            <FormControl fullWidth>
              <FormLabel>Price</FormLabel>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type="number"
                    placeholder="$ Price"
                    value={field.value ?? ''}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                    onChange={(e) => {
                      const value = e.target.value === '' ? '' : Number.parseFloat(e.target.value);
                      field.onChange(value);
                    }}
                  />
                )}
              />
            </FormControl>
          </Stack>
        </Card>

        {/* Submit Button */}
        <Stack sx={{ marginTop: commonSpacing }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="secondary"
            loading={isLoading}
            disabled={isPending}
            loadingIndicator="Loading.."
            sx={{ marginLeft: 'auto' }}
          >
            Send Offer
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
