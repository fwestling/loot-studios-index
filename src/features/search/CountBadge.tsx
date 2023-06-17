import Chip from "@mui/material/Chip";

type Props = {
  count: number;
};

const CountBadge = ({ count }: Props) => {
  return <Chip color="primary" label={count} />;
};

export default CountBadge;
