import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';

const CardSkeleton = () => {
  return (
    <Card sx={{ padding: '24px' }}>
      <Skeleton variant="text" width="60%" height={30} />
      <Skeleton variant="text" width="40%" height={30} />
      <Skeleton variant="text" width="80%" height={30} />
    </Card>
  );
};

export default CardSkeleton;
